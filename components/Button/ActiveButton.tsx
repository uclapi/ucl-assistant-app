import { LinearGradient } from "expo-linear-gradient"
import _ from "lodash"
import React from "react"
import {
  GestureResponderEvent,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  ViewProps,
  ViewStyle,
} from "react-native"

import Colors from "../../constants/Colors"
import Styles from "../../styles/Button"

interface WrapperProps {
  children: React.ReactNode,
  disabled?: boolean,
  loading?: boolean,
  onPress: (event: GestureResponderEvent) => void,
  style?: ViewStyle,
}

class Wrapper extends React.Component<WrapperProps> {
  debouncedOnPress = _.debounce((event) => {
    const { onPress } = this.props
    onPress(event)
  }, 200)

  render() {
    const { children, onPress, disabled } = this.props
    if (Platform.OS === `android`) {
      return (
        <TouchableNativeFeedback
          background={
            TouchableNativeFeedback.Ripple(Colors.accentColorLight, true)
          }
          onPress={this.debouncedOnPress}
          useForeground
          style={Styles.buttonWrapper}
          disabled={disabled}
        >
          {children}
        </TouchableNativeFeedback>
      )
    }
    if (Platform.OS === `ios`) {
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
