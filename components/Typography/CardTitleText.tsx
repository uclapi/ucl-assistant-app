import React from 'react'
import {
  Text, TextStyle, View, ViewStyle,
} from 'react-native'

import Style from "../../styles/Typography"


interface Props {
  containerStyle: ViewStyle,
  style: TextStyle,
  viewStyle: ViewStyle,
  children: React.ReactElement,
}

const CardTitleText: React.FunctionComponent<Props> = ({
  children, style, containerStyle, viewStyle,
}) => (
    <View style={containerStyle}>
      <Text style={[Style.cardTitle, style]}>{children}</Text>
      <View style={[Style.cardTitleRect, viewStyle]} />
    </View>
)

export default CardTitleText
