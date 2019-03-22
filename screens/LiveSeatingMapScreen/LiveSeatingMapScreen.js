import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ScreenOrientation } from "expo";
import Svg from "../../components/Svg";

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
});

class LiveSeatingMapScreen extends Component {
  static navigationOptions = {
    title: "Live Seating Map",
  };

  static propTypes = {
    navigation: PropTypes.shape().isRequired,
    token: PropTypes.string.isRequired,
  };

  static mapStateToProps = (state: Object) => ({
    token: state.user.token,
  });

  static mapDispatchToProps = () => ({});

  componentDidMount() {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);
  }

  componentWillUnmount() {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
  }

  render() {
    const { navigation, token } = this.props;
    const { surveyId, mapId } = navigation.state.params;

    return (
      <Svg
        uri="https://a.uguu.se/XG7RLe0MrSaL.svg"
        // headers: {
        //   authorization: `Bearer ${token}`,
        // },
        style={styles.webview}
        scrollEnabled
        bounces
        pointerEvents="auto"
      />
    );
  }
}

export default connect(
  LiveSeatingMapScreen.mapStateToProps,
  LiveSeatingMapScreen.mapDispatchToProps,
)(LiveSeatingMapScreen);
