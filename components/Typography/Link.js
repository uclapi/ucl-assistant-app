import React from "react";
import PropTypes from "prop-types";
import { Text, StyleSheet } from "react-native";
import { BodyText } from "./index";
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
    textStyle: Text.propTypes.style,
    onPress: PropTypes.func,
  };
  static defaultProps = {
    href: "",
    children: "",
    textStyle: StyleSheet.create({}),
    onPress: null,
  };
  openLink = () => {
    const { href } = this.props;
    if (href) {
      WebBrowserManager.openLink(href);
    }
  };
  render() {
    const { onPress, children, textStyle } = this.props;
    return (
      <Text onPress={onPress || this.openLink}>
        <BodyText style={[styles.linkText, textStyle]}>{children}</BodyText>
      </Text>
    );
  }
}

export default Link;
