import { LinearGradient } from "expo-linear-gradient"
import _ from "lodash"
import React, { useCallback } from "react"
import {
  GestureResponderEvent,
  TouchableNativeFeedback,
  TouchableOpacity,
  ViewProps,
  ViewStyle
} from "react-native"
import Colors from "../../constants/Colors"
import { DeviceManager } from "../../lib"
import Styles from "../../styles/Button"

interface WrapperProps {
  children: React.ReactNode,
  disabled?: boolean,
  loading?: boolean,
  onPress: (event: GestureResponderEvent) => void,
  style?: ViewStyle,
}

const Wrapper: React.FC<WrapperProps> = ({ children, onPress, disabled }) => {
  const debouncedOnPress = useCallback(_.debounce((event: GestureResponderEvent) => {
    onPress(event)
  }, 200), [onPress])
  if (DeviceManager.isAndroid) {
    return (
      <TouchableNativeFeedback
        background={
          TouchableNativeFeedback.Ripple(Colors.accentColorLight, true)
        }
        onPress={debouncedOnPress}
        useForeground
        style={Styles.buttonWrapper}
        disabled={disabled}
      >
        {children}
      </TouchableNativeFeedback>
    )
  }
  if (DeviceManager.isiOS || DeviceManager.isWeb) {
    return (
      <TouchableOpacity
        style={{ backgroundColor: `transparent` }}
        onPress={onPress}
        disabled={disabled}
      >
        {children}
      </TouchableOpacity>
    )
  }
  return null
}

export interface ActiveButtonProps extends ViewProps {
  onPress?: (event: GestureResponderEvent) => void,
  style?: ViewStyle,
  children: React.ReactNode,
  disabled?: boolean,
}

const ActiveButton: React.FC<ActiveButtonProps> = ({
  onPress, style, children, disabled,
}) => (
    <Wrapper onPress={onPress} disabled={disabled}>
      <LinearGradient
        colors={[Colors.accentColor, Colors.buttonBackground]}
        style={[Styles.button, style]}
        start={[0, 1]}
        end={[1, 0]}
      >
        {children}
      </LinearGradient>
    </Wrapper>
)

export default ActiveButton
