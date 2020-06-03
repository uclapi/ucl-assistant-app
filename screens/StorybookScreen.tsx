import { Feather } from "@expo/vector-icons"
import React from "react"
import { View } from "react-native"

import Colors from "../constants/Colors"
import StorybookUI from "../storybook"

class StorybookScreen extends React.Component {
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
      <View>
        <StorybookUI />
      </View>
    )
  }
}

export default StorybookScreen
