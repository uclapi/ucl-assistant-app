import React from 'react'
import { StyleProp, Text, TextStyle } from 'react-native'
import { TextProps } from 'react-native-svg'
import Style from "../../styles/Typography"

interface Props extends TextProps {
  style?: StyleProp<TextStyle>,
  children: React.ReactNode,
}

const CentredText: React.FunctionComponent<Props> = ({ children, style }) => (
  <Text style={[Style.centredText, style]}>{children}</Text>
)

export default CentredText
