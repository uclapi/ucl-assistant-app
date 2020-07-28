import React from 'react'
import { StyleProp, Text, TextStyle } from 'react-native'
import { TextProps } from 'react-native-svg'
import Style from "../../styles/Typography"

interface Props extends TextProps {
  style?: StyleProp<TextStyle>,
  children: React.ReactNode,
}

const BodyText: React.FunctionComponent<Props> = ({ children, style, ...props }) => (
  <Text style={[Style.bodyText, style]} {...props}>{children}</Text>
)

export default BodyText
