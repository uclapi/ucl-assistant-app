import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import EmptyRoomsScreen from './EmptyRoomsScreen'
import RoomsFavouritesScreen from './RoomsFavouritesScreen'
import RoomsSearchScreen from './RoomsSearchScreen'

const Stack = createStackNavigator()

const RoomsNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerTitleStyle: {
        fontFamily: `apercu`,
        fontWeight: `normal`,
      },
    }}
    initialRouteName="RoomsFavourites"
  >
    <Stack.Screen
      name="EmptyRooms"
      component={EmptyRoomsScreen}
    />
    <Stack.Screen
      name="RoomsFavourites"
      component={RoomsFavouritesScreen}
    />
    <Stack.Screen
      name="RoomsSearch"
      component={RoomsSearchScreen}
    />
  </Stack.Navigator>
)

export default RoomsNavigator
