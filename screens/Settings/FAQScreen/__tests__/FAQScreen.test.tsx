import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import FAQScreen from '..'
import WebBrowserManager from "../../../../lib/WebBrowserManager"

WebBrowserManager.openLink = jest.fn()

describe(`FAQScreen`, () => {
  const setup = () => render(<FAQScreen />)

  beforeAll(() => {
    jest.useFakeTimers()
  })

  it(`renders fine`, () => {
    const wrapper = setup()
    expect(wrapper).toMatchSnapshot()
  })

  it(`links works`, () => {
    const wrapper = setup()
    const { getByText } = wrapper

    fireEvent.press(getByText(/How does this app work/i))

    const websiteLink = getByText(`About the UCL API`)
    fireEvent.press(websiteLink)
    expect(WebBrowserManager.openLink).toBeCalledTimes(1)
    expect((WebBrowserManager.openLink as jest.Mock).mock.calls).toMatchSnapshot()

    fireEvent.press(getByText(`More questions?`))

    const githubLink = getByText(`GitHub`)
    fireEvent.press(githubLink)
    expect(WebBrowserManager.openLink).toBeCalledTimes(2)
    expect((WebBrowserManager.openLink as jest.Mock).mock.calls).toMatchSnapshot()
  })
})
