import React from "react"
import { TouchableNativeFeedback, View, ViewStyle } from "react-native"

import Styles from "../../styles/Button"

interface DisabledButtonProps {
  style: ViewStyle,
  children: React.ReactNode,
}

const DisabledButton: React.FC<DisabledButtonProps> = ({
  style,
  children,
}) => (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.SelectableBackground()}
      useForeground
      style={Styles.buttonWrapper}
      disabled
    >
      <View style={[Styles.button, Styles.disabled, style]}>{children}</View>
    </TouchableNativeFeedback>
)

export default DisabledButton
