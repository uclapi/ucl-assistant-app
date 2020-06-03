import React from "react"
import { StyleSheet, View } from "react-native"


const styles = StyleSheet.create({
  main: {
    alignItems: `center`,
    backgroundColor: `#F5FCFF`,
    flex: 1,
    justifyContent: `center`,
  },
})

interface Props {
  children: React.ReactNode,
}

const CenterView: React.FC<Props> = ({ children }) => (
  <View style={styles.main}>{children}</View>
)

export default CenterView
