import PropTypes from "prop-types"
import React from "react"
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewPropTypes,
} from "react-native"

import Colors from "../../constants/Colors"
import WebBrowserManager from "../../lib/WebBrowserManager"
import Style from "../../styles/Typography"

const styles = StyleSheet.create({
  linkText: {
    color: Colors.linkBlue,
  },
})

class Link extends React.Component {
  static propTypes = {
    children: PropTypes.node,
    containerStyle: ViewPropTypes.style,
    href: PropTypes.string,
    onPress: PropTypes.func,
    style: Text.propTypes.style,
  }

  static defaultProps = {
    children: ``,
    containerStyle: {},
    href: ``,
    onPress: null,
    style: {},
  }

  openLink = () => {
    const { href } = this.props
    if (href) {
      WebBrowserManager.openLink(href)
    }
  }

  render() {
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
