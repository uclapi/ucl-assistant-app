import {
  createStackNavigator,
} from '@react-navigation/stack'
import React from 'react'

import { StudySpace } from '../../types/uclapi'
import LiveSeatingMapScreen from './LiveSeatingMapScreen'
import StudySpacesDetailScreen from './StudySpaceDetailScreen'
import StudySpacesFavouritesScreen from './StudySpacesFavouritesScreen'
import StudySpacesScreen from './StudySpacesListScreen'

export type StudySpacesNavigatorParamList = {
  StudySpacesList: undefined,
  StudySpacesFavourites: undefined,
  // eslint-disable-next-line quotes
  StudySpacesDetail: Pick<StudySpace, 'id' | 'name' | 'occupied' | 'total'>,
  // eslint-disable-next-line quotes
  LiveSeatingMap: Pick<StudySpace, 'surveyId' | 'mapId' | 'name'>,
}

const Stack = createStackNavigator<StudySpacesNavigatorParamList>()

const StudySpacesNavigator = (): React.ReactElement => (
  <Stack.Navigator initialRouteName="StudySpacesFavourites">
    <Stack.Screen
      options={{ title: `` }}
      name="StudySpacesList"
      component={StudySpacesScreen}
    />
    <Stack.Screen
      options={{ title: `` }}
      name="StudySpacesDetail"
      component={StudySpacesDetailScreen}
    />
    <Stack.Screen
      options={{ headerShown: false }}
      name="StudySpacesFavourites"
      component={StudySpacesFavouritesScreen}
    />
    <Stack.Screen
      name="LiveSeatingMap"
      component={LiveSeatingMapScreen}
    />
  </Stack.Navigator>
)

export default StudySpacesNavigator
