/**
 * @jest-environment jsdom
 */

import {
  logEventAsync,
  logEventWithPropertiesAsync,
  setUserIdAsync,
  setUserPropertiesAsync,
} from 'expo-analytics-amplitude'

import configureStore from "../../configureStore"
import { AnalyticsManager } from '../AnalyticsManager'

const { store } = configureStore

jest.mock(`expo-analytics-amplitude`, () => ({
  __esModule: true,
  logEventAsync: jest.fn(),
  logEventWithPropertiesAsync: jest.fn(),
  setUserIdAsync: jest.fn(),
  setUserPropertiesAsync: jest.fn(),
}))

interface Global {
  __DEV__: boolean,
}

declare const global: Global

describe(`AnalyticsManager`, () => {
  const USER_ID = `upiupi`
  const USER_PROPERTIES = {
    isAwesome: 1,
  }
  const EVENT = `RATE_APP`
  const EVENT_PROPERTIES = { stars: 5 }
  const SCREEN_NAME = `START_SCREEN`

  global.__DEV__ = false

  afterEach(() => {
    jest.clearAllMocks()
  })

  it(`tracks user when shouldTrackAnalytics is true`, () => {
    const mockGetState = jest.fn(() => ({
      user: {
        settings: {
          shouldTrackAnalytics: true,
        },
      },
    }))
    store.getState = mockGetState

    AnalyticsManager.setUserId(USER_ID)
    expect(setUserIdAsync).toHaveBeenCalledTimes(1)
    expect(setUserIdAsync).toHaveBeenCalledWith(USER_ID)

    AnalyticsManager.setUserProperties(USER_PROPERTIES)
    expect(setUserPropertiesAsync).toHaveBeenCalledTimes(1)
    expect(setUserPropertiesAsync).toHaveBeenCalledWith(USER_PROPERTIES)

    AnalyticsManager.logEvent(EVENT)
    expect(logEventAsync).toHaveBeenCalledTimes(1)
    expect(logEventAsync).toHaveBeenCalledWith(EVENT)

    AnalyticsManager.logEvent(EVENT, EVENT_PROPERTIES)
    expect(logEventWithPropertiesAsync).toHaveBeenCalledTimes(1)
    expect(logEventWithPropertiesAsync).toHaveBeenCalledWith(
      EVENT,
      EVENT_PROPERTIES,
    )

    AnalyticsManager.logScreenView(SCREEN_NAME)
    expect(logEventAsync).toHaveBeenCalledTimes(2)
    expect(logEventAsync).toHaveBeenCalledWith(`VIEW_SCREEN_${SCREEN_NAME}`)
  })

  it(`does not track user when shouldTrackAnalytics is false`, () => {
    const mockGetState = jest.fn(() => ({
      user: {
        settings: {
          shouldTrackAnalytics: false,
        },
      },
    }))
    store.getState = mockGetState

    AnalyticsManager.setUserId(USER_ID)
    expect(setUserIdAsync).toHaveBeenCalledTimes(0)

    AnalyticsManager.setUserProperties(USER_PROPERTIES)
    expect(setUserPropertiesAsync).toHaveBeenCalledTimes(0)

    AnalyticsManager.logEvent(EVENT)
    expect(logEventAsync).toHaveBeenCalledTimes(0)

    AnalyticsManager.logEvent(EVENT, EVENT_PROPERTIES)
    expect(logEventWithPropertiesAsync).toHaveBeenCalledTimes(0)

    AnalyticsManager.logScreenView(SCREEN_NAME)
    expect(logEventAsync).toHaveBeenCalledTimes(0)
  })
})
