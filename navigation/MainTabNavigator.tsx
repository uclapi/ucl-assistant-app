import { Feather } from "@expo/vector-icons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import React, { ReactElement } from "react"
import Colors from "../constants/Colors"
import PeopleNavigator from "../screens/People"
import type { PeopleNavigatorParamList } from "../screens/People/PeopleNavigator"
import RoomsNavigator from "../screens/Rooms"
import type { RoomsNavigatorParamList } from "../screens/Rooms/RoomsNavigator"
import SettingsNavigator from "../screens/Settings"
import type { SettingsNavigatorParamList } from "../screens/Settings/SettingsNavigator"
import StudySpacesNavigator from "../screens/StudySpaces"
import type { StudySpacesNavigatorParamList } from "../screens/StudySpaces/StudySpacesNavigator"
import TimetableNavigator from "../screens/Timetable"
import type { TimetableNavigatorParamList } from "../screens/Timetable/TimetableNavigator"
import type { NestedNavigator } from "../types/uclapi"

export type MainTabNavigatorParamList = {
  Timetable: NestedNavigator<TimetableNavigatorParamList>,
  StudySpaces: NestedNavigator<StudySpacesNavigatorParamList>,
  People: NestedNavigator<PeopleNavigatorParamList>,
  Rooms: NestedNavigator<RoomsNavigatorParamList>,
  Settings: NestedNavigator<SettingsNavigatorParamList>,
}

const Tab = createBottomTabNavigator<MainTabNavigatorParamList>()

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
  labelStyle: {
    fontFamily: `apercu`,
  },
  style: {
    backgroundColor: Colors.tabBackground,
    bottom: 0,
    height: 60,
    left: 0,
    right: 0,
  },
  tabStyle: {
    paddingBottom: 5,
    paddingTop: 5,
  },
}

const MainTabNavigator = (): ReactElement => (
  <Tab.Navigator
    screenOptions={screenOptions}
    initialRouteName="Timetable"
    tabBarOptions={tabBarOptions}
  >
    <Tab.Screen
      name="Timetable"
      component={TimetableNavigator}
    />
    <Tab.Screen
      name="StudySpaces"
      component={StudySpacesNavigator}
    />
    <Tab.Screen
      name="People"
      component={PeopleNavigator}
    />
    <Tab.Screen
      name="Rooms"
      component={RoomsNavigator}
    />
    <Tab.Screen
      name="Settings"
      component={SettingsNavigator}
    />
  </Tab.Navigator>
)

export default MainTabNavigator
