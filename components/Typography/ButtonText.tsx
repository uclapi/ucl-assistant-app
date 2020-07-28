import React from 'react'
import {
  StyleProp, Text, TextProps, TextStyle,
} from 'react-native'
import Style from "../../styles/Typography"

interface Props extends TextProps {
  style?: StyleProp<TextStyle>,
  children: React.ReactElement | string,
}

const ButtonText: React.FunctionComponent<Props> = ({ children, style, ...props }) => (
  <Text style={[Style.buttonText, style]} {...props}>{children}</Text>
)

export default ButtonText
