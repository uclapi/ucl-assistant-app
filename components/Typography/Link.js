import React from "react";
import PropTypes from "prop-types";
import { Text, StyleSheet } from "react-native";
import Style from "../../styles/Typography";
import Colors from "../../constants/Colors";
import WebBrowserManager from "../../lib/WebBrowserManager";

const styles = StyleSheet.create({
  linkText: {
    color: Colors.linkBlue,
  },
});

class Link extends React.Component {
  static propTypes = {
    href: PropTypes.string,
    children: PropTypes.node,
    style: PropTypes.oneOfType([PropTypes.shape(), PropTypes.number]),
    onPress: PropTypes.func,
  };

  static defaultProps = {
    href: "",
    children: "",
    style: {},
    onPress: null,
  };

  openLink = () => {
    const { href } = this.props;
    if (href) {
      WebBrowserManager.openLink(href);
    }
  };

  render() {
    const { onPress, children, style } = this.props;
    return (
      <Text
        onPress={onPress || this.openLink}
        style={[Style.bodyText, styles.linkText, style]}
      >
        {children}
      </Text>
    );
  }
}

export default Link;
