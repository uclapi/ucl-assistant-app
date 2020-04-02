import { CommonActions } from "@react-navigation/native"
import PropTypes from "prop-types"
import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { connect } from "react-redux"

import {
  declinePushNotifications as declinePushNotificationsAction,
  setExpoPushToken as setExpoPushTokenAction,
} from "../../actions/userActions"
import Button from "../../components/Button"
import { Page } from "../../components/Containers"
import {
  BodyText,
  Link,
  TitleText,
} from "../../components/Typography"
import {
  AnalyticsManager,
  AssetManager,
  ErrorManager,
  PushNotificationsManager,
} from "../../lib"
import Styles from "../../styles/Containers"


const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    paddingTop: 30,
  },
  description: {
    marginBottom: 20,
    marginTop: 20,
  },
  notifyImage: {
    height: 150,
    marginTop: 15,
  },
  skip: {
    flexDirection: `row`,
    justifyContent: `center`,
    marginBottom: 20,
    marginTop: 20,
  },
  subdescription: {
    marginBottom: 30,
  },
})

export class NotificationsScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  }

  static mapStateToProps = (state) => ({
    token: state.user.token,
  })

  static mapDispatchToProps = (dispatch) => ({
    declinePushNotifications: () => dispatch(declinePushNotificationsAction()),
    setExpoPushToken: (pushToken) => dispatch(setExpoPushTokenAction(pushToken)),
  })

  static propTypes = {
    declinePushNotifications: PropTypes.func,
    navigation: PropTypes.shape().isRequired,
    setExpoPushToken: PropTypes.func,
    token: PropTypes.string,
  }

  static defaultProps = {
    declinePushNotifications: () => { },
    setExpoPushToken: () => { },
    token: ``,
  }

  onEnableNotifications = async () => {
    const { token, setExpoPushToken } = this.props
    AnalyticsManager.logEvent(AnalyticsManager.events.NOTIFICATIONS_ENABLE)
    try {
      const pushToken = await PushNotificationsManager.registerForPushNotifications(token)
      setExpoPushToken(pushToken)
    } catch (error) {
      ErrorManager.captureError(error)
    }
    return this.goHome()
  }

  onSkip = () => {
    const { declinePushNotifications } = this.props
    declinePushNotifications()
    AnalyticsManager.logEvent(AnalyticsManager.events.NOTIFICATIONS_SKIP)
    this.goHome()
  }

  goHome = () => {
    const { navigation } = this.props
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [CommonActions.navigate({ name: `Main` })],
    })
    navigation.dispatch(resetAction)
  }

  render() {
    return (
      <Page>
        <View style={styles.container}>
          <TitleText>Be Notified</TitleText>
          <Image
            source={AssetManager.undraw.notify}
            resizeMethod="scale"
            style={[Styles.image, styles.notifyImage]}
            resizeMode="contain"
          />
          <View style={styles.description}>
            <BodyText>
              Find out when there&apos;s a new feature on UCL Assistant,&nbsp;
              when your timetable changes, or if there&apos;s an upcoming&nbsp;
              event that might interest you.
            </BodyText>
          </View>
          <View style={styles.subdescription}>
            <BodyText>
              You can disable notifications later at any time.
            </BodyText>
          </View>
          <Button
            onPress={this.onEnableNotifications}
            testID="enable-notifications-button"
          >
            Enable Notifications
          </Button>
          <View style={styles.skip}>
            <Link onPress={this.onSkip} testID="skip-notifications-button">
              Skip
            </Link>
          </View>
        </View>
      </Page>
    )
  }
}


export default connect(
  NotificationsScreen.mapStateToProps,
  NotificationsScreen.mapDispatchToProps,
)(NotificationsScreen)
