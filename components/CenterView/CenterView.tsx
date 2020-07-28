import React from "react"
import { StyleSheet, View, ViewProps } from "react-native"

const styles = StyleSheet.create({
  main: {
    alignItems: `center`,
    backgroundColor: `#F5FCFF`,
    flex: 1,
    justifyContent: `center`,
  },
})

interface Props extends ViewProps {
  children: React.ReactNode,
}

const CenterView: React.FC<Props> = ({ children, ...otherProps }) => (
  <View style={styles.main} {...otherProps}>{children}</View>
)

export default CenterView
