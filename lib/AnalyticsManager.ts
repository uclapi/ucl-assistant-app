import * as Amplitude from 'expo-analytics-amplitude'
import Constants from 'expo-constants'

import configureStore from "../configureStore"

const { store } = configureStore

const AMPLITUDE_API_KEY = Constants.manifest.extra
  && Constants.manifest.extra.amplitude
  && Constants.manifest.extra.amplitude.apiKey
  ? Constants.manifest.extra.amplitude.apiKey
  : null

const initialise = (): Promise<void> => Amplitude.initializeAsync(AMPLITUDE_API_KEY)

const shouldTrackAnalytics = (): boolean => (
  AMPLITUDE_API_KEY
  && !__DEV__
  && store.getState().user.settings.shouldTrackAnalytics
)

const setUserId = (userId): void => {
  if (!shouldTrackAnalytics()) { return }

  // make sure this is unique
  if (userId) {
    Amplitude.setUserIdAsync(userId)
  }
}

const setUserProperties = ({ ...userProperties }): void => {
  if (!shouldTrackAnalytics()) { return }

  Amplitude.setUserPropertiesAsync({ ...userProperties })
}

const clearUserProperties = (): void => {
  Amplitude.clearUserPropertiesAsync()
}

const logEvent = (eventName: string, eventProperties?: unknown): void => {
  if (!shouldTrackAnalytics()) { return }

  if (eventProperties) {
    Amplitude.logEventWithPropertiesAsync(eventName, eventProperties)
  } else {
    Amplitude.logEventAsync(eventName)
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
