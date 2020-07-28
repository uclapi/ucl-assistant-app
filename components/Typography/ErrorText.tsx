import { Feather } from "@expo/vector-icons"
import React from 'react'
import {
  StyleProp, StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native'
import { TextProps } from "react-native-svg"
import Colors from "../../constants/Colors"
import Style from "../../styles/Typography"
import { Horizontal } from "../Containers"

interface Props extends TextProps {
  containerStyle?: StyleProp<ViewStyle>,
  style?: StyleProp<TextStyle>,
  children: React.ReactNode,
}

const ErrorText: React.FunctionComponent<Props> = ({
  children, style, containerStyle, ...otherProps
}) => (
    <Horizontal style={StyleSheet.flatten([Style.infoTextContainer, containerStyle])}>
      <Feather size={18} color={Colors.errorColor} name="alert-circle" />
      <Text style={[Style.errorText, style]} {...otherProps}>{children}</Text>
    </Horizontal>
)

export default ErrorText
