import React from "react"
import { ActivityIndicator, Platform } from "react-native"

import Colors from "../../constants/Colors"
import { ButtonText } from "../Typography"
import ActiveButton, { ActiveButtonProps } from "./ActiveButton"
import DisabledButton from "./DisabledButton"

export interface ButtonProps extends ActiveButtonProps {
  loading?: boolean,
}

const Button: React.FC<ButtonProps> = ({
  loading = false,
  disabled = false,
  children,
  ...otherProps
}) => {
  const buttonSize = Platform.OS === `android` ? 24 : 1
  let innerComponent = children
  if (typeof children === `string`) {
    innerComponent = (
      <ButtonText>
        {children}
      </ButtonText>
    )
  }
  if (loading) {
    innerComponent = (
      <ActivityIndicator size={buttonSize} color={Colors.pageBackground} />
    )
  }
  if (disabled) {
    return (
      <DisabledButton {...otherProps}>
        {innerComponent}
      </DisabledButton>
    )
  }
  return (
    <ActiveButton {...otherProps}>
      {innerComponent}
    </ActiveButton>
  )
}

export default Button
