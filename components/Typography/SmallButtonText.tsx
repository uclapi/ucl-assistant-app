import React from 'react'
import {
  StyleProp, Text, TextProps, TextStyle,
} from 'react-native'
import Style from "../../styles/Typography"

interface Props extends TextProps {
  style?: StyleProp<TextStyle>,
  children: React.ReactNode | string,
}

const SmallButtonText: React.FC<Props> = ({
  children, style, ...props
}) => (
    <Text style={[Style.smallButtonText, style]} {...props}>{children}</Text>
)

export default SmallButtonText
