import EventEmitter from '../event-emitter';
import { RequestMessage, type InboundMessage, ResponseMessage } from '../sip-message';
import type WebPhone from '../web-phone';
import { branch, extractAddress } from '../utils';

abstract class CallSession extends EventEmitter {
  public softphone: WebPhone;
  public sipMessage: InboundMessage;
  public localPeer: string;
  public remotePeer: string;
  public rtcPeerConnection: RTCPeerConnection;
  public mediaStream: MediaStream;
  public audioElement: HTMLAudioElement;

  public constructor(softphone: WebPhone) {
    super();
    this.softphone = softphone;
  }

  public get callId() {
    return this.sipMessage.headers['Call-Id'];
  }

  public async init() {
    this.rtcPeerConnection = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });
    this.mediaStream = await navigator.mediaDevices.getUserMedia({
      video: false,
      audio: true,
    });
    this.mediaStream.getTracks().forEach((track) => this.rtcPeerConnection.addTrack(track, this.mediaStream));
    this.rtcPeerConnection.ontrack = (event) => {
      const remoteStream = event.streams[0];
      this.audioElement = document.createElement('audio') as HTMLAudioElement;
      this.audioElement.autoplay = true;
      this.audioElement.hidden = true;
      document.body.appendChild(this.audioElement);
      this.audioElement.srcObject = remoteStream;
    };
  }

  public async transfer(target: string) {
    const requestMessage = new RequestMessage(`REFER sip:${extractAddress(this.remotePeer)} SIP/2.0`, {
      'Call-Id': this.callId,
      From: this.localPeer,
      To: this.remotePeer,
      Via: `SIP/2.0/WSS ${this.softphone.fakeDomain};branch=${branch()}`,
      'Refer-To': `sip:${target}@sip.ringcentral.com`,
      'Referred-By': `<${extractAddress(this.localPeer)}>`,
    });
    this.softphone.send(requestMessage);
    // reply to those NOTIFY messages
    const notifyHandler = (inboundMessage: InboundMessage) => {
      if (!inboundMessage.subject.startsWith('NOTIFY ')) {
        return;
      }
      const responseMessage = new ResponseMessage(inboundMessage, 200);
      this.softphone.send(responseMessage);
      if (inboundMessage.body.endsWith('SIP/2.0 200 OK')) {
        this.softphone.off('message', notifyHandler);
      }
    };
    this.softphone.on('message', notifyHandler);
  }

  public async hangup() {
    const requestMessage = new RequestMessage(`BYE sip:${this.softphone.sipInfo.domain} SIP/2.0`, {
      'Call-Id': this.callId,
      From: this.localPeer,
      To: this.remotePeer,
      Via: `SIP/2.0/WSS ${this.softphone.fakeDomain};branch=${branch()}`,
    });
    this.softphone.send(requestMessage);
  }

  protected dispose() {
    this.rtcPeerConnection.close();
    this.audioElement.remove();
    this.mediaStream.getTracks().forEach((track) => track.stop());
    this.emit('disposed');
  }
}

export default CallSession;
