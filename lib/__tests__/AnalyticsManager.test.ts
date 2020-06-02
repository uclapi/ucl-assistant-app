/**
 * @jest-environment jsdom
 */

import {
  logEvent,
  logEventWithProperties,
  setUserId,
  setUserProperties,
} from 'expo-analytics-amplitude'

import configureStore from "../../configureStore"
import { AnalyticsManager } from '../AnalyticsManager'

const { store } = configureStore

jest.mock(`expo-analytics-amplitude`, () => ({
  __esModule: true,
  logEvent: jest.fn(),
  logEventWithProperties: jest.fn(),
  setUserId: jest.fn(),
  setUserProperties: jest.fn(),
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
    expect(setUserId).toHaveBeenCalledTimes(1)
    expect(setUserId).toHaveBeenCalledWith(USER_ID)

    AnalyticsManager.setUserProperties(USER_PROPERTIES)
    expect(setUserProperties).toHaveBeenCalledTimes(1)
    expect(setUserProperties).toHaveBeenCalledWith(USER_PROPERTIES)

    AnalyticsManager.logEvent(EVENT)
    expect(logEvent).toHaveBeenCalledTimes(1)
    expect(logEvent).toHaveBeenCalledWith(EVENT)

    AnalyticsManager.logEvent(EVENT, EVENT_PROPERTIES)
    expect(logEventWithProperties).toHaveBeenCalledTimes(1)
    expect(logEventWithProperties).toHaveBeenCalledWith(
      EVENT,
      EVENT_PROPERTIES,
    )

    AnalyticsManager.logScreenView(SCREEN_NAME)
    expect(logEvent).toHaveBeenCalledTimes(2)
    expect(logEvent).toHaveBeenCalledWith(`VIEW_SCREEN_${SCREEN_NAME}`)
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
    expect(setUserId).toHaveBeenCalledTimes(0)

    AnalyticsManager.setUserProperties(USER_PROPERTIES)
    expect(setUserProperties).toHaveBeenCalledTimes(0)

    AnalyticsManager.logEvent(EVENT)
    expect(logEvent).toHaveBeenCalledTimes(0)

    AnalyticsManager.logEvent(EVENT, EVENT_PROPERTIES)
    expect(logEventWithProperties).toHaveBeenCalledTimes(0)

    AnalyticsManager.logScreenView(SCREEN_NAME)
    expect(logEvent).toHaveBeenCalledTimes(0)
  })
})
