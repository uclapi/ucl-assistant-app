import { LinearGradient } from "expo-linear-gradient"
import React from "react"
import {
  StyleProp, StyleSheet, ViewProps, ViewStyle,
} from "react-native"
import Colors from "../constants/Colors"
import Style from "../styles/Containers"
import { BodyText } from "./Typography"

const styles = StyleSheet.create({
  text: {
    color: Colors.pageBackground,
  },
})

interface Props extends ViewProps {
  children?: React.ReactNode,
  style?: StyleProp<ViewStyle>,
}

const LiveIndicator: React.FC<Props> = ({ children = `LIVE`, style = {} }) => (
  <LinearGradient
    colors={[Colors.errorColor, Colors.indicatorOrange]}
    start={[0, 1]}
    end={[1, 0]}
    style={[Style.liveIndicator, style]}
  >
    <BodyText style={styles.text}>{children}</BodyText>
  </LinearGradient>
)

export default LiveIndicator
