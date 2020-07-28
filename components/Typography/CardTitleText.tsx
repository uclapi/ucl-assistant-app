import React from 'react'
import {
  StyleProp, Text, TextStyle, View, ViewStyle,
} from 'react-native'
import Style from "../../styles/Typography"

interface Props extends TextStyle {
  containerStyle?: StyleProp<ViewStyle>,
  style?: StyleProp<TextStyle>,
  viewStyle?: StyleProp<ViewStyle>,
  children: React.ReactElement | string,
}

const CardTitleText: React.FunctionComponent<Props> = ({
  children, style, containerStyle, viewStyle, ...props
}) => (
    <View style={containerStyle}>
      <Text style={[Style.cardTitle, style]} {...props}>{children}</Text>
      <View style={[Style.cardTitleRect, viewStyle]} />
    </View>
)

export default CardTitleText
