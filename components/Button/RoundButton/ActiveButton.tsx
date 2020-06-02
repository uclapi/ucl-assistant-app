import { LinearGradient } from "expo-linear-gradient"
import React from "react"
import {
  GestureResponderEvent,
  Platform,
  StyleSheet,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"

import Colors from "../../../constants/Colors"
import Styles from "../../../styles/Button"

const allStyles = StyleSheet.create({
  transparent: {
    backgroundColor: `transparent`,
  },
})

interface Props {
  onPress?: (e: GestureResponderEvent) => void,
  loading?: boolean,
  styles?: ViewStyle,
  children: React.ReactElement,
  disabled?: boolean,
}

const Wrapper: React.FC<Props> = ({
  children,
  onPress = () => { },
  disabled = false,
}) => (Platform.OS === `android` ? (
  <View style={Styles.roundButtonWrapper}>
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.Ripple(
        Colors.accentColorLight,
        true,
      )}
      onPress={(e) => setTimeout(onPress, 200, e)}
      useForeground
      disabled={disabled}
    >
      {children}
    </TouchableNativeFeedback>
  </View>
) : (
    <TouchableOpacity
      style={allStyles.transparent}
      onPress={onPress}
      disabled={disabled}
    >
      {children}
    </TouchableOpacity>
))

export interface ActiveButtonProps {
  onPress?: (e: GestureResponderEvent) => void,
  styles?: ViewStyle,
  children?: React.ReactNode,
  disabled?: boolean,
}

const Button: React.FC<ActiveButtonProps> = ({
  onPress = () => { },
  styles,
  children = null,
  disabled = false,
}) => (
    <Wrapper onPress={onPress} disabled={disabled}>
      <LinearGradient
        colors={[Colors.accentColor, Colors.buttonBackground]}
        style={[Styles.roundButton, styles]}
        start={[0, 1]}
        end={[1, 0]}
      >
        {children}
      </LinearGradient>
    </Wrapper>
)

export default Button
