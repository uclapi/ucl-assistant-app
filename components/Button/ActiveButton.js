import { LinearGradient } from "expo-linear-gradient"
import _ from "lodash"
import React from "react"
import {
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native"

import Colors from "../../constants/Colors"
import Styles from "../../styles/Button"
import { defaultProps, propTypes } from "./props"

class Wrapper extends React.Component {
  debouncedOnPress = _.debounce(this.onPress, 200)

  static propTypes = propTypes

  static defaultProps = defaultProps

  onPress = (event) => {
    const { onPress } = this.props
    onPress(event)
  }

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

const Button = ({
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

Button.propTypes = propTypes
Button.defaultProps = defaultProps

export default Button
