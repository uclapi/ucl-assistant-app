import { Feather } from "@expo/vector-icons"
import React from 'react'
import {
  StyleProp, StyleSheet,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native'
import Colors from "../../constants/Colors"
import Style from "../../styles/Typography"
import { Horizontal } from "../Containers"
import type { FeatherIconType } from "../../types/icons"

interface Props extends TextStyle {
  containerStyle?: StyleProp<ViewStyle>,
  style?: StyleProp<TextStyle>,
  children: React.ReactNode,
  icon?: FeatherIconType,
}

const InfoText: React.FunctionComponent<Props> = ({
  children, icon = `info`, style, containerStyle, ...props
}) => (
    <Horizontal style={StyleSheet.flatten([Style.infoTextContainer, containerStyle])}>
      <Feather size={18} color={Colors.infoColor} name={icon} />
      <Text style={[Style.infoText, style]} {...props}>{children}</Text>
    </Horizontal>
)

export default InfoText
