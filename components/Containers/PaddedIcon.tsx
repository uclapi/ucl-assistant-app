import { Feather } from "@expo/vector-icons"
import { IconProps } from "@expo/vector-icons/build/createIconSet"
import React from 'react'
import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  paddedIcon: {
    marginLeft: 5,
    marginRight: 5,
  },
})

// eslint-disable-next-line quotes
const PaddedIcon: React.FC<IconProps<"Feather">> = (props) => (
  <Feather {...props} style={styles.paddedIcon} />
)

export default PaddedIcon
