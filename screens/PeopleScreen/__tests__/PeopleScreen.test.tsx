import "react-native"

import React from "react"
import { cleanup, render } from 'react-native-testing-library'

import { RecentResults } from "../RecentResults"
import { SearchControl } from "../SearchControl"

describe(`RecentResults`, () => {
  afterEach(() => {
    cleanup()
  })

  it(`renders an empty RecentResults component`, async () => {
    const props = {
      clearRecents: jest.fn(),
      navigation: {
        navigate: jest.fn(),
      },
      recents: [],
    }
    const tree = render(<RecentResults {...props} />).toJSON()
    expect(tree).toBe(null)
  })

  it(`renders a filled RecentResults component`, async () => {
    const props = {
      clearRecents: jest.fn(),
      navigation: {
        navigate: jest.fn(),
      },
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
    const tree = render(<RecentResults {...props} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

it(`renders a SearchControl component`, async () => {
  const props = {
    clear: jest.fn(),
    error: ``,
    isSearching: false,
    navigation: {
      navigate: jest.fn(),
    },
    search: jest.fn(),
    searchResults: [],
    token: ``,
  }
  const component = render(<SearchControl {...props} />)
  expect(component).toMatchSnapshot()
})
