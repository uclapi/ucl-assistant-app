import { Feather } from "@expo/vector-icons"
import React from 'react'
import {
  Text, TextStyle, ViewStyle,
} from 'react-native'

import Colors from "../../constants/Colors"
import Style from "../../styles/Typography"
import { Horizontal } from "../Containers"


interface Props {
  containerStyle: ViewStyle,
  style: TextStyle,
  children: React.ReactElement,
}

const ErrorText: React.FunctionComponent<Props> = ({
  children, style, containerStyle,
}) => (
    <Horizontal style={[Style.infoTextContainer, containerStyle]}>
      <Feather size={18} color={Colors.errorColor} name="alert-circle" />
      <Text style={[Style.errorText, style]}>{children}</Text>
    </Horizontal>
)

export default ErrorText
