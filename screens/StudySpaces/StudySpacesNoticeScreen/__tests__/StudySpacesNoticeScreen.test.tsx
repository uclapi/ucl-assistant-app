import { fireEvent } from "@testing-library/react-native"
import React from 'react'
import { render } from "../../../../jest/test-utils"
import { WebBrowserManager } from "../../../../lib"
import StudySpacesNoticeScreen from "../StudySpacesNoticeScreen"

const policyURL = `https://www.ucl.ac.uk/library/libraries-and-study-spaces/bookable-study-spaces-help`
const bookingURL = `https://library-calendars.ucl.ac.uk/r/`

describe(`StudySpacesNoticeScreen`, () => {
  const mockOpenLink = jest.fn(() => Promise.resolve())
  WebBrowserManager.openLink = mockOpenLink as any

  it(`renders the StudySpacesNoticeScreen`, async () => {
    const wrapper = await render(<StudySpacesNoticeScreen />)
    expect(wrapper).toMatchSnapshot()
  })

  it(`opens linked pages`, async () => {
    const wrapper = await render(<StudySpacesNoticeScreen />)
    const { getByText } = wrapper

    const policyLink = getByText(/Library/i)
    expect(policyLink.props.href === policyURL)
    fireEvent.press(policyLink)
    expect(mockOpenLink).toHaveBeenCalledTimes(1)
    expect(mockOpenLink).toHaveBeenCalledWith(policyURL)

    const bookingButton = getByText(/Book a StudySpace/i)
    fireEvent.press(bookingButton)
    expect(mockOpenLink).toHaveBeenCalledTimes(2)
    expect(mockOpenLink).toHaveBeenCalledWith(bookingURL)
  })
})
