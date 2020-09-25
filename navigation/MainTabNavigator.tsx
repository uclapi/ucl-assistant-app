import { Feather } from "@expo/vector-icons"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import React, { ReactElement } from "react"
import Colors from "../constants/Colors"
import SearchNavigator, { SearchNavigatorParamList } from "../screens/Search"
import SettingsNavigator from "../screens/Settings"
import type { SettingsNavigatorParamList } from "../screens/Settings/SettingsNavigator"
import TimetableNavigator from "../screens/Timetable"
import type { TimetableNavigatorParamList } from "../screens/Timetable/TimetableNavigator"
import Wiki from "../screens/Wiki"
import type { NestedNavigator } from "../types/uclapi"

export type MainTabNavigatorParamList = {
  Timetable: NestedNavigator<TimetableNavigatorParamList>,
  Settings: NestedNavigator<SettingsNavigatorParamList>,
  Wiki: undefined,
  Search: NestedNavigator<SearchNavigatorParamList>,
}

const Tab = createBottomTabNavigator<MainTabNavigatorParamList>()

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused }) => {
    let iconName
    switch (route.name) {
      case `Timetable`:
        iconName = `calendar`
        break
      case `Search`:
        iconName = `search`
        break
      case `Settings`:
        iconName = `settings`
        break
      case `Wiki`:
        iconName = `book-open`
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
      name="Search"
      component={SearchNavigator}
    />
    <Tab.Screen
      name="Wiki"
      component={Wiki}
    />
    <Tab.Screen
      name="Settings"
      component={SettingsNavigator}
    />
  </Tab.Navigator>
)

export default MainTabNavigator
