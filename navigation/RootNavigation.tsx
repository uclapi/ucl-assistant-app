import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from "@react-navigation/stack"
import React, { ReactElement } from 'react'
import { connect } from "react-redux"

import LiveSeatingMapScreen from "../screens/LiveSeatingMapScreen"
import NotificationsScreen from "../screens/NotificationsScreen"
import PersonDetailScreen from "../screens/PersonDetailScreen"
import RoomDetailScreen from "../screens/RoomDetailScreen"
import SplashScreen from "../screens/SplashScreen"
import StudySpaceDetailScreen from "../screens/StudySpaceDetailScreen"
import MainTabNavigator from "./MainTabNavigator"

const Stack = createStackNavigator()

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
          name="LiveSeatingMap"
          component={LiveSeatingMapScreen}
        />
        <Stack.Screen
          name="Main"
          component={MainTabNavigator}
        />
        <Stack.Screen
          name="Notifications"
          component={NotificationsScreen}
        />
        <Stack.Screen
          name="PersonDetail"
          component={PersonDetailScreen}
        />
        <Stack.Screen
          name="RoomDetail"
          component={RoomDetailScreen}
        />
        <Stack.Screen
          name="StudySpaceDetail"
          component={StudySpaceDetailScreen}
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
