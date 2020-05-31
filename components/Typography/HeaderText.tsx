import React from "react"
import {
  Text, TextStyle,
} from "react-native"

import Style from "../../styles/Typography"

const defaultProps = {
  children: <></>,
  style: {},
}

interface Props {
  children: React.ReactElement,
  style: TextStyle,
}

const HeaderText: React.FunctionComponent<Props> = ({ children, style }) => (
  <Text style={[Style.headerText, style]}>{children}</Text>
)
HeaderText.defaultProps = defaultProps

export default HeaderText
