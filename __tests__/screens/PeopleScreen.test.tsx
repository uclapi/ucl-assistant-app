import "react-native"

import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from "react"
import renderer from "react-test-renderer"

import { RecentResults } from "../../screens/PeopleScreen/RecentResults"
import { SearchControl } from "../../screens/PeopleScreen/SearchControl"

Enzyme.configure({ adapter: new Adapter() })

describe(`RecentResults`, () => {
  it(`renders an empty RecentResults component`, async () => {
    const props = {
      clearRecents: jest.fn(),
      navigation: {
        navigate: jest.fn(),
      },
      recents: [],
    }
    const tree = renderer.create(<RecentResults {...props} />).toJSON()
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
    const tree = renderer.create(<RecentResults {...props} />).toJSON()
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
  const component = shallow(<SearchControl {...props} />)
  expect(component).toMatchSnapshot()
})
