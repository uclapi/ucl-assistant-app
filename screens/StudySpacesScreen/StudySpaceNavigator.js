import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import StudySpacesFavouritesScreen from './StudySpacesFavouritesScreen'
import StudySpacesListScreen from './StudySpacesListScreen'

const Stack = createStackNavigator()

const StudySpaceNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerTitleStyle: {
        fontFamily: `apercu`,
        fontWeight: `normal`,
      },
    }}
    headerMode="none"
    initialRouteName="StudySpacesFavourites"
  >
    <Stack.Screen
      name="StudySpacesFavourites"
      component={StudySpacesFavouritesScreen}
    />
    <Stack.Screen
      name="StudySpacesList"
      component={StudySpacesListScreen}
    />
  </Stack.Navigator>
)

export default StudySpaceNavigator
