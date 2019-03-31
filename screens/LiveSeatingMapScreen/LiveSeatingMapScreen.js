import React, { Component } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ScreenOrientation } from "expo";
import Svg from "../../components/Svg";
import ApiManager from "../../lib/ApiManager";

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
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

  constructor() {
    super();
    this.state = {
      svg: null,
    };
  }

  componentDidMount() {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.LANDSCAPE);
    const { navigation, token } = this.props;
    const { surveyId, mapId } = navigation.state.params;
    ApiManager.workspaces
      .getLiveImage(token, { surveyId, mapId })
      .then(base64 => {
        this.setState({ svg: base64 });
      });
  }

  componentWillUnmount() {
    ScreenOrientation.allowAsync(ScreenOrientation.Orientation.PORTRAIT);
  }

  render() {
    const { svg } = this.state;
    if (!svg) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <Svg
        uri={svg}
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
