/**
 * @jest-environment jsdom
 */
import * as Sentry from "sentry-expo"

import ErrorManager from '../../lib/ErrorManager'

jest.mock(`sentry-expo`)

const SAMPLE_USER = {
  email: `bokonon@lorenzo.com`,
}
const SAMPLE_DETAILS = {
  next: `nice, nice, very nice`,
  status: `busy, busy, busy`,
}
const SAMPLE_ERROR = new Error(`HTTP 418`)

describe(`ErrorManager`, () => {
  const mockConsoleError = jest.fn()

  beforeEach(() => {
    console.error = mockConsoleError
  })

  afterEach(() => {
    jest.clearAllMocks()
  })


  it(`does not initialise Sentry in development mode`, () => {
    // eslint-disable-next-line no-underscore-dangle
    global.__DEV__ = true

    ErrorManager.initialise()
    expect(Sentry.init).toHaveBeenCalledTimes(0)
    expect(Sentry.setRelease).toHaveBeenCalledTimes(0)
  })

  it(`initialises Sentry in production mode`, () => {
    // eslint-disable-next-line no-underscore-dangle
    global.__DEV__ = false

    ErrorManager.initialise()
    expect(Sentry.init).toHaveBeenCalledTimes(1)
  })

  it(`does not set user in development mode`, () => {
    // eslint-disable-next-line no-underscore-dangle
    global.__DEV__ = true

    ErrorManager.setUser(SAMPLE_USER)
    expect(Sentry.setUser).toHaveBeenCalledTimes(0)
  })

  it(`sets user in production`, () => {
    // eslint-disable-next-line no-underscore-dangle
    global.__DEV__ = false

    ErrorManager.setUser(SAMPLE_USER)
    expect(Sentry.setUser).toHaveBeenCalledTimes(1)
    expect(Sentry.setUser).toHaveBeenCalledWith(SAMPLE_USER)
  })

  it(`does not capture errors in development mode`, () => {
    // eslint-disable-next-line no-underscore-dangle
    global.__DEV__ = true

    ErrorManager.captureError(SAMPLE_ERROR)
    expect(Sentry.captureException).toHaveBeenCalledTimes(0)
    expect(mockConsoleError).toHaveBeenCalledTimes(1)
  })

  it(`captures errors in prodution`, () => {
    // eslint-disable-next-line no-underscore-dangle
    global.__DEV__ = false

    ErrorManager.captureError(SAMPLE_ERROR)
    expect(Sentry.captureException).toHaveBeenCalledTimes(1)
    expect(Sentry.captureException).toHaveBeenCalledWith(SAMPLE_ERROR)
  })

  it(`captures extra details from errors`, () => {
    // eslint-disable-next-line no-underscore-dangle
    global.__DEV__ = false

    ErrorManager.captureError(SAMPLE_ERROR, SAMPLE_DETAILS)

    const callback = Sentry.withScope.mock.calls[0][0]
    const scope = { setExtra: jest.fn() }
    callback(scope)

    expect(Sentry.captureException).toHaveBeenCalledTimes(1)
    expect(Sentry.captureException).toHaveBeenCalledWith(SAMPLE_ERROR)
    expect(scope.setExtra).toHaveBeenCalledTimes(
      Object.entries(SAMPLE_DETAILS).length,
    )
    expect(scope.setExtra.mock.calls).toEqual(Object.entries(SAMPLE_DETAILS))
  })
})
