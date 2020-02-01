import { Feather } from "@expo/vector-icons"
import React, { Component } from "react"
import { View } from "react-native"

import Colors from "../constants/Colors"
import StorybookUI from "../storybook"
import Styles from "../styles/Containers"

class StorybookScreen extends Component {
  static navigationOptions = {
    headerShown: false,
    tabBarIcon: ({ focused }) => (
      <Feather
        name="layers"
        size={28}
        color={focused ? Colors.pageBackground : Colors.textColor}
      />
    ),
    title: `Components`,
  }

  render() {
    return (
      <View style={[Styles.pageScrollContainer, Styles.mainTabPage]}>
        <StorybookUI />
      </View>
    )
  }
}

export default StorybookScreen
