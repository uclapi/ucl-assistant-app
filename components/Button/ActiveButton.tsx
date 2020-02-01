import { LinearGradient } from "expo-linear-gradient"
import _ from "lodash"
import React from "react"
import {
  GestureResponderEvent,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
  ViewStyle,
} from "react-native"

import Colors from "../../constants/Colors"
import Styles from "../../styles/Button"
import { defaultProps } from "./props"

interface WrapperProps {
  children: any,
  disabled: boolean,
  loading: boolean,
  onPress: (event: GestureResponderEvent) => void,
  style: ViewStyle,
}

class Wrapper extends React.Component<WrapperProps, {}> {
  debouncedOnPress = _.debounce((event) => {
    const { onPress } = this.props
    onPress(event)
  }, 200)

  static defaultProps = defaultProps

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

interface ActiveButtonProps {
  onPress: Function,
  style: ViewStyle,
  children: any,
  disabled: boolean,
}

const ActiveButton = ({
  onPress, style, children, disabled,
}): React.Component<ActiveButtonProps> => (
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

ActiveButton.defaultProps = defaultProps

export default ActiveButton
