import { cleanup, fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import { waitForEventLoop } from '../../../../jest/test-utils'
import ApiManager from "../../../../lib/ApiManager"
import { EmptyRoomsScreen } from '../EmptyRoomsScreen'

describe(`EmptyRoomsScreen`, () => {
  const mockNavigate = jest.fn()
  const mockProps = {
    navigation: {
      navigate: mockNavigate,
    } as any,
    token: ``,
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

  const mockGetEmptyRooms = jest.fn(
    () => Promise.resolve(sampleRooms),
  ) as jest.Mock
  ApiManager.rooms.getEmptyRooms = mockGetEmptyRooms

  beforeAll(() => {
    jest.useFakeTimers()
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  afterEach(() => {
    cleanup()
  })

  it(`renders the loading screen`, async () => {
    const wrapper = render(<EmptyRoomsScreen {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  it(`calls getEmptyRooms`, async () => {
    const wrapper = render(<EmptyRoomsScreen {...mockProps} />)
    await waitForEventLoop()

    expect(mockGetEmptyRooms).toHaveBeenCalledTimes(1)
    expect(wrapper).toMatchSnapshot()
  })

  it(`shows message when no empty rooms found`, async () => {
    ApiManager.rooms.getEmptyRooms = jest.fn(() => Promise.resolve([]))
    const emptyScreen = render(<EmptyRoomsScreen {...mockProps} />)
    const { getByText } = emptyScreen

    await waitForEventLoop()

    expect(getByText(/empty rooms/i)).toBeTruthy()
    expect(emptyScreen).toMatchSnapshot()

    ApiManager.rooms.getEmptyRooms = mockGetEmptyRooms
  })

  it(`supports filtering by building`, async () => {
    const wrapper = render(<EmptyRoomsScreen {...mockProps} />)
    const { getByTestId } = wrapper
    await waitForEventLoop()

    fireEvent(getByTestId(`building-picker`), `valueChange`, `main`)
    await waitForEventLoop()

    expect(wrapper).toMatchSnapshot()
  })
})
