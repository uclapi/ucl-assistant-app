import React from 'react'
import { Text, TextProps, TextStyle } from 'react-native'
import Style from "../../styles/Typography"

interface Props extends TextProps {
  style?: TextStyle,
  children: React.ReactElement | string,
}

const ButtonText: React.FunctionComponent<Props> = ({ children, style, ...otherProps }) => (
  <Text style={[Style.buttonText, style]} {...otherProps}>{children}</Text>
)

export default ButtonText
