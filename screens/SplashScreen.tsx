import * as AuthSession from 'expo-auth-session'
import { LinearGradient } from "expo-linear-gradient"
import React, { useCallback, useEffect } from "react"
import {
  Alert,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native"
import { connect, ConnectedProps } from "react-redux"
import Button from "../components/Button"
import { Horizontal, Spacer } from "../components/Containers"
import {
  BodyText,
  ButtonText,
  Link,
  SubtitleText,
} from "../components/Typography"
import { AppStateType } from "../configureStore"
import Colors from "../constants/Colors"
import {
  AnalyticsManager, ApiManager, AssetManager, ErrorManager, WebBrowserManager,
} from "../lib"
import { signInSuccess as signInSuccessAction, UserDispatch } from "../redux/actions/userActions"
import Styles from "../styles/Containers"
import SplashStyle from "../styles/Splash"

const TERMS_URL = `https://github.com/uclapi/ucl-assistant-app/`
  + `blob/master/TERMS.md`

const discovery = {
  authorizationEndpoint: `https://uclapi.com/oauth/authorise`,
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
})

const SplashScreen: React.FC<PropsFromRedux> = ({
  user: {
    upi,
    apiToken,
    cn,
    department,
    email,
    fullName,
    givenName,
    scopeNumber,
    token,
  },
  signInSuccess,
}) => {
  const [request, response, promptAsync] = AuthSession.useAuthRequest({
    clientId: ApiManager.clientId,
    redirectUri: AuthSession.makeRedirectUri(),
  }, discovery)

  const signIn = useCallback(() => promptAsync(), [promptAsync])

  const updateAnalytics = useCallback(() => {
    // update user properties
    AnalyticsManager.setUserId(upi)
    AnalyticsManager.setUserProperties({
      apiToken,
      cn,
      department,
      email,
      fullName,
      givenName,
      scopeNumber,
      token,
    })

    ErrorManager.setUser({
      apiToken,
      cn,
      department,
      email,
      fullName,
      givenName,
      scopeNumber,
      token,
      upi,
    })
  }, [apiToken, cn, department, email, fullName, givenName, scopeNumber, token, upi])

  useEffect(() => {
    WebBrowserManager.warmUpAsync()
    return () => {
      WebBrowserManager.coolDownAsync()
    }
  })

  useEffect(() => {
    if (response && response.type === `success`) {
      const { user } = signInSuccessAction(response)
      if (user.token) {
        signInSuccess(response)

        updateAnalytics()
      } else {
        Alert.alert(`Error Signing In`, JSON.stringify(response))
      }
    } else {
      Alert.alert(`Error Signing In`, `Response type is ${response.type}`)
    }
  }, [response])

  return (
    <>
      <StatusBar hidden />
      <LinearGradient
        colors={[Colors.accentColor, Colors.buttonBackground]}
        start={[0, 1]}
        end={[1, 0]}
        style={[Styles.page, SplashStyle.page]}
      >
        <SafeAreaView style={styles.safeAreaView}>
          <Image
            source={AssetManager.uclapi.iconForeground}
            resizeMethod="scale"
            style={Styles.image}
            resizeMode="contain"
          />
          <SubtitleText style={SplashStyle.text}>
            One app to manage your life at UCL
          </SubtitleText>
          <Spacer />
          <Button
            disabled={!request}
            onPress={signIn}
            loading={false}
            style={SplashStyle.button}
          >
            <Horizontal>
              <Image
                source={AssetManager.uclapi.smallIcon}
                resizeMethod="scale"
                resizeMode="contain"
                style={[Styles.image, SplashStyle.uclapiImage]}
              />
              <ButtonText style={SplashStyle.buttonText}>
                Sign In With UCL
              </ButtonText>
            </Horizontal>
          </Button>
          <View style={SplashStyle.disclaimer}>
            <BodyText style={SplashStyle.disclaimerText}>
              By signing into this app, you agree to&nbsp;
            </BodyText>
            <Link
              href={TERMS_URL}
              style={SplashStyle.disclaimerLink}
            >
              UCL API&apos;s terms &amp; conditions.
            </Link>
          </View>
        </SafeAreaView>
      </LinearGradient>
    </>
  )
}

const connector = connect(
  (state: AppStateType) => ({
    error: state.user.signIn.error,
    isSigningIn: state.user.signIn.isSigningIn,
    token: state.user.token,
    user: state.user,
  }),
  (dispatch: UserDispatch) => ({
    signInSuccess: (result) => dispatch(signInSuccessAction(result)),
  }),
)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(SplashScreen)
