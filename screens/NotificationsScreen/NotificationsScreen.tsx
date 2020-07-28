import { CommonActions } from "@react-navigation/native"
import { StackNavigationProp } from '@react-navigation/stack'
import React, { useCallback } from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { connect } from "react-redux"
import {
  declinePushNotifications as declinePushNotificationsAction,
  setExpoPushToken as setExpoPushTokenAction,
  UserDispatch,
} from "../../actions/userActions"
import Button from "../../components/Button"
import { Page } from "../../components/Containers"
import {
  BodyText,
  Link,
  TitleText,
} from "../../components/Typography"
import { AppStateType } from "../../configureStore"
import {
  AnalyticsManager,
  AssetManager,
  ErrorManager,
  PushNotificationsManager,
} from "../../lib"
import type { RootStackParamList } from "../../navigation/RootNavigation"
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

type NotificationsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  // eslint-disable-next-line quotes
  'Notifications'
>

interface Props {
  navigation: NotificationsScreenNavigationProp,
  token: string,
  declinePushNotifications: () => void,
  setExpoPushToken: (t: string) => void,
}

export const NotificationsScreen: React.FC<Props> = ({
  token,
  setExpoPushToken,
  navigation,
  declinePushNotifications,
}) => {
  const goHome = useCallback((): void => {
    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{ name: `Main` }],
    })
    navigation.dispatch(resetAction)
  }, [navigation])

  const onSkip = useCallback((): void => {
    declinePushNotifications()
    AnalyticsManager.logEvent(AnalyticsManager.events.NOTIFICATIONS_SKIP)
    goHome()
  }, [declinePushNotifications, goHome])

  const onEnableNotifications = useCallback(async (): Promise<void> => {
    AnalyticsManager.logEvent(AnalyticsManager.events.NOTIFICATIONS_ENABLE)
    try {
      const pushToken = (
        await PushNotificationsManager.registerForPushNotifications(token)
      )
      setExpoPushToken(pushToken)
    } catch (error) {
      ErrorManager.captureError(error)
    }
    return goHome()
  }, [token, setExpoPushToken, goHome])

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
          onPress={onEnableNotifications}
        >
          Enable Notifications
        </Button>
        <View style={styles.skip}>
          <Link onPress={onSkip}>
            Skip
          </Link>
        </View>
      </View>
    </Page>
  )
}

const connector = connect(
  (state: AppStateType) => ({
    token: state.user.token,
  }),
  (dispatch: UserDispatch) => ({
    declinePushNotifications: () => dispatch(declinePushNotificationsAction()),
    setExpoPushToken: (pushToken: string) => dispatch(setExpoPushTokenAction(pushToken)),
  }),
)

export default connector(NotificationsScreen)
