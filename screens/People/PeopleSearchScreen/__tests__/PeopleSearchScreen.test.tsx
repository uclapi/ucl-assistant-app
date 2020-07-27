import { cleanup, render } from '@testing-library/react-native'
import React from "react"
import "react-native"
import { RecentResults } from "../RecentResults"
import { SearchControl } from "../SearchControl"

describe(`RecentResults`, () => {
  beforeEach(() => {
    jest.useRealTimers()
  })

  afterEach(() => {
    cleanup()
  })

  it(`renders an empty RecentResults component`, async () => {
    const props = {
      clearRecentResults: jest.fn(),
      navigation: {
        navigate: jest.fn(),
      } as any,
      recents: [],
    }
    const tree = render(<RecentResults {...props} />)
    expect(tree).toBe(null)
  })

  it(`renders a filled RecentResults component`, async () => {
    const props = {
      clearRecentResults: jest.fn(),
      navigation: {
        navigate: jest.fn(),
      } as any,
      recents: [
        {
          department: `Department of Agriculture`,
          name: `Mr Potato`,
        },
        {
          department: `Faculty of Medical Sciences`,
          name: `Chris P Bacon`,
        },
        {
          department: `Philosophy Department`,
          name: `Jeremy Bentham`,
        },
      ],
    }
    const tree = render(<RecentResults {...props} />)
    expect(tree).toMatchSnapshot()
  })

  it(`renders a SearchControl component`, async () => {
    const props = {
      clearRecentResults: jest.fn(),
      error: ``,
      isSearching: false,
      navigation: {
        navigate: jest.fn(),
      } as any,
      search: jest.fn(),
      searchResults: [],
      token: ``,
    }
    const component = render(<SearchControl {...props} />)
    expect(component).toMatchSnapshot()
  })
})
