import { Entypo } from "@expo/vector-icons"
import React from "react"
import ActionButton from "react-native-action-button"

import Colors from "../../../constants/Colors"

interface Props {
  active?: boolean,
  activeButtonColor?: string,
  activeIcon?: string,
  activeIconColor?: string,
  buttonColor: string,
  icon?: string,
  iconColor?: string,
  onPress?: () => void
}

class FloatingButton extends React.Component<Props> {
  public static defaultProps = {
    active: false,
    activeButtonColor: Colors.disabledButtonBackground,
    activeIcon: `heart`,
    activeIconColor: Colors.errorColor,
    buttonColor: Colors.errorColor,
    icon: `heart-outlined`,
    iconColor: Colors.pageBackground,
    onPress: (): void => { },
  }

  renderIcon = () => {
    const {
      active,
      activeIcon,
      icon,
      iconColor,
      activeIconColor,
    } = this.props
    return (
      <Entypo
        name={active ? activeIcon : icon}
        size={24}
        color={active ? activeIconColor : iconColor}
      />
    )
  }

  render() {
    const {
      active,
      onPress,
      activeButtonColor,
      buttonColor,
    } = this.props
    return (
      <ActionButton
        buttonColor={
          active ? activeButtonColor : buttonColor
        }
        position="right"
        onPress={onPress}
        fixNativeFeedbackRadius
        buttonText="Favourite"
        renderIcon={this.renderIcon}
      />
    )
  }
}

export default FloatingButton
