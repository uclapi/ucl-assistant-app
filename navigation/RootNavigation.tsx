import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from "@react-navigation/stack"
import React, { ReactElement } from 'react'
import { connect } from "react-redux"

import NotificationsScreen from "../screens/NotificationsScreen"
import SplashScreen from "../screens/SplashScreen"
import { NestedNavigator } from '../types/uclapi'
import MainTabNavigator, { MainTabNavigatorParamList } from "./MainTabNavigator"

export type RootStackParamList = {
  Main: NestedNavigator<MainTabNavigatorParamList>,
  Notifications: undefined,
  PersonDetail: undefined,
  StudySpaceDetail: undefined,
  Splash: undefined,
}

const Stack = createStackNavigator<RootStackParamList>()

export const RootNavigatorComponent = ({
  onNavigationStateChange,
  token,
  upi,
  scopeNumber,
}): ReactElement => {
  const isLoggedIn = (
    token && typeof token === `string` && token.length > 0
    && upi && typeof upi === `string` && upi.length > 0
    && scopeNumber >= 0
  )

  const screens = isLoggedIn
    ? (
      <>
        <Stack.Screen
          name="Main"
          component={MainTabNavigator}
        />
        <Stack.Screen
          name="Notifications"
          component={NotificationsScreen}
        />
      </>
    )
    : (
      <>
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
        />
      </>
    )

  return (
    <NavigationContainer
      onStateChange={onNavigationStateChange}
    >
      <Stack.Navigator
        screenOptions={{
          headerTitleStyle: {
            fontFamily: `apercu`,
            fontWeight: `normal`,
          },
        }}
        headerMode="none"
        initialRouteName={isLoggedIn ? `Main` : `Splash`}
      >
        {screens}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default connect(
  ({
    user: {
      token,
      upi,
      scopeNumber,
    },
  }: {
    user: any,
  }) => ({
    scopeNumber,
    token,
    upi,
  }),
  () => ({}),
)(RootNavigatorComponent)
