import React, { ReactNode } from 'react'
import {
  StyleProp, Text, TextProps, TextStyle,
} from 'react-native'
import Style from "../../styles/Typography"

interface Props extends TextProps {
  style?: StyleProp<TextStyle>,
  children: ReactNode | string,
}

const TitleText: React.FunctionComponent<Props> = ({
  children = null,
  style = {},
  ...props
}) => (
    <Text style={[Style.titleText, style]} {...props}>{children}</Text>
)

export default TitleText
