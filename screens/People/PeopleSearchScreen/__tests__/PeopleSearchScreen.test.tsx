import { cleanup, fireEvent, render } from '@testing-library/react-native'
import React from "react"
import "react-native"
import RecentResults from "../RecentResults"

describe(`RecentResults`, () => {
  beforeEach(() => {
    jest.useRealTimers()
    jest.clearAllMocks()
  })

  afterEach(() => {
    cleanup()
  })

  it(`renders an empty RecentResults component`, async () => {
    const props = {
      clearRecentResults: jest.fn(),
      recents: [],
      viewPerson: jest.fn(),
    }
    const tree = render(<RecentResults {...props} />)
    expect(tree).toMatchSnapshot()
  })

  it(`renders a filled RecentResults component`, async () => {
    const props = {
      clearRecentResults: jest.fn(),
      recents: [
        {
          department: `Department of Agriculture`,
          email: `potato@agri.uk`,
          name: `Mr Potato`,
        },
        {
          department: `Faculty of Medical Sciences`,
          email: `chris@house.md`,
          name: `Chris P Bacon`,
        },
        {
          department: `Philosophy Department`,
          email: `jerry.b@panopticon.ac.uk`,
          name: `Jeremy Bentham`,
        },
      ],
      viewPerson: jest.fn(),
    }
    const wrapper = render(<RecentResults {...props} />)
    expect(wrapper).toMatchSnapshot()

    const { getByText } = wrapper
    const result = getByText(props.recents[0].name)
    fireEvent.press(result)

    expect(props.viewPerson).toHaveBeenCalledWith(props.recents[0].email)
  })
})
