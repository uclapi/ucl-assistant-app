import { fireEvent } from "@testing-library/react-native"
import React from 'react'
import { render } from "../../../../jest/test-utils"
import { MailManager, WebBrowserManager } from '../../../../lib'
import * as packageJson from '../../../../package.json'
import { SettingsScreen } from "../SettingsScreen"

const {
  repository: {
    url: githubURL,
  },
} = packageJson

describe(`SettingsScreen`, () => {
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
    jest.useFakeTimers()
  })

  it(`renders the SettingsScreen`, async () => {
    const wrapper = await render(<SettingsScreen {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  it(`logs out when the signOut button is pressed`, async () => {
    const wrapper = await render(<SettingsScreen {...mockProps} />)
    const { getByText } = wrapper
    fireEvent.press(getByText(/Sign Out/i))
    expect(mockSignOut).toHaveBeenCalledTimes(1)
  })

  it(`opens Github repository when Github button is pressed`, async () => {
    const wrapper = await render(<SettingsScreen {...mockProps} />)
    const { getByText } = wrapper
    const githubButton = getByText(/Source Code/i)
    expect(githubButton.props.href === githubURL)
  })

  it(`opens FAQ page when the FAQ button is pressed`, async () => {
    const wrapper = await render(<SettingsScreen {...mockProps} />)
    const { getByText } = wrapper
    const faqButton = getByText(/Frequently Asked Questions/i)
    fireEvent.press(faqButton)

    expect(mockNavigate).toHaveBeenCalledTimes(1)
    expect(mockNavigate).toHaveBeenCalledWith(`FAQ`)
  })

  it(`opens mail client when the feedback button is pressed`, async () => {
    const wrapper = await render(<SettingsScreen {...mockProps} />)
    const { getByText } = wrapper
    const feedbackButton = getByText(/Send Us Feedback/i)
    fireEvent.press(feedbackButton)

    expect(mockComposeAsync).toHaveBeenCalledTimes(1)
    expect(mockComposeAsync.mock.calls).toMatchSnapshot()
  })

  it(`analytics checkbox is present`, async () => {
    const wrapper = await render(<SettingsScreen {...mockProps} />)
    const { getByTestId } = wrapper
    const analyticsCheckbox = getByTestId(`analytics-checkbox`)

    const event = {
      nativeEvent: {
        value: true,
      },
    }
    fireEvent(analyticsCheckbox, `valueChange`, event)

    expect(mockSetShouldTrackAnalytics).toHaveBeenCalledTimes(1)
    expect(mockSetShouldTrackAnalytics).toHaveBeenCalledWith(true)
  })
})
