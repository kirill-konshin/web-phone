import React from 'react';
import { auto } from 'manate/react';

import type CallSession from '../call-session';
import type InboundCallSession from '../call-session/inbound';
import type OutboundCallSession from '../call-session/outbound';

const Session = (props: { callSession: CallSession }) => {
  const { callSession } = props;
  const render = () =>
    callSession.direction === 'inbound' ? (
      <InboundSession session={callSession as InboundCallSession} />
    ) : (
      <OutboundSession session={callSession as OutboundCallSession} />
    );
  return auto(render, props);
};

const InboundSession = (props: { session: InboundCallSession }) => {
  const { session } = props;
  const render = () => (
    <div>
      <div>{session.direction}</div>
    </div>
  );
  return auto(render, props);
};

const OutboundSession = (props: { session: OutboundCallSession }) => {
  const { session } = props;
  const render = () => (
    <div>
      <div>{session.direction}</div>
    </div>
  );
  return auto(render, props);
};

export default Session;
