import {
  createStackNavigator,
} from '@react-navigation/stack'
import React from 'react'

import FAQScreen from "./FAQScreen"
import SettingsScreen from "./SettingsScreen"

type SettingsNavigatorParamList = {
  FAQ: undefined,
  Settings: undefined,
}

const Stack = createStackNavigator<SettingsNavigatorParamList>()

const SettingsNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="FAQ" component={FAQScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
  </Stack.Navigator>
)

export default SettingsNavigator
