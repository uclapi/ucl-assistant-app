import { Feather } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import PropTypes from "prop-types"
import React, { Component } from "react"
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native"
import { NavigationActions, StackActions } from "react-navigation"
import { connect } from "react-redux"

import { signIn as signInAction } from "../actions/userActions"
import CustomButton from "../components/Button"
import { Horizontal, Spacer } from "../components/Containers"
import {
  BodyText,
  ButtonText,
  Link,
  SubtitleText,
} from "../components/Typography"
import Colors from "../constants/Colors"
import { AnalyticsManager, AssetManager, ErrorManager } from "../lib"
import Styles from "../styles/Containers"
import SplashStyle from "../styles/Splash"

const TERMS_URL = `https://github.com/uclapi/ucl-assistant-app/`
  + `blob/master/TERMS.md`

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
})

class SplashScreen extends Component {
  static mapStateToProps = (state) => ({
    error: state.user.signIn.error,
    isSigningIn: state.user.signIn.isSigningIn,
    token: state.user.token,
    user: state.user,
  })

  static mapDispatchToProps = (dispatch) => ({
    signIn: () => dispatch(signInAction()),
  })

  static propTypes = {
    error: PropTypes.string,
    isSigningIn: PropTypes.bool,
    navigation: PropTypes.shape().isRequired,
    signIn: PropTypes.func,
    token: PropTypes.string,
    user: PropTypes.shape(),
  }


  static defaultProps = {
    error: ``,
    isSigningIn: false,
    signIn: () => { },
    token: ``,
    user: {},
  }

  componentDidMount() {
    const { token } = this.props
    if (token.length > 0) {
      console.log(
        `Component just mounted. Going to home. reason? token = ${token}`,
      )
      this.goHome()
    }
  }

  componentDidUpdate(prevProps) {
    const { token, error, isSigningIn } = this.props
    if (token.length > 0) {
      this.goHome()
    }

    if (prevProps.isSigningIn === true && isSigningIn === false) {
      // did we just sign in?
      // eslint-disable-next-line security/detect-possible-timing-attacks
      if (token !== null) {
        this.updateAnalytics()
        // yes, replace screen with home screen.
        this.goHome()
      } else if (error.length < 1) {
        // cancelled
      } else {
        // error
        setTimeout(() => Alert.alert(`Error Signing In`, error), 500)
      }
    }
  }

  goHome = () => {
    const { navigation } = this.props
    const resetAction = StackActions.reset({
      actions: [NavigationActions.navigate({ routeName: `Main` })],
      index: 0,
    })
    navigation.dispatch(resetAction)
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

  static navigationOptions = {
    header: null,
    tabBarIcon: ({ focused }) => (
      <Feather
        name="calendar"
        size={28}
        color={focused ? Colors.pageBackground : Colors.textColor}
      />
    ),
  }

  render() {
    const { signIn, isSigningIn } = this.props
    return (
      <>
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
            <CustomButton
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
            </CustomButton>
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

export default connect(
  SplashScreen.mapStateToProps,
  SplashScreen.mapDispatchToProps,
)(SplashScreen)
