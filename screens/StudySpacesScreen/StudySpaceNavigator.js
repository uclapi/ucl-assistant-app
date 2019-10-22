import { createStackNavigator } from 'react-navigation-stack'

import StudySpacesFavouritesScreen from './StudySpacesFavouritesScreen'
import StudySpacesListScreen from './StudySpacesListScreen'

const StudySpaceNavigator = createStackNavigator(
  {
    StudySpacesFavourites: {
      screen: StudySpacesFavouritesScreen,
    },
    StudySpacesList: {
      screen: StudySpacesListScreen,
    },
  },
  {
    defaultNavigationOptions: () => ({
      headerTitleStyle: {
        fontFamily: `apercu`,
        fontWeight: `normal`,
      },
    }),
    initialRouteName: `StudySpacesFavourites`,
  }
)

export default StudySpaceNavigator
