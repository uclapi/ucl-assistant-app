/**
 * @jest-environment jsdom
 */
import * as Amplitude from 'expo-analytics-amplitude'

import configureStore from "../../configureStore"
import { AnalyticsManager } from '../AnalyticsManager'

const { store } = configureStore

jest.mock(`expo-analytics-amplitude`)

describe(`AnalyticsManager`, () => {
  // const mockSetUserId = jest.fn()
  // const mockSetUserProperties = jest.fn()
  // const mockLogEvent = jest.fn()
  // const mockLogEventWithProperties = jest.fn()

  // Amplitude.setUserId = mockSetUserId
  // Amplitude.setUserProperties = mockSetUserProperties
  // Amplitude.logEvent = mockLogEvent
  // Amplitude.logEventWithProperties = mockLogEventWithProperties

  const USER_ID = `upiupi`
  const USER_PROPERTIES = {
    isAwesome: 1,
  }
  const EVENT = `RATE_APP`
  const EVENT_PROPERTIES = { stars: 5 }
  const SCREEN_NAME = `START_SCREEN`

  it(`tracks user when shouldTrackAnalytics is true`, () => {
    jest.clearAllMocks()

    const mockGetState = jest.fn(() => ({
      user: {
        settings: {
          shouldTrackAnalytics: true,
        },
      },
    }))
    store.getState = mockGetState

    AnalyticsManager.setUserId(USER_ID)
    expect(Amplitude.setUserId).toHaveBeenCalledTimes(1)
    expect(Amplitude.setUserId).toHaveBeenCalledWith(USER_ID)

    AnalyticsManager.setUserProperties(USER_PROPERTIES)
    expect(Amplitude.setUserProperties).toHaveBeenCalledTimes(1)
    expect(Amplitude.setUserProperties).toHaveBeenCalledWith(USER_PROPERTIES)

    AnalyticsManager.logEvent(EVENT)
    expect(Amplitude.logEvent).toHaveBeenCalledTimes(1)
    expect(Amplitude.logEvent).toHaveBeenCalledWith(EVENT)

    AnalyticsManager.logEvent(EVENT, EVENT_PROPERTIES)
    expect(Amplitude.logEventWithProperties).toHaveBeenCalledTimes(1)
    expect(Amplitude.logEventWithProperties).toHaveBeenCalledWith(
      EVENT,
      EVENT_PROPERTIES,
    )

    AnalyticsManager.logScreenView(SCREEN_NAME)
    expect(Amplitude.logEvent).toHaveBeenCalledTimes(2)
    expect(Amplitude.logEvent).toHaveBeenCalledWith(`VIEW_SCREEN_${SCREEN_NAME}`)
  })

  it(`does not track user when shouldTrackAnalytics is false`, () => {
    jest.clearAllMocks()

    const mockGetState = jest.fn(() => ({
      user: {
        settings: {
          shouldTrackAnalytics: false,
        },
      },
    }))
    store.getState = mockGetState

    AnalyticsManager.setUserId(USER_ID)
    expect(Amplitude.setUserId).toHaveBeenCalledTimes(0)

    AnalyticsManager.setUserProperties(USER_PROPERTIES)
    expect(Amplitude.setUserProperties).toHaveBeenCalledTimes(0)

    AnalyticsManager.logEvent(EVENT)
    expect(Amplitude.logEvent).toHaveBeenCalledTimes(0)

    AnalyticsManager.logEvent(EVENT, EVENT_PROPERTIES)
    expect(Amplitude.logEventWithProperties).toHaveBeenCalledTimes(0)

    AnalyticsManager.logScreenView(SCREEN_NAME)
    expect(Amplitude.logEvent).toHaveBeenCalledTimes(0)
  })
})
