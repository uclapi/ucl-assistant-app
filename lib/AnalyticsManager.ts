import * as Amplitude from 'expo-analytics-amplitude'
import Constants from 'expo-constants'

import configureStore from "../configureStore"

const { store } = configureStore

const AMPLITUDE_API_KEY = Constants.manifest.extra
  && Constants.manifest.extra.amplitude
  && Constants.manifest.extra.amplitude.apiKey
  ? Constants.manifest.extra.amplitude.apiKey
  : null

const initialise = (): Promise<void> => Amplitude.initialize(AMPLITUDE_API_KEY)

const shouldTrackAnalytics = (): boolean => (
  AMPLITUDE_API_KEY && !__DEV__ && store.getState().user.settings.shouldTrackAnalytics
)

const setUserId = (userId): void => {
  if (!shouldTrackAnalytics()) { return }

  // make sure this is unique
  if (userId) {
    Amplitude.setUserId(userId)
  }
}

const setUserProperties = ({ ...userProperties }): void => {
  if (!shouldTrackAnalytics()) { return }

  Amplitude.setUserProperties({ ...userProperties })
}

const clearUserProperties = (): void => {
  Amplitude.clearUserProperties()
}

const logEvent = (eventName: string, eventProperties?): void => {
  if (!shouldTrackAnalytics()) { return }

  if (eventProperties) {
    Amplitude.logEventWithProperties(eventName, eventProperties)
  } else {
    Amplitude.logEvent(eventName)
  }
}

const logScreenView = (screenName: string): void => {
  if (!shouldTrackAnalytics()) { return }

  logEvent(`VIEW_SCREEN_${screenName}`)
}

const events = {
  NOTIFICATIONS_ENABLE: `NOTIFICATIONS_ENABLE`,
  NOTIFICATIONS_SKIP: `NOTIFICATIONS_SKIP`,
  PUSH_NOTIFICATIONS_REGISTER: `PUSH_NOTIFICATIONS_REGISTER`,
  SETTINGS_GIVE_FEEDBACK: `SETTINGS_GIVE_FEEDBACK`,
  SETTINGS_RATE_APP: `SETTINGS_RATE_APP`,
  SETTINGS_VIEW_FAQS: `SETTINGS_VIEW_FAQS`,
}

export const AnalyticsManager = {
  clearUserProperties,
  events,
  initialise,
  logEvent,
  logScreenView,
  setUserId,
  setUserProperties,
}

export default AnalyticsManager
