import { Feather } from "@expo/vector-icons"
import React from 'react'
import { StyleSheet, View } from 'react-native'

import Colors from "../../constants/Colors"
import type { IconProps } from "../../types/uclapi"

const styles = StyleSheet.create({
  circularIcon: {
    backgroundColor: Colors.textInputBackground,
    borderRadius: 80,
    marginRight: 10,
    padding: 10,
  },
})

// eslint-disable-next-line quotes
const CircularIcon: React.FC<IconProps> = (props) => (
  <View style={styles.circularIcon}>
    <Feather {...props} />
  </View>
)

export default CircularIcon
