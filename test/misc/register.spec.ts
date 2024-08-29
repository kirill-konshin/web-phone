import { expect } from '@playwright/test';

import { testOnePage } from '../common';

testOnePage('register', async ({ pageResource }) => {
  const { page, messages } = pageResource;
  await page.evaluate(async () => {
    await window.webPhone.register();
  });
  expect(messages).toHaveLength(2); // because we just registered in the setup code
  expect(messages.map((m) => m.subject)).toEqual(['REGISTER sip:sip.ringcentral.com SIP/2.0', 'SIP/2.0 200 OK']);
  expect(messages.map((m) => m.direction)).toEqual(['outbound', 'inbound']);
  expect(messages[0].headers.Contact.endsWith(';expires=60')).toBeTruthy();
});