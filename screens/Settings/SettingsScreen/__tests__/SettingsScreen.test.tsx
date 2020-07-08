/**
 * @jest-environment jsdom
 */
import "react-native"

import React from 'react'
import { fireEvent, render } from "react-native-testing-library"

import { MailManager, WebBrowserManager } from '../../../../lib'
import * as packageJson from '../../../../package.json'
import { SettingsScreen } from "../SettingsScreen"

const {
  repository: {
    url: githubURL,
  },
} = packageJson

describe(`SettingsScreen`, () => {
  let wrapper
  const mockSignOut = jest.fn()
  const mockNavigate = jest.fn() as any
  const mockSetShouldTrackAnalytics = jest.fn()
  const mockProps = {
    navigation: {
      navigate: mockNavigate,
    } as any,
    setShouldTrackAnalytics: mockSetShouldTrackAnalytics,
    signOut: mockSignOut,
    user: {
      fullName: `Jeremy Bentham`,
      settings: {
        shouldTrackAnalytics: false,
      },
      token: `abc123`,
      upi: `upiupi11`,
    } as any,
  }

  const mockOpenLink = jest.fn(() => Promise.resolve())
  WebBrowserManager.openLink = mockOpenLink as any

  const mockComposeAsync = jest.fn(() => Promise.resolve())
  MailManager.composeAsync = mockComposeAsync

  beforeAll(() => {
    jest.useRealTimers()
  })

  beforeEach(() => {
    wrapper = render(<SettingsScreen {...mockProps} />)
  })

  it(`renders the SettingsScreen`, () => {
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  it(`logs out when the signOut button is pressed`, () => {
    const { getByTestId } = wrapper
    fireEvent.press(getByTestId(`sign-out-button`))
    expect(mockSignOut).toHaveBeenCalledTimes(1)
  })

  it(`opens Github repository when Github button is pressed`, () => {
    const { getByTestId } = wrapper
    const githubButton = getByTestId(`github-button`)
    expect(githubButton.props.href === githubURL)
  })

  it(`opens FAQ page when the FAQ button is pressed`, () => {
    const { getByTestId } = wrapper
    const faqButton = getByTestId(`faq-button`)
    fireEvent.press(faqButton)

    expect(mockNavigate).toHaveBeenCalledTimes(1)
    expect(mockNavigate).toHaveBeenCalledWith(`FAQ`)
  })

  it(`opens mail client when the feedback button is pressed`, () => {
    const { getByTestId } = wrapper
    const feedbackButton = getByTestId(`feedback-button`)
    fireEvent.press(feedbackButton)

    expect(mockComposeAsync).toHaveBeenCalledTimes(1)
    expect(mockComposeAsync.mock.calls).toMatchSnapshot()
  })

  it(`dispatches action when analytics checkbox is toggled`, () => {
    const { getByTestId } = wrapper
    const analyticsCheckbox = getByTestId(`analytics-checkbox`)
    fireEvent(analyticsCheckbox, `click`)
    expect(mockSetShouldTrackAnalytics).toHaveBeenCalledTimes(1)
    expect(mockSetShouldTrackAnalytics).toHaveBeenCalledWith(true)
  })
})
