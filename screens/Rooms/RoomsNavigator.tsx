import {
  createStackNavigator,
} from '@react-navigation/stack'
import React from 'react'

import type { Room } from '../../reducers/roomsReducer'
import EmptyRoomsScreen from './EmptyRoomsScreen'
import RoomsDetailScreen from './RoomsDetailScreen'
import RoomsFavouritesScreen from './RoomsFavouritesScreen'
import RoomsSearchScreen from './RoomsSearchScreen'

export type RoomsNavigatorParamList = {
  RoomsSearch: undefined,
  EmptyRooms: undefined,
  RoomsFavourites: undefined,
  RoomsDetail: { room: Room, },
}

const Stack = createStackNavigator<RoomsNavigatorParamList>()

const RoomsNavigator = (): React.ReactElement => (
  <Stack.Navigator initialRouteName="RoomsFavourites">
    <Stack.Screen
      name="RoomsSearch"
      options={{ title: `` }}
      component={RoomsSearchScreen}
    />
    <Stack.Screen
      name="EmptyRooms"
      options={{ title: `` }}
      component={EmptyRoomsScreen}
    />
    <Stack.Screen
      name="RoomsFavourites"
      options={{ title: `` }}
      component={RoomsFavouritesScreen}
    />
    <Stack.Screen
      name="RoomsDetail"
      options={{ title: `` }}
      component={RoomsDetailScreen}
    />
  </Stack.Navigator>
)

export default RoomsNavigator
