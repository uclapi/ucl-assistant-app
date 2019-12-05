/**
 * @jest-environment jsdom
 */
import "react-native"

import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import { MailManager, WebBrowserManager } from '../../lib'
import { SettingsScreen } from "../../screens/SettingsScreen"

const {
  repository: {
    url: githubURL,
  },
} = require(`../../package.json`)

Enzyme.configure({ adapter: new Adapter() })

describe(`SettingsScreen`, () => {
  let wrapper
  const mockSignOut = jest.fn()
  const mockNavigate = jest.fn()
  const mockSetShouldTrackAnalytics = jest.fn()
  const mockProps = {
    navigation: {
      navigate: mockNavigate,
    },
    setShouldTrackAnalytics: mockSetShouldTrackAnalytics,
    signOut: mockSignOut,
    user: {
      fullName: `Jeremy Bentham`,
      settings: {
        shouldTrackAnalytics: false,
      },
      token: `abc123`,
      upi: `upiupi11`,
    },
  }

  const mockOpenLink = jest.fn(() => Promise.resolve())
  WebBrowserManager.openLink = mockOpenLink

  const mockComposeAsync = jest.fn(() => Promise.resolve())
  MailManager.composeAsync = mockComposeAsync

  beforeEach(() => {
    wrapper = shallow(<SettingsScreen {...mockProps} />)
  })

  it(`renders the SettingsScreen`, () => {
    expect(wrapper).toMatchSnapshot()
  })

  it(`logs out when the signOut button is pressed`, async () => {
    const signOutButton = wrapper.findWhere(
      (node) => node.prop(`testID`) === `signOutButton`,
    )
    expect(signOutButton.exists())
    signOutButton.props().onPress()

    expect(mockSignOut).toHaveBeenCalledTimes(1)
  })

  it(`opens Github repository when Github button is pressed`, async () => {
    const githubButton = wrapper.findWhere(
      (node) => node.prop(`testID`) === `githubButton`,
    )
    expect(githubButton.exists())
    expect(githubButton.prop(`href`) === githubURL)
  })

  it(`opens FAQ page when the FAQ button is pressed`, async () => {
    const faqButton = wrapper.findWhere(
      (node) => node.prop(`testID`) === `faqButton`,
    )
    expect(faqButton.exists())

    faqButton.props().onPress()

    expect(mockNavigate).toHaveBeenCalledTimes(1)
    expect(mockNavigate).toHaveBeenCalledWith(`FAQ`)
  })

  it(`opens mail client when the feedback button is pressed`, async () => {
    const feedbackButton = wrapper.findWhere(
      (node) => node.prop(`testID`) === `feedbackButton`,
    )
    expect(feedbackButton.exists())

    feedbackButton.props().onPress()
    expect(mockComposeAsync).toHaveBeenCalledTimes(1)
    expect(mockComposeAsync.mock.calls).toMatchSnapshot()
  })

  it(`dispatches action when analytics checkbox is toggled`, async () => {
    const analyticsCheckbox = wrapper.findWhere(
      (node) => node.prop(`testID`) === `analyticsCheckbox`,
    )
    expect(analyticsCheckbox.exists())

    analyticsCheckbox.props().onValueChange(true)
    expect(mockSetShouldTrackAnalytics).toHaveBeenCalledTimes(1)
    expect(mockSetShouldTrackAnalytics).toHaveBeenCalledWith(true)
  })
})
