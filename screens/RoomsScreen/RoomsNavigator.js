import { createStackNavigator } from 'react-navigation-stack'

import EmptyRoomsScreen from './EmptyRoomsScreen'
import RoomsFavouritesScreen from './RoomsFavouritesScreen'
import RoomsSearchScreen from './RoomsSearchScreen'

const RoomsNavigator = createStackNavigator(
  {
    EmptyRooms: {
      screen: EmptyRoomsScreen,
    },
    RoomsFavourites: {
      screen: RoomsFavouritesScreen,
    },
    RoomsSearch: {
      screen: RoomsSearchScreen,
    },
  },
  {
    defaultNavigationOptions: () => ({
      headerTitleStyle: {
        fontFamily: `apercu`,
        fontWeight: `normal`,
      },
    }),
    initialRouteName: `RoomsFavourites`,
  }
)

export default RoomsNavigator
