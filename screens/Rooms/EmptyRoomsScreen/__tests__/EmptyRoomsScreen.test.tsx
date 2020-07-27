/**
 * @jest-environment jsdom
 */
import {
  cleanup, fireEvent, render, waitForElement,
} from '@testing-library/react-native'
import React from 'react'
import "react-native"
import ApiManager from "../../../../lib/ApiManager"
import { EmptyRoomsScreen } from '../EmptyRoomsScreen'

describe(`EmptyRoomsScreen`, () => {
  let wrapper
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

  beforeEach(() => {
    jest.useRealTimers()
    jest.clearAllMocks()
    wrapper = render(<EmptyRoomsScreen {...mockProps} />)
  })

  afterEach(() => {
    cleanup()
  })

  it(`renders the loading screen`, async () => {
    expect(wrapper).toMatchSnapshot()
  })

  it(`calls getEmptyRooms`, async () => {
    const { update } = wrapper
    update(<EmptyRoomsScreen {...mockProps} />)

    expect(mockGetEmptyRooms).toHaveBeenCalledTimes(1)
    expect(wrapper).toMatchSnapshot()
  })

  it(`shows message when no empty rooms found`, async () => {
    ApiManager.rooms.getEmptyRooms = jest.fn(() => Promise.resolve([]))
    const emptyScreen = render(<EmptyRoomsScreen {...mockProps} />)
    const { getByTestId } = emptyScreen

    await waitForElement(() => getByTestId(`empty-rooms-message`))
    expect(emptyScreen).toMatchSnapshot()

    ApiManager.rooms.getEmptyRooms = mockGetEmptyRooms
  })

  it(`supports filtering by building`, async () => {
    const { update, getByTestId } = wrapper
    update(<EmptyRoomsScreen {...mockProps} />)
    await new Promise((resolve) => setTimeout(resolve, 0))

    fireEvent.valueChange(getByTestId(`building-picker`), `main`)
    update(<EmptyRoomsScreen {...mockProps} />)

    expect(wrapper).toMatchSnapshot()
  })

  afterAll(() => {

  })
})
