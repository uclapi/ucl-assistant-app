/* eslint react/prop-types: 0 */
import { Feather } from "@expo/vector-icons"
import React from "react"
import { createBottomTabNavigator } from "react-navigation-tabs"

import Colors from "../constants/Colors"
import PeopleScreen from "../screens/PeopleScreen"
import RoomsScreen from "../screens/RoomsScreen"
import SettingsScreen from "../screens/SettingsScreen"
import StudySpacesScreen from "../screens/StudySpacesScreen"
import TimetableScreen from "../screens/TimetableScreen"


const screens = {
  Timetable: {
    screen: TimetableScreen,
  },
  // eslint-disable-next-line sort-keys-fix/sort-keys-fix
  StudySpaces: {
    screen: StudySpacesScreen,
  },
  // eslint-disable-next-line sort-keys-fix/sort-keys-fix
  People: {
    screen: PeopleScreen,
  },
  Rooms: {
    screen: RoomsScreen,
  },
  Settings: {
    screen: SettingsScreen,
  },
}

export default createBottomTabNavigator(screens, {
  defaultNavigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused }) => {
      const { routeName } = navigation.state
      let iconName
      switch (routeName) {
        case `Timetable`:
          iconName = `calendar`
          break
        case `StudySpaces`:
          iconName = `book`
          break
        case `People`:
          iconName = `users`
          break
        case `Rooms`:
          iconName = `map-pin`
          break
        case `Settings`:
          iconName = `settings`
          break
        default:
          iconName = `info`
      }
      return (
        <Feather
          name={iconName}
          size={28}
          color={focused ? Colors.pageBackground : Colors.textColor}
        />
      )
    },
  }),
  // initialRouteName: __DEV__ ? "Storybook" : "Timetable",
  initialRouteName: `Timetable`,
  tabBarOptions: {
    activeBackgroundColor: Colors.accentColor,
    activeTintColor: Colors.pageBackground,
    bottomNavigationOptions: {
      backgroundColor: Colors.accentColor,
      labelColor: Colors.pageBackground,
      rippleColor: Colors.pageBackground,
    },
    inactiveBackgroundColor: Colors.tabBackground,
    inactiveTintColor: Colors.textColor,
    labelStyle: {
      fontFamily: `apercu`,
    },
    style: {
      backgroundColor: Colors.tabBackground,
      bottom: 0,
      // https://github.com/react-navigation/react-navigation/issues/5994
      // position: "absolute",
      height: 60,
      left: 0,
      right: 0,
    },
    tabStyle: {
      paddingBottom: 5,
      paddingTop: 5,
    },
  },
})
