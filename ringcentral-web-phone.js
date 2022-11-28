(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("sip.js"));
	else if(typeof define === 'function' && define.amd)
		define(["sip.js"], factory);
	else if(typeof exports === 'object')
		exports["RingCentral"] = factory(require("sip.js"));
	else
		root["RingCentral"] = root["RingCentral"] || {}, root["RingCentral"]["WebPhone"] = factory(root["SIP"]);
})(self, (__WEBPACK_EXTERNAL_MODULE_sip_js__) => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/audioHelper.ts":
/*!****************************!*\
  !*** ./src/audioHelper.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AudioHelper = void 0;
class AudioHelper {
    constructor(options = {}) {
        this._enabled = !!options.enabled;
        this.loadAudio(options);
    }
    _playSound(url, val, volume) {
        if (!this._enabled || !url || !this._audio) {
            return this;
        }
        if (!this._audio[url]) {
            if (val) {
                this._audio[url] = new Audio();
                this._audio[url].src = url;
                this._audio[url].loop = true;
                this._audio[url].volume = volume;
                this._audio[url].playPromise = this._audio[url].play();
            }
        }
        else {
            if (val) {
                this._audio[url].currentTime = 0;
                this._audio[url].playPromise = this._audio[url].play();
            }
            else {
                const audio = this._audio[url];
                if (audio.playPromise !== undefined) {
                    audio.playPromise.then(() => {
                        audio.pause();
                    });
                }
            }
        }
        return this;
    }
    /** Load incoming and outgoing audio files for feedback */
    loadAudio(options) {
        this._incoming = options.incoming;
        this._outgoing = options.outgoing;
        this._audio = {};
    }
    /** Set volume for incoming and outgoing feedback */
    setVolume(volume) {
        if (volume < 0) {
            volume = 0;
        }
        if (volume > 1) {
            volume = 1;
        }
        this.volume = volume;
        for (const url in this._audio) {
            if (Object.prototype.hasOwnProperty.call(this._audio, url)) {
                this._audio[url].volume = volume;
            }
        }
    }
    /**
     * Play or pause incoming feedback
     * @param value `true` to play audio and `false` to pause
     * @returns
     */
    playIncoming(value) {
        return this._playSound(this._incoming, value, this.volume || 0.5);
    }
    /**
     * Play or pause outgoing feedback
     * @param value `true` to play audio and `false` to pause
     * @returns
     */
    playOutgoing(value) {
        return this._playSound(this._outgoing, value, this.volume || 1);
    }
}
exports.AudioHelper = AudioHelper;


/***/ }),

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultLogLevel = exports.defaultSipErrorCodes = exports.defaultStunServers = exports.defaultMediaConstraints = exports.responseTimeout = exports.uuidKey = exports.messages = void 0;
exports.messages = {
    park: { reqid: 1, command: 'callpark' },
    startRecord: { reqid: 2, command: 'startcallrecord' },
    stopRecord: { reqid: 3, command: 'stopcallrecord' },
    flip: { reqid: 3, command: 'callflip', target: '' },
    monitor: { reqid: 4, command: 'monitor' },
    barge: { reqid: 5, command: 'barge' },
    whisper: { reqid: 6, command: 'whisper' },
    takeover: { reqid: 7, command: 'takeover' },
    toVoicemail: { reqid: 11, command: 'toVoicemail' },
    ignore: { reqid: 12, command: 'ignore' },
    receiveConfirm: { reqid: 17, command: 'receiveConfirm' },
    replyWithMessage: { reqid: 14, command: 'replyWithMessage' },
};
exports.uuidKey = 'rc-webPhone-uuid';
exports.responseTimeout = 60000;
exports.defaultMediaConstraints = {
    audio: true,
    video: false,
};
exports.defaultStunServers = ['stun.l.google.com:19302'];
exports.defaultSipErrorCodes = ['408', '502', '503', '504'];
exports.defaultLogLevel = 'debug';


/***/ }),

/***/ "./src/events.ts":
/*!***********************!*\
  !*** ./src/events.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Events = void 0;
/** @ignore */
exports.Events = {
    Transport: {
        Connecting: 'connecting',
        Connected: 'connected',
        Disconnecting: 'disconnecting',
        Disconnected: 'disconnected',
        ConnectionAttemptFailure: 'wsConnectionError',
        ConnectionFailure: 'transportError',
        SwitchBackToMainProxy: 'switchBackProxy',
        Closed: 'closed',
    },
    UserAgent: {
        Registered: 'registered',
        Unregistered: 'unregistered',
        RegistrationFailed: 'registrationFailed',
        InviteSent: 'inviteSent',
        Invite: 'invite',
        ProvisionUpdate: 'provisionUpdate',
        Started: 'started',
        Stopped: 'stopped',
    },
    Session: {
        Accepted: 'accepted',
        Progress: 'progress',
        Muted: 'muted',
        Unmuted: 'unmuted',
        Establishing: 'establishing',
        Established: 'established',
        Terminating: 'terminating',
        Terminated: 'terminated',
        UpdateReceived: 'updateReceived',
        MoveToRcv: 'moveToRcv',
        QOSPublished: 'qos-published',
        RTPStat: 'rtpStat',
        UserMediaFailed: 'userMediaFailed',
    },
};


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const levels_1 = __webpack_require__(/*! sip.js/lib/core/log/levels */ "./node_modules/sip.js/lib/core/log/levels.js");
const sip_js_1 = __webpack_require__(/*! sip.js */ "sip.js");
const userAgent_1 = __webpack_require__(/*! ./userAgent */ "./src/userAgent.ts");
const mediaStreams_1 = __importStar(__webpack_require__(/*! ./mediaStreams */ "./src/mediaStreams.ts"));
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
const constants_1 = __webpack_require__(/*! ./constants */ "./src/constants.ts");
const sessionDescriptionHandler_1 = __webpack_require__(/*! ./sessionDescriptionHandler */ "./src/sessionDescriptionHandler.ts");
const { version } = __webpack_require__(/*! ../package.json */ "./package.json");
const defaultWebPhoneOptions = {
    autoStop: true,
    builtinEnabled: true,
    earlyMedia: false,
    enableDefaultModifiers: true,
    enableDscp: false,
    iceTransportPolicy: 'all',
    maxReconnectionAttemptsNoBackup: 15,
    maxReconnectionAttemptsWithBackup: 10,
    mediaConstraints: constants_1.defaultMediaConstraints,
    modifiers: [],
    //FIXME: This should be in seconds since every other config is in seconds
    qosCollectInterval: 5000,
    reconnectionTimeoutNoBackup: 5,
    reconnectionTimeoutWithBackup: 4,
    transportServers: [],
    turnServers: [],
    uuid: (0, utils_1.uuid)(),
    uuidKey: constants_1.uuidKey,
};
/**
 * WebPhone class to initiate WebRTC calls
 */
class WebPhone {
    /**
     * TODO: include 'WebPhone' for all apps other than Chrome and Glip
     * TODO: parse wsservers from new api spec
     */
    constructor(registrationData = {}, options = {}) {
        options = Object.assign({}, defaultWebPhoneOptions, options);
        this.sipInfo = registrationData.sipInfo;
        if (Array.isArray(this.sipInfo)) {
            this.sipInfo = this.sipInfo[0];
        }
        this.uuidKey = options.uuidKey;
        this.appName = options.appName;
        this.appVersion = options.appVersion;
        const id = options.uuid;
        localStorage.setItem(this.uuidKey, id);
        const uaMatch = navigator.userAgent.match(/\((.*?)\)/);
        const appClientOs = uaMatch === null ? '' : uaMatch[1].replace(/[^a-zA-Z0-9.:_]+/g, '-');
        const userAgentString = (this.appName
            ? this.appName + (this.appVersion ? '/' + this.appVersion : '') + ' '
            : '') +
            (appClientOs ? appClientOs : '') +
            ` RCWEBPHONE/${WebPhone.version}`;
        const modifiers = options.modifiers;
        if (!options.enableDefaultModifiers) {
            modifiers.push(sip_js_1.Web.stripG722);
            modifiers.push(sip_js_1.Web.stripTcpCandidates);
        }
        if (options.enableMidLinesInSDP) {
            modifiers.push(sip_js_1.Web.addMidLines);
        }
        const sdpSemantics = options.enablePlanB ? 'plan-b' : 'unified-plan';
        const stunServers = options.stunServers || constants_1.defaultStunServers;
        const iceTransportPolicy = options.iceTransportPolicy;
        let iceServers = [];
        if (options.enableTurnServers) {
            iceServers = options.turnServers.map(url => ({ urls: url }));
            options.iceCheckingTimeout = options.iceCheckingTimeout || 2000;
        }
        iceServers = [
            ...iceServers,
            ...stunServers.map(_url => {
                const url = !/^(stun:)/.test(_url) ? `stun:${_url}` : _url;
                return { urls: url };
            }),
        ];
        const sessionDescriptionHandlerFactoryOptions = options.sessionDescriptionHandlerFactoryOptions || {
            iceGatheringTimeout: options.iceCheckingTimeout || 500,
            enableDscp: options.enableDscp,
            peerConnectionConfiguration: {
                iceServers,
                iceTransportPolicy,
                sdpSemantics,
            },
        };
        sessionDescriptionHandlerFactoryOptions.enableDscp = !!options.enableDscp;
        options.modifiers = modifiers;
        const browserUa = navigator.userAgent.toLowerCase();
        if (browserUa.includes('firefox') && !browserUa.includes('chrome')) {
            // FIXME: alwaysAcquireMediaFirst has been removed from SIP.js. Is it the same as earlyMedia?
            options.earlyMedia = true;
        }
        const sessionDescriptionHandlerFactory = options.sessionDescriptionHandlerFactory ||
            sessionDescriptionHandler_1.defaultSessionDescriptionFactory;
        const sipErrorCodes = registrationData.sipErrorCodes && registrationData.sipErrorCodes.length
            ? registrationData.sipErrorCodes
            : constants_1.defaultSipErrorCodes;
        let reconnectionTimeout = options.reconnectionTimeoutWithBackup;
        let maxReconnectionAttempts = options.maxReconnectionAttemptsWithBackup;
        if (this.sipInfo.outboundProxy && this.sipInfo.transport) {
            options.transportServers.push({
                uri: this.sipInfo.transport.toLowerCase() +
                    '://' +
                    this.sipInfo.outboundProxy,
            });
            reconnectionTimeout = options.reconnectionTimeoutNoBackup;
            maxReconnectionAttempts = options.maxReconnectionAttemptsNoBackup;
        }
        if (this.sipInfo.outboundProxyBackup && this.sipInfo.transport) {
            options.transportServers.push({
                uri: this.sipInfo.transport.toLowerCase() +
                    '://' +
                    this.sipInfo.outboundProxyBackup,
            });
        }
        options.reconnectionTimeout =
            options.reconnectionTimeout || reconnectionTimeout;
        options.maxReconnectionAttempts =
            options.maxReconnectionAttempts || maxReconnectionAttempts;
        const transportServer = options.transportServers.length
            ? options.transportServers[0].uri
            : '';
        const configuration = {
            uri: sip_js_1.UserAgent.makeURI(`sip:${this.sipInfo.username}@${this.sipInfo.domain}`),
            transportOptions: {
                server: transportServer,
                traceSip: true,
                connectionTimeout: 5,
                keepAliveDebounce: options.keepAliveDebounce,
                keepAliveInterval: options.keepAliveInterval,
            },
            // WebPhoneTransport will handle reconnection.
            reconnectionAttempts: 0,
            authorizationUsername: this.sipInfo.authorizationId,
            authorizationPassword: this.sipInfo.password,
            logLevel: levels_1.Levels[options.logLevel] ||
                constants_1.defaultLogLevel,
            logBuiltinEnabled: options.builtinEnabled,
            logConnector: options.connector || undefined,
            userAgentString,
            sessionDescriptionHandlerFactoryOptions,
            sessionDescriptionHandlerFactory,
            allowLegacyNotifications: true,
        };
        options.sipErrorCodes = sipErrorCodes;
        options.switchBackInterval = this.sipInfo.switchBackInterval;
        this.userAgent = (0, userAgent_1.createWebPhoneUserAgent)(configuration, this.sipInfo, options, id);
    }
}
exports["default"] = WebPhone;
/** WebPhone version */
WebPhone.version = version;
/** Utility function to generate uuid */
WebPhone.uuid = utils_1.uuid;
/** Utility function to generate delay */
WebPhone.delay = utils_1.delay;
/** Utility function to extend object */
WebPhone.extend = utils_1.extend;
WebPhone.MediaStreams = mediaStreams_1.default;
WebPhone.MediaStreamsImpl = mediaStreams_1.MediaStreamsImpl;


/***/ }),

/***/ "./src/mediaStreams.ts":
/*!*****************************!*\
  !*** ./src/mediaStreams.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


/*
 * @Author: Elias Sun(elias.sun@ringcentral.com)
 * @Date: Dec. 15, 2018
 * Copyright © RingCentral. All rights reserved.
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MediaStreams = exports.MediaStreamsImpl = exports.WebPhoneRTPReport = exports.Browsers = void 0;
const events_1 = __webpack_require__(/*! ./events */ "./src/events.ts");
var ConnectionState;
(function (ConnectionState) {
    ConnectionState["new"] = "mediaConnectionStateNew";
    ConnectionState["checking"] = "mediaConnectionStateChecking";
    ConnectionState["connected"] = "mediaConnectionStateConnected";
    ConnectionState["completed"] = "mediaConnectionStateCompleted";
    ConnectionState["failed"] = "mediaConnectionStateFailed";
    ConnectionState["disconnected"] = "mediaConnectionStateDisconnected";
    ConnectionState["closed"] = "mediaConnectionStateClosed";
})(ConnectionState || (ConnectionState = {}));
var Browsers;
(function (Browsers) {
    Browsers["MSIE"] = "IE";
    Browsers["Chrome"] = "Chrome";
    Browsers["Firefox"] = "Firefox";
    Browsers["Safari"] = "Safari";
    Browsers["Opera"] = "Opera";
})(Browsers = exports.Browsers || (exports.Browsers = {}));
class WebPhoneRTPReport {
    constructor() {
        this.outboundRtpReport = {};
        this.inboundRtpReport = {};
        this.rttMs = {};
        this.localCandidates = [];
        this.remoteCandidates = [];
        this.transport = {};
    }
}
exports.WebPhoneRTPReport = WebPhoneRTPReport;
/** Media Streams class to monitor media stats */
class MediaStreams {
    constructor(session) {
        this.mediaStreamsImpl = new MediaStreamsImpl(session);
        this.release = this.mediaStreamsImpl.release.bind(this.mediaStreamsImpl);
        this.reconnectMedia = this.mediaStreamsImpl.reconnectMedia.bind(this.mediaStreamsImpl);
        this.getMediaStats = this.mediaStreamsImpl.getMediaStats.bind(this.mediaStreamsImpl);
        this.stopMediaStats = this.mediaStreamsImpl.stopMediaStats.bind(this.mediaStreamsImpl);
    }
    /**
     * Set a function to be called when media stats are generated
     * @param callback optionally, you can set a function on MediaStreams object. This will be treated as a default callback when media stats are generated if a callback function is not passed with `getMediaStats` function
     */
    set onRTPStat(callback) {
        this.mediaStreamsImpl.onRTPStat = callback;
    }
    /**
     * Set a function to be called when `peerConnetion` iceconnectionstatechange changes
     * @param callback function to be called when `peerConnetion` iceconnectionstatechange changes
     */
    set onMediaConnectionStateChange(callback) {
        this.mediaStreamsImpl.onMediaConnectionStateChange = callback;
    }
}
exports["default"] = MediaStreams;
exports.MediaStreams = MediaStreams;
/**
 * MediaStreams Implementation
 */
class MediaStreamsImpl {
    get tag() {
        return this.ktag;
    }
    /**
     * Function to find what browser is being used depending on the `navigator.userAgent` value
     * @returns Browsers enum value to denote what browser if being used
     */
    browser() {
        if (navigator.userAgent.search('MSIE') >= 0) {
            return Browsers.MSIE;
        }
        else if (navigator.userAgent.search('Chrome') >= 0) {
            return Browsers.Chrome;
        }
        else if (navigator.userAgent.search('Firefox') >= 0) {
            return Browsers.Firefox;
        }
        else if (navigator.userAgent.search('Safari') >= 0 &&
            navigator.userAgent.search('Chrome') < 0) {
            return Browsers.Safari;
        }
        else if (navigator.userAgent.search('Opera') >= 0) {
            return Browsers.Opera;
        }
        return 'unknown';
    }
    mediaStatsTimerCallback() {
        const sessionDescriptionHandler = this.session
            .sessionDescriptionHandler;
        const peerConnection = sessionDescriptionHandler.peerConnection;
        if (!peerConnection) {
            this.session.logger.error(`${this.ktag}: The peer connection cannot be null`);
            return;
        }
        const connectionState = peerConnection.iceConnectionState;
        if (connectionState !== 'connected' && connectionState !== 'completed') {
            this.preRTT.currentRoundTripTime = 0;
            return;
        }
        this.getRTPReport(new WebPhoneRTPReport());
    }
    onPeerConnectionStateChange() {
        let eventName = 'unknown';
        const sessionDescriptionHandler = this.session
            .sessionDescriptionHandler;
        const state = sessionDescriptionHandler.peerConnection.iceConnectionState;
        if (Object.prototype.hasOwnProperty.call(ConnectionState, state)) {
            eventName = ConnectionState[state];
            if (this.onMediaConnectionStateChange) {
                this.onMediaConnectionStateChange(eventName, this.session);
            }
            this.session.emit(eventName);
        }
        else {
            this.session.logger.debug(`${this.tag}: Unknown peerConnection state: ${state}`);
        }
        this.session.logger.debug(`${this.tag}: peerConnection State: ${state}`);
    }
    async getRTPReport(report) {
        const sessionDescriptionHandler = this.session
            .sessionDescriptionHandler;
        const peerConnection = sessionDescriptionHandler.peerConnection;
        try {
            const stats = await peerConnection.getStats();
            stats.forEach((stat) => {
                switch (stat.type) {
                    case 'inbound-rtp':
                        Object.keys(stat).forEach(statName => {
                            switch (statName) {
                                case 'bytesReceived':
                                case 'packetsReceived':
                                case 'jitter':
                                case 'packetsLost':
                                case 'fractionLost':
                                case 'mediaType':
                                    report.inboundRtpReport[statName] = stat[statName];
                                    break;
                                case 'roundTripTime':
                                    report.rttMs[statName] = stat[statName];
                                    break;
                            }
                        });
                        break;
                    case 'outbound-rtp':
                        Object.keys(stat).forEach(statName => {
                            switch (statName) {
                                case 'bytesSent':
                                case 'packetsSent':
                                case 'mediaType':
                                    report.outboundRtpReport[statName] = stat[statName];
                                    break;
                            }
                        });
                        break;
                    case 'candidate-pair':
                        Object.keys(stat).forEach(statName => {
                            switch (statName) {
                                case 'currentRoundTripTime':
                                    report.rttMs[statName] = stat[statName];
                                    break;
                            }
                        });
                        break;
                    case 'local-candidate': {
                        const local_candidate = {};
                        Object.keys(stat).forEach(statName => {
                            switch (statName) {
                                case 'id':
                                case 'isRemote':
                                case 'ip':
                                case 'candidateType':
                                case 'networkType':
                                case 'priority':
                                case 'port':
                                    local_candidate[statName] = stat[statName];
                                    break;
                            }
                        });
                        report.localCandidates.push(local_candidate);
                        break;
                    }
                    case 'remote-candidate': {
                        const remote_candidate = {};
                        Object.keys(stat).forEach((statName) => {
                            switch (statName) {
                                case 'id':
                                case 'isRemote':
                                case 'ip':
                                case 'priority':
                                case 'port':
                                case 'candidateType':
                                    remote_candidate[statName] = stat[statName];
                                    break;
                            }
                        });
                        report.remoteCandidates.push(remote_candidate);
                        break;
                    }
                    case 'media-source':
                        report.outboundRtpReport.rtpLocalAudioLevel = stat.audioLevel
                            ? stat.audioLevel
                            : 0;
                        break;
                    case 'track':
                        if (!stat.remoteSource) {
                            break;
                        }
                        report.inboundRtpReport.rtpRemoteAudioLevel = stat.audioLevel
                            ? stat.audioLevel
                            : 0;
                        break;
                    case 'transport':
                        Object.keys(stat).forEach(statName => {
                            switch (statName) {
                                case 'dtlsState':
                                case 'packetsSent':
                                case 'packetsReceived':
                                case 'selectedCandidatePairChanges':
                                case 'selectedCandidatePairId':
                                    report.transport[statName] = stat[statName];
                                    break;
                            }
                        });
                        break;
                    default:
                        break;
                }
            });
            if (!Object.prototype.hasOwnProperty.call(report.rttMs, 'currentRoundTripTime')) {
                if (!Object.prototype.hasOwnProperty.call(report.rttMs, 'roundTripTime')) {
                    report.rttMs.currentRoundTripTime = this.preRTT.currentRoundTripTime;
                }
                else {
                    report.rttMs.currentRoundTripTime = report.rttMs.roundTripTime; // for Firefox
                    delete report.rttMs.roundTripTime;
                }
            }
            else {
                report.rttMs.currentRoundTripTime = Math.round(report.rttMs.currentRoundTripTime * 1000);
            }
            if (Object.prototype.hasOwnProperty.call(report.rttMs, 'currentRoundTripTime')) {
                this.preRTT.currentRoundTripTime = report.rttMs.currentRoundTripTime;
            }
            this.onRTPStat(report, this.session);
            this.session.emit(events_1.Events.Session.RTPStat, report);
        }
        catch (e) {
            this.session.logger.error(`${this.tag}: Unable to get media stats: ${e.message}`);
        }
    }
    constructor(session) {
        this.ktag = 'MediaStreams';
        this.ktag = 'MediaStreams';
        if (!session) {
            throw new Error(`${this.ktag}: Cannot initial media stream monitoring. Session is not passed`);
        }
        this.session = session;
        this.onMediaConnectionStateChange = undefined;
        this.onPeerConnectionStateChange =
            this.onPeerConnectionStateChange.bind(this);
        const sessionDescriptionHandler = this.session
            .sessionDescriptionHandler;
        sessionDescriptionHandler.peerConnection.addEventListener('iceconnectionstatechange', this.onPeerConnectionStateChange);
        this.isChrome = this.browser() === Browsers.Chrome;
        this.isFirefox = this.browser() === Browsers.Firefox;
        this.isSafari = this.browser() === Browsers.Safari;
        this.preRTT = { currentRoundTripTime: 0 };
        if (!this.isChrome && !this.isFirefox && !this.isSafari) {
            this.session.logger.error(`${this.ktag} The web browser ${this.browser()} is not in the recommended list [Chrome, Safari, Firefox] !`);
        }
    }
    /**
     * @param callback function which will be called every time media stats are generated. Will override callback passed to `onRTPStat`
     * @param interval interval for the recurring call to the callback function
     * @returns
     */
    getMediaStats(callback, interval = 1000) {
        if (!this.onRTPStat && !callback) {
            this.session.logger.debug(`${this.ktag}: No event callback provided to call when media starts are generated`);
            return;
        }
        if (callback) {
            this.onRTPStat = callback;
        }
        if (this.mediaStatsTimer) {
            clearTimeout(this.mediaStatsTimer);
            this.mediaStatsTimer = null;
        }
        this.mediaStatsTimer = setInterval(() => {
            this.mediaStatsTimerCallback();
        }, interval);
    }
    /**
     * Stop collecting stats. This will stop calling the registered function (either that was registered using `onRTPstat` or using `getMediaStats`)
     */
    stopMediaStats() {
        if (this.mediaStatsTimer) {
            clearTimeout(this.mediaStatsTimer);
            this.onRTPStat = undefined;
        }
    }
    /**
     * Reconnect media and send reinvite on the existing session.
     *
     * This will also recreate SDP and send it over with the reinvite message
     */
    reconnectMedia() {
        return new Promise((resolve, reject) => {
            this.session.reinvite()
                .then(() => resolve())
                .catch(reject);
        });
    }
    /**
     * Remove iceconnectionstatechange event listeners and stop collecting stats
     */
    release() {
        if (this.mediaStatsTimer) {
            clearTimeout(this.mediaStatsTimer);
            this.mediaStatsTimer = null;
        }
        const sessionDescriptionHandler = this.session
            .sessionDescriptionHandler;
        if (!sessionDescriptionHandler.peerConnection) {
            return;
        }
        sessionDescriptionHandler.peerConnection.removeEventListener('iceconnectionstatechange', this.onPeerConnectionStateChange);
    }
}
exports.MediaStreamsImpl = MediaStreamsImpl;


/***/ }),

/***/ "./src/qos.ts":
/*!********************!*\
  !*** ./src/qos.ts ***!
  \********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.startQosStatsCollection = void 0;
const sip_js_1 = __webpack_require__(/*! sip.js */ "sip.js");
const events_1 = __webpack_require__(/*! ./events */ "./src/events.ts");
const formatFloat = (input) => parseFloat(input.toString()).toFixed(2);
const startQosStatsCollection = (session) => {
    const qosStatsObj = getQoSStatsTemplate();
    qosStatsObj.callID = session.request.callId || '';
    qosStatsObj.fromTag = session.request.fromTag || '';
    qosStatsObj.toTag = session.request.toTag || '';
    qosStatsObj.localID = session.request.getHeader('From');
    qosStatsObj.remoteID = session.request.getHeader('To');
    qosStatsObj.origID = session.request.getHeader('From');
    const refreshIntervalId = setInterval(async () => {
        const sessionDescriptionHandler = session.sessionDescriptionHandler;
        if (!sessionDescriptionHandler ||
            !sessionDescriptionHandler.peerConnection) {
            session.logger.error('There is no PeerConnection, can not getStats');
            return;
        }
        const getStatsResult = await sessionDescriptionHandler.peerConnection.getStats();
        session.logger.log(`getStatsResult ${JSON.stringify(getStatsResult)}`);
        qosStatsObj.status = true;
        let network = '';
        getStatsResult.forEach((item) => {
            switch (item.type) {
                case 'local-candidate':
                    if (item.candidateType === 'srflx') {
                        network =
                            typeof item.networkType === 'string'
                                ? item.networkType
                                : getNetworkType(item.networkType);
                        qosStatsObj.localAddr = item.ip + ':' + item.port;
                        qosStatsObj.localcandidate = item;
                    }
                    break;
                case 'remote-candidate':
                    if (item.candidateType === 'host') {
                        qosStatsObj.remoteAddr = item.ip + ':' + item.port;
                        qosStatsObj.remotecandidate = item;
                    }
                    break;
                case 'inbound-rtp': {
                    qosStatsObj.jitterBufferDiscardRate =
                        item.packetsDiscarded / item.packetsReceived;
                    qosStatsObj.inboundPacketsLost = item.packetsLost;
                    qosStatsObj.inboundPacketsReceived = item.packetsReceived; //packetsReceived
                    const jitterBufferMs = parseFloat(item.jitterBufferEmittedCount) > 0
                        ? (parseFloat(item.jitterBufferDelay) /
                            parseFloat(item.jitterBufferEmittedCount)) *
                            1000
                        : 0;
                    qosStatsObj.totalSumJitter += jitterBufferMs;
                    qosStatsObj.totalIntervalCount += 1;
                    qosStatsObj.NLR = formatFloat((item.packetsLost / (item.packetsLost + item.packetsReceived)) * 100);
                    qosStatsObj.JBM = Math.max(qosStatsObj.JBM, jitterBufferMs);
                    qosStatsObj.netType = addToMap(qosStatsObj.netType, network);
                    break;
                }
                case 'candidate-pair':
                    qosStatsObj.RTD = Math.round((item.currentRoundTripTime / 2) * 1000);
                    break;
                case 'outbound-rtp':
                    qosStatsObj.outboundPacketsSent = item.packetsSent;
                    break;
                case 'remote-inbound-rtp':
                    qosStatsObj.outboundPacketsLost = item.packetsLost;
                    break;
                default:
                    break;
            }
        });
    }, session.userAgent.qosCollectInterval);
    session.stateChange.addListener(newState => {
        if (newState === sip_js_1.SessionState.Terminated) {
            session.logger.log('Release media streams');
            session.mediaStreams && session.mediaStreams.release();
            publishQosStats(session, qosStatsObj);
            refreshIntervalId && clearInterval(refreshIntervalId);
        }
    });
};
exports.startQosStatsCollection = startQosStatsCollection;
const publishQosStats = async (session, qosStatsObj, options = {}) => {
    options = options || {};
    const targetUrl = options.targetUrl || 'sip:rtcpxr@rtcpxr.ringcentral.com:5060';
    const event = options.event || 'vq-rtcpxr';
    options.expires = 60;
    options.contentType = 'application/vq-rtcpxr';
    options.extraHeaders = (options.extraHeaders || []).concat(session.userAgent.defaultHeaders);
    const cpuOS = session.__qosStats.cpuOS;
    const cpuRC = session.__qosStats.cpuRC;
    const ram = session.__qosStats.ram;
    const networkType = session.__qosStats.netType || calculateNetworkUsage(qosStatsObj) || '';
    let effectiveType = '';
    if ('connection' in navigator) {
        effectiveType = navigator.connection.effectiveType;
    }
    options.extraHeaders.push(`p-rc-client-info:cpuRC=${cpuRC};cpuOS=${cpuOS};netType=${networkType};ram=${ram};effectiveType=${effectiveType}`);
    session.logger.log(`QOS stats ${JSON.stringify(qosStatsObj)}`);
    const calculatedStatsObj = calculateStats(qosStatsObj);
    const body = createPublishBody(calculatedStatsObj);
    const publisher = new sip_js_1.Publisher(session.userAgent, sip_js_1.UserAgent.makeURI(targetUrl), event, options);
    await publisher.publish(body);
    session.logger.log('Local Candidate: ' + JSON.stringify(qosStatsObj.localcandidate));
    session.logger.log('Remote Candidate: ' + JSON.stringify(qosStatsObj.remotecandidate));
    qosStatsObj.status = false;
    await publisher.dispose();
    session.emit(events_1.Events.Session.QOSPublished, body);
};
const calculateNetworkUsage = (qosStatsObj) => {
    const networkType = [];
    for (const [key, value] of Object.entries(qosStatsObj.netType)) {
        networkType.push(key +
            ':' +
            formatFloat((value * 100) / qosStatsObj.totalIntervalCount));
    }
    return networkType.join();
};
const calculateStats = (qosStatsObj) => {
    const rawNLR = (qosStatsObj.inboundPacketsLost * 100) /
        (qosStatsObj.inboundPacketsReceived + qosStatsObj.inboundPacketsLost) ||
        0;
    const rawJBN = qosStatsObj.totalIntervalCount > 0
        ? qosStatsObj.totalSumJitter / qosStatsObj.totalIntervalCount
        : 0;
    return {
        ...qosStatsObj,
        NLR: formatFloat(rawNLR),
        JBN: formatFloat(rawJBN),
        JDR: formatFloat(qosStatsObj.jitterBufferDiscardRate),
        MOSLQ: calculateMos(qosStatsObj.inboundPacketsLost /
            (qosStatsObj.inboundPacketsLost + qosStatsObj.inboundPacketsReceived)),
        MOSCQ: calculateMos(qosStatsObj.outboundPacketsLost /
            (qosStatsObj.outboundPacketsLost + qosStatsObj.outboundPacketsSent)),
    };
};
const createPublishBody = (calculatedStatsObj) => {
    const NLR = calculatedStatsObj.NLR || 0;
    const JBM = calculatedStatsObj.JBM || 0;
    const JBN = calculatedStatsObj.JBN || 0;
    const JDR = calculatedStatsObj.JDR || 0;
    const MOSLQ = calculatedStatsObj.MOSLQ || 0;
    const MOSCQ = calculatedStatsObj.MOSCQ || 0;
    const RTD = calculatedStatsObj.RTD || 0;
    const callID = calculatedStatsObj.callID || '';
    const fromTag = calculatedStatsObj.fromTag || '';
    const toTag = calculatedStatsObj.toTag || '';
    const localId = calculatedStatsObj.localID || '';
    const remoteId = calculatedStatsObj.remoteID || '';
    const localAddr = calculatedStatsObj.localAddr || '';
    const remoteAddr = calculatedStatsObj.remoteAddr || '';
    return ('VQSessionReport: CallTerm\r\n' +
        `CallID: ${callID}\r\n` +
        `LocalID: ${localId}\r\n` +
        `RemoteID: ${remoteId}\r\n` +
        `OrigID: ${localId}\r\n` +
        `LocalAddr: IP=${localAddr} SSRC=0x00000000\r\n` +
        `RemoteAddr: IP=${remoteAddr} SSRC=0x00000000\r\n` +
        'LocalMetrics:\r\n' +
        'Timestamps: START=0 STOP=0\r\n' +
        'SessionDesc: PT=0 PD=opus SR=0 FD=0 FPP=0 PPS=0 PLC=0 SSUP=on\r\n' +
        `JitterBuffer: JBA=0 JBR=0 JBN=${JBN} JBM=${formatFloat(JBM)} JBX=0\r\n` +
        `PacketLoss: NLR=${NLR} JDR=${JDR}\r\n` +
        'BurstGapLoss: BLD=0 BD=0 GLD=0 GD=0 GMIN=0\r\n' +
        `Delay: RTD=${RTD} ESD=0 SOWD=0 IAJ=0\r\n` +
        `QualityEst: MOSLQ=${formatFloat(MOSLQ)} MOSCQ=${formatFloat(MOSCQ)}\r\n` +
        `DialogID: ${callID};to-tag=${toTag};from-tag=${fromTag}`);
};
const getQoSStatsTemplate = () => ({
    localAddr: '',
    remoteAddr: '',
    callID: '',
    localID: '',
    remoteID: '',
    origID: '',
    fromTag: '',
    toTag: '',
    timestamp: {
        start: '',
        stop: '',
    },
    netType: {},
    jitterBufferNominal: 0,
    jitterBufferMax: 0,
    jitterBufferDiscardRate: 0,
    totalSumJitter: 0,
    totalIntervalCount: 0,
    NLR: '',
    JBM: 0,
    JBN: '',
    JDR: '',
    MOSLQ: 0,
    MOSCQ: 0,
    RTD: 0,
    status: false,
    localcandidate: {},
    remotecandidate: {},
    inboundPacketsLost: 0,
    inboundPacketsReceived: 0,
    outboundPacketsLost: 0,
    outboundPacketsSent: 0,
});
const addToMap = (map = {}, key) => ({
    ...map,
    [key]: (key in map ? parseInt(map[key]) : 0) + 1,
});
const networkTypeMap = {
    bluetooth: 'Bluetooth',
    cellular: 'Cellulars',
    ethernet: 'Ethernet',
    wifi: 'WiFi',
    vpn: 'VPN',
    wimax: 'WiMax',
    '2g': '2G',
    '3g': '3G',
    '4g': '4G',
};
//TODO: find reliable way to find network type , use navigator.connection.type?
const getNetworkType = (connectionType) => {
    const sysNetwork = connectionType.systemNetworkType || 'unknown';
    const localNetwork = connectionType || 'unknown';
    const networkType = !sysNetwork || sysNetwork === 'unknown' ? localNetwork : sysNetwork;
    return networkType in networkTypeMap
        ? networkTypeMap[networkType]
        : networkType;
};
function calculateMos(packetLoss) {
    if (packetLoss <= 0.008) {
        return 4.5;
    }
    if (packetLoss > 0.45) {
        return 1.0;
    }
    const bpl = 17.2647;
    const r = 93.2062077233 - 95.0 * ((packetLoss * 100) / (packetLoss * 100 + bpl)) + 4;
    let mos = 2.06405 +
        0.031738 * r -
        0.000356641 * r * r +
        2.93143 * Math.pow(10, -6) * r * r * r;
    if (mos < 1) {
        return 1.0;
    }
    if (mos > 4.5) {
        return 4.5;
    }
    if (packetLoss >= 0.35 && mos > 2.7) {
        mos = 2.7;
    }
    else if (packetLoss >= 0.3 && mos > 3.0) {
        mos = 3.0;
    }
    else if (packetLoss >= 0.2 && mos > 3.6) {
        mos = 3.6;
    }
    else if (packetLoss >= 0.15 && mos > 3.7) {
        mos = 3.7;
    }
    else if (packetLoss >= 0.1 && mos > 3.9) {
        mos = 4.1;
    }
    else if (packetLoss >= 0.05 && mos > 4.1) {
        mos = 4.3;
    }
    else if (packetLoss >= 0.03 && mos > 4.1) {
        mos = 4.4;
    }
    return mos;
}


/***/ }),

/***/ "./src/rtpReport.ts":
/*!**************************!*\
  !*** ./src/rtpReport.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isNoAudio = void 0;
function isNoAudio(report) {
    if (!report.inboundRtpReport) {
        return true;
    }
    if (!report.outboundRtpReport) {
        return true;
    }
    if (report.inboundRtpReport.packetsReceived === 0 ||
        report.outboundRtpReport.packetsSent === 0) {
        return true;
    }
    return false;
}
exports.isNoAudio = isNoAudio;


/***/ }),

/***/ "./src/session.ts":
/*!************************!*\
  !*** ./src/session.ts ***!
  \************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.onSessionDescriptionHandlerCreated = exports.patchIncomingWebphoneSession = exports.patchWebphoneSession = exports.CommonSession = void 0;
const events_1 = __webpack_require__(/*! events */ "./node_modules/events/events.js");
const sip_js_1 = __webpack_require__(/*! sip.js */ "sip.js");
const core_1 = __webpack_require__(/*! sip.js/lib/core */ "./node_modules/sip.js/lib/core/index.js");
const session_state_1 = __webpack_require__(/*! sip.js/lib/api/session-state */ "./node_modules/sip.js/lib/api/session-state.js");
const utils_1 = __webpack_require__(/*! ./utils */ "./src/utils.ts");
const constants_1 = __webpack_require__(/*! ./constants */ "./src/constants.ts");
const mediaStreams_1 = __webpack_require__(/*! ./mediaStreams */ "./src/mediaStreams.ts");
const rtpReport_1 = __webpack_require__(/*! ./rtpReport */ "./src/rtpReport.ts");
const events_2 = __webpack_require__(/*! ./events */ "./src/events.ts");
const qos_1 = __webpack_require__(/*! ./qos */ "./src/qos.ts");
class CommonSession {
}
exports.CommonSession = CommonSession;
const mediaCheckTimer = 2000;
function patchWebphoneSession(session) {
    if (session.__patched) {
        return session;
    }
    session.__patched = true;
    session.held = false;
    session.muted = false;
    session.media = session.userAgent.media;
    session.__dispose = session.dispose.bind(session);
    session.dispose = dispose.bind(session);
    const eventEmitter = new events_1.EventEmitter();
    session.on = eventEmitter.on.bind(eventEmitter);
    session.off = eventEmitter.off.bind(eventEmitter);
    session.once = eventEmitter.once.bind(eventEmitter);
    session.addListener = eventEmitter.addListener.bind(eventEmitter);
    session.removeListener = eventEmitter.removeListener.bind(eventEmitter);
    session.removeAllListeners =
        eventEmitter.removeAllListeners.bind(eventEmitter);
    session.emit = eventEmitter.emit.bind(eventEmitter);
    session.sendInfoAndReceiveResponse = sendInfoAndReceiveResponse.bind(session);
    session.startRecord = startRecord.bind(session);
    session.stopRecord = stopRecord.bind(session);
    session.sendMoveResponse = sendMoveResponse.bind(session);
    session.park = park.bind(session);
    session.flip = flip.bind(session);
    session.whisper = whisper.bind(session);
    session.barge = barge.bind(session);
    session.mute = mute.bind(session);
    session.unmute = unmute.bind(session);
    session.addTrack = addTrack.bind(session);
    session.stopMediaStats = stopMediaStats.bind(session);
    session.warmTransfer = warmTransfer.bind(session);
    session.blindTransfer = blindTransfer.bind(session);
    session.transfer = transfer.bind(session);
    session.hold = hold.bind(session);
    session.unhold = unhold.bind(session);
    session.dtmf = dtmf.bind(session);
    session.reinvite = reinvite.bind(session);
    session.forward = forward.bind(session); // FIXME: Not needed?
    session.__qosStats = {};
    session.setQosStats = setQosStats.bind(session);
    setupUserAgentCoreEvent(session);
    session.stateChange.addListener(newState => {
        switch (newState) {
            case session_state_1.SessionState.Establishing: {
                session.emit(events_2.Events.Session.Establishing);
                break;
            }
            case session_state_1.SessionState.Established: {
                stopPlaying(session);
                session.addTrack();
                session.emit(events_2.Events.Session.Established);
                break;
            }
            case session_state_1.SessionState.Terminating: {
                stopPlaying(session);
                stopMediaStreamStats(session);
                session.emit(events_2.Events.Session.Terminating);
                break;
            }
            case session_state_1.SessionState.Terminated: {
                stopPlaying(session);
                session.emit(events_2.Events.Session.Terminated);
                break;
            }
        }
    });
    // FIXME: Do we need this? The replaced session is part of existing sessions and would have already been patched
    // NEEDED - inviter.ts L191
    // session.on("replaced", patchWebphoneSession);
    if (session.userAgent.onSession) {
        session.userAgent.onSession(session);
    }
    session.mediaStatsStarted = false;
    session.noAudioReportCount = 0;
    session.reinviteForNoAudioSent = false;
    return session;
}
exports.patchWebphoneSession = patchWebphoneSession;
function patchIncomingWebphoneSession(session) {
    try {
        parseRcHeader(session);
    }
    catch (e) {
        session.logger.error("Can't parse RC headers from invite request due to " + e);
    }
    session.canUseRCMCallControl = canUseRCMCallControl.bind(session);
    session.createSessionMessage = createSessionMessage.bind(session);
    session.ignore = ignore.bind(session);
    session.replyWithMessage = replyWithMessage.bind(session);
    session.sendReceiveConfirm = sendReceiveConfirm.bind(session);
    session.sendSessionMessage = sendSessionMessage.bind(session);
    session.toVoicemail = toVoicemail.bind(session);
    session.__accept = session.accept.bind(session);
    session.accept = accept.bind(session);
    setupUserAgentCoreEvent(session);
}
exports.patchIncomingWebphoneSession = patchIncomingWebphoneSession;
function canUseRCMCallControl() {
    return !!this.rcHeaders;
}
function createSessionMessage(options) {
    if (!this.rcHeaders) {
        throw Error('createSessionMessage options is undefined');
    }
    (0, utils_1.extend)(options, {
        sid: this.rcHeaders.sid,
        request: this.rcHeaders.request,
        from: this.rcHeaders.to,
        to: this.rcHeaders.from,
    });
    return this.userAgent.createRcMessage(options);
}
async function sendReceiveConfirm() {
    return this.sendSessionMessage(constants_1.messages.receiveConfirm)
        .then(response => {
        this.logger.log('sendReceiveConfirm success');
        return response;
    })
        .catch(error => this.logger.error(`failed to send receive confirmation via SIP MESSAGE due to ${error.message}`));
}
function sendSessionMessage(options) {
    if (!this.rcHeaders) {
        this.logger.error("Can't send SIP MESSAGE related to session: no RC headers available");
    }
    return this.userAgent.sendMessage(this.rcHeaders.from, this.createSessionMessage(options));
}
async function sendInfoAndReceiveResponse(command, options) {
    options = options || {};
    (0, utils_1.extend)(command, options);
    delete command.extraHeaders;
    return new Promise((resolve, reject) => {
        const requestDelegate = {
            onAccept: (response) => {
                let timeout = undefined;
                const { message: { statusCode, callId }, } = response;
                if (statusCode === 200) {
                    const onInfo = (message) => {
                        // FIXME: I think we need this check here
                        if (message.callId !== callId) {
                            return;
                        }
                        const body = (message && message.body) || '{}';
                        let obj;
                        try {
                            obj = JSON.parse(body);
                        }
                        catch (e) {
                            obj = {};
                        }
                        if (obj.response &&
                            obj.response.command === command.command &&
                            obj.response.result) {
                            timeout && clearTimeout(timeout);
                            this.off('RC_SIP_INFO', onInfo);
                            if (obj.response.result.code.toString() === '0') {
                                return resolve(obj.response.result);
                            }
                            return reject(obj.response.result);
                        }
                    };
                    timeout = setTimeout(() => {
                        reject(new Error('Timeout: no reply'));
                        this.off('RC_SIP_INFO', onInfo);
                    }, constants_1.responseTimeout);
                    this.on('RC_SIP_INFO', onInfo);
                }
                else {
                    reject(new Error(`The INFO response status code is: ${statusCode} (waiting for 200)`));
                }
            },
            onReject: response => {
                reject(new Error(`The INFO response status code is: ${response.message.statusCode} (waiting for 200)`));
            },
        };
        const requestOptions = {
            extraHeaders: [
                ...(options.extraHeaders || []),
                ...this.userAgent.defaultHeaders,
            ],
            body: (0, core_1.fromBodyLegacy)({
                body: JSON.stringify({ request: command }),
                contentType: 'application/json;charset=utf-8',
            }),
        };
        this.info({ requestDelegate, requestOptions });
    });
}
async function startRecord() {
    return setRecord(this, true);
}
async function stopRecord() {
    return setRecord(this, false);
}
function sendMoveResponse(reqId, code, description, options = {}) {
    const extraHeaders = options.extraHeaders || [];
    const requestOptions = {
        extraHeaders: [...extraHeaders, ...this.userAgent.defaultHeaders],
        body: (0, core_1.fromBodyLegacy)({
            body: JSON.stringify({
                response: {
                    reqId,
                    command: 'move',
                    result: {
                        code,
                        description,
                    },
                },
            }),
            contentType: 'application/json;charset=utf-8',
        }),
    };
    this.info({ requestOptions });
}
function ignore() {
    return this.sendReceiveConfirm().then(() => this.sendSessionMessage(constants_1.messages.ignore));
}
function toVoicemail() {
    return this.sendReceiveConfirm().then(() => this.sendSessionMessage(constants_1.messages.toVoicemail));
}
function replyWithMessage(replyOptions) {
    let body = 'RepTp="' + replyOptions.replyType + '"';
    if (replyOptions.replyType === 0) {
        body += ' Bdy="' + replyOptions.replyText + '"';
    }
    else if (replyOptions.replyType === 1 || replyOptions.replyType === 4) {
        body += ' Vl="' + replyOptions.timeValue + '"';
        body += ' Units="' + replyOptions.timeUnits + '"';
        body += ' Dir="' + replyOptions.callbackDirection + '"';
    }
    return this.sendReceiveConfirm().then(() => this.sendSessionMessage({ reqid: constants_1.messages.replyWithMessage.reqid, body }));
}
async function flip(target) {
    return this.sendInfoAndReceiveResponse(constants_1.messages.flip, { target });
}
async function whisper() {
    return this.sendInfoAndReceiveResponse(constants_1.messages.whisper);
}
async function barge() {
    return this.sendInfoAndReceiveResponse(constants_1.messages.barge);
}
function park() {
    return this.sendInfoAndReceiveResponse(constants_1.messages.park);
}
function mute(silent) {
    if (this.state !== session_state_1.SessionState.Established) {
        this.logger.warn('An active session is required to mute audio');
        return;
    }
    if (this.muted) {
        this.logger.debug('Session already muted');
        return;
    }
    this.logger.log('Muting Audio');
    enableSenderTracks(this, false);
    this.muted = true;
    if (!silent) {
        this.emit(events_2.Events.Session.Muted, this);
    }
}
function unmute(silent) {
    if (this.state !== session_state_1.SessionState.Established) {
        this.logger.warn('An active session is required to unmute audio');
        return;
    }
    if (!this.muted) {
        this.logger.debug('Session not muted');
        return;
    }
    this.logger.log('Unmuting Audio');
    enableSenderTracks(this, true);
    this.muted = false;
    if (!silent) {
        this.emit(events_2.Events.Session.Unmuted, this);
    }
}
function addTrack(remoteAudioEle, localAudioEle) {
    const sessionDescriptionHandler = this
        .sessionDescriptionHandler;
    const peerConnection = sessionDescriptionHandler.peerConnection;
    let remoteAudio;
    let localAudio;
    if (remoteAudioEle && localAudioEle) {
        remoteAudio = remoteAudioEle;
        localAudio = localAudioEle;
    }
    else if (this.media) {
        remoteAudio = this.media.remote;
        localAudio = this.media.local;
    }
    else {
        throw new Error('HTML Media Element not Defined');
    }
    // TODO: peerConnecton.remoteMediaStream already has reciver track added thanks to default session description handler. Can we remove this code?
    let remoteStream = new MediaStream();
    if (peerConnection === null || peerConnection === void 0 ? void 0 : peerConnection.getReceivers) {
        peerConnection.getReceivers().forEach(receiver => {
            const rtrack = receiver.track;
            if (rtrack) {
                remoteStream.addTrack(rtrack);
                this.logger.log('Remote track added');
            }
        });
    }
    else {
        remoteStream = sessionDescriptionHandler.remoteMediaStream;
        this.logger.log('Remote track added');
    }
    remoteAudio.srcObject = remoteStream;
    remoteAudio.play().catch(() => {
        this.logger.error('Remote play was rejected');
    });
    // TODO: peerConnecton.localMediaStream already has sender track added thanks to default session description handler. Can we remove this code?
    let localStream = new MediaStream();
    if (peerConnection === null || peerConnection === void 0 ? void 0 : peerConnection.getSenders) {
        peerConnection.getSenders().forEach(sender => {
            const strack = sender.track;
            if (strack && strack.kind === 'audio') {
                localStream.addTrack(strack);
                this.logger.log('Local track added');
            }
        });
    }
    else {
        localStream = sessionDescriptionHandler.localMediaStream;
        this.logger.log('Local track added');
    }
    localAudio.srcObject = localStream;
    localAudio.play().catch(() => {
        this.logger.error('Local play was rejected');
    });
    if (localStream && remoteStream && !this.mediaStatsStarted) {
        this.mediaStreams = new mediaStreams_1.MediaStreams(this);
        this.logger.log('Start gathering media report');
        this.mediaStatsStarted = true;
        this.mediaStreams.getMediaStats((report) => {
            if (this.userAgent.enableMediaReportLogging) {
                this.logger.log(`Got media report: ${JSON.stringify(report)}`);
            }
            if (!this.reinviteForNoAudioSent && (0, rtpReport_1.isNoAudio)(report)) {
                this.logger.log('No audio report');
                this.noAudioReportCount++;
                if (this.noAudioReportCount === 3) {
                    this.logger.log('No audio for 6 sec. Trying to recover audio by sending Re-invite');
                    this.mediaStreams.reconnectMedia();
                    this.reinviteForNoAudioSent = true;
                    this.noAudioReportCount = 0;
                }
            }
            else if (!(0, rtpReport_1.isNoAudio)(report)) {
                this.noAudioReportCount = 0;
            }
        }, mediaCheckTimer);
    }
}
function stopMediaStats() {
    this.logger.log('Stopping media stats collection');
    if (!this) {
        return;
    }
    this.mediaStreams && this.mediaStreams.stopMediaStats();
    this.mediaStatsStarted = false;
    this.noAudioReportCount = 0;
}
async function blindTransfer(target, options = {}) {
    this.logger.log('Call transfer initiated');
    target =
        typeof target === 'string'
            ? sip_js_1.UserAgent.makeURI(`sip:${target}@${this.userAgent.sipInfo.domain}`)
            : target;
    return this.refer(target, options);
}
async function warmTransfer(target, options = { requestOptions: { extraHeaders: [] } }) {
    options.requestOptions.extraHeaders = (options.requestOptions.extraHeaders || []).concat(this.userAgent.defaultHeaders);
    target =
        typeof target === 'string'
            ? sip_js_1.UserAgent.makeURI(`sip:${target}@${this.userAgent.sipInfo.domain}`)
            : target;
    this.logger.log('Completing warm transfer');
    return this.refer(target, options);
}
async function transfer(target, options = { requestOptions: { extraHeaders: [] } }) {
    options.requestOptions.extraHeaders = (options.requestOptions.extraHeaders || []).concat(this.userAgent.defaultHeaders);
    return this.blindTransfer(target, options);
}
/**
 *
 * @param this WebPhoneSessionSessionInviteOptions
 * @param options
 * @returns Promise<OutgoingInviteRequest>
 *
 * Sends a reinvite. Also makes sure to regenerate a new SDP by passing offerToReceiveAudio: true, offerToReceiveVideo: false  and iceRestart: true
 * Once the SDP is ready, the local description is set and the SDP is sent to the remote peer along with an INVITE request
 */
function reinvite(options = {}) {
    var _a;
    options.sessionDescriptionHandlerOptions = Object.assign({}, options.sessionDescriptionHandlerOptions, {
        offerToReceiveAudio: true,
        offerToReceiveVideo: false,
        iceRestart: true,
    });
    options.requestDelegate = options.requestDelegate || {};
    const originalOnAccept = (_a = options.requestDelegate.onAccept) === null || _a === void 0 ? void 0 : _a.bind(options.requestDelegate);
    options.requestDelegate.onAccept = (...args) => {
        patchIncomingWebphoneSession(this);
        originalOnAccept && originalOnAccept(...args);
    };
    return this.invite(options);
}
async function hold() {
    this.stopMediaStats();
    try {
        this.logger.log('Hold Initiated');
        await setHold(this, true);
        this.logger.log('Hold completed, held is set to true');
    }
    catch (e) {
        throw new Error('Hold could not be completed');
    }
}
async function unhold() {
    try {
        this.logger.log('Unhold Initiated');
        await setHold(this, false);
        this.logger.log('Unhold completed, held is set to false');
    }
    catch (e) {
        throw new Error('Unhold could not be completed');
    }
}
function dtmf(dtmf, duration = 100, interToneGap = 50) {
    duration = parseInt(duration.toString());
    interToneGap = parseInt(interToneGap.toString());
    const sessionDescriptionHandler = this
        .sessionDescriptionHandler;
    const peerConnection = sessionDescriptionHandler.peerConnection;
    if (!peerConnection) {
        this.logger.error('Peer connection closed.');
        return;
    }
    const senders = peerConnection.getSenders();
    const audioSender = senders.find(sender => sender.track && sender.track.kind === 'audio');
    const dtmfSender = audioSender.dtmf;
    if (dtmfSender !== undefined && dtmfSender) {
        this.logger.log(`Send DTMF: ${dtmf} Duration: ${duration} InterToneGap: ${interToneGap}`);
        return dtmfSender.insertDTMF(dtmf, duration, interToneGap);
    }
    throw new Error('Send DTMF failed');
}
async function accept(options = {}) {
    options = options || {};
    options.extraHeaders = (options.extraHeaders || []).concat(this.userAgent.defaultHeaders);
    options.sessionDescriptionHandlerOptions = Object.assign({}, options.sessionDescriptionHandlerOptions);
    options.sessionDescriptionHandlerOptions.constraints =
        options.sessionDescriptionHandlerOptions.constraints ||
            Object.assign({}, this.userAgent.constraints, {
                optional: [{ DtlsSrtpKeyAgreement: 'true' }],
            });
    try {
        await this.__accept(options);
        this.startTime = new Date();
        this.emit(events_2.Events.Session.Accepted, this.request);
    }
    catch (e) {
        if (e.message.indexOf('Permission denied') !== -1) {
            this.emit(events_2.Events.Session.UserMediaFailed);
        }
    }
}
async function forward(target, acceptOptions, transferOptions) {
    await this.accept(acceptOptions);
    return new Promise(resolve => {
        this.mute();
        setTimeout(() => {
            resolve(this.transfer(target, transferOptions));
        }, 700);
    });
}
async function dispose() {
    stopMediaStreamStats(this);
    this.__dispose();
}
/* ---------------------------------------------------------- HELPER FUNCTIONS ---------------------------------------------------------- */
function parseRcHeaderString(str = '') {
    const pairs = str.split(/; */).filter(pair => pair.includes('=')); // skip things that don't look like key=value
    const result = {};
    for (const pair of pairs) {
        let [key, value] = pair.split('=');
        key = key.trim();
        value = value.trim();
        if (!(key in result)) {
            result[key] = value;
        }
    }
    return result;
}
function parseRcHeader(session) {
    const prc = session.request.getHeader('P-Rc');
    const prcCallInfo = session.request.getHeader('P-Rc-Api-Call-Info');
    if (prc) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(prc, 'text/xml');
        const hdrNode = xmlDoc.getElementsByTagName('Hdr')[0];
        const bdyNode = xmlDoc.getElementsByTagName('Bdy')[0];
        if (hdrNode) {
            session.rcHeaders = {
                sid: hdrNode.getAttribute('SID') || undefined,
                request: hdrNode.getAttribute('Req') || undefined,
                from: hdrNode.getAttribute('From') || undefined,
                to: hdrNode.getAttribute('To') || undefined,
            };
        }
        if (bdyNode) {
            (0, utils_1.extend)(session.rcHeaders, {
                srvLvl: bdyNode.getAttribute('SrvLvl'),
                srvLvlExt: bdyNode.getAttribute('SrvLvlExt'),
                nm: bdyNode.getAttribute('Nm'),
                toNm: bdyNode.getAttribute('ToNm'),
            });
        }
    }
    if (prcCallInfo) {
        const parsed = parseRcHeaderString(prcCallInfo);
        (0, utils_1.extend)(session.rcHeaders, parsed);
    }
}
async function setRecord(session, flag) {
    const message = flag ? constants_1.messages.startRecord : constants_1.messages.stopRecord;
    if ((session.__isRecording && !flag) || (!session.__isRecording && flag)) {
        const data = await session.sendInfoAndReceiveResponse(message);
        session.__isRecording = !!flag;
        return data;
    }
}
function enableReceiverTracks(session, enable) {
    const sessionDescriptionHandler = session.sessionDescriptionHandler;
    const peerConnection = sessionDescriptionHandler.peerConnection;
    if (!peerConnection) {
        session.logger.error('Peer connection closed.');
        return;
    }
    peerConnection.getReceivers().forEach(receiver => {
        if (receiver.track) {
            receiver.track.enabled = enable;
        }
    });
}
function enableSenderTracks(session, enable) {
    const sessionDescriptionHandler = session.sessionDescriptionHandler;
    const peerConnection = sessionDescriptionHandler.peerConnection;
    if (!peerConnection) {
        session.logger.error('Peer connection closed.');
        return;
    }
    peerConnection.getSenders().forEach(sender => {
        if (sender.track) {
            sender.track.enabled = enable;
        }
    });
}
function setHold(session, hold) {
    return new Promise((resolve, reject) => {
        // Just resolve if we are already in correct state
        if (session.held === hold) {
            return resolve();
        }
        const options = {
            requestDelegate: {
                onAccept: async (response) => {
                    session.held = hold;
                    const sessionDescriptionHandler = session.sessionDescriptionHandler;
                    const peerConnection = sessionDescriptionHandler.peerConnection;
                    const localSdp = peerConnection.localDescription.sdp;
                    const match = localSdp.match(/a=(sendrecv|sendonly|recvonly|inactive)/);
                    const direction = match ? match[1] : '';
                    session.__localHold =
                        response.message.statusCode === 200 && direction === 'sendonly';
                    session.logger.log('localhold is set to ' + session.__localHold);
                    enableReceiverTracks(session, !session.held);
                    enableSenderTracks(session, !session.held && !session.muted);
                    resolve();
                },
                onReject: () => {
                    session.logger.warn('re-invite request was rejected');
                    enableReceiverTracks(session, !session.held);
                    enableSenderTracks(session, !session.held && !session.muted);
                    reject();
                },
            },
        };
        // Session properties used to pass options to the SessionDescriptionHandler:
        //
        // 1) Session.sessionDescriptionHandlerOptions
        //    SDH options for the initial INVITE transaction.
        //    - Used in all cases when handling the initial INVITE transaction as either UAC or UAS.
        //    - May be set directly at anytime.
        //    - May optionally be set via constructor option.
        //    - May optionally be set via options passed to Inviter.invite() or Invitation.accept().
        //
        // 2) Session.sessionDescriptionHandlerOptionsReInvite
        //    SDH options for re-INVITE transactions.
        //    - Used in all cases when handling a re-INVITE transaction as either UAC or UAS.
        //    - May be set directly at anytime.
        //    - May optionally be set via constructor option.
        //    - May optionally be set via options passed to Session.invite().
        const sessionDescriptionHandlerOptions = session.sessionDescriptionHandlerOptionsReInvite;
        sessionDescriptionHandlerOptions.hold = hold;
        session.sessionDescriptionHandlerOptionsReInvite =
            sessionDescriptionHandlerOptions;
        // Send re-INVITE
        session
            .invite(options)
            .then(() => {
            // preemptively enable/disable tracks
            enableReceiverTracks(session, !hold);
            enableSenderTracks(session, !hold && !session.muted);
        })
            .catch((error) => {
            if (error instanceof sip_js_1.RequestPendingError) {
                session.logger.error('A hold request is already in progress.');
            }
            reject(error);
        });
    });
}
function stopPlaying(session) {
    session.userAgent.audioHelper.playOutgoing(false);
    session.userAgent.audioHelper.playIncoming(false);
}
function onSessionDescriptionHandlerCreated(session) {
    if (!session.userAgent.enableQos) {
        return;
    }
    session.logger.log('SessionDescriptionHandler created');
    (0, qos_1.startQosStatsCollection)(session);
    navigator.mediaDevices.enumerateDevices().then(devices => {
        devices.forEach(device => session.logger.log(`${device.kind} = ${device.label} ${JSON.stringify(device)}`));
    });
}
exports.onSessionDescriptionHandlerCreated = onSessionDescriptionHandlerCreated;
function setupUserAgentCoreEvent(session) {
    if (session.__userAgentCoreEventsSetup) {
        return;
    }
    const userAgentCore = session.userAgent.userAgentCore;
    userAgentCore.on(events_2.Events.Session.UpdateReceived, payload => session.emit(events_2.Events.Session.UpdateReceived, payload));
    userAgentCore.on(events_2.Events.Session.MoveToRcv, payload => session.emit(events_2.Events.Session.MoveToRcv, payload));
    // RC_SIP_INFO event is for internal use
    userAgentCore.on('RC_SIP_INFO', payload => session.emit('RC_SIP_INFO', payload));
    session.__userAgentCoreEventsSetup = true;
}
function stopMediaStreamStats(session) {
    if (session.mediaStreams) {
        session.logger.log('Releasing media streams');
        session.mediaStreams.release();
    }
}
function onLocalHold() {
    return this.__localHold;
}
function setQosStats(stats) {
    this.__qosStats.cpuOS = stats.cpuOS || '0:0:0';
    this.__qosStats.cpuRC = stats.cpuRC || '0:0:0';
    this.__qosStats.ram = stats.ram || '0:0:0';
    this.__qosStats.netType = stats.netType || undefined;
}


/***/ }),

/***/ "./src/sessionDescriptionHandler.ts":
/*!******************************************!*\
  !*** ./src/sessionDescriptionHandler.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.defaultSessionDescriptionFactory = exports.defaultMediaStreamFactory = exports.defaultPeerConnectionConfiguration = exports.SessionDescriptionHandler = void 0;
/**
 * A base class implementing a WebRTC session description handler for sip.js.
 * @remarks
 * It is expected/intended to be extended by specific WebRTC based applications.
 * @privateRemarks
 * So do not put application specific implementation in here.
 * @public
 */
class SessionDescriptionHandler {
    /**
     * Constructor
     * @param logger - A logger
     * @param mediaStreamFactory - A factory to provide a MediaStream
     * @param options - Options passed from the SessionDescriptionHandleFactory
     */
    constructor(logger, mediaStreamFactory, sessionDescriptionHandlerConfiguration) {
        logger.debug('SessionDescriptionHandler.constructor');
        this.logger = logger;
        this.mediaStreamFactory = mediaStreamFactory;
        this.sessionDescriptionHandlerConfiguration =
            sessionDescriptionHandlerConfiguration;
        this._localMediaStream = new MediaStream();
        this._remoteMediaStream = new MediaStream();
        this._peerConnection = new RTCPeerConnection(sessionDescriptionHandlerConfiguration === null || sessionDescriptionHandlerConfiguration === void 0 ? void 0 : sessionDescriptionHandlerConfiguration.peerConnectionConfiguration);
        this.initPeerConnectionEventHandlers();
    }
    /**
     * The local media stream currently being sent.
     *
     * @remarks
     * The local media stream initially has no tracks, so the presence of tracks
     * should not be assumed. Furthermore, tracks may be added or removed if the
     * local media changes - for example, on upgrade from audio only to a video session.
     * At any given time there will be at most one audio track and one video track
     * (it's possible that this restriction may not apply to sub-classes).
     * Use `MediaStream.onaddtrack` or add a listener for the `addtrack` event
     * to detect when a new track becomes available:
     * https://developer.mozilla.org/en-US/docs/Web/API/MediaStream/onaddtrack
     */
    get localMediaStream() {
        return this._localMediaStream;
    }
    /**
     * The remote media stream currently being received.
     *
     * @remarks
     * The remote media stream initially has no tracks, so the presence of tracks
     * should not be assumed. Furthermore, tracks may be added or removed if the
     * remote media changes - for example, on upgrade from audio only to a video session.
     * At any given time there will be at most one audio track and one video track
     * (it's possible that this restriction may not apply to sub-classes).
     * Use `MediaStream.onaddtrack` or add a listener for the `addtrack` event
     * to detect when a new track becomes available:
     * https://developer.mozilla.org/en-US/docs/Web/API/MediaStream/onaddtrack
     */
    get remoteMediaStream() {
        return this._remoteMediaStream;
    }
    /**
     * The data channel. Undefined before it is created.
     */
    get dataChannel() {
        return this._dataChannel;
    }
    /**
     * The peer connection. Undefined if peer connection has closed.
     *
     * @remarks
     * While access to the underlying `RTCPeerConnection` is provided, note that
     * using methods with modify it may break the operation of this class.
     * In particular, this class depends on exclusive access to the
     * event handler properties. If you need access to the peer connection
     * events, either register for events using `addEventListener()` on
     * the `RTCPeerConnection` or set the `peerConnectionDelegate` on
     * this `SessionDescriptionHandler`.
     */
    get peerConnection() {
        return this._peerConnection;
    }
    /**
     * A delegate which provides access to the peer connection event handlers.
     *
     * @remarks
     * Setting the peer connection event handlers directly is not supported
     * and may break this class. As this class depends on exclusive access
     * to them, a delegate may be set which provides alternative access to
     * the event handlers in a fashion which is supported.
     */
    get peerConnectionDelegate() {
        return this._peerConnectionDelegate;
    }
    set peerConnectionDelegate(delegate) {
        this._peerConnectionDelegate = delegate;
    }
    // The addtrack event does not get fired when JavaScript code explicitly adds tracks to the stream (by calling addTrack()).
    // https://developer.mozilla.org/en-US/docs/Web/API/MediaStream/onaddtrack
    static dispatchAddTrackEvent(stream, track) {
        stream.dispatchEvent(new MediaStreamTrackEvent('addtrack', { track }));
    }
    // The removetrack event does not get fired when JavaScript code explicitly removes tracks from the stream (by calling removeTrack()).
    // https://developer.mozilla.org/en-US/docs/Web/API/MediaStream/onremovetrack
    static dispatchRemoveTrackEvent(stream, track) {
        stream.dispatchEvent(new MediaStreamTrackEvent('removetrack', { track }));
    }
    /**
     * Stop tracks and close peer connection.
     */
    close() {
        this.logger.debug('SessionDescriptionHandler.close');
        if (this._peerConnection === undefined) {
            return;
        }
        this._peerConnection.getReceivers().forEach(receiver => {
            receiver.track && receiver.track.stop();
        });
        this._peerConnection.getSenders().forEach(sender => {
            sender.track && sender.track.stop();
        });
        if (this._dataChannel) {
            this._dataChannel.close();
        }
        this._peerConnection.close();
        this._peerConnection = undefined;
    }
    /**
     * Creates an offer or answer.
     * @param options - Options bucket.
     * @param modifiers - Modifiers.
     */
    getDescription(options, modifiers) {
        var _a, _b;
        this.logger.debug('SessionDescriptionHandler.getDescription');
        if (this._peerConnection === undefined) {
            return Promise.reject(new Error('Peer connection closed.'));
        }
        // Callback on data channel creation
        this.onDataChannel = options === null || options === void 0 ? void 0 : options.onDataChannel;
        // ICE will restart upon applying an offer created with the iceRestart option
        const iceRestart = (_a = options === null || options === void 0 ? void 0 : options.offerOptions) === null || _a === void 0 ? void 0 : _a.iceRestart;
        // ICE gathering timeout may be set on a per call basis, otherwise the configured default is used
        const iceTimeout = (options === null || options === void 0 ? void 0 : options.iceGatheringTimeout) === undefined
            ? (_b = this.sessionDescriptionHandlerConfiguration) === null || _b === void 0 ? void 0 : _b.iceGatheringTimeout
            : options === null || options === void 0 ? void 0 : options.iceGatheringTimeout;
        return this.getLocalMediaStream(options)
            .then(() => this.enableSenderDscp())
            .then(() => this.updateDirection(options))
            .then(() => this.createDataChannel(options))
            .then(() => this.createLocalOfferOrAnswer(options))
            .then(sessionDescription => this.applyModifiers(sessionDescription, modifiers))
            .then(sessionDescription => this.setLocalSessionDescription(sessionDescription))
            .then(() => this.waitForIceGatheringComplete(iceRestart, iceTimeout))
            .then(() => this.getLocalSessionDescription())
            .then(sessionDescription => {
            return {
                body: sessionDescription.sdp,
                contentType: 'application/sdp',
            };
        })
            .catch(error => {
            this.logger.error('SessionDescriptionHandler.getDescription failed - ' + error);
            throw error;
        });
    }
    /**
     * Returns true if the SessionDescriptionHandler can handle the Content-Type described by a SIP message.
     * @param contentType - The content type that is in the SIP Message.
     */
    hasDescription(contentType) {
        this.logger.debug('SessionDescriptionHandler.hasDescription');
        return contentType === 'application/sdp';
    }
    /**
     * Send DTMF via RTP (RFC 4733).
     * Returns true if DTMF send is successful, false otherwise.
     * @param tones - A string containing DTMF digits.
     * @param options - Options object to be used by sendDtmf.
     */
    sendDtmf(tones, options) {
        this.logger.debug('SessionDescriptionHandler.sendDtmf');
        if (this._peerConnection === undefined) {
            this.logger.error('SessionDescriptionHandler.sendDtmf failed - peer connection closed');
            return false;
        }
        const senders = this._peerConnection.getSenders();
        if (senders.length === 0) {
            this.logger.error('SessionDescriptionHandler.sendDtmf failed - no senders');
            return false;
        }
        const dtmfSender = senders[0].dtmf;
        if (!dtmfSender) {
            this.logger.error('SessionDescriptionHandler.sendDtmf failed - no DTMF sender');
            return false;
        }
        const duration = options === null || options === void 0 ? void 0 : options.duration;
        const interToneGap = options === null || options === void 0 ? void 0 : options.interToneGap;
        try {
            dtmfSender.insertDTMF(tones, duration, interToneGap);
        }
        catch (e) {
            this.logger.error(e);
            return false;
        }
        this.logger.log('SessionDescriptionHandler.sendDtmf sent via RTP: ' + tones.toString());
        return true;
    }
    /**
     * Sets an offer or answer.
     * @param sdp - The session description.
     * @param options - Options bucket.
     * @param modifiers - Modifiers.
     */
    setDescription(sdp, options, modifiers) {
        this.logger.debug('SessionDescriptionHandler.setDescription');
        if (this._peerConnection === undefined) {
            return Promise.reject(new Error('Peer connection closed.'));
        }
        // Callback on data channel creation
        this.onDataChannel = options === null || options === void 0 ? void 0 : options.onDataChannel;
        // SDP type
        const type = this._peerConnection.signalingState === 'have-local-offer'
            ? 'answer'
            : 'offer';
        return this.getLocalMediaStream(options)
            .then(() => this.applyModifiers({ sdp, type }, modifiers))
            .then(sessionDescription => this.setRemoteSessionDescription(sessionDescription))
            .catch(error => {
            this.logger.error('SessionDescriptionHandler.setDescription failed - ' + error);
            throw error;
        });
    }
    /**
     * Applies modifiers to SDP prior to setting the local or remote description.
     * @param sdp - SDP to modify.
     * @param modifiers - Modifiers to apply.
     */
    applyModifiers(sdp, modifiers) {
        this.logger.debug('SessionDescriptionHandler.applyModifiers');
        if (!modifiers || modifiers.length === 0) {
            return Promise.resolve(sdp);
        }
        return modifiers
            .reduce((cur, next) => cur.then(next), Promise.resolve(sdp))
            .then(modified => {
            this.logger.debug('SessionDescriptionHandler.applyModifiers - modified sdp');
            if (!modified.sdp || !modified.type) {
                throw new Error('Invalid SDP.');
            }
            return { sdp: modified.sdp, type: modified.type };
        });
    }
    /**
     * Create a data channel.
     * @remarks
     * Only creates a data channel if SessionDescriptionHandlerOptions.dataChannel is true.
     * Only creates a data channel if creating a local offer.
     * Only if one does not already exist.
     * @param options - Session description handler options.
     */
    createDataChannel(options) {
        if (this._peerConnection === undefined) {
            return Promise.reject(new Error('Peer connection closed.'));
        }
        // only create a data channel if requested
        if ((options === null || options === void 0 ? void 0 : options.dataChannel) !== true) {
            return Promise.resolve();
        }
        // do not create a data channel if we already have one
        if (this._dataChannel) {
            return Promise.resolve();
        }
        switch (this._peerConnection.signalingState) {
            case 'stable':
                // if we are stable, assume we are creating a local offer so create a data channel
                this.logger.debug('SessionDescriptionHandler.createDataChannel - creating data channel');
                try {
                    this._dataChannel = this._peerConnection.createDataChannel((options === null || options === void 0 ? void 0 : options.dataChannelLabel) || '', options === null || options === void 0 ? void 0 : options.dataChannelOptions);
                    if (this.onDataChannel) {
                        this.onDataChannel(this._dataChannel);
                    }
                    return Promise.resolve();
                }
                catch (error) {
                    return Promise.reject(error);
                }
            case 'have-remote-offer':
                return Promise.resolve();
            case 'have-local-offer':
            case 'have-local-pranswer':
            case 'have-remote-pranswer':
            case 'closed':
            default:
                return Promise.reject(new Error('Invalid signaling state ' + this._peerConnection.signalingState));
        }
    }
    /**
     * Depending on current signaling state, create a local offer or answer.
     * @param options - Session description handler options.
     */
    createLocalOfferOrAnswer(options) {
        if (this._peerConnection === undefined) {
            return Promise.reject(new Error('Peer connection closed.'));
        }
        switch (this._peerConnection.signalingState) {
            case 'stable':
                // if we are stable, assume we are creating a local offer
                this.logger.debug('SessionDescriptionHandler.createLocalOfferOrAnswer - creating SDP offer');
                return this._peerConnection.createOffer(options === null || options === void 0 ? void 0 : options.offerOptions);
            case 'have-remote-offer':
                // if we have a remote offer, assume we are creating a local answer
                this.logger.debug('SessionDescriptionHandler.createLocalOfferOrAnswer - creating SDP answer');
                return this._peerConnection.createAnswer(options === null || options === void 0 ? void 0 : options.answerOptions);
            case 'have-local-offer':
            case 'have-local-pranswer':
            case 'have-remote-pranswer':
            case 'closed':
            default:
                return Promise.reject(new Error('Invalid signaling state ' + this._peerConnection.signalingState));
        }
    }
    /**
     * Get a media stream from the media stream factory and set the local media stream.
     * @param options - Session description handler options.
     */
    getLocalMediaStream(options) {
        this.logger.debug('SessionDescriptionHandler.getLocalMediaStream');
        if (this._peerConnection === undefined) {
            return Promise.reject(new Error('Peer connection closed.'));
        }
        let constraints = { ...options === null || options === void 0 ? void 0 : options.constraints };
        // if we already have a local media stream...
        if (this.localMediaStreamConstraints) {
            // ignore constraint "downgrades"
            constraints.audio =
                constraints.audio || this.localMediaStreamConstraints.audio;
            constraints.video =
                constraints.video || this.localMediaStreamConstraints.video;
            // if constraints have not changed, do not get a new media stream
            if (JSON.stringify(this.localMediaStreamConstraints.audio) ===
                JSON.stringify(constraints.audio) &&
                JSON.stringify(this.localMediaStreamConstraints.video) ===
                    JSON.stringify(constraints.video)) {
                return Promise.resolve();
            }
        }
        else {
            // if no constraints have been specified, default to audio for initial media stream
            if (constraints.audio === undefined && constraints.video === undefined) {
                constraints = { audio: true };
            }
        }
        this.localMediaStreamConstraints = constraints;
        return this.mediaStreamFactory(constraints, this).then(mediaStream => this.setLocalMediaStream(mediaStream));
    }
    /**
     * Sets the encoding priorty to high for sender track.
     *
     */
    enableSenderDscp() {
        var _a;
        if (!((_a = this.sessionDescriptionHandlerConfiguration) === null || _a === void 0 ? void 0 : _a.enableDscp)) {
            return Promise.all([]);
        }
        if (!this._peerConnection) {
            throw new Error('Peer connection undefined.');
        }
        return Promise.all(this._peerConnection
            .getSenders()
            .filter(sender => sender.track)
            .map(sender => {
            const parameters = sender.getParameters();
            console.info('getsender params =', parameters);
            parameters.priority = 'high';
            return sender.setParameters(parameters).catch(error => {
                console.error(`Error while setting encodings parameters for ${sender.track.kind} Track ${sender.track.id}: ${error.message || error.name}`);
            });
        }));
    }
    /**
     * Sets the peer connection's sender tracks and local media stream tracks.
     *
     * @remarks
     * Only the first audio and video tracks of the provided MediaStream are utilized.
     * Adds tracks if audio and/or video tracks are not already present, otherwise replaces tracks.
     *
     * @param stream - Media stream containing tracks to be utilized.
     */
    setLocalMediaStream(stream) {
        this.logger.debug('SessionDescriptionHandler.setLocalMediaStream');
        if (!this._peerConnection) {
            throw new Error('Peer connection undefined.');
        }
        const pc = this._peerConnection;
        const localStream = this._localMediaStream;
        const trackUpdates = [];
        const updateTrack = (newTrack) => {
            const kind = newTrack.kind;
            if (kind !== 'audio' && kind !== 'video') {
                throw new Error(`Unknown new track kind ${kind}.`);
            }
            const s = pc.getSenders();
            const sender = pc
                .getSenders()
                .find(sender => sender.track && sender.track.kind === kind);
            if (sender) {
                trackUpdates.push(new Promise(resolve => {
                    this.logger.debug(`SessionDescriptionHandler.setLocalMediaStream - replacing sender ${kind} track`);
                    resolve();
                }).then(() => sender
                    .replaceTrack(newTrack)
                    .then(() => {
                    const oldTrack = localStream
                        .getTracks()
                        .find(localTrack => localTrack.kind === kind);
                    if (oldTrack) {
                        oldTrack.stop();
                        localStream.removeTrack(oldTrack);
                        SessionDescriptionHandler.dispatchRemoveTrackEvent(localStream, oldTrack);
                    }
                    localStream.addTrack(newTrack);
                    SessionDescriptionHandler.dispatchAddTrackEvent(localStream, newTrack);
                })
                    .catch((error) => {
                    this.logger.error(`SessionDescriptionHandler.setLocalMediaStream - failed to replace sender ${kind} track`);
                    throw error;
                })));
            }
            else {
                trackUpdates.push(new Promise(resolve => {
                    this.logger.debug(`SessionDescriptionHandler.setLocalMediaStream - adding sender ${kind} track`);
                    resolve();
                }).then(() => {
                    // Review: could make streamless tracks a configurable option?
                    // https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection/addTrack#Usage_notes
                    try {
                        pc.addTrack(newTrack, localStream);
                    }
                    catch (error) {
                        this.logger.error(`SessionDescriptionHandler.setLocalMediaStream - failed to add sender ${kind} track`);
                        throw error;
                    }
                    localStream.addTrack(newTrack);
                    SessionDescriptionHandler.dispatchAddTrackEvent(localStream, newTrack);
                }));
            }
        };
        // update peer connection audio tracks
        const audioTracks = stream.getAudioTracks();
        if (audioTracks.length) {
            updateTrack(audioTracks[0]);
        }
        // update peer connection video tracks
        const videoTracks = stream.getVideoTracks();
        if (videoTracks.length) {
            updateTrack(videoTracks[0]);
        }
        return trackUpdates.reduce((p, x) => p.then(() => x), Promise.resolve());
    }
    /**
     * Gets the peer connection's local session description.
     */
    getLocalSessionDescription() {
        this.logger.debug('SessionDescriptionHandler.getLocalSessionDescription');
        if (this._peerConnection === undefined) {
            return Promise.reject(new Error('Peer connection closed.'));
        }
        const sdp = this._peerConnection.localDescription;
        if (!sdp) {
            return Promise.reject(new Error('Failed to get local session description'));
        }
        return Promise.resolve(sdp);
    }
    /**
     * Sets the peer connection's local session description.
     * @param sessionDescription - sessionDescription The session description.
     */
    setLocalSessionDescription(sessionDescription) {
        this.logger.debug('SessionDescriptionHandler.setLocalSessionDescription');
        if (this._peerConnection === undefined) {
            return Promise.reject(new Error('Peer connection closed.'));
        }
        return this._peerConnection.setLocalDescription(sessionDescription);
    }
    /**
     * Sets the peer connection's remote session description.
     * @param sessionDescription - The session description.
     */
    setRemoteSessionDescription(sessionDescription) {
        this.logger.debug('SessionDescriptionHandler.setRemoteSessionDescription');
        if (this._peerConnection === undefined) {
            return Promise.reject(new Error('Peer connection closed.'));
        }
        const sdp = sessionDescription.sdp;
        let type;
        switch (this._peerConnection.signalingState) {
            case 'stable':
                // if we are stable assume this is a remote offer
                type = 'offer';
                break;
            case 'have-local-offer':
                // if we made an offer, assume this is a remote answer
                type = 'answer';
                break;
            case 'have-local-pranswer':
            case 'have-remote-offer':
            case 'have-remote-pranswer':
            case 'closed':
            default:
                return Promise.reject(new Error('Invalid signaling state ' + this._peerConnection.signalingState));
        }
        if (!sdp) {
            this.logger.error('SessionDescriptionHandler.setRemoteSessionDescription failed - cannot set null sdp');
            return Promise.reject(new Error('SDP is undefined'));
        }
        return this._peerConnection.setRemoteDescription({ sdp, type });
    }
    /**
     * Sets a remote media stream track.
     *
     * @remarks
     * Adds tracks if audio and/or video tracks are not already present, otherwise replaces tracks.
     *
     * @param track - Media stream track to be utilized.
     */
    setRemoteTrack(track) {
        this.logger.debug('SessionDescriptionHandler.setRemoteTrack');
        const remoteStream = this._remoteMediaStream;
        if (remoteStream.getTrackById(track.id)) {
            this.logger.debug(`SessionDescriptionHandler.setRemoteTrack - have remote ${track.kind} track`);
        }
        else if (track.kind === 'audio') {
            this.logger.debug(`SessionDescriptionHandler.setRemoteTrack - adding remote ${track.kind} track`);
            remoteStream.getAudioTracks().forEach(track => {
                track.stop();
                remoteStream.removeTrack(track);
                SessionDescriptionHandler.dispatchRemoveTrackEvent(remoteStream, track);
            });
            remoteStream.addTrack(track);
            SessionDescriptionHandler.dispatchAddTrackEvent(remoteStream, track);
        }
        else if (track.kind === 'video') {
            this.logger.debug(`SessionDescriptionHandler.setRemoteTrack - adding remote ${track.kind} track`);
            remoteStream.getVideoTracks().forEach(track => {
                track.stop();
                remoteStream.removeTrack(track);
                SessionDescriptionHandler.dispatchRemoveTrackEvent(remoteStream, track);
            });
            remoteStream.addTrack(track);
            SessionDescriptionHandler.dispatchAddTrackEvent(remoteStream, track);
        }
    }
    /**
     * Depending on the current signaling state and the session hold state, update transceiver direction.
     * @param options - Session description handler options.
     */
    updateDirection(options) {
        if (this._peerConnection === undefined) {
            return Promise.reject(new Error('Peer connection closed.'));
        }
        // 4.2.3.  setDirection
        //
        //    The setDirection method sets the direction of a transceiver, which
        //    affects the direction property of the associated "m=" section on
        //    future calls to createOffer and createAnswer.  The permitted values
        //    for direction are "recvonly", "sendrecv", "sendonly", and "inactive",
        //    mirroring the identically named direction attributes defined in
        //    [RFC4566], Section 6.
        //
        //    When creating offers, the transceiver direction is directly reflected
        //    in the output, even for re-offers.  When creating answers, the
        //    transceiver direction is intersected with the offered direction, as
        //    explained in Section 5.3 below.
        //
        //    Note that while setDirection sets the direction property of the
        //    transceiver immediately (Section 4.2.4), this property does not
        //    immediately affect whether the transceiver's RtpSender will send or
        //    its RtpReceiver will receive.  The direction in effect is represented
        //    by the currentDirection property, which is only updated when an
        //    answer is applied.
        //
        // 4.2.4.  direction
        //
        //    The direction property indicates the last value passed into
        //    setDirection.  If setDirection has never been called, it is set to
        //    the direction the transceiver was initialized with.
        //
        // 4.2.5.  currentDirection
        //
        //    The currentDirection property indicates the last negotiated direction
        //    for the transceiver's associated "m=" section.  More specifically, it
        //    indicates the direction attribute [RFC3264] of the associated "m="
        //    section in the last applied answer (including provisional answers),
        //    with "send" and "recv" directions reversed if it was a remote answer.
        //    For example, if the direction attribute for the associated "m="
        //    section in a remote answer is "recvonly", currentDirection is set to
        //    "sendonly".
        //
        //    If an answer that references this transceiver has not yet been
        //    applied or if the transceiver is stopped, currentDirection is set to
        //    "null".
        //  https://tools.ietf.org/html/rfc8829#section-4.2.3
        //
        // *  A direction attribute, determined by applying the rules regarding
        //    the offered direction specified in [RFC3264], Section 6.1, and
        //    then intersecting with the direction of the associated
        //    RtpTransceiver.  For example, in the case where an "m=" section is
        //    offered as "sendonly" and the local transceiver is set to
        //    "sendrecv", the result in the answer is a "recvonly" direction.
        // https://tools.ietf.org/html/rfc8829#section-5.3.1
        //
        // If a stream is offered as sendonly, the corresponding stream MUST be
        // marked as recvonly or inactive in the answer.  If a media stream is
        // listed as recvonly in the offer, the answer MUST be marked as
        // sendonly or inactive in the answer.  If an offered media stream is
        // listed as sendrecv (or if there is no direction attribute at the
        // media or session level, in which case the stream is sendrecv by
        // default), the corresponding stream in the answer MAY be marked as
        // sendonly, recvonly, sendrecv, or inactive.  If an offered media
        // stream is listed as inactive, it MUST be marked as inactive in the
        // answer.
        // https://tools.ietf.org/html/rfc3264#section-6.1
        switch (this._peerConnection.signalingState) {
            case 'stable':
                // if we are stable, assume we are creating a local offer
                this.logger.debug('SessionDescriptionHandler.updateDirection - setting offer direction');
                {
                    // determine the direction to offer given the current direction and hold state
                    const directionToOffer = (currentDirection) => {
                        switch (currentDirection) {
                            case 'inactive':
                                return (options === null || options === void 0 ? void 0 : options.hold) ? 'inactive' : 'recvonly';
                            case 'recvonly':
                                return (options === null || options === void 0 ? void 0 : options.hold) ? 'inactive' : 'recvonly';
                            case 'sendonly':
                                return (options === null || options === void 0 ? void 0 : options.hold) ? 'sendonly' : 'sendrecv';
                            case 'sendrecv':
                                return (options === null || options === void 0 ? void 0 : options.hold) ? 'sendonly' : 'sendrecv';
                            case 'stopped':
                                return 'stopped';
                            default:
                                throw new Error('Should never happen');
                        }
                    };
                    // set the transceiver direction to the offer direction
                    this._peerConnection.getTransceivers().forEach(transceiver => {
                        if (transceiver.direction /* guarding, but should always be true */) {
                            const offerDirection = directionToOffer(transceiver.direction);
                            if (transceiver.direction !== offerDirection) {
                                transceiver.direction = offerDirection;
                            }
                        }
                    });
                }
                break;
            case 'have-remote-offer':
                // if we have a remote offer, assume we are creating a local answer
                this.logger.debug('SessionDescriptionHandler.updateDirection - setting answer direction');
                // FIXME: This is not the correct way to determine the answer direction as it is only
                // considering first match in the offered SDP and using that to determine the answer direction.
                // While that may be fine for our current use cases, it is not a generally correct approach.
                {
                    // determine the offered direction
                    const offeredDirection = (() => {
                        const description = this._peerConnection.remoteDescription;
                        if (!description) {
                            throw new Error('Failed to read remote offer');
                        }
                        const searchResult = /a=sendrecv\r\n|a=sendonly\r\n|a=recvonly\r\n|a=inactive\r\n/.exec(description.sdp);
                        if (searchResult) {
                            switch (searchResult[0]) {
                                case 'a=inactive\r\n':
                                    return 'inactive';
                                case 'a=recvonly\r\n':
                                    return 'recvonly';
                                case 'a=sendonly\r\n':
                                    return 'sendonly';
                                case 'a=sendrecv\r\n':
                                    return 'sendrecv';
                                default:
                                    throw new Error('Should never happen');
                            }
                        }
                        return 'sendrecv';
                    })();
                    // determine the answer direction based on the offered direction and our hold state
                    const answerDirection = (() => {
                        switch (offeredDirection) {
                            case 'inactive':
                                return 'inactive';
                            case 'recvonly':
                                return 'sendonly';
                            case 'sendonly':
                                return (options === null || options === void 0 ? void 0 : options.hold) ? 'inactive' : 'recvonly';
                            case 'sendrecv':
                                return (options === null || options === void 0 ? void 0 : options.hold) ? 'sendonly' : 'sendrecv';
                            default:
                                throw new Error('Should never happen');
                        }
                    })();
                    // set the transceiver direction to the answer direction
                    this._peerConnection.getTransceivers().forEach(transceiver => {
                        if (transceiver.direction /* guarding, but should always be true */) {
                            if (transceiver.direction !== 'stopped' &&
                                transceiver.direction !== answerDirection) {
                                transceiver.direction = answerDirection;
                            }
                        }
                    });
                }
                break;
            case 'have-local-offer':
            case 'have-local-pranswer':
            case 'have-remote-pranswer':
            case 'closed':
            default:
                return Promise.reject(new Error('Invalid signaling state ' + this._peerConnection.signalingState));
        }
        return Promise.resolve();
    }
    /**
     * Called when ICE gathering completes and resolves any waiting promise.
     */
    iceGatheringComplete() {
        this.logger.debug('SessionDescriptionHandler.iceGatheringComplete');
        // clear timer if need be
        if (this.iceGatheringCompleteTimeoutId !== undefined) {
            this.logger.debug('SessionDescriptionHandler.iceGatheringComplete - clearing timeout');
            clearTimeout(this.iceGatheringCompleteTimeoutId);
            this.iceGatheringCompleteTimeoutId = undefined;
        }
        // resolve and cleanup promise if need be
        if (this.iceGatheringCompletePromise !== undefined) {
            this.logger.debug('SessionDescriptionHandler.iceGatheringComplete - resolving promise');
            this.iceGatheringCompleteResolve && this.iceGatheringCompleteResolve();
            this.iceGatheringCompletePromise = undefined;
            this.iceGatheringCompleteResolve = undefined;
            this.iceGatheringCompleteReject = undefined;
        }
    }
    /**
     * Wait for ICE gathering to complete.
     * @param restart - If true, waits if current state is "complete" (waits for transition to "complete").
     * @param timeout - Milliseconds after which waiting times out. No timeout if 0.
     */
    waitForIceGatheringComplete(restart = false, timeout = 0) {
        this.logger.debug('SessionDescriptionHandler.waitForIceGatheringToComplete');
        if (this._peerConnection === undefined) {
            return Promise.reject('Peer connection closed.');
        }
        // guard already complete
        if (!restart && this._peerConnection.iceGatheringState === 'complete') {
            this.logger.debug('SessionDescriptionHandler.waitForIceGatheringToComplete - already complete');
            return Promise.resolve();
        }
        // only one may be waiting, reject any prior
        if (this.iceGatheringCompletePromise !== undefined) {
            this.logger.debug('SessionDescriptionHandler.waitForIceGatheringToComplete - rejecting prior waiting promise');
            this.iceGatheringCompleteReject &&
                this.iceGatheringCompleteReject(new Error('Promise superseded.'));
            this.iceGatheringCompletePromise = undefined;
            this.iceGatheringCompleteResolve = undefined;
            this.iceGatheringCompleteReject = undefined;
        }
        this.iceGatheringCompletePromise = new Promise((resolve, reject) => {
            this.iceGatheringCompleteResolve = resolve;
            this.iceGatheringCompleteReject = reject;
            if (timeout > 0) {
                this.logger.debug('SessionDescriptionHandler.waitForIceGatheringToComplete - timeout in ' +
                    timeout);
                this.iceGatheringCompleteTimeoutId = setTimeout(() => {
                    this.logger.debug('SessionDescriptionHandler.waitForIceGatheringToComplete - timeout');
                    this.iceGatheringComplete();
                }, timeout);
            }
        });
        return this.iceGatheringCompletePromise;
    }
    /**
     * Initializes the peer connection event handlers
     */
    initPeerConnectionEventHandlers() {
        this.logger.debug('SessionDescriptionHandler.initPeerConnectionEventHandlers');
        if (!this._peerConnection) {
            throw new Error('Peer connection undefined.');
        }
        const peerConnection = this._peerConnection;
        peerConnection.onconnectionstatechange = (event) => {
            var _a;
            const newState = peerConnection.connectionState;
            this.logger.debug(`SessionDescriptionHandler.onconnectionstatechange ${newState}`);
            if ((_a = this._peerConnectionDelegate) === null || _a === void 0 ? void 0 : _a.onconnectionstatechange) {
                this._peerConnectionDelegate.onconnectionstatechange(event);
            }
        };
        peerConnection.ondatachannel = (event) => {
            var _a;
            this.logger.debug('SessionDescriptionHandler.ondatachannel');
            this._dataChannel = event.channel;
            if (this.onDataChannel) {
                this.onDataChannel(this._dataChannel);
            }
            if ((_a = this._peerConnectionDelegate) === null || _a === void 0 ? void 0 : _a.ondatachannel) {
                this._peerConnectionDelegate.ondatachannel(event);
            }
        };
        peerConnection.onicecandidate = (event) => {
            var _a;
            this.logger.debug('SessionDescriptionHandler.onicecandidate');
            if ((_a = this._peerConnectionDelegate) === null || _a === void 0 ? void 0 : _a.onicecandidate) {
                this._peerConnectionDelegate.onicecandidate(event);
            }
        };
        peerConnection.onicecandidateerror = ((event) => {
            var _a;
            this.logger.debug('SessionDescriptionHandler.onicecandidateerror');
            if ((_a = this._peerConnectionDelegate) === null || _a === void 0 ? void 0 : _a.onicecandidateerror) {
                this._peerConnectionDelegate.onicecandidateerror(event);
            }
        });
        peerConnection.oniceconnectionstatechange = (event) => {
            var _a;
            const newState = peerConnection.iceConnectionState;
            this.logger.debug(`SessionDescriptionHandler.oniceconnectionstatechange ${newState}`);
            if ((_a = this._peerConnectionDelegate) === null || _a === void 0 ? void 0 : _a.oniceconnectionstatechange) {
                this._peerConnectionDelegate.oniceconnectionstatechange(event);
            }
        };
        peerConnection.onicegatheringstatechange = (event) => {
            var _a;
            const newState = peerConnection.iceGatheringState;
            this.logger.debug(`SessionDescriptionHandler.onicegatheringstatechange ${newState}`);
            if (newState === 'complete') {
                this.iceGatheringComplete(); // complete waiting for ICE gathering to complete
            }
            if ((_a = this._peerConnectionDelegate) === null || _a === void 0 ? void 0 : _a.onicegatheringstatechange) {
                this._peerConnectionDelegate.onicegatheringstatechange(event);
            }
        };
        peerConnection.onnegotiationneeded = (event) => {
            var _a;
            this.logger.debug('SessionDescriptionHandler.onnegotiationneeded');
            if ((_a = this._peerConnectionDelegate) === null || _a === void 0 ? void 0 : _a.onnegotiationneeded) {
                this._peerConnectionDelegate.onnegotiationneeded(event);
            }
        };
        peerConnection.onsignalingstatechange = (event) => {
            var _a;
            const newState = peerConnection.signalingState;
            this.logger.debug(`SessionDescriptionHandler.onsignalingstatechange ${newState}`);
            if ((_a = this._peerConnectionDelegate) === null || _a === void 0 ? void 0 : _a.onsignalingstatechange) {
                this._peerConnectionDelegate.onsignalingstatechange(event);
            }
        };
        // onstatsended is no longer a part of PeerConnection as per the specs so removing it
        // peerConnection.onstatsended = (event): void => {
        //     this.logger.debug(`SessionDescriptionHandler.onstatsended`);
        //     if (this._peerConnectionDelegate?.onstatsended) {
        //         this._peerConnectionDelegate.onstatsended(event);
        //     }
        // };
        peerConnection.ontrack = (event) => {
            var _a;
            const kind = event.track.kind;
            const enabled = event.track.enabled ? 'enabled' : 'disabled';
            this.logger.debug(`SessionDescriptionHandler.ontrack ${kind} ${enabled}`);
            this.setRemoteTrack(event.track);
            if ((_a = this._peerConnectionDelegate) === null || _a === void 0 ? void 0 : _a.ontrack) {
                this._peerConnectionDelegate.ontrack(event);
            }
        };
    }
}
exports.SessionDescriptionHandler = SessionDescriptionHandler;
function defaultPeerConnectionConfiguration() {
    return {
        bundlePolicy: 'balanced',
        certificates: undefined,
        iceCandidatePoolSize: 0,
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
        iceTransportPolicy: 'all',
        peerIdentity: undefined,
        rtcpMuxPolicy: 'require',
    };
}
exports.defaultPeerConnectionConfiguration = defaultPeerConnectionConfiguration;
function defaultMediaStreamFactory() {
    return (constraints) => {
        // if no audio or video, return a media stream without tracks
        if (!constraints.audio && !constraints.video) {
            return Promise.resolve(new MediaStream());
        }
        // getUserMedia() is a powerful feature which can only be used in secure contexts; in insecure contexts,
        // navigator.mediaDevices is undefined, preventing access to getUserMedia(). A secure context is, in short,
        // a page loaded using HTTPS or the file:/// URL scheme, or a page loaded from localhost.
        // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia#Privacy_and_security
        if (navigator.mediaDevices === undefined) {
            return Promise.reject(new Error('Media devices not available in insecure contexts.'));
        }
        return navigator.mediaDevices.getUserMedia.call(navigator.mediaDevices, constraints);
    };
}
exports.defaultMediaStreamFactory = defaultMediaStreamFactory;
const defaultSessionDescriptionFactory = (session, options) => {
    const mediaStreamFactory = defaultMediaStreamFactory();
    // make sure we allow `0` to be passed in so timeout can be disabled
    const iceGatheringTimeout = (options === null || options === void 0 ? void 0 : options.iceGatheringTimeout) !== undefined
        ? options === null || options === void 0 ? void 0 : options.iceGatheringTimeout
        : 5000;
    // merge passed factory options into default session description configuration
    const sessionDescriptionHandlerConfiguration = {
        iceGatheringTimeout,
        enableDscp: options.enableDscp,
        peerConnectionConfiguration: {
            ...defaultPeerConnectionConfiguration(),
            ...options === null || options === void 0 ? void 0 : options.peerConnectionConfiguration,
        },
    };
    const logger = session.userAgent.getLogger('sip.SessionDescriptionHandler');
    return new SessionDescriptionHandler(logger, mediaStreamFactory, sessionDescriptionHandlerConfiguration);
};
exports.defaultSessionDescriptionFactory = defaultSessionDescriptionFactory;


/***/ }),

/***/ "./src/transport.ts":
/*!**************************!*\
  !*** ./src/transport.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createWebPhoneTransport = void 0;
const events_1 = __webpack_require__(/*! events */ "./node_modules/events/events.js");
const sip_js_1 = __webpack_require__(/*! sip.js */ "sip.js");
const events_2 = __webpack_require__(/*! ./events */ "./src/events.ts");
function createWebPhoneTransport(transport, options) {
    transport.reconnectionAttempts = 0;
    transport.sipErrorCodes = options.sipErrorCodes;
    transport.servers = options.transportServers;
    const eventEmitter = new events_1.EventEmitter();
    transport.on = eventEmitter.on.bind(eventEmitter);
    transport.off = eventEmitter.off.bind(eventEmitter);
    transport.once = eventEmitter.once.bind(eventEmitter);
    transport.addListener = eventEmitter.addListener.bind(eventEmitter);
    transport.removeListener = eventEmitter.removeListener.bind(eventEmitter);
    transport.removeAllListeners =
        eventEmitter.removeAllListeners.bind(eventEmitter);
    transport.emit = eventEmitter.emit.bind(eventEmitter);
    transport.mainProxy = options.transportServers[0];
    transport.switchBackInterval = options.switchBackInterval;
    transport.reconnectionTimeout = options.reconnectionTimeout;
    transport.maxReconnectionAttempts = options.maxReconnectionAttempts;
    transport.__afterWSConnected = __afterWSConnected.bind(transport);
    transport.__clearSwitchBackToMainProxyTimer =
        __clearSwitchBackToMainProxyTimer.bind(transport);
    transport.__computeRandomTimeout = __computeRandomTimeout.bind(transport);
    transport.__connect = transport.connect;
    transport.__isCurrentMainProxy = __isCurrentMainProxy.bind(transport);
    transport.__onConnectedToBackup = __onConnectedToBackup.bind(transport);
    transport.__onConnectedToMain = __onConnectedToMain.bind(transport);
    transport.__resetServersErrorStatus =
        __resetServersErrorStatus.bind(transport);
    transport.__scheduleSwitchBackToMainProxy =
        __scheduleSwitchBackToMainProxy.bind(transport);
    transport.__setServerIsError = __setServerIsError.bind(transport);
    transport.connect = __connect.bind(transport);
    transport.getNextWsServer = getNextWsServer.bind(transport);
    transport.isSipErrorCode = isSipErrorCode.bind(transport);
    transport.noAvailableServers = noAvailableServers.bind(transport);
    transport.onSipErrorCode = onSipErrorCode.bind(transport);
    transport.reconnect = reconnect.bind(transport);
    transport.stateChange.addListener(newState => {
        switch (newState) {
            case sip_js_1.TransportState.Connecting: {
                transport.emit(events_2.Events.Transport.Connecting);
                break;
            }
            case sip_js_1.TransportState.Connected: {
                transport.emit(events_2.Events.Transport.Connected);
                transport.__afterWSConnected();
                break;
            }
            case sip_js_1.TransportState.Disconnecting: {
                transport.emit(events_2.Events.Transport.Disconnecting);
                break;
            }
            case sip_js_1.TransportState.Disconnected: {
                transport.emit(events_2.Events.Transport.Disconnected);
                break;
            }
        }
    });
    return transport;
}
exports.createWebPhoneTransport = createWebPhoneTransport;
function __connect() {
    return this.__connect().catch(async (e) => {
        this.logger.error(`unable to establish connection to server ${this.server} - ${e.message}`);
        this.emit(events_2.Events.Transport.ConnectionAttemptFailure, e); // Can we move to onTransportDisconnect?
        await this.reconnect();
    });
}
function __computeRandomTimeout(reconnectionAttempts = 1, randomMinInterval = 0, randomMaxInterval = 0) {
    if (randomMinInterval < 0 ||
        randomMaxInterval < 0 ||
        reconnectionAttempts < 1) {
        throw new Error('Arguments must be positive numbers');
    }
    const randomInterval = Math.floor(Math.random() * Math.abs(randomMaxInterval - randomMinInterval)) + randomMinInterval;
    const retryOffset = ((reconnectionAttempts - 1) * (randomMinInterval + randomMaxInterval)) / 2;
    return randomInterval + retryOffset;
}
function __setServerIsError(uri) {
    this.servers.forEach(server => {
        if (server.uri === uri && !server.isError) {
            server.isError = true;
        }
    });
}
function __resetServersErrorStatus() {
    this.servers.forEach(server => {
        server.isError = false;
    });
}
function __isCurrentMainProxy() {
    return this.server === this.servers[0].uri;
}
function __afterWSConnected() {
    this.__isCurrentMainProxy()
        ? this.__onConnectedToMain()
        : this.__onConnectedToBackup();
}
function __onConnectedToMain() {
    this.__clearSwitchBackToMainProxyTimer();
}
function __onConnectedToBackup() {
    if (!this.switchBackToMainProxyTimer) {
        this.__scheduleSwitchBackToMainProxy();
    }
}
function __scheduleSwitchBackToMainProxy() {
    const randomInterval = 15 * 60 * 1000; //15 min
    let switchBackInterval = this.switchBackInterval
        ? this.switchBackInterval * 1000
        : null;
    // Add random time to expand clients connections in time;
    if (switchBackInterval) {
        switchBackInterval += this.__computeRandomTimeout(1, 0, randomInterval);
        this.logger.warn('Try to switch back to main proxy after ' +
            Math.round(switchBackInterval / 1000 / 60) +
            ' min');
        this.switchBackToMainProxyTimer = setTimeout(() => {
            this.switchBackToMainProxyTimer = null;
            this.logger.warn('switchBack initiated');
            this.emit(events_2.Events.Transport.SwitchBackToMainProxy);
            //FIXME: Why is force reconnect not called here and the client is made to do that?
        }, switchBackInterval);
    }
    else {
        this.logger.warn('switchBackInterval is not set. Will be switched with next provision update ');
    }
}
function __clearSwitchBackToMainProxyTimer() {
    if (this.switchBackToMainProxyTimer) {
        clearTimeout(this.switchBackToMainProxyTimer);
        this.switchBackToMainProxyTimer = null;
    }
}
async function reconnect(forceReconnectToMain) {
    if (this.reconnectionAttempts > 0) {
        this.logger.warn(`Reconnection attempt ${this.reconnectionAttempts} failed`);
    }
    if (this.reconnectTimer) {
        this.logger.warn('already trying to reconnect');
        return;
    }
    if (forceReconnectToMain) {
        this.logger.warn('forcing connect to main WS server');
        await this.disconnect();
        this.server = this.getNextWsServer(true).uri;
        this.reconnectionAttempts = 0;
        await this.connect();
        return;
    }
    if (this.isConnected()) {
        this.logger.warn('attempted to reconnect while connected - forcing disconnect');
        await this.disconnect();
        await this.reconnect();
        return;
    }
    if (this.noAvailableServers()) {
        this.logger.warn('no available WebSocket servers left');
        this.emit(events_2.Events.Transport.Closed);
        this.__resetServersErrorStatus();
        this.server = this.getNextWsServer(true).uri;
        this.__clearSwitchBackToMainProxyTimer();
        return;
    }
    this.reconnectionAttempts += 1;
    if (this.reconnectionAttempts > this.maxReconnectionAttempts) {
        this.logger.warn(`maximum reconnection attempts for WebSocket ${this.server}`);
        this.logger.warn(`transport ${this.server} failed`);
        this.__setServerIsError(this.server);
        this.emit(events_2.Events.Transport.ConnectionFailure);
        const nextServer = this.getNextWsServer();
        if (!nextServer) {
            // No more servers available to try connecting to
            this.logger.error('unable to connect to any transport');
            return;
        }
        this.configuration.server = nextServer.uri;
        this.reconnectionAttempts = 0;
        await this.connect();
    }
    else {
        const randomMinInterval = (this.reconnectionTimeout - 2) * 1000;
        const randomMaxInterval = (this.reconnectionTimeout + 2) * 1000;
        this.nextReconnectInterval = this.__computeRandomTimeout(this.reconnectionAttempts, randomMinInterval, randomMaxInterval);
        this.logger.warn(`trying to reconnect to WebSocket ${this.server} (reconnection attempt: ${this.reconnectionAttempts})`);
        this.reconnectTimer = setTimeout(() => {
            this.reconnectTimer = undefined;
            this.connect().then(() => {
                this.reconnectionAttempts = 0;
            });
        }, this.nextReconnectInterval);
        this.logger.warn(`next reconnection attempt in: ${Math.round(this.nextReconnectInterval / 1000)} seconds.`);
    }
}
function getNextWsServer(force = false) {
    // Adding the force check because otherwise it will not bypass error check
    if (!force && this.noAvailableServers()) {
        this.logger.warn('attempted to get next ws server but there are no available ws servers left');
        return;
    }
    const candidates = force
        ? this.servers
        : this.servers.filter(({ isError }) => !isError);
    return candidates[0];
}
function noAvailableServers() {
    return this.servers.every(({ isError }) => isError);
}
function isSipErrorCode(statusCode) {
    if (!statusCode) {
        return false;
    }
    if (!this.sipErrorCodes) {
        return false;
    }
    return this.sipErrorCodes.indexOf(statusCode.toString()) !== -1;
}
async function onSipErrorCode() {
    this.logger.warn('Error received from the server. Disconnecting from the proxy');
    this.__setServerIsError(this.server);
    this.emit(events_2.Events.Transport.ConnectionFailure);
    this.reconnectionAttempts = 0;
    return this.reconnect();
}


/***/ }),

/***/ "./src/userAgent.ts":
/*!**************************!*\
  !*** ./src/userAgent.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createWebPhoneUserAgent = void 0;
const events_1 = __webpack_require__(/*! events */ "./node_modules/events/events.js");
const sip_js_1 = __webpack_require__(/*! sip.js */ "sip.js");
const transport_1 = __webpack_require__(/*! ./transport */ "./src/transport.ts");
const audioHelper_1 = __webpack_require__(/*! ./audioHelper */ "./src/audioHelper.ts");
const events_2 = __webpack_require__(/*! ./events */ "./src/events.ts");
const session_1 = __webpack_require__(/*! ./session */ "./src/session.ts");
const userAgentCore_1 = __webpack_require__(/*! ./userAgentCore */ "./src/userAgentCore.ts");
/** @ignore */
function createWebPhoneUserAgent(configuration, sipInfo, options, id) {
    const extraConfiguration = {
        delegate: {
            onConnect: () => userAgent.register(),
            onInvite: (invitation) => {
                userAgent.audioHelper.playIncoming(true);
                invitation.delegate = {};
                invitation.delegate.onSessionDescriptionHandler = () => (0, session_1.onSessionDescriptionHandlerCreated)(invitation);
                (0, session_1.patchWebphoneSession)(invitation);
                (0, session_1.patchIncomingWebphoneSession)(invitation);
                invitation.logger.log('UA received incoming call invite');
                invitation.sendReceiveConfirm();
                userAgent.emit(events_2.Events.UserAgent.Invite, invitation);
            },
            onNotify: (notification) => {
                const event = notification.request.getHeader('Event');
                if (event === '') {
                    userAgent.emit(events_2.Events.UserAgent.ProvisionUpdate);
                }
                userAgent.logger.log('UA received notify');
                notification.accept();
            },
        },
    };
    const extendedConfiguration = Object.assign({}, extraConfiguration, configuration);
    const userAgent = new sip_js_1.UserAgent(extendedConfiguration);
    const eventEmitter = new events_1.EventEmitter();
    userAgent.on = eventEmitter.on.bind(eventEmitter);
    userAgent.off = eventEmitter.off.bind(eventEmitter);
    userAgent.once = eventEmitter.once.bind(eventEmitter);
    userAgent.addListener = eventEmitter.addListener.bind(eventEmitter);
    userAgent.removeListener = eventEmitter.removeListener.bind(eventEmitter);
    userAgent.removeAllListeners =
        eventEmitter.removeAllListeners.bind(eventEmitter);
    userAgent.defaultHeaders = [
        `P-rc-endpoint-id: ${id}`,
        `Client-id: ${options.clientId}`,
    ];
    userAgent.regId = options.regId;
    userAgent.media = {};
    userAgent.enableQos = options.enableQos;
    userAgent.enableMediaReportLogging = options.enableMediaReportLogging;
    userAgent.qosCollectInterval = options.qosCollectInterval;
    if (options.media && options.media.remote && options.media.local) {
        userAgent.media.remote = options.media.remote;
        userAgent.media.local = options.media.local;
    }
    else {
        userAgent.media = undefined;
    }
    userAgent.registerer = new sip_js_1.Registerer(userAgent, {
        regId: userAgent.regId,
        instanceId: userAgent.instanceId,
        extraHeaders: userAgent.defaultHeaders,
    });
    userAgent.sipInfo = sipInfo;
    userAgent.modifiers = options.modifiers;
    userAgent.constraints = options.mediaConstraints;
    userAgent.earlyMedia = options.earlyMedia;
    userAgent.audioHelper = new audioHelper_1.AudioHelper(options.audioHelper);
    userAgent.onSession = options.onSession;
    userAgent._transport = (0, transport_1.createWebPhoneTransport)(userAgent.transport, options);
    userAgent.onTransportDisconnect =
        onTransportDisconnect.bind(userAgent);
    userAgent.emit = eventEmitter.emit.bind(eventEmitter);
    userAgent.register = register.bind(userAgent);
    userAgent.unregister = unregister.bind(userAgent);
    userAgent.invite = invite.bind(userAgent);
    userAgent.sendMessage = sendMessage.bind(userAgent);
    userAgent.createRcMessage = createRcMessage.bind(userAgent);
    userAgent.switchFrom = switchFrom.bind(userAgent);
    (0, userAgentCore_1.patchUserAgentCore)(userAgent);
    userAgent.start();
    userAgent.stateChange.addListener(newState => {
        switch (newState) {
            case sip_js_1.UserAgentState.Started: {
                userAgent.emit(events_2.Events.UserAgent.Started);
                break;
            }
            case sip_js_1.UserAgentState.Stopped: {
                userAgent.emit(events_2.Events.UserAgent.Stopped);
                break;
            }
        }
    });
    userAgent.registerer.stateChange.addListener(newState => {
        switch (newState) {
            case sip_js_1.RegistererState.Registered: {
                userAgent.emit(events_2.Events.UserAgent.Registered);
                break;
            }
            case sip_js_1.RegistererState.Unregistered: {
                userAgent.emit(events_2.Events.UserAgent.Unregistered);
                break;
            }
        }
    });
    return userAgent;
}
exports.createWebPhoneUserAgent = createWebPhoneUserAgent;
function onTransportDisconnect(error) {
    // Patch it so that reconnection is managed by WebPhoneTransport
    if (this.state === sip_js_1.UserAgentState.Stopped) {
        return;
    }
    if (this.delegate && this.delegate.onDisconnect) {
        this.delegate.onDisconnect(error);
    }
    if (error) {
        this.transport.reconnect();
    }
}
function createRcMessage(options) {
    options.body = options.body || '';
    return ('<Msg>' +
        '<Hdr SID="' +
        options.sid +
        '" Req="' +
        options.request +
        '" From="' +
        options.from +
        '" To="' +
        options.to +
        '" Cmd="' +
        options.reqid +
        '"/> ' +
        '<Bdy Cln="' +
        this.sipInfo.authorizationId +
        '" ' +
        options.body +
        '/>' +
        '</Msg>');
}
function sendMessage(to, messageData) {
    const extraHeaders = [`P-rc-ws: ${this.contact}`];
    // For some reason, UserAgent.makeURI is unable to parse username starting with #
    // Fix in later release if this is fixed by SIP.js
    const [user] = to.split('@');
    to = to.startsWith('#') ? `sip:${to.substring(1)}` : `sip:${to}`;
    const uri = sip_js_1.UserAgent.makeURI(to);
    uri.user = user;
    const messager = new sip_js_1.Messager(this, uri, messageData, 'x-rc/agent', {
        extraHeaders,
    });
    return new Promise((resolve, reject) => {
        messager.message({
            requestDelegate: {
                onAccept: resolve,
                onReject: reject,
            },
        });
    });
}
async function register() {
    await this.registerer.register({
        requestDelegate: {
            onReject: (response) => {
                if (!response) {
                    return;
                }
                if (this.transport.isSipErrorCode(response.message.statusCode)) {
                    this.transport.onSipErrorCode();
                }
                this.emit(events_2.Events.UserAgent.RegistrationFailed, response);
                this.logger.warn('UA Registration Failed');
            },
        },
    });
}
async function unregister() {
    await this.registerer.unregister();
}
function invite(number, options = {}) {
    const inviterOptions = {};
    inviterOptions.extraHeaders = [
        ...(options.extraHeaders || []),
        ...this.defaultHeaders,
        `P-Asserted-Identity: sip: ${(options.fromNumber || this.sipInfo.username) +
            '@' +
            this.sipInfo.domain}`,
        ...(options.homeCountryId
            ? [`P-rc-country-id: ${options.homeCountryId}`]
            : []),
    ];
    options.RTCConstraints =
        options.RTCConstraints ||
            Object.assign({}, this.constraints, {
                optional: [{ DtlsSrtpKeyAgreement: 'true' }],
            });
    inviterOptions.sessionDescriptionHandlerModifiers = this.modifiers;
    inviterOptions.sessionDescriptionHandlerOptions = {
        constraints: options.RTCConstraints,
    };
    inviterOptions.earlyMedia = this.earlyMedia;
    inviterOptions.delegate = {
        onSessionDescriptionHandler: () => (0, session_1.onSessionDescriptionHandlerCreated)(inviter),
        onNotify: notification => notification.accept(),
    };
    this.audioHelper.playOutgoing(true);
    this.logger.log(`Invite to ${number} created with playOutgoing set to true`);
    const inviter = new sip_js_1.Inviter(this, sip_js_1.UserAgent.makeURI(`sip:${number}@${this.sipInfo.domain}`), inviterOptions);
    inviter
        .invite({
        requestDelegate: {
            onAccept: inviteResponse => {
                inviter.startTime = new Date();
                inviter.emit(events_2.Events.Session.Accepted, inviteResponse.message);
            },
            onProgress: inviteResponse => {
                inviter.emit(events_2.Events.Session.Progress, inviteResponse.message);
            },
        },
    })
        .then(() => this.emit(events_2.Events.UserAgent.InviteSent, inviter))
        .catch(e => {
        if (e.message.indexOf('Permission denied') > -1) {
            inviter.emit(events_2.Events.Session.UserMediaFailed);
        }
        throw e;
    });
    (0, session_1.patchWebphoneSession)(inviter);
    return inviter;
}
/**
 * Support to switch call from other device to current web phone device
 * need active call information from details presence API for switching
 * https://developers.ringcentral.com/api-reference/Detailed-Extension-Presence-with-SIP-Event
 */
function switchFrom(activeCall, options = {}) {
    const replaceHeaders = [
        `Replaces: ${activeCall.id};to-tag=${activeCall.sipData.fromTag};from-tag=${activeCall.sipData.toTag}`,
        'RC-call-type: replace',
    ];
    const [toNumber, fromNumber] = activeCall.direction === 'Outbound'
        ? [activeCall.to, activeCall.from]
        : [activeCall.from, activeCall.to];
    options.extraHeaders = (options.extraHeaders || []).concat(replaceHeaders);
    options.fromNumber = options.fromNumber || fromNumber;
    const inviterOptions = {
        extraHeaders: options.extraHeaders,
        sessionDescriptionHandlerOptions: {
            constraints: options.RTCConstraints || this.constraints,
        },
    };
    return this.invite(toNumber, inviterOptions);
}


/***/ }),

/***/ "./src/userAgentCore.ts":
/*!******************************!*\
  !*** ./src/userAgentCore.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.patchUserAgentCore = void 0;
const events_1 = __webpack_require__(/*! events */ "./node_modules/events/events.js");
const core_1 = __webpack_require__(/*! sip.js/lib/core */ "./node_modules/sip.js/lib/core/index.js");
const events_2 = __webpack_require__(/*! ./events */ "./src/events.ts");
/** @ignore */
function patchUserAgentCore(userAgent) {
    const userAgentCore = userAgent.userAgentCore;
    const eventEmitter = new events_1.EventEmitter();
    userAgentCore.on = eventEmitter.on.bind(eventEmitter);
    userAgentCore.off = eventEmitter.off.bind(eventEmitter);
    userAgentCore.addListener = eventEmitter.addListener.bind(eventEmitter);
    userAgentCore.removeListener = eventEmitter.removeListener.bind(eventEmitter);
    userAgentCore.emit = eventEmitter.emit.bind(eventEmitter);
    userAgentCore._receiveIncomingRequestFromTransport =
        userAgentCore.receiveIncomingRequestFromTransport.bind(userAgent.userAgentCore);
    userAgentCore.receiveIncomingRequestFromTransport =
        receiveIncomingRequestFromTransport.bind(userAgent.userAgentCore);
}
exports.patchUserAgentCore = patchUserAgentCore;
function receiveIncomingRequestFromTransport(message) {
    var _a, _b, _c;
    switch (message.method) {
        case core_1.C.UPDATE: {
            this.logger.log('Receive UPDATE request. Do nothing just return 200 OK');
            this.replyStateless(message, { statusCode: 200 });
            this.emit(events_2.Events.Session.UpdateReceived, message);
            return;
        }
        case core_1.C.INFO: {
            // For the Move2RCV request from server
            const content = getIncomingInfoContent(message);
            if (((_a = content === null || content === void 0 ? void 0 : content.request) === null || _a === void 0 ? void 0 : _a.reqId) &&
                ((_b = content === null || content === void 0 ? void 0 : content.request) === null || _b === void 0 ? void 0 : _b.command) === 'move' &&
                ((_c = content === null || content === void 0 ? void 0 : content.request) === null || _c === void 0 ? void 0 : _c.target) === 'rcv') {
                this.replyStateless(message, { statusCode: 200 });
                this.emit(events_2.Events.Session.MoveToRcv, content.request);
                return;
            }
            // For other SIP INFO from server
            this.emit('RC_SIP_INFO', message);
            // SIP.js does not support application/json content type, so we monkey override its behavior in this case
            const contentType = message.getHeader('content-type');
            if (contentType.match(/^application\/json/i)) {
                this.replyStateless(message, { statusCode: 200 });
                return;
            }
            break;
        }
    }
    return this._receiveIncomingRequestFromTransport(message);
}
function getIncomingInfoContent(message) {
    if (!message || !message.body) {
        return {};
    }
    let ret = {};
    try {
        ret = JSON.parse(message.body);
    }
    catch (e) {
        return {};
    }
    return ret;
}


/***/ }),

/***/ "./src/utils.ts":
/*!**********************!*\
  !*** ./src/utils.ts ***!
  \**********************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.extend = exports.delay = exports.uuid = void 0;
const uuid = () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
});
exports.uuid = uuid;
const delay = async (ms) => new Promise(resolve => setTimeout(resolve, ms));
exports.delay = delay;
const extend = (dst = {}, src = {}) => Object.assign(dst || {}, src || {});
exports.extend = extend;


/***/ }),

/***/ "./node_modules/events/events.js":
/*!***************************************!*\
  !*** ./node_modules/events/events.js ***!
  \***************************************/
/***/ ((module) => {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



var R = typeof Reflect === 'object' ? Reflect : null
var ReflectApply = R && typeof R.apply === 'function'
  ? R.apply
  : function ReflectApply(target, receiver, args) {
    return Function.prototype.apply.call(target, receiver, args);
  }

var ReflectOwnKeys
if (R && typeof R.ownKeys === 'function') {
  ReflectOwnKeys = R.ownKeys
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target)
      .concat(Object.getOwnPropertySymbols(target));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys(target) {
    return Object.getOwnPropertyNames(target);
  };
}

function ProcessEmitWarning(warning) {
  if (console && console.warn) console.warn(warning);
}

var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
  return value !== value;
}

function EventEmitter() {
  EventEmitter.init.call(this);
}
module.exports = EventEmitter;
module.exports.once = once;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

function checkListener(listener) {
  if (typeof listener !== 'function') {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}

Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
    }
    defaultMaxListeners = arg;
  }
});

EventEmitter.init = function() {

  if (this._events === undefined ||
      this._events === Object.getPrototypeOf(this)._events) {
    this._events = Object.create(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
  }
  this._maxListeners = n;
  return this;
};

function _getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};

EventEmitter.prototype.emit = function emit(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
  var doError = (type === 'error');

  var events = this._events;
  if (events !== undefined)
    doError = (doError && events.error === undefined);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      // Note: The comments on the `throw` lines are intentional, they show
      // up in Node's output if this results in an unhandled exception.
      throw er; // Unhandled 'error' event
    }
    // At least give some kind of context to the user
    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
    err.context = er;
    throw err; // Unhandled 'error' event
  }

  var handler = events[type];

  if (handler === undefined)
    return false;

  if (typeof handler === 'function') {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners[i], this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  checkListener(listener);

  events = target._events;
  if (events === undefined) {
    events = target._events = Object.create(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener !== undefined) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (existing === undefined) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
        prepend ? [listener, existing] : [existing, listener];
      // If we've already got an array, just append.
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }

    // Check for listener leak
    m = _getMaxListeners(target);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      // No error code for this since it is a Warning
      // eslint-disable-next-line no-restricted-syntax
      var w = new Error('Possible EventEmitter memory leak detected. ' +
                          existing.length + ' ' + String(type) + ' listeners ' +
                          'added. Use emitter.setMaxListeners() to ' +
                          'increase limit');
      w.name = 'MaxListenersExceededWarning';
      w.emitter = target;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      checkListener(listener);
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      checkListener(listener);

      events = this._events;
      if (events === undefined)
        return this;

      list = events[type];
      if (list === undefined)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = Object.create(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else {
          spliceOne(list, position);
        }

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener !== undefined)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (events === undefined)
        return this;

      // not listening for removeListener, no need to emit
      if (events.removeListener === undefined) {
        if (arguments.length === 0) {
          this._events = Object.create(null);
          this._eventsCount = 0;
        } else if (events[type] !== undefined) {
          if (--this._eventsCount === 0)
            this._events = Object.create(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = Object.create(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners !== undefined) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (events === undefined)
    return [];

  var evlistener = events[type];
  if (evlistener === undefined)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ?
    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events !== undefined) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener !== undefined) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function once(emitter, name) {
  return new Promise(function (resolve, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }

    function resolver() {
      if (typeof emitter.removeListener === 'function') {
        emitter.removeListener('error', errorListener);
      }
      resolve([].slice.call(arguments));
    };

    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== 'error') {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}

function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === 'function') {
    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
  }
}

function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === 'function') {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === 'function') {
    // EventTarget does not have `error` event semantics like Node
    // EventEmitters, we do not listen for `error` events here.
    emitter.addEventListener(name, function wrapListener(arg) {
      // IE does not have builtin `{ once: true }` support so we
      // have to do it manually.
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}


/***/ }),

/***/ "sip.js":
/*!***************************************************************************************!*\
  !*** external {"commonjs":"sip.js","commonjs2":"sip.js","amd":"sip.js","root":"SIP"} ***!
  \***************************************************************************************/
/***/ ((module) => {

module.exports = __WEBPACK_EXTERNAL_MODULE_sip_js__;

/***/ }),

/***/ "./node_modules/sip.js/lib/api/session-state.js":
/*!******************************************************!*\
  !*** ./node_modules/sip.js/lib/api/session-state.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SessionState": () => (/* binding */ SessionState)
/* harmony export */ });
/**
 * {@link Session} state.
 *
 * @remarks
 * The {@link Session} behaves in a deterministic manner according to the following
 * Finite State Machine (FSM).
 * ```txt
 *                   ___________________________________________________________
 *                  |  ____________________________________________             |
 *                  | |            ____________________________    |            |
 * Session          | |           |                            v   v            v
 * Constructed -> Initial -> Establishing -> Established -> Terminating -> Terminated
 *                                |               |___________________________^   ^
 *                                |_______________________________________________|
 * ```
 * @public
 */
var SessionState;
(function (SessionState) {
    /**
     * If `Inviter`, INVITE not sent yet.
     * If `Invitation`, received INVITE (but no final response sent yet).
     */
    SessionState["Initial"] = "Initial";
    /**
     * If `Inviter`, sent INVITE and waiting for a final response.
     * If `Invitation`, received INVITE and attempting to send 200 final response (but has not sent it yet).
     */
    SessionState["Establishing"] = "Establishing";
    /**
     * If `Inviter`, sent INVITE and received 200 final response and sent ACK.
     * If `Invitation`, received INVITE and sent 200 final response.
     */
    SessionState["Established"] = "Established";
    /**
     * If `Inviter`, sent INVITE, sent CANCEL and now waiting for 487 final response to ACK (or 200 to ACK & BYE).
     * If `Invitation`, received INVITE, sent 200 final response and now waiting on ACK and upon receipt will attempt BYE
     * (as the protocol specification requires, before sending a BYE we must receive the ACK - so we are waiting).
     */
    SessionState["Terminating"] = "Terminating";
    /**
     * If `Inviter`, sent INVITE and received non-200 final response (or sent/received BYE after receiving 200).
     * If `Invitation`, received INVITE and sent non-200 final response (or sent/received BYE after sending 200).
     */
    SessionState["Terminated"] = "Terminated";
})(SessionState = SessionState || (SessionState = {}));


/***/ }),

/***/ "./node_modules/sip.js/lib/core/dialogs/dialog.js":
/*!********************************************************!*\
  !*** ./node_modules/sip.js/lib/core/dialogs/dialog.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Dialog": () => (/* binding */ Dialog)
/* harmony export */ });
/* harmony import */ var _grammar_name_addr_header_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../grammar/name-addr-header.js */ "./node_modules/sip.js/lib/grammar/name-addr-header.js");
/* harmony import */ var _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../messages/methods/constants.js */ "./node_modules/sip.js/lib/core/messages/methods/constants.js");


/**
 * Dialog.
 * @remarks
 * A key concept for a user agent is that of a dialog.  A dialog
 * represents a peer-to-peer SIP relationship between two user agents
 * that persists for some time.  The dialog facilitates sequencing of
 * messages between the user agents and proper routing of requests
 * between both of them.  The dialog represents a context in which to
 * interpret SIP messages.
 * https://tools.ietf.org/html/rfc3261#section-12
 * @public
 */
class Dialog {
    /**
     * Dialog constructor.
     * @param core - User agent core.
     * @param dialogState - Initial dialog state.
     */
    constructor(core, dialogState) {
        this.core = core;
        this.dialogState = dialogState;
        this.core.dialogs.set(this.id, this);
    }
    /**
     * When a UAC receives a response that establishes a dialog, it
     * constructs the state of the dialog.  This state MUST be maintained
     * for the duration of the dialog.
     * https://tools.ietf.org/html/rfc3261#section-12.1.2
     * @param outgoingRequestMessage - Outgoing request message for dialog.
     * @param incomingResponseMessage - Incoming response message creating dialog.
     */
    static initialDialogStateForUserAgentClient(outgoingRequestMessage, incomingResponseMessage) {
        // If the request was sent over TLS, and the Request-URI contained a
        // SIPS URI, the "secure" flag is set to TRUE.
        // https://tools.ietf.org/html/rfc3261#section-12.1.2
        const secure = false; // FIXME: Currently no support for TLS.
        // The route set MUST be set to the list of URIs in the Record-Route
        // header field from the response, taken in reverse order and preserving
        // all URI parameters.  If no Record-Route header field is present in
        // the response, the route set MUST be set to the empty set.  This route
        // set, even if empty, overrides any pre-existing route set for future
        // requests in this dialog.  The remote target MUST be set to the URI
        // from the Contact header field of the response.
        // https://tools.ietf.org/html/rfc3261#section-12.1.2
        const routeSet = incomingResponseMessage.getHeaders("record-route").reverse();
        // When a UAS responds to a request with a response that establishes a
        // dialog (such as a 2xx to INVITE), the UAS MUST copy all Record-Route
        // header field values from the request into the response (including the
        // URIs, URI parameters, and any Record-Route header field parameters,
        // whether they are known or unknown to the UAS) and MUST maintain the
        // order of those values.  The UAS MUST add a Contact header field to
        // the response.
        // https://tools.ietf.org/html/rfc3261#section-12.1.1
        const contact = incomingResponseMessage.parseHeader("contact");
        if (!contact) {
            // TODO: Review to make sure this will never happen
            throw new Error("Contact undefined.");
        }
        if (!(contact instanceof _grammar_name_addr_header_js__WEBPACK_IMPORTED_MODULE_0__.NameAddrHeader)) {
            throw new Error("Contact not instance of NameAddrHeader.");
        }
        const remoteTarget = contact.uri;
        // The local sequence number MUST be set to the value of the sequence
        // number in the CSeq header field of the request.  The remote sequence
        // number MUST be empty (it is established when the remote UA sends a
        // request within the dialog).  The call identifier component of the
        // dialog ID MUST be set to the value of the Call-ID in the request.
        // The local tag component of the dialog ID MUST be set to the tag in
        // the From field in the request, and the remote tag component of the
        // dialog ID MUST be set to the tag in the To field of the response.  A
        // UAC MUST be prepared to receive a response without a tag in the To
        // field, in which case the tag is considered to have a value of null.
        //
        //    This is to maintain backwards compatibility with RFC 2543, which
        //    did not mandate To tags.
        //
        // https://tools.ietf.org/html/rfc3261#section-12.1.2
        const localSequenceNumber = outgoingRequestMessage.cseq;
        const remoteSequenceNumber = undefined;
        const callId = outgoingRequestMessage.callId;
        const localTag = outgoingRequestMessage.fromTag;
        const remoteTag = incomingResponseMessage.toTag;
        if (!callId) {
            // TODO: Review to make sure this will never happen
            throw new Error("Call id undefined.");
        }
        if (!localTag) {
            // TODO: Review to make sure this will never happen
            throw new Error("From tag undefined.");
        }
        if (!remoteTag) {
            // TODO: Review to make sure this will never happen
            throw new Error("To tag undefined."); // FIXME: No backwards compatibility with RFC 2543
        }
        // The remote URI MUST be set to the URI in the To field, and the local
        // URI MUST be set to the URI in the From field.
        // https://tools.ietf.org/html/rfc3261#section-12.1.2
        if (!outgoingRequestMessage.from) {
            // TODO: Review to make sure this will never happen
            throw new Error("From undefined.");
        }
        if (!outgoingRequestMessage.to) {
            // TODO: Review to make sure this will never happen
            throw new Error("To undefined.");
        }
        const localURI = outgoingRequestMessage.from.uri;
        const remoteURI = outgoingRequestMessage.to.uri;
        // A dialog can also be in the "early" state, which occurs when it is
        // created with a provisional response, and then transition to the
        // "confirmed" state when a 2xx final response arrives.
        // https://tools.ietf.org/html/rfc3261#section-12
        if (!incomingResponseMessage.statusCode) {
            throw new Error("Incoming response status code undefined.");
        }
        const early = incomingResponseMessage.statusCode < 200 ? true : false;
        const dialogState = {
            id: callId + localTag + remoteTag,
            early,
            callId,
            localTag,
            remoteTag,
            localSequenceNumber,
            remoteSequenceNumber,
            localURI,
            remoteURI,
            remoteTarget,
            routeSet,
            secure
        };
        return dialogState;
    }
    /**
     * The UAS then constructs the state of the dialog.  This state MUST be
     * maintained for the duration of the dialog.
     * https://tools.ietf.org/html/rfc3261#section-12.1.1
     * @param incomingRequestMessage - Incoming request message creating dialog.
     * @param toTag - Tag in the To field in the response to the incoming request.
     */
    static initialDialogStateForUserAgentServer(incomingRequestMessage, toTag, early = false) {
        // If the request arrived over TLS, and the Request-URI contained a SIPS
        // URI, the "secure" flag is set to TRUE.
        // https://tools.ietf.org/html/rfc3261#section-12.1.1
        const secure = false; // FIXME: Currently no support for TLS.
        // The route set MUST be set to the list of URIs in the Record-Route
        // header field from the request, taken in order and preserving all URI
        // parameters.  If no Record-Route header field is present in the
        // request, the route set MUST be set to the empty set.  This route set,
        // even if empty, overrides any pre-existing route set for future
        // requests in this dialog.  The remote target MUST be set to the URI
        // from the Contact header field of the request.
        // https://tools.ietf.org/html/rfc3261#section-12.1.1
        const routeSet = incomingRequestMessage.getHeaders("record-route");
        const contact = incomingRequestMessage.parseHeader("contact");
        if (!contact) {
            // TODO: Review to make sure this will never happen
            throw new Error("Contact undefined.");
        }
        if (!(contact instanceof _grammar_name_addr_header_js__WEBPACK_IMPORTED_MODULE_0__.NameAddrHeader)) {
            throw new Error("Contact not instance of NameAddrHeader.");
        }
        const remoteTarget = contact.uri;
        // The remote sequence number MUST be set to the value of the sequence
        // number in the CSeq header field of the request.  The local sequence
        // number MUST be empty.  The call identifier component of the dialog ID
        // MUST be set to the value of the Call-ID in the request.  The local
        // tag component of the dialog ID MUST be set to the tag in the To field
        // in the response to the request (which always includes a tag), and the
        // remote tag component of the dialog ID MUST be set to the tag from the
        // From field in the request.  A UAS MUST be prepared to receive a
        // request without a tag in the From field, in which case the tag is
        // considered to have a value of null.
        //
        //    This is to maintain backwards compatibility with RFC 2543, which
        //    did not mandate From tags.
        //
        // https://tools.ietf.org/html/rfc3261#section-12.1.1
        const remoteSequenceNumber = incomingRequestMessage.cseq;
        const localSequenceNumber = undefined;
        const callId = incomingRequestMessage.callId;
        const localTag = toTag;
        const remoteTag = incomingRequestMessage.fromTag;
        // The remote URI MUST be set to the URI in the From field, and the
        // local URI MUST be set to the URI in the To field.
        // https://tools.ietf.org/html/rfc3261#section-12.1.1
        const remoteURI = incomingRequestMessage.from.uri;
        const localURI = incomingRequestMessage.to.uri;
        const dialogState = {
            id: callId + localTag + remoteTag,
            early,
            callId,
            localTag,
            remoteTag,
            localSequenceNumber,
            remoteSequenceNumber,
            localURI,
            remoteURI,
            remoteTarget,
            routeSet,
            secure
        };
        return dialogState;
    }
    /** Destructor. */
    dispose() {
        this.core.dialogs.delete(this.id);
    }
    /**
     * A dialog is identified at each UA with a dialog ID, which consists of
     * a Call-ID value, a local tag and a remote tag.  The dialog ID at each
     * UA involved in the dialog is not the same.  Specifically, the local
     * tag at one UA is identical to the remote tag at the peer UA.  The
     * tags are opaque tokens that facilitate the generation of unique
     * dialog IDs.
     * https://tools.ietf.org/html/rfc3261#section-12
     */
    get id() {
        return this.dialogState.id;
    }
    /**
     * A dialog can also be in the "early" state, which occurs when it is
     * created with a provisional response, and then it transition to the
     * "confirmed" state when a 2xx final response received or is sent.
     *
     * Note: RFC 3261 is concise on when a dialog is "confirmed", but it
     * can be a point of confusion if an INVITE dialog is "confirmed" after
     * a 2xx is sent or after receiving the ACK for the 2xx response.
     * With careful reading it can be inferred a dialog is always is
     * "confirmed" when the 2xx is sent (regardless of type of dialog).
     * However a INVITE dialog does have additional considerations
     * when it is confirmed but an ACK has not yet been received (in
     * particular with regard to a callee sending BYE requests).
     */
    get early() {
        return this.dialogState.early;
    }
    /** Call identifier component of the dialog id. */
    get callId() {
        return this.dialogState.callId;
    }
    /** Local tag component of the dialog id. */
    get localTag() {
        return this.dialogState.localTag;
    }
    /** Remote tag component of the dialog id. */
    get remoteTag() {
        return this.dialogState.remoteTag;
    }
    /** Local sequence number (used to order requests from the UA to its peer). */
    get localSequenceNumber() {
        return this.dialogState.localSequenceNumber;
    }
    /** Remote sequence number (used to order requests from its peer to the UA). */
    get remoteSequenceNumber() {
        return this.dialogState.remoteSequenceNumber;
    }
    /** Local URI. */
    get localURI() {
        return this.dialogState.localURI;
    }
    /** Remote URI. */
    get remoteURI() {
        return this.dialogState.remoteURI;
    }
    /** Remote target. */
    get remoteTarget() {
        return this.dialogState.remoteTarget;
    }
    /**
     * Route set, which is an ordered list of URIs. The route set is the
     * list of servers that need to be traversed to send a request to the peer.
     */
    get routeSet() {
        return this.dialogState.routeSet;
    }
    /**
     * If the request was sent over TLS, and the Request-URI contained
     * a SIPS URI, the "secure" flag is set to true. *NOT IMPLEMENTED*
     */
    get secure() {
        return this.dialogState.secure;
    }
    /** The user agent core servicing this dialog. */
    get userAgentCore() {
        return this.core;
    }
    /** Confirm the dialog. Only matters if dialog is currently early. */
    confirm() {
        this.dialogState.early = false;
    }
    /**
     * Requests sent within a dialog, as any other requests, are atomic.  If
     * a particular request is accepted by the UAS, all the state changes
     * associated with it are performed.  If the request is rejected, none
     * of the state changes are performed.
     *
     *    Note that some requests, such as INVITEs, affect several pieces of
     *    state.
     *
     * https://tools.ietf.org/html/rfc3261#section-12.2.2
     * @param message - Incoming request message within this dialog.
     */
    receiveRequest(message) {
        // ACK guard.
        // By convention, the handling of ACKs is the responsibility
        // the particular dialog implementation. For example, see SessionDialog.
        // Furthermore, ACKs have same sequence number as the associated INVITE.
        if (message.method === _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_1__.C.ACK) {
            return;
        }
        // If the remote sequence number was not empty, but the sequence number
        // of the request is lower than the remote sequence number, the request
        // is out of order and MUST be rejected with a 500 (Server Internal
        // Error) response.  If the remote sequence number was not empty, and
        // the sequence number of the request is greater than the remote
        // sequence number, the request is in order.  It is possible for the
        // CSeq sequence number to be higher than the remote sequence number by
        // more than one.  This is not an error condition, and a UAS SHOULD be
        // prepared to receive and process requests with CSeq values more than
        // one higher than the previous received request.  The UAS MUST then set
        // the remote sequence number to the value of the sequence number in the
        // CSeq header field value in the request.
        //
        //    If a proxy challenges a request generated by the UAC, the UAC has
        //    to resubmit the request with credentials.  The resubmitted request
        //    will have a new CSeq number.  The UAS will never see the first
        //    request, and thus, it will notice a gap in the CSeq number space.
        //    Such a gap does not represent any error condition.
        //
        // https://tools.ietf.org/html/rfc3261#section-12.2.2
        if (this.remoteSequenceNumber) {
            if (message.cseq <= this.remoteSequenceNumber) {
                throw new Error("Out of sequence in dialog request. Did you forget to call sequenceGuard()?");
            }
            this.dialogState.remoteSequenceNumber = message.cseq;
        }
        // If the remote sequence number is empty, it MUST be set to the value
        // of the sequence number in the CSeq header field value in the request.
        // https://tools.ietf.org/html/rfc3261#section-12.2.2
        if (!this.remoteSequenceNumber) {
            this.dialogState.remoteSequenceNumber = message.cseq;
        }
        // When a UAS receives a target refresh request, it MUST replace the
        // dialog's remote target URI with the URI from the Contact header field
        // in that request, if present.
        // https://tools.ietf.org/html/rfc3261#section-12.2.2
        // Note: "target refresh request" processing delegated to sub-class.
    }
    /**
     * If the dialog identifier in the 2xx response matches the dialog
     * identifier of an existing dialog, the dialog MUST be transitioned to
     * the "confirmed" state, and the route set for the dialog MUST be
     * recomputed based on the 2xx response using the procedures of Section
     * 12.2.1.2.  Otherwise, a new dialog in the "confirmed" state MUST be
     * constructed using the procedures of Section 12.1.2.
     *
     * Note that the only piece of state that is recomputed is the route
     * set.  Other pieces of state such as the highest sequence numbers
     * (remote and local) sent within the dialog are not recomputed.  The
     * route set only is recomputed for backwards compatibility.  RFC
     * 2543 did not mandate mirroring of the Record-Route header field in
     * a 1xx, only 2xx.  However, we cannot update the entire state of
     * the dialog, since mid-dialog requests may have been sent within
     * the early dialog, modifying the sequence numbers, for example.
     *
     *  https://tools.ietf.org/html/rfc3261#section-13.2.2.4
     */
    recomputeRouteSet(message) {
        this.dialogState.routeSet = message.getHeaders("record-route").reverse();
    }
    /**
     * A request within a dialog is constructed by using many of the
     * components of the state stored as part of the dialog.
     * https://tools.ietf.org/html/rfc3261#section-12.2.1.1
     * @param method - Outgoing request method.
     */
    createOutgoingRequestMessage(method, options) {
        // The URI in the To field of the request MUST be set to the remote URI
        // from the dialog state.  The tag in the To header field of the request
        // MUST be set to the remote tag of the dialog ID.  The From URI of the
        // request MUST be set to the local URI from the dialog state.  The tag
        // in the From header field of the request MUST be set to the local tag
        // of the dialog ID.  If the value of the remote or local tags is null,
        // the tag parameter MUST be omitted from the To or From header fields,
        // respectively.
        //
        //    Usage of the URI from the To and From fields in the original
        //    request within subsequent requests is done for backwards
        //    compatibility with RFC 2543, which used the URI for dialog
        //    identification.  In this specification, only the tags are used for
        //    dialog identification.  It is expected that mandatory reflection
        //    of the original To and From URI in mid-dialog requests will be
        //    deprecated in a subsequent revision of this specification.
        // https://tools.ietf.org/html/rfc3261#section-12.2.1.1
        const toUri = this.remoteURI;
        const toTag = this.remoteTag;
        const fromUri = this.localURI;
        const fromTag = this.localTag;
        // The Call-ID of the request MUST be set to the Call-ID of the dialog.
        // Requests within a dialog MUST contain strictly monotonically
        // increasing and contiguous CSeq sequence numbers (increasing-by-one)
        // in each direction (excepting ACK and CANCEL of course, whose numbers
        // equal the requests being acknowledged or cancelled).  Therefore, if
        // the local sequence number is not empty, the value of the local
        // sequence number MUST be incremented by one, and this value MUST be
        // placed into the CSeq header field.  If the local sequence number is
        // empty, an initial value MUST be chosen using the guidelines of
        // Section 8.1.1.5.  The method field in the CSeq header field value
        // MUST match the method of the request.
        // https://tools.ietf.org/html/rfc3261#section-12.2.1.1
        const callId = this.callId;
        let cseq;
        if (options && options.cseq) {
            cseq = options.cseq;
        }
        else if (!this.dialogState.localSequenceNumber) {
            cseq = this.dialogState.localSequenceNumber = 1; // https://tools.ietf.org/html/rfc3261#section-8.1.1.5
        }
        else {
            cseq = this.dialogState.localSequenceNumber += 1;
        }
        // The UAC uses the remote target and route set to build the Request-URI
        // and Route header field of the request.
        //
        // If the route set is empty, the UAC MUST place the remote target URI
        // into the Request-URI.  The UAC MUST NOT add a Route header field to
        // the request.
        //
        // If the route set is not empty, and the first URI in the route set
        // contains the lr parameter (see Section 19.1.1), the UAC MUST place
        // the remote target URI into the Request-URI and MUST include a Route
        // header field containing the route set values in order, including all
        // parameters.
        //
        // If the route set is not empty, and its first URI does not contain the
        // lr parameter, the UAC MUST place the first URI from the route set
        // into the Request-URI, stripping any parameters that are not allowed
        // in a Request-URI.  The UAC MUST add a Route header field containing
        // the remainder of the route set values in order, including all
        // parameters.  The UAC MUST then place the remote target URI into the
        // Route header field as the last value.
        // https://tools.ietf.org/html/rfc3261#section-12.2.1.1
        // The lr parameter, when present, indicates that the element
        // responsible for this resource implements the routing mechanisms
        // specified in this document.  This parameter will be used in the
        // URIs proxies place into Record-Route header field values, and
        // may appear in the URIs in a pre-existing route set.
        //
        // This parameter is used to achieve backwards compatibility with
        // systems implementing the strict-routing mechanisms of RFC 2543
        // and the rfc2543bis drafts up to bis-05.  An element preparing
        // to send a request based on a URI not containing this parameter
        // can assume the receiving element implements strict-routing and
        // reformat the message to preserve the information in the
        // Request-URI.
        // https://tools.ietf.org/html/rfc3261#section-19.1.1
        // NOTE: Not backwards compatible with RFC 2543 (no support for strict-routing).
        const ruri = this.remoteTarget;
        const routeSet = this.routeSet;
        const extraHeaders = options && options.extraHeaders;
        const body = options && options.body;
        // The relative order of header fields with different field names is not
        // significant.  However, it is RECOMMENDED that header fields which are
        // needed for proxy processing (Via, Route, Record-Route, Proxy-Require,
        // Max-Forwards, and Proxy-Authorization, for example) appear towards
        // the top of the message to facilitate rapid parsing.
        // https://tools.ietf.org/html/rfc3261#section-7.3.1
        const message = this.userAgentCore.makeOutgoingRequestMessage(method, ruri, fromUri, toUri, {
            callId,
            cseq,
            fromTag,
            toTag,
            routeSet
        }, extraHeaders, body);
        return message;
    }
    /**
     * Increment the local sequence number by one.
     * It feels like this should be protected, but the current authentication handling currently
     * needs this to keep the dialog in sync when "auto re-sends" request messages.
     * @internal
     */
    incrementLocalSequenceNumber() {
        if (!this.dialogState.localSequenceNumber) {
            throw new Error("Local sequence number undefined.");
        }
        this.dialogState.localSequenceNumber += 1;
    }
    /**
     * If the remote sequence number was not empty, but the sequence number
     * of the request is lower than the remote sequence number, the request
     * is out of order and MUST be rejected with a 500 (Server Internal
     * Error) response.
     * https://tools.ietf.org/html/rfc3261#section-12.2.2
     * @param request - Incoming request to guard.
     * @returns True if the program execution is to continue in the branch in question.
     *          Otherwise a 500 Server Internal Error was stateless sent and request processing must stop.
     */
    sequenceGuard(message) {
        // ACK guard.
        // By convention, handling of unexpected ACKs is responsibility
        // the particular dialog implementation. For example, see SessionDialog.
        // Furthermore, we cannot reply to an "out of sequence" ACK.
        if (message.method === _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_1__.C.ACK) {
            return true;
        }
        // Note: We are rejecting on "less than or equal to" the remote
        // sequence number (excepting ACK whose numbers equal the requests
        // being acknowledged or cancelled), which is the correct thing to
        // do in our case. The only time a request with the same sequence number
        // will show up here if is a) it is a very late retransmission of a
        // request we already handled or b) it is a different request with the
        // same sequence number which would be violation of the standard.
        // Request retransmissions are absorbed by the transaction layer,
        // so any request with a duplicate sequence number getting here
        // would have to be a retransmission after the transaction terminated
        // or a broken request (with unique via branch value).
        // Requests within a dialog MUST contain strictly monotonically
        // increasing and contiguous CSeq sequence numbers (increasing-by-one)
        // in each direction (excepting ACK and CANCEL of course, whose numbers
        // equal the requests being acknowledged or cancelled).  Therefore, if
        // the local sequence number is not empty, the value of the local
        // sequence number MUST be incremented by one, and this value MUST be
        // placed into the CSeq header field.
        // https://tools.ietf.org/html/rfc3261#section-12.2.1.1
        if (this.remoteSequenceNumber && message.cseq <= this.remoteSequenceNumber) {
            this.core.replyStateless(message, { statusCode: 500 });
            return false;
        }
        return true;
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/dialogs/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/sip.js/lib/core/dialogs/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Dialog": () => (/* reexport safe */ _dialog_js__WEBPACK_IMPORTED_MODULE_0__.Dialog),
/* harmony export */   "SessionDialog": () => (/* reexport safe */ _session_dialog_js__WEBPACK_IMPORTED_MODULE_1__.SessionDialog),
/* harmony export */   "SubscriptionDialog": () => (/* reexport safe */ _subscription_dialog_js__WEBPACK_IMPORTED_MODULE_2__.SubscriptionDialog)
/* harmony export */ });
/* harmony import */ var _dialog_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dialog.js */ "./node_modules/sip.js/lib/core/dialogs/dialog.js");
/* harmony import */ var _session_dialog_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./session-dialog.js */ "./node_modules/sip.js/lib/core/dialogs/session-dialog.js");
/* harmony import */ var _subscription_dialog_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./subscription-dialog.js */ "./node_modules/sip.js/lib/core/dialogs/subscription-dialog.js");






/***/ }),

/***/ "./node_modules/sip.js/lib/core/dialogs/session-dialog.js":
/*!****************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/dialogs/session-dialog.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SessionDialog": () => (/* binding */ SessionDialog)
/* harmony export */ });
/* harmony import */ var _grammar_name_addr_header_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../grammar/name-addr-header.js */ "./node_modules/sip.js/lib/grammar/name-addr-header.js");
/* harmony import */ var _messages_body_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ../messages/body.js */ "./node_modules/sip.js/lib/core/messages/body.js");
/* harmony import */ var _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../messages/methods/constants.js */ "./node_modules/sip.js/lib/core/messages/methods/constants.js");
/* harmony import */ var _messages_incoming_request_message_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ../messages/incoming-request-message.js */ "./node_modules/sip.js/lib/core/messages/incoming-request-message.js");
/* harmony import */ var _messages_incoming_response_message_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ../messages/incoming-response-message.js */ "./node_modules/sip.js/lib/core/messages/incoming-response-message.js");
/* harmony import */ var _messages_outgoing_request_message_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ../messages/outgoing-request-message.js */ "./node_modules/sip.js/lib/core/messages/outgoing-request-message.js");
/* harmony import */ var _session_session_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../session/session.js */ "./node_modules/sip.js/lib/core/session/session.js");
/* harmony import */ var _timers_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ../timers.js */ "./node_modules/sip.js/lib/core/timers.js");
/* harmony import */ var _transactions_invite_client_transaction_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../transactions/invite-client-transaction.js */ "./node_modules/sip.js/lib/core/transactions/invite-client-transaction.js");
/* harmony import */ var _transactions_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../transactions/invite-server-transaction.js */ "./node_modules/sip.js/lib/core/transactions/invite-server-transaction.js");
/* harmony import */ var _transactions_transaction_state_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../transactions/transaction-state.js */ "./node_modules/sip.js/lib/core/transactions/transaction-state.js");
/* harmony import */ var _user_agents_bye_user_agent_client_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../user-agents/bye-user-agent-client.js */ "./node_modules/sip.js/lib/core/user-agents/bye-user-agent-client.js");
/* harmony import */ var _user_agents_bye_user_agent_server_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../user-agents/bye-user-agent-server.js */ "./node_modules/sip.js/lib/core/user-agents/bye-user-agent-server.js");
/* harmony import */ var _user_agents_info_user_agent_client_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../user-agents/info-user-agent-client.js */ "./node_modules/sip.js/lib/core/user-agents/info-user-agent-client.js");
/* harmony import */ var _user_agents_info_user_agent_server_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../user-agents/info-user-agent-server.js */ "./node_modules/sip.js/lib/core/user-agents/info-user-agent-server.js");
/* harmony import */ var _user_agents_message_user_agent_client_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../user-agents/message-user-agent-client.js */ "./node_modules/sip.js/lib/core/user-agents/message-user-agent-client.js");
/* harmony import */ var _user_agents_message_user_agent_server_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../user-agents/message-user-agent-server.js */ "./node_modules/sip.js/lib/core/user-agents/message-user-agent-server.js");
/* harmony import */ var _user_agents_notify_user_agent_client_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../user-agents/notify-user-agent-client.js */ "./node_modules/sip.js/lib/core/user-agents/notify-user-agent-client.js");
/* harmony import */ var _user_agents_notify_user_agent_server_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../user-agents/notify-user-agent-server.js */ "./node_modules/sip.js/lib/core/user-agents/notify-user-agent-server.js");
/* harmony import */ var _user_agents_prack_user_agent_client_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../user-agents/prack-user-agent-client.js */ "./node_modules/sip.js/lib/core/user-agents/prack-user-agent-client.js");
/* harmony import */ var _user_agents_prack_user_agent_server_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../user-agents/prack-user-agent-server.js */ "./node_modules/sip.js/lib/core/user-agents/prack-user-agent-server.js");
/* harmony import */ var _user_agents_re_invite_user_agent_client_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../user-agents/re-invite-user-agent-client.js */ "./node_modules/sip.js/lib/core/user-agents/re-invite-user-agent-client.js");
/* harmony import */ var _user_agents_re_invite_user_agent_server_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../user-agents/re-invite-user-agent-server.js */ "./node_modules/sip.js/lib/core/user-agents/re-invite-user-agent-server.js");
/* harmony import */ var _user_agents_refer_user_agent_client_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../user-agents/refer-user-agent-client.js */ "./node_modules/sip.js/lib/core/user-agents/refer-user-agent-client.js");
/* harmony import */ var _user_agents_refer_user_agent_server_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ../user-agents/refer-user-agent-server.js */ "./node_modules/sip.js/lib/core/user-agents/refer-user-agent-server.js");
/* harmony import */ var _dialog_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dialog.js */ "./node_modules/sip.js/lib/core/dialogs/dialog.js");



























/**
 * Session Dialog.
 * @public
 */
class SessionDialog extends _dialog_js__WEBPACK_IMPORTED_MODULE_0__.Dialog {
    constructor(initialTransaction, core, state, delegate) {
        super(core, state);
        this.initialTransaction = initialTransaction;
        /** The state of the offer/answer exchange. */
        this._signalingState = _session_session_js__WEBPACK_IMPORTED_MODULE_1__.SignalingState.Initial;
        /** True if waiting for an ACK to the initial transaction 2xx (UAS only). */
        this.ackWait = false;
        /** True if processing an ACK to the initial transaction 2xx (UAS only). */
        this.ackProcessing = false;
        this.delegate = delegate;
        if (initialTransaction instanceof _transactions_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_2__.InviteServerTransaction) {
            // If we're created by an invite server transaction, we're
            // going to be waiting for an ACK if are to be confirmed.
            this.ackWait = true;
        }
        // If we're confirmed upon creation start the retransmitting whatever
        // the 2xx final response was that confirmed us into existence.
        if (!this.early) {
            this.start2xxRetransmissionTimer();
        }
        this.signalingStateTransition(initialTransaction.request);
        this.logger = core.loggerFactory.getLogger("sip.invite-dialog");
        this.logger.log(`INVITE dialog ${this.id} constructed`);
    }
    dispose() {
        super.dispose();
        this._signalingState = _session_session_js__WEBPACK_IMPORTED_MODULE_1__.SignalingState.Closed;
        this._offer = undefined;
        this._answer = undefined;
        if (this.invite2xxTimer) {
            clearTimeout(this.invite2xxTimer);
            this.invite2xxTimer = undefined;
        }
        // The UAS MUST still respond to any pending requests received for that
        // dialog.  It is RECOMMENDED that a 487 (Request Terminated) response
        // be generated to those pending requests.
        // https://tools.ietf.org/html/rfc3261#section-15.1.2
        // TODO:
        // this.userAgentServers.forEach((uas) => uas.reply(487));
        this.logger.log(`INVITE dialog ${this.id} destroyed`);
    }
    // FIXME: Need real state machine
    get sessionState() {
        if (this.early) {
            return _session_session_js__WEBPACK_IMPORTED_MODULE_1__.SessionState.Early;
        }
        else if (this.ackWait) {
            return _session_session_js__WEBPACK_IMPORTED_MODULE_1__.SessionState.AckWait;
        }
        else if (this._signalingState === _session_session_js__WEBPACK_IMPORTED_MODULE_1__.SignalingState.Closed) {
            return _session_session_js__WEBPACK_IMPORTED_MODULE_1__.SessionState.Terminated;
        }
        else {
            return _session_session_js__WEBPACK_IMPORTED_MODULE_1__.SessionState.Confirmed;
        }
    }
    /** The state of the offer/answer exchange. */
    get signalingState() {
        return this._signalingState;
    }
    /** The current offer. Undefined unless signaling state HaveLocalOffer, HaveRemoteOffer, of Stable. */
    get offer() {
        return this._offer;
    }
    /** The current answer. Undefined unless signaling state Stable. */
    get answer() {
        return this._answer;
    }
    /** Confirm the dialog. Only matters if dialog is currently early. */
    confirm() {
        // When we're confirmed start the retransmitting whatever
        // the 2xx final response that may have confirmed us.
        if (this.early) {
            this.start2xxRetransmissionTimer();
        }
        super.confirm();
    }
    /** Re-confirm the dialog. Only matters if handling re-INVITE request. */
    reConfirm() {
        // When we're confirmed start the retransmitting whatever
        // the 2xx final response that may have confirmed us.
        if (this.reinviteUserAgentServer) {
            this.startReInvite2xxRetransmissionTimer();
        }
    }
    /**
     * The UAC core MUST generate an ACK request for each 2xx received from
     * the transaction layer.  The header fields of the ACK are constructed
     * in the same way as for any request sent within a dialog (see Section
     * 12) with the exception of the CSeq and the header fields related to
     * authentication.  The sequence number of the CSeq header field MUST be
     * the same as the INVITE being acknowledged, but the CSeq method MUST
     * be ACK.  The ACK MUST contain the same credentials as the INVITE.  If
     * the 2xx contains an offer (based on the rules above), the ACK MUST
     * carry an answer in its body.  If the offer in the 2xx response is not
     * acceptable, the UAC core MUST generate a valid answer in the ACK and
     * then send a BYE immediately.
     * https://tools.ietf.org/html/rfc3261#section-13.2.2.4
     * @param options - ACK options bucket.
     */
    ack(options = {}) {
        this.logger.log(`INVITE dialog ${this.id} sending ACK request`);
        let transaction;
        if (this.reinviteUserAgentClient) {
            // We're sending ACK for a re-INVITE
            if (!(this.reinviteUserAgentClient.transaction instanceof _transactions_invite_client_transaction_js__WEBPACK_IMPORTED_MODULE_3__.InviteClientTransaction)) {
                throw new Error("Transaction not instance of InviteClientTransaction.");
            }
            transaction = this.reinviteUserAgentClient.transaction;
            this.reinviteUserAgentClient = undefined;
        }
        else {
            // We're sending ACK for the initial INVITE
            if (!(this.initialTransaction instanceof _transactions_invite_client_transaction_js__WEBPACK_IMPORTED_MODULE_3__.InviteClientTransaction)) {
                throw new Error("Initial transaction not instance of InviteClientTransaction.");
            }
            transaction = this.initialTransaction;
        }
        const message = this.createOutgoingRequestMessage(_messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_4__.C.ACK, {
            cseq: transaction.request.cseq,
            extraHeaders: options.extraHeaders,
            body: options.body
        });
        transaction.ackResponse(message); // See InviteClientTransaction for details.
        this.signalingStateTransition(message);
        return { message };
    }
    /**
     * Terminating a Session
     *
     * This section describes the procedures for terminating a session
     * established by SIP.  The state of the session and the state of the
     * dialog are very closely related.  When a session is initiated with an
     * INVITE, each 1xx or 2xx response from a distinct UAS creates a
     * dialog, and if that response completes the offer/answer exchange, it
     * also creates a session.  As a result, each session is "associated"
     * with a single dialog - the one which resulted in its creation.  If an
     * initial INVITE generates a non-2xx final response, that terminates
     * all sessions (if any) and all dialogs (if any) that were created
     * through responses to the request.  By virtue of completing the
     * transaction, a non-2xx final response also prevents further sessions
     * from being created as a result of the INVITE.  The BYE request is
     * used to terminate a specific session or attempted session.  In this
     * case, the specific session is the one with the peer UA on the other
     * side of the dialog.  When a BYE is received on a dialog, any session
     * associated with that dialog SHOULD terminate.  A UA MUST NOT send a
     * BYE outside of a dialog.  The caller's UA MAY send a BYE for either
     * confirmed or early dialogs, and the callee's UA MAY send a BYE on
     * confirmed dialogs, but MUST NOT send a BYE on early dialogs.
     *
     * However, the callee's UA MUST NOT send a BYE on a confirmed dialog
     * until it has received an ACK for its 2xx response or until the server
     * transaction times out.  If no SIP extensions have defined other
     * application layer states associated with the dialog, the BYE also
     * terminates the dialog.
     *
     * https://tools.ietf.org/html/rfc3261#section-15
     * FIXME: Make these proper Exceptions...
     * @param options - BYE options bucket.
     * @returns
     * Throws `Error` if callee's UA attempts a BYE on an early dialog.
     * Throws `Error` if callee's UA attempts a BYE on a confirmed dialog
     *                while it's waiting on the ACK for its 2xx response.
     */
    bye(delegate, options) {
        this.logger.log(`INVITE dialog ${this.id} sending BYE request`);
        // The caller's UA MAY send a BYE for either
        // confirmed or early dialogs, and the callee's UA MAY send a BYE on
        // confirmed dialogs, but MUST NOT send a BYE on early dialogs.
        //
        // However, the callee's UA MUST NOT send a BYE on a confirmed dialog
        // until it has received an ACK for its 2xx response or until the server
        // transaction times out.
        // https://tools.ietf.org/html/rfc3261#section-15
        if (this.initialTransaction instanceof _transactions_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_2__.InviteServerTransaction) {
            if (this.early) {
                // FIXME: TODO: This should throw a proper exception.
                throw new Error("UAS MUST NOT send a BYE on early dialogs.");
            }
            if (this.ackWait && this.initialTransaction.state !== _transactions_transaction_state_js__WEBPACK_IMPORTED_MODULE_5__.TransactionState.Terminated) {
                // FIXME: TODO: This should throw a proper exception.
                throw new Error("UAS MUST NOT send a BYE on a confirmed dialog " +
                    "until it has received an ACK for its 2xx response " +
                    "or until the server transaction times out.");
            }
        }
        // A BYE request is constructed as would any other request within a
        // dialog, as described in Section 12.
        //
        // Once the BYE is constructed, the UAC core creates a new non-INVITE
        // client transaction, and passes it the BYE request.  The UAC MUST
        // consider the session terminated (and therefore stop sending or
        // listening for media) as soon as the BYE request is passed to the
        // client transaction.  If the response for the BYE is a 481
        // (Call/Transaction Does Not Exist) or a 408 (Request Timeout) or no
        // response at all is received for the BYE (that is, a timeout is
        // returned by the client transaction), the UAC MUST consider the
        // session and the dialog terminated.
        // https://tools.ietf.org/html/rfc3261#section-15.1.1
        return new _user_agents_bye_user_agent_client_js__WEBPACK_IMPORTED_MODULE_6__.ByeUserAgentClient(this, delegate, options);
    }
    /**
     * An INFO request can be associated with an Info Package (see
     * Section 5), or associated with a legacy INFO usage (see Section 2).
     *
     * The construction of the INFO request is the same as any other
     * non-target refresh request within an existing invite dialog usage as
     * described in Section 12.2 of RFC 3261.
     * https://tools.ietf.org/html/rfc6086#section-4.2.1
     * @param options - Options bucket.
     */
    info(delegate, options) {
        this.logger.log(`INVITE dialog ${this.id} sending INFO request`);
        if (this.early) {
            // FIXME: TODO: This should throw a proper exception.
            throw new Error("Dialog not confirmed.");
        }
        return new _user_agents_info_user_agent_client_js__WEBPACK_IMPORTED_MODULE_7__.InfoUserAgentClient(this, delegate, options);
    }
    /**
     * Modifying an Existing Session
     *
     * A successful INVITE request (see Section 13) establishes both a
     * dialog between two user agents and a session using the offer-answer
     * model.  Section 12 explains how to modify an existing dialog using a
     * target refresh request (for example, changing the remote target URI
     * of the dialog).  This section describes how to modify the actual
     * session.  This modification can involve changing addresses or ports,
     * adding a media stream, deleting a media stream, and so on.  This is
     * accomplished by sending a new INVITE request within the same dialog
     * that established the session.  An INVITE request sent within an
     * existing dialog is known as a re-INVITE.
     *
     *    Note that a single re-INVITE can modify the dialog and the
     *    parameters of the session at the same time.
     *
     * Either the caller or callee can modify an existing session.
     * https://tools.ietf.org/html/rfc3261#section-14
     * @param options - Options bucket
     */
    invite(delegate, options) {
        this.logger.log(`INVITE dialog ${this.id} sending INVITE request`);
        if (this.early) {
            // FIXME: TODO: This should throw a proper exception.
            throw new Error("Dialog not confirmed.");
        }
        // Note that a UAC MUST NOT initiate a new INVITE transaction within a
        // dialog while another INVITE transaction is in progress in either
        // direction.
        //
        //    1. If there is an ongoing INVITE client transaction, the TU MUST
        //       wait until the transaction reaches the completed or terminated
        //       state before initiating the new INVITE.
        //
        //    2. If there is an ongoing INVITE server transaction, the TU MUST
        //       wait until the transaction reaches the confirmed or terminated
        //       state before initiating the new INVITE.
        //
        // However, a UA MAY initiate a regular transaction while an INVITE
        // transaction is in progress.  A UA MAY also initiate an INVITE
        // transaction while a regular transaction is in progress.
        // https://tools.ietf.org/html/rfc3261#section-14.1
        if (this.reinviteUserAgentClient) {
            // FIXME: TODO: This should throw a proper exception.
            throw new Error("There is an ongoing re-INVITE client transaction.");
        }
        if (this.reinviteUserAgentServer) {
            // FIXME: TODO: This should throw a proper exception.
            throw new Error("There is an ongoing re-INVITE server transaction.");
        }
        return new _user_agents_re_invite_user_agent_client_js__WEBPACK_IMPORTED_MODULE_8__.ReInviteUserAgentClient(this, delegate, options);
    }
    /**
     * A UAC MAY associate a MESSAGE request with an existing dialog.  If a
     * MESSAGE request is sent within a dialog, it is "associated" with any
     * media session or sessions associated with that dialog.
     * https://tools.ietf.org/html/rfc3428#section-4
     * @param options - Options bucket.
     */
    message(delegate, options) {
        this.logger.log(`INVITE dialog ${this.id} sending MESSAGE request`);
        if (this.early) {
            // FIXME: TODO: This should throw a proper exception.
            throw new Error("Dialog not confirmed.");
        }
        const message = this.createOutgoingRequestMessage(_messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_4__.C.MESSAGE, options);
        return new _user_agents_message_user_agent_client_js__WEBPACK_IMPORTED_MODULE_9__.MessageUserAgentClient(this.core, message, delegate);
    }
    /**
     * The NOTIFY mechanism defined in [2] MUST be used to inform the agent
     * sending the REFER of the status of the reference.
     * https://tools.ietf.org/html/rfc3515#section-2.4.4
     * @param options - Options bucket.
     */
    notify(delegate, options) {
        this.logger.log(`INVITE dialog ${this.id} sending NOTIFY request`);
        if (this.early) {
            // FIXME: TODO: This should throw a proper exception.
            throw new Error("Dialog not confirmed.");
        }
        return new _user_agents_notify_user_agent_client_js__WEBPACK_IMPORTED_MODULE_10__.NotifyUserAgentClient(this, delegate, options);
    }
    /**
     * Assuming the response is to be transmitted reliably, the UAC MUST
     * create a new request with method PRACK.  This request is sent within
     * the dialog associated with the provisional response (indeed, the
     * provisional response may have created the dialog).  PRACK requests
     * MAY contain bodies, which are interpreted according to their type and
     * disposition.
     * https://tools.ietf.org/html/rfc3262#section-4
     * @param options - Options bucket.
     */
    prack(delegate, options) {
        this.logger.log(`INVITE dialog ${this.id} sending PRACK request`);
        return new _user_agents_prack_user_agent_client_js__WEBPACK_IMPORTED_MODULE_11__.PrackUserAgentClient(this, delegate, options);
    }
    /**
     * REFER is a SIP request and is constructed as defined in [1].  A REFER
     * request MUST contain exactly one Refer-To header field value.
     * https://tools.ietf.org/html/rfc3515#section-2.4.1
     * @param options - Options bucket.
     */
    refer(delegate, options) {
        this.logger.log(`INVITE dialog ${this.id} sending REFER request`);
        if (this.early) {
            // FIXME: TODO: This should throw a proper exception.
            throw new Error("Dialog not confirmed.");
        }
        // FIXME: TODO: Validate Refer-To header field value.
        return new _user_agents_refer_user_agent_client_js__WEBPACK_IMPORTED_MODULE_12__.ReferUserAgentClient(this, delegate, options);
    }
    /**
     * Requests sent within a dialog, as any other requests, are atomic.  If
     * a particular request is accepted by the UAS, all the state changes
     * associated with it are performed.  If the request is rejected, none
     * of the state changes are performed.
     * https://tools.ietf.org/html/rfc3261#section-12.2.2
     * @param message - Incoming request message within this dialog.
     */
    receiveRequest(message) {
        this.logger.log(`INVITE dialog ${this.id} received ${message.method} request`);
        // Response retransmissions cease when an ACK request for the
        // response is received.  This is independent of whatever transport
        // protocols are used to send the response.
        // https://tools.ietf.org/html/rfc6026#section-8.1
        if (message.method === _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_4__.C.ACK) {
            // If ackWait is true, then this is the ACK to the initial INVITE,
            // otherwise this is an ACK to an in dialog INVITE. In either case,
            // guard to make sure the sequence number of the ACK matches the INVITE.
            if (this.ackWait) {
                if (this.initialTransaction instanceof _transactions_invite_client_transaction_js__WEBPACK_IMPORTED_MODULE_3__.InviteClientTransaction) {
                    this.logger.warn(`INVITE dialog ${this.id} received unexpected ${message.method} request, dropping.`);
                    return;
                }
                if (this.initialTransaction.request.cseq !== message.cseq) {
                    this.logger.warn(`INVITE dialog ${this.id} received unexpected ${message.method} request, dropping.`);
                    return;
                }
                // Update before the delegate has a chance to handle the
                // message as delegate may callback into this dialog.
                this.ackWait = false;
            }
            else {
                if (!this.reinviteUserAgentServer) {
                    this.logger.warn(`INVITE dialog ${this.id} received unexpected ${message.method} request, dropping.`);
                    return;
                }
                if (this.reinviteUserAgentServer.transaction.request.cseq !== message.cseq) {
                    this.logger.warn(`INVITE dialog ${this.id} received unexpected ${message.method} request, dropping.`);
                    return;
                }
                this.reinviteUserAgentServer = undefined;
            }
            this.signalingStateTransition(message);
            if (this.delegate && this.delegate.onAck) {
                const promiseOrVoid = this.delegate.onAck({ message });
                if (promiseOrVoid instanceof Promise) {
                    this.ackProcessing = true; // make sure this is always reset to false
                    promiseOrVoid.then(() => (this.ackProcessing = false)).catch(() => (this.ackProcessing = false));
                }
            }
            return;
        }
        // Request within a dialog out of sequence guard.
        // https://tools.ietf.org/html/rfc3261#section-12.2.2
        if (!this.sequenceGuard(message)) {
            this.logger.log(`INVITE dialog ${this.id} rejected out of order ${message.method} request.`);
            return;
        }
        // Request within a dialog common processing.
        // https://tools.ietf.org/html/rfc3261#section-12.2.2
        super.receiveRequest(message);
        // Handle various INVITE related cross-over, glare and race conditions
        if (message.method === _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_4__.C.INVITE) {
            // Hopefully this message is helpful...
            const warning = () => {
                const reason = this.ackWait ? "waiting for initial ACK" : "processing initial ACK";
                this.logger.warn(`INVITE dialog ${this.id} received re-INVITE while ${reason}`);
                let msg = "RFC 5407 suggests the following to avoid this race condition... ";
                msg += " Note: Implementation issues are outside the scope of this document,";
                msg += " but the following tip is provided for avoiding race conditions of";
                msg += " this type.  The caller can delay sending re-INVITE F6 for some period";
                msg += " of time (2 seconds, perhaps), after which the caller can reasonably";
                msg += " assume that its ACK has been received.  Implementors can decouple the";
                msg += " actions of the user (e.g., pressing the hold button) from the actions";
                msg += " of the protocol (the sending of re-INVITE F6), so that the UA can";
                msg += " behave like this.  In this case, it is the implementor's choice as to";
                msg += " how long to wait.  In most cases, such an implementation may be";
                msg += " useful to prevent the type of race condition shown in this section.";
                msg += " This document expresses no preference about whether or not they";
                msg += " should wait for an ACK to be delivered.  After considering the impact";
                msg += " on user experience, implementors should decide whether or not to wait";
                msg += " for a while, because the user experience depends on the";
                msg += " implementation and has no direct bearing on protocol behavior.";
                this.logger.warn(msg);
                return; // drop re-INVITE request message
            };
            // A UAS that receives a second INVITE before it sends the final
            // response to a first INVITE with a lower CSeq sequence number on the
            // same dialog MUST return a 500 (Server Internal Error) response to the
            // second INVITE and MUST include a Retry-After header field with a
            // randomly chosen value of between 0 and 10 seconds.
            // https://tools.ietf.org/html/rfc3261#section-14.2
            const retryAfter = Math.floor(Math.random() * 10) + 1;
            const extraHeaders = [`Retry-After: ${retryAfter}`];
            // There may be ONLY ONE offer/answer negotiation in progress for a
            // single dialog at any point in time.  Section 4 explains how to ensure
            // this.
            // https://tools.ietf.org/html/rfc6337#section-2.2
            if (this.ackProcessing) {
                // UAS-IsI:  While an INVITE server transaction is incomplete or ACK
                //           transaction associated with an offer/answer is incomplete,
                //           a UA must reject another INVITE request with a 500
                //           response.
                // https://tools.ietf.org/html/rfc6337#section-4.3
                this.core.replyStateless(message, { statusCode: 500, extraHeaders });
                warning();
                return;
            }
            // 3.1.4.  Callee Receives re-INVITE (Established State)  While in the
            // Moratorium State (Case 1)
            // https://tools.ietf.org/html/rfc5407#section-3.1.4
            // 3.1.5.  Callee Receives re-INVITE (Established State) While in the
            // Moratorium State (Case 2)
            // https://tools.ietf.org/html/rfc5407#section-3.1.5
            if (this.ackWait && this.signalingState !== _session_session_js__WEBPACK_IMPORTED_MODULE_1__.SignalingState.Stable) {
                // This scenario is basically the same as that of Section 3.1.4, but
                // differs in sending an offer in the 200 and an answer in the ACK.  In
                // contrast to the previous case, the offer in the 200 (F3) and the
                // offer in the re-INVITE (F6) collide with each other.
                //
                // Bob sends a 491 to the re-INVITE (F6) since he is not able to
                // properly handle a new request until he receives an answer.  (Note:
                // 500 with a Retry-After header may be returned if the 491 response is
                // understood to indicate request collision.  However, 491 is
                // recommended here because 500 applies to so many cases that it is
                // difficult to determine what the real problem was.)
                // https://tools.ietf.org/html/rfc5407#section-3.1.5
                // UAS-IsI:  While an INVITE server transaction is incomplete or ACK
                //           transaction associated with an offer/answer is incomplete,
                //           a UA must reject another INVITE request with a 500
                //           response.
                // https://tools.ietf.org/html/rfc6337#section-4.3
                this.core.replyStateless(message, { statusCode: 500, extraHeaders });
                warning();
                return;
            }
            // A UAS that receives a second INVITE before it sends the final
            // response to a first INVITE with a lower CSeq sequence number on the
            // same dialog MUST return a 500 (Server Internal Error) response to the
            // second INVITE and MUST include a Retry-After header field with a
            // randomly chosen value of between 0 and 10 seconds.
            // https://tools.ietf.org/html/rfc3261#section-14.2
            if (this.reinviteUserAgentServer) {
                this.core.replyStateless(message, { statusCode: 500, extraHeaders });
                return;
            }
            // A UAS that receives an INVITE on a dialog while an INVITE it had sent
            // on that dialog is in progress MUST return a 491 (Request Pending)
            // response to the received INVITE.
            // https://tools.ietf.org/html/rfc3261#section-14.2
            if (this.reinviteUserAgentClient) {
                this.core.replyStateless(message, { statusCode: 491 });
                return;
            }
        }
        // Requests within a dialog MAY contain Record-Route and Contact header
        // fields.  However, these requests do not cause the dialog's route set
        // to be modified, although they may modify the remote target URI.
        // Specifically, requests that are not target refresh requests do not
        // modify the dialog's remote target URI, and requests that are target
        // refresh requests do.  For dialogs that have been established with an
        // INVITE, the only target refresh request defined is re-INVITE (see
        // Section 14).  Other extensions may define different target refresh
        // requests for dialogs established in other ways.
        //
        //    Note that an ACK is NOT a target refresh request.
        //
        // Target refresh requests only update the dialog's remote target URI,
        // and not the route set formed from the Record-Route.  Updating the
        // latter would introduce severe backwards compatibility problems with
        // RFC 2543-compliant systems.
        // https://tools.ietf.org/html/rfc3261#section-15
        if (message.method === _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_4__.C.INVITE) {
            // FIXME: parser needs to be typed...
            const contact = message.parseHeader("contact");
            if (!contact) {
                // TODO: Review to make sure this will never happen
                throw new Error("Contact undefined.");
            }
            if (!(contact instanceof _grammar_name_addr_header_js__WEBPACK_IMPORTED_MODULE_13__.NameAddrHeader)) {
                throw new Error("Contact not instance of NameAddrHeader.");
            }
            this.dialogState.remoteTarget = contact.uri;
        }
        // Switch on method and then delegate.
        switch (message.method) {
            case _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_4__.C.BYE:
                // A UAS core receiving a BYE request for an existing dialog MUST follow
                // the procedures of Section 12.2.2 to process the request.  Once done,
                // the UAS SHOULD terminate the session (and therefore stop sending and
                // listening for media).  The only case where it can elect not to are
                // multicast sessions, where participation is possible even if the other
                // participant in the dialog has terminated its involvement in the
                // session.  Whether or not it ends its participation on the session,
                // the UAS core MUST generate a 2xx response to the BYE, and MUST pass
                // that to the server transaction for transmission.
                //
                // The UAS MUST still respond to any pending requests received for that
                // dialog.  It is RECOMMENDED that a 487 (Request Terminated) response
                // be generated to those pending requests.
                // https://tools.ietf.org/html/rfc3261#section-15.1.2
                {
                    const uas = new _user_agents_bye_user_agent_server_js__WEBPACK_IMPORTED_MODULE_14__.ByeUserAgentServer(this, message);
                    this.delegate && this.delegate.onBye ? this.delegate.onBye(uas) : uas.accept();
                    this.dispose();
                }
                break;
            case _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_4__.C.INFO:
                // If a UA receives an INFO request associated with an Info Package that
                // the UA has not indicated willingness to receive, the UA MUST send a
                // 469 (Bad Info Package) response (see Section 11.6), which contains a
                // Recv-Info header field with Info Packages for which the UA is willing
                // to receive INFO requests.
                {
                    const uas = new _user_agents_info_user_agent_server_js__WEBPACK_IMPORTED_MODULE_15__.InfoUserAgentServer(this, message);
                    this.delegate && this.delegate.onInfo
                        ? this.delegate.onInfo(uas)
                        : uas.reject({
                            statusCode: 469,
                            extraHeaders: ["Recv-Info:"]
                        });
                }
                break;
            case _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_4__.C.INVITE:
                // If the new session description is not acceptable, the UAS can reject
                // it by returning a 488 (Not Acceptable Here) response for the re-
                // INVITE.  This response SHOULD include a Warning header field.
                // https://tools.ietf.org/html/rfc3261#section-14.2
                {
                    const uas = new _user_agents_re_invite_user_agent_server_js__WEBPACK_IMPORTED_MODULE_16__.ReInviteUserAgentServer(this, message);
                    this.signalingStateTransition(message);
                    this.delegate && this.delegate.onInvite ? this.delegate.onInvite(uas) : uas.reject({ statusCode: 488 }); // TODO: Warning header field.
                }
                break;
            case _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_4__.C.MESSAGE:
                {
                    const uas = new _user_agents_message_user_agent_server_js__WEBPACK_IMPORTED_MODULE_17__.MessageUserAgentServer(this.core, message);
                    this.delegate && this.delegate.onMessage ? this.delegate.onMessage(uas) : uas.accept();
                }
                break;
            case _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_4__.C.NOTIFY:
                // https://tools.ietf.org/html/rfc3515#section-2.4.4
                {
                    const uas = new _user_agents_notify_user_agent_server_js__WEBPACK_IMPORTED_MODULE_18__.NotifyUserAgentServer(this, message);
                    this.delegate && this.delegate.onNotify ? this.delegate.onNotify(uas) : uas.accept();
                }
                break;
            case _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_4__.C.PRACK:
                // https://tools.ietf.org/html/rfc3262#section-4
                {
                    const uas = new _user_agents_prack_user_agent_server_js__WEBPACK_IMPORTED_MODULE_19__.PrackUserAgentServer(this, message);
                    this.delegate && this.delegate.onPrack ? this.delegate.onPrack(uas) : uas.accept();
                }
                break;
            case _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_4__.C.REFER:
                // https://tools.ietf.org/html/rfc3515#section-2.4.2
                {
                    const uas = new _user_agents_refer_user_agent_server_js__WEBPACK_IMPORTED_MODULE_20__.ReferUserAgentServer(this, message);
                    this.delegate && this.delegate.onRefer ? this.delegate.onRefer(uas) : uas.reject();
                }
                break;
            default:
                {
                    this.logger.log(`INVITE dialog ${this.id} received unimplemented ${message.method} request`);
                    this.core.replyStateless(message, { statusCode: 501 });
                }
                break;
        }
    }
    /**
     * Guard against out of order reliable provisional responses and retransmissions.
     * Returns false if the response should be discarded, otherwise true.
     * @param message - Incoming response message within this dialog.
     */
    reliableSequenceGuard(message) {
        const statusCode = message.statusCode;
        if (!statusCode) {
            throw new Error("Status code undefined");
        }
        if (statusCode > 100 && statusCode < 200) {
            // If a provisional response is received for an initial request, and
            // that response contains a Require header field containing the option
            // tag 100rel, the response is to be sent reliably.  If the response is
            // a 100 (Trying) (as opposed to 101 to 199), this option tag MUST be
            // ignored, and the procedures below MUST NOT be used.
            // https://tools.ietf.org/html/rfc3262#section-4
            const requireHeader = message.getHeader("require");
            const rseqHeader = message.getHeader("rseq");
            const rseq = requireHeader && requireHeader.includes("100rel") && rseqHeader ? Number(rseqHeader) : undefined;
            if (rseq) {
                // Handling of subsequent reliable provisional responses for the same
                // initial request follows the same rules as above, with the following
                // difference: reliable provisional responses are guaranteed to be in
                // order.  As a result, if the UAC receives another reliable provisional
                // response to the same request, and its RSeq value is not one higher
                // than the value of the sequence number, that response MUST NOT be
                // acknowledged with a PRACK, and MUST NOT be processed further by the
                // UAC.  An implementation MAY discard the response, or MAY cache the
                // response in the hopes of receiving the missing responses.
                // https://tools.ietf.org/html/rfc3262#section-4
                if (this.rseq && this.rseq + 1 !== rseq) {
                    return false;
                }
                // Once a reliable provisional response is received, retransmissions of
                // that response MUST be discarded.  A response is a retransmission when
                // its dialog ID, CSeq, and RSeq match the original response.  The UAC
                // MUST maintain a sequence number that indicates the most recently
                // received in-order reliable provisional response for the initial
                // request.  This sequence number MUST be maintained until a final
                // response is received for the initial request.  Its value MUST be
                // initialized to the RSeq header field in the first reliable
                // provisional response received for the initial request.
                // https://tools.ietf.org/html/rfc3262#section-4
                this.rseq = this.rseq ? this.rseq + 1 : rseq;
            }
        }
        return true;
    }
    /**
     * If not in a stable signaling state, rollback to prior stable signaling state.
     */
    signalingStateRollback() {
        if (this._signalingState === _session_session_js__WEBPACK_IMPORTED_MODULE_1__.SignalingState.HaveLocalOffer ||
            this.signalingState === _session_session_js__WEBPACK_IMPORTED_MODULE_1__.SignalingState.HaveRemoteOffer) {
            if (this._rollbackOffer && this._rollbackAnswer) {
                this._signalingState = _session_session_js__WEBPACK_IMPORTED_MODULE_1__.SignalingState.Stable;
                this._offer = this._rollbackOffer;
                this._answer = this._rollbackAnswer;
            }
        }
    }
    /**
     * Update the signaling state of the dialog.
     * @param message - The message to base the update off of.
     */
    signalingStateTransition(message) {
        const body = (0,_messages_body_js__WEBPACK_IMPORTED_MODULE_21__.getBody)(message);
        // No body, no session. No, woman, no cry.
        if (!body || body.contentDisposition !== "session") {
            return;
        }
        // We've got an existing offer and answer which we may wish to rollback to
        if (this._signalingState === _session_session_js__WEBPACK_IMPORTED_MODULE_1__.SignalingState.Stable) {
            this._rollbackOffer = this._offer;
            this._rollbackAnswer = this._answer;
        }
        // We're in UAS role, receiving incoming request with session description
        if (message instanceof _messages_incoming_request_message_js__WEBPACK_IMPORTED_MODULE_22__.IncomingRequestMessage) {
            switch (this._signalingState) {
                case _session_session_js__WEBPACK_IMPORTED_MODULE_1__.SignalingState.Initial:
                case _session_session_js__WEBPACK_IMPORTED_MODULE_1__.SignalingState.Stable:
                    this._signalingState = _session_session_js__WEBPACK_IMPORTED_MODULE_1__.SignalingState.HaveRemoteOffer;
                    this._offer = body;
                    this._answer = undefined;
                    break;
                case _session_session_js__WEBPACK_IMPORTED_MODULE_1__.SignalingState.HaveLocalOffer:
                    this._signalingState = _session_session_js__WEBPACK_IMPORTED_MODULE_1__.SignalingState.Stable;
                    this._answer = body;
                    break;
                case _session_session_js__WEBPACK_IMPORTED_MODULE_1__.SignalingState.HaveRemoteOffer:
                    // You cannot make a new offer while one is in progress.
                    // https://tools.ietf.org/html/rfc3261#section-13.2.1
                    // FIXME: What to do here?
                    break;
                case _session_session_js__WEBPACK_IMPORTED_MODULE_1__.SignalingState.Closed:
                    break;
                default:
                    throw new Error("Unexpected signaling state.");
            }
        }
        // We're in UAC role, receiving incoming response with session description
        if (message instanceof _messages_incoming_response_message_js__WEBPACK_IMPORTED_MODULE_23__.IncomingResponseMessage) {
            switch (this._signalingState) {
                case _session_session_js__WEBPACK_IMPORTED_MODULE_1__.SignalingState.Initial:
                case _session_session_js__WEBPACK_IMPORTED_MODULE_1__.SignalingState.Stable:
                    this._signalingState = _session_session_js__WEBPACK_IMPORTED_MODULE_1__.SignalingState.HaveRemoteOffer;
                    this._offer = body;
                    this._answer = undefined;
                    break;
                case _session_session_js__WEBPACK_IMPORTED_MODULE_1__.SignalingState.HaveLocalOffer:
                    this._signalingState = _session_session_js__WEBPACK_IMPORTED_MODULE_1__.SignalingState.Stable;
                    this._answer = body;
                    break;
                case _session_session_js__WEBPACK_IMPORTED_MODULE_1__.SignalingState.HaveRemoteOffer:
                    // You cannot make a new offer while one is in progress.
                    // https://tools.ietf.org/html/rfc3261#section-13.2.1
                    // FIXME: What to do here?
                    break;
                case _session_session_js__WEBPACK_IMPORTED_MODULE_1__.SignalingState.Closed:
                    break;
                default:
                    throw new Error("Unexpected signaling state.");
            }
        }
        // We're in UAC role, sending outgoing request with session description
        if (message instanceof _messages_outgoing_request_message_js__WEBPACK_IMPORTED_MODULE_24__.OutgoingRequestMessage) {
            switch (this._signalingState) {
                case _session_session_js__WEBPACK_IMPORTED_MODULE_1__.SignalingState.Initial:
                case _session_session_js__WEBPACK_IMPORTED_MODULE_1__.SignalingState.Stable:
                    this._signalingState = _session_session_js__WEBPACK_IMPORTED_MODULE_1__.SignalingState.HaveLocalOffer;
                    this._offer = body;
                    this._answer = undefined;
                    break;
                case _session_session_js__WEBPACK_IMPORTED_MODULE_1__.SignalingState.HaveLocalOffer:
                    // You cannot make a new offer while one is in progress.
                    // https://tools.ietf.org/html/rfc3261#section-13.2.1
                    // FIXME: What to do here?
                    break;
                case _session_session_js__WEBPACK_IMPORTED_MODULE_1__.SignalingState.HaveRemoteOffer:
                    this._signalingState = _session_session_js__WEBPACK_IMPORTED_MODULE_1__.SignalingState.Stable;
                    this._answer = body;
                    break;
                case _session_session_js__WEBPACK_IMPORTED_MODULE_1__.SignalingState.Closed:
                    break;
                default:
                    throw new Error("Unexpected signaling state.");
            }
        }
        // We're in UAS role, sending outgoing response with session description
        if ((0,_messages_body_js__WEBPACK_IMPORTED_MODULE_21__.isBody)(message)) {
            switch (this._signalingState) {
                case _session_session_js__WEBPACK_IMPORTED_MODULE_1__.SignalingState.Initial:
                case _session_session_js__WEBPACK_IMPORTED_MODULE_1__.SignalingState.Stable:
                    this._signalingState = _session_session_js__WEBPACK_IMPORTED_MODULE_1__.SignalingState.HaveLocalOffer;
                    this._offer = body;
                    this._answer = undefined;
                    break;
                case _session_session_js__WEBPACK_IMPORTED_MODULE_1__.SignalingState.HaveLocalOffer:
                    // You cannot make a new offer while one is in progress.
                    // https://tools.ietf.org/html/rfc3261#section-13.2.1
                    // FIXME: What to do here?
                    break;
                case _session_session_js__WEBPACK_IMPORTED_MODULE_1__.SignalingState.HaveRemoteOffer:
                    this._signalingState = _session_session_js__WEBPACK_IMPORTED_MODULE_1__.SignalingState.Stable;
                    this._answer = body;
                    break;
                case _session_session_js__WEBPACK_IMPORTED_MODULE_1__.SignalingState.Closed:
                    break;
                default:
                    throw new Error("Unexpected signaling state.");
            }
        }
    }
    start2xxRetransmissionTimer() {
        if (this.initialTransaction instanceof _transactions_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_2__.InviteServerTransaction) {
            const transaction = this.initialTransaction;
            // Once the response has been constructed, it is passed to the INVITE
            // server transaction.  In order to ensure reliable end-to-end
            // transport of the response, it is necessary to periodically pass
            // the response directly to the transport until the ACK arrives.  The
            // 2xx response is passed to the transport with an interval that
            // starts at T1 seconds and doubles for each retransmission until it
            // reaches T2 seconds (T1 and T2 are defined in Section 17).
            // Response retransmissions cease when an ACK request for the
            // response is received.  This is independent of whatever transport
            // protocols are used to send the response.
            // https://tools.ietf.org/html/rfc6026#section-8.1
            let timeout = _timers_js__WEBPACK_IMPORTED_MODULE_25__.Timers.T1;
            const retransmission = () => {
                if (!this.ackWait) {
                    this.invite2xxTimer = undefined;
                    return;
                }
                this.logger.log("No ACK for 2xx response received, attempting retransmission");
                transaction.retransmitAcceptedResponse();
                timeout = Math.min(timeout * 2, _timers_js__WEBPACK_IMPORTED_MODULE_25__.Timers.T2);
                this.invite2xxTimer = setTimeout(retransmission, timeout);
            };
            this.invite2xxTimer = setTimeout(retransmission, timeout);
            // If the server retransmits the 2xx response for 64*T1 seconds without
            // receiving an ACK, the dialog is confirmed, but the session SHOULD be
            // terminated.  This is accomplished with a BYE, as described in Section 15.
            // https://tools.ietf.org/html/rfc3261#section-13.3.1.4
            const stateChanged = () => {
                if (transaction.state === _transactions_transaction_state_js__WEBPACK_IMPORTED_MODULE_5__.TransactionState.Terminated) {
                    transaction.removeStateChangeListener(stateChanged);
                    if (this.invite2xxTimer) {
                        clearTimeout(this.invite2xxTimer);
                        this.invite2xxTimer = undefined;
                    }
                    if (this.ackWait) {
                        if (this.delegate && this.delegate.onAckTimeout) {
                            this.delegate.onAckTimeout();
                        }
                        else {
                            this.bye();
                        }
                    }
                }
            };
            transaction.addStateChangeListener(stateChanged);
        }
    }
    // FIXME: Refactor
    startReInvite2xxRetransmissionTimer() {
        if (this.reinviteUserAgentServer && this.reinviteUserAgentServer.transaction instanceof _transactions_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_2__.InviteServerTransaction) {
            const transaction = this.reinviteUserAgentServer.transaction;
            // Once the response has been constructed, it is passed to the INVITE
            // server transaction.  In order to ensure reliable end-to-end
            // transport of the response, it is necessary to periodically pass
            // the response directly to the transport until the ACK arrives.  The
            // 2xx response is passed to the transport with an interval that
            // starts at T1 seconds and doubles for each retransmission until it
            // reaches T2 seconds (T1 and T2 are defined in Section 17).
            // Response retransmissions cease when an ACK request for the
            // response is received.  This is independent of whatever transport
            // protocols are used to send the response.
            // https://tools.ietf.org/html/rfc6026#section-8.1
            let timeout = _timers_js__WEBPACK_IMPORTED_MODULE_25__.Timers.T1;
            const retransmission = () => {
                if (!this.reinviteUserAgentServer) {
                    this.invite2xxTimer = undefined;
                    return;
                }
                this.logger.log("No ACK for 2xx response received, attempting retransmission");
                transaction.retransmitAcceptedResponse();
                timeout = Math.min(timeout * 2, _timers_js__WEBPACK_IMPORTED_MODULE_25__.Timers.T2);
                this.invite2xxTimer = setTimeout(retransmission, timeout);
            };
            this.invite2xxTimer = setTimeout(retransmission, timeout);
            // If the server retransmits the 2xx response for 64*T1 seconds without
            // receiving an ACK, the dialog is confirmed, but the session SHOULD be
            // terminated.  This is accomplished with a BYE, as described in Section 15.
            // https://tools.ietf.org/html/rfc3261#section-13.3.1.4
            const stateChanged = () => {
                if (transaction.state === _transactions_transaction_state_js__WEBPACK_IMPORTED_MODULE_5__.TransactionState.Terminated) {
                    transaction.removeStateChangeListener(stateChanged);
                    if (this.invite2xxTimer) {
                        clearTimeout(this.invite2xxTimer);
                        this.invite2xxTimer = undefined;
                    }
                    if (this.reinviteUserAgentServer) {
                        // FIXME: TODO: What to do here
                    }
                }
            };
            transaction.addStateChangeListener(stateChanged);
        }
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/dialogs/subscription-dialog.js":
/*!*********************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/dialogs/subscription-dialog.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SubscriptionDialog": () => (/* binding */ SubscriptionDialog)
/* harmony export */ });
/* harmony import */ var _grammar_name_addr_header_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../grammar/name-addr-header.js */ "./node_modules/sip.js/lib/grammar/name-addr-header.js");
/* harmony import */ var _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../messages/methods/constants.js */ "./node_modules/sip.js/lib/core/messages/methods/constants.js");
/* harmony import */ var _subscription_subscription_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../subscription/subscription.js */ "./node_modules/sip.js/lib/core/subscription/subscription.js");
/* harmony import */ var _timers_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../timers.js */ "./node_modules/sip.js/lib/core/timers.js");
/* harmony import */ var _user_agent_core_allowed_methods_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../user-agent-core/allowed-methods.js */ "./node_modules/sip.js/lib/core/user-agent-core/allowed-methods.js");
/* harmony import */ var _user_agents_notify_user_agent_server_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../user-agents/notify-user-agent-server.js */ "./node_modules/sip.js/lib/core/user-agents/notify-user-agent-server.js");
/* harmony import */ var _user_agents_re_subscribe_user_agent_client_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../user-agents/re-subscribe-user-agent-client.js */ "./node_modules/sip.js/lib/core/user-agents/re-subscribe-user-agent-client.js");
/* harmony import */ var _dialog_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dialog.js */ "./node_modules/sip.js/lib/core/dialogs/dialog.js");








/**
 * Subscription Dialog.
 * @remarks
 * SIP-Specific Event Notification
 *
 * Abstract
 *
 *    This document describes an extension to the Session Initiation
 *    Protocol (SIP) defined by RFC 3261.  The purpose of this extension is
 *    to provide an extensible framework by which SIP nodes can request
 *    notification from remote nodes indicating that certain events have
 *    occurred.
 *
 *    Note that the event notification mechanisms defined herein are NOT
 *    intended to be a general-purpose infrastructure for all classes of
 *    event subscription and notification.
 *
 *    This document represents a backwards-compatible improvement on the
 *    original mechanism described by RFC 3265, taking into account several
 *    years of implementation experience.  Accordingly, this document
 *    obsoletes RFC 3265.  This document also updates RFC 4660 slightly to
 *    accommodate some small changes to the mechanism that were discussed
 *    in that document.
 *
 *  https://tools.ietf.org/html/rfc6665
 * @public
 */
class SubscriptionDialog extends _dialog_js__WEBPACK_IMPORTED_MODULE_0__.Dialog {
    constructor(subscriptionEvent, subscriptionExpires, subscriptionState, core, state, delegate) {
        super(core, state);
        this.delegate = delegate;
        this._autoRefresh = false;
        this._subscriptionEvent = subscriptionEvent;
        this._subscriptionExpires = subscriptionExpires;
        this._subscriptionExpiresInitial = subscriptionExpires;
        this._subscriptionExpiresLastSet = Math.floor(Date.now() / 1000);
        this._subscriptionRefresh = undefined;
        this._subscriptionRefreshLastSet = undefined;
        this._subscriptionState = subscriptionState;
        this.logger = core.loggerFactory.getLogger("sip.subscribe-dialog");
        this.logger.log(`SUBSCRIBE dialog ${this.id} constructed`);
    }
    /**
     * When a UAC receives a response that establishes a dialog, it
     * constructs the state of the dialog.  This state MUST be maintained
     * for the duration of the dialog.
     * https://tools.ietf.org/html/rfc3261#section-12.1.2
     * @param outgoingRequestMessage - Outgoing request message for dialog.
     * @param incomingResponseMessage - Incoming response message creating dialog.
     */
    static initialDialogStateForSubscription(outgoingSubscribeRequestMessage, incomingNotifyRequestMessage) {
        // If the request was sent over TLS, and the Request-URI contained a
        // SIPS URI, the "secure" flag is set to TRUE.
        // https://tools.ietf.org/html/rfc3261#section-12.1.2
        const secure = false; // FIXME: Currently no support for TLS.
        // The route set MUST be set to the list of URIs in the Record-Route
        // header field from the response, taken in reverse order and preserving
        // all URI parameters.  If no Record-Route header field is present in
        // the response, the route set MUST be set to the empty set.  This route
        // set, even if empty, overrides any pre-existing route set for future
        // requests in this dialog.  The remote target MUST be set to the URI
        // from the Contact header field of the response.
        // https://tools.ietf.org/html/rfc3261#section-12.1.2
        const routeSet = incomingNotifyRequestMessage.getHeaders("record-route");
        const contact = incomingNotifyRequestMessage.parseHeader("contact");
        if (!contact) {
            // TODO: Review to make sure this will never happen
            throw new Error("Contact undefined.");
        }
        if (!(contact instanceof _grammar_name_addr_header_js__WEBPACK_IMPORTED_MODULE_1__.NameAddrHeader)) {
            throw new Error("Contact not instance of NameAddrHeader.");
        }
        const remoteTarget = contact.uri;
        // The local sequence number MUST be set to the value of the sequence
        // number in the CSeq header field of the request.  The remote sequence
        // number MUST be empty (it is established when the remote UA sends a
        // request within the dialog).  The call identifier component of the
        // dialog ID MUST be set to the value of the Call-ID in the request.
        // The local tag component of the dialog ID MUST be set to the tag in
        // the From field in the request, and the remote tag component of the
        // dialog ID MUST be set to the tag in the To field of the response.  A
        // UAC MUST be prepared to receive a response without a tag in the To
        // field, in which case the tag is considered to have a value of null.
        //
        //    This is to maintain backwards compatibility with RFC 2543, which
        //    did not mandate To tags.
        //
        // https://tools.ietf.org/html/rfc3261#section-12.1.2
        const localSequenceNumber = outgoingSubscribeRequestMessage.cseq;
        const remoteSequenceNumber = undefined;
        const callId = outgoingSubscribeRequestMessage.callId;
        const localTag = outgoingSubscribeRequestMessage.fromTag;
        const remoteTag = incomingNotifyRequestMessage.fromTag;
        if (!callId) {
            // TODO: Review to make sure this will never happen
            throw new Error("Call id undefined.");
        }
        if (!localTag) {
            // TODO: Review to make sure this will never happen
            throw new Error("From tag undefined.");
        }
        if (!remoteTag) {
            // TODO: Review to make sure this will never happen
            throw new Error("To tag undefined."); // FIXME: No backwards compatibility with RFC 2543
        }
        // The remote URI MUST be set to the URI in the To field, and the local
        // URI MUST be set to the URI in the From field.
        // https://tools.ietf.org/html/rfc3261#section-12.1.2
        if (!outgoingSubscribeRequestMessage.from) {
            // TODO: Review to make sure this will never happen
            throw new Error("From undefined.");
        }
        if (!outgoingSubscribeRequestMessage.to) {
            // TODO: Review to make sure this will never happen
            throw new Error("To undefined.");
        }
        const localURI = outgoingSubscribeRequestMessage.from.uri;
        const remoteURI = outgoingSubscribeRequestMessage.to.uri;
        // A dialog can also be in the "early" state, which occurs when it is
        // created with a provisional response, and then transition to the
        // "confirmed" state when a 2xx final response arrives.
        // https://tools.ietf.org/html/rfc3261#section-12
        const early = false;
        const dialogState = {
            id: callId + localTag + remoteTag,
            early,
            callId,
            localTag,
            remoteTag,
            localSequenceNumber,
            remoteSequenceNumber,
            localURI,
            remoteURI,
            remoteTarget,
            routeSet,
            secure
        };
        return dialogState;
    }
    dispose() {
        super.dispose();
        if (this.N) {
            clearTimeout(this.N);
            this.N = undefined;
        }
        this.refreshTimerClear();
        this.logger.log(`SUBSCRIBE dialog ${this.id} destroyed`);
    }
    get autoRefresh() {
        return this._autoRefresh;
    }
    set autoRefresh(autoRefresh) {
        this._autoRefresh = true;
        this.refreshTimerSet();
    }
    get subscriptionEvent() {
        return this._subscriptionEvent;
    }
    /** Number of seconds until subscription expires. */
    get subscriptionExpires() {
        const secondsSinceLastSet = Math.floor(Date.now() / 1000) - this._subscriptionExpiresLastSet;
        const secondsUntilExpires = this._subscriptionExpires - secondsSinceLastSet;
        return Math.max(secondsUntilExpires, 0);
    }
    set subscriptionExpires(expires) {
        if (expires < 0) {
            throw new Error("Expires must be greater than or equal to zero.");
        }
        this._subscriptionExpires = expires;
        this._subscriptionExpiresLastSet = Math.floor(Date.now() / 1000);
        if (this.autoRefresh) {
            const refresh = this.subscriptionRefresh;
            if (refresh === undefined || refresh >= expires) {
                this.refreshTimerSet();
            }
        }
    }
    get subscriptionExpiresInitial() {
        return this._subscriptionExpiresInitial;
    }
    /** Number of seconds until subscription auto refresh. */
    get subscriptionRefresh() {
        if (this._subscriptionRefresh === undefined || this._subscriptionRefreshLastSet === undefined) {
            return undefined;
        }
        const secondsSinceLastSet = Math.floor(Date.now() / 1000) - this._subscriptionRefreshLastSet;
        const secondsUntilExpires = this._subscriptionRefresh - secondsSinceLastSet;
        return Math.max(secondsUntilExpires, 0);
    }
    get subscriptionState() {
        return this._subscriptionState;
    }
    /**
     * Receive in dialog request message from transport.
     * @param message -  The incoming request message.
     */
    receiveRequest(message) {
        this.logger.log(`SUBSCRIBE dialog ${this.id} received ${message.method} request`);
        // Request within a dialog out of sequence guard.
        // https://tools.ietf.org/html/rfc3261#section-12.2.2
        if (!this.sequenceGuard(message)) {
            this.logger.log(`SUBSCRIBE dialog ${this.id} rejected out of order ${message.method} request.`);
            return;
        }
        // Request within a dialog common processing.
        // https://tools.ietf.org/html/rfc3261#section-12.2.2
        super.receiveRequest(message);
        // Switch on method and then delegate.
        switch (message.method) {
            case _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_2__.C.NOTIFY:
                this.onNotify(message);
                break;
            default:
                this.logger.log(`SUBSCRIBE dialog ${this.id} received unimplemented ${message.method} request`);
                this.core.replyStateless(message, { statusCode: 501 });
                break;
        }
    }
    /**
     * 4.1.2.2.  Refreshing of Subscriptions
     * https://tools.ietf.org/html/rfc6665#section-4.1.2.2
     */
    refresh() {
        const allowHeader = "Allow: " + _user_agent_core_allowed_methods_js__WEBPACK_IMPORTED_MODULE_3__.AllowedMethods.toString();
        const options = {};
        options.extraHeaders = (options.extraHeaders || []).slice();
        options.extraHeaders.push(allowHeader);
        options.extraHeaders.push("Event: " + this.subscriptionEvent);
        options.extraHeaders.push("Expires: " + this.subscriptionExpiresInitial);
        options.extraHeaders.push("Contact: " + this.core.configuration.contact.toString());
        return this.subscribe(undefined, options);
    }
    /**
     * 4.1.2.2.  Refreshing of Subscriptions
     * https://tools.ietf.org/html/rfc6665#section-4.1.2.2
     * @param delegate - Delegate to handle responses.
     * @param options - Options bucket.
     */
    subscribe(delegate, options = {}) {
        var _a;
        if (this.subscriptionState !== _subscription_subscription_js__WEBPACK_IMPORTED_MODULE_4__.SubscriptionState.Pending && this.subscriptionState !== _subscription_subscription_js__WEBPACK_IMPORTED_MODULE_4__.SubscriptionState.Active) {
            // FIXME: This needs to be a proper exception
            throw new Error(`Invalid state ${this.subscriptionState}. May only re-subscribe while in state "pending" or "active".`);
        }
        this.logger.log(`SUBSCRIBE dialog ${this.id} sending SUBSCRIBE request`);
        const uac = new _user_agents_re_subscribe_user_agent_client_js__WEBPACK_IMPORTED_MODULE_5__.ReSubscribeUserAgentClient(this, delegate, options);
        // Abort any outstanding timer (as it would otherwise become guaranteed to terminate us).
        if (this.N) {
            clearTimeout(this.N);
            this.N = undefined;
        }
        if (!((_a = options.extraHeaders) === null || _a === void 0 ? void 0 : _a.includes("Expires: 0"))) {
            // When refreshing a subscription, a subscriber starts Timer N, set to
            // 64*T1, when it sends the SUBSCRIBE request.
            // https://tools.ietf.org/html/rfc6665#section-4.1.2.2
            this.N = setTimeout(() => this.timerN(), _timers_js__WEBPACK_IMPORTED_MODULE_6__.Timers.TIMER_N);
        }
        return uac;
    }
    /**
     * 4.4.1.  Dialog Creation and Termination
     * A subscription is destroyed after a notifier sends a NOTIFY request
     * with a "Subscription-State" of "terminated", or in certain error
     * situations described elsewhere in this document.
     * https://tools.ietf.org/html/rfc6665#section-4.4.1
     */
    terminate() {
        this.stateTransition(_subscription_subscription_js__WEBPACK_IMPORTED_MODULE_4__.SubscriptionState.Terminated);
        this.onTerminated();
    }
    /**
     * 4.1.2.3.  Unsubscribing
     * https://tools.ietf.org/html/rfc6665#section-4.1.2.3
     */
    unsubscribe() {
        const allowHeader = "Allow: " + _user_agent_core_allowed_methods_js__WEBPACK_IMPORTED_MODULE_3__.AllowedMethods.toString();
        const options = {};
        options.extraHeaders = (options.extraHeaders || []).slice();
        options.extraHeaders.push(allowHeader);
        options.extraHeaders.push("Event: " + this.subscriptionEvent);
        options.extraHeaders.push("Expires: 0");
        options.extraHeaders.push("Contact: " + this.core.configuration.contact.toString());
        return this.subscribe(undefined, options);
    }
    /**
     * Handle in dialog NOTIFY requests.
     * This does not include the first NOTIFY which created the dialog.
     * @param message - The incoming NOTIFY request message.
     */
    onNotify(message) {
        // If, for some reason, the event package designated in the "Event"
        // header field of the NOTIFY request is not supported, the subscriber
        // will respond with a 489 (Bad Event) response.
        // https://tools.ietf.org/html/rfc6665#section-4.1.3
        const event = message.parseHeader("Event").event;
        if (!event || event !== this.subscriptionEvent) {
            this.core.replyStateless(message, { statusCode: 489 });
            return;
        }
        // In the state diagram, "Re-subscription times out" means that an
        // attempt to refresh or update the subscription using a new SUBSCRIBE
        // request does not result in a NOTIFY request before the corresponding
        // Timer N expires.
        // https://tools.ietf.org/html/rfc6665#section-4.1.2
        if (this.N) {
            clearTimeout(this.N);
            this.N = undefined;
        }
        // NOTIFY requests MUST contain "Subscription-State" header fields that
        // indicate the status of the subscription.
        // https://tools.ietf.org/html/rfc6665#section-4.1.3
        const subscriptionState = message.parseHeader("Subscription-State");
        if (!subscriptionState || !subscriptionState.state) {
            this.core.replyStateless(message, { statusCode: 489 });
            return;
        }
        const state = subscriptionState.state;
        const expires = subscriptionState.expires ? Math.max(subscriptionState.expires, 0) : undefined;
        // Update our state and expiration.
        switch (state) {
            case "pending":
                this.stateTransition(_subscription_subscription_js__WEBPACK_IMPORTED_MODULE_4__.SubscriptionState.Pending, expires);
                break;
            case "active":
                this.stateTransition(_subscription_subscription_js__WEBPACK_IMPORTED_MODULE_4__.SubscriptionState.Active, expires);
                break;
            case "terminated":
                this.stateTransition(_subscription_subscription_js__WEBPACK_IMPORTED_MODULE_4__.SubscriptionState.Terminated, expires);
                break;
            default:
                this.logger.warn("Unrecognized subscription state.");
                break;
        }
        // Delegate remainder of NOTIFY handling.
        const uas = new _user_agents_notify_user_agent_server_js__WEBPACK_IMPORTED_MODULE_7__.NotifyUserAgentServer(this, message);
        if (this.delegate && this.delegate.onNotify) {
            this.delegate.onNotify(uas);
        }
        else {
            uas.accept();
        }
    }
    onRefresh(request) {
        if (this.delegate && this.delegate.onRefresh) {
            this.delegate.onRefresh(request);
        }
    }
    onTerminated() {
        if (this.delegate && this.delegate.onTerminated) {
            this.delegate.onTerminated();
        }
    }
    refreshTimerClear() {
        if (this.refreshTimer) {
            clearTimeout(this.refreshTimer);
            this.refreshTimer = undefined;
        }
    }
    refreshTimerSet() {
        this.refreshTimerClear();
        if (this.autoRefresh && this.subscriptionExpires > 0) {
            const refresh = this.subscriptionExpires * 900;
            this._subscriptionRefresh = Math.floor(refresh / 1000);
            this._subscriptionRefreshLastSet = Math.floor(Date.now() / 1000);
            this.refreshTimer = setTimeout(() => {
                this.refreshTimer = undefined;
                this._subscriptionRefresh = undefined;
                this._subscriptionRefreshLastSet = undefined;
                this.onRefresh(this.refresh());
            }, refresh);
        }
    }
    stateTransition(newState, newExpires) {
        // Assert valid state transitions.
        const invalidStateTransition = () => {
            this.logger.warn(`Invalid subscription state transition from ${this.subscriptionState} to ${newState}`);
        };
        switch (newState) {
            case _subscription_subscription_js__WEBPACK_IMPORTED_MODULE_4__.SubscriptionState.Initial:
                invalidStateTransition();
                return;
            case _subscription_subscription_js__WEBPACK_IMPORTED_MODULE_4__.SubscriptionState.NotifyWait:
                invalidStateTransition();
                return;
            case _subscription_subscription_js__WEBPACK_IMPORTED_MODULE_4__.SubscriptionState.Pending:
                if (this.subscriptionState !== _subscription_subscription_js__WEBPACK_IMPORTED_MODULE_4__.SubscriptionState.NotifyWait &&
                    this.subscriptionState !== _subscription_subscription_js__WEBPACK_IMPORTED_MODULE_4__.SubscriptionState.Pending) {
                    invalidStateTransition();
                    return;
                }
                break;
            case _subscription_subscription_js__WEBPACK_IMPORTED_MODULE_4__.SubscriptionState.Active:
                if (this.subscriptionState !== _subscription_subscription_js__WEBPACK_IMPORTED_MODULE_4__.SubscriptionState.NotifyWait &&
                    this.subscriptionState !== _subscription_subscription_js__WEBPACK_IMPORTED_MODULE_4__.SubscriptionState.Pending &&
                    this.subscriptionState !== _subscription_subscription_js__WEBPACK_IMPORTED_MODULE_4__.SubscriptionState.Active) {
                    invalidStateTransition();
                    return;
                }
                break;
            case _subscription_subscription_js__WEBPACK_IMPORTED_MODULE_4__.SubscriptionState.Terminated:
                if (this.subscriptionState !== _subscription_subscription_js__WEBPACK_IMPORTED_MODULE_4__.SubscriptionState.NotifyWait &&
                    this.subscriptionState !== _subscription_subscription_js__WEBPACK_IMPORTED_MODULE_4__.SubscriptionState.Pending &&
                    this.subscriptionState !== _subscription_subscription_js__WEBPACK_IMPORTED_MODULE_4__.SubscriptionState.Active) {
                    invalidStateTransition();
                    return;
                }
                break;
            default:
                invalidStateTransition();
                return;
        }
        // If the "Subscription-State" value is "pending", the subscription has
        // been received by the notifier, but there is insufficient policy
        // information to grant or deny the subscription yet.  If the header
        // field also contains an "expires" parameter, the subscriber SHOULD
        // take it as the authoritative subscription duration and adjust
        // accordingly.  No further action is necessary on the part of the
        // subscriber.  The "retry-after" and "reason" parameters have no
        // semantics for "pending".
        // https://tools.ietf.org/html/rfc6665#section-4.1.3
        if (newState === _subscription_subscription_js__WEBPACK_IMPORTED_MODULE_4__.SubscriptionState.Pending) {
            if (newExpires) {
                this.subscriptionExpires = newExpires;
            }
        }
        // If the "Subscription-State" header field value is "active", it means
        // that the subscription has been accepted and (in general) has been
        // authorized.  If the header field also contains an "expires"
        // parameter, the subscriber SHOULD take it as the authoritative
        // subscription duration and adjust accordingly.  The "retry-after" and
        // "reason" parameters have no semantics for "active".
        // https://tools.ietf.org/html/rfc6665#section-4.1.3
        if (newState === _subscription_subscription_js__WEBPACK_IMPORTED_MODULE_4__.SubscriptionState.Active) {
            if (newExpires) {
                this.subscriptionExpires = newExpires;
            }
        }
        // If the "Subscription-State" value is "terminated", the subscriber
        // MUST consider the subscription terminated.  The "expires" parameter
        // has no semantics for "terminated" -- notifiers SHOULD NOT include an
        // "expires" parameter on a "Subscription-State" header field with a
        // value of "terminated", and subscribers MUST ignore any such
        // parameter, if present.
        if (newState === _subscription_subscription_js__WEBPACK_IMPORTED_MODULE_4__.SubscriptionState.Terminated) {
            this.dispose();
        }
        this._subscriptionState = newState;
    }
    /**
     * When refreshing a subscription, a subscriber starts Timer N, set to
     * 64*T1, when it sends the SUBSCRIBE request.  If this Timer N expires
     * prior to the receipt of a NOTIFY request, the subscriber considers
     * the subscription terminated.  If the subscriber receives a success
     * response to the SUBSCRIBE request that indicates that no NOTIFY
     * request will be generated -- such as the 204 response defined for use
     * with the optional extension described in [RFC5839] -- then it MUST
     * cancel Timer N.
     * https://tools.ietf.org/html/rfc6665#section-4.1.2.2
     */
    timerN() {
        this.logger.warn(`Timer N expired for SUBSCRIBE dialog. Timed out waiting for NOTIFY.`);
        if (this.subscriptionState !== _subscription_subscription_js__WEBPACK_IMPORTED_MODULE_4__.SubscriptionState.Terminated) {
            this.stateTransition(_subscription_subscription_js__WEBPACK_IMPORTED_MODULE_4__.SubscriptionState.Terminated);
            this.onTerminated();
        }
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/exceptions/exception.js":
/*!**************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/exceptions/exception.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Exception": () => (/* binding */ Exception)
/* harmony export */ });
/**
 * An Exception is considered a condition that a reasonable application may wish to catch.
 * An Error indicates serious problems that a reasonable application should not try to catch.
 * @public
 */
class Exception extends Error {
    constructor(message) {
        super(message); // 'Error' breaks prototype chain here
        Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/exceptions/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/sip.js/lib/core/exceptions/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Exception": () => (/* reexport safe */ _exception_js__WEBPACK_IMPORTED_MODULE_0__.Exception),
/* harmony export */   "TransactionStateError": () => (/* reexport safe */ _transaction_state_error_js__WEBPACK_IMPORTED_MODULE_1__.TransactionStateError),
/* harmony export */   "TransportError": () => (/* reexport safe */ _transport_error_js__WEBPACK_IMPORTED_MODULE_2__.TransportError)
/* harmony export */ });
/* harmony import */ var _exception_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./exception.js */ "./node_modules/sip.js/lib/core/exceptions/exception.js");
/* harmony import */ var _transaction_state_error_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transaction-state-error.js */ "./node_modules/sip.js/lib/core/exceptions/transaction-state-error.js");
/* harmony import */ var _transport_error_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transport-error.js */ "./node_modules/sip.js/lib/core/exceptions/transport-error.js");





/***/ }),

/***/ "./node_modules/sip.js/lib/core/exceptions/transaction-state-error.js":
/*!****************************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/exceptions/transaction-state-error.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TransactionStateError": () => (/* binding */ TransactionStateError)
/* harmony export */ });
/* harmony import */ var _exception_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./exception.js */ "./node_modules/sip.js/lib/core/exceptions/exception.js");

/**
 * Indicates that the operation could not be completed given the current transaction state.
 * @public
 */
class TransactionStateError extends _exception_js__WEBPACK_IMPORTED_MODULE_0__.Exception {
    constructor(message) {
        super(message ? message : "Transaction state error.");
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/exceptions/transport-error.js":
/*!********************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/exceptions/transport-error.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TransportError": () => (/* binding */ TransportError)
/* harmony export */ });
/* harmony import */ var _exception_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./exception.js */ "./node_modules/sip.js/lib/core/exceptions/exception.js");

/**
 * Transport error.
 * @public
 */
class TransportError extends _exception_js__WEBPACK_IMPORTED_MODULE_0__.Exception {
    constructor(message) {
        super(message ? message : "Unspecified transport error.");
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/index.js":
/*!***********************************************!*\
  !*** ./node_modules/sip.js/lib/core/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ByeUserAgentClient": () => (/* reexport safe */ _user_agents_index_js__WEBPACK_IMPORTED_MODULE_8__.ByeUserAgentClient),
/* harmony export */   "ByeUserAgentServer": () => (/* reexport safe */ _user_agents_index_js__WEBPACK_IMPORTED_MODULE_8__.ByeUserAgentServer),
/* harmony export */   "C": () => (/* reexport safe */ _messages_index_js__WEBPACK_IMPORTED_MODULE_3__.C),
/* harmony export */   "CancelUserAgentClient": () => (/* reexport safe */ _user_agents_index_js__WEBPACK_IMPORTED_MODULE_8__.CancelUserAgentClient),
/* harmony export */   "ClientTransaction": () => (/* reexport safe */ _transactions_index_js__WEBPACK_IMPORTED_MODULE_6__.ClientTransaction),
/* harmony export */   "Dialog": () => (/* reexport safe */ _dialogs_index_js__WEBPACK_IMPORTED_MODULE_0__.Dialog),
/* harmony export */   "DigestAuthentication": () => (/* reexport safe */ _messages_index_js__WEBPACK_IMPORTED_MODULE_3__.DigestAuthentication),
/* harmony export */   "Exception": () => (/* reexport safe */ _exceptions_index_js__WEBPACK_IMPORTED_MODULE_1__.Exception),
/* harmony export */   "Grammar": () => (/* reexport safe */ _grammar_index_js__WEBPACK_IMPORTED_MODULE_10__.Grammar),
/* harmony export */   "IncomingMessage": () => (/* reexport safe */ _messages_index_js__WEBPACK_IMPORTED_MODULE_3__.IncomingMessage),
/* harmony export */   "IncomingRequestMessage": () => (/* reexport safe */ _messages_index_js__WEBPACK_IMPORTED_MODULE_3__.IncomingRequestMessage),
/* harmony export */   "IncomingResponseMessage": () => (/* reexport safe */ _messages_index_js__WEBPACK_IMPORTED_MODULE_3__.IncomingResponseMessage),
/* harmony export */   "InfoUserAgentClient": () => (/* reexport safe */ _user_agents_index_js__WEBPACK_IMPORTED_MODULE_8__.InfoUserAgentClient),
/* harmony export */   "InfoUserAgentServer": () => (/* reexport safe */ _user_agents_index_js__WEBPACK_IMPORTED_MODULE_8__.InfoUserAgentServer),
/* harmony export */   "InviteClientTransaction": () => (/* reexport safe */ _transactions_index_js__WEBPACK_IMPORTED_MODULE_6__.InviteClientTransaction),
/* harmony export */   "InviteServerTransaction": () => (/* reexport safe */ _transactions_index_js__WEBPACK_IMPORTED_MODULE_6__.InviteServerTransaction),
/* harmony export */   "InviteUserAgentClient": () => (/* reexport safe */ _user_agents_index_js__WEBPACK_IMPORTED_MODULE_8__.InviteUserAgentClient),
/* harmony export */   "InviteUserAgentServer": () => (/* reexport safe */ _user_agents_index_js__WEBPACK_IMPORTED_MODULE_8__.InviteUserAgentServer),
/* harmony export */   "Levels": () => (/* reexport safe */ _log_index_js__WEBPACK_IMPORTED_MODULE_2__.Levels),
/* harmony export */   "Logger": () => (/* reexport safe */ _log_index_js__WEBPACK_IMPORTED_MODULE_2__.Logger),
/* harmony export */   "LoggerFactory": () => (/* reexport safe */ _log_index_js__WEBPACK_IMPORTED_MODULE_2__.LoggerFactory),
/* harmony export */   "MessageUserAgentClient": () => (/* reexport safe */ _user_agents_index_js__WEBPACK_IMPORTED_MODULE_8__.MessageUserAgentClient),
/* harmony export */   "MessageUserAgentServer": () => (/* reexport safe */ _user_agents_index_js__WEBPACK_IMPORTED_MODULE_8__.MessageUserAgentServer),
/* harmony export */   "NameAddrHeader": () => (/* reexport safe */ _grammar_index_js__WEBPACK_IMPORTED_MODULE_10__.NameAddrHeader),
/* harmony export */   "NonInviteClientTransaction": () => (/* reexport safe */ _transactions_index_js__WEBPACK_IMPORTED_MODULE_6__.NonInviteClientTransaction),
/* harmony export */   "NonInviteServerTransaction": () => (/* reexport safe */ _transactions_index_js__WEBPACK_IMPORTED_MODULE_6__.NonInviteServerTransaction),
/* harmony export */   "NotifyUserAgentClient": () => (/* reexport safe */ _user_agents_index_js__WEBPACK_IMPORTED_MODULE_8__.NotifyUserAgentClient),
/* harmony export */   "NotifyUserAgentServer": () => (/* reexport safe */ _user_agents_index_js__WEBPACK_IMPORTED_MODULE_8__.NotifyUserAgentServer),
/* harmony export */   "OutgoingRequestMessage": () => (/* reexport safe */ _messages_index_js__WEBPACK_IMPORTED_MODULE_3__.OutgoingRequestMessage),
/* harmony export */   "Parameters": () => (/* reexport safe */ _grammar_index_js__WEBPACK_IMPORTED_MODULE_10__.Parameters),
/* harmony export */   "Parser": () => (/* reexport safe */ _messages_index_js__WEBPACK_IMPORTED_MODULE_3__.Parser),
/* harmony export */   "PrackUserAgentClient": () => (/* reexport safe */ _user_agents_index_js__WEBPACK_IMPORTED_MODULE_8__.PrackUserAgentClient),
/* harmony export */   "PrackUserAgentServer": () => (/* reexport safe */ _user_agents_index_js__WEBPACK_IMPORTED_MODULE_8__.PrackUserAgentServer),
/* harmony export */   "PublishUserAgentClient": () => (/* reexport safe */ _user_agents_index_js__WEBPACK_IMPORTED_MODULE_8__.PublishUserAgentClient),
/* harmony export */   "ReInviteUserAgentClient": () => (/* reexport safe */ _user_agents_index_js__WEBPACK_IMPORTED_MODULE_8__.ReInviteUserAgentClient),
/* harmony export */   "ReInviteUserAgentServer": () => (/* reexport safe */ _user_agents_index_js__WEBPACK_IMPORTED_MODULE_8__.ReInviteUserAgentServer),
/* harmony export */   "ReSubscribeUserAgentClient": () => (/* reexport safe */ _user_agents_index_js__WEBPACK_IMPORTED_MODULE_8__.ReSubscribeUserAgentClient),
/* harmony export */   "ReSubscribeUserAgentServer": () => (/* reexport safe */ _user_agents_index_js__WEBPACK_IMPORTED_MODULE_8__.ReSubscribeUserAgentServer),
/* harmony export */   "ReferUserAgentClient": () => (/* reexport safe */ _user_agents_index_js__WEBPACK_IMPORTED_MODULE_8__.ReferUserAgentClient),
/* harmony export */   "ReferUserAgentServer": () => (/* reexport safe */ _user_agents_index_js__WEBPACK_IMPORTED_MODULE_8__.ReferUserAgentServer),
/* harmony export */   "RegisterUserAgentClient": () => (/* reexport safe */ _user_agents_index_js__WEBPACK_IMPORTED_MODULE_8__.RegisterUserAgentClient),
/* harmony export */   "RegisterUserAgentServer": () => (/* reexport safe */ _user_agents_index_js__WEBPACK_IMPORTED_MODULE_8__.RegisterUserAgentServer),
/* harmony export */   "ServerTransaction": () => (/* reexport safe */ _transactions_index_js__WEBPACK_IMPORTED_MODULE_6__.ServerTransaction),
/* harmony export */   "SessionDialog": () => (/* reexport safe */ _dialogs_index_js__WEBPACK_IMPORTED_MODULE_0__.SessionDialog),
/* harmony export */   "SessionState": () => (/* reexport safe */ _session_index_js__WEBPACK_IMPORTED_MODULE_4__.SessionState),
/* harmony export */   "SignalingState": () => (/* reexport safe */ _session_index_js__WEBPACK_IMPORTED_MODULE_4__.SignalingState),
/* harmony export */   "SubscribeUserAgentClient": () => (/* reexport safe */ _user_agents_index_js__WEBPACK_IMPORTED_MODULE_8__.SubscribeUserAgentClient),
/* harmony export */   "SubscribeUserAgentServer": () => (/* reexport safe */ _user_agents_index_js__WEBPACK_IMPORTED_MODULE_8__.SubscribeUserAgentServer),
/* harmony export */   "SubscriptionDialog": () => (/* reexport safe */ _dialogs_index_js__WEBPACK_IMPORTED_MODULE_0__.SubscriptionDialog),
/* harmony export */   "SubscriptionState": () => (/* reexport safe */ _subscription_index_js__WEBPACK_IMPORTED_MODULE_5__.SubscriptionState),
/* harmony export */   "Timers": () => (/* reexport safe */ _timers_js__WEBPACK_IMPORTED_MODULE_9__.Timers),
/* harmony export */   "Transaction": () => (/* reexport safe */ _transactions_index_js__WEBPACK_IMPORTED_MODULE_6__.Transaction),
/* harmony export */   "TransactionState": () => (/* reexport safe */ _transactions_index_js__WEBPACK_IMPORTED_MODULE_6__.TransactionState),
/* harmony export */   "TransactionStateError": () => (/* reexport safe */ _exceptions_index_js__WEBPACK_IMPORTED_MODULE_1__.TransactionStateError),
/* harmony export */   "TransportError": () => (/* reexport safe */ _exceptions_index_js__WEBPACK_IMPORTED_MODULE_1__.TransportError),
/* harmony export */   "URI": () => (/* reexport safe */ _grammar_index_js__WEBPACK_IMPORTED_MODULE_10__.URI),
/* harmony export */   "UserAgentClient": () => (/* reexport safe */ _user_agents_index_js__WEBPACK_IMPORTED_MODULE_8__.UserAgentClient),
/* harmony export */   "UserAgentCore": () => (/* reexport safe */ _user_agent_core_index_js__WEBPACK_IMPORTED_MODULE_7__.UserAgentCore),
/* harmony export */   "UserAgentServer": () => (/* reexport safe */ _user_agents_index_js__WEBPACK_IMPORTED_MODULE_8__.UserAgentServer),
/* harmony export */   "constructOutgoingResponse": () => (/* reexport safe */ _messages_index_js__WEBPACK_IMPORTED_MODULE_3__.constructOutgoingResponse),
/* harmony export */   "equivalentURI": () => (/* reexport safe */ _grammar_index_js__WEBPACK_IMPORTED_MODULE_10__.equivalentURI),
/* harmony export */   "fromBodyLegacy": () => (/* reexport safe */ _messages_index_js__WEBPACK_IMPORTED_MODULE_3__.fromBodyLegacy),
/* harmony export */   "getBody": () => (/* reexport safe */ _messages_index_js__WEBPACK_IMPORTED_MODULE_3__.getBody),
/* harmony export */   "isBody": () => (/* reexport safe */ _messages_index_js__WEBPACK_IMPORTED_MODULE_3__.isBody)
/* harmony export */ });
/* harmony import */ var _dialogs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dialogs/index.js */ "./node_modules/sip.js/lib/core/dialogs/index.js");
/* harmony import */ var _exceptions_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./exceptions/index.js */ "./node_modules/sip.js/lib/core/exceptions/index.js");
/* harmony import */ var _log_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./log/index.js */ "./node_modules/sip.js/lib/core/log/index.js");
/* harmony import */ var _messages_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./messages/index.js */ "./node_modules/sip.js/lib/core/messages/index.js");
/* harmony import */ var _session_index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./session/index.js */ "./node_modules/sip.js/lib/core/session/index.js");
/* harmony import */ var _subscription_index_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./subscription/index.js */ "./node_modules/sip.js/lib/core/subscription/index.js");
/* harmony import */ var _transactions_index_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./transactions/index.js */ "./node_modules/sip.js/lib/core/transactions/index.js");
/* harmony import */ var _user_agent_core_index_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./user-agent-core/index.js */ "./node_modules/sip.js/lib/core/user-agent-core/index.js");
/* harmony import */ var _user_agents_index_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./user-agents/index.js */ "./node_modules/sip.js/lib/core/user-agents/index.js");
/* harmony import */ var _timers_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./timers.js */ "./node_modules/sip.js/lib/core/timers.js");
/* harmony import */ var _grammar_index_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../grammar/index.js */ "./node_modules/sip.js/lib/grammar/index.js");
/**
 * A core library implementing low level SIP protocol elements.
 * @packageDocumentation
 */
// Directories









// Files


// Grammar
// TODO:
// - This is documented as part of the core, but it is also exported by root index.js.
// - Arguably move grammar to core proper and deprecate the export from the root.
// - Arguably URI should be a top level export.



/***/ }),

/***/ "./node_modules/sip.js/lib/core/log/index.js":
/*!***************************************************!*\
  !*** ./node_modules/sip.js/lib/core/log/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Levels": () => (/* reexport safe */ _levels_js__WEBPACK_IMPORTED_MODULE_0__.Levels),
/* harmony export */   "Logger": () => (/* reexport safe */ _logger_js__WEBPACK_IMPORTED_MODULE_2__.Logger),
/* harmony export */   "LoggerFactory": () => (/* reexport safe */ _logger_factory_js__WEBPACK_IMPORTED_MODULE_1__.LoggerFactory)
/* harmony export */ });
/* harmony import */ var _levels_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./levels.js */ "./node_modules/sip.js/lib/core/log/levels.js");
/* harmony import */ var _logger_factory_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logger-factory.js */ "./node_modules/sip.js/lib/core/log/logger-factory.js");
/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./logger.js */ "./node_modules/sip.js/lib/core/log/logger.js");





/***/ }),

/***/ "./node_modules/sip.js/lib/core/log/levels.js":
/*!****************************************************!*\
  !*** ./node_modules/sip.js/lib/core/log/levels.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Levels": () => (/* binding */ Levels)
/* harmony export */ });
/**
 * Log levels.
 * @public
 */
var Levels;
(function (Levels) {
    Levels[Levels["error"] = 0] = "error";
    Levels[Levels["warn"] = 1] = "warn";
    Levels[Levels["log"] = 2] = "log";
    Levels[Levels["debug"] = 3] = "debug";
})(Levels = Levels || (Levels = {}));


/***/ }),

/***/ "./node_modules/sip.js/lib/core/log/logger-factory.js":
/*!************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/log/logger-factory.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "LoggerFactory": () => (/* binding */ LoggerFactory)
/* harmony export */ });
/* harmony import */ var _levels_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./levels.js */ "./node_modules/sip.js/lib/core/log/levels.js");
/* harmony import */ var _logger_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./logger.js */ "./node_modules/sip.js/lib/core/log/logger.js");


/**
 * Logger.
 * @public
 */
class LoggerFactory {
    constructor() {
        this.builtinEnabled = true;
        this._level = _levels_js__WEBPACK_IMPORTED_MODULE_0__.Levels.log;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.loggers = {};
        this.logger = this.getLogger("sip:loggerfactory");
    }
    get level() {
        return this._level;
    }
    set level(newLevel) {
        if (newLevel >= 0 && newLevel <= 3) {
            this._level = newLevel;
        }
        else if (newLevel > 3) {
            this._level = 3;
            // eslint-disable-next-line no-prototype-builtins
        }
        else if (_levels_js__WEBPACK_IMPORTED_MODULE_0__.Levels.hasOwnProperty(newLevel)) {
            this._level = newLevel;
        }
        else {
            this.logger.error("invalid 'level' parameter value: " + JSON.stringify(newLevel));
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get connector() {
        return this._connector;
    }
    set connector(value) {
        if (!value) {
            this._connector = undefined;
        }
        else if (typeof value === "function") {
            this._connector = value;
        }
        else {
            this.logger.error("invalid 'connector' parameter value: " + JSON.stringify(value));
        }
    }
    getLogger(category, label) {
        if (label && this.level === 3) {
            return new _logger_js__WEBPACK_IMPORTED_MODULE_1__.Logger(this, category, label);
        }
        else if (this.loggers[category]) {
            return this.loggers[category];
        }
        else {
            const logger = new _logger_js__WEBPACK_IMPORTED_MODULE_1__.Logger(this, category);
            this.loggers[category] = logger;
            return logger;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    genericLog(levelToLog, category, label, content) {
        if (this.level >= levelToLog) {
            if (this.builtinEnabled) {
                this.print(levelToLog, category, label, content);
            }
        }
        if (this.connector) {
            this.connector(_levels_js__WEBPACK_IMPORTED_MODULE_0__.Levels[levelToLog], category, label, content);
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    print(levelToLog, category, label, content) {
        if (typeof content === "string") {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const prefix = [new Date(), category];
            if (label) {
                prefix.push(label);
            }
            content = prefix.concat(content).join(" | ");
        }
        switch (levelToLog) {
            case _levels_js__WEBPACK_IMPORTED_MODULE_0__.Levels.error:
                // eslint-disable-next-line no-console
                console.error(content);
                break;
            case _levels_js__WEBPACK_IMPORTED_MODULE_0__.Levels.warn:
                // eslint-disable-next-line no-console
                console.warn(content);
                break;
            case _levels_js__WEBPACK_IMPORTED_MODULE_0__.Levels.log:
                // eslint-disable-next-line no-console
                console.log(content);
                break;
            case _levels_js__WEBPACK_IMPORTED_MODULE_0__.Levels.debug:
                // eslint-disable-next-line no-console
                console.debug(content);
                break;
            default:
                break;
        }
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/log/logger.js":
/*!****************************************************!*\
  !*** ./node_modules/sip.js/lib/core/log/logger.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Logger": () => (/* binding */ Logger)
/* harmony export */ });
/* harmony import */ var _levels_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./levels.js */ "./node_modules/sip.js/lib/core/log/levels.js");

/**
 * Logger.
 * @public
 */
class Logger {
    constructor(logger, category, label) {
        this.logger = logger;
        this.category = category;
        this.label = label;
    }
    error(content) {
        this.genericLog(_levels_js__WEBPACK_IMPORTED_MODULE_0__.Levels.error, content);
    }
    warn(content) {
        this.genericLog(_levels_js__WEBPACK_IMPORTED_MODULE_0__.Levels.warn, content);
    }
    log(content) {
        this.genericLog(_levels_js__WEBPACK_IMPORTED_MODULE_0__.Levels.log, content);
    }
    debug(content) {
        this.genericLog(_levels_js__WEBPACK_IMPORTED_MODULE_0__.Levels.debug, content);
    }
    genericLog(level, content) {
        this.logger.genericLog(level, this.category, this.label, content);
    }
    get level() {
        return this.logger.level;
    }
    set level(newLevel) {
        this.logger.level = newLevel;
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/messages/body.js":
/*!*******************************************************!*\
  !*** ./node_modules/sip.js/lib/core/messages/body.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fromBodyLegacy": () => (/* binding */ fromBodyLegacy),
/* harmony export */   "getBody": () => (/* binding */ getBody),
/* harmony export */   "isBody": () => (/* binding */ isBody)
/* harmony export */ });
/* harmony import */ var _incoming_request_message_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./incoming-request-message.js */ "./node_modules/sip.js/lib/core/messages/incoming-request-message.js");
/* harmony import */ var _incoming_response_message_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./incoming-response-message.js */ "./node_modules/sip.js/lib/core/messages/incoming-response-message.js");
/* harmony import */ var _outgoing_request_message_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./outgoing-request-message.js */ "./node_modules/sip.js/lib/core/messages/outgoing-request-message.js");



// If the Content-Disposition header field is missing, bodies of
// Content-Type application/sdp imply the disposition "session", while
// other content types imply "render".
// https://tools.ietf.org/html/rfc3261#section-13.2.1
function contentTypeToContentDisposition(contentType) {
    if (contentType === "application/sdp") {
        return "session";
    }
    else {
        return "render";
    }
}
/**
 * Create a Body given a legacy body type.
 * @param bodyLegacy - Body Object
 * @internal
 */
function fromBodyLegacy(bodyLegacy) {
    const content = typeof bodyLegacy === "string" ? bodyLegacy : bodyLegacy.body;
    const contentType = typeof bodyLegacy === "string" ? "application/sdp" : bodyLegacy.contentType;
    const contentDisposition = contentTypeToContentDisposition(contentType);
    const body = { contentDisposition, contentType, content };
    return body;
}
/**
 * User-Defined Type Guard for Body.
 * @param body - Body to check.
 * @internal
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isBody(body) {
    return body &&
        typeof body.content === "string" &&
        typeof body.contentType === "string" &&
        body.contentDisposition === undefined
        ? true
        : typeof body.contentDisposition === "string";
}
/**
 * Given a message, get a normalized body.
 * The content disposition is inferred if not set.
 * @param message - The message.
 * @internal
 */
function getBody(message) {
    let contentDisposition;
    let contentType;
    let content;
    // We're in UAS role, receiving incoming request
    if (message instanceof _incoming_request_message_js__WEBPACK_IMPORTED_MODULE_0__.IncomingRequestMessage) {
        if (message.body) {
            // FIXME: Parsing needs typing
            const parse = message.parseHeader("Content-Disposition");
            contentDisposition = parse ? parse.type : undefined;
            contentType = message.parseHeader("Content-Type");
            content = message.body;
        }
    }
    // We're in UAC role, receiving incoming response
    if (message instanceof _incoming_response_message_js__WEBPACK_IMPORTED_MODULE_1__.IncomingResponseMessage) {
        if (message.body) {
            // FIXME: Parsing needs typing
            const parse = message.parseHeader("Content-Disposition");
            contentDisposition = parse ? parse.type : undefined;
            contentType = message.parseHeader("Content-Type");
            content = message.body;
        }
    }
    // We're in UAC role, sending outgoing request
    if (message instanceof _outgoing_request_message_js__WEBPACK_IMPORTED_MODULE_2__.OutgoingRequestMessage) {
        if (message.body) {
            contentDisposition = message.getHeader("Content-Disposition");
            contentType = message.getHeader("Content-Type");
            if (typeof message.body === "string") {
                // FIXME: OutgoingRequest should not allow a "string" body without a "Content-Type" header.
                if (!contentType) {
                    throw new Error("Header content type header does not equal body content type.");
                }
                content = message.body;
            }
            else {
                // FIXME: OutgoingRequest should not allow the "Content-Type" header not to match th body content type
                if (contentType && contentType !== message.body.contentType) {
                    throw new Error("Header content type header does not equal body content type.");
                }
                contentType = message.body.contentType;
                content = message.body.body;
            }
        }
    }
    // We're in UAS role, sending outgoing response
    if (isBody(message)) {
        contentDisposition = message.contentDisposition;
        contentType = message.contentType;
        content = message.content;
    }
    // No content, no body.
    if (!content) {
        return undefined;
    }
    if (contentType && !contentDisposition) {
        contentDisposition = contentTypeToContentDisposition(contentType);
    }
    if (!contentDisposition) {
        throw new Error("Content disposition undefined.");
    }
    if (!contentType) {
        throw new Error("Content type undefined.");
    }
    return {
        contentDisposition,
        contentType,
        content
    };
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/messages/digest-authentication.js":
/*!************************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/messages/digest-authentication.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DigestAuthentication": () => (/* binding */ DigestAuthentication)
/* harmony export */ });
/* harmony import */ var _md5_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./md5.js */ "./node_modules/sip.js/lib/core/messages/md5.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./node_modules/sip.js/lib/core/messages/utils.js");


function MD5(s) {
    return _md5_js__WEBPACK_IMPORTED_MODULE_0__.Md5.hashStr(s);
}
/**
 * Digest Authentication.
 * @internal
 */
class DigestAuthentication {
    /**
     * Constructor.
     * @param loggerFactory - LoggerFactory.
     * @param username - Username.
     * @param password - Password.
     */
    constructor(loggerFactory, ha1, username, password) {
        this.logger = loggerFactory.getLogger("sipjs.digestauthentication");
        this.username = username;
        this.password = password;
        this.ha1 = ha1;
        this.nc = 0;
        this.ncHex = "00000000";
    }
    /**
     * Performs Digest authentication given a SIP request and the challenge
     * received in a response to that request.
     * @param request -
     * @param challenge -
     * @returns true if credentials were successfully generated, false otherwise.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    authenticate(request, challenge, body) {
        // Inspect and validate the challenge.
        this.algorithm = challenge.algorithm;
        this.realm = challenge.realm;
        this.nonce = challenge.nonce;
        this.opaque = challenge.opaque;
        this.stale = challenge.stale;
        if (this.algorithm) {
            if (this.algorithm !== "MD5") {
                this.logger.warn("challenge with Digest algorithm different than 'MD5', authentication aborted");
                return false;
            }
        }
        else {
            this.algorithm = "MD5";
        }
        if (!this.realm) {
            this.logger.warn("challenge without Digest realm, authentication aborted");
            return false;
        }
        if (!this.nonce) {
            this.logger.warn("challenge without Digest nonce, authentication aborted");
            return false;
        }
        // 'qop' can contain a list of values (Array). Let's choose just one.
        if (challenge.qop) {
            if (challenge.qop.indexOf("auth") > -1) {
                this.qop = "auth";
            }
            else if (challenge.qop.indexOf("auth-int") > -1) {
                this.qop = "auth-int";
            }
            else {
                // Otherwise 'qop' is present but does not contain 'auth' or 'auth-int', so abort here.
                this.logger.warn("challenge without Digest qop different than 'auth' or 'auth-int', authentication aborted");
                return false;
            }
        }
        else {
            this.qop = undefined;
        }
        // Fill other attributes.
        this.method = request.method;
        this.uri = request.ruri;
        this.cnonce = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.createRandomToken)(12);
        this.nc += 1;
        this.updateNcHex();
        // nc-value = 8LHEX. Max value = 'FFFFFFFF'.
        if (this.nc === 4294967296) {
            this.nc = 1;
            this.ncHex = "00000001";
        }
        // Calculate the Digest "response" value.
        this.calculateResponse(body);
        return true;
    }
    /**
     * Return the Proxy-Authorization or WWW-Authorization header value.
     */
    toString() {
        const authParams = [];
        if (!this.response) {
            throw new Error("response field does not exist, cannot generate Authorization header");
        }
        authParams.push("algorithm=" + this.algorithm);
        authParams.push('username="' + this.username + '"');
        authParams.push('realm="' + this.realm + '"');
        authParams.push('nonce="' + this.nonce + '"');
        authParams.push('uri="' + this.uri + '"');
        authParams.push('response="' + this.response + '"');
        if (this.opaque) {
            authParams.push('opaque="' + this.opaque + '"');
        }
        if (this.qop) {
            authParams.push("qop=" + this.qop);
            authParams.push('cnonce="' + this.cnonce + '"');
            authParams.push("nc=" + this.ncHex);
        }
        return "Digest " + authParams.join(", ");
    }
    /**
     * Generate the 'nc' value as required by Digest in this.ncHex by reading this.nc.
     */
    updateNcHex() {
        const hex = Number(this.nc).toString(16);
        this.ncHex = "00000000".substr(0, 8 - hex.length) + hex;
    }
    /**
     * Generate Digest 'response' value.
     */
    calculateResponse(body) {
        let ha1, ha2;
        // HA1 = MD5(A1) = MD5(username:realm:password)
        ha1 = this.ha1;
        if (ha1 === "" || ha1 === undefined) {
            ha1 = MD5(this.username + ":" + this.realm + ":" + this.password);
        }
        if (this.qop === "auth") {
            // HA2 = MD5(A2) = MD5(method:digestURI)
            ha2 = MD5(this.method + ":" + this.uri);
            // response = MD5(HA1:nonce:nonceCount:credentialsNonce:qop:HA2)`
            this.response = MD5(ha1 + ":" + this.nonce + ":" + this.ncHex + ":" + this.cnonce + ":auth:" + ha2);
        }
        else if (this.qop === "auth-int") {
            // HA2 = MD5(A2) = MD5(method:digestURI:MD5(entityBody))
            ha2 = MD5(this.method + ":" + this.uri + ":" + MD5(body ? body : ""));
            // response = MD5(HA1:nonce:nonceCount:credentialsNonce:qop:HA2)
            this.response = MD5(ha1 + ":" + this.nonce + ":" + this.ncHex + ":" + this.cnonce + ":auth-int:" + ha2);
        }
        else if (this.qop === undefined) {
            // HA2 = MD5(A2) = MD5(method:digestURI)
            ha2 = MD5(this.method + ":" + this.uri);
            // response = MD5(HA1:nonce:HA2)
            this.response = MD5(ha1 + ":" + this.nonce + ":" + ha2);
        }
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/messages/incoming-message.js":
/*!*******************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/messages/incoming-message.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IncomingMessage": () => (/* binding */ IncomingMessage)
/* harmony export */ });
/* harmony import */ var _grammar_grammar_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../grammar/grammar.js */ "./node_modules/sip.js/lib/grammar/grammar.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/sip.js/lib/core/messages/utils.js");


/**
 * Incoming message.
 * @public
 */
class IncomingMessage {
    constructor() {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.headers = {};
    }
    /**
     * Insert a header of the given name and value into the last position of the
     * header array.
     * @param name - header name
     * @param value - header value
     */
    addHeader(name, value) {
        const header = { raw: value };
        name = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.headerize)(name);
        if (this.headers[name]) {
            this.headers[name].push(header);
        }
        else {
            this.headers[name] = [header];
        }
    }
    /**
     * Get the value of the given header name at the given position.
     * @param name - header name
     * @returns Returns the specified header, undefined if header doesn't exist.
     */
    getHeader(name) {
        const header = this.headers[(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.headerize)(name)];
        if (header) {
            if (header[0]) {
                return header[0].raw;
            }
        }
        else {
            return;
        }
    }
    /**
     * Get the header/s of the given name.
     * @param name - header name
     * @returns Array - with all the headers of the specified name.
     */
    getHeaders(name) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const header = this.headers[(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.headerize)(name)];
        const result = [];
        if (!header) {
            return [];
        }
        for (const headerPart of header) {
            result.push(headerPart.raw);
        }
        return result;
    }
    /**
     * Verify the existence of the given header.
     * @param name - header name
     * @returns true if header with given name exists, false otherwise
     */
    hasHeader(name) {
        return !!this.headers[(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.headerize)(name)];
    }
    /**
     * Parse the given header on the given index.
     * @param name - header name
     * @param idx - header index
     * @returns Parsed header object, undefined if the
     *   header is not present or in case of a parsing error.
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    parseHeader(name, idx = 0) {
        name = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.headerize)(name);
        if (!this.headers[name]) {
            // this.logger.log("header '" + name + "' not present");
            return;
        }
        else if (idx >= this.headers[name].length) {
            // this.logger.log("not so many '" + name + "' headers present");
            return;
        }
        const header = this.headers[name][idx];
        const value = header.raw;
        if (header.parsed) {
            return header.parsed;
        }
        // substitute '-' by '_' for grammar rule matching.
        const parsed = _grammar_grammar_js__WEBPACK_IMPORTED_MODULE_1__.Grammar.parse(value, name.replace(/-/g, "_"));
        if (parsed === -1) {
            this.headers[name].splice(idx, 1); // delete from headers
            // this.logger.warn('error parsing "' + name + '" header field with value "' + value + '"');
            return;
        }
        else {
            header.parsed = parsed;
            return parsed;
        }
    }
    /**
     * Message Header attribute selector. Alias of parseHeader.
     * @param name - header name
     * @param idx - header index
     * @returns Parsed header object, undefined if the
     *   header is not present or in case of a parsing error.
     *
     * @example
     * message.s('via',3).port
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    s(name, idx = 0) {
        return this.parseHeader(name, idx);
    }
    /**
     * Replace the value of the given header by the value.
     * @param name - header name
     * @param value - header value
     */
    setHeader(name, value) {
        this.headers[(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.headerize)(name)] = [{ raw: value }];
    }
    toString() {
        return this.data;
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/messages/incoming-request-message.js":
/*!***************************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/messages/incoming-request-message.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IncomingRequestMessage": () => (/* binding */ IncomingRequestMessage)
/* harmony export */ });
/* harmony import */ var _incoming_message_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./incoming-message.js */ "./node_modules/sip.js/lib/core/messages/incoming-message.js");

/**
 * Incoming request message.
 * @public
 */
class IncomingRequestMessage extends _incoming_message_js__WEBPACK_IMPORTED_MODULE_0__.IncomingMessage {
    constructor() {
        super();
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/messages/incoming-response-message.js":
/*!****************************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/messages/incoming-response-message.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "IncomingResponseMessage": () => (/* binding */ IncomingResponseMessage)
/* harmony export */ });
/* harmony import */ var _incoming_message_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./incoming-message.js */ "./node_modules/sip.js/lib/core/messages/incoming-message.js");

/**
 * Incoming response message.
 * @public
 */
class IncomingResponseMessage extends _incoming_message_js__WEBPACK_IMPORTED_MODULE_0__.IncomingMessage {
    constructor() {
        super();
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/messages/index.js":
/*!********************************************************!*\
  !*** ./node_modules/sip.js/lib/core/messages/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "C": () => (/* reexport safe */ _methods_index_js__WEBPACK_IMPORTED_MODULE_0__.C),
/* harmony export */   "DigestAuthentication": () => (/* reexport safe */ _digest_authentication_js__WEBPACK_IMPORTED_MODULE_2__.DigestAuthentication),
/* harmony export */   "IncomingMessage": () => (/* reexport safe */ _incoming_message_js__WEBPACK_IMPORTED_MODULE_3__.IncomingMessage),
/* harmony export */   "IncomingRequestMessage": () => (/* reexport safe */ _incoming_request_message_js__WEBPACK_IMPORTED_MODULE_4__.IncomingRequestMessage),
/* harmony export */   "IncomingResponseMessage": () => (/* reexport safe */ _incoming_response_message_js__WEBPACK_IMPORTED_MODULE_5__.IncomingResponseMessage),
/* harmony export */   "OutgoingRequestMessage": () => (/* reexport safe */ _outgoing_request_message_js__WEBPACK_IMPORTED_MODULE_6__.OutgoingRequestMessage),
/* harmony export */   "Parser": () => (/* reexport safe */ _parser_js__WEBPACK_IMPORTED_MODULE_8__.Parser),
/* harmony export */   "constructOutgoingResponse": () => (/* reexport safe */ _outgoing_response_js__WEBPACK_IMPORTED_MODULE_7__.constructOutgoingResponse),
/* harmony export */   "fromBodyLegacy": () => (/* reexport safe */ _body_js__WEBPACK_IMPORTED_MODULE_1__.fromBodyLegacy),
/* harmony export */   "getBody": () => (/* reexport safe */ _body_js__WEBPACK_IMPORTED_MODULE_1__.getBody),
/* harmony export */   "isBody": () => (/* reexport safe */ _body_js__WEBPACK_IMPORTED_MODULE_1__.isBody)
/* harmony export */ });
/* harmony import */ var _methods_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./methods/index.js */ "./node_modules/sip.js/lib/core/messages/methods/index.js");
/* harmony import */ var _body_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./body.js */ "./node_modules/sip.js/lib/core/messages/body.js");
/* harmony import */ var _digest_authentication_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./digest-authentication.js */ "./node_modules/sip.js/lib/core/messages/digest-authentication.js");
/* harmony import */ var _incoming_message_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./incoming-message.js */ "./node_modules/sip.js/lib/core/messages/incoming-message.js");
/* harmony import */ var _incoming_request_message_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./incoming-request-message.js */ "./node_modules/sip.js/lib/core/messages/incoming-request-message.js");
/* harmony import */ var _incoming_response_message_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./incoming-response-message.js */ "./node_modules/sip.js/lib/core/messages/incoming-response-message.js");
/* harmony import */ var _outgoing_request_message_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./outgoing-request-message.js */ "./node_modules/sip.js/lib/core/messages/outgoing-request-message.js");
/* harmony import */ var _outgoing_response_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./outgoing-response.js */ "./node_modules/sip.js/lib/core/messages/outgoing-response.js");
/* harmony import */ var _parser_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./parser.js */ "./node_modules/sip.js/lib/core/messages/parser.js");
// Directories

// Files













/***/ }),

/***/ "./node_modules/sip.js/lib/core/messages/md5.js":
/*!******************************************************!*\
  !*** ./node_modules/sip.js/lib/core/messages/md5.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Md5": () => (/* binding */ Md5)
/* harmony export */ });
/* eslint-disable */
//
// Scoped from: https://github.com/cotag/ts-md5
//
/*

TypeScript Md5
==============

Based on work by
* Joseph Myers: http://www.myersdaily.org/joseph/javascript/md5-text.html
* André Cruz: https://github.com/satazor/SparkMD5
* Raymond Hill: https://github.com/gorhill/yamd5.js

Effectively a TypeScrypt re-write of Raymond Hill JS Library

The MIT License (MIT)

Copyright (C) 2014 Raymond Hill

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.



            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
                    Version 2, December 2004

 Copyright (C) 2015 André Cruz <amdfcruz@gmail.com>

 Everyone is permitted to copy and distribute verbatim or modified
 copies of this license document, and changing it is allowed as long
 as the name is changed.

            DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
   TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

  0. You just DO WHAT THE FUCK YOU WANT TO.


*/
class Md5 {
    constructor() {
        this._dataLength = 0;
        this._bufferLength = 0;
        this._state = new Int32Array(4);
        this._buffer = new ArrayBuffer(68);
        this._buffer8 = new Uint8Array(this._buffer, 0, 68);
        this._buffer32 = new Uint32Array(this._buffer, 0, 17);
        this.start();
    }
    static hashStr(str, raw = false) {
        return this.onePassHasher
            .start()
            .appendStr(str)
            .end(raw);
    }
    static hashAsciiStr(str, raw = false) {
        return this.onePassHasher
            .start()
            .appendAsciiStr(str)
            .end(raw);
    }
    static _hex(x) {
        const hc = Md5.hexChars;
        const ho = Md5.hexOut;
        let n;
        let offset;
        let j;
        let i;
        for (i = 0; i < 4; i += 1) {
            offset = i * 8;
            n = x[i];
            for (j = 0; j < 8; j += 2) {
                ho[offset + 1 + j] = hc.charAt(n & 0x0F);
                n >>>= 4;
                ho[offset + 0 + j] = hc.charAt(n & 0x0F);
                n >>>= 4;
            }
        }
        return ho.join('');
    }
    static _md5cycle(x, k) {
        let a = x[0];
        let b = x[1];
        let c = x[2];
        let d = x[3];
        // ff()
        a += (b & c | ~b & d) + k[0] - 680876936 | 0;
        a = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[1] - 389564586 | 0;
        d = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[2] + 606105819 | 0;
        c = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[3] - 1044525330 | 0;
        b = (b << 22 | b >>> 10) + c | 0;
        a += (b & c | ~b & d) + k[4] - 176418897 | 0;
        a = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[5] + 1200080426 | 0;
        d = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[6] - 1473231341 | 0;
        c = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[7] - 45705983 | 0;
        b = (b << 22 | b >>> 10) + c | 0;
        a += (b & c | ~b & d) + k[8] + 1770035416 | 0;
        a = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[9] - 1958414417 | 0;
        d = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[10] - 42063 | 0;
        c = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[11] - 1990404162 | 0;
        b = (b << 22 | b >>> 10) + c | 0;
        a += (b & c | ~b & d) + k[12] + 1804603682 | 0;
        a = (a << 7 | a >>> 25) + b | 0;
        d += (a & b | ~a & c) + k[13] - 40341101 | 0;
        d = (d << 12 | d >>> 20) + a | 0;
        c += (d & a | ~d & b) + k[14] - 1502002290 | 0;
        c = (c << 17 | c >>> 15) + d | 0;
        b += (c & d | ~c & a) + k[15] + 1236535329 | 0;
        b = (b << 22 | b >>> 10) + c | 0;
        // gg()
        a += (b & d | c & ~d) + k[1] - 165796510 | 0;
        a = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[6] - 1069501632 | 0;
        d = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[11] + 643717713 | 0;
        c = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[0] - 373897302 | 0;
        b = (b << 20 | b >>> 12) + c | 0;
        a += (b & d | c & ~d) + k[5] - 701558691 | 0;
        a = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[10] + 38016083 | 0;
        d = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[15] - 660478335 | 0;
        c = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[4] - 405537848 | 0;
        b = (b << 20 | b >>> 12) + c | 0;
        a += (b & d | c & ~d) + k[9] + 568446438 | 0;
        a = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[14] - 1019803690 | 0;
        d = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[3] - 187363961 | 0;
        c = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[8] + 1163531501 | 0;
        b = (b << 20 | b >>> 12) + c | 0;
        a += (b & d | c & ~d) + k[13] - 1444681467 | 0;
        a = (a << 5 | a >>> 27) + b | 0;
        d += (a & c | b & ~c) + k[2] - 51403784 | 0;
        d = (d << 9 | d >>> 23) + a | 0;
        c += (d & b | a & ~b) + k[7] + 1735328473 | 0;
        c = (c << 14 | c >>> 18) + d | 0;
        b += (c & a | d & ~a) + k[12] - 1926607734 | 0;
        b = (b << 20 | b >>> 12) + c | 0;
        // hh()
        a += (b ^ c ^ d) + k[5] - 378558 | 0;
        a = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[8] - 2022574463 | 0;
        d = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[11] + 1839030562 | 0;
        c = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[14] - 35309556 | 0;
        b = (b << 23 | b >>> 9) + c | 0;
        a += (b ^ c ^ d) + k[1] - 1530992060 | 0;
        a = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[4] + 1272893353 | 0;
        d = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[7] - 155497632 | 0;
        c = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[10] - 1094730640 | 0;
        b = (b << 23 | b >>> 9) + c | 0;
        a += (b ^ c ^ d) + k[13] + 681279174 | 0;
        a = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[0] - 358537222 | 0;
        d = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[3] - 722521979 | 0;
        c = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[6] + 76029189 | 0;
        b = (b << 23 | b >>> 9) + c | 0;
        a += (b ^ c ^ d) + k[9] - 640364487 | 0;
        a = (a << 4 | a >>> 28) + b | 0;
        d += (a ^ b ^ c) + k[12] - 421815835 | 0;
        d = (d << 11 | d >>> 21) + a | 0;
        c += (d ^ a ^ b) + k[15] + 530742520 | 0;
        c = (c << 16 | c >>> 16) + d | 0;
        b += (c ^ d ^ a) + k[2] - 995338651 | 0;
        b = (b << 23 | b >>> 9) + c | 0;
        // ii()
        a += (c ^ (b | ~d)) + k[0] - 198630844 | 0;
        a = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[7] + 1126891415 | 0;
        d = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[14] - 1416354905 | 0;
        c = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[5] - 57434055 | 0;
        b = (b << 21 | b >>> 11) + c | 0;
        a += (c ^ (b | ~d)) + k[12] + 1700485571 | 0;
        a = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[3] - 1894986606 | 0;
        d = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[10] - 1051523 | 0;
        c = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[1] - 2054922799 | 0;
        b = (b << 21 | b >>> 11) + c | 0;
        a += (c ^ (b | ~d)) + k[8] + 1873313359 | 0;
        a = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[15] - 30611744 | 0;
        d = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[6] - 1560198380 | 0;
        c = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[13] + 1309151649 | 0;
        b = (b << 21 | b >>> 11) + c | 0;
        a += (c ^ (b | ~d)) + k[4] - 145523070 | 0;
        a = (a << 6 | a >>> 26) + b | 0;
        d += (b ^ (a | ~c)) + k[11] - 1120210379 | 0;
        d = (d << 10 | d >>> 22) + a | 0;
        c += (a ^ (d | ~b)) + k[2] + 718787259 | 0;
        c = (c << 15 | c >>> 17) + d | 0;
        b += (d ^ (c | ~a)) + k[9] - 343485551 | 0;
        b = (b << 21 | b >>> 11) + c | 0;
        x[0] = a + x[0] | 0;
        x[1] = b + x[1] | 0;
        x[2] = c + x[2] | 0;
        x[3] = d + x[3] | 0;
    }
    start() {
        this._dataLength = 0;
        this._bufferLength = 0;
        this._state.set(Md5.stateIdentity);
        return this;
    }
    // Char to code point to to array conversion:
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt
    // #Example.3A_Fixing_charCodeAt_to_handle_non-Basic-Multilingual-Plane_characters_if_their_presence_earlier_in_the_string_is_unknown
    appendStr(str) {
        const buf8 = this._buffer8;
        const buf32 = this._buffer32;
        let bufLen = this._bufferLength;
        let code;
        let i;
        for (i = 0; i < str.length; i += 1) {
            code = str.charCodeAt(i);
            if (code < 128) {
                buf8[bufLen++] = code;
            }
            else if (code < 0x800) {
                buf8[bufLen++] = (code >>> 6) + 0xC0;
                buf8[bufLen++] = code & 0x3F | 0x80;
            }
            else if (code < 0xD800 || code > 0xDBFF) {
                buf8[bufLen++] = (code >>> 12) + 0xE0;
                buf8[bufLen++] = (code >>> 6 & 0x3F) | 0x80;
                buf8[bufLen++] = (code & 0x3F) | 0x80;
            }
            else {
                code = ((code - 0xD800) * 0x400) + (str.charCodeAt(++i) - 0xDC00) + 0x10000;
                if (code > 0x10FFFF) {
                    throw new Error('Unicode standard supports code points up to U+10FFFF');
                }
                buf8[bufLen++] = (code >>> 18) + 0xF0;
                buf8[bufLen++] = (code >>> 12 & 0x3F) | 0x80;
                buf8[bufLen++] = (code >>> 6 & 0x3F) | 0x80;
                buf8[bufLen++] = (code & 0x3F) | 0x80;
            }
            if (bufLen >= 64) {
                this._dataLength += 64;
                Md5._md5cycle(this._state, buf32);
                bufLen -= 64;
                buf32[0] = buf32[16];
            }
        }
        this._bufferLength = bufLen;
        return this;
    }
    appendAsciiStr(str) {
        const buf8 = this._buffer8;
        const buf32 = this._buffer32;
        let bufLen = this._bufferLength;
        let i;
        let j = 0;
        for (;;) {
            i = Math.min(str.length - j, 64 - bufLen);
            while (i--) {
                buf8[bufLen++] = str.charCodeAt(j++);
            }
            if (bufLen < 64) {
                break;
            }
            this._dataLength += 64;
            Md5._md5cycle(this._state, buf32);
            bufLen = 0;
        }
        this._bufferLength = bufLen;
        return this;
    }
    appendByteArray(input) {
        const buf8 = this._buffer8;
        const buf32 = this._buffer32;
        let bufLen = this._bufferLength;
        let i;
        let j = 0;
        for (;;) {
            i = Math.min(input.length - j, 64 - bufLen);
            while (i--) {
                buf8[bufLen++] = input[j++];
            }
            if (bufLen < 64) {
                break;
            }
            this._dataLength += 64;
            Md5._md5cycle(this._state, buf32);
            bufLen = 0;
        }
        this._bufferLength = bufLen;
        return this;
    }
    getState() {
        const self = this;
        const s = self._state;
        return {
            buffer: String.fromCharCode.apply(null, self._buffer8),
            buflen: self._bufferLength,
            length: self._dataLength,
            state: [s[0], s[1], s[2], s[3]]
        };
    }
    setState(state) {
        const buf = state.buffer;
        const x = state.state;
        const s = this._state;
        let i;
        this._dataLength = state.length;
        this._bufferLength = state.buflen;
        s[0] = x[0];
        s[1] = x[1];
        s[2] = x[2];
        s[3] = x[3];
        for (i = 0; i < buf.length; i += 1) {
            this._buffer8[i] = buf.charCodeAt(i);
        }
    }
    end(raw = false) {
        const bufLen = this._bufferLength;
        const buf8 = this._buffer8;
        const buf32 = this._buffer32;
        const i = (bufLen >> 2) + 1;
        let dataBitsLen;
        this._dataLength += bufLen;
        buf8[bufLen] = 0x80;
        buf8[bufLen + 1] = buf8[bufLen + 2] = buf8[bufLen + 3] = 0;
        buf32.set(Md5.buffer32Identity.subarray(i), i);
        if (bufLen > 55) {
            Md5._md5cycle(this._state, buf32);
            buf32.set(Md5.buffer32Identity);
        }
        // Do the final computation based on the tail and length
        // Beware that the final length may not fit in 32 bits so we take care of that
        dataBitsLen = this._dataLength * 8;
        if (dataBitsLen <= 0xFFFFFFFF) {
            buf32[14] = dataBitsLen;
        }
        else {
            const matches = dataBitsLen.toString(16).match(/(.*?)(.{0,8})$/);
            if (matches === null) {
                return;
            }
            const lo = parseInt(matches[2], 16);
            const hi = parseInt(matches[1], 16) || 0;
            buf32[14] = lo;
            buf32[15] = hi;
        }
        Md5._md5cycle(this._state, buf32);
        return raw ? this._state : Md5._hex(this._state);
    }
}
// Private Static Variables
Md5.stateIdentity = new Int32Array([1732584193, -271733879, -1732584194, 271733878]);
Md5.buffer32Identity = new Int32Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
Md5.hexChars = '0123456789abcdef';
Md5.hexOut = [];
// Permanent instance is to use for one-call hashing
Md5.onePassHasher = new Md5();
if (Md5.hashStr('hello') !== '5d41402abc4b2a76b9719d911017c592') {
    console.error('Md5 self test failed.');
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/messages/methods/constants.js":
/*!********************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/messages/methods/constants.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "C": () => (/* binding */ C)
/* harmony export */ });
/* eslint-disable @typescript-eslint/no-namespace */
/**
 * SIP Methods
 * @internal
 */
var C;
(function (C) {
    C.ACK = "ACK";
    C.BYE = "BYE";
    C.CANCEL = "CANCEL";
    C.INFO = "INFO";
    C.INVITE = "INVITE";
    C.MESSAGE = "MESSAGE";
    C.NOTIFY = "NOTIFY";
    C.OPTIONS = "OPTIONS";
    C.REGISTER = "REGISTER";
    C.UPDATE = "UPDATE";
    C.SUBSCRIBE = "SUBSCRIBE";
    C.PUBLISH = "PUBLISH";
    C.REFER = "REFER";
    C.PRACK = "PRACK";
})(C = C || (C = {}));


/***/ }),

/***/ "./node_modules/sip.js/lib/core/messages/methods/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/messages/methods/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "C": () => (/* reexport safe */ _constants_js__WEBPACK_IMPORTED_MODULE_0__.C)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants.js */ "./node_modules/sip.js/lib/core/messages/methods/constants.js");















/***/ }),

/***/ "./node_modules/sip.js/lib/core/messages/outgoing-request-message.js":
/*!***************************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/messages/outgoing-request-message.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "OutgoingRequestMessage": () => (/* binding */ OutgoingRequestMessage)
/* harmony export */ });
/* harmony import */ var _grammar_name_addr_header_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../grammar/name-addr-header.js */ "./node_modules/sip.js/lib/grammar/name-addr-header.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/sip.js/lib/core/messages/utils.js");


/**
 * Outgoing SIP request message.
 * @public
 */
class OutgoingRequestMessage {
    constructor(method, ruri, fromURI, toURI, options, extraHeaders, body) {
        this.headers = {};
        this.extraHeaders = [];
        // Initialize default options
        this.options = OutgoingRequestMessage.getDefaultOptions();
        // Options - merge a deep copy
        if (options) {
            this.options = Object.assign(Object.assign({}, this.options), options);
            if (this.options.optionTags && this.options.optionTags.length) {
                this.options.optionTags = this.options.optionTags.slice();
            }
            if (this.options.routeSet && this.options.routeSet.length) {
                this.options.routeSet = this.options.routeSet.slice();
            }
        }
        // Extra headers - deep copy
        if (extraHeaders && extraHeaders.length) {
            this.extraHeaders = extraHeaders.slice();
        }
        // Body - deep copy
        if (body) {
            // TODO: internal representation should be Body
            // this.body = { ...body };
            this.body = {
                body: body.content,
                contentType: body.contentType
            };
        }
        // Method
        this.method = method;
        // RURI
        this.ruri = ruri.clone();
        // From
        this.fromURI = fromURI.clone();
        this.fromTag = this.options.fromTag ? this.options.fromTag : (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.newTag)();
        this.from = OutgoingRequestMessage.makeNameAddrHeader(this.fromURI, this.options.fromDisplayName, this.fromTag);
        // To
        this.toURI = toURI.clone();
        this.toTag = this.options.toTag;
        this.to = OutgoingRequestMessage.makeNameAddrHeader(this.toURI, this.options.toDisplayName, this.toTag);
        // Call-ID
        this.callId = this.options.callId ? this.options.callId : this.options.callIdPrefix + (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createRandomToken)(15);
        // CSeq
        this.cseq = this.options.cseq;
        // The relative order of header fields with different field names is not
        // significant.  However, it is RECOMMENDED that header fields which are
        // needed for proxy processing (Via, Route, Record-Route, Proxy-Require,
        // Max-Forwards, and Proxy-Authorization, for example) appear towards
        // the top of the message to facilitate rapid parsing.
        // https://tools.ietf.org/html/rfc3261#section-7.3.1
        this.setHeader("route", this.options.routeSet);
        this.setHeader("via", "");
        this.setHeader("to", this.to.toString());
        this.setHeader("from", this.from.toString());
        this.setHeader("cseq", this.cseq + " " + this.method);
        this.setHeader("call-id", this.callId);
        this.setHeader("max-forwards", "70");
    }
    /** Get a copy of the default options. */
    static getDefaultOptions() {
        return {
            callId: "",
            callIdPrefix: "",
            cseq: 1,
            toDisplayName: "",
            toTag: "",
            fromDisplayName: "",
            fromTag: "",
            forceRport: false,
            hackViaTcp: false,
            optionTags: ["outbound"],
            routeSet: [],
            userAgentString: "sip.js",
            viaHost: ""
        };
    }
    static makeNameAddrHeader(uri, displayName, tag) {
        const parameters = {};
        if (tag) {
            parameters.tag = tag;
        }
        return new _grammar_name_addr_header_js__WEBPACK_IMPORTED_MODULE_1__.NameAddrHeader(uri, displayName, parameters);
    }
    /**
     * Get the value of the given header name at the given position.
     * @param name - header name
     * @returns Returns the specified header, undefined if header doesn't exist.
     */
    getHeader(name) {
        const header = this.headers[(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.headerize)(name)];
        if (header) {
            if (header[0]) {
                return header[0];
            }
        }
        else {
            const regexp = new RegExp("^\\s*" + name + "\\s*:", "i");
            for (const exHeader of this.extraHeaders) {
                if (regexp.test(exHeader)) {
                    return exHeader.substring(exHeader.indexOf(":") + 1).trim();
                }
            }
        }
        return;
    }
    /**
     * Get the header/s of the given name.
     * @param name - header name
     * @returns Array with all the headers of the specified name.
     */
    getHeaders(name) {
        const result = [];
        const headerArray = this.headers[(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.headerize)(name)];
        if (headerArray) {
            for (const headerPart of headerArray) {
                result.push(headerPart);
            }
        }
        else {
            const regexp = new RegExp("^\\s*" + name + "\\s*:", "i");
            for (const exHeader of this.extraHeaders) {
                if (regexp.test(exHeader)) {
                    result.push(exHeader.substring(exHeader.indexOf(":") + 1).trim());
                }
            }
        }
        return result;
    }
    /**
     * Verify the existence of the given header.
     * @param name - header name
     * @returns true if header with given name exists, false otherwise
     */
    hasHeader(name) {
        if (this.headers[(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.headerize)(name)]) {
            return true;
        }
        else {
            const regexp = new RegExp("^\\s*" + name + "\\s*:", "i");
            for (const extraHeader of this.extraHeaders) {
                if (regexp.test(extraHeader)) {
                    return true;
                }
            }
        }
        return false;
    }
    /**
     * Replace the the given header by the given value.
     * @param name - header name
     * @param value - header value
     */
    setHeader(name, value) {
        this.headers[(0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.headerize)(name)] = value instanceof Array ? value : [value];
    }
    /**
     * The Via header field indicates the transport used for the transaction
     * and identifies the location where the response is to be sent.  A Via
     * header field value is added only after the transport that will be
     * used to reach the next hop has been selected (which may involve the
     * usage of the procedures in [4]).
     *
     * When the UAC creates a request, it MUST insert a Via into that
     * request.  The protocol name and protocol version in the header field
     * MUST be SIP and 2.0, respectively.  The Via header field value MUST
     * contain a branch parameter.  This parameter is used to identify the
     * transaction created by that request.  This parameter is used by both
     * the client and the server.
     * https://tools.ietf.org/html/rfc3261#section-8.1.1.7
     * @param branchParameter - The branch parameter.
     * @param transport - The sent protocol transport.
     */
    setViaHeader(branch, transport) {
        // FIXME: Hack
        if (this.options.hackViaTcp) {
            transport = "TCP";
        }
        let via = "SIP/2.0/" + transport;
        via += " " + this.options.viaHost + ";branch=" + branch;
        if (this.options.forceRport) {
            via += ";rport";
        }
        this.setHeader("via", via);
        this.branch = branch;
    }
    toString() {
        let msg = "";
        msg += this.method + " " + this.ruri.toRaw() + " SIP/2.0\r\n";
        for (const header in this.headers) {
            if (this.headers[header]) {
                for (const headerPart of this.headers[header]) {
                    msg += header + ": " + headerPart + "\r\n";
                }
            }
        }
        for (const header of this.extraHeaders) {
            msg += header.trim() + "\r\n";
        }
        msg += "Supported: " + this.options.optionTags.join(", ") + "\r\n";
        msg += "User-Agent: " + this.options.userAgentString + "\r\n";
        if (this.body) {
            if (typeof this.body === "string") {
                msg += "Content-Length: " + (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.utf8Length)(this.body) + "\r\n\r\n";
                msg += this.body;
            }
            else {
                if (this.body.body && this.body.contentType) {
                    msg += "Content-Type: " + this.body.contentType + "\r\n";
                    msg += "Content-Length: " + (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.utf8Length)(this.body.body) + "\r\n\r\n";
                    msg += this.body.body;
                }
                else {
                    msg += "Content-Length: " + 0 + "\r\n\r\n";
                }
            }
        }
        else {
            msg += "Content-Length: " + 0 + "\r\n\r\n";
        }
        return msg;
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/messages/outgoing-response.js":
/*!********************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/messages/outgoing-response.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "constructOutgoingResponse": () => (/* binding */ constructOutgoingResponse)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/sip.js/lib/core/messages/utils.js");

/**
 * When a UAS wishes to construct a response to a request, it follows
 * the general procedures detailed in the following subsections.
 * Additional behaviors specific to the response code in question, which
 * are not detailed in this section, may also be required.
 * https://tools.ietf.org/html/rfc3261#section-8.2.6
 * @internal
 */
function constructOutgoingResponse(message, options) {
    const CRLF = "\r\n";
    if (options.statusCode < 100 || options.statusCode > 699) {
        throw new TypeError("Invalid statusCode: " + options.statusCode);
    }
    const reasonPhrase = options.reasonPhrase ? options.reasonPhrase : (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.getReasonPhrase)(options.statusCode);
    // SIP responses are distinguished from requests by having a Status-Line
    // as their start-line.  A Status-Line consists of the protocol version
    // followed by a numeric Status-Code and its associated textual phrase,
    // with each element separated by a single SP character.
    // https://tools.ietf.org/html/rfc3261#section-7.2
    let response = "SIP/2.0 " + options.statusCode + " " + reasonPhrase + CRLF;
    // One largely non-method-specific guideline for the generation of
    // responses is that UASs SHOULD NOT issue a provisional response for a
    // non-INVITE request.  Rather, UASs SHOULD generate a final response to
    // a non-INVITE request as soon as possible.
    // https://tools.ietf.org/html/rfc3261#section-8.2.6.1
    if (options.statusCode >= 100 && options.statusCode < 200) {
        // TODO
    }
    // When a 100 (Trying) response is generated, any Timestamp header field
    // present in the request MUST be copied into this 100 (Trying)
    // response.  If there is a delay in generating the response, the UAS
    // SHOULD add a delay value into the Timestamp value in the response.
    // This value MUST contain the difference between the time of sending of
    // the response and receipt of the request, measured in seconds.
    // https://tools.ietf.org/html/rfc3261#section-8.2.6.1
    if (options.statusCode === 100) {
        // TODO
    }
    // The From field of the response MUST equal the From header field of
    // the request.  The Call-ID header field of the response MUST equal the
    // Call-ID header field of the request.  The CSeq header field of the
    // response MUST equal the CSeq field of the request.  The Via header
    // field values in the response MUST equal the Via header field values
    // in the request and MUST maintain the same ordering.
    // https://tools.ietf.org/html/rfc3261#section-8.2.6.2
    const fromHeader = "From: " + message.getHeader("From") + CRLF;
    const callIdHeader = "Call-ID: " + message.callId + CRLF;
    const cSeqHeader = "CSeq: " + message.cseq + " " + message.method + CRLF;
    const viaHeaders = message.getHeaders("via").reduce((previous, current) => {
        return previous + "Via: " + current + CRLF;
    }, "");
    // If a request contained a To tag in the request, the To header field
    // in the response MUST equal that of the request.  However, if the To
    // header field in the request did not contain a tag, the URI in the To
    // header field in the response MUST equal the URI in the To header
    // field; additionally, the UAS MUST add a tag to the To header field in
    // the response (with the exception of the 100 (Trying) response, in
    // which a tag MAY be present).  This serves to identify the UAS that is
    // responding, possibly resulting in a component of a dialog ID.  The
    // same tag MUST be used for all responses to that request, both final
    // and provisional (again excepting the 100 (Trying)).
    // https://tools.ietf.org/html/rfc3261#section-8.2.6.2
    let toHeader = "To: " + message.getHeader("to");
    if (options.statusCode > 100 && !message.parseHeader("to").hasParam("tag")) {
        let toTag = options.toTag;
        if (!toTag) {
            // Stateless UAS Behavior...
            // o  To header tags MUST be generated for responses in a stateless
            //    manner - in a manner that will generate the same tag for the
            //    same request consistently.  For information on tag construction
            //    see Section 19.3.
            // https://tools.ietf.org/html/rfc3261#section-8.2.7
            toTag = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.newTag)(); // FIXME: newTag() currently generates random tags
        }
        toHeader += ";tag=" + toTag;
    }
    toHeader += CRLF;
    // FIXME: TODO: needs review... moved to InviteUserAgentServer (as it is specific to that)
    // let recordRouteHeaders = "";
    // if (request.method === C.INVITE && statusCode > 100 && statusCode <= 200) {
    //   recordRouteHeaders = request.getHeaders("record-route").reduce((previous, current) => {
    //     return previous + "Record-Route: " + current + CRLF;
    //   }, "");
    // }
    // FIXME: TODO: needs review...
    let supportedHeader = "";
    if (options.supported) {
        supportedHeader = "Supported: " + options.supported.join(", ") + CRLF;
    }
    // FIXME: TODO: needs review...
    let userAgentHeader = "";
    if (options.userAgent) {
        userAgentHeader = "User-Agent: " + options.userAgent + CRLF;
    }
    let extensionHeaders = "";
    if (options.extraHeaders) {
        extensionHeaders = options.extraHeaders.reduce((previous, current) => {
            return previous + current.trim() + CRLF;
        }, "");
    }
    // The relative order of header fields with different field names is not
    // significant.  However, it is RECOMMENDED that header fields which are
    // needed for proxy processing (Via, Route, Record-Route, Proxy-Require,
    // Max-Forwards, and Proxy-Authorization, for example) appear towards
    // the top of the message to facilitate rapid parsing.
    // https://tools.ietf.org/html/rfc3261#section-7.3.1
    // response += recordRouteHeaders;
    response += viaHeaders;
    response += fromHeader;
    response += toHeader;
    response += cSeqHeader;
    response += callIdHeader;
    response += supportedHeader;
    response += userAgentHeader;
    response += extensionHeaders;
    if (options.body) {
        response += "Content-Type: " + options.body.contentType + CRLF;
        response += "Content-Length: " + (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.utf8Length)(options.body.content) + CRLF + CRLF;
        response += options.body.content;
    }
    else {
        response += "Content-Length: " + 0 + CRLF + CRLF;
    }
    return { message: response };
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/messages/parser.js":
/*!*********************************************************!*\
  !*** ./node_modules/sip.js/lib/core/messages/parser.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Parser": () => (/* binding */ Parser)
/* harmony export */ });
/* harmony import */ var _grammar_grammar_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../grammar/grammar.js */ "./node_modules/sip.js/lib/grammar/grammar.js");
/* harmony import */ var _incoming_request_message_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./incoming-request-message.js */ "./node_modules/sip.js/lib/core/messages/incoming-request-message.js");
/* harmony import */ var _incoming_response_message_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./incoming-response-message.js */ "./node_modules/sip.js/lib/core/messages/incoming-response-message.js");
/* eslint-disable no-inner-declarations */
/* eslint-disable @typescript-eslint/no-namespace */



/**
 * Extract and parse every header of a SIP message.
 * @internal
 */
var Parser;
(function (Parser) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function getHeader(data, headerStart) {
        // 'start' position of the header.
        let start = headerStart;
        // 'end' position of the header.
        let end = 0;
        // 'partial end' position of the header.
        let partialEnd = 0;
        // End of message.
        if (data.substring(start, start + 2).match(/(^\r\n)/)) {
            return -2;
        }
        while (end === 0) {
            // Partial End of Header.
            partialEnd = data.indexOf("\r\n", start);
            // 'indexOf' returns -1 if the value to be found never occurs.
            if (partialEnd === -1) {
                return partialEnd;
            }
            if (!data.substring(partialEnd + 2, partialEnd + 4).match(/(^\r\n)/) &&
                data.charAt(partialEnd + 2).match(/(^\s+)/)) {
                // Not the end of the message. Continue from the next position.
                start = partialEnd + 2;
            }
            else {
                end = partialEnd;
            }
        }
        return end;
    }
    Parser.getHeader = getHeader;
    function parseHeader(message, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data, headerStart, headerEnd) {
        const hcolonIndex = data.indexOf(":", headerStart);
        const headerName = data.substring(headerStart, hcolonIndex).trim();
        const headerValue = data.substring(hcolonIndex + 1, headerEnd).trim();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let parsed;
        // If header-field is well-known, parse it.
        switch (headerName.toLowerCase()) {
            case "via":
            case "v":
                message.addHeader("via", headerValue);
                if (message.getHeaders("via").length === 1) {
                    parsed = message.parseHeader("Via");
                    if (parsed) {
                        message.via = parsed;
                        message.viaBranch = parsed.branch;
                    }
                }
                else {
                    parsed = 0;
                }
                break;
            case "from":
            case "f":
                message.setHeader("from", headerValue);
                parsed = message.parseHeader("from");
                if (parsed) {
                    message.from = parsed;
                    message.fromTag = parsed.getParam("tag");
                }
                break;
            case "to":
            case "t":
                message.setHeader("to", headerValue);
                parsed = message.parseHeader("to");
                if (parsed) {
                    message.to = parsed;
                    message.toTag = parsed.getParam("tag");
                }
                break;
            case "record-route":
                parsed = _grammar_grammar_js__WEBPACK_IMPORTED_MODULE_0__.Grammar.parse(headerValue, "Record_Route");
                if (parsed === -1) {
                    parsed = undefined;
                    break;
                }
                if (!(parsed instanceof Array)) {
                    parsed = undefined;
                    break;
                }
                parsed.forEach((header) => {
                    message.addHeader("record-route", headerValue.substring(header.position, header.offset));
                    message.headers["Record-Route"][message.getHeaders("record-route").length - 1].parsed = header.parsed;
                });
                break;
            case "call-id":
            case "i":
                message.setHeader("call-id", headerValue);
                parsed = message.parseHeader("call-id");
                if (parsed) {
                    message.callId = headerValue;
                }
                break;
            case "contact":
            case "m":
                parsed = _grammar_grammar_js__WEBPACK_IMPORTED_MODULE_0__.Grammar.parse(headerValue, "Contact");
                if (parsed === -1) {
                    parsed = undefined;
                    break;
                }
                if (!(parsed instanceof Array)) {
                    parsed = undefined;
                    break;
                }
                parsed.forEach((header) => {
                    message.addHeader("contact", headerValue.substring(header.position, header.offset));
                    message.headers.Contact[message.getHeaders("contact").length - 1].parsed = header.parsed;
                });
                break;
            case "content-length":
            case "l":
                message.setHeader("content-length", headerValue);
                parsed = message.parseHeader("content-length");
                break;
            case "content-type":
            case "c":
                message.setHeader("content-type", headerValue);
                parsed = message.parseHeader("content-type");
                break;
            case "cseq":
                message.setHeader("cseq", headerValue);
                parsed = message.parseHeader("cseq");
                if (parsed) {
                    message.cseq = parsed.value;
                }
                if (message instanceof _incoming_response_message_js__WEBPACK_IMPORTED_MODULE_1__.IncomingResponseMessage) {
                    message.method = parsed.method;
                }
                break;
            case "max-forwards":
                message.setHeader("max-forwards", headerValue);
                parsed = message.parseHeader("max-forwards");
                break;
            case "www-authenticate":
                message.setHeader("www-authenticate", headerValue);
                parsed = message.parseHeader("www-authenticate");
                break;
            case "proxy-authenticate":
                message.setHeader("proxy-authenticate", headerValue);
                parsed = message.parseHeader("proxy-authenticate");
                break;
            case "refer-to":
            case "r":
                message.setHeader("refer-to", headerValue);
                parsed = message.parseHeader("refer-to");
                if (parsed) {
                    message.referTo = parsed;
                }
                break;
            default:
                // Do not parse this header.
                message.addHeader(headerName.toLowerCase(), headerValue);
                parsed = 0;
        }
        if (parsed === undefined) {
            return {
                error: "error parsing header '" + headerName + "'"
            };
        }
        else {
            return true;
        }
    }
    Parser.parseHeader = parseHeader;
    function parseMessage(data, logger) {
        let headerStart = 0;
        let headerEnd = data.indexOf("\r\n");
        if (headerEnd === -1) {
            logger.warn("no CRLF found, not a SIP message, discarded");
            return;
        }
        // Parse first line. Check if it is a Request or a Reply.
        const firstLine = data.substring(0, headerEnd);
        const parsed = _grammar_grammar_js__WEBPACK_IMPORTED_MODULE_0__.Grammar.parse(firstLine, "Request_Response");
        let message;
        if (parsed === -1) {
            logger.warn('error parsing first line of SIP message: "' + firstLine + '"');
            return;
        }
        else if (!parsed.status_code) {
            message = new _incoming_request_message_js__WEBPACK_IMPORTED_MODULE_2__.IncomingRequestMessage();
            message.method = parsed.method;
            message.ruri = parsed.uri;
        }
        else {
            message = new _incoming_response_message_js__WEBPACK_IMPORTED_MODULE_1__.IncomingResponseMessage();
            message.statusCode = parsed.status_code;
            message.reasonPhrase = parsed.reason_phrase;
        }
        message.data = data;
        headerStart = headerEnd + 2;
        // Loop over every line in data. Detect the end of each header and parse
        // it or simply add to the headers collection.
        let bodyStart;
        // eslint-disable-next-line no-constant-condition
        while (true) {
            headerEnd = getHeader(data, headerStart);
            // The SIP message has normally finished.
            if (headerEnd === -2) {
                bodyStart = headerStart + 2;
                break;
            }
            else if (headerEnd === -1) {
                // data.indexOf returned -1 due to a malformed message.
                logger.error("malformed message");
                return;
            }
            const parsedHeader = parseHeader(message, data, headerStart, headerEnd);
            if (parsedHeader && parsedHeader !== true) {
                logger.error(parsedHeader.error);
                return;
            }
            headerStart = headerEnd + 2;
        }
        // RFC3261 18.3.
        // If there are additional bytes in the transport packet
        // beyond the end of the body, they MUST be discarded.
        if (message.hasHeader("content-length")) {
            message.body = data.substr(bodyStart, Number(message.getHeader("content-length")));
        }
        else {
            message.body = data.substring(bodyStart);
        }
        return message;
    }
    Parser.parseMessage = parseMessage;
})(Parser = Parser || (Parser = {}));


/***/ }),

/***/ "./node_modules/sip.js/lib/core/messages/utils.js":
/*!********************************************************!*\
  !*** ./node_modules/sip.js/lib/core/messages/utils.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createRandomToken": () => (/* binding */ createRandomToken),
/* harmony export */   "getReasonPhrase": () => (/* binding */ getReasonPhrase),
/* harmony export */   "headerize": () => (/* binding */ headerize),
/* harmony export */   "newTag": () => (/* binding */ newTag),
/* harmony export */   "utf8Length": () => (/* binding */ utf8Length)
/* harmony export */ });
/**
 * SIP Response Reasons
 * DOC: http://www.iana.org/assignments/sip-parameters
 * @internal
 */
const REASON_PHRASE = {
    100: "Trying",
    180: "Ringing",
    181: "Call Is Being Forwarded",
    182: "Queued",
    183: "Session Progress",
    199: "Early Dialog Terminated",
    200: "OK",
    202: "Accepted",
    204: "No Notification",
    300: "Multiple Choices",
    301: "Moved Permanently",
    302: "Moved Temporarily",
    305: "Use Proxy",
    380: "Alternative Service",
    400: "Bad Request",
    401: "Unauthorized",
    402: "Payment Required",
    403: "Forbidden",
    404: "Not Found",
    405: "Method Not Allowed",
    406: "Not Acceptable",
    407: "Proxy Authentication Required",
    408: "Request Timeout",
    410: "Gone",
    412: "Conditional Request Failed",
    413: "Request Entity Too Large",
    414: "Request-URI Too Long",
    415: "Unsupported Media Type",
    416: "Unsupported URI Scheme",
    417: "Unknown Resource-Priority",
    420: "Bad Extension",
    421: "Extension Required",
    422: "Session Interval Too Small",
    423: "Interval Too Brief",
    428: "Use Identity Header",
    429: "Provide Referrer Identity",
    430: "Flow Failed",
    433: "Anonymity Disallowed",
    436: "Bad Identity-Info",
    437: "Unsupported Certificate",
    438: "Invalid Identity Header",
    439: "First Hop Lacks Outbound Support",
    440: "Max-Breadth Exceeded",
    469: "Bad Info Package",
    470: "Consent Needed",
    478: "Unresolvable Destination",
    480: "Temporarily Unavailable",
    481: "Call/Transaction Does Not Exist",
    482: "Loop Detected",
    483: "Too Many Hops",
    484: "Address Incomplete",
    485: "Ambiguous",
    486: "Busy Here",
    487: "Request Terminated",
    488: "Not Acceptable Here",
    489: "Bad Event",
    491: "Request Pending",
    493: "Undecipherable",
    494: "Security Agreement Required",
    500: "Internal Server Error",
    501: "Not Implemented",
    502: "Bad Gateway",
    503: "Service Unavailable",
    504: "Server Time-out",
    505: "Version Not Supported",
    513: "Message Too Large",
    580: "Precondition Failure",
    600: "Busy Everywhere",
    603: "Decline",
    604: "Does Not Exist Anywhere",
    606: "Not Acceptable"
};
/**
 * @param size -
 * @param base -
 * @internal
 */
function createRandomToken(size, base = 32) {
    let token = "";
    for (let i = 0; i < size; i++) {
        const r = Math.floor(Math.random() * base);
        token += r.toString(base);
    }
    return token;
}
/**
 * @internal
 */
function getReasonPhrase(code) {
    return REASON_PHRASE[code] || "";
}
/**
 * @internal
 */
function newTag() {
    return createRandomToken(10);
}
/**
 * @param str -
 * @internal
 */
function headerize(str) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const exceptions = {
        "Call-Id": "Call-ID",
        Cseq: "CSeq",
        "Min-Se": "Min-SE",
        Rack: "RAck",
        Rseq: "RSeq",
        "Www-Authenticate": "WWW-Authenticate"
    };
    const name = str.toLowerCase().replace(/_/g, "-").split("-");
    const parts = name.length;
    let hname = "";
    for (let part = 0; part < parts; part++) {
        if (part !== 0) {
            hname += "-";
        }
        hname += name[part].charAt(0).toUpperCase() + name[part].substring(1);
    }
    if (exceptions[hname]) {
        hname = exceptions[hname];
    }
    return hname;
}
/**
 * @param str -
 * @internal
 */
function utf8Length(str) {
    return encodeURIComponent(str).replace(/%[A-F\d]{2}/g, "U").length;
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/session/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/sip.js/lib/core/session/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SessionState": () => (/* reexport safe */ _session_js__WEBPACK_IMPORTED_MODULE_0__.SessionState),
/* harmony export */   "SignalingState": () => (/* reexport safe */ _session_js__WEBPACK_IMPORTED_MODULE_0__.SignalingState)
/* harmony export */ });
/* harmony import */ var _session_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./session.js */ "./node_modules/sip.js/lib/core/session/session.js");




/***/ }),

/***/ "./node_modules/sip.js/lib/core/session/session.js":
/*!*********************************************************!*\
  !*** ./node_modules/sip.js/lib/core/session/session.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SessionState": () => (/* binding */ SessionState),
/* harmony export */   "SignalingState": () => (/* binding */ SignalingState)
/* harmony export */ });
/**
 * Session state.
 * @remarks
 * https://tools.ietf.org/html/rfc3261#section-13
 * @public
 */
var SessionState;
(function (SessionState) {
    SessionState["Initial"] = "Initial";
    SessionState["Early"] = "Early";
    SessionState["AckWait"] = "AckWait";
    SessionState["Confirmed"] = "Confirmed";
    SessionState["Terminated"] = "Terminated";
})(SessionState = SessionState || (SessionState = {}));
/**
 * Offer/Answer state.
 * @remarks
 * ```txt
 *         Offer                Answer             RFC    Ini Est Early
 *  -------------------------------------------------------------------
 *  1. INVITE Req.          2xx INVITE Resp.     RFC 3261  Y   Y    N
 *  2. 2xx INVITE Resp.     ACK Req.             RFC 3261  Y   Y    N
 *  3. INVITE Req.          1xx-rel INVITE Resp. RFC 3262  Y   Y    N
 *  4. 1xx-rel INVITE Resp. PRACK Req.           RFC 3262  Y   Y    N
 *  5. PRACK Req.           200 PRACK Resp.      RFC 3262  N   Y    Y
 *  6. UPDATE Req.          2xx UPDATE Resp.     RFC 3311  N   Y    Y
 *
 *       Table 1: Summary of SIP Usage of the Offer/Answer Model
 * ```
 * https://tools.ietf.org/html/rfc6337#section-2.2
 * @public
 */
var SignalingState;
(function (SignalingState) {
    SignalingState["Initial"] = "Initial";
    SignalingState["HaveLocalOffer"] = "HaveLocalOffer";
    SignalingState["HaveRemoteOffer"] = "HaveRemoteOffer";
    SignalingState["Stable"] = "Stable";
    SignalingState["Closed"] = "Closed";
})(SignalingState = SignalingState || (SignalingState = {}));


/***/ }),

/***/ "./node_modules/sip.js/lib/core/subscription/index.js":
/*!************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/subscription/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SubscriptionState": () => (/* reexport safe */ _subscription_js__WEBPACK_IMPORTED_MODULE_0__.SubscriptionState)
/* harmony export */ });
/* harmony import */ var _subscription_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./subscription.js */ "./node_modules/sip.js/lib/core/subscription/subscription.js");




/***/ }),

/***/ "./node_modules/sip.js/lib/core/subscription/subscription.js":
/*!*******************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/subscription/subscription.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SubscriptionState": () => (/* binding */ SubscriptionState)
/* harmony export */ });
/**
 * Subscription state.
 * @remarks
 * https://tools.ietf.org/html/rfc6665#section-4.1.2
 * @public
 */
var SubscriptionState;
(function (SubscriptionState) {
    SubscriptionState["Initial"] = "Initial";
    SubscriptionState["NotifyWait"] = "NotifyWait";
    SubscriptionState["Pending"] = "Pending";
    SubscriptionState["Active"] = "Active";
    SubscriptionState["Terminated"] = "Terminated";
})(SubscriptionState = SubscriptionState || (SubscriptionState = {}));


/***/ }),

/***/ "./node_modules/sip.js/lib/core/timers.js":
/*!************************************************!*\
  !*** ./node_modules/sip.js/lib/core/timers.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Timers": () => (/* binding */ Timers)
/* harmony export */ });
const T1 = 500;
const T2 = 4000;
const T4 = 5000;
/**
 * Timers.
 * @public
 */
const Timers = {
    T1,
    T2,
    T4,
    TIMER_B: 64 * T1,
    TIMER_D: 0 * T1,
    TIMER_F: 64 * T1,
    TIMER_H: 64 * T1,
    TIMER_I: 0 * T4,
    TIMER_J: 0 * T1,
    TIMER_K: 0 * T4,
    TIMER_L: 64 * T1,
    TIMER_M: 64 * T1,
    TIMER_N: 64 * T1,
    PROVISIONAL_RESPONSE_INTERVAL: 60000 // See RFC 3261 Section 13.3.1.1
};


/***/ }),

/***/ "./node_modules/sip.js/lib/core/transactions/client-transaction.js":
/*!*************************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/transactions/client-transaction.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClientTransaction": () => (/* binding */ ClientTransaction)
/* harmony export */ });
/* harmony import */ var _transaction_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transaction.js */ "./node_modules/sip.js/lib/core/transactions/transaction.js");

/**
 * Client Transaction.
 * @remarks
 * The client transaction provides its functionality through the
 * maintenance of a state machine.
 *
 * The TU communicates with the client transaction through a simple
 * interface.  When the TU wishes to initiate a new transaction, it
 * creates a client transaction and passes it the SIP request to send
 * and an IP address, port, and transport to which to send it.  The
 * client transaction begins execution of its state machine.  Valid
 * responses are passed up to the TU from the client transaction.
 * https://tools.ietf.org/html/rfc3261#section-17.1
 * @public
 */
class ClientTransaction extends _transaction_js__WEBPACK_IMPORTED_MODULE_0__.Transaction {
    constructor(_request, transport, user, state, loggerCategory) {
        super(transport, user, ClientTransaction.makeId(_request), state, loggerCategory);
        this._request = _request;
        this.user = user;
        // The Via header field indicates the transport used for the transaction
        // and identifies the location where the response is to be sent.  A Via
        // header field value is added only after the transport that will be
        // used to reach the next hop has been selected (which may involve the
        // usage of the procedures in [4]).
        // https://tools.ietf.org/html/rfc3261#section-8.1.1.7
        _request.setViaHeader(this.id, transport.protocol);
    }
    static makeId(request) {
        if (request.method === "CANCEL") {
            if (!request.branch) {
                throw new Error("Outgoing CANCEL request without a branch.");
            }
            return request.branch;
        }
        else {
            return "z9hG4bK" + Math.floor(Math.random() * 10000000);
        }
    }
    /** The outgoing request the transaction handling. */
    get request() {
        return this._request;
    }
    /**
     * A 408 to non-INVITE will always arrive too late to be useful ([3]),
     * The client already has full knowledge of the timeout. The only
     * information this message would convey is whether or not the server
     * believed the transaction timed out. However, with the current design
     * of the NIT, a client cannot do anything with this knowledge. Thus,
     * the 408 is simply wasting network resources and contributes to the
     * response bombardment illustrated in [3].
     * https://tools.ietf.org/html/rfc4320#section-4.1
     */
    onRequestTimeout() {
        if (this.user.onRequestTimeout) {
            this.user.onRequestTimeout();
        }
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/transactions/index.js":
/*!************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/transactions/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ClientTransaction": () => (/* reexport safe */ _client_transaction_js__WEBPACK_IMPORTED_MODULE_0__.ClientTransaction),
/* harmony export */   "InviteClientTransaction": () => (/* reexport safe */ _invite_client_transaction_js__WEBPACK_IMPORTED_MODULE_1__.InviteClientTransaction),
/* harmony export */   "InviteServerTransaction": () => (/* reexport safe */ _invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_2__.InviteServerTransaction),
/* harmony export */   "NonInviteClientTransaction": () => (/* reexport safe */ _non_invite_client_transaction_js__WEBPACK_IMPORTED_MODULE_3__.NonInviteClientTransaction),
/* harmony export */   "NonInviteServerTransaction": () => (/* reexport safe */ _non_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_4__.NonInviteServerTransaction),
/* harmony export */   "ServerTransaction": () => (/* reexport safe */ _server_transaction_js__WEBPACK_IMPORTED_MODULE_5__.ServerTransaction),
/* harmony export */   "Transaction": () => (/* reexport safe */ _transaction_js__WEBPACK_IMPORTED_MODULE_7__.Transaction),
/* harmony export */   "TransactionState": () => (/* reexport safe */ _transaction_state_js__WEBPACK_IMPORTED_MODULE_6__.TransactionState)
/* harmony export */ });
/* harmony import */ var _client_transaction_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client-transaction.js */ "./node_modules/sip.js/lib/core/transactions/client-transaction.js");
/* harmony import */ var _invite_client_transaction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./invite-client-transaction.js */ "./node_modules/sip.js/lib/core/transactions/invite-client-transaction.js");
/* harmony import */ var _invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./invite-server-transaction.js */ "./node_modules/sip.js/lib/core/transactions/invite-server-transaction.js");
/* harmony import */ var _non_invite_client_transaction_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./non-invite-client-transaction.js */ "./node_modules/sip.js/lib/core/transactions/non-invite-client-transaction.js");
/* harmony import */ var _non_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./non-invite-server-transaction.js */ "./node_modules/sip.js/lib/core/transactions/non-invite-server-transaction.js");
/* harmony import */ var _server_transaction_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./server-transaction.js */ "./node_modules/sip.js/lib/core/transactions/server-transaction.js");
/* harmony import */ var _transaction_state_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./transaction-state.js */ "./node_modules/sip.js/lib/core/transactions/transaction-state.js");
/* harmony import */ var _transaction_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./transaction.js */ "./node_modules/sip.js/lib/core/transactions/transaction.js");












/***/ }),

/***/ "./node_modules/sip.js/lib/core/transactions/invite-client-transaction.js":
/*!********************************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/transactions/invite-client-transaction.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InviteClientTransaction": () => (/* binding */ InviteClientTransaction)
/* harmony export */ });
/* harmony import */ var _timers_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../timers.js */ "./node_modules/sip.js/lib/core/timers.js");
/* harmony import */ var _client_transaction_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client-transaction.js */ "./node_modules/sip.js/lib/core/transactions/client-transaction.js");
/* harmony import */ var _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transaction-state.js */ "./node_modules/sip.js/lib/core/transactions/transaction-state.js");



/**
 * INVITE Client Transaction.
 * @remarks
 * The INVITE transaction consists of a three-way handshake.  The client
 * transaction sends an INVITE, the server transaction sends responses,
 * and the client transaction sends an ACK.
 * https://tools.ietf.org/html/rfc3261#section-17.1.1
 * @public
 */
class InviteClientTransaction extends _client_transaction_js__WEBPACK_IMPORTED_MODULE_0__.ClientTransaction {
    /**
     * Constructor.
     * Upon construction, the outgoing request's Via header is updated by calling `setViaHeader`.
     * Then `toString` is called on the outgoing request and the message is sent via the transport.
     * After construction the transaction will be in the "calling" state and the transaction id
     * will equal the branch parameter set in the Via header of the outgoing request.
     * https://tools.ietf.org/html/rfc3261#section-17.1.1
     * @param request - The outgoing INVITE request.
     * @param transport - The transport.
     * @param user - The transaction user.
     */
    constructor(request, transport, user) {
        super(request, transport, user, _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Calling, "sip.transaction.ict");
        /**
         * Map of 2xx to-tag to ACK.
         * If value is not undefined, value is the ACK which was sent.
         * If key exists but value is undefined, a 2xx was received but the ACK not yet sent.
         * Otherwise, a 2xx was not (yet) received for this transaction.
         */
        this.ackRetransmissionCache = new Map();
        // FIXME: Timer A for unreliable transport not implemented
        //
        // If an unreliable transport is being used, the client transaction
        // MUST start timer A with a value of T1. If a reliable transport is being used,
        // the client transaction SHOULD NOT start timer A (Timer A controls request retransmissions).
        // For any transport, the client transaction MUST start timer B with a value
        // of 64*T1 seconds (Timer B controls transaction timeouts).
        // https://tools.ietf.org/html/rfc3261#section-17.1.1.2
        //
        // While not spelled out in the RFC, Timer B is the maximum amount of time that a sender
        // will wait for an INVITE message to be acknowledged (a SIP response message is received).
        // So Timer B should be cleared when the transaction state proceeds from "Calling".
        this.B = setTimeout(() => this.timerB(), _timers_js__WEBPACK_IMPORTED_MODULE_2__.Timers.TIMER_B);
        this.send(request.toString()).catch((error) => {
            this.logTransportError(error, "Failed to send initial outgoing request.");
        });
    }
    /**
     * Destructor.
     */
    dispose() {
        if (this.B) {
            clearTimeout(this.B);
            this.B = undefined;
        }
        if (this.D) {
            clearTimeout(this.D);
            this.D = undefined;
        }
        if (this.M) {
            clearTimeout(this.M);
            this.M = undefined;
        }
        super.dispose();
    }
    /** Transaction kind. Deprecated. */
    get kind() {
        return "ict";
    }
    /**
     * ACK a 2xx final response.
     *
     * The transaction includes the ACK only if the final response was not a 2xx response (the
     * transaction will generate and send the ACK to the transport automagically). If the
     * final response was a 2xx, the ACK is not considered part of the transaction (the
     * transaction user needs to generate and send the ACK).
     *
     * This library is not strictly RFC compliant with regard to ACK handling for 2xx final
     * responses. Specifically, retransmissions of ACKs to a 2xx final responses is handled
     * by the transaction layer (instead of the UAC core). The "standard" approach is for
     * the UAC core to receive all 2xx responses and manage sending ACK retransmissions to
     * the transport directly. Herein the transaction layer manages sending ACKs to 2xx responses
     * and any retransmissions of those ACKs as needed.
     *
     * @param ack - The outgoing ACK request.
     */
    ackResponse(ack) {
        const toTag = ack.toTag;
        if (!toTag) {
            throw new Error("To tag undefined.");
        }
        const id = "z9hG4bK" + Math.floor(Math.random() * 10000000);
        ack.setViaHeader(id, this.transport.protocol);
        this.ackRetransmissionCache.set(toTag, ack); // Add to ACK retransmission cache
        this.send(ack.toString()).catch((error) => {
            this.logTransportError(error, "Failed to send ACK to 2xx response.");
        });
    }
    /**
     * Handler for incoming responses from the transport which match this transaction.
     * @param response - The incoming response.
     */
    receiveResponse(response) {
        const statusCode = response.statusCode;
        if (!statusCode || statusCode < 100 || statusCode > 699) {
            throw new Error(`Invalid status code ${statusCode}`);
        }
        switch (this.state) {
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Calling:
                // If the client transaction receives a provisional response while in
                // the "Calling" state, it transitions to the "Proceeding" state. In the
                // "Proceeding" state, the client transaction SHOULD NOT retransmit the
                // request any longer. Furthermore, the provisional response MUST be
                // passed to the TU.  Any further provisional responses MUST be passed
                // up to the TU while in the "Proceeding" state.
                // https://tools.ietf.org/html/rfc3261#section-17.1.1.2
                if (statusCode >= 100 && statusCode <= 199) {
                    this.stateTransition(_transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Proceeding);
                    if (this.user.receiveResponse) {
                        this.user.receiveResponse(response);
                    }
                    return;
                }
                // When a 2xx response is received while in either the "Calling" or
                // "Proceeding" states, the client transaction MUST transition to
                // the "Accepted" state... The 2xx response MUST be passed up to the TU.
                // The client transaction MUST NOT generate an ACK to the 2xx response -- its
                // handling is delegated to the TU. A UAC core will send an ACK to
                // the 2xx response using a new transaction.
                // https://tools.ietf.org/html/rfc6026#section-8.4
                if (statusCode >= 200 && statusCode <= 299) {
                    this.ackRetransmissionCache.set(response.toTag, undefined); // Prime the ACK cache
                    this.stateTransition(_transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Accepted);
                    if (this.user.receiveResponse) {
                        this.user.receiveResponse(response);
                    }
                    return;
                }
                // When in either the "Calling" or "Proceeding" states, reception of
                // a response with status code from 300-699 MUST cause the client
                // transaction to transition to "Completed". The client transaction
                // MUST pass the received response up to the TU, and the client
                // transaction MUST generate an ACK request, even if the transport is
                // reliable (guidelines for constructing the ACK from the response
                // are given in Section 17.1.1.3), and then pass the ACK to the
                // transport layer for transmission. The ACK MUST be sent to the
                // same address, port, and transport to which the original request was sent.
                // https://tools.ietf.org/html/rfc6026#section-8.4
                if (statusCode >= 300 && statusCode <= 699) {
                    this.stateTransition(_transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Completed);
                    this.ack(response);
                    if (this.user.receiveResponse) {
                        this.user.receiveResponse(response);
                    }
                    return;
                }
                break;
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Proceeding:
                // In the "Proceeding" state, the client transaction SHOULD NOT retransmit the
                // request any longer. Furthermore, the provisional response MUST be
                // passed to the TU.  Any further provisional responses MUST be passed
                // up to the TU while in the "Proceeding" state.
                // https://tools.ietf.org/html/rfc3261#section-17.1.1.2
                if (statusCode >= 100 && statusCode <= 199) {
                    if (this.user.receiveResponse) {
                        this.user.receiveResponse(response);
                    }
                    return;
                }
                // When a 2xx response is received while in either the "Calling" or "Proceeding" states,
                // the client transaction MUST transition to the "Accepted" state...
                // The 2xx response MUST be passed up to the TU. The client
                // transaction MUST NOT generate an ACK to the 2xx response -- its
                // handling is delegated to the TU. A UAC core will send an ACK to
                // the 2xx response using a new transaction.
                // https://tools.ietf.org/html/rfc6026#section-8.4
                if (statusCode >= 200 && statusCode <= 299) {
                    this.ackRetransmissionCache.set(response.toTag, undefined); // Prime the ACK cache
                    this.stateTransition(_transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Accepted);
                    if (this.user.receiveResponse) {
                        this.user.receiveResponse(response);
                    }
                    return;
                }
                // When in either the "Calling" or "Proceeding" states, reception of
                // a response with status code from 300-699 MUST cause the client
                // transaction to transition to "Completed". The client transaction
                // MUST pass the received response up to the TU, and the client
                // transaction MUST generate an ACK request, even if the transport is
                // reliable (guidelines for constructing the ACK from the response
                // are given in Section 17.1.1.3), and then pass the ACK to the
                // transport layer for transmission. The ACK MUST be sent to the
                // same address, port, and transport to which the original request was sent.
                // https://tools.ietf.org/html/rfc6026#section-8.4
                if (statusCode >= 300 && statusCode <= 699) {
                    this.stateTransition(_transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Completed);
                    this.ack(response);
                    if (this.user.receiveResponse) {
                        this.user.receiveResponse(response);
                    }
                    return;
                }
                break;
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Accepted:
                // The purpose of the "Accepted" state is to allow the client
                // transaction to continue to exist to receive, and pass to the TU,
                // any retransmissions of the 2xx response and any additional 2xx
                // responses from other branches of the INVITE if it forked
                // downstream. Timer M reflects the amount of time that the
                // transaction user will wait for such messages.
                //
                // Any 2xx responses that match this client transaction and that are
                // received while in the "Accepted" state MUST be passed up to the
                // TU. The client transaction MUST NOT generate an ACK to the 2xx
                // response. The client transaction takes no further action.
                // https://tools.ietf.org/html/rfc6026#section-8.4
                if (statusCode >= 200 && statusCode <= 299) {
                    // NOTE: This implementation herein is intentionally not RFC compliant.
                    // While the first 2xx response for a given branch is passed up to the TU,
                    // retransmissions of 2xx responses are absorbed and the ACK associated
                    // with the original response is resent. This approach is taken because
                    // our current transaction users are not currently in a good position to
                    // deal with 2xx retransmission. This SHOULD NOT cause any compliance issues - ;)
                    //
                    // If we don't have a cache hit, pass the response to the TU.
                    if (!this.ackRetransmissionCache.has(response.toTag)) {
                        this.ackRetransmissionCache.set(response.toTag, undefined); // Prime the ACK cache
                        if (this.user.receiveResponse) {
                            this.user.receiveResponse(response);
                        }
                        return;
                    }
                    // If we have a cache hit, try pulling the ACK from cache and retransmitting it.
                    const ack = this.ackRetransmissionCache.get(response.toTag);
                    if (ack) {
                        this.send(ack.toString()).catch((error) => {
                            this.logTransportError(error, "Failed to send retransmission of ACK to 2xx response.");
                        });
                        return;
                    }
                    // If an ACK was not found in cache then we have received a retransmitted 2xx
                    // response before the TU responded to the original response (we don't have an ACK yet).
                    // So discard this response under the assumption that the TU will eventually
                    // get us a ACK for the original response.
                    return;
                }
                break;
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Completed:
                // Any retransmissions of a response with status code 300-699 that
                // are received while in the "Completed" state MUST cause the ACK to
                // be re-passed to the transport layer for retransmission, but the
                // newly received response MUST NOT be passed up to the TU.
                // https://tools.ietf.org/html/rfc6026#section-8.4
                if (statusCode >= 300 && statusCode <= 699) {
                    this.ack(response);
                    return;
                }
                break;
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Terminated:
                break;
            default:
                throw new Error(`Invalid state ${this.state}`);
        }
        // Any response received that does not match an existing client
        // transaction state machine is simply dropped. (Implementations are,
        // of course, free to log or do other implementation-specific things
        // with such responses, but the implementer should be sure to consider
        // the impact of large numbers of malicious stray responses.)
        // https://tools.ietf.org/html/rfc6026#section-7.2
        const message = `Received unexpected ${statusCode} response while in state ${this.state}.`;
        this.logger.warn(message);
        return;
    }
    /**
     * The client transaction SHOULD inform the TU that a transport failure
     * has occurred, and the client transaction SHOULD transition directly
     * to the "Terminated" state.  The TU will handle the failover
     * mechanisms described in [4].
     * https://tools.ietf.org/html/rfc3261#section-17.1.4
     * @param error - The error.
     */
    onTransportError(error) {
        if (this.user.onTransportError) {
            this.user.onTransportError(error);
        }
        this.stateTransition(_transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Terminated, true);
    }
    /** For logging. */
    typeToString() {
        return "INVITE client transaction";
    }
    ack(response) {
        // The ACK request constructed by the client transaction MUST contain
        // values for the Call-ID, From, and Request-URI that are equal to the
        // values of those header fields in the request passed to the transport
        // by the client transaction (call this the "original request"). The To
        // header field in the ACK MUST equal the To header field in the
        // response being acknowledged, and therefore will usually differ from
        // the To header field in the original request by the addition of the
        // tag parameter. The ACK MUST contain a single Via header field, and
        // this MUST be equal to the top Via header field of the original
        // request. The CSeq header field in the ACK MUST contain the same
        // value for the sequence number as was present in the original request,
        // but the method parameter MUST be equal to "ACK".
        //
        // If the INVITE request whose response is being acknowledged had Route
        // header fields, those header fields MUST appear in the ACK. This is
        // to ensure that the ACK can be routed properly through any downstream
        // stateless proxies.
        // https://tools.ietf.org/html/rfc3261#section-17.1.1.3
        const ruri = this.request.ruri;
        const callId = this.request.callId;
        const cseq = this.request.cseq;
        const from = this.request.getHeader("from");
        const to = response.getHeader("to");
        const via = this.request.getHeader("via");
        const route = this.request.getHeader("route");
        if (!from) {
            throw new Error("From undefined.");
        }
        if (!to) {
            throw new Error("To undefined.");
        }
        if (!via) {
            throw new Error("Via undefined.");
        }
        let ack = `ACK ${ruri} SIP/2.0\r\n`;
        if (route) {
            ack += `Route: ${route}\r\n`;
        }
        ack += `Via: ${via}\r\n`;
        ack += `To: ${to}\r\n`;
        ack += `From: ${from}\r\n`;
        ack += `Call-ID: ${callId}\r\n`;
        ack += `CSeq: ${cseq} ACK\r\n`;
        ack += `Max-Forwards: 70\r\n`;
        ack += `Content-Length: 0\r\n\r\n`;
        // TOOO: "User-Agent" header
        this.send(ack).catch((error) => {
            this.logTransportError(error, "Failed to send ACK to non-2xx response.");
        });
        return;
    }
    /**
     * Execute a state transition.
     * @param newState - New state.
     */
    stateTransition(newState, dueToTransportError = false) {
        // Assert valid state transitions.
        const invalidStateTransition = () => {
            throw new Error(`Invalid state transition from ${this.state} to ${newState}`);
        };
        switch (newState) {
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Calling:
                invalidStateTransition();
                break;
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Proceeding:
                if (this.state !== _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Calling) {
                    invalidStateTransition();
                }
                break;
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Accepted:
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Completed:
                if (this.state !== _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Calling && this.state !== _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Proceeding) {
                    invalidStateTransition();
                }
                break;
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Terminated:
                if (this.state !== _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Calling &&
                    this.state !== _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Accepted &&
                    this.state !== _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Completed) {
                    if (!dueToTransportError) {
                        invalidStateTransition();
                    }
                }
                break;
            default:
                invalidStateTransition();
        }
        // While not spelled out in the RFC, Timer B is the maximum amount of time that a sender
        // will wait for an INVITE message to be acknowledged (a SIP response message is received).
        // So Timer B should be cleared when the transaction state proceeds from "Calling".
        if (this.B) {
            clearTimeout(this.B);
            this.B = undefined;
        }
        if (newState === _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Proceeding) {
            // Timers have no effect on "Proceeding" state.
            // In the "Proceeding" state, the client transaction
            // SHOULD NOT retransmit the request any longer.
            // https://tools.ietf.org/html/rfc3261#section-17.1.1.2
        }
        // The client transaction MUST start Timer D when it enters the "Completed" state
        // for any reason, with a value of at least 32 seconds for unreliable transports,
        // and a value of zero seconds for reliable transports.
        // https://tools.ietf.org/html/rfc6026#section-8.4
        if (newState === _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Completed) {
            this.D = setTimeout(() => this.timerD(), _timers_js__WEBPACK_IMPORTED_MODULE_2__.Timers.TIMER_D);
        }
        // The client transaction MUST transition to the "Accepted" state,
        // and Timer M MUST be started with a value of 64*T1.
        // https://tools.ietf.org/html/rfc6026#section-8.4
        if (newState === _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Accepted) {
            this.M = setTimeout(() => this.timerM(), _timers_js__WEBPACK_IMPORTED_MODULE_2__.Timers.TIMER_M);
        }
        // Once the transaction is in the "Terminated" state, it MUST be destroyed immediately.
        // https://tools.ietf.org/html/rfc6026#section-8.7
        if (newState === _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Terminated) {
            this.dispose();
        }
        // Update state.
        this.setState(newState);
    }
    /**
     * When timer A fires, the client transaction MUST retransmit the
     * request by passing it to the transport layer, and MUST reset the
     * timer with a value of 2*T1.
     * When timer A fires 2*T1 seconds later, the request MUST be
     * retransmitted again (assuming the client transaction is still in this
     * state). This process MUST continue so that the request is
     * retransmitted with intervals that double after each transmission.
     * These retransmissions SHOULD only be done while the client
     * transaction is in the "Calling" state.
     * https://tools.ietf.org/html/rfc3261#section-17.1.1.2
     */
    timerA() {
        // TODO
    }
    /**
     * If the client transaction is still in the "Calling" state when timer
     * B fires, the client transaction SHOULD inform the TU that a timeout
     * has occurred.  The client transaction MUST NOT generate an ACK.
     * https://tools.ietf.org/html/rfc3261#section-17.1.1.2
     */
    timerB() {
        this.logger.debug(`Timer B expired for INVITE client transaction ${this.id}.`);
        if (this.state === _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Calling) {
            this.onRequestTimeout();
            this.stateTransition(_transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Terminated);
        }
    }
    /**
     * If Timer D fires while the client transaction is in the "Completed" state,
     * the client transaction MUST move to the "Terminated" state.
     * https://tools.ietf.org/html/rfc6026#section-8.4
     */
    timerD() {
        this.logger.debug(`Timer D expired for INVITE client transaction ${this.id}.`);
        if (this.state === _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Completed) {
            this.stateTransition(_transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Terminated);
        }
    }
    /**
     * If Timer M fires while the client transaction is in the "Accepted"
     * state, the client transaction MUST move to the "Terminated" state.
     * https://tools.ietf.org/html/rfc6026#section-8.4
     */
    timerM() {
        this.logger.debug(`Timer M expired for INVITE client transaction ${this.id}.`);
        if (this.state === _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Accepted) {
            this.stateTransition(_transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Terminated);
        }
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/transactions/invite-server-transaction.js":
/*!********************************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/transactions/invite-server-transaction.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InviteServerTransaction": () => (/* binding */ InviteServerTransaction)
/* harmony export */ });
/* harmony import */ var _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../messages/methods/constants.js */ "./node_modules/sip.js/lib/core/messages/methods/constants.js");
/* harmony import */ var _timers_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../timers.js */ "./node_modules/sip.js/lib/core/timers.js");
/* harmony import */ var _server_transaction_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./server-transaction.js */ "./node_modules/sip.js/lib/core/transactions/server-transaction.js");
/* harmony import */ var _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transaction-state.js */ "./node_modules/sip.js/lib/core/transactions/transaction-state.js");




/**
 * INVITE Server Transaction.
 * @remarks
 * https://tools.ietf.org/html/rfc3261#section-17.2.1
 * @public
 */
class InviteServerTransaction extends _server_transaction_js__WEBPACK_IMPORTED_MODULE_0__.ServerTransaction {
    /**
     * Constructor.
     * Upon construction, a "100 Trying" reply will be immediately sent.
     * After construction the transaction will be in the "proceeding" state and the transaction
     * `id` will equal the branch parameter set in the Via header of the incoming request.
     * https://tools.ietf.org/html/rfc3261#section-17.2.1
     * @param request - Incoming INVITE request from the transport.
     * @param transport - The transport.
     * @param user - The transaction user.
     */
    constructor(request, transport, user) {
        super(request, transport, user, _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Proceeding, "sip.transaction.ist");
    }
    /**
     * Destructor.
     */
    dispose() {
        this.stopProgressExtensionTimer();
        if (this.H) {
            clearTimeout(this.H);
            this.H = undefined;
        }
        if (this.I) {
            clearTimeout(this.I);
            this.I = undefined;
        }
        if (this.L) {
            clearTimeout(this.L);
            this.L = undefined;
        }
        super.dispose();
    }
    /** Transaction kind. Deprecated. */
    get kind() {
        return "ist";
    }
    /**
     * Receive requests from transport matching this transaction.
     * @param request - Request matching this transaction.
     */
    receiveRequest(request) {
        switch (this.state) {
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Proceeding:
                // If a request retransmission is received while in the "Proceeding" state, the most
                // recent provisional response that was received from the TU MUST be passed to the
                // transport layer for retransmission.
                // https://tools.ietf.org/html/rfc3261#section-17.2.1
                if (request.method === _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_2__.C.INVITE) {
                    if (this.lastProvisionalResponse) {
                        this.send(this.lastProvisionalResponse).catch((error) => {
                            this.logTransportError(error, "Failed to send retransmission of provisional response.");
                        });
                    }
                    return;
                }
                break;
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Accepted:
                // While in the "Accepted" state, any retransmissions of the INVITE
                // received will match this transaction state machine and will be
                // absorbed by the machine without changing its state. These
                // retransmissions are not passed onto the TU.
                // https://tools.ietf.org/html/rfc6026#section-7.1
                if (request.method === _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_2__.C.INVITE) {
                    return;
                }
                break;
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Completed:
                // Furthermore, while in the "Completed" state, if a request retransmission is
                // received, the server SHOULD pass the response to the transport for retransmission.
                // https://tools.ietf.org/html/rfc3261#section-17.2.1
                if (request.method === _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_2__.C.INVITE) {
                    if (!this.lastFinalResponse) {
                        throw new Error("Last final response undefined.");
                    }
                    this.send(this.lastFinalResponse).catch((error) => {
                        this.logTransportError(error, "Failed to send retransmission of final response.");
                    });
                    return;
                }
                // If an ACK is received while the server transaction is in the "Completed" state,
                // the server transaction MUST transition to the "Confirmed" state.
                // https://tools.ietf.org/html/rfc3261#section-17.2.1
                if (request.method === _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_2__.C.ACK) {
                    this.stateTransition(_transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Confirmed);
                    return;
                }
                break;
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Confirmed:
                // The purpose of the "Confirmed" state is to absorb any additional ACK messages that arrive,
                // triggered from retransmissions of the final response.
                // https://tools.ietf.org/html/rfc3261#section-17.2.1
                if (request.method === _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_2__.C.INVITE || request.method === _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_2__.C.ACK) {
                    return;
                }
                break;
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Terminated:
                // For good measure absorb any additional messages that arrive (should not happen).
                if (request.method === _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_2__.C.INVITE || request.method === _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_2__.C.ACK) {
                    return;
                }
                break;
            default:
                throw new Error(`Invalid state ${this.state}`);
        }
        const message = `INVITE server transaction received unexpected ${request.method} request while in state ${this.state}.`;
        this.logger.warn(message);
        return;
    }
    /**
     * Receive responses from TU for this transaction.
     * @param statusCode - Status code of response.
     * @param response - Response.
     */
    receiveResponse(statusCode, response) {
        if (statusCode < 100 || statusCode > 699) {
            throw new Error(`Invalid status code ${statusCode}`);
        }
        switch (this.state) {
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Proceeding:
                // The TU passes any number of provisional responses to the server
                // transaction. So long as the server transaction is in the
                // "Proceeding" state, each of these MUST be passed to the transport
                // layer for transmission. They are not sent reliably by the
                // transaction layer (they are not retransmitted by it) and do not cause
                // a change in the state of the server transaction.
                // https://tools.ietf.org/html/rfc3261#section-17.2.1
                if (statusCode >= 100 && statusCode <= 199) {
                    this.lastProvisionalResponse = response;
                    // Start the progress extension timer only for a non-100 provisional response.
                    if (statusCode > 100) {
                        this.startProgressExtensionTimer(); // FIXME: remove
                    }
                    this.send(response).catch((error) => {
                        this.logTransportError(error, "Failed to send 1xx response.");
                    });
                    return;
                }
                // If, while in the "Proceeding" state, the TU passes a 2xx response
                // to the server transaction, the server transaction MUST pass this
                // response to the transport layer for transmission. It is not
                // retransmitted by the server transaction; retransmissions of 2xx
                // responses are handled by the TU. The server transaction MUST then
                // transition to the "Accepted" state.
                // https://tools.ietf.org/html/rfc6026#section-8.5
                if (statusCode >= 200 && statusCode <= 299) {
                    this.lastFinalResponse = response;
                    this.stateTransition(_transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Accepted);
                    this.send(response).catch((error) => {
                        this.logTransportError(error, "Failed to send 2xx response.");
                    });
                    return;
                }
                // While in the "Proceeding" state, if the TU passes a response with
                // status code from 300 to 699 to the server transaction, the response
                // MUST be passed to the transport layer for transmission, and the state
                // machine MUST enter the "Completed" state.
                // https://tools.ietf.org/html/rfc3261#section-17.2.1
                if (statusCode >= 300 && statusCode <= 699) {
                    this.lastFinalResponse = response;
                    this.stateTransition(_transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Completed);
                    this.send(response).catch((error) => {
                        this.logTransportError(error, "Failed to send non-2xx final response.");
                    });
                    return;
                }
                break;
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Accepted:
                // While in the "Accepted" state, if the TU passes a 2xx response,
                // the server transaction MUST pass the response to the transport layer for transmission.
                // https://tools.ietf.org/html/rfc6026#section-8.7
                if (statusCode >= 200 && statusCode <= 299) {
                    this.send(response).catch((error) => {
                        this.logTransportError(error, "Failed to send 2xx response.");
                    });
                    return;
                }
                break;
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Completed:
                break;
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Confirmed:
                break;
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Terminated:
                break;
            default:
                throw new Error(`Invalid state ${this.state}`);
        }
        const message = `INVITE server transaction received unexpected ${statusCode} response from TU while in state ${this.state}.`;
        this.logger.error(message);
        throw new Error(message);
    }
    /**
     * Retransmit the last 2xx response. This is a noop if not in the "accepted" state.
     */
    retransmitAcceptedResponse() {
        if (this.state === _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Accepted && this.lastFinalResponse) {
            this.send(this.lastFinalResponse).catch((error) => {
                this.logTransportError(error, "Failed to send 2xx response.");
            });
        }
    }
    /**
     * First, the procedures in [4] are followed, which attempt to deliver the response to a backup.
     * If those should all fail, based on the definition of failure in [4], the server transaction SHOULD
     * inform the TU that a failure has occurred, and MUST remain in the current state.
     * https://tools.ietf.org/html/rfc6026#section-8.8
     */
    onTransportError(error) {
        if (this.user.onTransportError) {
            this.user.onTransportError(error);
        }
    }
    /** For logging. */
    typeToString() {
        return "INVITE server transaction";
    }
    /**
     * Execute a state transition.
     * @param newState - New state.
     */
    stateTransition(newState) {
        // Assert valid state transitions.
        const invalidStateTransition = () => {
            throw new Error(`Invalid state transition from ${this.state} to ${newState}`);
        };
        switch (newState) {
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Proceeding:
                invalidStateTransition();
                break;
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Accepted:
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Completed:
                if (this.state !== _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Proceeding) {
                    invalidStateTransition();
                }
                break;
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Confirmed:
                if (this.state !== _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Completed) {
                    invalidStateTransition();
                }
                break;
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Terminated:
                if (this.state !== _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Accepted &&
                    this.state !== _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Completed &&
                    this.state !== _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Confirmed) {
                    invalidStateTransition();
                }
                break;
            default:
                invalidStateTransition();
        }
        // On any state transition, stop resending provisional responses
        this.stopProgressExtensionTimer();
        // The purpose of the "Accepted" state is to absorb retransmissions of an accepted INVITE request.
        // Any such retransmissions are absorbed entirely within the server transaction.
        // They are not passed up to the TU since any downstream UAS cores that accepted the request have
        // taken responsibility for reliability and will already retransmit their 2xx responses if necessary.
        // https://tools.ietf.org/html/rfc6026#section-8.7
        if (newState === _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Accepted) {
            this.L = setTimeout(() => this.timerL(), _timers_js__WEBPACK_IMPORTED_MODULE_3__.Timers.TIMER_L);
        }
        // When the "Completed" state is entered, timer H MUST be set to fire in 64*T1 seconds for all transports.
        // Timer H determines when the server transaction abandons retransmitting the response.
        // If an ACK is received while the server transaction is in the "Completed" state,
        // the server transaction MUST transition to the "Confirmed" state.
        // https://tools.ietf.org/html/rfc3261#section-17.2.1
        if (newState === _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Completed) {
            // FIXME: Missing timer G for unreliable transports.
            this.H = setTimeout(() => this.timerH(), _timers_js__WEBPACK_IMPORTED_MODULE_3__.Timers.TIMER_H);
        }
        // The purpose of the "Confirmed" state is to absorb any additional ACK messages that arrive,
        // triggered from retransmissions of the final response. When this state is entered, timer I
        // is set to fire in T4 seconds for unreliable transports, and zero seconds for reliable
        // transports. Once timer I fires, the server MUST transition to the "Terminated" state.
        // https://tools.ietf.org/html/rfc3261#section-17.2.1
        if (newState === _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Confirmed) {
            // FIXME: This timer is not getting set correctly for unreliable transports.
            this.I = setTimeout(() => this.timerI(), _timers_js__WEBPACK_IMPORTED_MODULE_3__.Timers.TIMER_I);
        }
        // Once the transaction is in the "Terminated" state, it MUST be destroyed immediately.
        // https://tools.ietf.org/html/rfc6026#section-8.7
        if (newState === _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Terminated) {
            this.dispose();
        }
        // Update state.
        this.setState(newState);
    }
    /**
     * FIXME: UAS Provisional Retransmission Timer. See RFC 3261 Section 13.3.1.1
     * This is in the wrong place. This is not a transaction level thing. It's a UAS level thing.
     */
    startProgressExtensionTimer() {
        // Start the progress extension timer only for the first non-100 provisional response.
        if (this.progressExtensionTimer === undefined) {
            this.progressExtensionTimer = setInterval(() => {
                this.logger.debug(`Progress extension timer expired for INVITE server transaction ${this.id}.`);
                if (!this.lastProvisionalResponse) {
                    throw new Error("Last provisional response undefined.");
                }
                this.send(this.lastProvisionalResponse).catch((error) => {
                    this.logTransportError(error, "Failed to send retransmission of provisional response.");
                });
            }, _timers_js__WEBPACK_IMPORTED_MODULE_3__.Timers.PROVISIONAL_RESPONSE_INTERVAL);
        }
    }
    /**
     * FIXME: UAS Provisional Retransmission Timer id. See RFC 3261 Section 13.3.1.1
     * This is in the wrong place. This is not a transaction level thing. It's a UAS level thing.
     */
    stopProgressExtensionTimer() {
        if (this.progressExtensionTimer !== undefined) {
            clearInterval(this.progressExtensionTimer);
            this.progressExtensionTimer = undefined;
        }
    }
    /**
     * While in the "Proceeding" state, if the TU passes a response with status code
     * from 300 to 699 to the server transaction, the response MUST be passed to the
     * transport layer for transmission, and the state machine MUST enter the "Completed" state.
     * For unreliable transports, timer G is set to fire in T1 seconds, and is not set to fire for
     * reliable transports. If timer G fires, the response is passed to the transport layer once
     * more for retransmission, and timer G is set to fire in MIN(2*T1, T2) seconds. From then on,
     * when timer G fires, the response is passed to the transport again for transmission, and
     * timer G is reset with a value that doubles, unless that value exceeds T2, in which case
     * it is reset with the value of T2.
     * https://tools.ietf.org/html/rfc3261#section-17.2.1
     */
    timerG() {
        // TODO
    }
    /**
     * If timer H fires while in the "Completed" state, it implies that the ACK was never received.
     * In this case, the server transaction MUST transition to the "Terminated" state, and MUST
     * indicate to the TU that a transaction failure has occurred.
     * https://tools.ietf.org/html/rfc3261#section-17.2.1
     */
    timerH() {
        this.logger.debug(`Timer H expired for INVITE server transaction ${this.id}.`);
        if (this.state === _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Completed) {
            this.logger.warn("ACK to negative final response was never received, terminating transaction.");
            this.stateTransition(_transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Terminated);
        }
    }
    /**
     * Once timer I fires, the server MUST transition to the "Terminated" state.
     * https://tools.ietf.org/html/rfc3261#section-17.2.1
     */
    timerI() {
        this.logger.debug(`Timer I expired for INVITE server transaction ${this.id}.`);
        this.stateTransition(_transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Terminated);
    }
    /**
     * When Timer L fires and the state machine is in the "Accepted" state, the machine MUST
     * transition to the "Terminated" state. Once the transaction is in the "Terminated" state,
     * it MUST be destroyed immediately. Timer L reflects the amount of time the server
     * transaction could receive 2xx responses for retransmission from the
     * TU while it is waiting to receive an ACK.
     * https://tools.ietf.org/html/rfc6026#section-7.1
     * https://tools.ietf.org/html/rfc6026#section-8.7
     */
    timerL() {
        this.logger.debug(`Timer L expired for INVITE server transaction ${this.id}.`);
        if (this.state === _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Accepted) {
            this.stateTransition(_transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Terminated);
        }
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/transactions/non-invite-client-transaction.js":
/*!************************************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/transactions/non-invite-client-transaction.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NonInviteClientTransaction": () => (/* binding */ NonInviteClientTransaction)
/* harmony export */ });
/* harmony import */ var _timers_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../timers.js */ "./node_modules/sip.js/lib/core/timers.js");
/* harmony import */ var _client_transaction_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./client-transaction.js */ "./node_modules/sip.js/lib/core/transactions/client-transaction.js");
/* harmony import */ var _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transaction-state.js */ "./node_modules/sip.js/lib/core/transactions/transaction-state.js");



/**
 * Non-INVITE Client Transaction.
 * @remarks
 * Non-INVITE transactions do not make use of ACK.
 * They are simple request-response interactions.
 * https://tools.ietf.org/html/rfc3261#section-17.1.2
 * @public
 */
class NonInviteClientTransaction extends _client_transaction_js__WEBPACK_IMPORTED_MODULE_0__.ClientTransaction {
    /**
     * Constructor
     * Upon construction, the outgoing request's Via header is updated by calling `setViaHeader`.
     * Then `toString` is called on the outgoing request and the message is sent via the transport.
     * After construction the transaction will be in the "calling" state and the transaction id
     * will equal the branch parameter set in the Via header of the outgoing request.
     * https://tools.ietf.org/html/rfc3261#section-17.1.2
     * @param request - The outgoing Non-INVITE request.
     * @param transport - The transport.
     * @param user - The transaction user.
     */
    constructor(request, transport, user) {
        super(request, transport, user, _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Trying, "sip.transaction.nict");
        // FIXME: Timer E for unreliable transports not implemented.
        //
        // The "Trying" state is entered when the TU initiates a new client
        // transaction with a request.  When entering this state, the client
        // transaction SHOULD set timer F to fire in 64*T1 seconds. The request
        // MUST be passed to the transport layer for transmission.
        // https://tools.ietf.org/html/rfc3261#section-17.1.2.2
        this.F = setTimeout(() => this.timerF(), _timers_js__WEBPACK_IMPORTED_MODULE_2__.Timers.TIMER_F);
        this.send(request.toString()).catch((error) => {
            this.logTransportError(error, "Failed to send initial outgoing request.");
        });
    }
    /**
     * Destructor.
     */
    dispose() {
        if (this.F) {
            clearTimeout(this.F);
            this.F = undefined;
        }
        if (this.K) {
            clearTimeout(this.K);
            this.K = undefined;
        }
        super.dispose();
    }
    /** Transaction kind. Deprecated. */
    get kind() {
        return "nict";
    }
    /**
     * Handler for incoming responses from the transport which match this transaction.
     * @param response - The incoming response.
     */
    receiveResponse(response) {
        const statusCode = response.statusCode;
        if (!statusCode || statusCode < 100 || statusCode > 699) {
            throw new Error(`Invalid status code ${statusCode}`);
        }
        switch (this.state) {
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Trying:
                // If a provisional response is received while in the "Trying" state, the
                // response MUST be passed to the TU, and then the client transaction
                // SHOULD move to the "Proceeding" state.
                // https://tools.ietf.org/html/rfc3261#section-17.1.2.2
                if (statusCode >= 100 && statusCode <= 199) {
                    this.stateTransition(_transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Proceeding);
                    if (this.user.receiveResponse) {
                        this.user.receiveResponse(response);
                    }
                    return;
                }
                // If a final response (status codes 200-699) is received while in the
                // "Trying" state, the response MUST be passed to the TU, and the
                // client transaction MUST transition to the "Completed" state.
                // https://tools.ietf.org/html/rfc3261#section-17.1.2.2
                if (statusCode >= 200 && statusCode <= 699) {
                    this.stateTransition(_transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Completed);
                    if (statusCode === 408) {
                        this.onRequestTimeout();
                        return;
                    }
                    if (this.user.receiveResponse) {
                        this.user.receiveResponse(response);
                    }
                    return;
                }
                break;
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Proceeding:
                // If a provisional response is received while in the "Proceeding" state,
                // the response MUST be passed to the TU. (From Figure 6)
                // https://tools.ietf.org/html/rfc3261#section-17.1.2.2
                if (statusCode >= 100 && statusCode <= 199) {
                    if (this.user.receiveResponse) {
                        return this.user.receiveResponse(response);
                    }
                }
                // If a final response (status codes 200-699) is received while in the
                // "Proceeding" state, the response MUST be passed to the TU, and the
                // client transaction MUST transition to the "Completed" state.
                // https://tools.ietf.org/html/rfc3261#section-17.1.2.2
                if (statusCode >= 200 && statusCode <= 699) {
                    this.stateTransition(_transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Completed);
                    if (statusCode === 408) {
                        this.onRequestTimeout();
                        return;
                    }
                    if (this.user.receiveResponse) {
                        this.user.receiveResponse(response);
                    }
                    return;
                }
                break;
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Completed:
                // The "Completed" state exists to buffer any additional response
                // retransmissions that may be received (which is why the client
                // transaction remains there only for unreliable transports).
                // https://tools.ietf.org/html/rfc3261#section-17.1.2.2
                return;
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Terminated:
                // For good measure just absorb additional response retransmissions.
                return;
            default:
                throw new Error(`Invalid state ${this.state}`);
        }
        const message = `Non-INVITE client transaction received unexpected ${statusCode} response while in state ${this.state}.`;
        this.logger.warn(message);
        return;
    }
    /**
     * The client transaction SHOULD inform the TU that a transport failure has occurred,
     * and the client transaction SHOULD transition directly to the "Terminated" state.
     * The TU will handle the fail over mechanisms described in [4].
     * https://tools.ietf.org/html/rfc3261#section-17.1.4
     * @param error - Transport error
     */
    onTransportError(error) {
        if (this.user.onTransportError) {
            this.user.onTransportError(error);
        }
        this.stateTransition(_transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Terminated, true);
    }
    /** For logging. */
    typeToString() {
        return "non-INVITE client transaction";
    }
    /**
     * Execute a state transition.
     * @param newState - New state.
     */
    stateTransition(newState, dueToTransportError = false) {
        // Assert valid state transitions.
        const invalidStateTransition = () => {
            throw new Error(`Invalid state transition from ${this.state} to ${newState}`);
        };
        switch (newState) {
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Trying:
                invalidStateTransition();
                break;
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Proceeding:
                if (this.state !== _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Trying) {
                    invalidStateTransition();
                }
                break;
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Completed:
                if (this.state !== _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Trying && this.state !== _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Proceeding) {
                    invalidStateTransition();
                }
                break;
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Terminated:
                if (this.state !== _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Trying &&
                    this.state !== _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Proceeding &&
                    this.state !== _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Completed) {
                    if (!dueToTransportError) {
                        invalidStateTransition();
                    }
                }
                break;
            default:
                invalidStateTransition();
        }
        // Once the client transaction enters the "Completed" state, it MUST set
        // Timer K to fire in T4 seconds for unreliable transports, and zero
        // seconds for reliable transports  The "Completed" state exists to
        // buffer any additional response retransmissions that may be received
        // (which is why the client transaction remains there only for unreliable transports).
        // https://tools.ietf.org/html/rfc3261#section-17.1.2.2
        if (newState === _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Completed) {
            if (this.F) {
                clearTimeout(this.F);
                this.F = undefined;
            }
            this.K = setTimeout(() => this.timerK(), _timers_js__WEBPACK_IMPORTED_MODULE_2__.Timers.TIMER_K);
        }
        // Once the transaction is in the terminated state, it MUST be destroyed immediately.
        // https://tools.ietf.org/html/rfc3261#section-17.1.2.2
        if (newState === _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Terminated) {
            this.dispose();
        }
        // Update state.
        this.setState(newState);
    }
    /**
     * If Timer F fires while the client transaction is still in the
     * "Trying" state, the client transaction SHOULD inform the TU about the
     * timeout, and then it SHOULD enter the "Terminated" state.
     * If timer F fires while in the "Proceeding" state, the TU MUST be informed of
     * a timeout, and the client transaction MUST transition to the terminated state.
     * https://tools.ietf.org/html/rfc3261#section-17.1.2.2
     */
    timerF() {
        this.logger.debug(`Timer F expired for non-INVITE client transaction ${this.id}.`);
        if (this.state === _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Trying || this.state === _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Proceeding) {
            this.onRequestTimeout();
            this.stateTransition(_transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Terminated);
        }
    }
    /**
     * If Timer K fires while in this (COMPLETED) state, the client transaction
     * MUST transition to the "Terminated" state.
     * https://tools.ietf.org/html/rfc3261#section-17.1.2.2
     */
    timerK() {
        if (this.state === _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Completed) {
            this.stateTransition(_transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Terminated);
        }
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/transactions/non-invite-server-transaction.js":
/*!************************************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/transactions/non-invite-server-transaction.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NonInviteServerTransaction": () => (/* binding */ NonInviteServerTransaction)
/* harmony export */ });
/* harmony import */ var _timers_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../timers.js */ "./node_modules/sip.js/lib/core/timers.js");
/* harmony import */ var _server_transaction_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./server-transaction.js */ "./node_modules/sip.js/lib/core/transactions/server-transaction.js");
/* harmony import */ var _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transaction-state.js */ "./node_modules/sip.js/lib/core/transactions/transaction-state.js");



/**
 * Non-INVITE Server Transaction.
 * @remarks
 * https://tools.ietf.org/html/rfc3261#section-17.2.2
 * @public
 */
class NonInviteServerTransaction extends _server_transaction_js__WEBPACK_IMPORTED_MODULE_0__.ServerTransaction {
    /**
     * Constructor.
     * After construction the transaction will be in the "trying": state and the transaction
     * `id` will equal the branch parameter set in the Via header of the incoming request.
     * https://tools.ietf.org/html/rfc3261#section-17.2.2
     * @param request - Incoming Non-INVITE request from the transport.
     * @param transport - The transport.
     * @param user - The transaction user.
     */
    constructor(request, transport, user) {
        super(request, transport, user, _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Trying, "sip.transaction.nist");
    }
    /**
     * Destructor.
     */
    dispose() {
        if (this.J) {
            clearTimeout(this.J);
            this.J = undefined;
        }
        super.dispose();
    }
    /** Transaction kind. Deprecated. */
    get kind() {
        return "nist";
    }
    /**
     * Receive requests from transport matching this transaction.
     * @param request - Request matching this transaction.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    receiveRequest(request) {
        switch (this.state) {
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Trying:
                // Once in the "Trying" state, any further request retransmissions are discarded.
                // https://tools.ietf.org/html/rfc3261#section-17.2.2
                break;
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Proceeding:
                // If a retransmission of the request is received while in the "Proceeding" state,
                // the most recently sent provisional response MUST be passed to the transport layer for retransmission.
                // https://tools.ietf.org/html/rfc3261#section-17.2.2
                if (!this.lastResponse) {
                    throw new Error("Last response undefined.");
                }
                this.send(this.lastResponse).catch((error) => {
                    this.logTransportError(error, "Failed to send retransmission of provisional response.");
                });
                break;
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Completed:
                // While in the "Completed" state, the server transaction MUST pass the final response to the transport
                // layer for retransmission whenever a retransmission of the request is received. Any other final responses
                // passed by the TU to the server transaction MUST be discarded while in the "Completed" state.
                // https://tools.ietf.org/html/rfc3261#section-17.2.2
                if (!this.lastResponse) {
                    throw new Error("Last response undefined.");
                }
                this.send(this.lastResponse).catch((error) => {
                    this.logTransportError(error, "Failed to send retransmission of final response.");
                });
                break;
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Terminated:
                break;
            default:
                throw new Error(`Invalid state ${this.state}`);
        }
    }
    /**
     * Receive responses from TU for this transaction.
     * @param statusCode - Status code of response. 101-199 not allowed per RFC 4320.
     * @param response - Response to send.
     */
    receiveResponse(statusCode, response) {
        if (statusCode < 100 || statusCode > 699) {
            throw new Error(`Invalid status code ${statusCode}`);
        }
        // An SIP element MUST NOT send any provisional response with a
        // Status-Code other than 100 to a non-INVITE request.
        // An SIP element MUST NOT respond to a non-INVITE request with a
        // Status-Code of 100 over any unreliable transport, such as UDP,
        // before the amount of time it takes a client transaction's Timer E to be reset to T2.
        // An SIP element MAY respond to a non-INVITE request with a
        // Status-Code of 100 over a reliable transport at any time.
        // https://tools.ietf.org/html/rfc4320#section-4.1
        if (statusCode > 100 && statusCode <= 199) {
            throw new Error("Provisional response other than 100 not allowed.");
        }
        switch (this.state) {
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Trying:
                // While in the "Trying" state, if the TU passes a provisional response
                // to the server transaction, the server transaction MUST enter the "Proceeding" state.
                // The response MUST be passed to the transport layer for transmission.
                // https://tools.ietf.org/html/rfc3261#section-17.2.2
                this.lastResponse = response;
                if (statusCode >= 100 && statusCode < 200) {
                    this.stateTransition(_transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Proceeding);
                    this.send(response).catch((error) => {
                        this.logTransportError(error, "Failed to send provisional response.");
                    });
                    return;
                }
                if (statusCode >= 200 && statusCode <= 699) {
                    this.stateTransition(_transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Completed);
                    this.send(response).catch((error) => {
                        this.logTransportError(error, "Failed to send final response.");
                    });
                    return;
                }
                break;
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Proceeding:
                // Any further provisional responses that are received from the TU while
                // in the "Proceeding" state MUST be passed to the transport layer for transmission.
                // If the TU passes a final response (status codes 200-699) to the server while in
                // the "Proceeding" state, the transaction MUST enter the "Completed" state, and
                // the response MUST be passed to the transport layer for transmission.
                // https://tools.ietf.org/html/rfc3261#section-17.2.2
                this.lastResponse = response;
                if (statusCode >= 200 && statusCode <= 699) {
                    this.stateTransition(_transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Completed);
                    this.send(response).catch((error) => {
                        this.logTransportError(error, "Failed to send final response.");
                    });
                    return;
                }
                break;
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Completed:
                // Any other final responses passed by the TU to the server
                // transaction MUST be discarded while in the "Completed" state.
                // https://tools.ietf.org/html/rfc3261#section-17.2.2
                return;
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Terminated:
                break;
            default:
                throw new Error(`Invalid state ${this.state}`);
        }
        const message = `Non-INVITE server transaction received unexpected ${statusCode} response from TU while in state ${this.state}.`;
        this.logger.error(message);
        throw new Error(message);
    }
    /**
     * First, the procedures in [4] are followed, which attempt to deliver the response to a backup.
     * If those should all fail, based on the definition of failure in [4], the server transaction SHOULD
     * inform the TU that a failure has occurred, and SHOULD transition to the terminated state.
     * https://tools.ietf.org/html/rfc3261#section-17.2.4
     */
    onTransportError(error) {
        if (this.user.onTransportError) {
            this.user.onTransportError(error);
        }
        this.stateTransition(_transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Terminated, true);
    }
    /** For logging. */
    typeToString() {
        return "non-INVITE server transaction";
    }
    stateTransition(newState, dueToTransportError = false) {
        // Assert valid state transitions.
        const invalidStateTransition = () => {
            throw new Error(`Invalid state transition from ${this.state} to ${newState}`);
        };
        switch (newState) {
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Trying:
                invalidStateTransition();
                break;
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Proceeding:
                if (this.state !== _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Trying) {
                    invalidStateTransition();
                }
                break;
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Completed:
                if (this.state !== _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Trying && this.state !== _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Proceeding) {
                    invalidStateTransition();
                }
                break;
            case _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Terminated:
                if (this.state !== _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Proceeding && this.state !== _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Completed) {
                    if (!dueToTransportError) {
                        invalidStateTransition();
                    }
                }
                break;
            default:
                invalidStateTransition();
        }
        // When the server transaction enters the "Completed" state, it MUST set Timer J to fire
        // in 64*T1 seconds for unreliable transports, and zero seconds for reliable transports.
        // https://tools.ietf.org/html/rfc3261#section-17.2.2
        if (newState === _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Completed) {
            this.J = setTimeout(() => this.timerJ(), _timers_js__WEBPACK_IMPORTED_MODULE_2__.Timers.TIMER_J);
        }
        // The server transaction MUST be destroyed the instant it enters the "Terminated" state.
        // https://tools.ietf.org/html/rfc3261#section-17.2.2
        if (newState === _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Terminated) {
            this.dispose();
        }
        this.setState(newState);
    }
    /**
     * The server transaction remains in this state until Timer J fires,
     * at which point it MUST transition to the "Terminated" state.
     * https://tools.ietf.org/html/rfc3261#section-17.2.2
     */
    timerJ() {
        this.logger.debug(`Timer J expired for NON-INVITE server transaction ${this.id}.`);
        if (this.state === _transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Completed) {
            this.stateTransition(_transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Terminated);
        }
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/transactions/server-transaction.js":
/*!*************************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/transactions/server-transaction.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ServerTransaction": () => (/* binding */ ServerTransaction)
/* harmony export */ });
/* harmony import */ var _transaction_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transaction.js */ "./node_modules/sip.js/lib/core/transactions/transaction.js");

/**
 * Server Transaction.
 * @remarks
 * The server transaction is responsible for the delivery of requests to
 * the TU and the reliable transmission of responses.  It accomplishes
 * this through a state machine.  Server transactions are created by the
 * core when a request is received, and transaction handling is desired
 * for that request (this is not always the case).
 * https://tools.ietf.org/html/rfc3261#section-17.2
 * @public
 */
class ServerTransaction extends _transaction_js__WEBPACK_IMPORTED_MODULE_0__.Transaction {
    constructor(_request, transport, user, state, loggerCategory) {
        super(transport, user, _request.viaBranch, state, loggerCategory);
        this._request = _request;
        this.user = user;
    }
    /** The incoming request the transaction handling. */
    get request() {
        return this._request;
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/transactions/transaction-state.js":
/*!************************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/transactions/transaction-state.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "TransactionState": () => (/* binding */ TransactionState)
/* harmony export */ });
/**
 * Transaction state.
 * @public
 */
var TransactionState;
(function (TransactionState) {
    TransactionState["Accepted"] = "Accepted";
    TransactionState["Calling"] = "Calling";
    TransactionState["Completed"] = "Completed";
    TransactionState["Confirmed"] = "Confirmed";
    TransactionState["Proceeding"] = "Proceeding";
    TransactionState["Terminated"] = "Terminated";
    TransactionState["Trying"] = "Trying";
})(TransactionState = TransactionState || (TransactionState = {}));


/***/ }),

/***/ "./node_modules/sip.js/lib/core/transactions/transaction.js":
/*!******************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/transactions/transaction.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Transaction": () => (/* binding */ Transaction)
/* harmony export */ });
/* harmony import */ var _exceptions_transport_error_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../exceptions/transport-error.js */ "./node_modules/sip.js/lib/core/exceptions/transport-error.js");

/**
 * Transaction.
 * @remarks
 * SIP is a transactional protocol: interactions between components take
 * place in a series of independent message exchanges.  Specifically, a
 * SIP transaction consists of a single request and any responses to
 * that request, which include zero or more provisional responses and
 * one or more final responses.  In the case of a transaction where the
 * request was an INVITE (known as an INVITE transaction), the
 * transaction also includes the ACK only if the final response was not
 * a 2xx response.  If the response was a 2xx, the ACK is not considered
 * part of the transaction.
 * https://tools.ietf.org/html/rfc3261#section-17
 * @public
 */
class Transaction {
    constructor(_transport, _user, _id, _state, loggerCategory) {
        this._transport = _transport;
        this._user = _user;
        this._id = _id;
        this._state = _state;
        this.listeners = new Array();
        this.logger = _user.loggerFactory.getLogger(loggerCategory, _id);
        this.logger.debug(`Constructing ${this.typeToString()} with id ${this.id}.`);
    }
    /**
     * Destructor.
     * Once the transaction is in the "terminated" state, it is destroyed
     * immediately and there is no need to call `dispose`. However, if a
     * transaction needs to be ended prematurely, the transaction user may
     * do so by calling this method (for example, perhaps the UA is shutting down).
     * No state transition will occur upon calling this method, all outstanding
     * transmission timers will be cancelled, and use of the transaction after
     * calling `dispose` is undefined.
     */
    dispose() {
        this.logger.debug(`Destroyed ${this.typeToString()} with id ${this.id}.`);
    }
    /** Transaction id. */
    get id() {
        return this._id;
    }
    /** Transaction kind. Deprecated. */
    get kind() {
        throw new Error("Invalid kind.");
    }
    /** Transaction state. */
    get state() {
        return this._state;
    }
    /** Transaction transport. */
    get transport() {
        return this._transport;
    }
    /**
     * Sets up a function that will be called whenever the transaction state changes.
     * @param listener - Callback function.
     * @param options - An options object that specifies characteristics about the listener.
     *                  If once true, indicates that the listener should be invoked at most once after being added.
     *                  If once true, the listener would be automatically removed when invoked.
     */
    addStateChangeListener(listener, options) {
        const onceWrapper = () => {
            this.removeStateChangeListener(onceWrapper);
            listener();
        };
        (options === null || options === void 0 ? void 0 : options.once) === true ? this.listeners.push(onceWrapper) : this.listeners.push(listener);
    }
    /**
     * This is currently public so tests may spy on it.
     * @internal
     */
    notifyStateChangeListeners() {
        this.listeners.slice().forEach((listener) => listener());
    }
    /**
     * Removes a listener previously registered with addStateListener.
     * @param listener - Callback function.
     */
    removeStateChangeListener(listener) {
        this.listeners = this.listeners.filter((l) => l !== listener);
    }
    logTransportError(error, message) {
        this.logger.error(error.message);
        this.logger.error(`Transport error occurred in ${this.typeToString()} with id ${this.id}.`);
        this.logger.error(message);
    }
    /**
     * Pass message to transport for transmission. If transport fails,
     * the transaction user is notified by callback to onTransportError().
     * @returns
     * Rejects with `TransportError` if transport fails.
     */
    send(message) {
        return this.transport.send(message).catch((error) => {
            // If the transport rejects, it SHOULD reject with a TransportError.
            // But the transport may be external code, so we are careful
            // make sure we convert it to a TransportError if need be.
            if (error instanceof _exceptions_transport_error_js__WEBPACK_IMPORTED_MODULE_0__.TransportError) {
                this.onTransportError(error);
                throw error;
            }
            let transportError;
            if (error && typeof error.message === "string") {
                transportError = new _exceptions_transport_error_js__WEBPACK_IMPORTED_MODULE_0__.TransportError(error.message);
            }
            else {
                transportError = new _exceptions_transport_error_js__WEBPACK_IMPORTED_MODULE_0__.TransportError();
            }
            this.onTransportError(transportError);
            throw transportError;
        });
    }
    setState(state) {
        this.logger.debug(`State change to "${state}" on ${this.typeToString()} with id ${this.id}.`);
        this._state = state;
        if (this._user.onStateChange) {
            this._user.onStateChange(state);
        }
        this.notifyStateChangeListeners();
    }
    typeToString() {
        return "UnknownType";
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/user-agent-core/allowed-methods.js":
/*!*************************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/user-agent-core/allowed-methods.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AllowedMethods": () => (/* binding */ AllowedMethods)
/* harmony export */ });
/* harmony import */ var _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../messages/methods/constants.js */ "./node_modules/sip.js/lib/core/messages/methods/constants.js");

/**
 * FIXME: TODO: Should be configurable/variable.
 */
const AllowedMethods = [
    _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_0__.C.ACK,
    _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_0__.C.BYE,
    _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_0__.C.CANCEL,
    _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_0__.C.INFO,
    _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_0__.C.INVITE,
    _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_0__.C.MESSAGE,
    _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_0__.C.NOTIFY,
    _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_0__.C.OPTIONS,
    _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_0__.C.PRACK,
    _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_0__.C.REFER,
    _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_0__.C.REGISTER,
    _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_0__.C.SUBSCRIBE
];


/***/ }),

/***/ "./node_modules/sip.js/lib/core/user-agent-core/index.js":
/*!***************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/user-agent-core/index.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserAgentCore": () => (/* reexport safe */ _user_agent_core_js__WEBPACK_IMPORTED_MODULE_0__.UserAgentCore)
/* harmony export */ });
/* harmony import */ var _user_agent_core_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-agent-core.js */ "./node_modules/sip.js/lib/core/user-agent-core/user-agent-core.js");





/***/ }),

/***/ "./node_modules/sip.js/lib/core/user-agent-core/user-agent-core.js":
/*!*************************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/user-agent-core/user-agent-core.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserAgentCore": () => (/* binding */ UserAgentCore)
/* harmony export */ });
/* harmony import */ var _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../messages/methods/constants.js */ "./node_modules/sip.js/lib/core/messages/methods/constants.js");
/* harmony import */ var _messages_outgoing_request_message_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../messages/outgoing-request-message.js */ "./node_modules/sip.js/lib/core/messages/outgoing-request-message.js");
/* harmony import */ var _messages_outgoing_response_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../messages/outgoing-response.js */ "./node_modules/sip.js/lib/core/messages/outgoing-response.js");
/* harmony import */ var _transactions_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../transactions/invite-server-transaction.js */ "./node_modules/sip.js/lib/core/transactions/invite-server-transaction.js");
/* harmony import */ var _transactions_non_invite_client_transaction_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../transactions/non-invite-client-transaction.js */ "./node_modules/sip.js/lib/core/transactions/non-invite-client-transaction.js");
/* harmony import */ var _transactions_transaction_state_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../transactions/transaction-state.js */ "./node_modules/sip.js/lib/core/transactions/transaction-state.js");
/* harmony import */ var _user_agents_invite_user_agent_client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../user-agents/invite-user-agent-client.js */ "./node_modules/sip.js/lib/core/user-agents/invite-user-agent-client.js");
/* harmony import */ var _user_agents_invite_user_agent_server_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../user-agents/invite-user-agent-server.js */ "./node_modules/sip.js/lib/core/user-agents/invite-user-agent-server.js");
/* harmony import */ var _user_agents_message_user_agent_client_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../user-agents/message-user-agent-client.js */ "./node_modules/sip.js/lib/core/user-agents/message-user-agent-client.js");
/* harmony import */ var _user_agents_message_user_agent_server_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../user-agents/message-user-agent-server.js */ "./node_modules/sip.js/lib/core/user-agents/message-user-agent-server.js");
/* harmony import */ var _user_agents_notify_user_agent_server_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../user-agents/notify-user-agent-server.js */ "./node_modules/sip.js/lib/core/user-agents/notify-user-agent-server.js");
/* harmony import */ var _user_agents_publish_user_agent_client_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../user-agents/publish-user-agent-client.js */ "./node_modules/sip.js/lib/core/user-agents/publish-user-agent-client.js");
/* harmony import */ var _user_agents_refer_user_agent_server_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../user-agents/refer-user-agent-server.js */ "./node_modules/sip.js/lib/core/user-agents/refer-user-agent-server.js");
/* harmony import */ var _user_agents_register_user_agent_client_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../user-agents/register-user-agent-client.js */ "./node_modules/sip.js/lib/core/user-agents/register-user-agent-client.js");
/* harmony import */ var _user_agents_register_user_agent_server_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../user-agents/register-user-agent-server.js */ "./node_modules/sip.js/lib/core/user-agents/register-user-agent-server.js");
/* harmony import */ var _user_agents_subscribe_user_agent_client_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../user-agents/subscribe-user-agent-client.js */ "./node_modules/sip.js/lib/core/user-agents/subscribe-user-agent-client.js");
/* harmony import */ var _user_agents_subscribe_user_agent_server_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../user-agents/subscribe-user-agent-server.js */ "./node_modules/sip.js/lib/core/user-agents/subscribe-user-agent-server.js");
/* harmony import */ var _user_agents_user_agent_client_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../user-agents/user-agent-client.js */ "./node_modules/sip.js/lib/core/user-agents/user-agent-client.js");
/* harmony import */ var _allowed_methods_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./allowed-methods.js */ "./node_modules/sip.js/lib/core/user-agent-core/allowed-methods.js");



















/**
 * This is ported from UA.C.ACCEPTED_BODY_TYPES.
 * FIXME: TODO: Should be configurable/variable.
 */
const acceptedBodyTypes = ["application/sdp", "application/dtmf-relay"];
/**
 * User Agent Core.
 * @remarks
 * Core designates the functions specific to a particular type
 * of SIP entity, i.e., specific to either a stateful or stateless
 * proxy, a user agent or registrar.  All cores, except those for
 * the stateless proxy, are transaction users.
 * https://tools.ietf.org/html/rfc3261#section-6
 *
 * UAC Core: The set of processing functions required of a UAC that
 * reside above the transaction and transport layers.
 * https://tools.ietf.org/html/rfc3261#section-6
 *
 * UAS Core: The set of processing functions required at a UAS that
 * resides above the transaction and transport layers.
 * https://tools.ietf.org/html/rfc3261#section-6
 * @public
 */
class UserAgentCore {
    /**
     * Constructor.
     * @param configuration - Configuration.
     * @param delegate - Delegate.
     */
    constructor(configuration, delegate = {}) {
        /** UACs. */
        this.userAgentClients = new Map();
        /** UASs. */
        this.userAgentServers = new Map();
        this.configuration = configuration;
        this.delegate = delegate;
        this.dialogs = new Map();
        this.subscribers = new Map();
        this.logger = configuration.loggerFactory.getLogger("sip.user-agent-core");
    }
    /** Destructor. */
    dispose() {
        this.reset();
    }
    /** Reset. */
    reset() {
        this.dialogs.forEach((dialog) => dialog.dispose());
        this.dialogs.clear();
        this.subscribers.forEach((subscriber) => subscriber.dispose());
        this.subscribers.clear();
        this.userAgentClients.forEach((uac) => uac.dispose());
        this.userAgentClients.clear();
        this.userAgentServers.forEach((uac) => uac.dispose());
        this.userAgentServers.clear();
    }
    /** Logger factory. */
    get loggerFactory() {
        return this.configuration.loggerFactory;
    }
    /** Transport. */
    get transport() {
        const transport = this.configuration.transportAccessor();
        if (!transport) {
            throw new Error("Transport undefined.");
        }
        return transport;
    }
    /**
     * Send INVITE.
     * @param request - Outgoing request.
     * @param delegate - Request delegate.
     */
    invite(request, delegate) {
        return new _user_agents_invite_user_agent_client_js__WEBPACK_IMPORTED_MODULE_0__.InviteUserAgentClient(this, request, delegate);
    }
    /**
     * Send MESSAGE.
     * @param request - Outgoing request.
     * @param delegate - Request delegate.
     */
    message(request, delegate) {
        return new _user_agents_message_user_agent_client_js__WEBPACK_IMPORTED_MODULE_1__.MessageUserAgentClient(this, request, delegate);
    }
    /**
     * Send PUBLISH.
     * @param request - Outgoing request.
     * @param delegate - Request delegate.
     */
    publish(request, delegate) {
        return new _user_agents_publish_user_agent_client_js__WEBPACK_IMPORTED_MODULE_2__.PublishUserAgentClient(this, request, delegate);
    }
    /**
     * Send REGISTER.
     * @param request - Outgoing request.
     * @param delegate - Request delegate.
     */
    register(request, delegate) {
        return new _user_agents_register_user_agent_client_js__WEBPACK_IMPORTED_MODULE_3__.RegisterUserAgentClient(this, request, delegate);
    }
    /**
     * Send SUBSCRIBE.
     * @param request - Outgoing request.
     * @param delegate - Request delegate.
     */
    subscribe(request, delegate) {
        return new _user_agents_subscribe_user_agent_client_js__WEBPACK_IMPORTED_MODULE_4__.SubscribeUserAgentClient(this, request, delegate);
    }
    /**
     * Send a request.
     * @param request - Outgoing request.
     * @param delegate - Request delegate.
     */
    request(request, delegate) {
        return new _user_agents_user_agent_client_js__WEBPACK_IMPORTED_MODULE_5__.UserAgentClient(_transactions_non_invite_client_transaction_js__WEBPACK_IMPORTED_MODULE_6__.NonInviteClientTransaction, this, request, delegate);
    }
    /**
     * Outgoing request message factory function.
     * @param method - Method.
     * @param requestURI - Request-URI.
     * @param fromURI - From URI.
     * @param toURI - To URI.
     * @param options - Request options.
     * @param extraHeaders - Extra headers to add.
     * @param body - Message body.
     */
    makeOutgoingRequestMessage(method, requestURI, fromURI, toURI, options, extraHeaders, body) {
        // default values from user agent configuration
        const callIdPrefix = this.configuration.sipjsId;
        const fromDisplayName = this.configuration.displayName;
        const forceRport = this.configuration.viaForceRport;
        const hackViaTcp = this.configuration.hackViaTcp;
        const optionTags = this.configuration.supportedOptionTags.slice();
        if (method === _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_7__.C.REGISTER) {
            optionTags.push("path", "gruu");
        }
        if (method === _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_7__.C.INVITE && (this.configuration.contact.pubGruu || this.configuration.contact.tempGruu)) {
            optionTags.push("gruu");
        }
        const routeSet = this.configuration.routeSet;
        const userAgentString = this.configuration.userAgentHeaderFieldValue;
        const viaHost = this.configuration.viaHost;
        const defaultOptions = {
            callIdPrefix,
            forceRport,
            fromDisplayName,
            hackViaTcp,
            optionTags,
            routeSet,
            userAgentString,
            viaHost
        };
        // merge provided options with default options
        const requestOptions = Object.assign(Object.assign({}, defaultOptions), options);
        return new _messages_outgoing_request_message_js__WEBPACK_IMPORTED_MODULE_8__.OutgoingRequestMessage(method, requestURI, fromURI, toURI, requestOptions, extraHeaders, body);
    }
    /**
     * Handle an incoming request message from the transport.
     * @param message - Incoming request message from transport layer.
     */
    receiveIncomingRequestFromTransport(message) {
        this.receiveRequestFromTransport(message);
    }
    /**
     * Handle an incoming response message from the transport.
     * @param message - Incoming response message from transport layer.
     */
    receiveIncomingResponseFromTransport(message) {
        this.receiveResponseFromTransport(message);
    }
    /**
     * A stateless UAS is a UAS that does not maintain transaction state.
     * It replies to requests normally, but discards any state that would
     * ordinarily be retained by a UAS after a response has been sent.  If a
     * stateless UAS receives a retransmission of a request, it regenerates
     * the response and re-sends it, just as if it were replying to the first
     * instance of the request. A UAS cannot be stateless unless the request
     * processing for that method would always result in the same response
     * if the requests are identical. This rules out stateless registrars,
     * for example.  Stateless UASs do not use a transaction layer; they
     * receive requests directly from the transport layer and send responses
     * directly to the transport layer.
     * https://tools.ietf.org/html/rfc3261#section-8.2.7
     * @param message - Incoming request message to reply to.
     * @param statusCode - Status code to reply with.
     */
    replyStateless(message, options) {
        const userAgent = this.configuration.userAgentHeaderFieldValue;
        const supported = this.configuration.supportedOptionTagsResponse;
        options = Object.assign(Object.assign({}, options), { userAgent, supported });
        const response = (0,_messages_outgoing_response_js__WEBPACK_IMPORTED_MODULE_9__.constructOutgoingResponse)(message, options);
        this.transport.send(response.message).catch((error) => {
            // If the transport rejects, it SHOULD reject with a TransportError.
            // But the transport may be external code, so we are careful...
            if (error instanceof Error) {
                this.logger.error(error.message);
            }
            this.logger.error(`Transport error occurred sending stateless reply to ${message.method} request.`);
            // TODO: Currently there is no hook to provide notification that a transport error occurred
            // and throwing would result in an uncaught error (in promise), so we silently eat the error.
            // Furthermore, silently eating stateless reply transport errors is arguably what we want to do here.
        });
        return response;
    }
    /**
     * In Section 18.2.1, replace the last paragraph with:
     *
     * Next, the server transport attempts to match the request to a
     * server transaction.  It does so using the matching rules described
     * in Section 17.2.3.  If a matching server transaction is found, the
     * request is passed to that transaction for processing.  If no match
     * is found, the request is passed to the core, which may decide to
     * construct a new server transaction for that request.
     * https://tools.ietf.org/html/rfc6026#section-8.10
     * @param message - Incoming request message from transport layer.
     */
    receiveRequestFromTransport(message) {
        // When a request is received from the network by the server, it has to
        // be matched to an existing transaction.  This is accomplished in the
        // following manner.
        //
        // The branch parameter in the topmost Via header field of the request
        // is examined.  If it is present and begins with the magic cookie
        // "z9hG4bK", the request was generated by a client transaction
        // compliant to this specification.  Therefore, the branch parameter
        // will be unique across all transactions sent by that client.  The
        // request matches a transaction if:
        //
        //    1. the branch parameter in the request is equal to the one in the
        //       top Via header field of the request that created the
        //       transaction, and
        //
        //    2. the sent-by value in the top Via of the request is equal to the
        //       one in the request that created the transaction, and
        //
        //    3. the method of the request matches the one that created the
        //       transaction, except for ACK, where the method of the request
        //       that created the transaction is INVITE.
        //
        // This matching rule applies to both INVITE and non-INVITE transactions
        // alike.
        //
        //    The sent-by value is used as part of the matching process because
        //    there could be accidental or malicious duplication of branch
        //    parameters from different clients.
        // https://tools.ietf.org/html/rfc3261#section-17.2.3
        const transactionId = message.viaBranch; // FIXME: Currently only using rule 1...
        const uas = this.userAgentServers.get(transactionId);
        // When receiving an ACK that matches an existing INVITE server
        // transaction and that does not contain a branch parameter containing
        // the magic cookie defined in RFC 3261, the matching transaction MUST
        // be checked to see if it is in the "Accepted" state.  If it is, then
        // the ACK must be passed directly to the transaction user instead of
        // being absorbed by the transaction state machine.  This is necessary
        // as requests from RFC 2543 clients will not include a unique branch
        // parameter, and the mechanisms for calculating the transaction ID from
        // such a request will be the same for both INVITE and ACKs.
        // https://tools.ietf.org/html/rfc6026#section-6
        // Any ACKs received from the network while in the "Accepted" state MUST be
        // passed directly to the TU and not absorbed.
        // https://tools.ietf.org/html/rfc6026#section-7.1
        if (message.method === _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_7__.C.ACK) {
            if (uas && uas.transaction.state === _transactions_transaction_state_js__WEBPACK_IMPORTED_MODULE_10__.TransactionState.Accepted) {
                if (uas instanceof _user_agents_invite_user_agent_server_js__WEBPACK_IMPORTED_MODULE_11__.InviteUserAgentServer) {
                    // These are ACKs matching an INVITE server transaction.
                    // These should never happen with RFC 3261 compliant user agents
                    // (would be a broken ACK to negative final response or something)
                    // but is apparently how RFC 2543 user agents do things.
                    // We are not currently supporting this case.
                    // NOTE: Not backwards compatible with RFC 2543 (no support for strict-routing).
                    this.logger.warn(`Discarding out of dialog ACK after 2xx response sent on transaction ${transactionId}.`);
                    return;
                }
            }
        }
        // The CANCEL method requests that the TU at the server side cancel a
        // pending transaction.  The TU determines the transaction to be
        // cancelled by taking the CANCEL request, and then assuming that the
        // request method is anything but CANCEL or ACK and applying the
        // transaction matching procedures of Section 17.2.3.  The matching
        // transaction is the one to be cancelled.
        // https://tools.ietf.org/html/rfc3261#section-9.2
        if (message.method === _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_7__.C.CANCEL) {
            if (uas) {
                // Regardless of the method of the original request, as long as the
                // CANCEL matched an existing transaction, the UAS answers the CANCEL
                // request itself with a 200 (OK) response.
                // https://tools.ietf.org/html/rfc3261#section-9.2
                this.replyStateless(message, { statusCode: 200 });
                // If the transaction for the original request still exists, the behavior
                // of the UAS on receiving a CANCEL request depends on whether it has already
                // sent a final response for the original request. If it has, the CANCEL
                // request has no effect on the processing of the original request, no
                // effect on any session state, and no effect on the responses generated
                // for the original request. If the UAS has not issued a final response
                // for the original request, its behavior depends on the method of the
                // original request. If the original request was an INVITE, the UAS
                // SHOULD immediately respond to the INVITE with a 487 (Request
                // Terminated).
                // https://tools.ietf.org/html/rfc3261#section-9.2
                if (uas.transaction instanceof _transactions_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_12__.InviteServerTransaction &&
                    uas.transaction.state === _transactions_transaction_state_js__WEBPACK_IMPORTED_MODULE_10__.TransactionState.Proceeding) {
                    if (uas instanceof _user_agents_invite_user_agent_server_js__WEBPACK_IMPORTED_MODULE_11__.InviteUserAgentServer) {
                        uas.receiveCancel(message);
                    }
                    // A CANCEL request has no impact on the processing of
                    // transactions with any other method defined in this specification.
                    // https://tools.ietf.org/html/rfc3261#section-9.2
                }
            }
            else {
                // If the UAS did not find a matching transaction for the CANCEL
                // according to the procedure above, it SHOULD respond to the CANCEL
                // with a 481 (Call Leg/Transaction Does Not Exist).
                // https://tools.ietf.org/html/rfc3261#section-9.2
                this.replyStateless(message, { statusCode: 481 });
            }
            return;
        }
        // If a matching server transaction is found, the request is passed to that
        // transaction for processing.
        // https://tools.ietf.org/html/rfc6026#section-8.10
        if (uas) {
            uas.transaction.receiveRequest(message);
            return;
        }
        // If no match is found, the request is passed to the core, which may decide to
        // construct a new server transaction for that request.
        // https://tools.ietf.org/html/rfc6026#section-8.10
        this.receiveRequest(message);
        return;
    }
    /**
     * UAC and UAS procedures depend strongly on two factors.  First, based
     * on whether the request or response is inside or outside of a dialog,
     * and second, based on the method of a request.  Dialogs are discussed
     * thoroughly in Section 12; they represent a peer-to-peer relationship
     * between user agents and are established by specific SIP methods, such
     * as INVITE.
     * @param message - Incoming request message.
     */
    receiveRequest(message) {
        // 8.2 UAS Behavior
        // UASs SHOULD process the requests in the order of the steps that
        // follow in this section (that is, starting with authentication, then
        // inspecting the method, the header fields, and so on throughout the
        // remainder of this section).
        // https://tools.ietf.org/html/rfc3261#section-8.2
        // 8.2.1 Method Inspection
        // Once a request is authenticated (or authentication is skipped), the
        // UAS MUST inspect the method of the request.  If the UAS recognizes
        // but does not support the method of a request, it MUST generate a 405
        // (Method Not Allowed) response.  Procedures for generating responses
        // are described in Section 8.2.6.  The UAS MUST also add an Allow
        // header field to the 405 (Method Not Allowed) response.  The Allow
        // header field MUST list the set of methods supported by the UAS
        // generating the message.
        // https://tools.ietf.org/html/rfc3261#section-8.2.1
        if (!_allowed_methods_js__WEBPACK_IMPORTED_MODULE_13__.AllowedMethods.includes(message.method)) {
            const allowHeader = "Allow: " + _allowed_methods_js__WEBPACK_IMPORTED_MODULE_13__.AllowedMethods.toString();
            this.replyStateless(message, {
                statusCode: 405,
                extraHeaders: [allowHeader]
            });
            return;
        }
        // 8.2.2 Header Inspection
        // https://tools.ietf.org/html/rfc3261#section-8.2.2
        if (!message.ruri) {
            // FIXME: A request message should always have an ruri
            throw new Error("Request-URI undefined.");
        }
        // 8.2.2.1 To and Request-URI
        // If the Request-URI uses a scheme not supported by the UAS, it SHOULD
        // reject the request with a 416 (Unsupported URI Scheme) response.
        // https://tools.ietf.org/html/rfc3261#section-8.2.2.1
        if (message.ruri.scheme !== "sip") {
            this.replyStateless(message, { statusCode: 416 });
            return;
        }
        // 8.2.2.1 To and Request-URI
        // If the Request-URI does not identify an address that the
        // UAS is willing to accept requests for, it SHOULD reject
        // the request with a 404 (Not Found) response.
        // https://tools.ietf.org/html/rfc3261#section-8.2.2.1
        const ruri = message.ruri;
        const ruriMatches = (uri) => {
            return !!uri && uri.user === ruri.user;
        };
        if (!ruriMatches(this.configuration.aor) &&
            !(ruriMatches(this.configuration.contact.uri) ||
                ruriMatches(this.configuration.contact.pubGruu) ||
                ruriMatches(this.configuration.contact.tempGruu))) {
            this.logger.warn("Request-URI does not point to us.");
            if (message.method !== _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_7__.C.ACK) {
                this.replyStateless(message, { statusCode: 404 });
            }
            return;
        }
        // 8.2.2.1 To and Request-URI
        // Other potential sources of received Request-URIs include
        // the Contact header fields of requests and responses sent by the UA
        // that establish or refresh dialogs.
        // https://tools.ietf.org/html/rfc3261#section-8.2.2.1
        if (message.method === _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_7__.C.INVITE) {
            if (!message.hasHeader("Contact")) {
                this.replyStateless(message, {
                    statusCode: 400,
                    reasonPhrase: "Missing Contact Header"
                });
                return;
            }
        }
        // 8.2.2.2 Merged Requests
        // If the request has no tag in the To header field, the UAS core MUST
        // check the request against ongoing transactions.  If the From tag,
        // Call-ID, and CSeq exactly match those associated with an ongoing
        // transaction, but the request does not match that transaction (based
        // on the matching rules in Section 17.2.3), the UAS core SHOULD
        // generate a 482 (Loop Detected) response and pass it to the server
        // transaction.
        //
        //    The same request has arrived at the UAS more than once, following
        //    different paths, most likely due to forking.  The UAS processes
        //    the first such request received and responds with a 482 (Loop
        //    Detected) to the rest of them.
        // https://tools.ietf.org/html/rfc3261#section-8.2.2.2
        if (!message.toTag) {
            const transactionId = message.viaBranch;
            if (!this.userAgentServers.has(transactionId)) {
                const mergedRequest = Array.from(this.userAgentServers.values()).some((uas) => uas.transaction.request.fromTag === message.fromTag &&
                    uas.transaction.request.callId === message.callId &&
                    uas.transaction.request.cseq === message.cseq);
                if (mergedRequest) {
                    this.replyStateless(message, { statusCode: 482 });
                    return;
                }
            }
        }
        // 8.2.2.3 Require
        // https://tools.ietf.org/html/rfc3261#section-8.2.2.3
        // TODO
        // 8.2.3 Content Processing
        // https://tools.ietf.org/html/rfc3261#section-8.2.3
        // TODO
        // 8.2.4 Applying Extensions
        // https://tools.ietf.org/html/rfc3261#section-8.2.4
        // TODO
        // 8.2.5 Processing the Request
        // Assuming all of the checks in the previous subsections are passed,
        // the UAS processing becomes method-specific.
        // https://tools.ietf.org/html/rfc3261#section-8.2.5
        // The UAS will receive the request from the transaction layer.  If the
        // request has a tag in the To header field, the UAS core computes the
        // dialog identifier corresponding to the request and compares it with
        // existing dialogs.  If there is a match, this is a mid-dialog request.
        // In that case, the UAS first applies the same processing rules for
        // requests outside of a dialog, discussed in Section 8.2.
        // https://tools.ietf.org/html/rfc3261#section-12.2.2
        if (message.toTag) {
            this.receiveInsideDialogRequest(message);
        }
        else {
            this.receiveOutsideDialogRequest(message);
        }
        return;
    }
    /**
     * Once a dialog has been established between two UAs, either of them
     * MAY initiate new transactions as needed within the dialog.  The UA
     * sending the request will take the UAC role for the transaction.  The
     * UA receiving the request will take the UAS role.  Note that these may
     * be different roles than the UAs held during the transaction that
     * established the dialog.
     * https://tools.ietf.org/html/rfc3261#section-12.2
     * @param message - Incoming request message.
     */
    receiveInsideDialogRequest(message) {
        // NOTIFY requests are matched to such SUBSCRIBE requests if they
        // contain the same "Call-ID", a "To" header field "tag" parameter that
        // matches the "From" header field "tag" parameter of the SUBSCRIBE
        // request, and the same "Event" header field.  Rules for comparisons of
        // the "Event" header fields are described in Section 8.2.1.
        // https://tools.ietf.org/html/rfc6665#section-4.4.1
        if (message.method === _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_7__.C.NOTIFY) {
            const event = message.parseHeader("Event");
            if (!event || !event.event) {
                this.replyStateless(message, { statusCode: 489 });
                return;
            }
            // FIXME: Subscriber id should also matching on event id.
            const subscriberId = message.callId + message.toTag + event.event;
            const subscriber = this.subscribers.get(subscriberId);
            if (subscriber) {
                const uas = new _user_agents_notify_user_agent_server_js__WEBPACK_IMPORTED_MODULE_14__.NotifyUserAgentServer(this, message);
                subscriber.onNotify(uas);
                return;
            }
        }
        // Requests sent within a dialog, as any other requests, are atomic.  If
        // a particular request is accepted by the UAS, all the state changes
        // associated with it are performed.  If the request is rejected, none
        // of the state changes are performed.
        //
        //    Note that some requests, such as INVITEs, affect several pieces of
        //    state.
        //
        // The UAS will receive the request from the transaction layer.  If the
        // request has a tag in the To header field, the UAS core computes the
        // dialog identifier corresponding to the request and compares it with
        // existing dialogs.  If there is a match, this is a mid-dialog request.
        // https://tools.ietf.org/html/rfc3261#section-12.2.2
        const dialogId = message.callId + message.toTag + message.fromTag;
        const dialog = this.dialogs.get(dialogId);
        if (dialog) {
            // [Sip-implementors] Reg. SIP reinvite, UPDATE and OPTIONS
            // You got the question right.
            //
            // And you got the right answer too. :-)
            //
            //   Thanks,
            //   Paul
            //
            // Robert Sparks wrote:
            // > So I've lost track of the question during the musing.
            // >
            // > I _think_ the fundamental question being asked is this:
            // >
            // > Is an endpoint required to reject (with a 481) an OPTIONS request that
            // > arrives with at to-tag but does not match any existing dialog state.
            // > (Assuming some earlier requirement hasn't forced another error code). Or
            // > is it OK if it just sends
            // > a 200 OK anyhow.
            // >
            // > My take on the collection of specs is that its _not_ ok for it to send
            // > the 200 OK anyhow and that it is required to send
            // > the 481. I base this primarily on these sentences from 11.2 in 3261:
            // >
            // >    The response to an OPTIONS is constructed using the standard rules
            // >    for a SIP response as discussed in Section 8.2.6.  The response code
            // >    chosen MUST be the same that would have been chosen had the request
            // >    been an INVITE.
            // >
            // > Did I miss the point of the question?
            // >
            // > On May 15, 2008, at 12:48 PM, Paul Kyzivat wrote:
            // >
            // >> [Including Robert in hopes of getting his insight on this.]
            // https://lists.cs.columbia.edu/pipermail/sip-implementors/2008-May/019178.html
            //
            // Requests that do not change in any way the state of a dialog may be
            // received within a dialog (for example, an OPTIONS request).  They are
            // processed as if they had been received outside the dialog.
            // https://tools.ietf.org/html/rfc3261#section-12.2.2
            if (message.method === _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_7__.C.OPTIONS) {
                const allowHeader = "Allow: " + _allowed_methods_js__WEBPACK_IMPORTED_MODULE_13__.AllowedMethods.toString();
                const acceptHeader = "Accept: " + acceptedBodyTypes.toString();
                this.replyStateless(message, {
                    statusCode: 200,
                    extraHeaders: [allowHeader, acceptHeader]
                });
                return;
            }
            // Pass the incoming request to the dialog for further handling.
            dialog.receiveRequest(message);
            return;
        }
        // The most important behaviors of a stateless UAS are the following:
        // ...
        // o  A stateless UAS MUST ignore ACK requests.
        // ...
        // https://tools.ietf.org/html/rfc3261#section-8.2.7
        if (message.method === _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_7__.C.ACK) {
            // If a final response to an INVITE was sent statelessly,
            // the corresponding ACK:
            // - will not match an existing transaction
            // - may have tag in the To header field
            // - not not match any existing dialogs
            // Absorb unmatched ACKs.
            return;
        }
        // If the request has a tag in the To header field, but the dialog
        // identifier does not match any existing dialogs, the UAS may have
        // crashed and restarted, or it may have received a request for a
        // different (possibly failed) UAS (the UASs can construct the To tags
        // so that a UAS can identify that the tag was for a UAS for which it is
        // providing recovery).  Another possibility is that the incoming
        // request has been simply mis-routed.  Based on the To tag, the UAS MAY
        // either accept or reject the request.  Accepting the request for
        // acceptable To tags provides robustness, so that dialogs can persist
        // even through crashes.  UAs wishing to support this capability must
        // take into consideration some issues such as choosing monotonically
        // increasing CSeq sequence numbers even across reboots, reconstructing
        // the route set, and accepting out-of-range RTP timestamps and sequence
        // numbers.
        //
        // If the UAS wishes to reject the request because it does not wish to
        // recreate the dialog, it MUST respond to the request with a 481
        // (Call/Transaction Does Not Exist) status code and pass that to the
        // server transaction.
        // https://tools.ietf.org/html/rfc3261#section-12.2.2
        this.replyStateless(message, { statusCode: 481 });
        return;
    }
    /**
     * Assuming all of the checks in the previous subsections are passed,
     * the UAS processing becomes method-specific.
     *  https://tools.ietf.org/html/rfc3261#section-8.2.5
     * @param message - Incoming request message.
     */
    receiveOutsideDialogRequest(message) {
        switch (message.method) {
            case _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_7__.C.ACK:
                // Absorb stray out of dialog ACKs
                break;
            case _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_7__.C.BYE:
                // If the BYE does not match an existing dialog, the UAS core SHOULD
                // generate a 481 (Call/Transaction Does Not Exist) response and pass
                // that to the server transaction. This rule means that a BYE sent
                // without tags by a UAC will be rejected.
                // https://tools.ietf.org/html/rfc3261#section-15.1.2
                this.replyStateless(message, { statusCode: 481 });
                break;
            case _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_7__.C.CANCEL:
                throw new Error(`Unexpected out of dialog request method ${message.method}.`);
                break;
            case _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_7__.C.INFO:
                // Use of the INFO method does not constitute a separate dialog usage.
                // INFO messages are always part of, and share the fate of, an invite
                // dialog usage [RFC5057].  INFO messages cannot be sent as part of
                // other dialog usages, or outside an existing dialog.
                // https://tools.ietf.org/html/rfc6086#section-1
                this.replyStateless(message, { statusCode: 405 }); // Should never happen
                break;
            case _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_7__.C.INVITE:
                // https://tools.ietf.org/html/rfc3261#section-13.3.1
                {
                    const uas = new _user_agents_invite_user_agent_server_js__WEBPACK_IMPORTED_MODULE_11__.InviteUserAgentServer(this, message);
                    this.delegate.onInvite ? this.delegate.onInvite(uas) : uas.reject();
                }
                break;
            case _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_7__.C.MESSAGE:
                // MESSAGE requests are discouraged inside a dialog.  Implementations
                // are restricted from creating a usage for the purpose of carrying a
                // sequence of MESSAGE requests (though some implementations use it that
                // way, against the standard recommendation).
                // https://tools.ietf.org/html/rfc5057#section-5.3
                {
                    const uas = new _user_agents_message_user_agent_server_js__WEBPACK_IMPORTED_MODULE_15__.MessageUserAgentServer(this, message);
                    this.delegate.onMessage ? this.delegate.onMessage(uas) : uas.accept();
                }
                break;
            case _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_7__.C.NOTIFY:
                // Obsoleted by: RFC 6665
                // If any non-SUBSCRIBE mechanisms are defined to create subscriptions,
                // it is the responsibility of the parties defining those mechanisms to
                // ensure that correlation of a NOTIFY message to the corresponding
                // subscription is possible.  Designers of such mechanisms are also
                // warned to make a distinction between sending a NOTIFY message to a
                // subscriber who is aware of the subscription, and sending a NOTIFY
                // message to an unsuspecting node.  The latter behavior is invalid, and
                // MUST receive a "481 Subscription does not exist" response (unless
                // some other 400- or 500-class error code is more applicable), as
                // described in section 3.2.4.  In other words, knowledge of a
                // subscription must exist in both the subscriber and the notifier to be
                // valid, even if installed via a non-SUBSCRIBE mechanism.
                // https://tools.ietf.org/html/rfc3265#section-3.2
                //
                // NOTIFY requests are sent to inform subscribers of changes in state to
                // which the subscriber has a subscription.  Subscriptions are created
                // using the SUBSCRIBE method.  In legacy implementations, it is
                // possible that other means of subscription creation have been used.
                // However, this specification does not allow the creation of
                // subscriptions except through SUBSCRIBE requests and (for backwards-
                // compatibility) REFER requests [RFC3515].
                // https://tools.ietf.org/html/rfc6665#section-3.2
                {
                    const uas = new _user_agents_notify_user_agent_server_js__WEBPACK_IMPORTED_MODULE_14__.NotifyUserAgentServer(this, message);
                    this.delegate.onNotify ? this.delegate.onNotify(uas) : uas.reject({ statusCode: 405 });
                }
                break;
            case _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_7__.C.OPTIONS:
                // https://tools.ietf.org/html/rfc3261#section-11.2
                {
                    const allowHeader = "Allow: " + _allowed_methods_js__WEBPACK_IMPORTED_MODULE_13__.AllowedMethods.toString();
                    const acceptHeader = "Accept: " + acceptedBodyTypes.toString();
                    this.replyStateless(message, {
                        statusCode: 200,
                        extraHeaders: [allowHeader, acceptHeader]
                    });
                }
                break;
            case _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_7__.C.REFER:
                // https://tools.ietf.org/html/rfc3515#section-2.4.2
                {
                    const uas = new _user_agents_refer_user_agent_server_js__WEBPACK_IMPORTED_MODULE_16__.ReferUserAgentServer(this, message);
                    this.delegate.onRefer ? this.delegate.onRefer(uas) : uas.reject({ statusCode: 405 });
                }
                break;
            case _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_7__.C.REGISTER:
                // https://tools.ietf.org/html/rfc3261#section-10.3
                {
                    const uas = new _user_agents_register_user_agent_server_js__WEBPACK_IMPORTED_MODULE_17__.RegisterUserAgentServer(this, message);
                    this.delegate.onRegister ? this.delegate.onRegister(uas) : uas.reject({ statusCode: 405 });
                }
                break;
            case _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_7__.C.SUBSCRIBE:
                // https://tools.ietf.org/html/rfc6665#section-4.2
                {
                    const uas = new _user_agents_subscribe_user_agent_server_js__WEBPACK_IMPORTED_MODULE_18__.SubscribeUserAgentServer(this, message);
                    this.delegate.onSubscribe ? this.delegate.onSubscribe(uas) : uas.reject({ statusCode: 480 });
                }
                break;
            default:
                throw new Error(`Unexpected out of dialog request method ${message.method}.`);
        }
        return;
    }
    /**
     * Responses are first processed by the transport layer and then passed
     * up to the transaction layer.  The transaction layer performs its
     * processing and then passes the response up to the TU.  The majority
     * of response processing in the TU is method specific.  However, there
     * are some general behaviors independent of the method.
     * https://tools.ietf.org/html/rfc3261#section-8.1.3
     * @param message - Incoming response message from transport layer.
     */
    receiveResponseFromTransport(message) {
        // 8.1.3.1 Transaction Layer Errors
        // https://tools.ietf.org/html/rfc3261#section-8.1.3.1
        // Handled by transaction layer callbacks.
        // 8.1.3.2 Unrecognized Responses
        // https://tools.ietf.org/html/rfc3261#section-8.1.3.1
        // TODO
        // 8.1.3.3 Vias
        // https://tools.ietf.org/html/rfc3261#section-8.1.3.3
        if (message.getHeaders("via").length > 1) {
            this.logger.warn("More than one Via header field present in the response, dropping");
            return;
        }
        // 8.1.3.4 Processing 3xx Responses
        // https://tools.ietf.org/html/rfc3261#section-8.1.3.4
        // TODO
        // 8.1.3.5 Processing 4xx Responses
        // https://tools.ietf.org/html/rfc3261#section-8.1.3.5
        // TODO
        // When the transport layer in the client receives a response, it has to
        // determine which client transaction will handle the response, so that
        // the processing of Sections 17.1.1 and 17.1.2 can take place.  The
        // branch parameter in the top Via header field is used for this
        // purpose.  A response matches a client transaction under two
        // conditions:
        //
        //    1.  If the response has the same value of the branch parameter in
        //        the top Via header field as the branch parameter in the top
        //        Via header field of the request that created the transaction.
        //
        //    2.  If the method parameter in the CSeq header field matches the
        //        method of the request that created the transaction.  The
        //        method is needed since a CANCEL request constitutes a
        //        different transaction, but shares the same value of the branch
        //        parameter.
        // https://tools.ietf.org/html/rfc3261#section-17.1.3
        const userAgentClientId = message.viaBranch + message.method;
        const userAgentClient = this.userAgentClients.get(userAgentClientId);
        // The client transport uses the matching procedures of Section
        // 17.1.3 to attempt to match the response to an existing
        // transaction.  If there is a match, the response MUST be passed to
        // that transaction.  Otherwise, any element other than a stateless
        // proxy MUST silently discard the response.
        // https://tools.ietf.org/html/rfc6026#section-8.9
        if (userAgentClient) {
            userAgentClient.transaction.receiveResponse(message);
        }
        else {
            this.logger.warn(`Discarding unmatched ${message.statusCode} response to ${message.method} ${userAgentClientId}.`);
        }
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/user-agents/bye-user-agent-client.js":
/*!***************************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/user-agents/bye-user-agent-client.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ByeUserAgentClient": () => (/* binding */ ByeUserAgentClient)
/* harmony export */ });
/* harmony import */ var _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../messages/methods/constants.js */ "./node_modules/sip.js/lib/core/messages/methods/constants.js");
/* harmony import */ var _transactions_non_invite_client_transaction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../transactions/non-invite-client-transaction.js */ "./node_modules/sip.js/lib/core/transactions/non-invite-client-transaction.js");
/* harmony import */ var _user_agent_client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-agent-client.js */ "./node_modules/sip.js/lib/core/user-agents/user-agent-client.js");



/**
 * BYE UAC.
 * @public
 */
class ByeUserAgentClient extends _user_agent_client_js__WEBPACK_IMPORTED_MODULE_0__.UserAgentClient {
    constructor(dialog, delegate, options) {
        const message = dialog.createOutgoingRequestMessage(_messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_1__.C.BYE, options);
        super(_transactions_non_invite_client_transaction_js__WEBPACK_IMPORTED_MODULE_2__.NonInviteClientTransaction, dialog.userAgentCore, message, delegate);
        dialog.dispose();
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/user-agents/bye-user-agent-server.js":
/*!***************************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/user-agents/bye-user-agent-server.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ByeUserAgentServer": () => (/* binding */ ByeUserAgentServer)
/* harmony export */ });
/* harmony import */ var _transactions_non_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../transactions/non-invite-server-transaction.js */ "./node_modules/sip.js/lib/core/transactions/non-invite-server-transaction.js");
/* harmony import */ var _user_agent_server_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-agent-server.js */ "./node_modules/sip.js/lib/core/user-agents/user-agent-server.js");


/**
 * BYE UAS.
 * @public
 */
class ByeUserAgentServer extends _user_agent_server_js__WEBPACK_IMPORTED_MODULE_0__.UserAgentServer {
    constructor(dialog, message, delegate) {
        super(_transactions_non_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_1__.NonInviteServerTransaction, dialog.userAgentCore, message, delegate);
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/user-agents/cancel-user-agent-client.js":
/*!******************************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/user-agents/cancel-user-agent-client.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "CancelUserAgentClient": () => (/* binding */ CancelUserAgentClient)
/* harmony export */ });
/* harmony import */ var _transactions_non_invite_client_transaction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../transactions/non-invite-client-transaction.js */ "./node_modules/sip.js/lib/core/transactions/non-invite-client-transaction.js");
/* harmony import */ var _user_agent_client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-agent-client.js */ "./node_modules/sip.js/lib/core/user-agents/user-agent-client.js");


/**
 * CANCEL UAC.
 * @public
 */
class CancelUserAgentClient extends _user_agent_client_js__WEBPACK_IMPORTED_MODULE_0__.UserAgentClient {
    constructor(core, message, delegate) {
        super(_transactions_non_invite_client_transaction_js__WEBPACK_IMPORTED_MODULE_1__.NonInviteClientTransaction, core, message, delegate);
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/user-agents/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/sip.js/lib/core/user-agents/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ByeUserAgentClient": () => (/* reexport safe */ _bye_user_agent_client_js__WEBPACK_IMPORTED_MODULE_0__.ByeUserAgentClient),
/* harmony export */   "ByeUserAgentServer": () => (/* reexport safe */ _bye_user_agent_server_js__WEBPACK_IMPORTED_MODULE_1__.ByeUserAgentServer),
/* harmony export */   "CancelUserAgentClient": () => (/* reexport safe */ _cancel_user_agent_client_js__WEBPACK_IMPORTED_MODULE_2__.CancelUserAgentClient),
/* harmony export */   "InfoUserAgentClient": () => (/* reexport safe */ _info_user_agent_client_js__WEBPACK_IMPORTED_MODULE_3__.InfoUserAgentClient),
/* harmony export */   "InfoUserAgentServer": () => (/* reexport safe */ _info_user_agent_server_js__WEBPACK_IMPORTED_MODULE_4__.InfoUserAgentServer),
/* harmony export */   "InviteUserAgentClient": () => (/* reexport safe */ _invite_user_agent_client_js__WEBPACK_IMPORTED_MODULE_5__.InviteUserAgentClient),
/* harmony export */   "InviteUserAgentServer": () => (/* reexport safe */ _invite_user_agent_server_js__WEBPACK_IMPORTED_MODULE_6__.InviteUserAgentServer),
/* harmony export */   "MessageUserAgentClient": () => (/* reexport safe */ _message_user_agent_client_js__WEBPACK_IMPORTED_MODULE_7__.MessageUserAgentClient),
/* harmony export */   "MessageUserAgentServer": () => (/* reexport safe */ _message_user_agent_server_js__WEBPACK_IMPORTED_MODULE_8__.MessageUserAgentServer),
/* harmony export */   "NotifyUserAgentClient": () => (/* reexport safe */ _notify_user_agent_client_js__WEBPACK_IMPORTED_MODULE_9__.NotifyUserAgentClient),
/* harmony export */   "NotifyUserAgentServer": () => (/* reexport safe */ _notify_user_agent_server_js__WEBPACK_IMPORTED_MODULE_10__.NotifyUserAgentServer),
/* harmony export */   "PrackUserAgentClient": () => (/* reexport safe */ _prack_user_agent_client_js__WEBPACK_IMPORTED_MODULE_12__.PrackUserAgentClient),
/* harmony export */   "PrackUserAgentServer": () => (/* reexport safe */ _prack_user_agent_server_js__WEBPACK_IMPORTED_MODULE_13__.PrackUserAgentServer),
/* harmony export */   "PublishUserAgentClient": () => (/* reexport safe */ _publish_user_agent_client_js__WEBPACK_IMPORTED_MODULE_11__.PublishUserAgentClient),
/* harmony export */   "ReInviteUserAgentClient": () => (/* reexport safe */ _re_invite_user_agent_client_js__WEBPACK_IMPORTED_MODULE_14__.ReInviteUserAgentClient),
/* harmony export */   "ReInviteUserAgentServer": () => (/* reexport safe */ _re_invite_user_agent_server_js__WEBPACK_IMPORTED_MODULE_15__.ReInviteUserAgentServer),
/* harmony export */   "ReSubscribeUserAgentClient": () => (/* reexport safe */ _re_subscribe_user_agent_client_js__WEBPACK_IMPORTED_MODULE_16__.ReSubscribeUserAgentClient),
/* harmony export */   "ReSubscribeUserAgentServer": () => (/* reexport safe */ _re_subscribe_user_agent_server_js__WEBPACK_IMPORTED_MODULE_17__.ReSubscribeUserAgentServer),
/* harmony export */   "ReferUserAgentClient": () => (/* reexport safe */ _refer_user_agent_client_js__WEBPACK_IMPORTED_MODULE_18__.ReferUserAgentClient),
/* harmony export */   "ReferUserAgentServer": () => (/* reexport safe */ _refer_user_agent_server_js__WEBPACK_IMPORTED_MODULE_19__.ReferUserAgentServer),
/* harmony export */   "RegisterUserAgentClient": () => (/* reexport safe */ _register_user_agent_client_js__WEBPACK_IMPORTED_MODULE_20__.RegisterUserAgentClient),
/* harmony export */   "RegisterUserAgentServer": () => (/* reexport safe */ _register_user_agent_server_js__WEBPACK_IMPORTED_MODULE_21__.RegisterUserAgentServer),
/* harmony export */   "SubscribeUserAgentClient": () => (/* reexport safe */ _subscribe_user_agent_client_js__WEBPACK_IMPORTED_MODULE_22__.SubscribeUserAgentClient),
/* harmony export */   "SubscribeUserAgentServer": () => (/* reexport safe */ _subscribe_user_agent_server_js__WEBPACK_IMPORTED_MODULE_23__.SubscribeUserAgentServer),
/* harmony export */   "UserAgentClient": () => (/* reexport safe */ _user_agent_client_js__WEBPACK_IMPORTED_MODULE_24__.UserAgentClient),
/* harmony export */   "UserAgentServer": () => (/* reexport safe */ _user_agent_server_js__WEBPACK_IMPORTED_MODULE_25__.UserAgentServer)
/* harmony export */ });
/* harmony import */ var _bye_user_agent_client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bye-user-agent-client.js */ "./node_modules/sip.js/lib/core/user-agents/bye-user-agent-client.js");
/* harmony import */ var _bye_user_agent_server_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bye-user-agent-server.js */ "./node_modules/sip.js/lib/core/user-agents/bye-user-agent-server.js");
/* harmony import */ var _cancel_user_agent_client_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cancel-user-agent-client.js */ "./node_modules/sip.js/lib/core/user-agents/cancel-user-agent-client.js");
/* harmony import */ var _info_user_agent_client_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./info-user-agent-client.js */ "./node_modules/sip.js/lib/core/user-agents/info-user-agent-client.js");
/* harmony import */ var _info_user_agent_server_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./info-user-agent-server.js */ "./node_modules/sip.js/lib/core/user-agents/info-user-agent-server.js");
/* harmony import */ var _invite_user_agent_client_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./invite-user-agent-client.js */ "./node_modules/sip.js/lib/core/user-agents/invite-user-agent-client.js");
/* harmony import */ var _invite_user_agent_server_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./invite-user-agent-server.js */ "./node_modules/sip.js/lib/core/user-agents/invite-user-agent-server.js");
/* harmony import */ var _message_user_agent_client_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./message-user-agent-client.js */ "./node_modules/sip.js/lib/core/user-agents/message-user-agent-client.js");
/* harmony import */ var _message_user_agent_server_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./message-user-agent-server.js */ "./node_modules/sip.js/lib/core/user-agents/message-user-agent-server.js");
/* harmony import */ var _notify_user_agent_client_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./notify-user-agent-client.js */ "./node_modules/sip.js/lib/core/user-agents/notify-user-agent-client.js");
/* harmony import */ var _notify_user_agent_server_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./notify-user-agent-server.js */ "./node_modules/sip.js/lib/core/user-agents/notify-user-agent-server.js");
/* harmony import */ var _publish_user_agent_client_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./publish-user-agent-client.js */ "./node_modules/sip.js/lib/core/user-agents/publish-user-agent-client.js");
/* harmony import */ var _prack_user_agent_client_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./prack-user-agent-client.js */ "./node_modules/sip.js/lib/core/user-agents/prack-user-agent-client.js");
/* harmony import */ var _prack_user_agent_server_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./prack-user-agent-server.js */ "./node_modules/sip.js/lib/core/user-agents/prack-user-agent-server.js");
/* harmony import */ var _re_invite_user_agent_client_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./re-invite-user-agent-client.js */ "./node_modules/sip.js/lib/core/user-agents/re-invite-user-agent-client.js");
/* harmony import */ var _re_invite_user_agent_server_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./re-invite-user-agent-server.js */ "./node_modules/sip.js/lib/core/user-agents/re-invite-user-agent-server.js");
/* harmony import */ var _re_subscribe_user_agent_client_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./re-subscribe-user-agent-client.js */ "./node_modules/sip.js/lib/core/user-agents/re-subscribe-user-agent-client.js");
/* harmony import */ var _re_subscribe_user_agent_server_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./re-subscribe-user-agent-server.js */ "./node_modules/sip.js/lib/core/user-agents/re-subscribe-user-agent-server.js");
/* harmony import */ var _refer_user_agent_client_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./refer-user-agent-client.js */ "./node_modules/sip.js/lib/core/user-agents/refer-user-agent-client.js");
/* harmony import */ var _refer_user_agent_server_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./refer-user-agent-server.js */ "./node_modules/sip.js/lib/core/user-agents/refer-user-agent-server.js");
/* harmony import */ var _register_user_agent_client_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./register-user-agent-client.js */ "./node_modules/sip.js/lib/core/user-agents/register-user-agent-client.js");
/* harmony import */ var _register_user_agent_server_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./register-user-agent-server.js */ "./node_modules/sip.js/lib/core/user-agents/register-user-agent-server.js");
/* harmony import */ var _subscribe_user_agent_client_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./subscribe-user-agent-client.js */ "./node_modules/sip.js/lib/core/user-agents/subscribe-user-agent-client.js");
/* harmony import */ var _subscribe_user_agent_server_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./subscribe-user-agent-server.js */ "./node_modules/sip.js/lib/core/user-agents/subscribe-user-agent-server.js");
/* harmony import */ var _user_agent_client_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./user-agent-client.js */ "./node_modules/sip.js/lib/core/user-agents/user-agent-client.js");
/* harmony import */ var _user_agent_server_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./user-agent-server.js */ "./node_modules/sip.js/lib/core/user-agents/user-agent-server.js");




























/***/ }),

/***/ "./node_modules/sip.js/lib/core/user-agents/info-user-agent-client.js":
/*!****************************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/user-agents/info-user-agent-client.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InfoUserAgentClient": () => (/* binding */ InfoUserAgentClient)
/* harmony export */ });
/* harmony import */ var _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../messages/methods/constants.js */ "./node_modules/sip.js/lib/core/messages/methods/constants.js");
/* harmony import */ var _transactions_non_invite_client_transaction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../transactions/non-invite-client-transaction.js */ "./node_modules/sip.js/lib/core/transactions/non-invite-client-transaction.js");
/* harmony import */ var _user_agent_client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-agent-client.js */ "./node_modules/sip.js/lib/core/user-agents/user-agent-client.js");



/**
 * INFO UAC.
 * @public
 */
class InfoUserAgentClient extends _user_agent_client_js__WEBPACK_IMPORTED_MODULE_0__.UserAgentClient {
    constructor(dialog, delegate, options) {
        const message = dialog.createOutgoingRequestMessage(_messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_1__.C.INFO, options);
        super(_transactions_non_invite_client_transaction_js__WEBPACK_IMPORTED_MODULE_2__.NonInviteClientTransaction, dialog.userAgentCore, message, delegate);
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/user-agents/info-user-agent-server.js":
/*!****************************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/user-agents/info-user-agent-server.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InfoUserAgentServer": () => (/* binding */ InfoUserAgentServer)
/* harmony export */ });
/* harmony import */ var _transactions_non_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../transactions/non-invite-server-transaction.js */ "./node_modules/sip.js/lib/core/transactions/non-invite-server-transaction.js");
/* harmony import */ var _user_agent_server_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-agent-server.js */ "./node_modules/sip.js/lib/core/user-agents/user-agent-server.js");


/**
 * INFO UAS.
 * @public
 */
class InfoUserAgentServer extends _user_agent_server_js__WEBPACK_IMPORTED_MODULE_0__.UserAgentServer {
    constructor(dialog, message, delegate) {
        super(_transactions_non_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_1__.NonInviteServerTransaction, dialog.userAgentCore, message, delegate);
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/user-agents/invite-user-agent-client.js":
/*!******************************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/user-agents/invite-user-agent-client.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InviteUserAgentClient": () => (/* binding */ InviteUserAgentClient)
/* harmony export */ });
/* harmony import */ var _dialogs_dialog_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dialogs/dialog.js */ "./node_modules/sip.js/lib/core/dialogs/dialog.js");
/* harmony import */ var _dialogs_session_dialog_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dialogs/session-dialog.js */ "./node_modules/sip.js/lib/core/dialogs/session-dialog.js");
/* harmony import */ var _session_session_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../session/session.js */ "./node_modules/sip.js/lib/core/session/session.js");
/* harmony import */ var _transactions_invite_client_transaction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../transactions/invite-client-transaction.js */ "./node_modules/sip.js/lib/core/transactions/invite-client-transaction.js");
/* harmony import */ var _transactions_transaction_state_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../transactions/transaction-state.js */ "./node_modules/sip.js/lib/core/transactions/transaction-state.js");
/* harmony import */ var _user_agent_client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-agent-client.js */ "./node_modules/sip.js/lib/core/user-agents/user-agent-client.js");






/**
 * INVITE UAC.
 * @remarks
 * 13 Initiating a Session
 * https://tools.ietf.org/html/rfc3261#section-13
 * 13.1 Overview
 * https://tools.ietf.org/html/rfc3261#section-13.1
 * 13.2 UAC Processing
 * https://tools.ietf.org/html/rfc3261#section-13.2
 * @public
 */
class InviteUserAgentClient extends _user_agent_client_js__WEBPACK_IMPORTED_MODULE_0__.UserAgentClient {
    constructor(core, message, delegate) {
        super(_transactions_invite_client_transaction_js__WEBPACK_IMPORTED_MODULE_1__.InviteClientTransaction, core, message, delegate);
        this.confirmedDialogAcks = new Map();
        this.confirmedDialogs = new Map();
        this.earlyDialogs = new Map();
        this.delegate = delegate;
    }
    dispose() {
        // The UAC core considers the INVITE transaction completed 64*T1 seconds
        // after the reception of the first 2xx response.  At this point all the
        // early dialogs that have not transitioned to established dialogs are
        // terminated.  Once the INVITE transaction is considered completed by
        // the UAC core, no more new 2xx responses are expected to arrive.
        //
        // If, after acknowledging any 2xx response to an INVITE, the UAC does
        // not want to continue with that dialog, then the UAC MUST terminate
        // the dialog by sending a BYE request as described in Section 15.
        // https://tools.ietf.org/html/rfc3261#section-13.2.2.4
        this.earlyDialogs.forEach((earlyDialog) => earlyDialog.dispose());
        this.earlyDialogs.clear();
        super.dispose();
    }
    /**
     * Special case for transport error while sending ACK.
     * @param error - Transport error
     */
    onTransportError(error) {
        if (this.transaction.state === _transactions_transaction_state_js__WEBPACK_IMPORTED_MODULE_2__.TransactionState.Calling) {
            return super.onTransportError(error);
        }
        // If not in 'calling' state, the transport error occurred while sending an ACK.
        this.logger.error(error.message);
        this.logger.error("User agent client request transport error while sending ACK.");
    }
    /**
     * Once the INVITE has been passed to the INVITE client transaction, the
     * UAC waits for responses for the INVITE.
     * https://tools.ietf.org/html/rfc3261#section-13.2.2
     * @param incomingResponse - Incoming response to INVITE request.
     */
    receiveResponse(message) {
        if (!this.authenticationGuard(message)) {
            return;
        }
        const statusCode = message.statusCode ? message.statusCode.toString() : "";
        if (!statusCode) {
            throw new Error("Response status code undefined.");
        }
        switch (true) {
            case /^100$/.test(statusCode):
                if (this.delegate && this.delegate.onTrying) {
                    this.delegate.onTrying({ message });
                }
                return;
            case /^1[0-9]{2}$/.test(statusCode):
                // Zero, one or multiple provisional responses may arrive before one or
                // more final responses are received.  Provisional responses for an
                // INVITE request can create "early dialogs".  If a provisional response
                // has a tag in the To field, and if the dialog ID of the response does
                // not match an existing dialog, one is constructed using the procedures
                // defined in Section 12.1.2.
                //
                // The early dialog will only be needed if the UAC needs to send a
                // request to its peer within the dialog before the initial INVITE
                // transaction completes.  Header fields present in a provisional
                // response are applicable as long as the dialog is in the early state
                // (for example, an Allow header field in a provisional response
                // contains the methods that can be used in the dialog while this is in
                // the early state).
                // https://tools.ietf.org/html/rfc3261#section-13.2.2.1
                {
                    // Dialogs are created through the generation of non-failure responses
                    // to requests with specific methods.  Within this specification, only
                    // 2xx and 101-199 responses with a To tag, where the request was
                    // INVITE, will establish a dialog.  A dialog established by a non-final
                    // response to a request is in the "early" state and it is called an
                    // early dialog.
                    // https://tools.ietf.org/html/rfc3261#section-12.1
                    // Provisional without to tag, no dialog to create.
                    if (!message.toTag) {
                        this.logger.warn("Non-100 1xx INVITE response received without a to tag, dropping.");
                        return;
                    }
                    // When a UAS responds to a request with a response that establishes a
                    // dialog (such as a 2xx to INVITE), the UAS MUST copy all Record-Route
                    // header field values from the request into the response (including the
                    // URIs, URI parameters, and any Record-Route header field parameters,
                    // whether they are known or unknown to the UAS) and MUST maintain the
                    // order of those values.  The UAS MUST add a Contact header field to
                    // the response.
                    // https://tools.ietf.org/html/rfc3261#section-12.1.1
                    // Provisional without Contact header field, malformed response.
                    const contact = message.parseHeader("contact");
                    if (!contact) {
                        this.logger.error("Non-100 1xx INVITE response received without a Contact header field, dropping.");
                        return;
                    }
                    // Compute dialog state.
                    const dialogState = _dialogs_dialog_js__WEBPACK_IMPORTED_MODULE_3__.Dialog.initialDialogStateForUserAgentClient(this.message, message);
                    // Have existing early dialog or create a new one.
                    let earlyDialog = this.earlyDialogs.get(dialogState.id);
                    if (!earlyDialog) {
                        const transaction = this.transaction;
                        if (!(transaction instanceof _transactions_invite_client_transaction_js__WEBPACK_IMPORTED_MODULE_1__.InviteClientTransaction)) {
                            throw new Error("Transaction not instance of InviteClientTransaction.");
                        }
                        earlyDialog = new _dialogs_session_dialog_js__WEBPACK_IMPORTED_MODULE_4__.SessionDialog(transaction, this.core, dialogState);
                        this.earlyDialogs.set(earlyDialog.id, earlyDialog);
                    }
                    // Guard against out of order reliable provisional responses.
                    // Note that this is where the rseq tracking is done.
                    if (!earlyDialog.reliableSequenceGuard(message)) {
                        this.logger.warn("1xx INVITE reliable response received out of order or is a retransmission, dropping.");
                        return;
                    }
                    // If the initial offer is in an INVITE, the answer MUST be in a
                    // reliable non-failure message from UAS back to UAC which is
                    // correlated to that INVITE.  For this specification, that is
                    // only the final 2xx response to that INVITE.  That same exact
                    // answer MAY also be placed in any provisional responses sent
                    // prior to the answer.  The UAC MUST treat the first session
                    // description it receives as the answer, and MUST ignore any
                    // session descriptions in subsequent responses to the initial
                    // INVITE.
                    // https://tools.ietf.org/html/rfc3261#section-13.2.1
                    if (earlyDialog.signalingState === _session_session_js__WEBPACK_IMPORTED_MODULE_5__.SignalingState.Initial ||
                        earlyDialog.signalingState === _session_session_js__WEBPACK_IMPORTED_MODULE_5__.SignalingState.HaveLocalOffer) {
                        earlyDialog.signalingStateTransition(message);
                    }
                    // Pass response to delegate.
                    const session = earlyDialog;
                    if (this.delegate && this.delegate.onProgress) {
                        this.delegate.onProgress({
                            message,
                            session,
                            prack: (options) => {
                                const outgoingPrackRequest = session.prack(undefined, options);
                                return outgoingPrackRequest;
                            }
                        });
                    }
                }
                return;
            case /^2[0-9]{2}$/.test(statusCode):
                // Multiple 2xx responses may arrive at the UAC for a single INVITE
                // request due to a forking proxy.  Each response is distinguished by
                // the tag parameter in the To header field, and each represents a
                // distinct dialog, with a distinct dialog identifier.
                //
                // If the dialog identifier in the 2xx response matches the dialog
                // identifier of an existing dialog, the dialog MUST be transitioned to
                // the "confirmed" state, and the route set for the dialog MUST be
                // recomputed based on the 2xx response using the procedures of Section
                // 12.2.1.2.  Otherwise, a new dialog in the "confirmed" state MUST be
                // constructed using the procedures of Section 12.1.2.
                // https://tools.ietf.org/html/rfc3261#section-13.2.2.4
                {
                    // Dialogs are created through the generation of non-failure responses
                    // to requests with specific methods.  Within this specification, only
                    // 2xx and 101-199 responses with a To tag, where the request was
                    // INVITE, will establish a dialog.  A dialog established by a non-final
                    // response to a request is in the "early" state and it is called an
                    // early dialog.
                    // https://tools.ietf.org/html/rfc3261#section-12.1
                    // Final without to tag, malformed response.
                    if (!message.toTag) {
                        this.logger.error("2xx INVITE response received without a to tag, dropping.");
                        return;
                    }
                    // When a UAS responds to a request with a response that establishes a
                    // dialog (such as a 2xx to INVITE), the UAS MUST copy all Record-Route
                    // header field values from the request into the response (including the
                    // URIs, URI parameters, and any Record-Route header field parameters,
                    // whether they are known or unknown to the UAS) and MUST maintain the
                    // order of those values.  The UAS MUST add a Contact header field to
                    // the response.
                    // https://tools.ietf.org/html/rfc3261#section-12.1.1
                    // Final without Contact header field, malformed response.
                    const contact = message.parseHeader("contact");
                    if (!contact) {
                        this.logger.error("2xx INVITE response received without a Contact header field, dropping.");
                        return;
                    }
                    // Compute dialog state.
                    const dialogState = _dialogs_dialog_js__WEBPACK_IMPORTED_MODULE_3__.Dialog.initialDialogStateForUserAgentClient(this.message, message);
                    // NOTE: Currently our transaction layer is caching the 2xx ACKs and
                    // handling retransmissions of the ACK which is an approach which is
                    // not to spec. In any event, this block is intended to provide a to
                    // spec implementation of ACK retransmissions, but it should not be
                    // hit currently.
                    let dialog = this.confirmedDialogs.get(dialogState.id);
                    if (dialog) {
                        // Once the ACK has been constructed, the procedures of [4] are used to
                        // determine the destination address, port and transport.  However, the
                        // request is passed to the transport layer directly for transmission,
                        // rather than a client transaction.  This is because the UAC core
                        // handles retransmissions of the ACK, not the transaction layer.  The
                        // ACK MUST be passed to the client transport every time a
                        // retransmission of the 2xx final response that triggered the ACK
                        // arrives.
                        // https://tools.ietf.org/html/rfc3261#section-13.2.2.4
                        const outgoingAckRequest = this.confirmedDialogAcks.get(dialogState.id);
                        if (outgoingAckRequest) {
                            const transaction = this.transaction;
                            if (!(transaction instanceof _transactions_invite_client_transaction_js__WEBPACK_IMPORTED_MODULE_1__.InviteClientTransaction)) {
                                throw new Error("Client transaction not instance of InviteClientTransaction.");
                            }
                            transaction.ackResponse(outgoingAckRequest.message);
                        }
                        else {
                            // If still waiting for an ACK, drop the retransmission of the 2xx final response.
                        }
                        return;
                    }
                    // If the dialog identifier in the 2xx response matches the dialog
                    // identifier of an existing dialog, the dialog MUST be transitioned to
                    // the "confirmed" state, and the route set for the dialog MUST be
                    // recomputed based on the 2xx response using the procedures of Section
                    // 12.2.1.2. Otherwise, a new dialog in the "confirmed" state MUST be
                    // constructed using the procedures of Section 12.1.2.
                    // https://tools.ietf.org/html/rfc3261#section-13.2.2.4
                    dialog = this.earlyDialogs.get(dialogState.id);
                    if (dialog) {
                        dialog.confirm();
                        dialog.recomputeRouteSet(message);
                        this.earlyDialogs.delete(dialog.id);
                        this.confirmedDialogs.set(dialog.id, dialog);
                    }
                    else {
                        const transaction = this.transaction;
                        if (!(transaction instanceof _transactions_invite_client_transaction_js__WEBPACK_IMPORTED_MODULE_1__.InviteClientTransaction)) {
                            throw new Error("Transaction not instance of InviteClientTransaction.");
                        }
                        dialog = new _dialogs_session_dialog_js__WEBPACK_IMPORTED_MODULE_4__.SessionDialog(transaction, this.core, dialogState);
                        this.confirmedDialogs.set(dialog.id, dialog);
                    }
                    // If the initial offer is in an INVITE, the answer MUST be in a
                    // reliable non-failure message from UAS back to UAC which is
                    // correlated to that INVITE.  For this specification, that is
                    // only the final 2xx response to that INVITE.  That same exact
                    // answer MAY also be placed in any provisional responses sent
                    // prior to the answer.  The UAC MUST treat the first session
                    // description it receives as the answer, and MUST ignore any
                    // session descriptions in subsequent responses to the initial
                    // INVITE.
                    // https://tools.ietf.org/html/rfc3261#section-13.2.1
                    if (dialog.signalingState === _session_session_js__WEBPACK_IMPORTED_MODULE_5__.SignalingState.Initial ||
                        dialog.signalingState === _session_session_js__WEBPACK_IMPORTED_MODULE_5__.SignalingState.HaveLocalOffer) {
                        dialog.signalingStateTransition(message);
                    }
                    // Session Initiated! :)
                    const session = dialog;
                    // The UAC core MUST generate an ACK request for each 2xx received from
                    // the transaction layer.  The header fields of the ACK are constructed
                    // in the same way as for any request sent within a dialog (see Section
                    // 12) with the exception of the CSeq and the header fields related to
                    // authentication.  The sequence number of the CSeq header field MUST be
                    // the same as the INVITE being acknowledged, but the CSeq method MUST
                    // be ACK.  The ACK MUST contain the same credentials as the INVITE.  If
                    // the 2xx contains an offer (based on the rules above), the ACK MUST
                    // carry an answer in its body.  If the offer in the 2xx response is not
                    // acceptable, the UAC core MUST generate a valid answer in the ACK and
                    // then send a BYE immediately.
                    // https://tools.ietf.org/html/rfc3261#section-13.2.2.4
                    if (this.delegate && this.delegate.onAccept) {
                        this.delegate.onAccept({
                            message,
                            session,
                            ack: (options) => {
                                const outgoingAckRequest = session.ack(options);
                                this.confirmedDialogAcks.set(session.id, outgoingAckRequest);
                                return outgoingAckRequest;
                            }
                        });
                    }
                    else {
                        const outgoingAckRequest = session.ack();
                        this.confirmedDialogAcks.set(session.id, outgoingAckRequest);
                    }
                }
                return;
            case /^3[0-9]{2}$/.test(statusCode):
                // 12.3 Termination of a Dialog
                //
                // Independent of the method, if a request outside of a dialog generates
                // a non-2xx final response, any early dialogs created through
                // provisional responses to that request are terminated.  The mechanism
                // for terminating confirmed dialogs is method specific.  In this
                // specification, the BYE method terminates a session and the dialog
                // associated with it.  See Section 15 for details.
                // https://tools.ietf.org/html/rfc3261#section-12.3
                // All early dialogs are considered terminated upon reception of the
                // non-2xx final response.
                //
                // After having received the non-2xx final response the UAC core
                // considers the INVITE transaction completed.  The INVITE client
                // transaction handles the generation of ACKs for the response (see
                // Section 17).
                // https://tools.ietf.org/html/rfc3261#section-13.2.2.3
                this.earlyDialogs.forEach((earlyDialog) => earlyDialog.dispose());
                this.earlyDialogs.clear();
                // A 3xx response may contain one or more Contact header field values
                // providing new addresses where the callee might be reachable.
                // Depending on the status code of the 3xx response (see Section 21.3),
                // the UAC MAY choose to try those new addresses.
                // https://tools.ietf.org/html/rfc3261#section-13.2.2.2
                if (this.delegate && this.delegate.onRedirect) {
                    this.delegate.onRedirect({ message });
                }
                return;
            case /^[4-6][0-9]{2}$/.test(statusCode):
                // 12.3 Termination of a Dialog
                //
                // Independent of the method, if a request outside of a dialog generates
                // a non-2xx final response, any early dialogs created through
                // provisional responses to that request are terminated.  The mechanism
                // for terminating confirmed dialogs is method specific.  In this
                // specification, the BYE method terminates a session and the dialog
                // associated with it.  See Section 15 for details.
                // https://tools.ietf.org/html/rfc3261#section-12.3
                // All early dialogs are considered terminated upon reception of the
                // non-2xx final response.
                //
                // After having received the non-2xx final response the UAC core
                // considers the INVITE transaction completed.  The INVITE client
                // transaction handles the generation of ACKs for the response (see
                // Section 17).
                // https://tools.ietf.org/html/rfc3261#section-13.2.2.3
                this.earlyDialogs.forEach((earlyDialog) => earlyDialog.dispose());
                this.earlyDialogs.clear();
                // A single non-2xx final response may be received for the INVITE.  4xx,
                // 5xx and 6xx responses may contain a Contact header field value
                // indicating the location where additional information about the error
                // can be found.  Subsequent final responses (which would only arrive
                // under error conditions) MUST be ignored.
                // https://tools.ietf.org/html/rfc3261#section-13.2.2.3
                if (this.delegate && this.delegate.onReject) {
                    this.delegate.onReject({ message });
                }
                return;
            default:
                throw new Error(`Invalid status code ${statusCode}`);
        }
        throw new Error(`Executing what should be an unreachable code path receiving ${statusCode} response.`);
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/user-agents/invite-user-agent-server.js":
/*!******************************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/user-agents/invite-user-agent-server.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "InviteUserAgentServer": () => (/* binding */ InviteUserAgentServer)
/* harmony export */ });
/* harmony import */ var _dialogs_dialog_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dialogs/dialog.js */ "./node_modules/sip.js/lib/core/dialogs/dialog.js");
/* harmony import */ var _dialogs_session_dialog_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dialogs/session-dialog.js */ "./node_modules/sip.js/lib/core/dialogs/session-dialog.js");
/* harmony import */ var _exceptions_transaction_state_error_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../exceptions/transaction-state-error.js */ "./node_modules/sip.js/lib/core/exceptions/transaction-state-error.js");
/* harmony import */ var _session_session_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../session/session.js */ "./node_modules/sip.js/lib/core/session/session.js");
/* harmony import */ var _transactions_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../transactions/invite-server-transaction.js */ "./node_modules/sip.js/lib/core/transactions/invite-server-transaction.js");
/* harmony import */ var _user_agent_core_allowed_methods_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../user-agent-core/allowed-methods.js */ "./node_modules/sip.js/lib/core/user-agent-core/allowed-methods.js");
/* harmony import */ var _user_agent_server_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-agent-server.js */ "./node_modules/sip.js/lib/core/user-agents/user-agent-server.js");







/**
 * INVITE UAS.
 * @remarks
 * 13 Initiating a Session
 * https://tools.ietf.org/html/rfc3261#section-13
 * 13.1 Overview
 * https://tools.ietf.org/html/rfc3261#section-13.1
 * 13.3 UAS Processing
 * https://tools.ietf.org/html/rfc3261#section-13.3
 * @public
 */
class InviteUserAgentServer extends _user_agent_server_js__WEBPACK_IMPORTED_MODULE_0__.UserAgentServer {
    constructor(core, message, delegate) {
        super(_transactions_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_1__.InviteServerTransaction, core, message, delegate);
        this.core = core;
    }
    dispose() {
        if (this.earlyDialog) {
            this.earlyDialog.dispose();
        }
        super.dispose();
    }
    /**
     * 13.3.1.4 The INVITE is Accepted
     * The UAS core generates a 2xx response.  This response establishes a
     * dialog, and therefore follows the procedures of Section 12.1.1 in
     * addition to those of Section 8.2.6.
     * https://tools.ietf.org/html/rfc3261#section-13.3.1.4
     * @param options - Accept options bucket.
     */
    accept(options = { statusCode: 200 }) {
        if (!this.acceptable) {
            throw new _exceptions_transaction_state_error_js__WEBPACK_IMPORTED_MODULE_2__.TransactionStateError(`${this.message.method} not acceptable in state ${this.transaction.state}.`);
        }
        // This response establishes a dialog...
        // https://tools.ietf.org/html/rfc3261#section-13.3.1.4
        if (!this.confirmedDialog) {
            if (this.earlyDialog) {
                this.earlyDialog.confirm();
                this.confirmedDialog = this.earlyDialog;
                this.earlyDialog = undefined;
            }
            else {
                const transaction = this.transaction;
                if (!(transaction instanceof _transactions_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_1__.InviteServerTransaction)) {
                    throw new Error("Transaction not instance of InviteClientTransaction.");
                }
                const state = _dialogs_dialog_js__WEBPACK_IMPORTED_MODULE_3__.Dialog.initialDialogStateForUserAgentServer(this.message, this.toTag);
                this.confirmedDialog = new _dialogs_session_dialog_js__WEBPACK_IMPORTED_MODULE_4__.SessionDialog(transaction, this.core, state);
            }
        }
        // When a UAS responds to a request with a response that establishes a
        // dialog (such as a 2xx to INVITE), the UAS MUST copy all Record-Route
        // header field values from the request into the response (including the
        // URIs, URI parameters, and any Record-Route header field parameters,
        // whether they are known or unknown to the UAS) and MUST maintain the
        // order of those values.  The UAS MUST add a Contact header field to
        // the response.  The Contact header field contains an address where the
        // UAS would like to be contacted for subsequent requests in the dialog
        // (which includes the ACK for a 2xx response in the case of an INVITE).
        // Generally, the host portion of this URI is the IP address or FQDN of
        // the host.  The URI provided in the Contact header field MUST be a SIP
        // or SIPS URI.  If the request that initiated the dialog contained a
        // SIPS URI in the Request-URI or in the top Record-Route header field
        // value, if there was any, or the Contact header field if there was no
        // Record-Route header field, the Contact header field in the response
        // MUST be a SIPS URI.  The URI SHOULD have global scope (that is, the
        // same URI can be used in messages outside this dialog).  The same way,
        // the scope of the URI in the Contact header field of the INVITE is not
        // limited to this dialog either.  It can therefore be used in messages
        // to the UAC even outside this dialog.
        // https://tools.ietf.org/html/rfc3261#section-12.1.1
        const recordRouteHeader = this.message.getHeaders("record-route").map((header) => `Record-Route: ${header}`);
        const contactHeader = `Contact: ${this.core.configuration.contact.toString()}`;
        // A 2xx response to an INVITE SHOULD contain the Allow header field and
        // the Supported header field, and MAY contain the Accept header field.
        // Including these header fields allows the UAC to determine the
        // features and extensions supported by the UAS for the duration of the
        // call, without probing.
        // https://tools.ietf.org/html/rfc3261#section-13.3.1.4
        // FIXME: TODO: This should not be hard coded.
        const allowHeader = "Allow: " + _user_agent_core_allowed_methods_js__WEBPACK_IMPORTED_MODULE_5__.AllowedMethods.toString();
        // FIXME: TODO: Supported header (see reply())
        // FIXME: TODO: Accept header
        // If the INVITE request contained an offer, and the UAS had not yet
        // sent an answer, the 2xx MUST contain an answer.  If the INVITE did
        // not contain an offer, the 2xx MUST contain an offer if the UAS had
        // not yet sent an offer.
        // https://tools.ietf.org/html/rfc3261#section-13.3.1.4
        if (!options.body) {
            if (this.confirmedDialog.signalingState === _session_session_js__WEBPACK_IMPORTED_MODULE_6__.SignalingState.Stable) {
                options.body = this.confirmedDialog.answer; // resend the answer sent in provisional response
            }
            else if (this.confirmedDialog.signalingState === _session_session_js__WEBPACK_IMPORTED_MODULE_6__.SignalingState.Initial ||
                this.confirmedDialog.signalingState === _session_session_js__WEBPACK_IMPORTED_MODULE_6__.SignalingState.HaveRemoteOffer) {
                throw new Error("Response must have a body.");
            }
        }
        options.statusCode = options.statusCode || 200;
        options.extraHeaders = options.extraHeaders || [];
        options.extraHeaders = options.extraHeaders.concat(recordRouteHeader);
        options.extraHeaders.push(allowHeader);
        options.extraHeaders.push(contactHeader);
        const response = super.accept(options);
        const session = this.confirmedDialog;
        const result = Object.assign(Object.assign({}, response), { session });
        // Update dialog signaling state
        if (options.body) {
            // Once the UAS has sent or received an answer to the initial
            // offer, it MUST NOT generate subsequent offers in any responses
            // to the initial INVITE.  This means that a UAS based on this
            // specification alone can never generate subsequent offers until
            // completion of the initial transaction.
            // https://tools.ietf.org/html/rfc3261#section-13.2.1
            if (this.confirmedDialog.signalingState !== _session_session_js__WEBPACK_IMPORTED_MODULE_6__.SignalingState.Stable) {
                this.confirmedDialog.signalingStateTransition(options.body);
            }
        }
        return result;
    }
    /**
     * 13.3.1.1 Progress
     * If the UAS is not able to answer the invitation immediately, it can
     * choose to indicate some kind of progress to the UAC (for example, an
     * indication that a phone is ringing).  This is accomplished with a
     * provisional response between 101 and 199.  These provisional
     * responses establish early dialogs and therefore follow the procedures
     * of Section 12.1.1 in addition to those of Section 8.2.6.  A UAS MAY
     * send as many provisional responses as it likes.  Each of these MUST
     * indicate the same dialog ID.  However, these will not be delivered
     * reliably.
     *
     * If the UAS desires an extended period of time to answer the INVITE,
     * it will need to ask for an "extension" in order to prevent proxies
     * from canceling the transaction.  A proxy has the option of canceling
     * a transaction when there is a gap of 3 minutes between responses in a
     * transaction.  To prevent cancellation, the UAS MUST send a non-100
     * provisional response at every minute, to handle the possibility of
     * lost provisional responses.
     * https://tools.ietf.org/html/rfc3261#section-13.3.1.1
     * @param options - Progress options bucket.
     */
    progress(options = { statusCode: 180 }) {
        if (!this.progressable) {
            throw new _exceptions_transaction_state_error_js__WEBPACK_IMPORTED_MODULE_2__.TransactionStateError(`${this.message.method} not progressable in state ${this.transaction.state}.`);
        }
        // This response establishes a dialog...
        // https://tools.ietf.org/html/rfc3261#section-13.3.1.4
        if (!this.earlyDialog) {
            const transaction = this.transaction;
            if (!(transaction instanceof _transactions_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_1__.InviteServerTransaction)) {
                throw new Error("Transaction not instance of InviteClientTransaction.");
            }
            const state = _dialogs_dialog_js__WEBPACK_IMPORTED_MODULE_3__.Dialog.initialDialogStateForUserAgentServer(this.message, this.toTag, true);
            this.earlyDialog = new _dialogs_session_dialog_js__WEBPACK_IMPORTED_MODULE_4__.SessionDialog(transaction, this.core, state);
        }
        // When a UAS responds to a request with a response that establishes a
        // dialog (such as a 2xx to INVITE), the UAS MUST copy all Record-Route
        // header field values from the request into the response (including the
        // URIs, URI parameters, and any Record-Route header field parameters,
        // whether they are known or unknown to the UAS) and MUST maintain the
        // order of those values.  The UAS MUST add a Contact header field to
        // the response.  The Contact header field contains an address where the
        // UAS would like to be contacted for subsequent requests in the dialog
        // (which includes the ACK for a 2xx response in the case of an INVITE).
        // Generally, the host portion of this URI is the IP address or FQDN of
        // the host.  The URI provided in the Contact header field MUST be a SIP
        // or SIPS URI.  If the request that initiated the dialog contained a
        // SIPS URI in the Request-URI or in the top Record-Route header field
        // value, if there was any, or the Contact header field if there was no
        // Record-Route header field, the Contact header field in the response
        // MUST be a SIPS URI.  The URI SHOULD have global scope (that is, the
        // same URI can be used in messages outside this dialog).  The same way,
        // the scope of the URI in the Contact header field of the INVITE is not
        // limited to this dialog either.  It can therefore be used in messages
        // to the UAC even outside this dialog.
        // https://tools.ietf.org/html/rfc3261#section-12.1.1
        const recordRouteHeader = this.message.getHeaders("record-route").map((header) => `Record-Route: ${header}`);
        const contactHeader = `Contact: ${this.core.configuration.contact}`;
        options.extraHeaders = options.extraHeaders || [];
        options.extraHeaders = options.extraHeaders.concat(recordRouteHeader);
        options.extraHeaders.push(contactHeader);
        const response = super.progress(options);
        const session = this.earlyDialog;
        const result = Object.assign(Object.assign({}, response), { session });
        // Update dialog signaling state
        if (options.body) {
            // Once the UAS has sent or received an answer to the initial
            // offer, it MUST NOT generate subsequent offers in any responses
            // to the initial INVITE.  This means that a UAS based on this
            // specification alone can never generate subsequent offers until
            // completion of the initial transaction.
            // https://tools.ietf.org/html/rfc3261#section-13.2.1
            if (this.earlyDialog.signalingState !== _session_session_js__WEBPACK_IMPORTED_MODULE_6__.SignalingState.Stable) {
                this.earlyDialog.signalingStateTransition(options.body);
            }
        }
        return result;
    }
    /**
     * 13.3.1.2 The INVITE is Redirected
     * If the UAS decides to redirect the call, a 3xx response is sent.  A
     * 300 (Multiple Choices), 301 (Moved Permanently) or 302 (Moved
     * Temporarily) response SHOULD contain a Contact header field
     * containing one or more URIs of new addresses to be tried.  The
     * response is passed to the INVITE server transaction, which will deal
     * with its retransmissions.
     * https://tools.ietf.org/html/rfc3261#section-13.3.1.2
     * @param contacts - Contacts to redirect to.
     * @param options - Redirect options bucket.
     */
    redirect(contacts, options = { statusCode: 302 }) {
        return super.redirect(contacts, options);
    }
    /**
     * 13.3.1.3 The INVITE is Rejected
     * A common scenario occurs when the callee is currently not willing or
     * able to take additional calls at this end system.  A 486 (Busy Here)
     * SHOULD be returned in such a scenario.
     * https://tools.ietf.org/html/rfc3261#section-13.3.1.3
     * @param options - Reject options bucket.
     */
    reject(options = { statusCode: 486 }) {
        return super.reject(options);
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/user-agents/message-user-agent-client.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/user-agents/message-user-agent-client.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MessageUserAgentClient": () => (/* binding */ MessageUserAgentClient)
/* harmony export */ });
/* harmony import */ var _transactions_non_invite_client_transaction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../transactions/non-invite-client-transaction.js */ "./node_modules/sip.js/lib/core/transactions/non-invite-client-transaction.js");
/* harmony import */ var _user_agent_client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-agent-client.js */ "./node_modules/sip.js/lib/core/user-agents/user-agent-client.js");


/**
 * MESSAGE UAC.
 * @public
 */
class MessageUserAgentClient extends _user_agent_client_js__WEBPACK_IMPORTED_MODULE_0__.UserAgentClient {
    constructor(core, message, delegate) {
        super(_transactions_non_invite_client_transaction_js__WEBPACK_IMPORTED_MODULE_1__.NonInviteClientTransaction, core, message, delegate);
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/user-agents/message-user-agent-server.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/user-agents/message-user-agent-server.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MessageUserAgentServer": () => (/* binding */ MessageUserAgentServer)
/* harmony export */ });
/* harmony import */ var _transactions_non_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../transactions/non-invite-server-transaction.js */ "./node_modules/sip.js/lib/core/transactions/non-invite-server-transaction.js");
/* harmony import */ var _user_agent_server_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-agent-server.js */ "./node_modules/sip.js/lib/core/user-agents/user-agent-server.js");


/**
 * MESSAGE UAS.
 * @public
 */
class MessageUserAgentServer extends _user_agent_server_js__WEBPACK_IMPORTED_MODULE_0__.UserAgentServer {
    constructor(core, message, delegate) {
        super(_transactions_non_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_1__.NonInviteServerTransaction, core, message, delegate);
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/user-agents/notify-user-agent-client.js":
/*!******************************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/user-agents/notify-user-agent-client.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotifyUserAgentClient": () => (/* binding */ NotifyUserAgentClient)
/* harmony export */ });
/* harmony import */ var _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../messages/methods/constants.js */ "./node_modules/sip.js/lib/core/messages/methods/constants.js");
/* harmony import */ var _transactions_non_invite_client_transaction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../transactions/non-invite-client-transaction.js */ "./node_modules/sip.js/lib/core/transactions/non-invite-client-transaction.js");
/* harmony import */ var _user_agent_client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-agent-client.js */ "./node_modules/sip.js/lib/core/user-agents/user-agent-client.js");



/**
 * NOTIFY UAS.
 * @public
 */
class NotifyUserAgentClient extends _user_agent_client_js__WEBPACK_IMPORTED_MODULE_0__.UserAgentClient {
    constructor(dialog, delegate, options) {
        const message = dialog.createOutgoingRequestMessage(_messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_1__.C.NOTIFY, options);
        super(_transactions_non_invite_client_transaction_js__WEBPACK_IMPORTED_MODULE_2__.NonInviteClientTransaction, dialog.userAgentCore, message, delegate);
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/user-agents/notify-user-agent-server.js":
/*!******************************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/user-agents/notify-user-agent-server.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NotifyUserAgentServer": () => (/* binding */ NotifyUserAgentServer)
/* harmony export */ });
/* harmony import */ var _transactions_non_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../transactions/non-invite-server-transaction.js */ "./node_modules/sip.js/lib/core/transactions/non-invite-server-transaction.js");
/* harmony import */ var _user_agent_server_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-agent-server.js */ "./node_modules/sip.js/lib/core/user-agents/user-agent-server.js");


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function instanceOfDialog(object) {
    return object.userAgentCore !== undefined;
}
/**
 * NOTIFY UAS.
 * @public
 */
class NotifyUserAgentServer extends _user_agent_server_js__WEBPACK_IMPORTED_MODULE_0__.UserAgentServer {
    /**
     * NOTIFY UAS constructor.
     * @param dialogOrCore - Dialog for in dialog NOTIFY, UserAgentCore for out of dialog NOTIFY (deprecated).
     * @param message - Incoming NOTIFY request message.
     */
    constructor(dialogOrCore, message, delegate) {
        const userAgentCore = instanceOfDialog(dialogOrCore) ? dialogOrCore.userAgentCore : dialogOrCore;
        super(_transactions_non_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_1__.NonInviteServerTransaction, userAgentCore, message, delegate);
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/user-agents/prack-user-agent-client.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/user-agents/prack-user-agent-client.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrackUserAgentClient": () => (/* binding */ PrackUserAgentClient)
/* harmony export */ });
/* harmony import */ var _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../messages/methods/constants.js */ "./node_modules/sip.js/lib/core/messages/methods/constants.js");
/* harmony import */ var _transactions_non_invite_client_transaction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../transactions/non-invite-client-transaction.js */ "./node_modules/sip.js/lib/core/transactions/non-invite-client-transaction.js");
/* harmony import */ var _user_agent_client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-agent-client.js */ "./node_modules/sip.js/lib/core/user-agents/user-agent-client.js");



/**
 * PRACK UAC.
 * @public
 */
class PrackUserAgentClient extends _user_agent_client_js__WEBPACK_IMPORTED_MODULE_0__.UserAgentClient {
    constructor(dialog, delegate, options) {
        const message = dialog.createOutgoingRequestMessage(_messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_1__.C.PRACK, options);
        super(_transactions_non_invite_client_transaction_js__WEBPACK_IMPORTED_MODULE_2__.NonInviteClientTransaction, dialog.userAgentCore, message, delegate);
        dialog.signalingStateTransition(message);
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/user-agents/prack-user-agent-server.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/user-agents/prack-user-agent-server.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PrackUserAgentServer": () => (/* binding */ PrackUserAgentServer)
/* harmony export */ });
/* harmony import */ var _transactions_non_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../transactions/non-invite-server-transaction.js */ "./node_modules/sip.js/lib/core/transactions/non-invite-server-transaction.js");
/* harmony import */ var _user_agent_server_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-agent-server.js */ "./node_modules/sip.js/lib/core/user-agents/user-agent-server.js");


/**
 * PRACK UAS.
 * @public
 */
class PrackUserAgentServer extends _user_agent_server_js__WEBPACK_IMPORTED_MODULE_0__.UserAgentServer {
    constructor(dialog, message, delegate) {
        super(_transactions_non_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_1__.NonInviteServerTransaction, dialog.userAgentCore, message, delegate);
        // Update dialog signaling state with offer/answer in body
        dialog.signalingStateTransition(message);
        this.dialog = dialog;
    }
    /**
     * Update the dialog signaling state on a 2xx response.
     * @param options - Options bucket.
     */
    accept(options = { statusCode: 200 }) {
        if (options.body) {
            // Update dialog signaling state with offer/answer in body
            this.dialog.signalingStateTransition(options.body);
        }
        return super.accept(options);
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/user-agents/publish-user-agent-client.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/user-agents/publish-user-agent-client.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PublishUserAgentClient": () => (/* binding */ PublishUserAgentClient)
/* harmony export */ });
/* harmony import */ var _transactions_non_invite_client_transaction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../transactions/non-invite-client-transaction.js */ "./node_modules/sip.js/lib/core/transactions/non-invite-client-transaction.js");
/* harmony import */ var _user_agent_client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-agent-client.js */ "./node_modules/sip.js/lib/core/user-agents/user-agent-client.js");


/**
 * PUBLISH UAC.
 * @public
 */
class PublishUserAgentClient extends _user_agent_client_js__WEBPACK_IMPORTED_MODULE_0__.UserAgentClient {
    constructor(core, message, delegate) {
        super(_transactions_non_invite_client_transaction_js__WEBPACK_IMPORTED_MODULE_1__.NonInviteClientTransaction, core, message, delegate);
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/user-agents/re-invite-user-agent-client.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/user-agents/re-invite-user-agent-client.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReInviteUserAgentClient": () => (/* binding */ ReInviteUserAgentClient)
/* harmony export */ });
/* harmony import */ var _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../messages/methods/constants.js */ "./node_modules/sip.js/lib/core/messages/methods/constants.js");
/* harmony import */ var _transactions_invite_client_transaction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../transactions/invite-client-transaction.js */ "./node_modules/sip.js/lib/core/transactions/invite-client-transaction.js");
/* harmony import */ var _user_agent_client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-agent-client.js */ "./node_modules/sip.js/lib/core/user-agents/user-agent-client.js");



/**
 * Re-INVITE UAC.
 * @remarks
 * 14 Modifying an Existing Session
 * https://tools.ietf.org/html/rfc3261#section-14
 * 14.1 UAC Behavior
 * https://tools.ietf.org/html/rfc3261#section-14.1
 * @public
 */
class ReInviteUserAgentClient extends _user_agent_client_js__WEBPACK_IMPORTED_MODULE_0__.UserAgentClient {
    constructor(dialog, delegate, options) {
        const message = dialog.createOutgoingRequestMessage(_messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_1__.C.INVITE, options);
        super(_transactions_invite_client_transaction_js__WEBPACK_IMPORTED_MODULE_2__.InviteClientTransaction, dialog.userAgentCore, message, delegate);
        this.delegate = delegate;
        dialog.signalingStateTransition(message);
        // FIXME: TODO: next line obviously needs to be improved...
        dialog.reinviteUserAgentClient = this; // let the dialog know re-invite request sent
        this.dialog = dialog;
    }
    receiveResponse(message) {
        if (!this.authenticationGuard(message, this.dialog)) {
            return;
        }
        const statusCode = message.statusCode ? message.statusCode.toString() : "";
        if (!statusCode) {
            throw new Error("Response status code undefined.");
        }
        switch (true) {
            case /^100$/.test(statusCode):
                if (this.delegate && this.delegate.onTrying) {
                    this.delegate.onTrying({ message });
                }
                break;
            case /^1[0-9]{2}$/.test(statusCode):
                if (this.delegate && this.delegate.onProgress) {
                    this.delegate.onProgress({
                        message,
                        session: this.dialog,
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars
                        prack: (options) => {
                            throw new Error("Unimplemented.");
                        }
                    });
                }
                break;
            case /^2[0-9]{2}$/.test(statusCode):
                // Update dialog signaling state with offer/answer in body
                this.dialog.signalingStateTransition(message);
                if (this.delegate && this.delegate.onAccept) {
                    this.delegate.onAccept({
                        message,
                        session: this.dialog,
                        ack: (options) => {
                            const outgoingAckRequest = this.dialog.ack(options);
                            return outgoingAckRequest;
                        }
                    });
                }
                break;
            case /^3[0-9]{2}$/.test(statusCode):
                this.dialog.signalingStateRollback();
                this.dialog.reinviteUserAgentClient = undefined; // ACK was handled by transaction
                if (this.delegate && this.delegate.onRedirect) {
                    this.delegate.onRedirect({ message });
                }
                break;
            case /^[4-6][0-9]{2}$/.test(statusCode):
                this.dialog.signalingStateRollback();
                this.dialog.reinviteUserAgentClient = undefined; // ACK was handled by transaction
                if (this.delegate && this.delegate.onReject) {
                    this.delegate.onReject({ message });
                }
                else {
                    // If a UA receives a non-2xx final response to a re-INVITE, the session
                    // parameters MUST remain unchanged, as if no re-INVITE had been issued.
                    // Note that, as stated in Section 12.2.1.2, if the non-2xx final
                    // response is a 481 (Call/Transaction Does Not Exist), or a 408
                    // (Request Timeout), or no response at all is received for the re-
                    // INVITE (that is, a timeout is returned by the INVITE client
                    // transaction), the UAC will terminate the dialog.
                    //
                    // If a UAC receives a 491 response to a re-INVITE, it SHOULD start a
                    // timer with a value T chosen as follows:
                    //
                    //    1. If the UAC is the owner of the Call-ID of the dialog ID
                    //       (meaning it generated the value), T has a randomly chosen value
                    //       between 2.1 and 4 seconds in units of 10 ms.
                    //
                    //    2. If the UAC is not the owner of the Call-ID of the dialog ID, T
                    //       has a randomly chosen value of between 0 and 2 seconds in units
                    //       of 10 ms.
                    //
                    // When the timer fires, the UAC SHOULD attempt the re-INVITE once more,
                    // if it still desires for that session modification to take place.  For
                    // example, if the call was already hung up with a BYE, the re-INVITE
                    // would not take place.
                    // https://tools.ietf.org/html/rfc3261#section-14.1
                    // FIXME: TODO: The above.
                }
                break;
            default:
                throw new Error(`Invalid status code ${statusCode}`);
        }
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/user-agents/re-invite-user-agent-server.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/user-agents/re-invite-user-agent-server.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReInviteUserAgentServer": () => (/* binding */ ReInviteUserAgentServer)
/* harmony export */ });
/* harmony import */ var _transactions_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../transactions/invite-server-transaction.js */ "./node_modules/sip.js/lib/core/transactions/invite-server-transaction.js");
/* harmony import */ var _user_agent_server_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-agent-server.js */ "./node_modules/sip.js/lib/core/user-agents/user-agent-server.js");


/**
 * Re-INVITE UAS.
 * @remarks
 * 14 Modifying an Existing Session
 * https://tools.ietf.org/html/rfc3261#section-14
 * 14.2 UAS Behavior
 * https://tools.ietf.org/html/rfc3261#section-14.2
 * @public
 */
class ReInviteUserAgentServer extends _user_agent_server_js__WEBPACK_IMPORTED_MODULE_0__.UserAgentServer {
    constructor(dialog, message, delegate) {
        super(_transactions_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_1__.InviteServerTransaction, dialog.userAgentCore, message, delegate);
        dialog.reinviteUserAgentServer = this;
        this.dialog = dialog;
    }
    /**
     * Update the dialog signaling state on a 2xx response.
     * @param options - Options bucket.
     */
    accept(options = { statusCode: 200 }) {
        // FIXME: The next two lines SHOULD go away, but I suppose it's technically harmless...
        // These are here because some versions of SIP.js prior to 0.13.8 set the route set
        // of all in dialog ACKs based on the Record-Route headers in the associated 2xx
        // response. While this worked for dialog forming 2xx responses, it was technically
        // broken for re-INVITE ACKS as it only worked if the UAS populated the Record-Route
        // headers in the re-INVITE 2xx response (which is not required and a waste of bandwidth
        // as the should be ignored if present in re-INVITE ACKS) and the UAS populated
        // the Record-Route headers with the correct values (would be weird not too, but...).
        // Anyway, for now the technically useless Record-Route headers are being added
        // to maintain "backwards compatibility" with the older broken versions of SIP.js.
        options.extraHeaders = options.extraHeaders || [];
        options.extraHeaders = options.extraHeaders.concat(this.dialog.routeSet.map((route) => `Record-Route: ${route}`));
        // Send and return the response
        const response = super.accept(options);
        const session = this.dialog;
        const result = Object.assign(Object.assign({}, response), { session });
        if (options.body) {
            // Update dialog signaling state with offer/answer in body
            this.dialog.signalingStateTransition(options.body);
        }
        // Update dialog
        this.dialog.reConfirm();
        return result;
    }
    /**
     * Update the dialog signaling state on a 1xx response.
     * @param options - Progress options bucket.
     */
    progress(options = { statusCode: 180 }) {
        // Send and return the response
        const response = super.progress(options);
        const session = this.dialog;
        const result = Object.assign(Object.assign({}, response), { session });
        // Update dialog signaling state
        if (options.body) {
            this.dialog.signalingStateTransition(options.body);
        }
        return result;
    }
    /**
     * TODO: Not Yet Supported
     * @param contacts - Contacts to redirect to.
     * @param options - Redirect options bucket.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    redirect(contacts, options = { statusCode: 302 }) {
        this.dialog.signalingStateRollback();
        this.dialog.reinviteUserAgentServer = undefined; // ACK will be handled by transaction
        throw new Error("Unimplemented.");
    }
    /**
     * 3.1 Background on Re-INVITE Handling by UASs
     * An error response to a re-INVITE has the following semantics.  As
     * specified in Section 12.2.2 of RFC 3261 [RFC3261], if a re-INVITE is
     * rejected, no state changes are performed.
     * https://tools.ietf.org/html/rfc6141#section-3.1
     * @param options - Reject options bucket.
     */
    reject(options = { statusCode: 488 }) {
        this.dialog.signalingStateRollback();
        this.dialog.reinviteUserAgentServer = undefined; // ACK will be handled by transaction
        return super.reject(options);
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/user-agents/re-subscribe-user-agent-client.js":
/*!************************************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/user-agents/re-subscribe-user-agent-client.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReSubscribeUserAgentClient": () => (/* binding */ ReSubscribeUserAgentClient)
/* harmony export */ });
/* harmony import */ var _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../messages/methods/constants.js */ "./node_modules/sip.js/lib/core/messages/methods/constants.js");
/* harmony import */ var _transactions_non_invite_client_transaction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../transactions/non-invite-client-transaction.js */ "./node_modules/sip.js/lib/core/transactions/non-invite-client-transaction.js");
/* harmony import */ var _user_agent_client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-agent-client.js */ "./node_modules/sip.js/lib/core/user-agents/user-agent-client.js");



/**
 * Re-SUBSCRIBE UAC.
 * @public
 */
class ReSubscribeUserAgentClient extends _user_agent_client_js__WEBPACK_IMPORTED_MODULE_0__.UserAgentClient {
    constructor(dialog, delegate, options) {
        const message = dialog.createOutgoingRequestMessage(_messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_1__.C.SUBSCRIBE, options);
        super(_transactions_non_invite_client_transaction_js__WEBPACK_IMPORTED_MODULE_2__.NonInviteClientTransaction, dialog.userAgentCore, message, delegate);
        this.dialog = dialog;
    }
    waitNotifyStop() {
        // TODO: Placeholder. Not utilized currently.
        return;
    }
    /**
     * Receive a response from the transaction layer.
     * @param message - Incoming response message.
     */
    receiveResponse(message) {
        if (message.statusCode && message.statusCode >= 200 && message.statusCode < 300) {
            //  The "Expires" header field in a 200-class response to SUBSCRIBE
            //  request indicates the actual duration for which the subscription will
            //  remain active (unless refreshed).  The received value might be
            //  smaller than the value indicated in the SUBSCRIBE request but cannot
            //  be larger; see Section 4.2.1 for details.
            // https://tools.ietf.org/html/rfc6665#section-4.1.2.1
            const expires = message.getHeader("Expires");
            if (!expires) {
                this.logger.warn("Expires header missing in a 200-class response to SUBSCRIBE");
            }
            else {
                const subscriptionExpiresReceived = Number(expires);
                if (this.dialog.subscriptionExpires > subscriptionExpiresReceived) {
                    this.dialog.subscriptionExpires = subscriptionExpiresReceived;
                }
            }
        }
        if (message.statusCode && message.statusCode >= 400 && message.statusCode < 700) {
            // If a SUBSCRIBE request to refresh a subscription receives a 404, 405,
            // 410, 416, 480-485, 489, 501, or 604 response, the subscriber MUST
            // consider the subscription terminated.  (See [RFC5057] for further
            // details and notes about the effect of error codes on dialogs and
            // usages within dialog, such as subscriptions).  If the subscriber
            // wishes to re-subscribe to the state, he does so by composing an
            // unrelated initial SUBSCRIBE request with a freshly generated Call-ID
            // and a new, unique "From" tag (see Section 4.1.2.1).
            // https://tools.ietf.org/html/rfc6665#section-4.1.2.2
            const errorCodes = [404, 405, 410, 416, 480, 481, 482, 483, 484, 485, 489, 501, 604];
            if (errorCodes.includes(message.statusCode)) {
                this.dialog.terminate();
            }
            // If a SUBSCRIBE request to refresh a subscription fails with any error
            // code other than those listed above, the original subscription is
            // still considered valid for the duration of the most recently known
            // "Expires" value as negotiated by the most recent successful SUBSCRIBE
            // transaction, or as communicated by a NOTIFY request in its
            // "Subscription-State" header field "expires" parameter.
            // https://tools.ietf.org/html/rfc6665#section-4.1.2.2
        }
        super.receiveResponse(message);
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/user-agents/re-subscribe-user-agent-server.js":
/*!************************************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/user-agents/re-subscribe-user-agent-server.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReSubscribeUserAgentServer": () => (/* binding */ ReSubscribeUserAgentServer)
/* harmony export */ });
/* harmony import */ var _transactions_non_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../transactions/non-invite-server-transaction.js */ "./node_modules/sip.js/lib/core/transactions/non-invite-server-transaction.js");
/* harmony import */ var _user_agent_server_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-agent-server.js */ "./node_modules/sip.js/lib/core/user-agents/user-agent-server.js");


/**
 * Re-SUBSCRIBE UAS.
 * @public
 */
class ReSubscribeUserAgentServer extends _user_agent_server_js__WEBPACK_IMPORTED_MODULE_0__.UserAgentServer {
    constructor(dialog, message, delegate) {
        super(_transactions_non_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_1__.NonInviteServerTransaction, dialog.userAgentCore, message, delegate);
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/user-agents/refer-user-agent-client.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/user-agents/refer-user-agent-client.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReferUserAgentClient": () => (/* binding */ ReferUserAgentClient)
/* harmony export */ });
/* harmony import */ var _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../messages/methods/constants.js */ "./node_modules/sip.js/lib/core/messages/methods/constants.js");
/* harmony import */ var _transactions_non_invite_client_transaction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../transactions/non-invite-client-transaction.js */ "./node_modules/sip.js/lib/core/transactions/non-invite-client-transaction.js");
/* harmony import */ var _user_agent_client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-agent-client.js */ "./node_modules/sip.js/lib/core/user-agents/user-agent-client.js");



/**
 * REFER UAC.
 * @public
 */
class ReferUserAgentClient extends _user_agent_client_js__WEBPACK_IMPORTED_MODULE_0__.UserAgentClient {
    constructor(dialog, delegate, options) {
        const message = dialog.createOutgoingRequestMessage(_messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_1__.C.REFER, options);
        super(_transactions_non_invite_client_transaction_js__WEBPACK_IMPORTED_MODULE_2__.NonInviteClientTransaction, dialog.userAgentCore, message, delegate);
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/user-agents/refer-user-agent-server.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/user-agents/refer-user-agent-server.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ReferUserAgentServer": () => (/* binding */ ReferUserAgentServer)
/* harmony export */ });
/* harmony import */ var _transactions_non_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../transactions/non-invite-server-transaction.js */ "./node_modules/sip.js/lib/core/transactions/non-invite-server-transaction.js");
/* harmony import */ var _user_agent_server_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-agent-server.js */ "./node_modules/sip.js/lib/core/user-agents/user-agent-server.js");


// eslint-disable-next-line @typescript-eslint/no-explicit-any
function instanceOfSessionDialog(object) {
    return object.userAgentCore !== undefined;
}
/**
 * REFER UAS.
 * @public
 */
class ReferUserAgentServer extends _user_agent_server_js__WEBPACK_IMPORTED_MODULE_0__.UserAgentServer {
    /**
     * REFER UAS constructor.
     * @param dialogOrCore - Dialog for in dialog REFER, UserAgentCore for out of dialog REFER.
     * @param message - Incoming REFER request message.
     */
    constructor(dialogOrCore, message, delegate) {
        const userAgentCore = instanceOfSessionDialog(dialogOrCore) ? dialogOrCore.userAgentCore : dialogOrCore;
        super(_transactions_non_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_1__.NonInviteServerTransaction, userAgentCore, message, delegate);
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/user-agents/register-user-agent-client.js":
/*!********************************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/user-agents/register-user-agent-client.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RegisterUserAgentClient": () => (/* binding */ RegisterUserAgentClient)
/* harmony export */ });
/* harmony import */ var _transactions_non_invite_client_transaction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../transactions/non-invite-client-transaction.js */ "./node_modules/sip.js/lib/core/transactions/non-invite-client-transaction.js");
/* harmony import */ var _user_agent_client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-agent-client.js */ "./node_modules/sip.js/lib/core/user-agents/user-agent-client.js");


/**
 * REGISTER UAC.
 * @public
 */
class RegisterUserAgentClient extends _user_agent_client_js__WEBPACK_IMPORTED_MODULE_0__.UserAgentClient {
    constructor(core, message, delegate) {
        super(_transactions_non_invite_client_transaction_js__WEBPACK_IMPORTED_MODULE_1__.NonInviteClientTransaction, core, message, delegate);
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/user-agents/register-user-agent-server.js":
/*!********************************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/user-agents/register-user-agent-server.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RegisterUserAgentServer": () => (/* binding */ RegisterUserAgentServer)
/* harmony export */ });
/* harmony import */ var _transactions_non_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../transactions/non-invite-server-transaction.js */ "./node_modules/sip.js/lib/core/transactions/non-invite-server-transaction.js");
/* harmony import */ var _user_agent_server_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-agent-server.js */ "./node_modules/sip.js/lib/core/user-agents/user-agent-server.js");


/**
 * REGISTER UAS.
 * @public
 */
class RegisterUserAgentServer extends _user_agent_server_js__WEBPACK_IMPORTED_MODULE_0__.UserAgentServer {
    constructor(core, message, delegate) {
        super(_transactions_non_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_1__.NonInviteServerTransaction, core, message, delegate);
        this.core = core;
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/user-agents/subscribe-user-agent-client.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/user-agents/subscribe-user-agent-client.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SubscribeUserAgentClient": () => (/* binding */ SubscribeUserAgentClient)
/* harmony export */ });
/* harmony import */ var _dialogs_subscription_dialog_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dialogs/subscription-dialog.js */ "./node_modules/sip.js/lib/core/dialogs/subscription-dialog.js");
/* harmony import */ var _subscription_subscription_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../subscription/subscription.js */ "./node_modules/sip.js/lib/core/subscription/subscription.js");
/* harmony import */ var _timers_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../timers.js */ "./node_modules/sip.js/lib/core/timers.js");
/* harmony import */ var _transactions_non_invite_client_transaction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../transactions/non-invite-client-transaction.js */ "./node_modules/sip.js/lib/core/transactions/non-invite-client-transaction.js");
/* harmony import */ var _user_agent_client_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-agent-client.js */ "./node_modules/sip.js/lib/core/user-agents/user-agent-client.js");





/**
 * SUBSCRIBE UAC.
 * @remarks
 * 4.1.  Subscriber Behavior
 * https://tools.ietf.org/html/rfc6665#section-4.1
 *
 * User agent client for installation of a single subscription per SUBSCRIBE request.
 * TODO: Support for installation of multiple subscriptions on forked SUBSCRIBE requests.
 * @public
 */
class SubscribeUserAgentClient extends _user_agent_client_js__WEBPACK_IMPORTED_MODULE_0__.UserAgentClient {
    constructor(core, message, delegate) {
        // Get event from request message.
        const event = message.getHeader("Event");
        if (!event) {
            throw new Error("Event undefined");
        }
        // Get expires from request message.
        const expires = message.getHeader("Expires");
        if (!expires) {
            throw new Error("Expires undefined");
        }
        super(_transactions_non_invite_client_transaction_js__WEBPACK_IMPORTED_MODULE_1__.NonInviteClientTransaction, core, message, delegate);
        this.delegate = delegate;
        // FIXME: Subscriber id should also be matching on event id.
        this.subscriberId = message.callId + message.fromTag + event;
        this.subscriptionExpiresRequested = this.subscriptionExpires = Number(expires);
        this.subscriptionEvent = event;
        this.subscriptionState = _subscription_subscription_js__WEBPACK_IMPORTED_MODULE_2__.SubscriptionState.NotifyWait;
        // Start waiting for a NOTIFY we can use to create a subscription.
        this.waitNotifyStart();
    }
    /**
     * Destructor.
     * Note that Timer N may live on waiting for an initial NOTIFY and
     * the delegate may still receive that NOTIFY. If you don't want
     * that behavior then either clear the delegate so the delegate
     * doesn't get called (a 200 will be sent in response to the NOTIFY)
     * or call `waitNotifyStop` which will clear Timer N and remove this
     * UAC from the core (a 481 will be sent in response to the NOTIFY).
     */
    dispose() {
        super.dispose();
    }
    /**
     * Handle out of dialog NOTIFY associated with SUBSCRIBE request.
     * This is the first NOTIFY received after the SUBSCRIBE request.
     * @param uas - User agent server handling the subscription creating NOTIFY.
     */
    onNotify(uas) {
        // NOTIFY requests are matched to such SUBSCRIBE requests if they
        // contain the same "Call-ID", a "To" header field "tag" parameter that
        // matches the "From" header field "tag" parameter of the SUBSCRIBE
        // request, and the same "Event" header field.  Rules for comparisons of
        // the "Event" header fields are described in Section 8.2.1.
        // https://tools.ietf.org/html/rfc6665#section-4.4.1
        const event = uas.message.parseHeader("Event").event;
        if (!event || event !== this.subscriptionEvent) {
            this.logger.warn(`Failed to parse event.`);
            uas.reject({ statusCode: 489 });
            return;
        }
        // NOTIFY requests MUST contain "Subscription-State" header fields that
        // indicate the status of the subscription.
        // https://tools.ietf.org/html/rfc6665#section-4.1.3
        const subscriptionState = uas.message.parseHeader("Subscription-State");
        if (!subscriptionState || !subscriptionState.state) {
            this.logger.warn("Failed to parse subscription state.");
            uas.reject({ statusCode: 489 });
            return;
        }
        // Validate subscription state.
        const state = subscriptionState.state;
        switch (state) {
            case "pending":
                break;
            case "active":
                break;
            case "terminated":
                break;
            default:
                this.logger.warn(`Invalid subscription state ${state}`);
                uas.reject({ statusCode: 489 });
                return;
        }
        // Dialogs usages are created upon completion of a NOTIFY transaction
        // for a new subscription, unless the NOTIFY request contains a
        // "Subscription-State" of "terminated."
        // https://tools.ietf.org/html/rfc6665#section-4.4.1
        if (state !== "terminated") {
            // The Contact header field MUST be present and contain exactly one SIP
            // or SIPS URI in any request that can result in the establishment of a
            // dialog.
            // https://tools.ietf.org/html/rfc3261#section-8.1.1.8
            const contact = uas.message.parseHeader("contact");
            if (!contact) {
                this.logger.warn("Failed to parse contact.");
                uas.reject({ statusCode: 489 });
                return;
            }
        }
        // In accordance with the rules for proxying non-INVITE requests as
        // defined in [RFC3261], successful SUBSCRIBE requests will receive only
        // one 200-class response; however, due to forking, the subscription may
        // have been accepted by multiple nodes.  The subscriber MUST therefore
        // be prepared to receive NOTIFY requests with "From:" tags that differ
        // from the "To:" tag received in the SUBSCRIBE 200-class response.
        //
        // If multiple NOTIFY requests are received in different dialogs in
        // response to a single SUBSCRIBE request, each dialog represents a
        // different destination to which the SUBSCRIBE request was forked.
        // Subscriber handling in such situations varies by event package; see
        // Section 5.4.9 for details.
        // https://tools.ietf.org/html/rfc6665#section-4.1.4
        // Each event package MUST specify whether forked SUBSCRIBE requests are
        // allowed to install multiple subscriptions.
        //
        // If such behavior is not allowed, the first potential dialog-
        // establishing message will create a dialog.  All subsequent NOTIFY
        // requests that correspond to the SUBSCRIBE request (i.e., have
        // matching "To", "From", "Call-ID", and "Event" header fields, as well
        // as "From" header field "tag" parameter and "Event" header field "id"
        // parameter) but that do not match the dialog would be rejected with a
        // 481 response.  Note that the 200-class response to the SUBSCRIBE
        // request can arrive after a matching NOTIFY request has been received;
        // such responses might not correlate to the same dialog established by
        // the NOTIFY request.  Except as required to complete the SUBSCRIBE
        // transaction, such non-matching 200-class responses are ignored.
        //
        // If installing of multiple subscriptions by way of a single forked
        // SUBSCRIBE request is allowed, the subscriber establishes a new dialog
        // towards each notifier by returning a 200-class response to each
        // NOTIFY request.  Each dialog is then handled as its own entity and is
        // refreshed independently of the other dialogs.
        //
        // In the case that multiple subscriptions are allowed, the event
        // package MUST specify whether merging of the notifications to form a
        // single state is required, and how such merging is to be performed.
        // Note that it is possible that some event packages may be defined in
        // such a way that each dialog is tied to a mutually exclusive state
        // that is unaffected by the other dialogs; this MUST be clearly stated
        // if it is the case.
        // https://tools.ietf.org/html/rfc6665#section-5.4.9
        // *** NOTE: This implementation is only for event packages which
        // do not allow forked requests to install multiple subscriptions.
        // As such and in accordance with the specification, we stop waiting
        // and any future NOTIFY requests will be rejected with a 481.
        if (this.dialog) {
            throw new Error("Dialog already created. This implementation only supports install of single subscriptions.");
        }
        this.waitNotifyStop();
        // Update expires.
        this.subscriptionExpires = subscriptionState.expires
            ? Math.min(this.subscriptionExpires, Math.max(subscriptionState.expires, 0))
            : this.subscriptionExpires;
        // Update subscription state.
        switch (state) {
            case "pending":
                this.subscriptionState = _subscription_subscription_js__WEBPACK_IMPORTED_MODULE_2__.SubscriptionState.Pending;
                break;
            case "active":
                this.subscriptionState = _subscription_subscription_js__WEBPACK_IMPORTED_MODULE_2__.SubscriptionState.Active;
                break;
            case "terminated":
                this.subscriptionState = _subscription_subscription_js__WEBPACK_IMPORTED_MODULE_2__.SubscriptionState.Terminated;
                break;
            default:
                throw new Error(`Unrecognized state ${state}.`);
        }
        // Dialogs usages are created upon completion of a NOTIFY transaction
        // for a new subscription, unless the NOTIFY request contains a
        // "Subscription-State" of "terminated."
        // https://tools.ietf.org/html/rfc6665#section-4.4.1
        if (this.subscriptionState !== _subscription_subscription_js__WEBPACK_IMPORTED_MODULE_2__.SubscriptionState.Terminated) {
            // Because the dialog usage is established by the NOTIFY request, the
            // route set at the subscriber is taken from the NOTIFY request itself,
            // as opposed to the route set present in the 200-class response to the
            // SUBSCRIBE request.
            // https://tools.ietf.org/html/rfc6665#section-4.4.1
            const dialogState = _dialogs_subscription_dialog_js__WEBPACK_IMPORTED_MODULE_3__.SubscriptionDialog.initialDialogStateForSubscription(this.message, uas.message);
            // Subscription Initiated! :)
            this.dialog = new _dialogs_subscription_dialog_js__WEBPACK_IMPORTED_MODULE_3__.SubscriptionDialog(this.subscriptionEvent, this.subscriptionExpires, this.subscriptionState, this.core, dialogState);
        }
        // Delegate.
        if (this.delegate && this.delegate.onNotify) {
            const request = uas;
            const subscription = this.dialog;
            this.delegate.onNotify({ request, subscription });
        }
        else {
            uas.accept();
        }
    }
    waitNotifyStart() {
        if (!this.N) {
            // Add ourselves to the core's subscriber map.
            // This allows the core to route out of dialog NOTIFY messages to us.
            this.core.subscribers.set(this.subscriberId, this);
            this.N = setTimeout(() => this.timerN(), _timers_js__WEBPACK_IMPORTED_MODULE_4__.Timers.TIMER_N);
        }
    }
    waitNotifyStop() {
        if (this.N) {
            // Remove ourselves to the core's subscriber map.
            // Any future out of dialog NOTIFY messages will be rejected with a 481.
            this.core.subscribers.delete(this.subscriberId);
            clearTimeout(this.N);
            this.N = undefined;
        }
    }
    /**
     * Receive a response from the transaction layer.
     * @param message - Incoming response message.
     */
    receiveResponse(message) {
        if (!this.authenticationGuard(message)) {
            return;
        }
        if (message.statusCode && message.statusCode >= 200 && message.statusCode < 300) {
            //  The "Expires" header field in a 200-class response to SUBSCRIBE
            //  request indicates the actual duration for which the subscription will
            //  remain active (unless refreshed).  The received value might be
            //  smaller than the value indicated in the SUBSCRIBE request but cannot
            //  be larger; see Section 4.2.1 for details.
            // https://tools.ietf.org/html/rfc6665#section-4.1.2.1
            // The "Expires" values present in SUBSCRIBE 200-class responses behave
            // in the same way as they do in REGISTER responses: the server MAY
            // shorten the interval but MUST NOT lengthen it.
            //
            //    If the duration specified in a SUBSCRIBE request is unacceptably
            //    short, the notifier may be able to send a 423 response, as
            //    described earlier in this section.
            //
            // 200-class responses to SUBSCRIBE requests will not generally contain
            // any useful information beyond subscription duration; their primary
            // purpose is to serve as a reliability mechanism.  State information
            // will be communicated via a subsequent NOTIFY request from the
            // notifier.
            // https://tools.ietf.org/html/rfc6665#section-4.2.1.1
            const expires = message.getHeader("Expires");
            if (!expires) {
                this.logger.warn("Expires header missing in a 200-class response to SUBSCRIBE");
            }
            else {
                const subscriptionExpiresReceived = Number(expires);
                if (subscriptionExpiresReceived > this.subscriptionExpiresRequested) {
                    this.logger.warn("Expires header in a 200-class response to SUBSCRIBE with a higher value than the one in the request");
                }
                if (subscriptionExpiresReceived < this.subscriptionExpires) {
                    this.subscriptionExpires = subscriptionExpiresReceived;
                }
            }
            // If a NOTIFY arrived before 200-class response a dialog may have been created.
            // Updated the dialogs expiration only if this indicates earlier expiration.
            if (this.dialog) {
                if (this.dialog.subscriptionExpires > this.subscriptionExpires) {
                    this.dialog.subscriptionExpires = this.subscriptionExpires;
                }
            }
        }
        if (message.statusCode && message.statusCode >= 300 && message.statusCode < 700) {
            this.waitNotifyStop(); // No NOTIFY will be sent after a negative final response.
        }
        super.receiveResponse(message);
    }
    /**
     * To ensure that subscribers do not wait indefinitely for a
     * subscription to be established, a subscriber starts a Timer N, set to
     * 64*T1, when it sends a SUBSCRIBE request.  If this Timer N expires
     * prior to the receipt of a NOTIFY request, the subscriber considers
     * the subscription failed, and cleans up any state associated with the
     * subscription attempt.
     * https://tools.ietf.org/html/rfc6665#section-4.1.2.4
     */
    timerN() {
        this.logger.warn(`Timer N expired for SUBSCRIBE user agent client. Timed out waiting for NOTIFY.`);
        this.waitNotifyStop();
        if (this.delegate && this.delegate.onNotifyTimeout) {
            this.delegate.onNotifyTimeout();
        }
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/user-agents/subscribe-user-agent-server.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/user-agents/subscribe-user-agent-server.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SubscribeUserAgentServer": () => (/* binding */ SubscribeUserAgentServer)
/* harmony export */ });
/* harmony import */ var _transactions_non_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../transactions/non-invite-server-transaction.js */ "./node_modules/sip.js/lib/core/transactions/non-invite-server-transaction.js");
/* harmony import */ var _user_agent_server_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./user-agent-server.js */ "./node_modules/sip.js/lib/core/user-agents/user-agent-server.js");


/**
 * SUBSCRIBE UAS.
 * @public
 */
class SubscribeUserAgentServer extends _user_agent_server_js__WEBPACK_IMPORTED_MODULE_0__.UserAgentServer {
    constructor(core, message, delegate) {
        super(_transactions_non_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_1__.NonInviteServerTransaction, core, message, delegate);
        this.core = core;
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/user-agents/user-agent-client.js":
/*!***********************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/user-agents/user-agent-client.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserAgentClient": () => (/* binding */ UserAgentClient)
/* harmony export */ });
/* harmony import */ var _messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../messages/methods/constants.js */ "./node_modules/sip.js/lib/core/messages/methods/constants.js");
/* harmony import */ var _messages_incoming_response_message_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../messages/incoming-response-message.js */ "./node_modules/sip.js/lib/core/messages/incoming-response-message.js");
/* harmony import */ var _transactions_non_invite_client_transaction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../transactions/non-invite-client-transaction.js */ "./node_modules/sip.js/lib/core/transactions/non-invite-client-transaction.js");
/* harmony import */ var _transactions_transaction_state_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../transactions/transaction-state.js */ "./node_modules/sip.js/lib/core/transactions/transaction-state.js");




/**
 * User Agent Client (UAC).
 * @remarks
 * A user agent client is a logical entity
 * that creates a new request, and then uses the client
 * transaction state machinery to send it.  The role of UAC lasts
 * only for the duration of that transaction.  In other words, if
 * a piece of software initiates a request, it acts as a UAC for
 * the duration of that transaction.  If it receives a request
 * later, it assumes the role of a user agent server for the
 * processing of that transaction.
 * https://tools.ietf.org/html/rfc3261#section-6
 * @public
 */
class UserAgentClient {
    constructor(transactionConstructor, core, message, delegate) {
        this.transactionConstructor = transactionConstructor;
        this.core = core;
        this.message = message;
        this.delegate = delegate;
        this.challenged = false;
        this.stale = false;
        this.logger = this.loggerFactory.getLogger("sip.user-agent-client");
        this.init();
    }
    dispose() {
        this.transaction.dispose();
    }
    get loggerFactory() {
        return this.core.loggerFactory;
    }
    /** The transaction associated with this request. */
    get transaction() {
        if (!this._transaction) {
            throw new Error("Transaction undefined.");
        }
        return this._transaction;
    }
    /**
     * Since requests other than INVITE are responded to immediately, sending a
     * CANCEL for a non-INVITE request would always create a race condition.
     * A CANCEL request SHOULD NOT be sent to cancel a request other than INVITE.
     * https://tools.ietf.org/html/rfc3261#section-9.1
     * @param options - Cancel options bucket.
     */
    cancel(reason, options = {}) {
        if (!this.transaction) {
            throw new Error("Transaction undefined.");
        }
        if (!this.message.to) {
            throw new Error("To undefined.");
        }
        if (!this.message.from) {
            throw new Error("From undefined.");
        }
        // The following procedures are used to construct a CANCEL request.  The
        // Request-URI, Call-ID, To, the numeric part of CSeq, and From header
        // fields in the CANCEL request MUST be identical to those in the
        // request being cancelled, including tags.  A CANCEL constructed by a
        // client MUST have only a single Via header field value matching the
        // top Via value in the request being cancelled.  Using the same values
        // for these header fields allows the CANCEL to be matched with the
        // request it cancels (Section 9.2 indicates how such matching occurs).
        // However, the method part of the CSeq header field MUST have a value
        // of CANCEL.  This allows it to be identified and processed as a
        // transaction in its own right (See Section 17).
        // https://tools.ietf.org/html/rfc3261#section-9.1
        const message = this.core.makeOutgoingRequestMessage(_messages_methods_constants_js__WEBPACK_IMPORTED_MODULE_0__.C.CANCEL, this.message.ruri, this.message.from.uri, this.message.to.uri, {
            toTag: this.message.toTag,
            fromTag: this.message.fromTag,
            callId: this.message.callId,
            cseq: this.message.cseq
        }, options.extraHeaders);
        // TODO: Revisit this.
        // The CANCEL needs to use the same branch parameter so that
        // it matches the INVITE transaction, but this is a hacky way to do this.
        // Or at the very least not well documented. If the the branch parameter
        // is set on the outgoing request, the transaction will use it.
        // Otherwise the transaction will make a new one.
        message.branch = this.message.branch;
        if (this.message.headers.Route) {
            message.headers.Route = this.message.headers.Route;
        }
        if (reason) {
            message.setHeader("Reason", reason);
        }
        // If no provisional response has been received, the CANCEL request MUST
        // NOT be sent; rather, the client MUST wait for the arrival of a
        // provisional response before sending the request. If the original
        // request has generated a final response, the CANCEL SHOULD NOT be
        // sent, as it is an effective no-op, since CANCEL has no effect on
        // requests that have already generated a final response.
        // https://tools.ietf.org/html/rfc3261#section-9.1
        if (this.transaction.state === _transactions_transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Proceeding) {
            new UserAgentClient(_transactions_non_invite_client_transaction_js__WEBPACK_IMPORTED_MODULE_2__.NonInviteClientTransaction, this.core, message);
        }
        else {
            this.transaction.addStateChangeListener(() => {
                if (this.transaction && this.transaction.state === _transactions_transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Proceeding) {
                    new UserAgentClient(_transactions_non_invite_client_transaction_js__WEBPACK_IMPORTED_MODULE_2__.NonInviteClientTransaction, this.core, message);
                }
            }, { once: true });
        }
        return message;
    }
    /**
     * If a 401 (Unauthorized) or 407 (Proxy Authentication Required)
     * response is received, the UAC SHOULD follow the authorization
     * procedures of Section 22.2 and Section 22.3 to retry the request with
     * credentials.
     * https://tools.ietf.org/html/rfc3261#section-8.1.3.5
     * 22 Usage of HTTP Authentication
     * https://tools.ietf.org/html/rfc3261#section-22
     * 22.1 Framework
     * https://tools.ietf.org/html/rfc3261#section-22.1
     * 22.2 User-to-User Authentication
     * https://tools.ietf.org/html/rfc3261#section-22.2
     * 22.3 Proxy-to-User Authentication
     * https://tools.ietf.org/html/rfc3261#section-22.3
     *
     * FIXME: This "guard for and retry the request with credentials"
     * implementation is not complete and at best minimally passable.
     * @param response - The incoming response to guard.
     * @param dialog - If defined, the dialog within which the response was received.
     * @returns True if the program execution is to continue in the branch in question.
     *          Otherwise the request is retried with credentials and current request processing must stop.
     */
    authenticationGuard(message, dialog) {
        const statusCode = message.statusCode;
        if (!statusCode) {
            throw new Error("Response status code undefined.");
        }
        // If a 401 (Unauthorized) or 407 (Proxy Authentication Required)
        // response is received, the UAC SHOULD follow the authorization
        // procedures of Section 22.2 and Section 22.3 to retry the request with
        // credentials.
        // https://tools.ietf.org/html/rfc3261#section-8.1.3.5
        if (statusCode !== 401 && statusCode !== 407) {
            return true;
        }
        // Get and parse the appropriate WWW-Authenticate or Proxy-Authenticate header.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let challenge;
        let authorizationHeaderName;
        if (statusCode === 401) {
            challenge = message.parseHeader("www-authenticate");
            authorizationHeaderName = "authorization";
        }
        else {
            challenge = message.parseHeader("proxy-authenticate");
            authorizationHeaderName = "proxy-authorization";
        }
        // Verify it seems a valid challenge.
        if (!challenge) {
            this.logger.warn(statusCode + " with wrong or missing challenge, cannot authenticate");
            return true;
        }
        // Avoid infinite authentications.
        if (this.challenged && (this.stale || challenge.stale !== true)) {
            this.logger.warn(statusCode + " apparently in authentication loop, cannot authenticate");
            return true;
        }
        // Get credentials.
        if (!this.credentials) {
            this.credentials = this.core.configuration.authenticationFactory();
            if (!this.credentials) {
                this.logger.warn("Unable to obtain credentials, cannot authenticate");
                return true;
            }
        }
        // Verify that the challenge is really valid.
        if (!this.credentials.authenticate(this.message, challenge)) {
            return true;
        }
        this.challenged = true;
        if (challenge.stale) {
            this.stale = true;
        }
        // If response to out of dialog request, assume incrementing the CSeq will suffice.
        let cseq = (this.message.cseq += 1);
        // If response to in dialog request, get a valid next CSeq number.
        if (dialog && dialog.localSequenceNumber) {
            dialog.incrementLocalSequenceNumber();
            cseq = this.message.cseq = dialog.localSequenceNumber;
        }
        this.message.setHeader("cseq", cseq + " " + this.message.method);
        this.message.setHeader(authorizationHeaderName, this.credentials.toString());
        // Calling init (again) will swap out our existing client transaction with a new one.
        // FIXME: HACK: An assumption is being made here that there is nothing that needs to
        // be cleaned up beyond the client transaction which is being replaced. For example,
        // it is assumed that no early dialogs have been created.
        this.init();
        return false;
    }
    /**
     * 8.1.3.1 Transaction Layer Errors
     * In some cases, the response returned by the transaction layer will
     * not be a SIP message, but rather a transaction layer error.  When a
     * timeout error is received from the transaction layer, it MUST be
     * treated as if a 408 (Request Timeout) status code has been received.
     * If a fatal transport error is reported by the transport layer
     * (generally, due to fatal ICMP errors in UDP or connection failures in
     * TCP), the condition MUST be treated as a 503 (Service Unavailable)
     * status code.
     * https://tools.ietf.org/html/rfc3261#section-8.1.3.1
     */
    onRequestTimeout() {
        this.logger.warn("User agent client request timed out. Generating internal 408 Request Timeout.");
        const message = new _messages_incoming_response_message_js__WEBPACK_IMPORTED_MODULE_3__.IncomingResponseMessage();
        message.statusCode = 408;
        message.reasonPhrase = "Request Timeout";
        this.receiveResponse(message);
        return;
    }
    /**
     * 8.1.3.1 Transaction Layer Errors
     * In some cases, the response returned by the transaction layer will
     * not be a SIP message, but rather a transaction layer error.  When a
     * timeout error is received from the transaction layer, it MUST be
     * treated as if a 408 (Request Timeout) status code has been received.
     * If a fatal transport error is reported by the transport layer
     * (generally, due to fatal ICMP errors in UDP or connection failures in
     * TCP), the condition MUST be treated as a 503 (Service Unavailable)
     * status code.
     * https://tools.ietf.org/html/rfc3261#section-8.1.3.1
     * @param error - Transport error
     */
    onTransportError(error) {
        this.logger.error(error.message);
        this.logger.error("User agent client request transport error. Generating internal 503 Service Unavailable.");
        const message = new _messages_incoming_response_message_js__WEBPACK_IMPORTED_MODULE_3__.IncomingResponseMessage();
        message.statusCode = 503;
        message.reasonPhrase = "Service Unavailable";
        this.receiveResponse(message);
    }
    /**
     * Receive a response from the transaction layer.
     * @param message - Incoming response message.
     */
    receiveResponse(message) {
        if (!this.authenticationGuard(message)) {
            return;
        }
        const statusCode = message.statusCode ? message.statusCode.toString() : "";
        if (!statusCode) {
            throw new Error("Response status code undefined.");
        }
        switch (true) {
            case /^100$/.test(statusCode):
                if (this.delegate && this.delegate.onTrying) {
                    this.delegate.onTrying({ message });
                }
                break;
            case /^1[0-9]{2}$/.test(statusCode):
                if (this.delegate && this.delegate.onProgress) {
                    this.delegate.onProgress({ message });
                }
                break;
            case /^2[0-9]{2}$/.test(statusCode):
                if (this.delegate && this.delegate.onAccept) {
                    this.delegate.onAccept({ message });
                }
                break;
            case /^3[0-9]{2}$/.test(statusCode):
                if (this.delegate && this.delegate.onRedirect) {
                    this.delegate.onRedirect({ message });
                }
                break;
            case /^[4-6][0-9]{2}$/.test(statusCode):
                if (this.delegate && this.delegate.onReject) {
                    this.delegate.onReject({ message });
                }
                break;
            default:
                throw new Error(`Invalid status code ${statusCode}`);
        }
    }
    init() {
        // We are the transaction user.
        const user = {
            loggerFactory: this.loggerFactory,
            onRequestTimeout: () => this.onRequestTimeout(),
            onStateChange: (newState) => {
                if (newState === _transactions_transaction_state_js__WEBPACK_IMPORTED_MODULE_1__.TransactionState.Terminated) {
                    // Remove the terminated transaction from the core.
                    // eslint-disable-next-line @typescript-eslint/no-use-before-define
                    this.core.userAgentClients.delete(userAgentClientId);
                    // FIXME: HACK: Our transaction may have been swapped out with a new one
                    // post authentication (see above), so make sure to only to dispose of
                    // ourselves if this terminating transaction is our current transaction.
                    // eslint-disable-next-line @typescript-eslint/no-use-before-define
                    if (transaction === this._transaction) {
                        this.dispose();
                    }
                }
            },
            onTransportError: (error) => this.onTransportError(error),
            receiveResponse: (message) => this.receiveResponse(message)
        };
        // Create a new transaction with us as the user.
        const transaction = new this.transactionConstructor(this.message, this.core.transport, user);
        this._transaction = transaction;
        // Add the new transaction to the core.
        const userAgentClientId = transaction.id + transaction.request.method;
        this.core.userAgentClients.set(userAgentClientId, this);
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/core/user-agents/user-agent-server.js":
/*!***********************************************************************!*\
  !*** ./node_modules/sip.js/lib/core/user-agents/user-agent-server.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UserAgentServer": () => (/* binding */ UserAgentServer)
/* harmony export */ });
/* harmony import */ var _exceptions_transaction_state_error_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../exceptions/transaction-state-error.js */ "./node_modules/sip.js/lib/core/exceptions/transaction-state-error.js");
/* harmony import */ var _messages_outgoing_response_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../messages/outgoing-response.js */ "./node_modules/sip.js/lib/core/messages/outgoing-response.js");
/* harmony import */ var _messages_utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../messages/utils.js */ "./node_modules/sip.js/lib/core/messages/utils.js");
/* harmony import */ var _transactions_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../transactions/invite-server-transaction.js */ "./node_modules/sip.js/lib/core/transactions/invite-server-transaction.js");
/* harmony import */ var _transactions_non_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../transactions/non-invite-server-transaction.js */ "./node_modules/sip.js/lib/core/transactions/non-invite-server-transaction.js");
/* harmony import */ var _transactions_transaction_state_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../transactions/transaction-state.js */ "./node_modules/sip.js/lib/core/transactions/transaction-state.js");






/**
 * User Agent Server (UAS).
 * @remarks
 * A user agent server is a logical entity
 * that generates a response to a SIP request.  The response
 * accepts, rejects, or redirects the request.  This role lasts
 * only for the duration of that transaction.  In other words, if
 * a piece of software responds to a request, it acts as a UAS for
 * the duration of that transaction.  If it generates a request
 * later, it assumes the role of a user agent client for the
 * processing of that transaction.
 * https://tools.ietf.org/html/rfc3261#section-6
 * @public
 */
class UserAgentServer {
    constructor(transactionConstructor, core, message, delegate) {
        this.transactionConstructor = transactionConstructor;
        this.core = core;
        this.message = message;
        this.delegate = delegate;
        this.logger = this.loggerFactory.getLogger("sip.user-agent-server");
        this.toTag = message.toTag ? message.toTag : (0,_messages_utils_js__WEBPACK_IMPORTED_MODULE_0__.newTag)();
        this.init();
    }
    dispose() {
        this.transaction.dispose();
    }
    get loggerFactory() {
        return this.core.loggerFactory;
    }
    /** The transaction associated with this request. */
    get transaction() {
        if (!this._transaction) {
            throw new Error("Transaction undefined.");
        }
        return this._transaction;
    }
    accept(options = { statusCode: 200 }) {
        if (!this.acceptable) {
            throw new _exceptions_transaction_state_error_js__WEBPACK_IMPORTED_MODULE_1__.TransactionStateError(`${this.message.method} not acceptable in state ${this.transaction.state}.`);
        }
        const statusCode = options.statusCode;
        if (statusCode < 200 || statusCode > 299) {
            throw new TypeError(`Invalid statusCode: ${statusCode}`);
        }
        const response = this.reply(options);
        return response;
    }
    progress(options = { statusCode: 180 }) {
        if (!this.progressable) {
            throw new _exceptions_transaction_state_error_js__WEBPACK_IMPORTED_MODULE_1__.TransactionStateError(`${this.message.method} not progressable in state ${this.transaction.state}.`);
        }
        const statusCode = options.statusCode;
        if (statusCode < 101 || statusCode > 199) {
            throw new TypeError(`Invalid statusCode: ${statusCode}`);
        }
        const response = this.reply(options);
        return response;
    }
    redirect(contacts, options = { statusCode: 302 }) {
        if (!this.redirectable) {
            throw new _exceptions_transaction_state_error_js__WEBPACK_IMPORTED_MODULE_1__.TransactionStateError(`${this.message.method} not redirectable in state ${this.transaction.state}.`);
        }
        const statusCode = options.statusCode;
        if (statusCode < 300 || statusCode > 399) {
            throw new TypeError(`Invalid statusCode: ${statusCode}`);
        }
        const contactHeaders = new Array();
        contacts.forEach((contact) => contactHeaders.push(`Contact: ${contact.toString()}`));
        options.extraHeaders = (options.extraHeaders || []).concat(contactHeaders);
        const response = this.reply(options);
        return response;
    }
    reject(options = { statusCode: 480 }) {
        if (!this.rejectable) {
            throw new _exceptions_transaction_state_error_js__WEBPACK_IMPORTED_MODULE_1__.TransactionStateError(`${this.message.method} not rejectable in state ${this.transaction.state}.`);
        }
        const statusCode = options.statusCode;
        if (statusCode < 400 || statusCode > 699) {
            throw new TypeError(`Invalid statusCode: ${statusCode}`);
        }
        const response = this.reply(options);
        return response;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    trying(options) {
        if (!this.tryingable) {
            throw new _exceptions_transaction_state_error_js__WEBPACK_IMPORTED_MODULE_1__.TransactionStateError(`${this.message.method} not tryingable in state ${this.transaction.state}.`);
        }
        const response = this.reply({ statusCode: 100 });
        return response;
    }
    /**
     * If the UAS did not find a matching transaction for the CANCEL
     * according to the procedure above, it SHOULD respond to the CANCEL
     * with a 481 (Call Leg/Transaction Does Not Exist).  If the transaction
     * for the original request still exists, the behavior of the UAS on
     * receiving a CANCEL request depends on whether it has already sent a
     * final response for the original request.  If it has, the CANCEL
     * request has no effect on the processing of the original request, no
     * effect on any session state, and no effect on the responses generated
     * for the original request.  If the UAS has not issued a final response
     * for the original request, its behavior depends on the method of the
     * original request.  If the original request was an INVITE, the UAS
     * SHOULD immediately respond to the INVITE with a 487 (Request
     * Terminated).  A CANCEL request has no impact on the processing of
     * transactions with any other method defined in this specification.
     * https://tools.ietf.org/html/rfc3261#section-9.2
     * @param request - Incoming CANCEL request.
     */
    receiveCancel(message) {
        // Note: Currently CANCEL is being handled as a special case.
        // No UAS is created to handle the CANCEL and the response to
        // it CANCEL is being handled statelessly by the user agent core.
        // As such, there is currently no way to externally impact the
        // response to the a CANCEL request.
        if (this.delegate && this.delegate.onCancel) {
            this.delegate.onCancel(message);
        }
    }
    get acceptable() {
        if (this.transaction instanceof _transactions_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_2__.InviteServerTransaction) {
            return (this.transaction.state === _transactions_transaction_state_js__WEBPACK_IMPORTED_MODULE_3__.TransactionState.Proceeding || this.transaction.state === _transactions_transaction_state_js__WEBPACK_IMPORTED_MODULE_3__.TransactionState.Accepted);
        }
        if (this.transaction instanceof _transactions_non_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_4__.NonInviteServerTransaction) {
            return (this.transaction.state === _transactions_transaction_state_js__WEBPACK_IMPORTED_MODULE_3__.TransactionState.Trying || this.transaction.state === _transactions_transaction_state_js__WEBPACK_IMPORTED_MODULE_3__.TransactionState.Proceeding);
        }
        throw new Error("Unknown transaction type.");
    }
    get progressable() {
        if (this.transaction instanceof _transactions_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_2__.InviteServerTransaction) {
            return this.transaction.state === _transactions_transaction_state_js__WEBPACK_IMPORTED_MODULE_3__.TransactionState.Proceeding;
        }
        if (this.transaction instanceof _transactions_non_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_4__.NonInviteServerTransaction) {
            return false; // https://tools.ietf.org/html/rfc4320#section-4.1
        }
        throw new Error("Unknown transaction type.");
    }
    get redirectable() {
        if (this.transaction instanceof _transactions_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_2__.InviteServerTransaction) {
            return this.transaction.state === _transactions_transaction_state_js__WEBPACK_IMPORTED_MODULE_3__.TransactionState.Proceeding;
        }
        if (this.transaction instanceof _transactions_non_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_4__.NonInviteServerTransaction) {
            return (this.transaction.state === _transactions_transaction_state_js__WEBPACK_IMPORTED_MODULE_3__.TransactionState.Trying || this.transaction.state === _transactions_transaction_state_js__WEBPACK_IMPORTED_MODULE_3__.TransactionState.Proceeding);
        }
        throw new Error("Unknown transaction type.");
    }
    get rejectable() {
        if (this.transaction instanceof _transactions_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_2__.InviteServerTransaction) {
            return this.transaction.state === _transactions_transaction_state_js__WEBPACK_IMPORTED_MODULE_3__.TransactionState.Proceeding;
        }
        if (this.transaction instanceof _transactions_non_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_4__.NonInviteServerTransaction) {
            return (this.transaction.state === _transactions_transaction_state_js__WEBPACK_IMPORTED_MODULE_3__.TransactionState.Trying || this.transaction.state === _transactions_transaction_state_js__WEBPACK_IMPORTED_MODULE_3__.TransactionState.Proceeding);
        }
        throw new Error("Unknown transaction type.");
    }
    get tryingable() {
        if (this.transaction instanceof _transactions_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_2__.InviteServerTransaction) {
            return this.transaction.state === _transactions_transaction_state_js__WEBPACK_IMPORTED_MODULE_3__.TransactionState.Proceeding;
        }
        if (this.transaction instanceof _transactions_non_invite_server_transaction_js__WEBPACK_IMPORTED_MODULE_4__.NonInviteServerTransaction) {
            return this.transaction.state === _transactions_transaction_state_js__WEBPACK_IMPORTED_MODULE_3__.TransactionState.Trying;
        }
        throw new Error("Unknown transaction type.");
    }
    /**
     * When a UAS wishes to construct a response to a request, it follows
     * the general procedures detailed in the following subsections.
     * Additional behaviors specific to the response code in question, which
     * are not detailed in this section, may also be required.
     *
     * Once all procedures associated with the creation of a response have
     * been completed, the UAS hands the response back to the server
     * transaction from which it received the request.
     * https://tools.ietf.org/html/rfc3261#section-8.2.6
     * @param statusCode - Status code to reply with.
     * @param options - Reply options bucket.
     */
    reply(options) {
        if (!options.toTag && options.statusCode !== 100) {
            options.toTag = this.toTag;
        }
        options.userAgent = options.userAgent || this.core.configuration.userAgentHeaderFieldValue;
        options.supported = options.supported || this.core.configuration.supportedOptionTagsResponse;
        const response = (0,_messages_outgoing_response_js__WEBPACK_IMPORTED_MODULE_5__.constructOutgoingResponse)(this.message, options);
        this.transaction.receiveResponse(options.statusCode, response.message);
        return response;
    }
    init() {
        // We are the transaction user.
        const user = {
            loggerFactory: this.loggerFactory,
            onStateChange: (newState) => {
                if (newState === _transactions_transaction_state_js__WEBPACK_IMPORTED_MODULE_3__.TransactionState.Terminated) {
                    // Remove the terminated transaction from the core.
                    // eslint-disable-next-line @typescript-eslint/no-use-before-define
                    this.core.userAgentServers.delete(userAgentServerId);
                    this.dispose();
                }
            },
            onTransportError: (error) => {
                this.logger.error(error.message);
                if (this.delegate && this.delegate.onTransportError) {
                    this.delegate.onTransportError(error);
                }
                else {
                    this.logger.error("User agent server response transport error.");
                }
            }
        };
        // Create a new transaction with us as the user.
        const transaction = new this.transactionConstructor(this.message, this.core.transport, user);
        this._transaction = transaction;
        // Add the new transaction to the core.
        const userAgentServerId = transaction.id;
        this.core.userAgentServers.set(transaction.id, this);
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/grammar/grammar.js":
/*!****************************************************!*\
  !*** ./node_modules/sip.js/lib/grammar/grammar.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Grammar": () => (/* binding */ Grammar)
/* harmony export */ });
/* harmony import */ var _pegjs_dist_grammar_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pegjs/dist/grammar.js */ "./node_modules/sip.js/lib/grammar/pegjs/dist/grammar.js");
/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable no-inner-declarations */

/**
 * Grammar.
 * @internal
 */
var Grammar;
(function (Grammar) {
    /**
     * Parse.
     * @param input -
     * @param startRule -
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function parse(input, startRule) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const options = { startRule };
        try {
            _pegjs_dist_grammar_js__WEBPACK_IMPORTED_MODULE_0__.parse(input, options);
        }
        catch (e) {
            options.data = -1;
        }
        return options.data;
    }
    Grammar.parse = parse;
    /**
     * Parse the given string and returns a SIP.NameAddrHeader instance or undefined if
     * it is an invalid NameAddrHeader.
     * @param name_addr_header -
     */
    function nameAddrHeaderParse(nameAddrHeader) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const parsedNameAddrHeader = Grammar.parse(nameAddrHeader, "Name_Addr_Header");
        return parsedNameAddrHeader !== -1 ? parsedNameAddrHeader : undefined;
    }
    Grammar.nameAddrHeaderParse = nameAddrHeaderParse;
    /**
     * Parse the given string and returns a SIP.URI instance or undefined if
     * it is an invalid URI.
     * @param uri -
     */
    function URIParse(uri) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const parsedUri = Grammar.parse(uri, "SIP_URI");
        return parsedUri !== -1 ? parsedUri : undefined;
    }
    Grammar.URIParse = URIParse;
})(Grammar = Grammar || (Grammar = {}));


/***/ }),

/***/ "./node_modules/sip.js/lib/grammar/index.js":
/*!**************************************************!*\
  !*** ./node_modules/sip.js/lib/grammar/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Grammar": () => (/* reexport safe */ _grammar_js__WEBPACK_IMPORTED_MODULE_0__.Grammar),
/* harmony export */   "NameAddrHeader": () => (/* reexport safe */ _name_addr_header_js__WEBPACK_IMPORTED_MODULE_1__.NameAddrHeader),
/* harmony export */   "Parameters": () => (/* reexport safe */ _parameters_js__WEBPACK_IMPORTED_MODULE_2__.Parameters),
/* harmony export */   "URI": () => (/* reexport safe */ _uri_js__WEBPACK_IMPORTED_MODULE_3__.URI),
/* harmony export */   "equivalentURI": () => (/* reexport safe */ _uri_js__WEBPACK_IMPORTED_MODULE_3__.equivalentURI)
/* harmony export */ });
/* harmony import */ var _grammar_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./grammar.js */ "./node_modules/sip.js/lib/grammar/grammar.js");
/* harmony import */ var _name_addr_header_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./name-addr-header.js */ "./node_modules/sip.js/lib/grammar/name-addr-header.js");
/* harmony import */ var _parameters_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parameters.js */ "./node_modules/sip.js/lib/grammar/parameters.js");
/* harmony import */ var _uri_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./uri.js */ "./node_modules/sip.js/lib/grammar/uri.js");






/***/ }),

/***/ "./node_modules/sip.js/lib/grammar/name-addr-header.js":
/*!*************************************************************!*\
  !*** ./node_modules/sip.js/lib/grammar/name-addr-header.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "NameAddrHeader": () => (/* binding */ NameAddrHeader)
/* harmony export */ });
/* harmony import */ var _parameters_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parameters.js */ "./node_modules/sip.js/lib/grammar/parameters.js");

/**
 * Name Address SIP header.
 * @public
 */
class NameAddrHeader extends _parameters_js__WEBPACK_IMPORTED_MODULE_0__.Parameters {
    /**
     * Constructor
     * @param uri -
     * @param displayName -
     * @param parameters -
     */
    constructor(uri, displayName, parameters) {
        super(parameters);
        this.uri = uri;
        this._displayName = displayName;
    }
    get friendlyName() {
        return this.displayName || this.uri.aor;
    }
    get displayName() { return this._displayName; }
    set displayName(value) {
        this._displayName = value;
    }
    clone() {
        return new NameAddrHeader(this.uri.clone(), this._displayName, JSON.parse(JSON.stringify(this.parameters)));
    }
    toString() {
        let body = (this.displayName || this.displayName === "0") ? '"' + this.displayName + '" ' : "";
        body += "<" + this.uri.toString() + ">";
        for (const parameter in this.parameters) {
            // eslint-disable-next-line no-prototype-builtins
            if (this.parameters.hasOwnProperty(parameter)) {
                body += ";" + parameter;
                if (this.parameters[parameter] !== null) {
                    body += "=" + this.parameters[parameter];
                }
            }
        }
        return body;
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/grammar/parameters.js":
/*!*******************************************************!*\
  !*** ./node_modules/sip.js/lib/grammar/parameters.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Parameters": () => (/* binding */ Parameters)
/* harmony export */ });
/**
 * @internal
 */
class Parameters {
    constructor(parameters) {
        this.parameters = {};
        // for in is required here as the Grammar parser is adding to the prototype chain
        for (const param in parameters) {
            // eslint-disable-next-line no-prototype-builtins
            if (parameters.hasOwnProperty(param)) {
                this.setParam(param, parameters[param]);
            }
        }
    }
    setParam(key, value) {
        if (key) {
            this.parameters[key.toLowerCase()] = (typeof value === "undefined" || value === null) ? null : value.toString();
        }
    }
    getParam(key) {
        if (key) {
            return this.parameters[key.toLowerCase()];
        }
    }
    hasParam(key) {
        return !!(key && this.parameters[key.toLowerCase()] !== undefined);
    }
    deleteParam(key) {
        key = key.toLowerCase();
        if (this.hasParam(key)) {
            const value = this.parameters[key];
            delete this.parameters[key];
            return value;
        }
    }
    clearParams() {
        this.parameters = {};
    }
}


/***/ }),

/***/ "./node_modules/sip.js/lib/grammar/pegjs/dist/grammar.js":
/*!***************************************************************!*\
  !*** ./node_modules/sip.js/lib/grammar/pegjs/dist/grammar.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SyntaxError": () => (/* binding */ SyntaxError),
/* harmony export */   "parse": () => (/* binding */ parse)
/* harmony export */ });
/* harmony import */ var _name_addr_header_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../name-addr-header.js */ "./node_modules/sip.js/lib/grammar/name-addr-header.js");
/* harmony import */ var _uri_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../uri.js */ "./node_modules/sip.js/lib/grammar/uri.js");


function peg$padEnd(str, targetLength, padString) {
    padString = padString || ' ';
    if (str.length > targetLength) {
        return str;
    }
    targetLength -= str.length;
    padString += padString.repeat(targetLength);
    return str + padString.slice(0, targetLength);
}
class SyntaxError extends Error {
    constructor(message, expected, found, location) {
        super();
        this.message = message;
        this.expected = expected;
        this.found = found;
        this.location = location;
        this.name = "SyntaxError";
        if (typeof Object.setPrototypeOf === "function") {
            Object.setPrototypeOf(this, SyntaxError.prototype);
        }
        else {
            this.__proto__ = SyntaxError.prototype;
        }
        if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(this, SyntaxError);
        }
    }
    static buildMessage(expected, found) {
        function hex(ch) {
            return ch.charCodeAt(0).toString(16).toUpperCase();
        }
        function literalEscape(s) {
            return s
                .replace(/\\/g, "\\\\")
                .replace(/"/g, "\\\"")
                .replace(/\0/g, "\\0")
                .replace(/\t/g, "\\t")
                .replace(/\n/g, "\\n")
                .replace(/\r/g, "\\r")
                .replace(/[\x00-\x0F]/g, (ch) => "\\x0" + hex(ch))
                .replace(/[\x10-\x1F\x7F-\x9F]/g, (ch) => "\\x" + hex(ch));
        }
        function classEscape(s) {
            return s
                .replace(/\\/g, "\\\\")
                .replace(/\]/g, "\\]")
                .replace(/\^/g, "\\^")
                .replace(/-/g, "\\-")
                .replace(/\0/g, "\\0")
                .replace(/\t/g, "\\t")
                .replace(/\n/g, "\\n")
                .replace(/\r/g, "\\r")
                .replace(/[\x00-\x0F]/g, (ch) => "\\x0" + hex(ch))
                .replace(/[\x10-\x1F\x7F-\x9F]/g, (ch) => "\\x" + hex(ch));
        }
        function describeExpectation(expectation) {
            switch (expectation.type) {
                case "literal":
                    return "\"" + literalEscape(expectation.text) + "\"";
                case "class":
                    const escapedParts = expectation.parts.map((part) => {
                        return Array.isArray(part)
                            ? classEscape(part[0]) + "-" + classEscape(part[1])
                            : classEscape(part);
                    });
                    return "[" + (expectation.inverted ? "^" : "") + escapedParts + "]";
                case "any":
                    return "any character";
                case "end":
                    return "end of input";
                case "other":
                    return expectation.description;
            }
        }
        function describeExpected(expected1) {
            const descriptions = expected1.map(describeExpectation);
            let i;
            let j;
            descriptions.sort();
            if (descriptions.length > 0) {
                for (i = 1, j = 1; i < descriptions.length; i++) {
                    if (descriptions[i - 1] !== descriptions[i]) {
                        descriptions[j] = descriptions[i];
                        j++;
                    }
                }
                descriptions.length = j;
            }
            switch (descriptions.length) {
                case 1:
                    return descriptions[0];
                case 2:
                    return descriptions[0] + " or " + descriptions[1];
                default:
                    return descriptions.slice(0, -1).join(", ")
                        + ", or "
                        + descriptions[descriptions.length - 1];
            }
        }
        function describeFound(found1) {
            return found1 ? "\"" + literalEscape(found1) + "\"" : "end of input";
        }
        return "Expected " + describeExpected(expected) + " but " + describeFound(found) + " found.";
    }
    format(sources) {
        let str = 'Error: ' + this.message;
        if (this.location) {
            let src = null;
            let k;
            for (k = 0; k < sources.length; k++) {
                if (sources[k].source === this.location.source) {
                    src = sources[k].text.split(/\r\n|\n|\r/g);
                    break;
                }
            }
            let s = this.location.start;
            let loc = this.location.source + ':' + s.line + ':' + s.column;
            if (src) {
                let e = this.location.end;
                let filler = peg$padEnd('', s.line.toString().length, ' ');
                let line = src[s.line - 1];
                let last = s.line === e.line ? e.column : line.length + 1;
                str += '\n --> ' + loc + '\n' + filler + ' |\n' + s.line + ' | ' + line + '\n' + filler + ' | ' +
                    peg$padEnd('', s.column - 1, ' ') +
                    peg$padEnd('', last - s.column, '^');
            }
            else {
                str += '\n at ' + loc;
            }
        }
        return str;
    }
}
function peg$parse(input, options) {
    options = options !== undefined ? options : {};
    const peg$FAILED = {};
    const peg$source = options.grammarSource;
    const peg$startRuleIndices = { Contact: 119, Name_Addr_Header: 156, Record_Route: 176, Request_Response: 81, SIP_URI: 45, Subscription_State: 186, Supported: 191, Require: 182, Via: 194, absoluteURI: 84, Call_ID: 118, Content_Disposition: 130, Content_Length: 135, Content_Type: 136, CSeq: 146, displayName: 122, Event: 149, From: 151, host: 52, Max_Forwards: 154, Min_SE: 213, Proxy_Authenticate: 157, quoted_string: 40, Refer_To: 178, Replaces: 179, Session_Expires: 210, stun_URI: 217, To: 192, turn_URI: 223, uuid: 226, WWW_Authenticate: 209, challenge: 158, sipfrag: 230, Referred_By: 231 };
    let peg$startRuleIndex = 119;
    const peg$consts = [
        "\r\n",
        peg$literalExpectation("\r\n", false),
        /^[0-9]/,
        peg$classExpectation([["0", "9"]], false, false),
        /^[a-zA-Z]/,
        peg$classExpectation([["a", "z"], ["A", "Z"]], false, false),
        /^[0-9a-fA-F]/,
        peg$classExpectation([["0", "9"], ["a", "f"], ["A", "F"]], false, false),
        /^[\0-\xFF]/,
        peg$classExpectation([["\0", "\xFF"]], false, false),
        /^["]/,
        peg$classExpectation(["\""], false, false),
        " ",
        peg$literalExpectation(" ", false),
        "\t",
        peg$literalExpectation("\t", false),
        /^[a-zA-Z0-9]/,
        peg$classExpectation([["a", "z"], ["A", "Z"], ["0", "9"]], false, false),
        ";",
        peg$literalExpectation(";", false),
        "/",
        peg$literalExpectation("/", false),
        "?",
        peg$literalExpectation("?", false),
        ":",
        peg$literalExpectation(":", false),
        "@",
        peg$literalExpectation("@", false),
        "&",
        peg$literalExpectation("&", false),
        "=",
        peg$literalExpectation("=", false),
        "+",
        peg$literalExpectation("+", false),
        "$",
        peg$literalExpectation("$", false),
        ",",
        peg$literalExpectation(",", false),
        "-",
        peg$literalExpectation("-", false),
        "_",
        peg$literalExpectation("_", false),
        ".",
        peg$literalExpectation(".", false),
        "!",
        peg$literalExpectation("!", false),
        "~",
        peg$literalExpectation("~", false),
        "*",
        peg$literalExpectation("*", false),
        "'",
        peg$literalExpectation("'", false),
        "(",
        peg$literalExpectation("(", false),
        ")",
        peg$literalExpectation(")", false),
        "%",
        peg$literalExpectation("%", false),
        function () { return " "; },
        function () { return ':'; },
        /^[!-~]/,
        peg$classExpectation([["!", "~"]], false, false),
        /^[\x80-\uFFFF]/,
        peg$classExpectation([["\x80", "\uFFFF"]], false, false),
        /^[\x80-\xBF]/,
        peg$classExpectation([["\x80", "\xBF"]], false, false),
        /^[a-f]/,
        peg$classExpectation([["a", "f"]], false, false),
        "`",
        peg$literalExpectation("`", false),
        "<",
        peg$literalExpectation("<", false),
        ">",
        peg$literalExpectation(">", false),
        "\\",
        peg$literalExpectation("\\", false),
        "[",
        peg$literalExpectation("[", false),
        "]",
        peg$literalExpectation("]", false),
        "{",
        peg$literalExpectation("{", false),
        "}",
        peg$literalExpectation("}", false),
        function () { return "*"; },
        function () { return "/"; },
        function () { return "="; },
        function () { return "("; },
        function () { return ")"; },
        function () { return ">"; },
        function () { return "<"; },
        function () { return ","; },
        function () { return ";"; },
        function () { return ":"; },
        function () { return "\""; },
        /^[!-']/,
        peg$classExpectation([["!", "'"]], false, false),
        /^[*-[]/,
        peg$classExpectation([["*", "["]], false, false),
        /^[\]-~]/,
        peg$classExpectation([["]", "~"]], false, false),
        function (contents) {
            return contents;
        },
        /^[#-[]/,
        peg$classExpectation([["#", "["]], false, false),
        /^[\0-\t]/,
        peg$classExpectation([["\0", "\t"]], false, false),
        /^[\v-\f]/,
        peg$classExpectation([["\v", "\f"]], false, false),
        /^[\x0E-\x7F]/,
        peg$classExpectation([["\x0E", "\x7F"]], false, false),
        function () {
            options = options || { data: {} };
            options.data.uri = new _uri_js__WEBPACK_IMPORTED_MODULE_0__.URI(options.data.scheme, options.data.user, options.data.host, options.data.port);
            delete options.data.scheme;
            delete options.data.user;
            delete options.data.host;
            delete options.data.host_type;
            delete options.data.port;
        },
        function () {
            options = options || { data: {} };
            options.data.uri = new _uri_js__WEBPACK_IMPORTED_MODULE_0__.URI(options.data.scheme, options.data.user, options.data.host, options.data.port, options.data.uri_params, options.data.uri_headers);
            delete options.data.scheme;
            delete options.data.user;
            delete options.data.host;
            delete options.data.host_type;
            delete options.data.port;
            delete options.data.uri_params;
            if (options.startRule === 'SIP_URI') {
                options.data = options.data.uri;
            }
        },
        "sips",
        peg$literalExpectation("sips", true),
        "sip",
        peg$literalExpectation("sip", true),
        function (uri_scheme) {
            options = options || { data: {} };
            options.data.scheme = uri_scheme;
        },
        function () {
            options = options || { data: {} };
            options.data.user = decodeURIComponent(text().slice(0, -1));
        },
        function () {
            options = options || { data: {} };
            options.data.password = text();
        },
        function () {
            options = options || { data: {} };
            options.data.host = text();
            return options.data.host;
        },
        function () {
            options = options || { data: {} };
            options.data.host_type = 'domain';
            return text();
        },
        /^[a-zA-Z0-9_\-]/,
        peg$classExpectation([["a", "z"], ["A", "Z"], ["0", "9"], "_", "-"], false, false),
        /^[a-zA-Z0-9\-]/,
        peg$classExpectation([["a", "z"], ["A", "Z"], ["0", "9"], "-"], false, false),
        function () {
            options = options || { data: {} };
            options.data.host_type = 'IPv6';
            return text();
        },
        "::",
        peg$literalExpectation("::", false),
        function () {
            options = options || { data: {} };
            options.data.host_type = 'IPv6';
            return text();
        },
        function () {
            options = options || { data: {} };
            options.data.host_type = 'IPv4';
            return text();
        },
        "25",
        peg$literalExpectation("25", false),
        /^[0-5]/,
        peg$classExpectation([["0", "5"]], false, false),
        "2",
        peg$literalExpectation("2", false),
        /^[0-4]/,
        peg$classExpectation([["0", "4"]], false, false),
        "1",
        peg$literalExpectation("1", false),
        /^[1-9]/,
        peg$classExpectation([["1", "9"]], false, false),
        function (port) {
            options = options || { data: {} };
            port = parseInt(port.join(''));
            options.data.port = port;
            return port;
        },
        "transport=",
        peg$literalExpectation("transport=", true),
        "udp",
        peg$literalExpectation("udp", true),
        "tcp",
        peg$literalExpectation("tcp", true),
        "sctp",
        peg$literalExpectation("sctp", true),
        "tls",
        peg$literalExpectation("tls", true),
        function (transport) {
            options = options || { data: {} };
            if (!options.data.uri_params)
                options.data.uri_params = {};
            options.data.uri_params['transport'] = transport.toLowerCase();
        },
        "user=",
        peg$literalExpectation("user=", true),
        "phone",
        peg$literalExpectation("phone", true),
        "ip",
        peg$literalExpectation("ip", true),
        function (user) {
            options = options || { data: {} };
            if (!options.data.uri_params)
                options.data.uri_params = {};
            options.data.uri_params['user'] = user.toLowerCase();
        },
        "method=",
        peg$literalExpectation("method=", true),
        function (method) {
            options = options || { data: {} };
            if (!options.data.uri_params)
                options.data.uri_params = {};
            options.data.uri_params['method'] = method;
        },
        "ttl=",
        peg$literalExpectation("ttl=", true),
        function (ttl) {
            options = options || { data: {} };
            if (!options.data.params)
                options.data.params = {};
            options.data.params['ttl'] = ttl;
        },
        "maddr=",
        peg$literalExpectation("maddr=", true),
        function (maddr) {
            options = options || { data: {} };
            if (!options.data.uri_params)
                options.data.uri_params = {};
            options.data.uri_params['maddr'] = maddr;
        },
        "lr",
        peg$literalExpectation("lr", true),
        function () {
            options = options || { data: {} };
            if (!options.data.uri_params)
                options.data.uri_params = {};
            options.data.uri_params['lr'] = undefined;
        },
        function (param, value) {
            options = options || { data: {} };
            if (!options.data.uri_params)
                options.data.uri_params = {};
            if (value === null) {
                value = undefined;
            }
            else {
                value = value[1];
            }
            options.data.uri_params[param.toLowerCase()] = value;
        },
        function (hname, hvalue) {
            hname = hname.join('').toLowerCase();
            hvalue = hvalue.join('');
            options = options || { data: {} };
            if (!options.data.uri_headers)
                options.data.uri_headers = {};
            if (!options.data.uri_headers[hname]) {
                options.data.uri_headers[hname] = [hvalue];
            }
            else {
                options.data.uri_headers[hname].push(hvalue);
            }
        },
        function () {
            options = options || { data: {} };
            // lots of tests fail if this isn't guarded...
            if (options.startRule === 'Refer_To') {
                options.data.uri = new _uri_js__WEBPACK_IMPORTED_MODULE_0__.URI(options.data.scheme, options.data.user, options.data.host, options.data.port, options.data.uri_params, options.data.uri_headers);
                delete options.data.scheme;
                delete options.data.user;
                delete options.data.host;
                delete options.data.host_type;
                delete options.data.port;
                delete options.data.uri_params;
            }
        },
        "//",
        peg$literalExpectation("//", false),
        function () {
            options = options || { data: {} };
            options.data.scheme = text();
        },
        peg$literalExpectation("SIP", true),
        function () {
            options = options || { data: {} };
            options.data.sip_version = text();
        },
        "INVITE",
        peg$literalExpectation("INVITE", false),
        "ACK",
        peg$literalExpectation("ACK", false),
        "VXACH",
        peg$literalExpectation("VXACH", false),
        "OPTIONS",
        peg$literalExpectation("OPTIONS", false),
        "BYE",
        peg$literalExpectation("BYE", false),
        "CANCEL",
        peg$literalExpectation("CANCEL", false),
        "REGISTER",
        peg$literalExpectation("REGISTER", false),
        "SUBSCRIBE",
        peg$literalExpectation("SUBSCRIBE", false),
        "NOTIFY",
        peg$literalExpectation("NOTIFY", false),
        "REFER",
        peg$literalExpectation("REFER", false),
        "PUBLISH",
        peg$literalExpectation("PUBLISH", false),
        function () {
            options = options || { data: {} };
            options.data.method = text();
            return options.data.method;
        },
        function (status_code) {
            options = options || { data: {} };
            options.data.status_code = parseInt(status_code.join(''));
        },
        function () {
            options = options || { data: {} };
            options.data.reason_phrase = text();
        },
        function () {
            options = options || { data: {} };
            options.data = text();
        },
        function () {
            var idx, length;
            options = options || { data: {} };
            length = options.data.multi_header.length;
            for (idx = 0; idx < length; idx++) {
                if (options.data.multi_header[idx].parsed === null) {
                    options.data = null;
                    break;
                }
            }
            if (options.data !== null) {
                options.data = options.data.multi_header;
            }
            else {
                options.data = -1;
            }
        },
        function () {
            var header;
            options = options || { data: {} };
            if (!options.data.multi_header)
                options.data.multi_header = [];
            try {
                header = new _name_addr_header_js__WEBPACK_IMPORTED_MODULE_1__.NameAddrHeader(options.data.uri, options.data.displayName, options.data.params);
                delete options.data.uri;
                delete options.data.displayName;
                delete options.data.params;
            }
            catch (e) {
                header = null;
            }
            options.data.multi_header.push({ 'position': peg$currPos,
                'offset': location().start.offset,
                'parsed': header
            });
        },
        function (displayName) {
            displayName = text().trim();
            if (displayName[0] === '\"') {
                displayName = displayName.substring(1, displayName.length - 1);
            }
            options = options || { data: {} };
            options.data.displayName = displayName;
        },
        "q",
        peg$literalExpectation("q", true),
        function (q) {
            options = options || { data: {} };
            if (!options.data.params)
                options.data.params = {};
            options.data.params['q'] = q;
        },
        "expires",
        peg$literalExpectation("expires", true),
        function (expires) {
            options = options || { data: {} };
            if (!options.data.params)
                options.data.params = {};
            options.data.params['expires'] = expires;
        },
        function (delta_seconds) {
            return parseInt(delta_seconds.join(''));
        },
        "0",
        peg$literalExpectation("0", false),
        function () {
            return parseFloat(text());
        },
        function (param, value) {
            options = options || { data: {} };
            if (!options.data.params)
                options.data.params = {};
            if (value === null) {
                value = undefined;
            }
            else {
                value = value[1];
            }
            options.data.params[param.toLowerCase()] = value;
        },
        "render",
        peg$literalExpectation("render", true),
        "session",
        peg$literalExpectation("session", true),
        "icon",
        peg$literalExpectation("icon", true),
        "alert",
        peg$literalExpectation("alert", true),
        function () {
            options = options || { data: {} };
            if (options.startRule === 'Content_Disposition') {
                options.data.type = text().toLowerCase();
            }
        },
        "handling",
        peg$literalExpectation("handling", true),
        "optional",
        peg$literalExpectation("optional", true),
        "required",
        peg$literalExpectation("required", true),
        function (length) {
            options = options || { data: {} };
            options.data = parseInt(length.join(''));
        },
        function () {
            options = options || { data: {} };
            options.data = text();
        },
        "text",
        peg$literalExpectation("text", true),
        "image",
        peg$literalExpectation("image", true),
        "audio",
        peg$literalExpectation("audio", true),
        "video",
        peg$literalExpectation("video", true),
        "application",
        peg$literalExpectation("application", true),
        "message",
        peg$literalExpectation("message", true),
        "multipart",
        peg$literalExpectation("multipart", true),
        "x-",
        peg$literalExpectation("x-", true),
        function (cseq_value) {
            options = options || { data: {} };
            options.data.value = parseInt(cseq_value.join(''));
        },
        function (expires) { options = options || { data: {} }; options.data = expires; },
        function (event_type) {
            options = options || { data: {} };
            options.data.event = event_type.toLowerCase();
        },
        function () {
            options = options || { data: {} };
            var tag = options.data.tag;
            options.data = new _name_addr_header_js__WEBPACK_IMPORTED_MODULE_1__.NameAddrHeader(options.data.uri, options.data.displayName, options.data.params);
            if (tag) {
                options.data.setParam('tag', tag);
            }
        },
        "tag",
        peg$literalExpectation("tag", true),
        function (tag) { options = options || { data: {} }; options.data.tag = tag; },
        function (forwards) {
            options = options || { data: {} };
            options.data = parseInt(forwards.join(''));
        },
        function (min_expires) { options = options || { data: {} }; options.data = min_expires; },
        function () {
            options = options || { data: {} };
            options.data = new _name_addr_header_js__WEBPACK_IMPORTED_MODULE_1__.NameAddrHeader(options.data.uri, options.data.displayName, options.data.params);
        },
        "digest",
        peg$literalExpectation("Digest", true),
        "realm",
        peg$literalExpectation("realm", true),
        function (realm) { options = options || { data: {} }; options.data.realm = realm; },
        "domain",
        peg$literalExpectation("domain", true),
        "nonce",
        peg$literalExpectation("nonce", true),
        function (nonce) { options = options || { data: {} }; options.data.nonce = nonce; },
        "opaque",
        peg$literalExpectation("opaque", true),
        function (opaque) { options = options || { data: {} }; options.data.opaque = opaque; },
        "stale",
        peg$literalExpectation("stale", true),
        "true",
        peg$literalExpectation("true", true),
        function () { options = options || { data: {} }; options.data.stale = true; },
        "false",
        peg$literalExpectation("false", true),
        function () { options = options || { data: {} }; options.data.stale = false; },
        "algorithm",
        peg$literalExpectation("algorithm", true),
        "md5",
        peg$literalExpectation("MD5", true),
        "md5-sess",
        peg$literalExpectation("MD5-sess", true),
        function (algorithm) {
            options = options || { data: {} };
            options.data.algorithm = algorithm.toUpperCase();
        },
        "qop",
        peg$literalExpectation("qop", true),
        "auth-int",
        peg$literalExpectation("auth-int", true),
        "auth",
        peg$literalExpectation("auth", true),
        function (qop_value) {
            options = options || { data: {} };
            options.data.qop || (options.data.qop = []);
            options.data.qop.push(qop_value.toLowerCase());
        },
        function (rack_value) {
            options = options || { data: {} };
            options.data.value = parseInt(rack_value.join(''));
        },
        function () {
            var idx, length;
            options = options || { data: {} };
            length = options.data.multi_header.length;
            for (idx = 0; idx < length; idx++) {
                if (options.data.multi_header[idx].parsed === null) {
                    options.data = null;
                    break;
                }
            }
            if (options.data !== null) {
                options.data = options.data.multi_header;
            }
            else {
                options.data = -1;
            }
        },
        function () {
            var header;
            options = options || { data: {} };
            if (!options.data.multi_header)
                options.data.multi_header = [];
            try {
                header = new _name_addr_header_js__WEBPACK_IMPORTED_MODULE_1__.NameAddrHeader(options.data.uri, options.data.displayName, options.data.params);
                delete options.data.uri;
                delete options.data.displayName;
                delete options.data.params;
            }
            catch (e) {
                header = null;
            }
            options.data.multi_header.push({ 'position': peg$currPos,
                'offset': location().start.offset,
                'parsed': header
            });
        },
        function () {
            options = options || { data: {} };
            options.data = new _name_addr_header_js__WEBPACK_IMPORTED_MODULE_1__.NameAddrHeader(options.data.uri, options.data.displayName, options.data.params);
        },
        function () {
            options = options || { data: {} };
            if (!(options.data.replaces_from_tag && options.data.replaces_to_tag)) {
                options.data = -1;
            }
        },
        function () {
            options = options || { data: {} };
            options.data = {
                call_id: options.data
            };
        },
        "from-tag",
        peg$literalExpectation("from-tag", true),
        function (from_tag) {
            options = options || { data: {} };
            options.data.replaces_from_tag = from_tag;
        },
        "to-tag",
        peg$literalExpectation("to-tag", true),
        function (to_tag) {
            options = options || { data: {} };
            options.data.replaces_to_tag = to_tag;
        },
        "early-only",
        peg$literalExpectation("early-only", true),
        function () {
            options = options || { data: {} };
            options.data.early_only = true;
        },
        function (head, r) { return r; },
        function (head, tail) { return list(head, tail); },
        function (value) {
            options = options || { data: {} };
            if (options.startRule === 'Require') {
                options.data = value || [];
            }
        },
        function (rseq_value) {
            options = options || { data: {} };
            options.data.value = parseInt(rseq_value.join(''));
        },
        "active",
        peg$literalExpectation("active", true),
        "pending",
        peg$literalExpectation("pending", true),
        "terminated",
        peg$literalExpectation("terminated", true),
        function () {
            options = options || { data: {} };
            options.data.state = text();
        },
        "reason",
        peg$literalExpectation("reason", true),
        function (reason) {
            options = options || { data: {} };
            if (typeof reason !== 'undefined')
                options.data.reason = reason;
        },
        function (expires) {
            options = options || { data: {} };
            if (typeof expires !== 'undefined')
                options.data.expires = expires;
        },
        "retry_after",
        peg$literalExpectation("retry_after", true),
        function (retry_after) {
            options = options || { data: {} };
            if (typeof retry_after !== 'undefined')
                options.data.retry_after = retry_after;
        },
        "deactivated",
        peg$literalExpectation("deactivated", true),
        "probation",
        peg$literalExpectation("probation", true),
        "rejected",
        peg$literalExpectation("rejected", true),
        "timeout",
        peg$literalExpectation("timeout", true),
        "giveup",
        peg$literalExpectation("giveup", true),
        "noresource",
        peg$literalExpectation("noresource", true),
        "invariant",
        peg$literalExpectation("invariant", true),
        function (value) {
            options = options || { data: {} };
            if (options.startRule === 'Supported') {
                options.data = value || [];
            }
        },
        function () {
            options = options || { data: {} };
            var tag = options.data.tag;
            options.data = new _name_addr_header_js__WEBPACK_IMPORTED_MODULE_1__.NameAddrHeader(options.data.uri, options.data.displayName, options.data.params);
            if (tag) {
                options.data.setParam('tag', tag);
            }
        },
        "ttl",
        peg$literalExpectation("ttl", true),
        function (via_ttl_value) {
            options = options || { data: {} };
            options.data.ttl = via_ttl_value;
        },
        "maddr",
        peg$literalExpectation("maddr", true),
        function (via_maddr) {
            options = options || { data: {} };
            options.data.maddr = via_maddr;
        },
        "received",
        peg$literalExpectation("received", true),
        function (via_received) {
            options = options || { data: {} };
            options.data.received = via_received;
        },
        "branch",
        peg$literalExpectation("branch", true),
        function (via_branch) {
            options = options || { data: {} };
            options.data.branch = via_branch;
        },
        "rport",
        peg$literalExpectation("rport", true),
        function (response_port) {
            options = options || { data: {} };
            if (typeof response_port !== 'undefined')
                options.data.rport = response_port.join('');
        },
        function (via_protocol) {
            options = options || { data: {} };
            options.data.protocol = via_protocol;
        },
        peg$literalExpectation("UDP", true),
        peg$literalExpectation("TCP", true),
        peg$literalExpectation("TLS", true),
        peg$literalExpectation("SCTP", true),
        function (via_transport) {
            options = options || { data: {} };
            options.data.transport = via_transport;
        },
        function () {
            options = options || { data: {} };
            options.data.host = text();
        },
        function (via_sent_by_port) {
            options = options || { data: {} };
            options.data.port = parseInt(via_sent_by_port.join(''));
        },
        function (ttl) {
            return parseInt(ttl.join(''));
        },
        function (deltaSeconds) {
            options = options || { data: {} };
            if (options.startRule === 'Session_Expires') {
                options.data.deltaSeconds = deltaSeconds;
            }
        },
        "refresher",
        peg$literalExpectation("refresher", false),
        "uas",
        peg$literalExpectation("uas", false),
        "uac",
        peg$literalExpectation("uac", false),
        function (endpoint) {
            options = options || { data: {} };
            if (options.startRule === 'Session_Expires') {
                options.data.refresher = endpoint;
            }
        },
        function (deltaSeconds) {
            options = options || { data: {} };
            if (options.startRule === 'Min_SE') {
                options.data = deltaSeconds;
            }
        },
        "stuns",
        peg$literalExpectation("stuns", true),
        "stun",
        peg$literalExpectation("stun", true),
        function (scheme) {
            options = options || { data: {} };
            options.data.scheme = scheme;
        },
        function (host) {
            options = options || { data: {} };
            options.data.host = host;
        },
        "?transport=",
        peg$literalExpectation("?transport=", false),
        "turns",
        peg$literalExpectation("turns", true),
        "turn",
        peg$literalExpectation("turn", true),
        function (transport) {
            options = options || { data: {} };
            options.data.transport = transport;
        },
        function () {
            options = options || { data: {} };
            options.data = text();
        },
        "Referred-By",
        peg$literalExpectation("Referred-By", false),
        "b",
        peg$literalExpectation("b", false),
        "cid",
        peg$literalExpectation("cid", false)
    ];
    const peg$bytecode = [
        peg$decode("2 \"\"6 7!"),
        peg$decode("4\"\"\"5!7#"),
        peg$decode("4$\"\"5!7%"),
        peg$decode("4&\"\"5!7'"),
        peg$decode(";'.# &;("),
        peg$decode("4(\"\"5!7)"),
        peg$decode("4*\"\"5!7+"),
        peg$decode("2,\"\"6,7-"),
        peg$decode("2.\"\"6.7/"),
        peg$decode("40\"\"5!71"),
        peg$decode("22\"\"6273.\x89 &24\"\"6475.} &26\"\"6677.q &28\"\"6879.e &2:\"\"6:7;.Y &2<\"\"6<7=.M &2>\"\"6>7?.A &2@\"\"6@7A.5 &2B\"\"6B7C.) &2D\"\"6D7E"),
        peg$decode(";).# &;,"),
        peg$decode("2F\"\"6F7G.} &2H\"\"6H7I.q &2J\"\"6J7K.e &2L\"\"6L7M.Y &2N\"\"6N7O.M &2P\"\"6P7Q.A &2R\"\"6R7S.5 &2T\"\"6T7U.) &2V\"\"6V7W"),
        peg$decode("%%2X\"\"6X7Y/5#;#/,$;#/#$+#)(#'#(\"'#&'#/\"!&,)"),
        peg$decode("%%$;$0#*;$&/,#; /#$+\")(\"'#&'#.\" &\"/=#$;$/&#0#*;$&&&#/'$8\":Z\" )(\"'#&'#"),
        peg$decode(";..\" &\""),
        peg$decode("%$;'.# &;(0)*;'.# &;(&/?#28\"\"6879/0$;//'$8#:[# )(#'#(\"'#&'#"),
        peg$decode("%%$;2/&#0#*;2&&&#/g#$%$;.0#*;.&/,#;2/#$+\")(\"'#&'#0=*%$;.0#*;.&/,#;2/#$+\")(\"'#&'#&/#$+\")(\"'#&'#/\"!&,)"),
        peg$decode("4\\\"\"5!7].# &;3"),
        peg$decode("4^\"\"5!7_"),
        peg$decode("4`\"\"5!7a"),
        peg$decode(";!.) &4b\"\"5!7c"),
        peg$decode("%$;).\x95 &2F\"\"6F7G.\x89 &2J\"\"6J7K.} &2L\"\"6L7M.q &2X\"\"6X7Y.e &2P\"\"6P7Q.Y &2H\"\"6H7I.M &2@\"\"6@7A.A &2d\"\"6d7e.5 &2R\"\"6R7S.) &2N\"\"6N7O/\x9E#0\x9B*;).\x95 &2F\"\"6F7G.\x89 &2J\"\"6J7K.} &2L\"\"6L7M.q &2X\"\"6X7Y.e &2P\"\"6P7Q.Y &2H\"\"6H7I.M &2@\"\"6@7A.A &2d\"\"6d7e.5 &2R\"\"6R7S.) &2N\"\"6N7O&&&#/\"!&,)"),
        peg$decode("%$;).\x89 &2F\"\"6F7G.} &2L\"\"6L7M.q &2X\"\"6X7Y.e &2P\"\"6P7Q.Y &2H\"\"6H7I.M &2@\"\"6@7A.A &2d\"\"6d7e.5 &2R\"\"6R7S.) &2N\"\"6N7O/\x92#0\x8F*;).\x89 &2F\"\"6F7G.} &2L\"\"6L7M.q &2X\"\"6X7Y.e &2P\"\"6P7Q.Y &2H\"\"6H7I.M &2@\"\"6@7A.A &2d\"\"6d7e.5 &2R\"\"6R7S.) &2N\"\"6N7O&&&#/\"!&,)"),
        peg$decode("2T\"\"6T7U.\xE3 &2V\"\"6V7W.\xD7 &2f\"\"6f7g.\xCB &2h\"\"6h7i.\xBF &2:\"\"6:7;.\xB3 &2D\"\"6D7E.\xA7 &22\"\"6273.\x9B &28\"\"6879.\x8F &2j\"\"6j7k.\x83 &;&.} &24\"\"6475.q &2l\"\"6l7m.e &2n\"\"6n7o.Y &26\"\"6677.M &2>\"\"6>7?.A &2p\"\"6p7q.5 &2r\"\"6r7s.) &;'.# &;("),
        peg$decode("%$;).\u012B &2F\"\"6F7G.\u011F &2J\"\"6J7K.\u0113 &2L\"\"6L7M.\u0107 &2X\"\"6X7Y.\xFB &2P\"\"6P7Q.\xEF &2H\"\"6H7I.\xE3 &2@\"\"6@7A.\xD7 &2d\"\"6d7e.\xCB &2R\"\"6R7S.\xBF &2N\"\"6N7O.\xB3 &2T\"\"6T7U.\xA7 &2V\"\"6V7W.\x9B &2f\"\"6f7g.\x8F &2h\"\"6h7i.\x83 &28\"\"6879.w &2j\"\"6j7k.k &;&.e &24\"\"6475.Y &2l\"\"6l7m.M &2n\"\"6n7o.A &26\"\"6677.5 &2p\"\"6p7q.) &2r\"\"6r7s/\u0134#0\u0131*;).\u012B &2F\"\"6F7G.\u011F &2J\"\"6J7K.\u0113 &2L\"\"6L7M.\u0107 &2X\"\"6X7Y.\xFB &2P\"\"6P7Q.\xEF &2H\"\"6H7I.\xE3 &2@\"\"6@7A.\xD7 &2d\"\"6d7e.\xCB &2R\"\"6R7S.\xBF &2N\"\"6N7O.\xB3 &2T\"\"6T7U.\xA7 &2V\"\"6V7W.\x9B &2f\"\"6f7g.\x8F &2h\"\"6h7i.\x83 &28\"\"6879.w &2j\"\"6j7k.k &;&.e &24\"\"6475.Y &2l\"\"6l7m.M &2n\"\"6n7o.A &26\"\"6677.5 &2p\"\"6p7q.) &2r\"\"6r7s&&&#/\"!&,)"),
        peg$decode("%;//?#2P\"\"6P7Q/0$;//'$8#:t# )(#'#(\"'#&'#"),
        peg$decode("%;//?#24\"\"6475/0$;//'$8#:u# )(#'#(\"'#&'#"),
        peg$decode("%;//?#2>\"\"6>7?/0$;//'$8#:v# )(#'#(\"'#&'#"),
        peg$decode("%;//?#2T\"\"6T7U/0$;//'$8#:w# )(#'#(\"'#&'#"),
        peg$decode("%;//?#2V\"\"6V7W/0$;//'$8#:x# )(#'#(\"'#&'#"),
        peg$decode("%2h\"\"6h7i/0#;//'$8\":y\" )(\"'#&'#"),
        peg$decode("%;//6#2f\"\"6f7g/'$8\":z\" )(\"'#&'#"),
        peg$decode("%;//?#2D\"\"6D7E/0$;//'$8#:{# )(#'#(\"'#&'#"),
        peg$decode("%;//?#22\"\"6273/0$;//'$8#:|# )(#'#(\"'#&'#"),
        peg$decode("%;//?#28\"\"6879/0$;//'$8#:}# )(#'#(\"'#&'#"),
        peg$decode("%;//0#;&/'$8\":~\" )(\"'#&'#"),
        peg$decode("%;&/0#;//'$8\":~\" )(\"'#&'#"),
        peg$decode("%;=/T#$;G.) &;K.# &;F0/*;G.) &;K.# &;F&/,$;>/#$+#)(#'#(\"'#&'#"),
        peg$decode("4\x7F\"\"5!7\x80.A &4\x81\"\"5!7\x82.5 &4\x83\"\"5!7\x84.) &;3.# &;."),
        peg$decode("%%;//Q#;&/H$$;J.# &;K0)*;J.# &;K&/,$;&/#$+$)($'#(#'#(\"'#&'#/\"!&,)"),
        peg$decode("%;//]#;&/T$%$;J.# &;K0)*;J.# &;K&/\"!&,)/1$;&/($8$:\x85$!!)($'#(#'#(\"'#&'#"),
        peg$decode(";..G &2L\"\"6L7M.; &4\x86\"\"5!7\x87./ &4\x83\"\"5!7\x84.# &;3"),
        peg$decode("%2j\"\"6j7k/J#4\x88\"\"5!7\x89.5 &4\x8A\"\"5!7\x8B.) &4\x8C\"\"5!7\x8D/#$+\")(\"'#&'#"),
        peg$decode("%;N/M#28\"\"6879/>$;O.\" &\"/0$;S/'$8$:\x8E$ )($'#(#'#(\"'#&'#"),
        peg$decode("%;N/d#28\"\"6879/U$;O.\" &\"/G$;S/>$;_/5$;l.\" &\"/'$8&:\x8F& )(&'#(%'#($'#(#'#(\"'#&'#"),
        peg$decode("%3\x90\"\"5$7\x91.) &3\x92\"\"5#7\x93/' 8!:\x94!! )"),
        peg$decode("%;P/]#%28\"\"6879/,#;R/#$+\")(\"'#&'#.\" &\"/6$2:\"\"6:7;/'$8#:\x95# )(#'#(\"'#&'#"),
        peg$decode("$;+.) &;-.# &;Q/2#0/*;+.) &;-.# &;Q&&&#"),
        peg$decode("2<\"\"6<7=.q &2>\"\"6>7?.e &2@\"\"6@7A.Y &2B\"\"6B7C.M &2D\"\"6D7E.A &22\"\"6273.5 &26\"\"6677.) &24\"\"6475"),
        peg$decode("%$;+._ &;-.Y &2<\"\"6<7=.M &2>\"\"6>7?.A &2@\"\"6@7A.5 &2B\"\"6B7C.) &2D\"\"6D7E0e*;+._ &;-.Y &2<\"\"6<7=.M &2>\"\"6>7?.A &2@\"\"6@7A.5 &2B\"\"6B7C.) &2D\"\"6D7E&/& 8!:\x96! )"),
        peg$decode("%;T/J#%28\"\"6879/,#;^/#$+\")(\"'#&'#.\" &\"/#$+\")(\"'#&'#"),
        peg$decode("%;U.) &;\\.# &;X/& 8!:\x97! )"),
        peg$decode("%$%;V/2#2J\"\"6J7K/#$+\")(\"'#&'#0<*%;V/2#2J\"\"6J7K/#$+\")(\"'#&'#&/D#;W/;$2J\"\"6J7K.\" &\"/'$8#:\x98# )(#'#(\"'#&'#"),
        peg$decode("$4\x99\"\"5!7\x9A/,#0)*4\x99\"\"5!7\x9A&&&#"),
        peg$decode("%4$\"\"5!7%/?#$4\x9B\"\"5!7\x9C0)*4\x9B\"\"5!7\x9C&/#$+\")(\"'#&'#"),
        peg$decode("%2l\"\"6l7m/?#;Y/6$2n\"\"6n7o/'$8#:\x9D# )(#'#(\"'#&'#"),
        peg$decode("%%;Z/\xB3#28\"\"6879/\xA4$;Z/\x9B$28\"\"6879/\x8C$;Z/\x83$28\"\"6879/t$;Z/k$28\"\"6879/\\$;Z/S$28\"\"6879/D$;Z/;$28\"\"6879/,$;[/#$+-)(-'#(,'#(+'#(*'#()'#(('#(''#(&'#(%'#($'#(#'#(\"'#&'#.\u0790 &%2\x9E\"\"6\x9E7\x9F/\xA4#;Z/\x9B$28\"\"6879/\x8C$;Z/\x83$28\"\"6879/t$;Z/k$28\"\"6879/\\$;Z/S$28\"\"6879/D$;Z/;$28\"\"6879/,$;[/#$+,)(,'#(+'#(*'#()'#(('#(''#(&'#(%'#($'#(#'#(\"'#&'#.\u06F9 &%2\x9E\"\"6\x9E7\x9F/\x8C#;Z/\x83$28\"\"6879/t$;Z/k$28\"\"6879/\\$;Z/S$28\"\"6879/D$;Z/;$28\"\"6879/,$;[/#$+*)(*'#()'#(('#(''#(&'#(%'#($'#(#'#(\"'#&'#.\u067A &%2\x9E\"\"6\x9E7\x9F/t#;Z/k$28\"\"6879/\\$;Z/S$28\"\"6879/D$;Z/;$28\"\"6879/,$;[/#$+()(('#(''#(&'#(%'#($'#(#'#(\"'#&'#.\u0613 &%2\x9E\"\"6\x9E7\x9F/\\#;Z/S$28\"\"6879/D$;Z/;$28\"\"6879/,$;[/#$+&)(&'#(%'#($'#(#'#(\"'#&'#.\u05C4 &%2\x9E\"\"6\x9E7\x9F/D#;Z/;$28\"\"6879/,$;[/#$+$)($'#(#'#(\"'#&'#.\u058D &%2\x9E\"\"6\x9E7\x9F/,#;[/#$+\")(\"'#&'#.\u056E &%2\x9E\"\"6\x9E7\x9F/,#;Z/#$+\")(\"'#&'#.\u054F &%;Z/\x9B#2\x9E\"\"6\x9E7\x9F/\x8C$;Z/\x83$28\"\"6879/t$;Z/k$28\"\"6879/\\$;Z/S$28\"\"6879/D$;Z/;$28\"\"6879/,$;[/#$++)(+'#(*'#()'#(('#(''#(&'#(%'#($'#(#'#(\"'#&'#.\u04C7 &%;Z/\xAA#%28\"\"6879/,#;Z/#$+\")(\"'#&'#.\" &\"/\x83$2\x9E\"\"6\x9E7\x9F/t$;Z/k$28\"\"6879/\\$;Z/S$28\"\"6879/D$;Z/;$28\"\"6879/,$;[/#$+*)(*'#()'#(('#(''#(&'#(%'#($'#(#'#(\"'#&'#.\u0430 &%;Z/\xB9#%28\"\"6879/,#;Z/#$+\")(\"'#&'#.\" &\"/\x92$%28\"\"6879/,#;Z/#$+\")(\"'#&'#.\" &\"/k$2\x9E\"\"6\x9E7\x9F/\\$;Z/S$28\"\"6879/D$;Z/;$28\"\"6879/,$;[/#$+))()'#(('#(''#(&'#(%'#($'#(#'#(\"'#&'#.\u038A &%;Z/\xC8#%28\"\"6879/,#;Z/#$+\")(\"'#&'#.\" &\"/\xA1$%28\"\"6879/,#;Z/#$+\")(\"'#&'#.\" &\"/z$%28\"\"6879/,#;Z/#$+\")(\"'#&'#.\" &\"/S$2\x9E\"\"6\x9E7\x9F/D$;Z/;$28\"\"6879/,$;[/#$+()(('#(''#(&'#(%'#($'#(#'#(\"'#&'#.\u02D5 &%;Z/\xD7#%28\"\"6879/,#;Z/#$+\")(\"'#&'#.\" &\"/\xB0$%28\"\"6879/,#;Z/#$+\")(\"'#&'#.\" &\"/\x89$%28\"\"6879/,#;Z/#$+\")(\"'#&'#.\" &\"/b$%28\"\"6879/,#;Z/#$+\")(\"'#&'#.\" &\"/;$2\x9E\"\"6\x9E7\x9F/,$;[/#$+')(''#(&'#(%'#($'#(#'#(\"'#&'#.\u0211 &%;Z/\xFE#%28\"\"6879/,#;Z/#$+\")(\"'#&'#.\" &\"/\xD7$%28\"\"6879/,#;Z/#$+\")(\"'#&'#.\" &\"/\xB0$%28\"\"6879/,#;Z/#$+\")(\"'#&'#.\" &\"/\x89$%28\"\"6879/,#;Z/#$+\")(\"'#&'#.\" &\"/b$%28\"\"6879/,#;Z/#$+\")(\"'#&'#.\" &\"/;$2\x9E\"\"6\x9E7\x9F/,$;Z/#$+()(('#(''#(&'#(%'#($'#(#'#(\"'#&'#.\u0126 &%;Z/\u011C#%28\"\"6879/,#;Z/#$+\")(\"'#&'#.\" &\"/\xF5$%28\"\"6879/,#;Z/#$+\")(\"'#&'#.\" &\"/\xCE$%28\"\"6879/,#;Z/#$+\")(\"'#&'#.\" &\"/\xA7$%28\"\"6879/,#;Z/#$+\")(\"'#&'#.\" &\"/\x80$%28\"\"6879/,#;Z/#$+\")(\"'#&'#.\" &\"/Y$%28\"\"6879/,#;Z/#$+\")(\"'#&'#.\" &\"/2$2\x9E\"\"6\x9E7\x9F/#$+()(('#(''#(&'#(%'#($'#(#'#(\"'#&'#/& 8!:\xA0! )"),
        peg$decode("%;#/M#;#.\" &\"/?$;#.\" &\"/1$;#.\" &\"/#$+$)($'#(#'#(\"'#&'#"),
        peg$decode("%;Z/;#28\"\"6879/,$;Z/#$+#)(#'#(\"'#&'#.# &;\\"),
        peg$decode("%;]/o#2J\"\"6J7K/`$;]/W$2J\"\"6J7K/H$;]/?$2J\"\"6J7K/0$;]/'$8':\xA1' )(''#(&'#(%'#($'#(#'#(\"'#&'#"),
        peg$decode("%2\xA2\"\"6\xA27\xA3/2#4\xA4\"\"5!7\xA5/#$+\")(\"'#&'#.\x98 &%2\xA6\"\"6\xA67\xA7/;#4\xA8\"\"5!7\xA9/,$;!/#$+#)(#'#(\"'#&'#.j &%2\xAA\"\"6\xAA7\xAB/5#;!/,$;!/#$+#)(#'#(\"'#&'#.B &%4\xAC\"\"5!7\xAD/,#;!/#$+\")(\"'#&'#.# &;!"),
        peg$decode("%%;!.\" &\"/[#;!.\" &\"/M$;!.\" &\"/?$;!.\" &\"/1$;!.\" &\"/#$+%)(%'#($'#(#'#(\"'#&'#/' 8!:\xAE!! )"),
        peg$decode("$%22\"\"6273/,#;`/#$+\")(\"'#&'#0<*%22\"\"6273/,#;`/#$+\")(\"'#&'#&"),
        peg$decode(";a.A &;b.; &;c.5 &;d./ &;e.) &;f.# &;g"),
        peg$decode("%3\xAF\"\"5*7\xB0/a#3\xB1\"\"5#7\xB2.G &3\xB3\"\"5#7\xB4.; &3\xB5\"\"5$7\xB6./ &3\xB7\"\"5#7\xB8.# &;6/($8\":\xB9\"! )(\"'#&'#"),
        peg$decode("%3\xBA\"\"5%7\xBB/I#3\xBC\"\"5%7\xBD./ &3\xBE\"\"5\"7\xBF.# &;6/($8\":\xC0\"! )(\"'#&'#"),
        peg$decode("%3\xC1\"\"5'7\xC2/1#;\x90/($8\":\xC3\"! )(\"'#&'#"),
        peg$decode("%3\xC4\"\"5$7\xC5/1#;\xF0/($8\":\xC6\"! )(\"'#&'#"),
        peg$decode("%3\xC7\"\"5&7\xC8/1#;T/($8\":\xC9\"! )(\"'#&'#"),
        peg$decode("%3\xCA\"\"5\"7\xCB/N#%2>\"\"6>7?/,#;6/#$+\")(\"'#&'#.\" &\"/'$8\":\xCC\" )(\"'#&'#"),
        peg$decode("%;h/P#%2>\"\"6>7?/,#;i/#$+\")(\"'#&'#.\" &\"/)$8\":\xCD\"\"! )(\"'#&'#"),
        peg$decode("%$;j/&#0#*;j&&&#/\"!&,)"),
        peg$decode("%$;j/&#0#*;j&&&#/\"!&,)"),
        peg$decode(";k.) &;+.# &;-"),
        peg$decode("2l\"\"6l7m.e &2n\"\"6n7o.Y &24\"\"6475.M &28\"\"6879.A &2<\"\"6<7=.5 &2@\"\"6@7A.) &2B\"\"6B7C"),
        peg$decode("%26\"\"6677/n#;m/e$$%2<\"\"6<7=/,#;m/#$+\")(\"'#&'#0<*%2<\"\"6<7=/,#;m/#$+\")(\"'#&'#&/#$+#)(#'#(\"'#&'#"),
        peg$decode("%;n/A#2>\"\"6>7?/2$;o/)$8#:\xCE#\"\" )(#'#(\"'#&'#"),
        peg$decode("$;p.) &;+.# &;-/2#0/*;p.) &;+.# &;-&&&#"),
        peg$decode("$;p.) &;+.# &;-0/*;p.) &;+.# &;-&"),
        peg$decode("2l\"\"6l7m.e &2n\"\"6n7o.Y &24\"\"6475.M &26\"\"6677.A &28\"\"6879.5 &2@\"\"6@7A.) &2B\"\"6B7C"),
        peg$decode(";\x91.# &;r"),
        peg$decode("%;\x90/G#;'/>$;s/5$;'/,$;\x84/#$+%)(%'#($'#(#'#(\"'#&'#"),
        peg$decode(";M.# &;t"),
        peg$decode("%;\x7F/E#28\"\"6879/6$;u.# &;x/'$8#:\xCF# )(#'#(\"'#&'#"),
        peg$decode("%;v.# &;w/J#%26\"\"6677/,#;\x83/#$+\")(\"'#&'#.\" &\"/#$+\")(\"'#&'#"),
        peg$decode("%2\xD0\"\"6\xD07\xD1/:#;\x80/1$;w.\" &\"/#$+#)(#'#(\"'#&'#"),
        peg$decode("%24\"\"6475/,#;{/#$+\")(\"'#&'#"),
        peg$decode("%;z/3#$;y0#*;y&/#$+\")(\"'#&'#"),
        peg$decode(";*.) &;+.# &;-"),
        peg$decode(";+.\x8F &;-.\x89 &22\"\"6273.} &26\"\"6677.q &28\"\"6879.e &2:\"\"6:7;.Y &2<\"\"6<7=.M &2>\"\"6>7?.A &2@\"\"6@7A.5 &2B\"\"6B7C.) &2D\"\"6D7E"),
        peg$decode("%;|/e#$%24\"\"6475/,#;|/#$+\")(\"'#&'#0<*%24\"\"6475/,#;|/#$+\")(\"'#&'#&/#$+\")(\"'#&'#"),
        peg$decode("%$;~0#*;~&/e#$%22\"\"6273/,#;}/#$+\")(\"'#&'#0<*%22\"\"6273/,#;}/#$+\")(\"'#&'#&/#$+\")(\"'#&'#"),
        peg$decode("$;~0#*;~&"),
        peg$decode(";+.w &;-.q &28\"\"6879.e &2:\"\"6:7;.Y &2<\"\"6<7=.M &2>\"\"6>7?.A &2@\"\"6@7A.5 &2B\"\"6B7C.) &2D\"\"6D7E"),
        peg$decode("%%;\"/\x87#$;\".G &;!.A &2@\"\"6@7A.5 &2F\"\"6F7G.) &2J\"\"6J7K0M*;\".G &;!.A &2@\"\"6@7A.5 &2F\"\"6F7G.) &2J\"\"6J7K&/#$+\")(\"'#&'#/& 8!:\xD2! )"),
        peg$decode(";\x81.# &;\x82"),
        peg$decode("%%;O/2#2:\"\"6:7;/#$+\")(\"'#&'#.\" &\"/,#;S/#$+\")(\"'#&'#.\" &\""),
        peg$decode("$;+.\x83 &;-.} &2B\"\"6B7C.q &2D\"\"6D7E.e &22\"\"6273.Y &28\"\"6879.M &2:\"\"6:7;.A &2<\"\"6<7=.5 &2>\"\"6>7?.) &2@\"\"6@7A/\x8C#0\x89*;+.\x83 &;-.} &2B\"\"6B7C.q &2D\"\"6D7E.e &22\"\"6273.Y &28\"\"6879.M &2:\"\"6:7;.A &2<\"\"6<7=.5 &2>\"\"6>7?.) &2@\"\"6@7A&&&#"),
        peg$decode("$;y0#*;y&"),
        peg$decode("%3\x92\"\"5#7\xD3/q#24\"\"6475/b$$;!/&#0#*;!&&&#/L$2J\"\"6J7K/=$$;!/&#0#*;!&&&#/'$8%:\xD4% )(%'#($'#(#'#(\"'#&'#"),
        peg$decode("2\xD5\"\"6\xD57\xD6"),
        peg$decode("2\xD7\"\"6\xD77\xD8"),
        peg$decode("2\xD9\"\"6\xD97\xDA"),
        peg$decode("2\xDB\"\"6\xDB7\xDC"),
        peg$decode("2\xDD\"\"6\xDD7\xDE"),
        peg$decode("2\xDF\"\"6\xDF7\xE0"),
        peg$decode("2\xE1\"\"6\xE17\xE2"),
        peg$decode("2\xE3\"\"6\xE37\xE4"),
        peg$decode("2\xE5\"\"6\xE57\xE6"),
        peg$decode("2\xE7\"\"6\xE77\xE8"),
        peg$decode("2\xE9\"\"6\xE97\xEA"),
        peg$decode("%;\x85.Y &;\x86.S &;\x88.M &;\x89.G &;\x8A.A &;\x8B.; &;\x8C.5 &;\x8F./ &;\x8D.) &;\x8E.# &;6/& 8!:\xEB! )"),
        peg$decode("%;\x84/G#;'/>$;\x92/5$;'/,$;\x94/#$+%)(%'#($'#(#'#(\"'#&'#"),
        peg$decode("%;\x93/' 8!:\xEC!! )"),
        peg$decode("%;!/5#;!/,$;!/#$+#)(#'#(\"'#&'#"),
        peg$decode("%$;*.A &;+.; &;-.5 &;3./ &;4.) &;'.# &;(0G*;*.A &;+.; &;-.5 &;3./ &;4.) &;'.# &;(&/& 8!:\xED! )"),
        peg$decode("%;\xB6/Y#$%;A/,#;\xB6/#$+\")(\"'#&'#06*%;A/,#;\xB6/#$+\")(\"'#&'#&/#$+\")(\"'#&'#"),
        peg$decode("%;9/N#%2:\"\"6:7;/,#;9/#$+\")(\"'#&'#.\" &\"/'$8\":\xEE\" )(\"'#&'#"),
        peg$decode("%;:.c &%;\x98/Y#$%;A/,#;\x98/#$+\")(\"'#&'#06*%;A/,#;\x98/#$+\")(\"'#&'#&/#$+\")(\"'#&'#/& 8!:\xEF! )"),
        peg$decode("%;L.# &;\x99/]#$%;B/,#;\x9B/#$+\")(\"'#&'#06*%;B/,#;\x9B/#$+\")(\"'#&'#&/'$8\":\xF0\" )(\"'#&'#"),
        peg$decode("%;\x9A.\" &\"/>#;@/5$;M/,$;?/#$+$)($'#(#'#(\"'#&'#"),
        peg$decode("%%;6/Y#$%;./,#;6/#$+\")(\"'#&'#06*%;./,#;6/#$+\")(\"'#&'#&/#$+\")(\"'#&'#.# &;H/' 8!:\xF1!! )"),
        peg$decode(";\x9C.) &;\x9D.# &;\xA0"),
        peg$decode("%3\xF2\"\"5!7\xF3/:#;</1$;\x9F/($8#:\xF4#! )(#'#(\"'#&'#"),
        peg$decode("%3\xF5\"\"5'7\xF6/:#;</1$;\x9E/($8#:\xF7#! )(#'#(\"'#&'#"),
        peg$decode("%$;!/&#0#*;!&&&#/' 8!:\xF8!! )"),
        peg$decode("%2\xF9\"\"6\xF97\xFA/o#%2J\"\"6J7K/M#;!.\" &\"/?$;!.\" &\"/1$;!.\" &\"/#$+$)($'#(#'#(\"'#&'#.\" &\"/'$8\":\xFB\" )(\"'#&'#"),
        peg$decode("%;6/J#%;</,#;\xA1/#$+\")(\"'#&'#.\" &\"/)$8\":\xFC\"\"! )(\"'#&'#"),
        peg$decode(";6.) &;T.# &;H"),
        peg$decode("%;\xA3/Y#$%;B/,#;\xA4/#$+\")(\"'#&'#06*%;B/,#;\xA4/#$+\")(\"'#&'#&/#$+\")(\"'#&'#"),
        peg$decode("%3\xFD\"\"5&7\xFE.G &3\xFF\"\"5'7\u0100.; &3\u0101\"\"5$7\u0102./ &3\u0103\"\"5%7\u0104.# &;6/& 8!:\u0105! )"),
        peg$decode(";\xA5.# &;\xA0"),
        peg$decode("%3\u0106\"\"5(7\u0107/M#;</D$3\u0108\"\"5(7\u0109./ &3\u010A\"\"5(7\u010B.# &;6/#$+#)(#'#(\"'#&'#"),
        peg$decode("%;6/Y#$%;A/,#;6/#$+\")(\"'#&'#06*%;A/,#;6/#$+\")(\"'#&'#&/#$+\")(\"'#&'#"),
        peg$decode("%$;!/&#0#*;!&&&#/' 8!:\u010C!! )"),
        peg$decode("%;\xA9/& 8!:\u010D! )"),
        peg$decode("%;\xAA/k#;;/b$;\xAF/Y$$%;B/,#;\xB0/#$+\")(\"'#&'#06*%;B/,#;\xB0/#$+\")(\"'#&'#&/#$+$)($'#(#'#(\"'#&'#"),
        peg$decode(";\xAB.# &;\xAC"),
        peg$decode("3\u010E\"\"5$7\u010F.S &3\u0110\"\"5%7\u0111.G &3\u0112\"\"5%7\u0113.; &3\u0114\"\"5%7\u0115./ &3\u0116\"\"5+7\u0117.# &;\xAD"),
        peg$decode("3\u0118\"\"5'7\u0119./ &3\u011A\"\"5)7\u011B.# &;\xAD"),
        peg$decode(";6.# &;\xAE"),
        peg$decode("%3\u011C\"\"5\"7\u011D/,#;6/#$+\")(\"'#&'#"),
        peg$decode(";\xAD.# &;6"),
        peg$decode("%;6/5#;</,$;\xB1/#$+#)(#'#(\"'#&'#"),
        peg$decode(";6.# &;H"),
        peg$decode("%;\xB3/5#;./,$;\x90/#$+#)(#'#(\"'#&'#"),
        peg$decode("%$;!/&#0#*;!&&&#/' 8!:\u011E!! )"),
        peg$decode("%;\x9E/' 8!:\u011F!! )"),
        peg$decode("%;\xB6/^#$%;B/,#;\xA0/#$+\")(\"'#&'#06*%;B/,#;\xA0/#$+\")(\"'#&'#&/($8\":\u0120\"!!)(\"'#&'#"),
        peg$decode("%%;7/e#$%2J\"\"6J7K/,#;7/#$+\")(\"'#&'#0<*%2J\"\"6J7K/,#;7/#$+\")(\"'#&'#&/#$+\")(\"'#&'#/\"!&,)"),
        peg$decode("%;L.# &;\x99/]#$%;B/,#;\xB8/#$+\")(\"'#&'#06*%;B/,#;\xB8/#$+\")(\"'#&'#&/'$8\":\u0121\" )(\"'#&'#"),
        peg$decode(";\xB9.# &;\xA0"),
        peg$decode("%3\u0122\"\"5#7\u0123/:#;</1$;6/($8#:\u0124#! )(#'#(\"'#&'#"),
        peg$decode("%$;!/&#0#*;!&&&#/' 8!:\u0125!! )"),
        peg$decode("%;\x9E/' 8!:\u0126!! )"),
        peg$decode("%$;\x9A0#*;\x9A&/x#;@/o$;M/f$;?/]$$%;B/,#;\xA0/#$+\")(\"'#&'#06*%;B/,#;\xA0/#$+\")(\"'#&'#&/'$8%:\u0127% )(%'#($'#(#'#(\"'#&'#"),
        peg$decode(";\xBE"),
        peg$decode("%3\u0128\"\"5&7\u0129/k#;./b$;\xC1/Y$$%;A/,#;\xC1/#$+\")(\"'#&'#06*%;A/,#;\xC1/#$+\")(\"'#&'#&/#$+$)($'#(#'#(\"'#&'#.# &;\xBF"),
        peg$decode("%;6/k#;./b$;\xC0/Y$$%;A/,#;\xC0/#$+\")(\"'#&'#06*%;A/,#;\xC0/#$+\")(\"'#&'#&/#$+$)($'#(#'#(\"'#&'#"),
        peg$decode("%;6/;#;</2$;6.# &;H/#$+#)(#'#(\"'#&'#"),
        peg$decode(";\xC2.G &;\xC4.A &;\xC6.; &;\xC8.5 &;\xC9./ &;\xCA.) &;\xCB.# &;\xC0"),
        peg$decode("%3\u012A\"\"5%7\u012B/5#;</,$;\xC3/#$+#)(#'#(\"'#&'#"),
        peg$decode("%;I/' 8!:\u012C!! )"),
        peg$decode("%3\u012D\"\"5&7\u012E/\x97#;</\x8E$;D/\x85$;\xC5/|$$%$;'/&#0#*;'&&&#/,#;\xC5/#$+\")(\"'#&'#0C*%$;'/&#0#*;'&&&#/,#;\xC5/#$+\")(\"'#&'#&/,$;E/#$+&)(&'#(%'#($'#(#'#(\"'#&'#"),
        peg$decode(";t.# &;w"),
        peg$decode("%3\u012F\"\"5%7\u0130/5#;</,$;\xC7/#$+#)(#'#(\"'#&'#"),
        peg$decode("%;I/' 8!:\u0131!! )"),
        peg$decode("%3\u0132\"\"5&7\u0133/:#;</1$;I/($8#:\u0134#! )(#'#(\"'#&'#"),
        peg$decode("%3\u0135\"\"5%7\u0136/]#;</T$%3\u0137\"\"5$7\u0138/& 8!:\u0139! ).4 &%3\u013A\"\"5%7\u013B/& 8!:\u013C! )/#$+#)(#'#(\"'#&'#"),
        peg$decode("%3\u013D\"\"5)7\u013E/R#;</I$3\u013F\"\"5#7\u0140./ &3\u0141\"\"5(7\u0142.# &;6/($8#:\u0143#! )(#'#(\"'#&'#"),
        peg$decode("%3\u0144\"\"5#7\u0145/\x93#;</\x8A$;D/\x81$%;\xCC/e#$%2D\"\"6D7E/,#;\xCC/#$+\")(\"'#&'#0<*%2D\"\"6D7E/,#;\xCC/#$+\")(\"'#&'#&/#$+\")(\"'#&'#/,$;E/#$+%)(%'#($'#(#'#(\"'#&'#"),
        peg$decode("%3\u0146\"\"5(7\u0147./ &3\u0148\"\"5$7\u0149.# &;6/' 8!:\u014A!! )"),
        peg$decode("%;6/Y#$%;A/,#;6/#$+\")(\"'#&'#06*%;A/,#;6/#$+\")(\"'#&'#&/#$+\")(\"'#&'#"),
        peg$decode("%;\xCF/G#;./>$;\xCF/5$;./,$;\x90/#$+%)(%'#($'#(#'#(\"'#&'#"),
        peg$decode("%$;!/&#0#*;!&&&#/' 8!:\u014B!! )"),
        peg$decode("%;\xD1/]#$%;A/,#;\xD1/#$+\")(\"'#&'#06*%;A/,#;\xD1/#$+\")(\"'#&'#&/'$8\":\u014C\" )(\"'#&'#"),
        peg$decode("%;\x99/]#$%;B/,#;\xA0/#$+\")(\"'#&'#06*%;B/,#;\xA0/#$+\")(\"'#&'#&/'$8\":\u014D\" )(\"'#&'#"),
        peg$decode("%;L.O &;\x99.I &%;@.\" &\"/:#;t/1$;?.\" &\"/#$+#)(#'#(\"'#&'#/]#$%;B/,#;\xA0/#$+\")(\"'#&'#06*%;B/,#;\xA0/#$+\")(\"'#&'#&/'$8\":\u014E\" )(\"'#&'#"),
        peg$decode("%;\xD4/]#$%;B/,#;\xD5/#$+\")(\"'#&'#06*%;B/,#;\xD5/#$+\")(\"'#&'#&/'$8\":\u014F\" )(\"'#&'#"),
        peg$decode("%;\x96/& 8!:\u0150! )"),
        peg$decode("%3\u0151\"\"5(7\u0152/:#;</1$;6/($8#:\u0153#! )(#'#(\"'#&'#.g &%3\u0154\"\"5&7\u0155/:#;</1$;6/($8#:\u0156#! )(#'#(\"'#&'#.: &%3\u0157\"\"5*7\u0158/& 8!:\u0159! ).# &;\xA0"),
        peg$decode("%%;6/k#$%;A/2#;6/)$8\":\u015A\"\"$ )(\"'#&'#0<*%;A/2#;6/)$8\":\u015A\"\"$ )(\"'#&'#&/)$8\":\u015B\"\"! )(\"'#&'#.\" &\"/' 8!:\u015C!! )"),
        peg$decode("%;\xD8/Y#$%;A/,#;\xD8/#$+\")(\"'#&'#06*%;A/,#;\xD8/#$+\")(\"'#&'#&/#$+\")(\"'#&'#"),
        peg$decode("%;\x99/Y#$%;B/,#;\xA0/#$+\")(\"'#&'#06*%;B/,#;\xA0/#$+\")(\"'#&'#&/#$+\")(\"'#&'#"),
        peg$decode("%$;!/&#0#*;!&&&#/' 8!:\u015D!! )"),
        peg$decode("%;\xDB/Y#$%;B/,#;\xDC/#$+\")(\"'#&'#06*%;B/,#;\xDC/#$+\")(\"'#&'#&/#$+\")(\"'#&'#"),
        peg$decode("%3\u015E\"\"5&7\u015F.; &3\u0160\"\"5'7\u0161./ &3\u0162\"\"5*7\u0163.# &;6/& 8!:\u0164! )"),
        peg$decode("%3\u0165\"\"5&7\u0166/:#;</1$;\xDD/($8#:\u0167#! )(#'#(\"'#&'#.} &%3\xF5\"\"5'7\xF6/:#;</1$;\x9E/($8#:\u0168#! )(#'#(\"'#&'#.P &%3\u0169\"\"5+7\u016A/:#;</1$;\x9E/($8#:\u016B#! )(#'#(\"'#&'#.# &;\xA0"),
        peg$decode("3\u016C\"\"5+7\u016D.k &3\u016E\"\"5)7\u016F._ &3\u0170\"\"5(7\u0171.S &3\u0172\"\"5'7\u0173.G &3\u0174\"\"5&7\u0175.; &3\u0176\"\"5*7\u0177./ &3\u0178\"\"5)7\u0179.# &;6"),
        peg$decode(";1.\" &\""),
        peg$decode("%%;6/k#$%;A/2#;6/)$8\":\u015A\"\"$ )(\"'#&'#0<*%;A/2#;6/)$8\":\u015A\"\"$ )(\"'#&'#&/)$8\":\u015B\"\"! )(\"'#&'#.\" &\"/' 8!:\u017A!! )"),
        peg$decode("%;L.# &;\x99/]#$%;B/,#;\xE1/#$+\")(\"'#&'#06*%;B/,#;\xE1/#$+\")(\"'#&'#&/'$8\":\u017B\" )(\"'#&'#"),
        peg$decode(";\xB9.# &;\xA0"),
        peg$decode("%;\xE3/Y#$%;A/,#;\xE3/#$+\")(\"'#&'#06*%;A/,#;\xE3/#$+\")(\"'#&'#&/#$+\")(\"'#&'#"),
        peg$decode("%;\xEA/k#;./b$;\xED/Y$$%;B/,#;\xE4/#$+\")(\"'#&'#06*%;B/,#;\xE4/#$+\")(\"'#&'#&/#$+$)($'#(#'#(\"'#&'#"),
        peg$decode(";\xE5.; &;\xE6.5 &;\xE7./ &;\xE8.) &;\xE9.# &;\xA0"),
        peg$decode("%3\u017C\"\"5#7\u017D/:#;</1$;\xF0/($8#:\u017E#! )(#'#(\"'#&'#"),
        peg$decode("%3\u017F\"\"5%7\u0180/:#;</1$;T/($8#:\u0181#! )(#'#(\"'#&'#"),
        peg$decode("%3\u0182\"\"5(7\u0183/F#;</=$;\\.) &;Y.# &;X/($8#:\u0184#! )(#'#(\"'#&'#"),
        peg$decode("%3\u0185\"\"5&7\u0186/:#;</1$;6/($8#:\u0187#! )(#'#(\"'#&'#"),
        peg$decode("%3\u0188\"\"5%7\u0189/A#;</8$$;!0#*;!&/($8#:\u018A#! )(#'#(\"'#&'#"),
        peg$decode("%;\xEB/G#;;/>$;6/5$;;/,$;\xEC/#$+%)(%'#($'#(#'#(\"'#&'#"),
        peg$decode("%3\x92\"\"5#7\xD3.# &;6/' 8!:\u018B!! )"),
        peg$decode("%3\xB1\"\"5#7\u018C.G &3\xB3\"\"5#7\u018D.; &3\xB7\"\"5#7\u018E./ &3\xB5\"\"5$7\u018F.# &;6/' 8!:\u0190!! )"),
        peg$decode("%;\xEE/D#%;C/,#;\xEF/#$+\")(\"'#&'#.\" &\"/#$+\")(\"'#&'#"),
        peg$decode("%;U.) &;\\.# &;X/& 8!:\u0191! )"),
        peg$decode("%%;!.\" &\"/[#;!.\" &\"/M$;!.\" &\"/?$;!.\" &\"/1$;!.\" &\"/#$+%)(%'#($'#(#'#(\"'#&'#/' 8!:\u0192!! )"),
        peg$decode("%%;!/?#;!.\" &\"/1$;!.\" &\"/#$+#)(#'#(\"'#&'#/' 8!:\u0193!! )"),
        peg$decode(";\xBE"),
        peg$decode("%;\x9E/^#$%;B/,#;\xF3/#$+\")(\"'#&'#06*%;B/,#;\xF3/#$+\")(\"'#&'#&/($8\":\u0194\"!!)(\"'#&'#"),
        peg$decode(";\xF4.# &;\xA0"),
        peg$decode("%2\u0195\"\"6\u01957\u0196/L#;</C$2\u0197\"\"6\u01977\u0198.) &2\u0199\"\"6\u01997\u019A/($8#:\u019B#! )(#'#(\"'#&'#"),
        peg$decode("%;\x9E/^#$%;B/,#;\xA0/#$+\")(\"'#&'#06*%;B/,#;\xA0/#$+\")(\"'#&'#&/($8\":\u019C\"!!)(\"'#&'#"),
        peg$decode("%;6/5#;0/,$;\xF7/#$+#)(#'#(\"'#&'#"),
        peg$decode("$;2.) &;4.# &;.0/*;2.) &;4.# &;.&"),
        peg$decode("$;%0#*;%&"),
        peg$decode("%;\xFA/;#28\"\"6879/,$;\xFB/#$+#)(#'#(\"'#&'#"),
        peg$decode("%3\u019D\"\"5%7\u019E.) &3\u019F\"\"5$7\u01A0/' 8!:\u01A1!! )"),
        peg$decode("%;\xFC/J#%28\"\"6879/,#;^/#$+\")(\"'#&'#.\" &\"/#$+\")(\"'#&'#"),
        peg$decode("%;\\.) &;X.# &;\x82/' 8!:\u01A2!! )"),
        peg$decode(";\".S &;!.M &2F\"\"6F7G.A &2J\"\"6J7K.5 &2H\"\"6H7I.) &2N\"\"6N7O"),
        peg$decode("2L\"\"6L7M.\x95 &2B\"\"6B7C.\x89 &2<\"\"6<7=.} &2R\"\"6R7S.q &2T\"\"6T7U.e &2V\"\"6V7W.Y &2P\"\"6P7Q.M &2@\"\"6@7A.A &2D\"\"6D7E.5 &22\"\"6273.) &2>\"\"6>7?"),
        peg$decode("%;\u0100/b#28\"\"6879/S$;\xFB/J$%2\u01A3\"\"6\u01A37\u01A4/,#;\xEC/#$+\")(\"'#&'#.\" &\"/#$+$)($'#(#'#(\"'#&'#"),
        peg$decode("%3\u01A5\"\"5%7\u01A6.) &3\u01A7\"\"5$7\u01A8/' 8!:\u01A1!! )"),
        peg$decode("%3\xB1\"\"5#7\xB2.6 &3\xB3\"\"5#7\xB4.* &$;+0#*;+&/' 8!:\u01A9!! )"),
        peg$decode("%;\u0104/\x87#2F\"\"6F7G/x$;\u0103/o$2F\"\"6F7G/`$;\u0103/W$2F\"\"6F7G/H$;\u0103/?$2F\"\"6F7G/0$;\u0105/'$8):\u01AA) )()'#(('#(''#(&'#(%'#($'#(#'#(\"'#&'#"),
        peg$decode("%;#/>#;#/5$;#/,$;#/#$+$)($'#(#'#(\"'#&'#"),
        peg$decode("%;\u0103/,#;\u0103/#$+\")(\"'#&'#"),
        peg$decode("%;\u0103/5#;\u0103/,$;\u0103/#$+#)(#'#(\"'#&'#"),
        peg$decode("%;q/T#$;m0#*;m&/D$%; /,#;\xF8/#$+\")(\"'#&'#.\" &\"/#$+#)(#'#(\"'#&'#"),
        peg$decode("%2\u01AB\"\"6\u01AB7\u01AC.) &2\u01AD\"\"6\u01AD7\u01AE/w#;0/n$;\u0108/e$$%;B/2#;\u0109.# &;\xA0/#$+\")(\"'#&'#0<*%;B/2#;\u0109.# &;\xA0/#$+\")(\"'#&'#&/#$+$)($'#(#'#(\"'#&'#"),
        peg$decode(";\x99.# &;L"),
        peg$decode("%2\u01AF\"\"6\u01AF7\u01B0/5#;</,$;\u010A/#$+#)(#'#(\"'#&'#"),
        peg$decode("%;D/S#;,/J$2:\"\"6:7;/;$;,.# &;T/,$;E/#$+%)(%'#($'#(#'#(\"'#&'#")
    ];
    let peg$currPos = 0;
    let peg$savedPos = 0;
    const peg$posDetailsCache = [{ line: 1, column: 1 }];
    let peg$maxFailPos = 0;
    let peg$maxFailExpected = [];
    let peg$silentFails = 0;
    let peg$result;
    if (options.startRule !== undefined) {
        if (!(options.startRule in peg$startRuleIndices)) {
            throw new Error("Can't start parsing from rule \"" + options.startRule + "\".");
        }
        peg$startRuleIndex = peg$startRuleIndices[options.startRule];
    }
    function text() {
        return input.substring(peg$savedPos, peg$currPos);
    }
    function location() {
        return peg$computeLocation(peg$savedPos, peg$currPos);
    }
    function expected(description, location1) {
        location1 = location1 !== undefined
            ? location1
            : peg$computeLocation(peg$savedPos, peg$currPos);
        throw peg$buildStructuredError([peg$otherExpectation(description)], input.substring(peg$savedPos, peg$currPos), location1);
    }
    function error(message, location1) {
        location1 = location1 !== undefined
            ? location1
            : peg$computeLocation(peg$savedPos, peg$currPos);
        throw peg$buildSimpleError(message, location1);
    }
    function peg$literalExpectation(text1, ignoreCase) {
        return { type: "literal", text: text1, ignoreCase: ignoreCase };
    }
    function peg$classExpectation(parts, inverted, ignoreCase) {
        return { type: "class", parts: parts, inverted: inverted, ignoreCase: ignoreCase };
    }
    function peg$anyExpectation() {
        return { type: "any" };
    }
    function peg$endExpectation() {
        return { type: "end" };
    }
    function peg$otherExpectation(description) {
        return { type: "other", description: description };
    }
    function peg$computePosDetails(pos) {
        let details = peg$posDetailsCache[pos];
        let p;
        if (details) {
            return details;
        }
        else {
            p = pos - 1;
            while (!peg$posDetailsCache[p]) {
                p--;
            }
            details = peg$posDetailsCache[p];
            details = {
                line: details.line,
                column: details.column
            };
            while (p < pos) {
                if (input.charCodeAt(p) === 10) {
                    details.line++;
                    details.column = 1;
                }
                else {
                    details.column++;
                }
                p++;
            }
            peg$posDetailsCache[pos] = details;
            return details;
        }
    }
    function peg$computeLocation(startPos, endPos) {
        const startPosDetails = peg$computePosDetails(startPos);
        const endPosDetails = peg$computePosDetails(endPos);
        return {
            source: peg$source,
            start: {
                offset: startPos,
                line: startPosDetails.line,
                column: startPosDetails.column
            },
            end: {
                offset: endPos,
                line: endPosDetails.line,
                column: endPosDetails.column
            }
        };
    }
    function peg$fail(expected1) {
        if (peg$currPos < peg$maxFailPos) {
            return;
        }
        if (peg$currPos > peg$maxFailPos) {
            peg$maxFailPos = peg$currPos;
            peg$maxFailExpected = [];
        }
        peg$maxFailExpected.push(expected1);
    }
    function peg$buildSimpleError(message, location1) {
        return new SyntaxError(message, [], "", location1);
    }
    function peg$buildStructuredError(expected1, found, location1) {
        return new SyntaxError(SyntaxError.buildMessage(expected1, found), expected1, found, location1);
    }
    function peg$decode(s) {
        return s.split("").map((ch) => ch.charCodeAt(0) - 32);
    }
    function peg$parseRule(index) {
        const bc = peg$bytecode[index];
        let ip = 0;
        const ips = [];
        let end = bc.length;
        const ends = [];
        const stack = [];
        let params;
        while (true) {
            while (ip < end) {
                switch (bc[ip]) {
                    case 0:
                        stack.push(peg$consts[bc[ip + 1]]);
                        ip += 2;
                        break;
                    case 1:
                        stack.push(undefined);
                        ip++;
                        break;
                    case 2:
                        stack.push(null);
                        ip++;
                        break;
                    case 3:
                        stack.push(peg$FAILED);
                        ip++;
                        break;
                    case 4:
                        stack.push([]);
                        ip++;
                        break;
                    case 5:
                        stack.push(peg$currPos);
                        ip++;
                        break;
                    case 6:
                        stack.pop();
                        ip++;
                        break;
                    case 7:
                        peg$currPos = stack.pop();
                        ip++;
                        break;
                    case 8:
                        stack.length -= bc[ip + 1];
                        ip += 2;
                        break;
                    case 9:
                        stack.splice(-2, 1);
                        ip++;
                        break;
                    case 10:
                        stack[stack.length - 2].push(stack.pop());
                        ip++;
                        break;
                    case 11:
                        stack.push(stack.splice(stack.length - bc[ip + 1], bc[ip + 1]));
                        ip += 2;
                        break;
                    case 12:
                        stack.push(input.substring(stack.pop(), peg$currPos));
                        ip++;
                        break;
                    case 13:
                        ends.push(end);
                        ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);
                        if (stack[stack.length - 1]) {
                            end = ip + 3 + bc[ip + 1];
                            ip += 3;
                        }
                        else {
                            end = ip + 3 + bc[ip + 1] + bc[ip + 2];
                            ip += 3 + bc[ip + 1];
                        }
                        break;
                    case 14:
                        ends.push(end);
                        ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);
                        if (stack[stack.length - 1] === peg$FAILED) {
                            end = ip + 3 + bc[ip + 1];
                            ip += 3;
                        }
                        else {
                            end = ip + 3 + bc[ip + 1] + bc[ip + 2];
                            ip += 3 + bc[ip + 1];
                        }
                        break;
                    case 15:
                        ends.push(end);
                        ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);
                        if (stack[stack.length - 1] !== peg$FAILED) {
                            end = ip + 3 + bc[ip + 1];
                            ip += 3;
                        }
                        else {
                            end = ip + 3 + bc[ip + 1] + bc[ip + 2];
                            ip += 3 + bc[ip + 1];
                        }
                        break;
                    case 16:
                        if (stack[stack.length - 1] !== peg$FAILED) {
                            ends.push(end);
                            ips.push(ip);
                            end = ip + 2 + bc[ip + 1];
                            ip += 2;
                        }
                        else {
                            ip += 2 + bc[ip + 1];
                        }
                        break;
                    case 17:
                        ends.push(end);
                        ips.push(ip + 3 + bc[ip + 1] + bc[ip + 2]);
                        if (input.length > peg$currPos) {
                            end = ip + 3 + bc[ip + 1];
                            ip += 3;
                        }
                        else {
                            end = ip + 3 + bc[ip + 1] + bc[ip + 2];
                            ip += 3 + bc[ip + 1];
                        }
                        break;
                    case 18:
                        ends.push(end);
                        ips.push(ip + 4 + bc[ip + 2] + bc[ip + 3]);
                        if (input.substr(peg$currPos, peg$consts[bc[ip + 1]].length) === peg$consts[bc[ip + 1]]) {
                            end = ip + 4 + bc[ip + 2];
                            ip += 4;
                        }
                        else {
                            end = ip + 4 + bc[ip + 2] + bc[ip + 3];
                            ip += 4 + bc[ip + 2];
                        }
                        break;
                    case 19:
                        ends.push(end);
                        ips.push(ip + 4 + bc[ip + 2] + bc[ip + 3]);
                        if (input.substr(peg$currPos, peg$consts[bc[ip + 1]].length).toLowerCase() === peg$consts[bc[ip + 1]]) {
                            end = ip + 4 + bc[ip + 2];
                            ip += 4;
                        }
                        else {
                            end = ip + 4 + bc[ip + 2] + bc[ip + 3];
                            ip += 4 + bc[ip + 2];
                        }
                        break;
                    case 20:
                        ends.push(end);
                        ips.push(ip + 4 + bc[ip + 2] + bc[ip + 3]);
                        if (peg$consts[bc[ip + 1]].test(input.charAt(peg$currPos))) {
                            end = ip + 4 + bc[ip + 2];
                            ip += 4;
                        }
                        else {
                            end = ip + 4 + bc[ip + 2] + bc[ip + 3];
                            ip += 4 + bc[ip + 2];
                        }
                        break;
                    case 21:
                        stack.push(input.substr(peg$currPos, bc[ip + 1]));
                        peg$currPos += bc[ip + 1];
                        ip += 2;
                        break;
                    case 22:
                        stack.push(peg$consts[bc[ip + 1]]);
                        peg$currPos += peg$consts[bc[ip + 1]].length;
                        ip += 2;
                        break;
                    case 23:
                        stack.push(peg$FAILED);
                        if (peg$silentFails === 0) {
                            peg$fail(peg$consts[bc[ip + 1]]);
                        }
                        ip += 2;
                        break;
                    case 24:
                        peg$savedPos = stack[stack.length - 1 - bc[ip + 1]];
                        ip += 2;
                        break;
                    case 25:
                        peg$savedPos = peg$currPos;
                        ip++;
                        break;
                    case 26:
                        params = bc.slice(ip + 4, ip + 4 + bc[ip + 3])
                            .map(function (p) { return stack[stack.length - 1 - p]; });
                        stack.splice(stack.length - bc[ip + 2], bc[ip + 2], peg$consts[bc[ip + 1]].apply(null, params));
                        ip += 4 + bc[ip + 3];
                        break;
                    case 27:
                        stack.push(peg$parseRule(bc[ip + 1]));
                        ip += 2;
                        break;
                    case 28:
                        peg$silentFails++;
                        ip++;
                        break;
                    case 29:
                        peg$silentFails--;
                        ip++;
                        break;
                    default:
                        throw new Error("Invalid opcode: " + bc[ip] + ".");
                }
            }
            if (ends.length > 0) {
                end = ends.pop();
                ip = ips.pop();
            }
            else {
                break;
            }
        }
        return stack[0];
    }
    options.data = {}; // Object to which header attributes will be assigned during parsing
    function list(head, tail) {
        return [head].concat(tail);
    }
    peg$result = peg$parseRule(peg$startRuleIndex);
    if (peg$result !== peg$FAILED && peg$currPos === input.length) {
        return peg$result;
    }
    else {
        if (peg$result !== peg$FAILED && peg$currPos < input.length) {
            peg$fail(peg$endExpectation());
        }
        throw peg$buildStructuredError(peg$maxFailExpected, peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null, peg$maxFailPos < input.length
            ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
            : peg$computeLocation(peg$maxFailPos, peg$maxFailPos));
    }
}
const parse = peg$parse;


/***/ }),

/***/ "./node_modules/sip.js/lib/grammar/uri.js":
/*!************************************************!*\
  !*** ./node_modules/sip.js/lib/grammar/uri.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "URI": () => (/* binding */ URI),
/* harmony export */   "equivalentURI": () => (/* binding */ equivalentURI)
/* harmony export */ });
/* harmony import */ var _parameters_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parameters.js */ "./node_modules/sip.js/lib/grammar/parameters.js");
/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * URI.
 * @public
 */
class URI extends _parameters_js__WEBPACK_IMPORTED_MODULE_0__.Parameters {
    /**
     * Constructor
     * @param scheme -
     * @param user -
     * @param host -
     * @param port -
     * @param parameters -
     * @param headers -
     */
    constructor(scheme = "sip", user, host, port, parameters, headers) {
        super(parameters || {});
        this.headers = {};
        // Checks
        if (!host) {
            throw new TypeError('missing or invalid "host" parameter');
        }
        for (const header in headers) {
            // eslint-disable-next-line no-prototype-builtins
            if (headers.hasOwnProperty(header)) {
                this.setHeader(header, headers[header]);
            }
        }
        // Raw URI
        this.raw = {
            scheme,
            user,
            host,
            port
        };
        // Normalized URI
        this.normal = {
            scheme: scheme.toLowerCase(),
            user,
            host: host.toLowerCase(),
            port
        };
    }
    get scheme() { return this.normal.scheme; }
    set scheme(value) {
        this.raw.scheme = value;
        this.normal.scheme = value.toLowerCase();
    }
    get user() { return this.normal.user; }
    set user(value) {
        this.normal.user = this.raw.user = value;
    }
    get host() { return this.normal.host; }
    set host(value) {
        this.raw.host = value;
        this.normal.host = value.toLowerCase();
    }
    get aor() { return this.normal.user + "@" + this.normal.host; }
    get port() { return this.normal.port; }
    set port(value) {
        this.normal.port = this.raw.port = value === 0 ? value : value;
    }
    setHeader(name, value) {
        this.headers[this.headerize(name)] = (value instanceof Array) ? value : [value];
    }
    getHeader(name) {
        if (name) {
            return this.headers[this.headerize(name)];
        }
    }
    hasHeader(name) {
        // eslint-disable-next-line no-prototype-builtins
        return !!name && !!this.headers.hasOwnProperty(this.headerize(name));
    }
    deleteHeader(header) {
        header = this.headerize(header);
        // eslint-disable-next-line no-prototype-builtins
        if (this.headers.hasOwnProperty(header)) {
            const value = this.headers[header];
            delete this.headers[header];
            return value;
        }
    }
    clearHeaders() {
        this.headers = {};
    }
    clone() {
        return new URI(this._raw.scheme, this._raw.user || "", this._raw.host, this._raw.port, JSON.parse(JSON.stringify(this.parameters)), JSON.parse(JSON.stringify(this.headers)));
    }
    toRaw() {
        return this._toString(this._raw);
    }
    toString() {
        return this._toString(this._normal);
    }
    get _normal() { return this.normal; }
    get _raw() { return this.raw; }
    _toString(uri) {
        let uriString = uri.scheme + ":";
        // add slashes if it's not a sip(s) URI
        if (!uri.scheme.toLowerCase().match("^sips?$")) {
            uriString += "//";
        }
        if (uri.user) {
            uriString += this.escapeUser(uri.user) + "@";
        }
        uriString += uri.host;
        if (uri.port || uri.port === 0) {
            uriString += ":" + uri.port;
        }
        for (const parameter in this.parameters) {
            // eslint-disable-next-line no-prototype-builtins
            if (this.parameters.hasOwnProperty(parameter)) {
                uriString += ";" + parameter;
                if (this.parameters[parameter] !== null) {
                    uriString += "=" + this.parameters[parameter];
                }
            }
        }
        const headers = [];
        for (const header in this.headers) {
            // eslint-disable-next-line no-prototype-builtins
            if (this.headers.hasOwnProperty(header)) {
                // eslint-disable-next-line @typescript-eslint/no-for-in-array
                for (const idx in this.headers[header]) {
                    // eslint-disable-next-line no-prototype-builtins
                    if (this.headers[header].hasOwnProperty(idx)) {
                        headers.push(header + "=" + this.headers[header][idx]);
                    }
                }
            }
        }
        if (headers.length > 0) {
            uriString += "?" + headers.join("&");
        }
        return uriString;
    }
    /*
     * Hex-escape a SIP URI user.
     * @private
     * @param {String} user
     */
    escapeUser(user) {
        let decodedUser;
        // FIXME: This is called by toString above which should never throw, but
        // decodeURIComponent can throw and I've seen one case in production where
        // it did throw resulting in a cascading failure. This class should be
        // fixed so that decodeURIComponent is not called at this point (in toString).
        // The user should be decoded when the URI is constructor or some other
        // place where we can catch the error before the URI is created or somesuch.
        // eslint-disable-next-line no-useless-catch
        try {
            decodedUser = decodeURIComponent(user);
        }
        catch (error) {
            throw error;
        }
        // Don't hex-escape ':' (%3A), '+' (%2B), '?' (%3F"), '/' (%2F).
        return encodeURIComponent(decodedUser)
            .replace(/%3A/ig, ":")
            .replace(/%2B/ig, "+")
            .replace(/%3F/ig, "?")
            .replace(/%2F/ig, "/");
    }
    headerize(str) {
        const exceptions = {
            "Call-Id": "Call-ID",
            "Cseq": "CSeq",
            "Min-Se": "Min-SE",
            "Rack": "RAck",
            "Rseq": "RSeq",
            "Www-Authenticate": "WWW-Authenticate",
        };
        const name = str.toLowerCase().replace(/_/g, "-").split("-");
        const parts = name.length;
        let hname = "";
        for (let part = 0; part < parts; part++) {
            if (part !== 0) {
                hname += "-";
            }
            hname += name[part].charAt(0).toUpperCase() + name[part].substring(1);
        }
        if (exceptions[hname]) {
            hname = exceptions[hname];
        }
        return hname;
    }
}
/**
 * Returns true if URIs are equivalent per RFC 3261 Section 19.1.4.
 * @param a - URI to compare
 * @param b - URI to compare
 *
 * @remarks
 * 19.1.4 URI Comparison
 * Some operations in this specification require determining whether two
 * SIP or SIPS URIs are equivalent.
 *
 * https://tools.ietf.org/html/rfc3261#section-19.1.4
 * @internal
 */
function equivalentURI(a, b) {
    // o  A SIP and SIPS URI are never equivalent.
    if (a.scheme !== b.scheme) {
        return false;
    }
    // o  Comparison of the userinfo of SIP and SIPS URIs is case-
    //    sensitive.  This includes userinfo containing passwords or
    //    formatted as telephone-subscribers.  Comparison of all other
    //    components of the URI is case-insensitive unless explicitly
    //    defined otherwise.
    //
    // o  The ordering of parameters and header fields is not significant
    //    in comparing SIP and SIPS URIs.
    //
    // o  Characters other than those in the "reserved" set (see RFC 2396
    //    [5]) are equivalent to their ""%" HEX HEX" encoding.
    //
    // o  An IP address that is the result of a DNS lookup of a host name
    //    does not match that host name.
    //
    // o  For two URIs to be equal, the user, password, host, and port
    //    components must match.
    //
    // A URI omitting the user component will not match a URI that
    // includes one.  A URI omitting the password component will not
    // match a URI that includes one.
    //
    // A URI omitting any component with a default value will not
    // match a URI explicitly containing that component with its
    // default value.  For instance, a URI omitting the optional port
    // component will not match a URI explicitly declaring port 5060.
    // The same is true for the transport-parameter, ttl-parameter,
    // user-parameter, and method components.
    //
    // Defining sip:user@host to not be equivalent to
    // sip:user@host:5060 is a change from RFC 2543.  When deriving
    // addresses from URIs, equivalent addresses are expected from
    // equivalent URIs.  The URI sip:user@host:5060 will always
    // resolve to port 5060.  The URI sip:user@host may resolve to
    // other ports through the DNS SRV mechanisms detailed in [4].
    // FIXME: TODO:
    // - character compared to hex encoding is not handled
    // - password does not exist on URI currently
    if (a.user !== b.user || a.host !== b.host || a.port !== b.port) {
        return false;
    }
    // o  URI uri-parameter components are compared as follows:
    function compareParameters(a, b) {
        //  -  Any uri-parameter appearing in both URIs must match.
        const parameterKeysA = Object.keys(a.parameters);
        const parameterKeysB = Object.keys(b.parameters);
        const intersection = parameterKeysA.filter(x => parameterKeysB.includes(x));
        if (!intersection.every(key => a.parameters[key] === b.parameters[key])) {
            return false;
        }
        //  -  A user, ttl, or method uri-parameter appearing in only one
        //     URI never matches, even if it contains the default value.
        if (!["user", "ttl", "method", "transport"].every(key => a.hasParam(key) && b.hasParam(key) || !a.hasParam(key) && !b.hasParam(key))) {
            return false;
        }
        //  -  A URI that includes an maddr parameter will not match a URI
        //     that contains no maddr parameter.
        if (!["maddr"].every(key => a.hasParam(key) && b.hasParam(key) || !a.hasParam(key) && !b.hasParam(key))) {
            return false;
        }
        //  -  All other uri-parameters appearing in only one URI are
        //     ignored when comparing the URIs.
        return true;
    }
    if (!compareParameters(a, b)) {
        return false;
    }
    // o  URI header components are never ignored.  Any present header
    //    component MUST be present in both URIs and match for the URIs
    //    to match.  The matching rules are defined for each header field
    //    in Section 20.
    const headerKeysA = Object.keys(a.headers);
    const headerKeysB = Object.keys(b.headers);
    // No need to check if no headers
    if (headerKeysA.length !== 0 || headerKeysB.length !== 0) {
        // Must have same number of headers
        if (headerKeysA.length !== headerKeysB.length) {
            return false;
        }
        // Must have same headers
        const intersection = headerKeysA.filter(x => headerKeysB.includes(x));
        if (intersection.length !== headerKeysB.length) {
            return false;
        }
        // FIXME: Not to spec. But perhaps not worth fixing?
        // Must have same header values
        // It seems too much to consider multiple headers with same name.
        // It seems too much to compare two header params according to the rule of each header.
        // We'll assume a single header and compare them string to string...
        if (!intersection.every(key => a.headers[key].length && b.headers[key].length && a.headers[key][0] === b.headers[key][0])) {
            return false;
        }
    }
    return true;
}


/***/ }),

/***/ "./package.json":
/*!**********************!*\
  !*** ./package.json ***!
  \**********************/
/***/ ((module) => {

module.exports = JSON.parse('{"name":"ringcentral-web-phone","version":"1.0.0-beta1","scripts":{"test":"jest","test:coverage":"cat .coverage/lcov.info | coveralls -v","build":"yarn tsc && webpack --progress --color","serve":"webpack serve --progress --color","lint":"gts fix","prepare":"husky install"},"dependencies":{"sip.js":"0.21.2"},"devDependencies":{"@faker-js/faker":"7.6.0","@ringcentral/sdk":"4.7.3","@types/jest":"29.2.3","@types/jest-environment-puppeteer":"5.0.3","@types/node":"18.11.9","buffer":"6.0.3","cache-loader":"4.1.0","copy-webpack-plugin":"11.0.0","coveralls":"3.1.1","crypto-browserify":"3.12.0","dotenv-override-true":"6.2.2","gts":"3.1.1","html-webpack-plugin":"5.5.0","husky":"8.0.2","istanbul-instrumenter-loader":"3.0.1","jest":"29.3.1","jest-puppeteer":"6.1.1","jquery":"3.6.1","puppeteer":"19.3.0","querystring-es3":"0.2.1","stream-browserify":"3.0.0","ts-jest":"29.0.3","ts-loader":"9.4.1","ts-node":"10.9.1","typescript":"4.9.3","wait-for-async":"0.6.0","webpack":"5.75.0","webpack-cli":"5.0.0","webpack-dev-server":"4.11.1","yarn-upgrade-all":"0.7.1"},"preferGlobal":false,"main":"./lib/index.js","types":"./lib/index.d.ts","author":{"name":"RingCentral, Inc.","email":"devsupport@ringcentral.com"},"contributors":[{"name":"Kirill Konshin"},{"name":"Elias Sun"},{"name":"Vyshakh Babji"},{"name":"Yatin Gera"},{"name":"Tyler Liu"},{"name":"Embbnux Ji"}],"repository":{"type":"git","url":"git://github.com/ringcentral/ringcentral-web-phone.git"},"bugs":{"url":"https://github.com/ringcentral/ringcentral-web-phone/issues"},"homepage":"https://github.com/ringcentral/ringcentral-web-phone","engines":{"node":">=14"},"license":"MIT"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	__webpack_exports__ = __webpack_exports__["default"];
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=ringcentral-web-phone.js.map