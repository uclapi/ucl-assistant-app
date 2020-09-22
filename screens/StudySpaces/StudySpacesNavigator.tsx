import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { CompositeNavigationProp } from '@react-navigation/native'
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack'
import React from 'react'

import type {
  MainTabNavigatorParamList,
  RootStackParamList,
} from '../../navigation'
import { StudySpace } from '../../types/uclapi'
import LiveSeatingMapScreen from './LiveSeatingMapScreen'
import StudySpacesDetailScreen from './StudySpaceDetailScreen'
import StudySpacesFavouritesScreen from './StudySpacesFavouritesScreen'
import StudySpacesScreen from './StudySpacesListScreen'
import StudySpacesNoticeScreen from './StudySpacesNoticeScreen'

export type StudySpacesNavigationType = CompositeNavigationProp<
  StackNavigationProp<StudySpacesNavigatorParamList>,
  CompositeNavigationProp<
    BottomTabNavigationProp<MainTabNavigatorParamList>,
    StackNavigationProp<RootStackParamList>
  >
>

export type StudySpacesNavigatorParamList = {
  StudySpacesList: undefined,
  StudySpacesFavourites: undefined,
  // eslint-disable-next-line quotes
  StudySpacesDetail: Pick<StudySpace, 'id' | 'name' | 'occupied' | 'total'>,
  // eslint-disable-next-line quotes
  LiveSeatingMap: Pick<StudySpace, 'surveyId' | 'mapId' | 'name'>,
  StudySpacesNotice: undefined,
}

const Stack = createStackNavigator<StudySpacesNavigatorParamList>()

const StudySpacesNavigator = (): React.ReactElement => (
  <Stack.Navigator initialRouteName="StudySpacesNotice">
    <Stack.Screen
      options={{ headerShown: false }}
      name="StudySpacesNotice"
      component={StudySpacesNoticeScreen}
    />
    <Stack.Screen
      options={{ title: `` }}
      name="StudySpacesList"
      component={StudySpacesScreen}
    />
    <Stack.Screen
      options={({ route }) => ({
        title: route?.params?.name || ``,
      })}
      name="StudySpacesDetail"
      component={StudySpacesDetailScreen}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name="StudySpacesFavourites"
      component={StudySpacesFavouritesScreen}
    />
    <Stack.Screen
      options={({ route }) => ({
        title: route?.params?.name || `Live Seating Map`,
      })}
      name="LiveSeatingMap"
      component={LiveSeatingMapScreen}
    />
  </Stack.Navigator>
)

export default StudySpacesNavigator
