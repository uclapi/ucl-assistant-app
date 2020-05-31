import React, { ReactElement } from 'react'
import { Text, TextStyle } from 'react-native'

import Style from "../../styles/Typography"

interface Props {
  style?: TextStyle,
  children: ReactElement | string,
}

const TitleText: React.FunctionComponent<Props> = (
  { children = null, style = {} },
) => (
    <Text style={[Style.titleText, style]}>{children}</Text>
)

export default TitleText
