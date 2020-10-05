import { Feather } from "@expo/vector-icons"
import React from 'react'
import { StyleSheet } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { SafeAreaView } from "react-native-safe-area-context"
import { NestedNavigator } from '../../types/uclapi'
import PeopleNavigator, { PeopleNavigatorParamList } from '../People'
import RoomsNavigator, { RoomsNavigatorParamList } from '../Rooms/RoomsNavigator'
import StudySpacesNavigator, { StudySpacesNavigatorParamList } from '../StudySpaces'
import Colors from "../../constants/Colors"

export type SearchNavigatorParamList = {
  StudySpaces: NestedNavigator<StudySpacesNavigatorParamList>,
  People: NestedNavigator<PeopleNavigatorParamList>,
  Rooms: NestedNavigator<RoomsNavigatorParamList>,
}

const Tab = createMaterialTopTabNavigator()

const screenOptions = ({ route }) => ({
  tabBarIcon: ({ focused }) => {
    let iconName
    switch (route.name) {
      case `StudySpaces`:
        iconName = `book`
        break
      case `People`:
        iconName = `users`
        break
      case `Rooms`:
        iconName = `map-pin`
        break
      default:
        iconName = `info`
    }
    return (
      <Feather
        name={iconName}
        size={20}
        color={focused ? Colors.accentColor : Colors.textColor}
      />
    )
  },
})

const tabBarOptions = {
  activeTintColor: Colors.accentColor,
  allowFontScaling: false,
  inactiveTintColor: Colors.textColor,
  indicatorStyle: {
    backgroundColor: Colors.accentColor,
  },
  labelStyle: {
    fontFamily: `apercu`,
  },
  showIcon: true,
  showLabel: false,
  tabStyle: {
    paddingBottom: 5,
    paddingTop: 5,
  },
}

const styles = StyleSheet.create({
  safeAreaView: { flex: 1 },
})

const SearchNavigator: React.FC = () => (
  <SafeAreaView style={styles.safeAreaView}>
    <Tab.Navigator
      screenOptions={screenOptions}
      initialRouteName="StudySpaces"
      tabBarOptions={tabBarOptions}
    >
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
    </Tab.Navigator>
  </SafeAreaView>
)

export default SearchNavigator
