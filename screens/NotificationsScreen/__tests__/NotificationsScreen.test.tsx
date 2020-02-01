/**
 * @jest-environment jsdom
 */
import "react-native"

import React from 'react'
import { cleanup, fireEvent, render } from 'react-native-testing-library'

import { NotificationsScreen } from ".."
import { PushNotificationsManager } from '../../../lib'

describe(`NotificationsScreen`, () => {
  let wrapper
  const mockDispatch = jest.fn()
  const mockProps = {
    navigation: { dispatch: mockDispatch },
    token: `abc123`,
  }

  const mockRegisterForPushNotifications = jest.fn(
    () => Promise.resolve(),
  ) as jest.Mock
  PushNotificationsManager.registerForPushNotifications = (
    mockRegisterForPushNotifications
  )

  beforeEach(() => {
    jest.clearAllMocks()
    wrapper = render(<NotificationsScreen {...mockProps} />)
  })

  afterEach(() => {
    cleanup()
  })

  it(`renders the NotificationsScreen`, () => {
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  it(`registers when enable notifications is pressed`, async () => {
    const { getByTestId } = wrapper
    fireEvent.press(getByTestId(`enable-notifications-button`))
    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(mockRegisterForPushNotifications).toHaveBeenCalledTimes(1)
    expect(mockRegisterForPushNotifications).toHaveBeenCalledWith(
      mockProps.token,
    )

    expect(mockDispatch).toHaveBeenCalledTimes(1)
  })

  it(`does not register when the skip button is pressed`, async () => {
    const { getByTestId } = wrapper
    fireEvent.press(getByTestId(`skip-notifications-button`))
    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(
      mockRegisterForPushNotifications,
    ).toHaveBeenCalledTimes(0) // i.e. not be called again
    expect(mockDispatch).toHaveBeenCalledTimes(1)
    expect(mockDispatch.mock.calls).toMatchSnapshot()
  })
})
