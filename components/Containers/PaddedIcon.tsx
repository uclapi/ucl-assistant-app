import { Feather } from "@expo/vector-icons"
import React from 'react'
import { StyleSheet } from 'react-native'
import type { IconProps } from "react-native-vector-icons/Icon"

const styles = StyleSheet.create({
  paddedIcon: {
    marginLeft: 5,
    marginRight: 5,
  },
})

// eslint-disable-next-line quotes
const PaddedIcon: React.FC<IconProps> = (props) => (
  <Feather {...props} style={styles.paddedIcon} />
)

export default PaddedIcon
