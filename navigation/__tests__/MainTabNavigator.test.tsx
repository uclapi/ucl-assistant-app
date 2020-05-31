import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { cleanup, render } from "react-native-testing-library"
import { Provider } from "react-redux"
import configureStore from 'redux-mock-store'
import thunk from "redux-thunk"

import debounce from "../../lib/debounce"
import { initialState } from '../../reducers'
import MainTabNavigator from '../MainTabNavigator'

const middlewares = [
  debounce.middleware,
  thunk,
]
const mockStore = configureStore(middlewares)

describe(`MainTabNavigator`, () => {
  afterEach(() => {
    cleanup()
  })
  it(`renders without error`, () => {
    const store = mockStore(initialState)

    const component = render(
      <Provider store={store}>
        <NavigationContainer>
          <MainTabNavigator />
        </NavigationContainer>
      </Provider>,
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
