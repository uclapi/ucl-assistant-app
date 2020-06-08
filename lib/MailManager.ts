import * as MailComposer from "expo-mail-composer"
import { MailComposerOptions, MailComposerResult } from "expo-mail-composer"
import { Alert, Platform } from "react-native"

import ClipboardManager from './ClipboardManager'
import DeviceManager from './DeviceManager'

const composeAsync = async (
  options: MailComposerOptions,
): Promise<MailComposerResult | void> => {
  if (!DeviceManager.isRealDevice()) {
    console.warn(`Mail services cannot be used in a simulator`)
    return Promise.resolve()
  }
  try {
    return await MailComposer.composeAsync(options)
  } catch (error) {
    if (Platform.OS === `ios`) {
      // most likely
      Alert.alert(
        `Oops`,
        `Looks like you might not be signed into the Mail app.`
        + `The email address has been copied to your clipboard instead`,
      )
      ClipboardManager.setString([
        ...options.recipients,
        ...options.ccRecipients,
        ...options.bccRecipients,
      ].join(`, `))
      return Promise.resolve()
    }
    return Promise.reject(error)
  }
}

export type MailManagerComposeAsyncReturnType = ReturnType<typeof composeAsync>

export default {
  composeAsync,
}
