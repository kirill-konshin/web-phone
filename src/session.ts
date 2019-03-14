import {
    C,
    ClientContext,
    IncomingResponse,
    InviteClientContext,
    InviteServerContext,
    OutgoingRequest,
    ReferClientContext,
    Session
} from 'sip.js';
import {responseTimeout, messages} from './constants';
import {startQosStatsCollection} from './qos';
import {WebPhoneUserAgent} from './userAgent';
import {delay, extend} from './utils';

export interface RCHeaders {
    sid?: string;
    request?: string;
    from?: string;
    to?: string;
    srvLvl?: string;
    srvLvlExt?: string;
    toNm?: string;
}

export interface RTCPeerConnectionLegacy extends RTCPeerConnection {
    getRemoteStreams: () => MediaStream[];
    getLocalStreams: () => MediaStream[];
}

export type WebPhoneSession = InviteClientContext &
    InviteServerContext & {
        __sendRequest: typeof InviteServerContext.prototype.sendRequest;
        __receiveRequest: typeof InviteServerContext.prototype.receiveRequest;
        __accept: typeof InviteServerContext.prototype.accept;
        __hold: typeof InviteClientContext.prototype.hold;
        __unhold: typeof InviteClientContext.prototype.unhold;
        __dtmf: typeof InviteClientContext.prototype.dtmf;
        __reinvite: typeof InviteClientContext.prototype.reinvite;
        sendRequest: typeof sendRequest;
        receiveRequest: typeof receiveRequest;
        accept: typeof accept;
        hold: typeof hold;
        unhold: typeof unhold;
        dtmf: typeof dtmf;
        reinvite: typeof reinvite;
        _sendReceiveConfirmPromise: Promise<any>;
        ua: WebPhoneUserAgent;
        local_hold: boolean;
        failed: any; //FIXME PROTECTED
        sessionDescriptionHandler: {
            peerConnection: RTCPeerConnectionLegacy; //FIXME Not documented
        };
        // non-sip
        __patched: boolean;
        __onRecord: boolean;
        hasAnswer: boolean;
        media: any;
        rcHeaders: RCHeaders;
        warmTransfer: typeof warmTransfer;
        blindTransfer: typeof blindTransfer;
        transfer: typeof transfer;
        park: typeof park;
        forward: typeof forward;
        startRecord: typeof startRecord;
        stopRecord: typeof stopRecord;
        flip: typeof flip;
        mute: typeof mute;
        unmute: typeof unmute;
        onLocalHold: typeof onLocalHold;
        addTrack: typeof addTrack;
        canUseRCMCallControl: typeof canUseRCMCallControl;
        createSessionMessage: typeof createSessionMessage;
        sendSessionMessage: typeof sendSessionMessage;
        sendReceiveConfirm: typeof sendReceiveConfirm;
        ignore: typeof ignore;
        toVoicemail: typeof toVoicemail;
        replyWithMessage: typeof replyWithMessage;
        logger: any;
        on(event: 'muted' | 'unmuted', listener: (session: WebPhoneSession) => void): WebPhoneSession;
    };

export const patchSession = (session: WebPhoneSession): WebPhoneSession => {
    if (session.__patched) return session;

    session.__patched = true;

    session.__sendRequest = session.sendRequest;
    session.__receiveRequest = session.receiveRequest;
    session.__accept = (session as InviteServerContext).accept;
    session.__hold = session.hold;
    session.__unhold = session.unhold;
    session.__dtmf = session.dtmf;
    session.__reinvite = session.reinvite;

    session.sendRequest = sendRequest.bind(session);
    session.receiveRequest = receiveRequest.bind(session);
    session.accept = accept.bind(session);
    session.hold = hold.bind(session);
    session.unhold = unhold.bind(session);
    session.dtmf = dtmf.bind(session);
    session.reinvite = reinvite.bind(session);

    session.warmTransfer = warmTransfer.bind(session);
    session.blindTransfer = blindTransfer.bind(session);
    session.transfer = transfer.bind(session);
    session.park = park.bind(session);
    session.forward = forward.bind(session);
    session.startRecord = startRecord.bind(session);
    session.stopRecord = stopRecord.bind(session);
    session.flip = flip.bind(session);

    session.mute = mute.bind(session);
    session.unmute = unmute.bind(session);
    session.onLocalHold = onLocalHold.bind(session);

    session.media = session.ua.media; //TODO Remove
    session.addTrack = addTrack.bind(session);

    session.on('replaced', patchSession);

    // Audio
    session.on('progress' as any, (incomingResponse: IncomingResponse) => {
        stopPlaying();
        if (incomingResponse.statusCode === 183) {
            session.createDialog(incomingResponse, 'UAC');
            session.hasAnswer = true;
            session.status = Session.C.STATUS_EARLY_MEDIA;
            session.sessionDescriptionHandler.setDescription(incomingResponse.body).catch(exception => {
                session.logger.warn(exception);
                session.failed(incomingResponse, C.causes.BAD_MEDIA_DESCRIPTION);
                session.terminate({
                    status_code: 488,
                    reason_phrase: 'Bad Media Description'
                });
            });
        }
    });

    if (session.media) session.on('trackAdded', addTrack as any);

    const stopPlaying = (): void => {
        session.ua.audioHelper.playOutgoing(false);
        session.ua.audioHelper.playIncoming(false);
        session.removeListener('accepted', stopPlaying);
        session.removeListener('rejected', stopPlaying);
        session.removeListener('bye', stopPlaying);
        session.removeListener('terminated', stopPlaying);
        session.removeListener('cancel', stopPlaying);
        session.removeListener('failed', stopPlaying);
        session.removeListener('replaced', stopPlaying);
    };

    session.on('accepted', stopPlaying);
    session.on('rejected', stopPlaying);
    session.on('bye', stopPlaying);
    session.on('terminated', stopPlaying);
    session.on('cancel', stopPlaying);
    session.on('failed', stopPlaying);
    session.on('replaced', stopPlaying);

    if (session.ua.enableQos) {
        session.on('SessionDescriptionHandler-created', () => {
            session.logger.log('SessionDescriptionHandler Created');
            startQosStatsCollection(session);
        });
    }

    if (session.ua.onSession) session.ua.onSession(session);

    return session;
};

/*--------------------------------------------------------------------------------------------------------------------*/

export const patchIncomingSession = (session: WebPhoneSession): void => {
    try {
        parseRcHeader(session);
    } catch (e) {
        session.logger.error("Can't parse RC headers from invite request due to " + e);
    }
    session.canUseRCMCallControl = canUseRCMCallControl;
    session.createSessionMessage = createSessionMessage;
    session.sendSessionMessage = sendSessionMessage;
    session.sendReceiveConfirm = sendReceiveConfirm;
    session.ignore = ignore;
    session.toVoicemail = toVoicemail;
    session.replyWithMessage = replyWithMessage;
};

/*--------------------------------------------------------------------------------------------------------------------*/

const parseRcHeader = (session: WebPhoneSession): any => {
    const prc = session.request.headers['P-Rc'];
    if (prc && prc.length) {
        const rawInviteMsg = prc[0].raw;
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(rawInviteMsg, 'text/xml');
        const hdrNode = xmlDoc.getElementsByTagName('Hdr')[0];
        const bdyNode = xmlDoc.getElementsByTagName('Bdy')[0];

        if (hdrNode) {
            session.rcHeaders = {
                sid: hdrNode.getAttribute('SID'),
                request: hdrNode.getAttribute('Req'),
                from: hdrNode.getAttribute('From'),
                to: hdrNode.getAttribute('To')
            };
        }
        if (bdyNode) {
            extend(session.rcHeaders, {
                srvLvl: bdyNode.getAttribute('SrvLvl'),
                srvLvlExt: bdyNode.getAttribute('SrvLvlExt'),
                toNm: bdyNode.getAttribute('ToNm')
            });
        }
    }
};

/*--------------------------------------------------------------------------------------------------------------------*/

function canUseRCMCallControl(this: WebPhoneSession): boolean {
    return !!this.rcHeaders;
}

/*--------------------------------------------------------------------------------------------------------------------*/

function createSessionMessage(this: WebPhoneSession, options: RCHeaders): string {
    if (!this.rcHeaders) {
        return undefined;
    }
    extend(options, {
        sid: this.rcHeaders.sid,
        request: this.rcHeaders.request,
        from: this.rcHeaders.to,
        to: this.rcHeaders.from
    });
    return this.ua.createRcMessage(options);
}

/*--------------------------------------------------------------------------------------------------------------------*/

async function ignore(this: WebPhoneSession): Promise<ClientContext> {
    return this._sendReceiveConfirmPromise.then(() => {
        return this.sendSessionMessage(messages.ignore);
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/

async function sendSessionMessage(this: WebPhoneSession, options): Promise<ClientContext> {
    if (!this.rcHeaders) {
        throw new Error("Can't send SIP MESSAGE related to session: no RC headers available");
    }
    return this.ua.sendMessage(this.rcHeaders.from, this.createSessionMessage(options));
}

/*--------------------------------------------------------------------------------------------------------------------*/

async function sendReceiveConfirm(this: WebPhoneSession): Promise<ClientContext> {
    return this.sendSessionMessage(messages.receiveConfirm);
}

/*--------------------------------------------------------------------------------------------------------------------*/

async function toVoicemail(this: WebPhoneSession): Promise<ClientContext> {
    return this._sendReceiveConfirmPromise.then(() => {
        return this.sendSessionMessage(messages.toVoicemail);
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/

interface ReplyOptions {
    replyType: number; //TODO Use enum
    replyText: string;
    timeValue: string;
    timeUnits: string;
    callbackDirection: string;
}

async function replyWithMessage(this: WebPhoneSession, replyOptions: ReplyOptions): Promise<ClientContext> {
    let body = 'RepTp="' + replyOptions.replyType + '"';

    if (replyOptions.replyType === 0) {
        body += ' Bdy="' + replyOptions.replyText + '"';
    } else if (replyOptions.replyType === 1) {
        body += ' Vl="' + replyOptions.timeValue + '"';
        body += ' Units="' + replyOptions.timeUnits + '"';
        body += ' Dir="' + replyOptions.callbackDirection + '"';
    }
    return this._sendReceiveConfirmPromise.then(() => {
        return this.sendSessionMessage({
            reqid: messages.replyWithMessage.reqid,
            body: body
        });
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/

async function sendReceive(session: WebPhoneSession, command: any, options?: any): Promise<any> {
    options = options || {};

    extend(command, options);

    let cseq;

    return new Promise((resolve, reject) => {
        const extraHeaders = (options.extraHeaders || [])
            .concat(session.ua.defaultHeaders)
            .concat(['Content-Type: application/json;charset=utf-8']);

        session.sendRequest(C.INFO, {
            body: JSON.stringify({
                request: command
            }),
            extraHeaders: extraHeaders,
            receiveResponse: (response: IncomingResponse) => {
                let timeout = null;
                if (response.statusCode === 200) {
                    cseq = response.cseq;
                    const onInfo = (request: OutgoingRequest): void => {
                        if (response.cseq !== cseq) return;
                        let body = (request && request.body) || '{}';
                        let obj;

                        try {
                            obj = JSON.parse(body);
                        } catch (e) {
                            obj = {};
                        }

                        if (obj.response && obj.response.command === command.command) {
                            if (obj.response.result) {
                                if (obj.response.result.code.toString() === '0') {
                                    return resolve(obj.response.result);
                                } else {
                                    return reject(obj.response.result);
                                }
                            }
                        }
                        timeout && clearTimeout(timeout);
                        session.removeListener('RC_SIP_INFO', onInfo);
                        resolve(null); //FIXME What to resolve
                    };
                    timeout = setTimeout(() => {
                        reject(new Error('Timeout: no reply'));
                        session.removeListener('RC_SIP_INFO', onInfo);
                    }, responseTimeout);
                    session.on('RC_SIP_INFO' as any, onInfo);
                } else {
                    reject(
                        new Error('The INFO response status code is: ' + response.statusCode + ' (waiting for 200)')
                    );
                }
            }
        });
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/

function sendRequest(this: WebPhoneSession, type, config): InviteServerContext {
    if (type === C.PRACK) {
        // type = C.ACK;
        return this;
    }
    return this.__sendRequest(type, config);
}

/*--------------------------------------------------------------------------------------------------------------------*/

async function setRecord(session: WebPhoneSession, flag: boolean): Promise<any> {
    const message = !!flag ? messages.startRecord : messages.stopRecord;

    if ((session.__onRecord && !flag) || (!session.__onRecord && flag)) {
        const data = await sendReceive(session, message);
        session.__onRecord = !!flag;
        return data;
    }
}

/*--------------------------------------------------------------------------------------------------------------------*/

async function setLocalHold(session: WebPhoneSession, flag: boolean): Promise<any> {
    if (flag) {
        await session.__hold();
    } else {
        await session.__unhold();
    }
}

/*--------------------------------------------------------------------------------------------------------------------*/

function receiveRequest(this: WebPhoneSession, request): any {
    switch (request.method) {
        case C.INFO:
            this.emit('RC_SIP_INFO', request);
            //SIP.js does not support application/json content type, so we monkey override its behaviour in this case
            if (this.status === Session.C.STATUS_CONFIRMED || this.status === Session.C.STATUS_WAITING_FOR_ACK) {
                const contentType = request.getHeader('content-type');
                if (contentType.match(/^application\/json/i)) {
                    request.reply(200);
                    return this;
                }
            }
            break;
    }
    return this.__receiveRequest.apply(this, arguments);
}

/*--------------------------------------------------------------------------------------------------------------------*/

function accept(this: WebPhoneSession, options: any = {}): Promise<WebPhoneSession> {
    options = options || {};
    options.extraHeaders = (options.extraHeaders || []).concat(this.ua.defaultHeaders);
    options.RTCConstraints = options.RTCConstraints || {
        optional: [{DtlsSrtpKeyAgreement: 'true'}]
    };

    return new Promise((resolve, reject) => {
        const onAnswered = (): void => {
            resolve(this);
            this.removeListener('failed', onFail);
        };

        const onFail = (e): void => {
            reject(e);
            this.removeListener('accepted', onAnswered);
        };

        //TODO More events?
        this.once('accepted', onAnswered);
        this.once('failed', onFail);
        this.__accept(options);
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/

function dtmf(this: WebPhoneSession, dtmf: string, duration = 1000): void {
    duration = parseInt(duration.toString());
    const pc = this.sessionDescriptionHandler.peerConnection;
    const senders = pc.getSenders();
    const audioSender = senders.find(sender => {
        return sender.track && sender.track.kind === 'audio';
    });
    const dtmfSender = audioSender.dtmf;
    if (dtmfSender !== undefined && dtmfSender) {
        return dtmfSender.insertDTMF(dtmf, duration);
    }
    const sender = dtmfSender && !dtmfSender.canInsertDTMF ? "can't insert DTMF" : 'Unknown';
    throw new Error('Send DTMF failed: ' + (!dtmfSender ? 'no sender' : sender));
}

/*--------------------------------------------------------------------------------------------------------------------*/

function hold(this: WebPhoneSession): Promise<any> {
    return setLocalHold(this, true);
}

/*--------------------------------------------------------------------------------------------------------------------*/

function unhold(this: WebPhoneSession): Promise<any> {
    return setLocalHold(this, false);
}

/*--------------------------------------------------------------------------------------------------------------------*/

function blindTransfer(this: WebPhoneSession, target, options = {}): Promise<ReferClientContext> {
    return Promise.resolve(this.refer(target, options));
}

/*--------------------------------------------------------------------------------------------------------------------*/

async function warmTransfer(
    this: WebPhoneSession,
    target: WebPhoneSession,
    transferOptions: any = {}
): Promise<ReferClientContext> {
    await (this.local_hold ? Promise.resolve(null) : this.hold());

    await delay(300);

    const referTo =
        '<' +
        target.dialog.remoteTarget.toString() +
        '?Replaces=' +
        target.dialog.id.call_id +
        '%3Bto-tag%3D' +
        target.dialog.id.remote_tag +
        '%3Bfrom-tag%3D' +
        target.dialog.id.local_tag +
        '>';

    transferOptions.extraHeaders = (transferOptions.extraHeaders || [])
        .concat(this.ua.defaultHeaders)
        .concat(['Referred-By: ' + this.dialog.remoteTarget.toString()]);

    //TODO return session.refer(newSession);
    return this.blindTransfer(referTo, transferOptions);
}

/*--------------------------------------------------------------------------------------------------------------------*/

async function transfer(this: WebPhoneSession, target: WebPhoneSession, options): Promise<ReferClientContext> {
    await (this.local_hold ? Promise.resolve(null) : this.hold());
    await delay(300);
    return this.blindTransfer(target, options);
}

/*--------------------------------------------------------------------------------------------------------------------*/

async function forward(
    this: WebPhoneSession,
    target: WebPhoneSession,
    acceptOptions,
    transferOptions
): Promise<ReferClientContext> {
    let interval = null;
    await this.accept(acceptOptions);
    return new Promise(resolve => {
        interval = setInterval(() => {
            if (this.status === Session.C.STATUS_CONFIRMED) {
                clearInterval(interval);
                this.mute();
                setTimeout(() => {
                    resolve(this.transfer(target, transferOptions));
                }, 700);
            }
        }, 50);
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/

async function startRecord(this: WebPhoneSession): Promise<any> {
    return setRecord(this, true);
}

/*--------------------------------------------------------------------------------------------------------------------*/

async function stopRecord(this: WebPhoneSession): Promise<any> {
    return setRecord(this, false);
}

/*--------------------------------------------------------------------------------------------------------------------*/

async function flip(this: WebPhoneSession, target): Promise<any> {
    return sendReceive(this, messages.flip, {target: target});
}

/*--------------------------------------------------------------------------------------------------------------------*/

function park(this: WebPhoneSession): Promise<any> {
    return sendReceive(this, messages.park);
}

/*--------------------------------------------------------------------------------------------------------------------*/

function reinvite(this: WebPhoneSession, options: any = {}, modifier = null): void {
    options.sessionDescriptionHandlerOptions = options.sessionDescriptionHandlerOptions || {};
    return this.__reinvite(options, modifier);
}

/*--------------------------------------------------------------------------------------------------------------------*/

function toggleMute(session: WebPhoneSession, mute: boolean): void {
    const pc = session.sessionDescriptionHandler.peerConnection;
    if (pc.getSenders) {
        pc.getSenders().forEach(sender => {
            if (sender.track) {
                sender.track.enabled = !mute;
            }
        });
    }
}

/*--------------------------------------------------------------------------------------------------------------------*/
function mute(this: WebPhoneSession, silent?: boolean): void {
    if (this.status !== Session.C.STATUS_CONFIRMED) {
        this.logger.warn('An acitve call is required to mute audio');
        return;
    }
    this.logger.log('Muting Audio');
    if (!silent) {
        this.emit('muted', this);
    }
    return toggleMute(this, true);
}

/*--------------------------------------------------------------------------------------------------------------------*/

function unmute(this: WebPhoneSession, silent?: boolean): void {
    if (this.status !== Session.C.STATUS_CONFIRMED) {
        this.logger.warn('An active call is required to unmute audio');
        return;
    }
    this.logger.log('Unmuting Audio');
    if (!silent) {
        this.emit('unmuted', this);
    }
    return toggleMute(this, false);
}

/*--------------------------------------------------------------------------------------------------------------------*/

function onLocalHold(this: WebPhoneSession): boolean {
    return this.local_hold;
}

/*--------------------------------------------------------------------------------------------------------------------*/

function addTrack(this: WebPhoneSession, remoteAudioEle, localAudioEle): void {
    const pc = this.sessionDescriptionHandler.peerConnection;

    let remoteAudio;
    let localAudio;

    if (remoteAudioEle && localAudioEle) {
        remoteAudio = remoteAudioEle;
        localAudio = localAudioEle;
    } else if (this.media) {
        remoteAudio = this.media.remote;
        localAudio = this.media.local;
    } else {
        throw new Error('HTML Media Element not Defined');
    }

    let remoteStream = new MediaStream();
    if (pc.getReceivers) {
        pc.getReceivers().forEach(receiver => {
            const rtrack = receiver.track;
            if (rtrack) {
                remoteStream.addTrack(rtrack);
            }
        });
    } else {
        remoteStream = pc.getRemoteStreams()[0];
    }
    remoteAudio.srcObject = remoteStream;
    remoteAudio.play().catch(() => {
        this.logger.log('local play was rejected');
    });

    let localStream = new MediaStream();
    if (pc.getSenders) {
        pc.getSenders().forEach(sender => {
            const strack = sender.track;
            if (strack && strack.kind === 'audio') {
                localStream.addTrack(strack);
            }
        });
    } else {
        localStream = pc.getLocalStreams()[0];
    }
    localAudio.srcObject = localStream;
    localAudio.play().catch(() => {
        this.logger.log('local play was rejected');
    });
}
