import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { cleanup, render } from "react-native-testing-library"

import MainTabNavigator from '../MainTabNavigator'

describe(`MainTabNavigator`, () => {
  afterEach(() => {
    cleanup()
  })
  it(`renders`, () => {
    const component = render(
      <NavigationContainer>
        <MainTabNavigator />
      </NavigationContainer>,
    )
    expect(component.toJSON()).toMatchSnapshot()
  })
})
