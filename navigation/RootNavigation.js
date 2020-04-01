import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from "@react-navigation/stack"
import React from 'react'

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

const RootNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      headerTitleStyle={{
        fontFamily: `apercu`,
        fontWeight: `normal`,
      }}
      initialRouteName="Splash"
    >
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
        navigationOptions={{
          headerShown: false,
        }}
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
        name="Splash"
        component={SplashScreen}
        navigationOptions={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="StudySpaceDetail"
        component={StudySpaceDetailScreen}
      />
      <Stack.Screen
        name="TimetableDetail"
        component={TimetableDetailScreen}
      />
    </Stack.Navigator>
  </NavigationContainer>
)

export default RootNavigator
