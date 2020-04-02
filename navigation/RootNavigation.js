import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from "@react-navigation/stack"
import React from 'react'
import { connect } from "react-redux"

import FAQScreen from "../screens/FAQScreen"
import LiveSeatingMapScreen from "../screens/LiveSeatingMapScreen"
import NotificationsScreen from "../screens/NotificationsScreen"
import PersonDetailScreen from "../screens/PersonDetailScreen"
import RoomDetailScreen from "../screens/RoomDetailScreen"
import SplashScreen from "../screens/SplashScreen"
import StudySpaceDetailScreen from "../screens/StudySpaceDetailScreen"
import TimetableDetailScreen from "../screens/TimetableDetailScreen"
import MainTabNavigator from "./MainTabNavigator"

const Stack = createStackNavigator()

export const RootNavigatorComponent = ({
  onNavigationStateChange,
  token,
  upi,
  scopeNumber,
}) => {
  const isLoggedIn = (
    token && typeof token === `string` && token.length > 0
    && upi && typeof upi === `string` && upi.length > 0
    && scopeNumber >= 0
  )

  const screens = isLoggedIn
    ? (
      <>
        <Stack.Screen
          name="FAQ"
          component={FAQScreen}
        />
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
        <Stack.Screen
          name="TimetableDetail"
          component={TimetableDetailScreen}
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
        headerTitleStyle={{
          fontFamily: `apercu`,
          fontWeight: `normal`,
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
  }) => ({
    scopeNumber,
    token,
    upi,
  }),
  () => ({}),
)(RootNavigatorComponent)
