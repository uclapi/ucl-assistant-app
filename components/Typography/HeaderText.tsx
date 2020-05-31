import React from "react"
import {
  Text, TextStyle,
} from "react-native"

import Style from "../../styles/Typography"

interface Props {
  children: React.ReactElement | string,
  style?: TextStyle,
}

const HeaderText: React.FunctionComponent<Props> = ({ children, style }) => (
  <Text style={[Style.headerText, style]}>{children}</Text>
)

export default HeaderText
