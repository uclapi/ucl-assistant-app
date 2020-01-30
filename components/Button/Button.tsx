import React, { Component } from "react"
import { ActivityIndicator, Platform } from "react-native"

import Colors from "../../constants/Colors"
import { ButtonText } from "../Typography"
import ActiveButton from "./ActiveButton"
import DisabledButton from "./DisabledButton"
import { defaultProps, propTypes } from "./props"

// eslint-disable-next-line react/prefer-stateless-function
class Button extends Component {
  static propTypes = propTypes;

  static defaultProps = defaultProps;

  render() {
    const { loading, disabled } = this.props
    let { children } = this.props
    const buttonSize = Platform.OS === `android` ? 24 : 1
    if (loading) {
      children = (
        <ActivityIndicator size={buttonSize} color={Colors.pageBackground} />
      )
    }
    if (typeof children === `string`) {
      children = (
        <ButtonText>
          {children}
          {` `}
        </ButtonText>
      )
    }
    if (disabled) {
      return (
        <DisabledButton {...this.props}>
          {` `}
          {children}
          {` `}
        </DisabledButton>
      )
    }
    return (
      <ActiveButton {...this.props}>
        {` `}
        {children}
        {` `}
      </ActiveButton>
    )
  }
}

export default Button
