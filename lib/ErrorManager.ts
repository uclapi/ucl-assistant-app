import Constants from 'expo-constants'
import * as Sentry from "sentry-expo"

const initialise = (): void => {
  if (!__DEV__) {
    const { extra: { sentry: { dsn = `` } = {} } = {}, revisionId } = Constants.manifest
    Sentry.init({
      dsn,
      ...(typeof revisionId === `string` && revisionId.length > 0
        ? { release: revisionId }
        : {}),
    })
  }
}

const addDetail = (details: any): void => {
  if (!__DEV__) {
    Sentry.Native.addBreadcrumb({
      ...details,
    })
  } else {
    console.info(`ErrorManager.addDetail`, details)
  }
}

const captureError = (error: Error, details?: any): void => {
  if (!__DEV__) {
    if (details) {
      Sentry.Native.withScope((scope) => {
        if (typeof details === `object`) {
          Object.entries(details).forEach(([attr, val]) => {
            scope.setExtra(attr, val)
          })
        } else {
          scope.setExtra(`details`, details)
        }
        Sentry.Native.captureException(error)
      })
    } else {
      Sentry.Native.captureException(error)
    }
  } else {
    console.error(`ErrorManager.captureError`, error, details)
  }
}

const setUser = (user): void => {
  if (!__DEV__ && user) {
    Sentry.Native.setUser(user)
  }
}

export default {
  addDetail,
  captureError,
  initialise,
  setUser,
}
