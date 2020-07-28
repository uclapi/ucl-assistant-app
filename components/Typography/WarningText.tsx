import { Feather } from "@expo/vector-icons"
import React from 'react'
import {
  StyleProp, StyleSheet,
  Text,

  TextProps, TextStyle,
  ViewStyle,
} from 'react-native'
import Colors from "../../constants/Colors"
import Style from "../../styles/Typography"
import { Horizontal } from "../Containers"

interface Props extends TextProps {
  containerStyle?: StyleProp<ViewStyle>,
  style?: StyleProp<TextStyle>,
  children: React.ReactNode | string,
  icon?: string,
}

const WarningText: React.FC<Props> = ({
  children, icon = `info`, style, containerStyle, ...props
}) => (
    <Horizontal style={StyleSheet.flatten([Style.infoTextContainer, containerStyle])}>
      <Feather size={18} color={Colors.warningColor} name={icon} />
      <Text style={[Style.warningText, style]} {...props}>{children}</Text>
    </Horizontal>
)

export default WarningText
