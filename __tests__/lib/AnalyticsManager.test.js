/**
 * @jest-environment jsdom
 */
import * as Amplitude from 'expo-analytics-amplitude'

import configureStore from "../../configureStore"
import { AnalyticsManager } from '../../lib/AnalyticsManager'

const { store } = configureStore

describe(`AnalyticsManager`, () => {
  const mockSetUserId = jest.fn()
  const mockSetUserProperties = jest.fn()
  const mockLogEvent = jest.fn()
  const mockLogEventWithProperties = jest.fn()

  Amplitude.setUserId = mockSetUserId
  Amplitude.setUserProperties = mockSetUserProperties
  Amplitude.logEvent = mockLogEvent
  Amplitude.logEventWithProperties = mockLogEventWithProperties

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
    expect(mockSetUserId).toHaveBeenCalledTimes(1)
    expect(mockSetUserId).toHaveBeenCalledWith(USER_ID)

    AnalyticsManager.setUserProperties(USER_PROPERTIES)
    expect(mockSetUserProperties).toHaveBeenCalledTimes(1)
    expect(mockSetUserProperties).toHaveBeenCalledWith(USER_PROPERTIES)

    AnalyticsManager.logEvent(EVENT)
    expect(mockLogEvent).toHaveBeenCalledTimes(1)
    expect(mockLogEvent).toHaveBeenCalledWith(EVENT)

    AnalyticsManager.logEvent(EVENT, EVENT_PROPERTIES)
    expect(mockLogEventWithProperties).toHaveBeenCalledTimes(1)
    expect(mockLogEventWithProperties).toHaveBeenCalledWith(
      EVENT,
      EVENT_PROPERTIES,
    )

    AnalyticsManager.logScreenView(SCREEN_NAME)
    expect(mockLogEvent).toHaveBeenCalledTimes(2)
    expect(mockLogEvent).toHaveBeenCalledWith(`VIEW_SCREEN_${SCREEN_NAME}`)
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
    expect(mockSetUserId).toHaveBeenCalledTimes(0)

    AnalyticsManager.setUserProperties(USER_PROPERTIES)
    expect(mockSetUserProperties).toHaveBeenCalledTimes(0)

    AnalyticsManager.logEvent(EVENT)
    expect(mockLogEvent).toHaveBeenCalledTimes(0)

    AnalyticsManager.logEvent(EVENT, EVENT_PROPERTIES)
    expect(mockLogEventWithProperties).toHaveBeenCalledTimes(0)

    AnalyticsManager.logScreenView(SCREEN_NAME)
    expect(mockLogEvent).toHaveBeenCalledTimes(0)
  })
})
