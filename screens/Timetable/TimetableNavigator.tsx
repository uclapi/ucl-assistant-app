import {
  createStackNavigator,
} from '@react-navigation/stack'
import React from 'react'

import TimetableDetailScreen from "./TimetableDetailScreen"
import TimetableScreen from "./TimetableScreen"

type TimetableNavigatorParamList = {
  TimetableScreen: undefined,
  TimetableDetail: {
    code: string,
    date: string,
    module: string,
    time: string,
  },
}

const Stack = createStackNavigator<TimetableNavigatorParamList>()

const TimetableNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="TimetableScreen" component={TimetableScreen} />
    <Stack.Screen name="TimetableDetail" component={TimetableDetailScreen} />
  </Stack.Navigator>
)

export default TimetableNavigator