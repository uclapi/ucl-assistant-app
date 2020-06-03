import { Entypo } from "@expo/vector-icons"
import React from "react"
import ActionButton from "react-native-action-button"

import Colors from "../../../constants/Colors"
import { ActiveButtonProps } from "../ActiveButton"

export interface FloatingButtonProps extends Omit<
  ActiveButtonProps,
  // eslint-disable-next-line quotes
  'children'
  > {
  active?: boolean,
  activeButtonColor?: string,
  activeIcon?: string,
  activeIconColor?: string,
  buttonColor?: string,
  icon?: string,
  iconColor?: string,
  onPress?: () => void,
  offsetY?: number,
}

class FloatingButton extends React.Component<FloatingButtonProps> {
  renderIcon = (): React.ReactElement => {
    const {
      active = false,
      activeIcon = `heart`,
      icon = `heart-outlined`,
      iconColor = Colors.pageBackground,
      activeIconColor = Colors.errorColor,
    } = this.props
    return (
      <Entypo
        name={active ? activeIcon : icon}
        size={24}
        color={active ? activeIconColor : iconColor}
      />
    )
  }

  render(): React.ReactElement {
    const {
      active = false,
      onPress = () => null,
      activeButtonColor = Colors.disabledButtonBackground,
      buttonColor = Colors.errorColor,
      offsetY = 80,
      ...otherProps
    } = this.props
    return (
      <ActionButton
        {...otherProps}
        buttonColor={
          active ? activeButtonColor : buttonColor
        }
        position="right"
        onPress={onPress}
        fixNativeFeedbackRadius
        buttonText="Favourite"
        renderIcon={this.renderIcon}
        offsetY={offsetY}
      />
    )
  }
}

export default FloatingButton
