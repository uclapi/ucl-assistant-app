import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { CompositeNavigationProp } from '@react-navigation/native'
import {
  createStackNavigator, StackNavigationProp,
} from '@react-navigation/stack'
import React from 'react'

import type {
  MainTabNavigatorParamList,
  RootStackParamList,
} from '../../navigation'
import TimetableDetailScreen from "./TimetableDetailScreen"
import TimetableScreen from "./TimetableScreen"

export type TimetableNavigationType = CompositeNavigationProp<
  StackNavigationProp<TimetableNavigatorParamList>,
  CompositeNavigationProp<
    BottomTabNavigationProp<MainTabNavigatorParamList>,
    StackNavigationProp<RootStackParamList>
  >
>

export type TimetableNavigatorParamList = {
  Timetable: undefined,
  TimetableDetail: {
    code: string,
    date: string,
    module: string,
    time: string,
  },
}

const Stack = createStackNavigator<TimetableNavigatorParamList>()

const TimetableNavigator = (): React.ReactElement => (
  <Stack.Navigator initialRouteName="Timetable">
    <Stack.Screen
      options={{ headerShown: false }}
      name="Timetable"
      component={TimetableScreen}
    />
    <Stack.Screen
      name="TimetableDetail"
      component={TimetableDetailScreen}
      options={{ title: `` }}
    />
  </Stack.Navigator>
)

export default TimetableNavigator
