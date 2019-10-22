import Constants from 'expo-constants'
import * as Sentry from "sentry-expo"

const initialise = () => {
  if (!__DEV__) {
    const { extra: { sentry: { dsn } = {} } = {} } = Constants.manifest
    Sentry.init({
      dsn,
    })

    const { revisionId } = Constants.manifest
    if (typeof revisionId === `string` && revisionId.length > 0) {
      Sentry.setRelease(Constants.manifest.revisionId)
    }
  }
}

const captureError = (error) => {
  if (!__DEV__) {
    Sentry.captureException(error)
  } else {
    console.error(error)
  }
}

export default {
  captureError,
  initialise,
}
