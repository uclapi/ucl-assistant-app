import { Feather } from "@expo/vector-icons"
import React from "react"
import { ActivityIndicator, Platform } from "react-native"

import Colors from "../../../constants/Colors"
import ActiveButton from "./ActiveButton"
import DisabledButton from "./DisabledButton"
import { defaultProps, propTypes } from "./props"

const RoundButton = (props) => {
  const { icon, loading, disabled } = props
  const buttonSize = Platform.OS === `android` ? 24 : 16
  let child = (
    <Feather size={buttonSize} name={icon} color={Colors.pageBackground} />
  )
  if (loading) {
    child = (
      <ActivityIndicator size={buttonSize} color={Colors.pageBackground} />
    )
  }
  if (disabled) {
    return <DisabledButton {...props}>{child}</DisabledButton>
  }
  return <ActiveButton {...props}>{child}</ActiveButton>
}

RoundButton.propTypes = propTypes
RoundButton.defaultProps = defaultProps

export default RoundButton
