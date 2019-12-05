/* eslint-disable react/no-unused-state */
import { StoreReview } from "expo"
import Constants from "expo-constants"
import * as IntentLauncherAndroid from "expo-intent-launcher"
import PropTypes from "prop-types"
import React, { Component } from "react"
import {
  Alert,
  Clipboard,
  Linking,
  Platform,
  StyleSheet,
  View,
} from "react-native"
import CheckBox from 'react-native-check-box'
import { NavigationActions, StackActions } from "react-navigation"
import { connect } from "react-redux"

import { setShouldTrackAnalytics as setShouldTrackAnalyticsAction, signOut as signOutAction } from "../../actions/userActions"
import { SmallButton } from "../../components/Button"
import { Horizontal, Page } from "../../components/Containers"
import TextInput from "../../components/Input/TextInput"
// import NotificationSwitch from "./NotificationSwitch"
import LiveIndicator from "../../components/LiveIndicator"
import {
  BodyText,
  HeaderText,
  Link,
} from "../../components/Typography"
import { AnalyticsManager, MailManager } from "../../lib"
import common from "../../styles/common"

const {
  repository: {
    url: githubURL,
  },
  version,
} = require(`../../package.json`)

const styles = StyleSheet.create({
  createdBy: {
    flexDirection: `row`,
    flexWrap: `wrap`,
  },
  faqButton: {
    marginBottom: 10,
  },
  feedbackButton: {
    alignSelf: `flex-start`,
    marginVertical: 10,
  },
  // notificationSettingsButton: {
  //   marginTop: 10,
  // },
  releaseChannel: {
    alignItems: `center`,
    flexDirection: `row`,
    justifyContent: `flex-start`,
    marginBottom: 10,
  },
  section: {
    marginBottom: 15,
    marginTop: 15,
  },
  settingView: {
    flex: 1,
    flexDirection: `row`,
  },
  settingsCheckBox: {
    flex: 0.1,
  },
  settingsText: {
    flex: 0.9,
  },
  signOut: {
    marginBottom: 10,
    marginTop: 10,
  },
  textWithUpperMargin: {
    marginTop: 10,
  },
})

export class SettingsScreen extends Component {
  static mapStateToProps = (state) => ({
    user: state.user,
  })

  static mapDispatchToProps = (dispatch) => ({
    setShouldTrackAnalytics: (shouldTrackAnalytics) => dispatch(setShouldTrackAnalyticsAction(shouldTrackAnalytics)),
    signOut: () => dispatch(signOutAction()),
  })

  static propTypes = {
    navigation: PropTypes.shape(),
    setShouldTrackAnalytics: PropTypes.func,
    signOut: PropTypes.func,
    user: PropTypes.shape(),
  }

  static defaultProps = {
    navigation: {},
    setShouldTrackAnalytics: () => { },
    signOut: () => { },
    user: {},
  }

  constructor() {
    super()
    this.state = {
      isSigningOut: false,
    }
  }

  componentDidUpdate(_, prevState) {
    const { user, navigation } = this.props
    if (prevState.isSigningOut && user.token === ``) {
      const action = StackActions.reset({
        actions: [NavigationActions.navigate({ routeName: `Splash` })],
        index: 0,
      })
      navigation.dispatch(action)
    }
  }

  launchNotificationSettings = () => {
    // note that this will only work on standalone apps
    // because the bundleIdentifier/packageName will
    // only be used when an APK/IPA is built
    if (Platform.OS === `android`) {
      IntentLauncherAndroid.startActivityAsync(
        IntentLauncherAndroid.ACTION_APP_NOTIFICATION_SETTINGS,
        {
          "android.provider.extra.APP_PACKAGE":
            Constants.manifest.android.package,
        },
      )
    } else {
      // is iOS
      Linking.openURL(
        `app-settings://notification/${
          Constants.manifest.ios.bundleIdentifier
        }`,
      )
    }
  }

  toggleAnalytics = () => {
    const { user: { settings: { shouldTrackAnalytics: value } }, setShouldTrackAnalytics } = this.props

    setShouldTrackAnalytics(!value)
  }

  signOut = () => {
    const { signOut } = this.props
    signOut()
    this.setState({ isSigningOut: true })
  }

  navigateToFAQs = () => {
    const { navigation } = this.props
    navigation.navigate(`FAQ`)
    AnalyticsManager.logEvent(AnalyticsManager.events.SETTINGS_VIEW_FAQS)
  }

  copyTokenToClipboard = async () => {
    const { user: { token } } = this.props
    await Clipboard.setString(token)
    Alert.alert(`Copied`, `Token copied to clipboard.`)
  }

  giveFeedback = () => {
    const { user: { upi } } = this.props
    const { deviceName, platform, manifest: { releaseChannel } } = Constants
    MailManager.composeAsync({
      body: `I've been using UCL Assistant and I just wanted `
        + `to tell you ... \n\n`
        + `Technical Information\n${JSON.stringify({
          deviceName,
          platform,
          releaseChannel,
          upi,
        }, null, 2)}`,
      recipients: [`isd.apiteam@ucl.ac.uk`],
      subject: `Feedback about UCL Assistant`,
    })
    AnalyticsManager.logEvent(AnalyticsManager.events.SETTINGS_GIVE_FEEDBACK)
  }

  rateApp = () => {
    const isSupported = StoreReview.isSupported()
    if (isSupported) {
      StoreReview.requestReview()
    }
    AnalyticsManager.logEvent(
      AnalyticsManager.events.SETTINGS_RATE_APP,
      { isSupported },
    )
  }

  static navigationOptions = {
    header: null,
  }

  renderDev = () => {
    const { user } = this.props
    return __DEV__ && (
      <View style={styles.section}>
        <HeaderText>UCL API Token</HeaderText>
        <Horizontal>
          <TextInput style={common.flex} value={user.token} />
          <SmallButton onPress={this.copyTokenToClipboard}>
            Copy
          </SmallButton>
        </Horizontal>
        <HeaderText>State</HeaderText>
        <BodyText>{JSON.stringify(user, `\n`, 2)}</BodyText>
      </View>
    )
  }

  render() {
    const { user } = this.props
    return (
      <Page mainTabPage>
        <View style={styles.section}>
          <HeaderText>User</HeaderText>
          <BodyText>
            {`Logged in as ${user.fullName}`}
          </BodyText>
          <BodyText>
            {`Unique Person Identifier (UPI): ${user.upi}`}
          </BodyText>
          <Link
            onPress={this.signOut}
            style={styles.signOut}
            testID="signOutButton"
          >
            Sign Out
          </Link>
          <View style={styles.settingView}>
            <BodyText
              style={styles.settingsText}
            >
              {
                user.settings.shouldTrackAnalytics
                  ? `Allow UCL Assistant to send analytics data to UCL API`
                  : `Disallow UCL Assistant from sending analytics data to UCL API`
              }
            </BodyText>
            <CheckBox
              testID="analyticsCheckbox"
              style={styles.settingsCheckBox}
              isChecked={user.settings.shouldTrackAnalytics}
              onClick={this.toggleAnalytics}
            />
          </View>
        </View>
        <View style={styles.section}>
          <HeaderText>App Info</HeaderText>
          <Link
            onPress={this.navigateToFAQs}
            style={styles.faqButton}
            testID="faqButton"
          >
            Frequently Asked Questions
          </Link>
          <BodyText>
            {`Version: ${version}`}
          </BodyText>
          <Horizontal style={styles.releaseChannel}>
            {__DEV__ ? (
              <LiveIndicator>Developer Mode</LiveIndicator>
            ) : (
              <>
                  <BodyText>Release Channel: </BodyText>
                  <LiveIndicator>
                    {Constants.manifest.releaseChannel || `dev`}
                  </LiveIndicator>
              </>
            )}
          </Horizontal>
          <Link
            href={githubURL}
            testID="githubButton"
          >
            Source Code
          </Link>
          <Link
            containerStyle={styles.feedbackButton}
            onPress={this.giveFeedback}
            testID="feedbackButton"
          >
            Send Us Feedback
          </Link>
          {/* <Link
            onPress={this.rateApp}
          >
            Rate Us
          </Link> */}
        </View>
        <View style={styles.section}>
          <HeaderText>Credits</HeaderText>
          <View style={styles.createdBy}>
            <BodyText>
              Created by Matt Bell (class of 2018) using
            </BodyText>
            <Link href="https://uclapi.com">UCL API</Link>
          </View>
          <BodyText style={styles.textWithUpperMargin}>
            Currently managed by the UCL API Team: a group of
            students working together within ISD to improve UCL
            by building a platform on top of UCL&apos;s
            digital services for students.
          </BodyText>
          <BodyText style={styles.textWithUpperMargin}>
            Illustrations courtesy of the unDraw project,
            released under the MIT license.
          </BodyText>
        </View>
        {this.renderDev()}
      </Page>
    )
  }
}

export default connect(
  SettingsScreen.mapStateToProps,
  SettingsScreen.mapDispatchToProps,
)(SettingsScreen)

/*

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
  <SubtitleText>Default Screen</SubtitleText>
  <BodyText>Set the default screen that shows when you open the app</BodyText>
  <Picker
    // selectedValue={this.state.language}
    // style={{height: 50, width: 100}}
    // onValueChange={(itemValue, itemIndex) =>
    //   this.setState({language: itemValue})
    // }
    >
    <Picker.Item label="Timetable" value="timetable" />
    <Picker.Item label="Study Spaces" value="studyspaces" />
  </Picker>
</View>

*/
