import React from 'react'
import { Text, TextStyle } from 'react-native'

import Style from "../../styles/Typography"

interface Props {
  style?: TextStyle,
  children: React.ReactElement | string,
}

const ButtonText: React.FunctionComponent<Props> = ({ children, style }) => (
  <Text style={[Style.buttonText, style]}>{children}</Text>
)

export default ButtonText
