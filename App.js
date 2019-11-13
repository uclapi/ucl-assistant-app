import { AppLoading, Notifications } from "expo"
import { Asset } from "expo-asset"
import * as Font from "expo-font"
import PropTypes from "prop-types"
import React, { Component } from "react"
import { Platform, StatusBar, View } from "react-native"
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/es/integration/react"

import configureStore from "./configureStore"
import Colors from './constants/Colors'
import { NotificationChannels } from "./constants/notificationsConstants"
import { AnalyticsManager, AssetManager, ErrorManager } from "./lib"
import RootNavigation from "./navigation/RootNavigation"
import Styles from "./styles/Containers"

const { persistor, store } = configureStore

ErrorManager.initialise()

if (process.env.NODE_ENV !== `production`) {
  const whyDidYouRender = require(`@welldone-software/why-did-you-render`)
  whyDidYouRender(React)
}

class App extends Component {
  static propTypes = {
    skipLoadingScreen: PropTypes.bool,
  }

  static defaultProps = {
    skipLoadingScreen: false,
  }

  static getActiveRouteName(navigationState) {
    if (!navigationState) {
      return null
    }
    const route = navigationState.routes[navigationState.index]
    // dive into nested navigators
    if (route.routes) {
      return App.getActiveRouteName(route)
    }
    return route.routeName
  }

  constructor(props) {
    super(props)
    this.state = {
      isLoadingComplete: false,
      store: {
        persistor,
        store,
      },
    }
  }

  componentDidMount() {
    if (Platform.OS === `android`) {
      Object.keys(NotificationChannels).forEach((key) => {
        const channel = NotificationChannels[key]
        Notifications.createChannelAndroidAsync(channel.id, channel.options)
      })
    }
    this.notificationSubscription = Notifications.addListener(
      this.handleNotification,
    )
    AnalyticsManager.initialise()
  }

  loadResourcesAsync = async () => Promise.all([
    Asset.loadAsync(Object.values(AssetManager.undraw)),
    Font.loadAsync({
      ...AssetManager.font,
    }),
  ])

  handleLoadingError = (error) => {
    ErrorManager.captureError(error)
  }

  handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true })
  }

  handleNotification = (notification) => console.log(
    `Received notification`,
    notification,
  )

  onNavigationStateChange = (prevState, currentState) => {
    const currentScreen = App.getActiveRouteName(currentState)
    const prevScreen = App.getActiveRouteName(prevState)

    if (prevScreen !== currentScreen) {
      AnalyticsManager.logScreenView(currentScreen)
    }
  }

  render() {
    const { isLoadingComplete } = this.state
    const { skipLoadingScreen } = this.props
    if (!isLoadingComplete && !skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      )
    }
    const {
      store: { store: stateStore, persistor: statePersistor },
    } = this.state
    return (
      <Provider store={stateStore}>
        <PersistGate persistor={statePersistor}>
          <View style={Styles.app}>
            <StatusBar
              barStyle="dark-content"
              hidden={false}
              backgroundColor={Colors.pageBackground}
            />
            <RootNavigation
              onNavigationStateChange={this.onNavigationStateChange}
            />
          </View>
        </PersistGate>
      </Provider>
    )
  }
}

export default App
