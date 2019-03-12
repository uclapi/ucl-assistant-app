import React, { Component } from "react";
import { Alert, Image, View, SafeAreaView, StyleSheet } from "react-native";
import { LinearGradient } from "expo";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { NavigationActions, StackActions } from "react-navigation";
import { Feather } from "@expo/vector-icons";
import { signIn } from "../actions/userActions";
import {
  ButtonText,
  SubtitleText,
  Link,
  BodyText,
} from "../components/Typography";
import { Spacer, Horizontal } from "../components/Containers";
import CustomButton from "../components/Button";
import Colors from "../constants/Colors";
import Styles from "../styles/Containers";
import SplashStyle from "../styles/Splash";

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
});

class SplashScreen extends Component {
  static navigationOptions = {
    header: null,
    tabBarIcon: ({ focused }) => (
      <Feather
        name="calendar"
        size={28}
        color={focused ? Colors.pageBackground : Colors.textColor}
      />
    ),
  };

  static propTypes = {
    navigation: PropTypes.shape().isRequired,
    isSigningIn: PropTypes.bool,
    error: PropTypes.string,
    token: PropTypes.string,
    signIn: PropTypes.func,
  };

  static defaultProps = {
    isSigningIn: false,
    error: "",
    token: "",
    signIn: () => {},
  };

  static mapStateToProps = state => ({
    isSigningIn: state.user.signIn.isSigningIn,
    error: state.user.signIn.error,
    token: state.user.token,
  });

  static mapDispatchToProps = dispatch => ({
    signIn: () => dispatch(signIn()),
  });

  componentDidMount() {
    if (this.props.token !== "") {
      console.log(
        `Component just mounted. Going to home. reason? token = ${
          this.props.token
        }`,
      );
      this.goHome();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.token !== "") {
      this.goHome();
    }

    if (prevProps.isSigningIn === true && this.props.isSigningIn === false) {
      // did we just sign in?
      if (this.props.token !== null) {
        // yes, replace screen with home screen.
        this.goHome();
      } else if (this.props.error.length < 1) {
        // cancelled
      } else {
        // error
        setTimeout(
          () => Alert.alert("Error Signing In", this.props.error),
          500,
        );
      }
    }
  }

  goHome() {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Main" })],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <LinearGradient
          colors={[Colors.accentColor, Colors.buttonBackground]}
          start={[0, 1]}
          end={[1, 0]}
          style={[Styles.page, SplashStyle.page]}
        >
          <Image
            source={require("../assets/images/icon-fg.png")}
            resizeMethod="scale"
            style={Styles.image}
            resizeMode="contain"
          />
          <SubtitleText style={SplashStyle.text}>
            One app to manage your life at UCL.
          </SubtitleText>
          <Spacer />
          <CustomButton
            onPress={() => this.props.signIn()}
            loading={this.props.isSigningIn}
            style={SplashStyle.button}
          >
            <Horizontal>
              <Image
                source={require("../assets/images/uclapi.png")}
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
            <BodyText>
              <BodyText style={SplashStyle.disclaimerText}>
                By signing into this app, you agree to&nbsp;
              </BodyText>
              <Link
                href="https://github.com/uclapi/ucl-assistant-app/blob/master/TERMS.md"
                style={SplashStyle.disclaimerLink}
              >
                UCL API{`'`}s terms & conditions.
              </Link>
            </BodyText>
          </View>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}

export default connect(
  SplashScreen.mapStateToProps,
  SplashScreen.mapDispatchToProps,
)(SplashScreen);
