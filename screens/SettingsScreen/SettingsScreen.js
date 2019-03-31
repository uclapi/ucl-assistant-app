/* eslint-disable react/no-unused-state */
import React, { Component, Fragment } from "react";
import {
  Alert,
  Platform,
  View,
  Clipboard,
  StyleSheet,
  Linking,
} from "react-native";
import { NavigationActions, StackActions } from "react-navigation";
import PropTypes from "prop-types";
import { Constants, IntentLauncherAndroid } from "expo";
import { connect } from "react-redux";
import {
  TitleText,
  BodyText,
  SubtitleText,
  ButtonText,
} from "../../components/Typography";
import { Page, Horizontal, PaddedIcon } from "../../components/Containers";
import { signOut } from "../../actions/userActions";
import Button, { SmallButton } from "../../components/Button";
import Colors from "../../constants/Colors";
import TextInput from "../../components/Input/TextInput";
import NotificationSwitch from "./NotificationSwitch";
import LiveIndicator from "../../components/LiveIndicator";
import common from "../../styles/common";

const { version } = require("../../package.json");

const styles = StyleSheet.create({
  faqButton: {
    marginBottom: 10,
  },
  notificationSettingsButton: {
    marginTop: 10,
  },
  section: {
    marginBottom: 15,
    marginTop: 15,
  },
  textWithUpperMargin: {
    marginTop: 10,
  },
});

class SettingsScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    signOut: PropTypes.func,
    navigation: PropTypes.shape(),
    state: PropTypes.shape(),
  };

  static defaultProps = {
    signOut: () => {},
    navigation: {},
    state: {},
  };

  static mapStateToProps = state => ({
    state,
  });

  static mapDispatchToProps = dispatch => ({
    signOut: () => dispatch(signOut()),
  });

  static launchNotificationSettings() {
    // note that this will only work on standalone apps
    // because the bundleIdentifier/packageName will
    // only be used when an APK/IPA is built
    if (Platform.OS === "android") {
      IntentLauncherAndroid.startActivityAsync(
        IntentLauncherAndroid.ACTION_APP_NOTIFICATION_SETTINGS,
        {
          "android.provider.extra.APP_PACKAGE":
            Constants.manifest.android.package,
        },
      );
    } else {
      // is iOS
      Linking.openURL(
        `app-settings://notification/${
          Constants.manifest.ios.bundleIdentifier
        }`,
      );
    }
  }

  static releaseChannelStyle = {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  };

  state = {
    isSigningOut: false,
  };

  componentDidUpdate(_, prevState) {
    if (prevState.isSigningOut && this.props.state.user.token === "") {
      const action = StackActions.reset({
        index: 0,
        actions: [NavigationActions.navigate({ routeName: "Splash" })],
      });
      this.props.navigation.dispatch(action);
    }
  }

  signOut = () => {
    this.props.signOut();
    this.setState({ isSigningOut: true });
  };

  navigateToFAQs = () => {
    this.props.navigation.navigate("FAQ");
  };

  async copyTokenToClipboard() {
    await Clipboard.setString(this.props.state.user.token);
    Alert.alert("Copied", "Token copied to clipboard.");
  }

  render() {
    const { state } = this.props;
    return (
      <Page mainTabPage>
        <TitleText>Settings</TitleText>
        <View>
          <SubtitleText>Notifications</SubtitleText>
          <NotificationSwitch />
          <Button
            onPress={() => SettingsScreen.launchNotificationSettings()}
            style={styles.notificationSettingsButton}
          >
            Manage Notification Settings
          </Button>
        </View>
        <View style={styles.section}>
          <SubtitleText>User</SubtitleText>
          <BodyText>Logged in as {state.user.fullName}</BodyText>
          <BodyText>Unique Person Identifier (UPI): {state.user.upi}</BodyText>
          <Button onPress={this.signOut}>
            <Horizontal>
              <PaddedIcon
                name="log-out"
                size={24}
                color={Colors.pageBackground}
              />
              <ButtonText>Sign Out</ButtonText>
            </Horizontal>
          </Button>
        </View>
        <View style={styles.section}>
          <TitleText>About This App</TitleText>
          <Button onPress={this.navigateToFAQs} style={styles.faqButton}>
            Frequently Asked Questions
          </Button>
          <BodyText>Version {version}</BodyText>
          <Horizontal style={SettingsScreen.releaseChannelStyle}>
            {__DEV__ ? (
              <LiveIndicator>Developer Mode</LiveIndicator>
            ) : (
              <Fragment>
                <BodyText>Release Channel: </BodyText>
                <LiveIndicator>
                  {Constants.manifest.releaseChannel || "dev"}
                </LiveIndicator>
              </Fragment>
            )}
          </Horizontal>
        </View>
        <View style={styles.section}>
          <SubtitleText>Author</SubtitleText>
          <BodyText>
            Created by Matt Bell (class of 2018) using the UCL API.
          </BodyText>
          <BodyText style={styles.textWithUpperMargin}>
            Currently managed by the UCL API Team: a group of students working
            together within ISD to improve UCL by building a platform on top of
            UCL{`'`}s digital services for students.
          </BodyText>
          <BodyText style={styles.textWithUpperMargin}>
            Illustrations courtesy of the unDraw project, released under the MIT
            license.
          </BodyText>
        </View>
        {__DEV__ && (
          <View style={styles.section}>
            <TitleText>Dev Stuff</TitleText>
            <SubtitleText>UCL API Token</SubtitleText>
            <Horizontal>
              <TextInput style={common.flex} value={state.user.token} />
              <SmallButton onPress={() => this.copyTokenToClipboard()}>
                Copy
              </SmallButton>
            </Horizontal>
            <SubtitleText>State</SubtitleText>
            <BodyText>{JSON.stringify(state, "\n", 2)}</BodyText>
          </View>
        )}
      </Page>
    );
  }
}

export default connect(
  SettingsScreen.mapStateToProps,
  SettingsScreen.mapDispatchToProps,
)(SettingsScreen);
