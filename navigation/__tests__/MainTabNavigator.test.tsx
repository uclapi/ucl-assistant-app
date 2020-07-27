import { NavigationContainer } from '@react-navigation/native'
import { cleanup, fireEvent, render } from "@testing-library/react-native"
import React from 'react'
import { Provider } from "react-redux"
import { Store } from 'redux'
import configureStore from 'redux-mock-store'
import thunk from "redux-thunk"
import Colors from "../../constants/Colors"
import debounce from "../../lib/debounce"
import { initialState } from '../../reducers'
import MainTabNavigator from '../MainTabNavigator'

const middlewares = [
  debounce.middleware,
  thunk,
]
const mockStore = configureStore(middlewares)

describe(`MainTabNavigator`, () => {
  jest.useRealTimers()

  let Navigator

  beforeEach(() => {
    const store: Store = mockStore(initialState)
    Navigator = render(
      <Provider store={store}>
        <NavigationContainer>
          <MainTabNavigator />
        </NavigationContainer>
      </Provider>,
    )
  })

  afterEach(() => {
    cleanup()
  })

  it(`renders without error`, () => {
    expect(Navigator).toMatchSnapshot()
  })

  it(`TimetableScreen is highlighted`, () => {
    const { queryByText } = Navigator
    const timetableTab = queryByText(`Timetable`)
    expect(timetableTab).toBeTruthy()
    expect(timetableTab).toHaveStyle({ color: Colors.pageBackground })
    const TimetableScreen = queryByText(`Loading timetable...`)
    expect(TimetableScreen).toBeTruthy()
  })

  it(`can navigate to SettingsScreen`, () => {
    const { queryByText } = Navigator
    const settingsTab = queryByText(`Settings`)
    expect(settingsTab).toBeTruthy()
    expect(settingsTab).toHaveStyle({ color: Colors.textColor })

    fireEvent.press(settingsTab)
    expect(settingsTab).toHaveStyle({ color: Colors.pageBackground })

    const signOutButton = queryByText(`Sign Out`)
    expect(signOutButton).toBeTruthy()
  })
})
