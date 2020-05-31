import React from "react"
import {
  GestureResponderEvent, TouchableNativeFeedback, View, ViewStyle,
} from "react-native"

import Styles from "../../../styles/Button"

interface DisabledButtonProps {
  onPress?: (e: GestureResponderEvent) => void,
  styles?: ViewStyle,
  children: React.ReactElement,
  disabled?: boolean,
}

const DisabledButton: React.FC<DisabledButtonProps> = ({
  onPress = () => { },
  styles,
  children,
  disabled = false,
}) => (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.SelectableBackground()}
      onPress={onPress}
      useForeground
      style={Styles.buttonWrapper}
      disabled={disabled}
    >
      <View style={[Styles.roundButton, Styles.disabled, styles]}>
        {children}
      </View>
    </TouchableNativeFeedback>
)

export default DisabledButton
