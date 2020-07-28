import React from "react"
import {
  StyleProp, Text, TextProps, TextStyle,
} from "react-native"
import Style from "../../styles/Typography"

interface Props extends TextProps {
  children: React.ReactElement | string,
  style?: StyleProp<TextStyle>,
}

const HeaderText: React.FunctionComponent<Props> = ({ children, style, ...props }) => (
  <Text style={[Style.headerText, style]} {...props}>{children}</Text>
)

export default HeaderText
