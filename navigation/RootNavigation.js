import { createAppContainer } from "react-navigation"
import { createStackNavigator } from "react-navigation-stack"

import FAQScreen from "../screens/FAQScreen"
import LiveSeatingMapScreen from "../screens/LiveSeatingMapScreen"
import NotificationsScreen from "../screens/NotificationsScreen"
import PersonDetailScreen from "../screens/PersonDetailScreen"
import RoomDetailScreen from "../screens/RoomDetailScreen"
import SplashScreen from "../screens/SplashScreen"
import StudySpaceDetailScreen from "../screens/StudySpaceDetailScreen"
import TimetableDetailScreen from "../screens/TimetableDetailScreen"
import MainTabNavigator from "./MainTabNavigator"

const RootStackNavigator = createStackNavigator(
  {
    FAQ: {
      screen: FAQScreen,
    },
    LiveSeatingMap: {
      screen: LiveSeatingMapScreen,
    },
    Main: {
      navigationOptions: {
        header: null,
      },
      screen: MainTabNavigator,
    },
    Notifications: {
      navigationOptions: {
        header: null,
      },
      screen: NotificationsScreen,
    },
    PersonDetail: {
      screen: PersonDetailScreen,
    },
    RoomDetail: {
      screen: RoomDetailScreen,
    },
    Splash: {
      navigationOptions: {
        header: null,
      },
      screen: SplashScreen,
    },
    StudySpaceDetail: {
      screen: StudySpaceDetailScreen,
    },
    TimetableDetail: {
      screen: TimetableDetailScreen,
    },
  },
  {
    defaultNavigationOptions: () => ({
      headerTitleStyle: {
        fontFamily: `apercu`,
        fontWeight: `normal`,
      },
    }),
    initialRouteName: `Splash`,
  },
)

export default createAppContainer(RootStackNavigator)
