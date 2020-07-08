import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import {
  CommonActions,
  CompositeNavigationProp,
} from "@react-navigation/native"
import type { StackNavigationProp } from "@react-navigation/stack"
import Constants from "expo-constants"
import * as IntentLauncherAndroid from "expo-intent-launcher"
import * as StoreReview from 'expo-store-review'
import React from "react"
import {
  Alert,
  Linking,
  Platform,
  StyleSheet,
  View,
} from "react-native"
import CheckBox from 'react-native-check-box'
import { connect, ConnectedProps } from "react-redux"

import {
  setShouldTrackAnalytics as setShouldTrackAnalyticsAction,
  signOut as signOutAction,
  UserDispatch,
} from "../../../actions/userActions"
import { SmallButton } from "../../../components/Button"
import { Horizontal, Page } from "../../../components/Containers"
import TextInput from "../../../components/Input/TextInput"
// import NotificationSwitch from "./NotificationSwitch"
import LiveIndicator from "../../../components/LiveIndicator"
import {
  BodyText,
  HeaderText,
  Link,
} from "../../../components/Typography"
import { AppStateType } from "../../../configureStore"
import { AnalyticsManager, ClipboardManager, MailManager } from "../../../lib"
import type { MainTabNavigatorParamList } from "../../../navigation/MainTabNavigator"
import type { RootStackParamList } from "../../../navigation/RootNavigation"
import * as packageJson from '../../../package.json'
import common from "../../../styles/common"
import type { SettingsNavigatorParamList } from "../SettingsNavigator"

const {
  repository: {
    url: githubURL,
  },
  version,
} = packageJson

const styles = StyleSheet.create({
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
    justifyContent: `center`,
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

interface Props extends PropsFromRedux {
  navigation: CompositeNavigationProp<
    StackNavigationProp<SettingsNavigatorParamList>,
    CompositeNavigationProp<
      BottomTabNavigationProp<MainTabNavigatorParamList>,
      StackNavigationProp<RootStackParamList>
    >
  >,
}

interface State {
  isSigningOut: boolean,
}

export class SettingsScreen extends React.Component<Props, State> {
  static navigationOptions = {
    headerShown: false,
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      isSigningOut: false,
    }
  }

  componentDidUpdate(_, prevState: State): void {
    const { user, navigation } = this.props
    if (prevState.isSigningOut && user.token === ``) {
      const action = CommonActions.reset({
        index: 0,
        routes: [{ name: `Splash` }],
      })
      navigation.dispatch(action)
    }
  }

  launchNotificationSettings = (): void => {
    // note that this will only work on standalone apps
    // because the bundleIdentifier/packageName will
    // only be used when an APK/IPA is built
    if (Platform.OS === `android`) {
      IntentLauncherAndroid.startActivityAsync(
        IntentLauncherAndroid.ACTION_APP_NOTIFICATION_SETTINGS,
        {
          "android.provider.extra.APP_PACKAGE":
            Constants.manifest.android.package,
        } as any,
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

  toggleAnalytics = (): void => {
    const {
      user: {
        settings: { shouldTrackAnalytics: value },
      },
      setShouldTrackAnalytics,
    } = this.props

    setShouldTrackAnalytics(!value)
  }

  signOut = (): void => {
    const { signOut } = this.props
    signOut()
    this.setState({ isSigningOut: true })
  }

  navigateToFAQs = (): void => {
    const { navigation } = this.props
    navigation.navigate(`FAQ`)
    AnalyticsManager.logEvent(AnalyticsManager.events.SETTINGS_VIEW_FAQS)
  }

  copyTokenToClipboard = async (): Promise<void> => {
    const { user: { token } } = this.props
    await ClipboardManager.setString(token)
    Alert.alert(`Copied`, `Token copied to clipboard.`)
  }

  giveFeedback = (): void => {
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

  rateApp = async (): Promise<void> => {
    const isSupported = await StoreReview.isAvailableAsync()
    if (isSupported) {
      StoreReview.requestReview()
    }
    AnalyticsManager.logEvent(
      AnalyticsManager.events.SETTINGS_RATE_APP,
      { isSupported },
    )
  }

  renderDev = (): React.ReactNode => {
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
        <BodyText>{JSON.stringify(user, null, 2)}</BodyText>
      </View>
    )
  }

  render(): React.ReactElement {
    const { user } = this.props
    return (
      <Page>
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
            testID="sign-out-button"
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
                  : `Disallow UCL Assistant from sending analytics data to `
                  + `UCL API`
              }
            </BodyText>
            <CheckBox
              testID="analytics-checkbox"
              style={styles.settingsCheckBox}
              isChecked={user.settings.shouldTrackAnalytics}
              onClick={this.toggleAnalytics}
            />
          </View>
        </View>
        <View style={styles.section}>
          <HeaderText>App Info</HeaderText>
          <Link href="https://uclapi.com">Website</Link>
          <Link
            onPress={this.navigateToFAQs}
            style={styles.faqButton}
            testID="faq-button"
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
            testID="github-button"
          >
            Source Code
          </Link>
          <Link
            containerStyle={styles.feedbackButton}
            onPress={this.giveFeedback}
            testID="feedback-button"
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
          <BodyText>
            Created by Matt Bell (class of 2018) using the UCL API.
          </BodyText>
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

const connector = connect(
  (state: AppStateType) => ({
    user: state.user,
  }),
  (dispatch: UserDispatch) => ({
    setShouldTrackAnalytics: (shouldTrackAnalytics) => dispatch(
      setShouldTrackAnalyticsAction(shouldTrackAnalytics),
    ),
    signOut: () => dispatch(signOutAction()),
  }),
)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(SettingsScreen)

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
