import React from 'react'
import {
  StyleSheet, View, ViewProps, ViewStyle,
} from 'react-native'

const styles = StyleSheet.create({
  horizontal: {
    alignItems: `center`,
    flexDirection: `row`,
    justifyContent: `center`,
  },
})

interface Props extends ViewProps {
  style?: ViewStyle,
  children: React.ReactNode,
}

const Horizontal: React.FC<Props> = ({ children, style, ...otherProps }) => (
  <View style={[styles.horizontal, style]} {...otherProps}>{children}</View>
)

export default Horizontal
