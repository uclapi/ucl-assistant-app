import { cleanup, fireEvent } from "@testing-library/react-native"
import React from 'react'
import Colors from "../../constants/Colors"
import { render } from "../../jest/test-utils"
import { Warnings } from '../../lib'
import MainTabNavigator from '../MainTabNavigator'

describe(`MainTabNavigator`, () => {
  beforeAll(() => {
    Warnings.ignore()
    jest.useFakeTimers()
  })

  afterEach(() => {
    cleanup()
  })

  it(`renders without error`, async () => {
    const Navigator = await render(<MainTabNavigator />)
    expect(Navigator).toMatchSnapshot()
  })

  it(`TimetableScreen is highlighted`, async () => {
    const Navigator = await render(<MainTabNavigator />)
    const { queryByText } = Navigator
    const timetableTab = queryByText(`Timetable`)
    expect(timetableTab).toBeTruthy();
    (expect(timetableTab) as any).toHaveStyle({ color: Colors.pageBackground })
    const TimetableScreen = queryByText(`Loading timetable...`)
    expect(TimetableScreen).toBeTruthy()
  })

  it(`can navigate to SettingsScreen`, async () => {
    const Navigator = await render(<MainTabNavigator />)
    const { queryByText } = Navigator
    const settingsTab = queryByText(`Settings`)
    expect(settingsTab).toBeTruthy();
    (expect(settingsTab) as any).toHaveStyle({ color: Colors.textColor })

    fireEvent.press(settingsTab);
    (expect(settingsTab) as any).toHaveStyle({ color: Colors.pageBackground })

    const signOutButton = queryByText(`Sign Out`)
    expect(signOutButton).toBeTruthy()
  })
})
