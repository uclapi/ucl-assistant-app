import React from 'react'
import { ActivityIndicator, Platform } from "react-native"

import Colors from "../../constants/Colors"
import Styles from "../../styles/Button"
import { SmallButtonText } from "../Typography"
import ActiveButton, { ActiveButtonProps } from "./ActiveButton"
import DisabledButton from "./DisabledButton"

// https://github.com/microsoft/TypeScript/issues/29331
// eslint-disable-next-line quotes
interface Props extends Omit<ActiveButtonProps, "children"> {
  loading?: boolean,
  children: React.ReactNode,
}

const SmallButton: React.FC<Props> = (props) => {
  let {
    children,
  } = props
  const {
    loading,
    disabled,
    ...otherProps
  } = props
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
      <DisabledButton {...otherProps} style={Styles.smallButton}>
        {children}
      </DisabledButton>
    )
  }
  return (
    <ActiveButton {...otherProps} style={Styles.smallButton}>
      {children}
    </ActiveButton>
  )
}

export default SmallButton
