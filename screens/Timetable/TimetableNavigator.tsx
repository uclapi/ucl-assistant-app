import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import TimetableDetailScreen from "./TimetableDetailScreen"
import TimetableScreen from "./TimetableScreen"

const Stack = createStackNavigator()

const TimetableNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="TimetableScreen" component={TimetableScreen} />
    <Stack.Screen name="TimetableDetail" component={TimetableDetailScreen} />
  </Stack.Navigator>
)

export default TimetableNavigator
