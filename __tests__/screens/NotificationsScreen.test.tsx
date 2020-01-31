/**
 * @jest-environment jsdom
 */
import "react-native"

import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import { PushNotificationsManager } from '../../lib'
import { NotificationsScreen } from "../../screens/NotificationsScreen"


Enzyme.configure({ adapter: new Adapter() })

describe(`NotificationsScreen`, () => {
  let wrapper
  const mockDispatch = jest.fn()
  const mockProps = {
    navigation: { dispatch: mockDispatch },
    token: `abc123`,
  }

  const mockRegisterForPushNotifications = jest.fn(() => Promise.resolve())
  PushNotificationsManager.registerForPushNotifications = (
    mockRegisterForPushNotifications
  )

  beforeEach(() => {
    wrapper = shallow(<NotificationsScreen {...mockProps} />)
  })

  it(`renders the NotificationsScreen`, () => {
    expect(wrapper).toMatchSnapshot()
  })

  it(
    `registers for notifications when onEnableNotifications runs`,
    async () => {
      await wrapper.instance().onEnableNotifications()

      expect(mockRegisterForPushNotifications).toHaveBeenCalledTimes(1)
      expect(mockRegisterForPushNotifications).toHaveBeenCalledWith(
        mockProps.token,
      )

      expect(mockDispatch).toHaveBeenCalledTimes(1)
    },
  )

  it(`does not register for notifications when onSkip runs`, async () => {
    await wrapper.instance().onSkip()

    expect(
      mockRegisterForPushNotifications,
    ).toHaveBeenCalledTimes(1) // i.e. not be called again
    expect(mockDispatch).toHaveBeenCalledTimes(2) // i.e. once more
  })
})
