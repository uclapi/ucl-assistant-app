import { cleanup, fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import { NotificationsScreen } from ".."
import { waitForEventLoop } from '../../../jest/test-utils'
import { PushNotificationsManager } from '../../../lib'

describe(`NotificationsScreen`, () => {
  let wrapper
  const mockProps = {
    declinePushNotifications: jest.fn(),
    navigation: { dispatch: jest.fn() } as any,
    setExpoPushToken: jest.fn(),
    token: `abc123`,
  }

  const mockRegisterForPushNotifications = jest.fn(
    () => Promise.resolve(),
  ) as jest.Mock
  PushNotificationsManager.registerForPushNotifications = (
    mockRegisterForPushNotifications
  )

  beforeAll(() => {
    jest.useRealTimers()
  })

  beforeEach(() => {
    jest.clearAllMocks()
    wrapper = render(<NotificationsScreen {...mockProps} />)
  })

  afterEach(() => {
    cleanup()
  })

  it(`renders the NotificationsScreen`, () => {
    expect(wrapper).toMatchSnapshot()
  })

  it(`registers when enable notifications is pressed`, async () => {
    const { getByText } = wrapper
    fireEvent.press(getByText(/Enable Notifications/i))
    await waitForEventLoop()

    expect(mockRegisterForPushNotifications).toHaveBeenCalledTimes(1)
    expect(mockRegisterForPushNotifications).toHaveBeenCalledWith(
      mockProps.token,
    )
    expect(mockProps.setExpoPushToken).toHaveBeenCalledTimes(1)

    expect(mockProps.navigation.dispatch).toHaveBeenCalledTimes(1)
  })

  it(`does not register when the skip button is pressed`, async () => {
    const { getByText } = wrapper
    fireEvent.press(getByText(/Skip/i))
    await waitForEventLoop()

    expect(
      mockRegisterForPushNotifications,
    ).toHaveBeenCalledTimes(0) // i.e. not be called again
    expect(mockProps.navigation.dispatch).toHaveBeenCalledTimes(1)
    expect(mockProps.navigation.dispatch.mock.calls).toMatchSnapshot()
  })
})
