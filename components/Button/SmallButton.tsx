import React from 'react'
import { ActivityIndicator, Platform } from "react-native"

import Colors from "../../constants/Colors"
import { SmallButtonText } from "../Typography"
import DisabledButton from "./DisabledButton"
import Styles from "../../styles/Button"
import ActiveButton from "./ActiveButton"

interface Props {
  loading: boolean,
  disabled: boolean
}

const SmallButton: React.FC<Props> = (props) => {
  const { loading, disabled } = props
  let { children } = props
  const buttonSize = Platform.OS === `android` ? 24 : 1
  if (loading) {
    children = (
      <ActivityIndicator size={buttonSize} color={Colors.pageBackground} />
    )
  }
  if (typeof children === `string`) {
    children = <SmallButtonText>{children}</SmallButtonText>
  }
  if (disabled) {
    return (
      <DisabledButton {...props} style={Styles.smallButton}>
        {children}
      </DisabledButton>
    )
  }
  return (
    <ActiveButton {...props} style={Styles.smallButton}>
      {children}
    </ActiveButton>
  )
}

export default SmallButton
