/* eslint-disable react-native/no-inline-styles */
import React from "react"
import { View } from "react-native"

import { Horizontal } from "../../../components/Containers"
import { BodyText } from "../../../components/Typography"
import TextStyle from "../../../styles/Typography"

const OpeningHours = (): React.ReactElement => (
  <View>
    <Horizontal style={{ justifyContent: `space-between` }}>
      <BodyText>Mon - Thurs</BodyText>
      <BodyText>00:00 - 00:00</BodyText>
    </Horizontal>
    <Horizontal style={{ justifyContent: `space-between` }}>
      <BodyText style={TextStyle.bold}>Fri</BodyText>
      <BodyText style={TextStyle.bold}>00:00 - 22:00</BodyText>
    </Horizontal>
    <Horizontal style={{ justifyContent: `space-between` }}>
      <BodyText>Sat</BodyText>
      <BodyText>08:00 - 20:00</BodyText>
    </Horizontal>
    <Horizontal style={{ justifyContent: `space-between` }}>
      <BodyText>Sun</BodyText>
      <BodyText>10:00 - 19:00</BodyText>
    </Horizontal>
  </View>
)

export default OpeningHours
