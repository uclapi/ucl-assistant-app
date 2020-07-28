import React from 'react'
import {
  StyleProp, Text, TextProps, TextStyle,
} from 'react-native'
import Style from "../../styles/Typography"

interface Props extends TextProps {
  style?: StyleProp<TextStyle>,
  children: React.ReactElement | string,
}

const SubtitleText: React.FC<Props> = ({ children, style, ...props }) => (
  <Text style={[Style.subtitleText, style]} {...props}>{children}</Text>
)

export default SubtitleText
