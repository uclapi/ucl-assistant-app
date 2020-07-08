import {
  composeAsync,
  MailComposerOptions,
} from 'expo-mail-composer'

import MailManager from '../MailManager'

jest.mock(`expo-mail-composer`, () => ({
  __esModule: true,
  composeAsync: jest.fn(),
}))

describe(`MailManager`, () => {
  const options: MailComposerOptions = {
    bccRecipients: [
      `guillermo@helsing.ro`,
    ],
    body: `Dear adgjkfsfdaa...`,
    ccRecipients: [
      `colin@robinson.me`,
    ],
    isHtml: false,
    recipients: [
      `nandor@aol.com`,
      `laszlo@yahoo.co.uk`,
      `nadja@hotmail.com`,
    ],
    subject: `A Very Human Email`,
  }

  beforeAll(() => {
    jest.useRealTimers()
  })

  it(`composes mail without issue`, async () => {
    await MailManager.composeAsync(options)
    expect(composeAsync).toHaveBeenCalledTimes(1)
    expect(composeAsync).toHaveBeenCalledWith(options)
  })
})
