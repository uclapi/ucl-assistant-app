import { Feather } from "@expo/vector-icons"
import React from 'react'
import { StyleSheet } from 'react-native'

import type { IconProps } from "../../types/uclapi"
import type { FeatherIconType } from "../../types/icons"

interface FeatherIconProps extends Omit<IconProps, `name`> {
  name: FeatherIconType,
}

const styles = StyleSheet.create({
  paddedIcon: {
    marginLeft: 5,
    marginRight: 5,
  },
})

// eslint-disable-next-line quotes
const PaddedIcon: React.FC<FeatherIconProps> = (props) => (
  <Feather {...props} style={styles.paddedIcon} />
)

export default PaddedIcon
