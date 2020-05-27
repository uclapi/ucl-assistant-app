import { Feather } from "@expo/vector-icons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import React from "react"

import Colors from "../constants/Colors"
import PeopleScreen from "../screens/PeopleScreen"
import RoomsScreen from "../screens/RoomsScreen"
import SettingsScreen from "../screens/SettingsScreen"
import StudySpacesScreen from "../screens/StudySpacesScreen"
import TimetableScreen from "../screens/TimetableScreen"

const Tab = createBottomTabNavigator()

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused }) => {
    let iconName
    switch (route.name) {
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
})

const tabBarOptions = {
  activeBackgroundColor: Colors.accentColor,
  activeTintColor: Colors.pageBackground,
  allowFontScaling: false,
  bottomNavigationOptions: {
    backgroundColor: Colors.accentColor,
    labelColor: Colors.pageBackground,
    rippleColor: Colors.pageBackground,
  },
  inactiveBackgroundColor: Colors.tabBackground,
  inactiveTintColor: Colors.textColor,
  keyboardHidesTabBar: true,
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
}


const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={screenOptions}
    initialRouteName="Timetable"
    tabBarOptions={tabBarOptions}
  >
    <Tab.Screen
      name="Timetable"
      component={TimetableScreen}
    />
    <Tab.Screen
      name="StudySpaces"
      component={StudySpacesScreen}
    />
    <Tab.Screen
      name="People"
      component={PeopleScreen}
    />
    <Tab.Screen
      name="Rooms"
      component={RoomsScreen}
    />
    <Tab.Screen
      name="Settings"
      component={SettingsScreen}
    />
  </Tab.Navigator>
)

export default MainTabNavigator
