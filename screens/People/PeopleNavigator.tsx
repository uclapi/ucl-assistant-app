import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import type { Person } from '../../types/uclapi'
import PeopleDetailScreen from './PeopleDetailScreen'
import PeopleSearchScreen from './PeopleSearchScreen'

export type PeopleNavigatorParamList = {
  PeopleSearch: undefined,
  PeopleDetail: Person,
}

const Stack = createStackNavigator<PeopleNavigatorParamList>()

const PeopleNavigator = (): React.ReactElement => (
  <Stack.Navigator initialRouteName="PeopleSearch">
    <Stack.Screen
      name="PeopleSearch"
      options={{ headerShown: false, title: `` }}
      component={PeopleSearchScreen}
    />
    <Stack.Screen
      name="PeopleDetail"
      options={{ title: `` }}
      component={PeopleDetailScreen}
    />
  </Stack.Navigator>
)

export default PeopleNavigator
