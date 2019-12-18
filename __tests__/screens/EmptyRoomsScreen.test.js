/**
 * @jest-environment jsdom
 */
import "react-native"

import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

import ApiManager from "../../lib/ApiManager"
import { EmptyRoomsScreen } from '../../screens/RoomsScreen/EmptyRoomsScreen'

Enzyme.configure({ adapter: new Adapter() })

describe(`EmptyRoomsScreen`, () => {
  let wrapper
  const mockNavigate = jest.fn()
  const mockProps = {
    navigation: {
      navigate: mockNavigate,
    },
  }

  const sampleRooms = [
    {
      classification_name: `Classroom`,
      roomname: `Bentham`,
      siteid: `b`,
      sitename: `Bentham House`,
    },
    {
      classification_name: `Lecture Theatre`,
      roomname: `Galactica`,
      siteid: `main`,
      sitename: `Main Building`,
    },
    {
      classification_name: `Classroom`,
      roomname: `Denning`,
      siteid: `main`,
      sitename: `Main Building`,
    },
  ]

  const mockGetEmptyRooms = jest.fn(() => Promise.resolve(sampleRooms))
  ApiManager.rooms.getEmptyRooms = mockGetEmptyRooms

  beforeEach(() => {
    wrapper = shallow(<EmptyRoomsScreen {...mockProps} />)
  })

  it(`renders the EmptyRoomsScreen`, () => {
    expect(wrapper).toMatchSnapshot()
  })

  it(`calls getEmptyRooms`, () => {
    jest.clearAllMocks()
    const instance = wrapper.instance()
    instance.componentDidMount()
    expect(mockGetEmptyRooms).toHaveBeenCalledTimes(1)
  })

  it(`shows message when no empty rooms found`, () => {
    wrapper.setState({ loadingEmptyRooms: false })
    expect(wrapper).toMatchSnapshot()
  })

  it(`supports filtering by building`, async () => {
    jest.clearAllMocks()
    const instance = wrapper.instance()
    await instance.fetchEmptyRooms()
    expect(instance.state.emptyRooms).toBe(sampleRooms)
    expect(instance.state.loadingEmptyRooms).toBe(false)
    expect(instance.state.sites).toHaveLength(2)

    const buildingPicker = wrapper.findWhere(
      (node) => node.prop(`testID`) === `buildingPicker`,
    )
    expect(buildingPicker.exists())
    buildingPicker.props().onValueChange(`main`)
    expect(instance.state.selectedSite).toBe(`main`)

    expect(wrapper).toMatchSnapshot()
  })
})
