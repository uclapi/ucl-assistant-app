import React from "react"
import { TextInput, TextInputProps, ViewStyle } from "react-native"

import Colors from "../../../constants/Colors"
import styles from "../../../styles/Input"

export interface Props extends TextInputProps {
  style?: ViewStyle,
}

const TextInputComponent: React.FC<Props> = ({ style, ...otherProps }) => (
  <TextInput
    {...otherProps}
    underlineColorAndroid="transparent"
    style={[styles.textInput, style]}
    placeholderTextColor={Colors.lightTextColor}
  />
)

export default TextInputComponent
