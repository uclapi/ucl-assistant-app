import React from "react"
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native"

import Colors from "../../constants/Colors"
import WebBrowserManager from "../../lib/WebBrowserManager"
import Style from "../../styles/Typography"

const styles = StyleSheet.create({
  linkText: {
    color: Colors.linkBlue,
  },
})

interface Props {
  children: React.ReactElement,
  containerStyle: ViewStyle,
  href: string,
  onPress: () => void,
  style: TextStyle,
}

class Link extends React.Component<Props> {
  static defaultProps = {
    children: ``,
    containerStyle: {},
    href: ``,
    onPress: null,
    style: {},
  }

  openLink = (): void => {
    const { href } = this.props
    if (href) {
      WebBrowserManager.openLink(href)
    }
  }

  render(): React.ReactElement {
    const {
      children,
      containerStyle,
      onPress,
      style,
    } = this.props
    return (
      <TouchableOpacity
        onPress={onPress || this.openLink}
        style={containerStyle}
      >
        <Text
          style={[Style.bodyText, styles.linkText, style]}
        >
          {children}
        </Text>
      </TouchableOpacity>

    )
  }
}

export default Link
