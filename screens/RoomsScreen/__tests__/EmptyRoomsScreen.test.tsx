/**
 * @jest-environment jsdom
 */
import "react-native"

import React from 'react'
import {
  cleanup, fireEvent, render, waitForElement,
} from 'react-native-testing-library'

import ApiManager from "../../../lib/ApiManager"
import { EmptyRoomsScreen } from '../EmptyRoomsScreen'

describe(`EmptyRoomsScreen`, () => {
  let wrapper
  const mockNavigate = jest.fn()
  const mockProps = {
    navigation: {
      navigate: mockNavigate,
    },
  }

  /* eslint-disable @typescript-eslint/camelcase */
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
  /* eslint-enable @typescript-eslint/camelcase */

  const mockGetEmptyRooms = jest.fn(
    () => Promise.resolve(sampleRooms),
  ) as jest.Mock
  ApiManager.rooms.getEmptyRooms = mockGetEmptyRooms

  beforeEach(() => {
    jest.clearAllMocks()
    wrapper = render(<EmptyRoomsScreen {...mockProps} />)
  })

  afterEach(() => {
    cleanup()
  })

  it(`renders the loading screen`, async () => {
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  it(`calls getEmptyRooms`, async () => {
    const { update } = wrapper
    update(<EmptyRoomsScreen {...mockProps} />)
    await new Promise((resolve) => setTimeout(resolve, 0))
    expect(mockGetEmptyRooms).toHaveBeenCalledTimes(1)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  it(`shows message when no empty rooms found`, async () => {
    ApiManager.rooms.getEmptyRooms = jest.fn(() => Promise.resolve([]))
    const emptyScreen = render(<EmptyRoomsScreen {...mockProps} />)
    const { update, getByTestId } = emptyScreen

    update(<EmptyRoomsScreen {...mockProps} />)
    await new Promise((resolve) => setTimeout(resolve, 0))

    await waitForElement(() => getByTestId(`empty-rooms-message`))
    expect(emptyScreen.toJSON()).toMatchSnapshot()

    ApiManager.rooms.getEmptyRooms = mockGetEmptyRooms
  })

  it(`supports filtering by building`, async () => {
    const { update, getByTestId } = wrapper
    update(<EmptyRoomsScreen {...mockProps} />)
    await new Promise((resolve) => setTimeout(resolve, 0))

    fireEvent(getByTestId(`building-picker`), `onValueChange`, `main`)
    update(<EmptyRoomsScreen {...mockProps} />)
    await new Promise((resolve) => setTimeout(resolve, 0))

    expect(wrapper.toJSON()).toMatchSnapshot()
  })
})
