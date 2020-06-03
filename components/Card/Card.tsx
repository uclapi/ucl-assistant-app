import React from 'react'
import { GestureResponderEvent, View } from 'react-native'

import Style from "../../styles/Containers"
import { BodyText, CardTitleText } from "../Typography"
import Wrapper from './Wrapper'

interface Props {
  children: React.ReactNode,
  title?: string,
  old?: boolean,
  onPress?: (e: GestureResponderEvent) => void,
}

const Card: React.FC<Props> = ({
  children,
  title = ``,
  old = false,
  onPress = () => { },
}) => (
    <Wrapper onPress={onPress}>
      <View style={old ? Style.oldCard : Style.card}>
        {title && <CardTitleText>{title}</CardTitleText>}
        {
          typeof children === `string`
            ? (<BodyText>{children}</BodyText>)
            : children
        }
      </View>
    </Wrapper>
)

export default Card
