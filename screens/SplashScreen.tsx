import { LinearGradient } from "expo-linear-gradient"
import React, { Component } from "react"
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
import { AnalyticsManager, AssetManager, ErrorManager } from "../lib"
import { signIn as signInAction, UserDispatch } from "../redux/actions/userActions"
import Styles from "../styles/Containers"
import SplashStyle from "../styles/Splash"

const TERMS_URL = `https://github.com/uclapi/ucl-assistant-app/`
  + `blob/master/TERMS.md`

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
})

class SplashScreen extends Component<PropsFromRedux> {
  componentDidUpdate(prevProps) {
    const { token, error, isSigningIn } = this.props

    if (prevProps.isSigningIn === true && isSigningIn === false) {
      // did we just sign in?
      // eslint-disable-next-line security/detect-possible-timing-attacks
      if (token !== null) {
        this.updateAnalytics()
      } else if (error.length < 1) {
        // cancelled
      } else {
        // error
        setTimeout(() => Alert.alert(`Error Signing In`, error), 500)
      }
    }
  }

  updateAnalytics = () => {
    const {
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
    } = this.props

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
  }

  render() {
    const { signIn, isSigningIn } = this.props
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
              onPress={signIn}
              loading={isSigningIn}
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
}

const connector = connect(
  (state: AppStateType) => ({
    error: state.user.signIn.error,
    isSigningIn: state.user.signIn.isSigningIn,
    token: state.user.token,
    user: state.user,
  }),
  (dispatch: UserDispatch) => ({
    signIn: () => dispatch(signInAction()),
  }),
)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(SplashScreen)
