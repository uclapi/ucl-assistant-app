
import { Feather } from "@expo/vector-icons"
import React from "react"
import { ActivityIndicator, Platform } from "react-native"

import Colors from "../../../constants/Colors"
import ActiveButton from "./ActiveButton"
import DisabledButton from "./DisabledButton"

export interface RoundButtonProps {
  icon: string,
  loading: boolean,
  disabled: boolean,
}

const RoundButton: React.FC<RoundButtonProps> = ({
  icon = `info`,
  loading = false,
  disabled = false,
  ...otherProps
}) => {
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
    return <DisabledButton {...otherProps}>{child}</DisabledButton>
  }
  return <ActiveButton {...otherProps}>{child}</ActiveButton>
}

export default RoundButton
