import React, { Component } from "react";
import PropTypes from "prop-types";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import { Platform, StatusBar, View } from "react-native";
import { AppLoading, Asset, Font, Notifications } from "expo";
import { Feather } from "@expo/vector-icons";
import Sentry from "sentry-expo";
import { NotificationChannels } from "./constants/notificationsConstants";
import configureStore from "./configureStore";
import RootNavigation from "./navigation/RootNavigation";
import Styles from "./styles/Containers";

const { persistor, store } = configureStore;

if (!__DEV__) {
  Sentry.config(
    "https://329dca168bf14b1fbcf0eb462ce86dc6@sentry.io/1379891",
  ).install();
}

class App extends Component {
  static propTypes = {
    skipLoadingScreen: PropTypes.bool,
  };

  static defaultProps = {
    skipLoadingScreen: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoadingComplete: false,
      store: {
        persistor,
        store,
      },
    };
  }

  componentDidMount() {
    if (Platform.OS === "android") {
      Object.keys(NotificationChannels).forEach(key => {
        const channel = NotificationChannels[key];
        Notifications.createChannelAndroidAsync(channel.id, channel.options);
      });
    }
  }

  loadResourcesAsync = async () =>
    Promise.all([
      Asset.loadAsync([
        require("./assets/images/undraw_calendar.png"),
        require("./assets/images/undraw_relaxation.png"),
        require("./assets/images/undraw_graduation.png"),
        require("./assets/images/undraw_building_blocks.png"),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Feather.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
        apercu: require("./assets/fonts/somerandomfont.otf"),
        "apercu-bold": require("./assets/fonts/somerandomfont-Bold.otf"),
        "apercu-light": require("./assets/fonts/somerandomfont-Light.otf"),
      }),
    ]);

  handleLoadingError = error => {
    // TODO: Setup remote error logging
    console.warn(error); // eslint-disable-line no-console
  };

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      );
    }
    const { store: stateStore, persistor: statePersistor } = this.state.store;
    return (
      <Provider store={stateStore}>
        <PersistGate persistor={statePersistor}>
          <View style={Styles.app}>
            <StatusBar barStyle="light-content" hidden={false} />
            <RootNavigation />
          </View>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
