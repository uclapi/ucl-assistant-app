import * as Amplitude from 'expo-analytics-amplitude'
import Constants from 'expo-constants'

const AMPLITUDE_API_KEY = Constants.manifest.extra
  && Constants.manifest.extra.amplitude
  && Constants.manifest.extra.amplitude.apiKey
  ? Constants.manifest.extra.amplitude.apiKey
  : null

const initialise = () => Amplitude.initialize(AMPLITUDE_API_KEY)

const setUserId = (userId) => {
  // make sure this is unique
  if (userId) {
    Amplitude.setUserId(userId)
  }
}

const setUserProperties = ({ ...userProperties }) => {
  Amplitude.setUserProperties({ ...userProperties })
}

const clearUserProperties = () => {
  Amplitude.clearUserProperties()
}

const logEvent = (eventName, eventProperties) => {
  if (eventProperties) {
    Amplitude.logEventWithProperties(eventName, eventProperties)
  } else {
    Amplitude.logEvent(eventName)
  }
}

const logScreenView = (screenName) => logEvent(`VIEW_SCREEN_${screenName}`)

const events = {
  NOTIFICATIONS_ENABLE: `NOTIFICATIONS_ENABLE`,
  NOTIFICATIONS_SKIP: `NOTIFICATIONS_SKIP`,
  PUSH_NOTIFICATIONS_REGISTER: `PUSH_NOTIFICATIONS_REGISTER`,
  SETTINGS_GIVE_FEEDBACK: `SETTINGS_GIVE_FEEDBACK`,
  SETTINGS_RATE_APP: `SETTINGS_RATE_APP`,
  SETTINGS_VIEW_FAQS: `SETTINGS_VIEW_FAQS`,
}

const AnalyticsManager = {
  clearUserProperties,
  events,
  initialise,
  logEvent,
  logScreenView,
  setUserId,
  setUserProperties,
}

export default (AMPLITUDE_API_KEY && !__DEV__)
  ? AnalyticsManager
  : (
    new Proxy({}, {
      get() {
        return () => { } // do nothing in development mode
      },
    })
  )
