import {
  createStackNavigator,
} from '@react-navigation/stack'
import React, { ReactElement } from 'react'

import FAQScreen from "./FAQScreen"
import SettingsScreen from "./SettingsScreen"

type SettingsNavigatorParamList = {
  FAQ: undefined,
  Settings: undefined,
}

const Stack = createStackNavigator<SettingsNavigatorParamList>()

const SettingsNavigator = (): ReactElement => (
  <Stack.Navigator initialRouteName="Settings">
    <Stack.Screen
      name="FAQ"
      options={{ title: `FAQs` }}
      component={FAQScreen}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name="Settings"
      component={SettingsScreen}
    />
  </Stack.Navigator>
)

export default SettingsNavigator
