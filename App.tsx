import { AppLoading, Notifications } from "expo"
import { Asset } from "expo-asset"
import * as Font from "expo-font"
import PropTypes from "prop-types"
import React from "react"
import { Platform, StatusBar, View } from "react-native"
import { enableScreens } from 'react-native-screens'
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
enableScreens()

interface Props {
  skipLoadingScreen: boolean,
}

interface State {
  isLoadingComplete: boolean,
  store: any,
}

class App extends React.Component<Props, State> {
  notificationSubscription = null

  routeNameRef = null
  navigationRef = null

  static propTypes = {
    skipLoadingScreen: PropTypes.bool,
  }

  static defaultProps = {
    skipLoadingScreen: false,
  }

  static getActiveRouteName(navigationState): (string | void) {
    if (!navigationState) {
      return null
    }
    const route = navigationState.routes[navigationState.index]
    // dive into nested navigators
    if (route.state) {
      return App.getActiveRouteName(route.state)
    }
    return route.name
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

  componentDidMount(): void {
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

    if (this.navigationRef !== null && this.navigationRef) {
      const state = this.navigationRef.getRootState()
      this.routeNameRef = App.getActiveRouteName(state)
    }
  }

  loadResourcesAsync = async (): Promise<any> => Promise.all([
    Asset.loadAsync(Object.values(AssetManager.undraw)),
    Font.loadAsync({
      ...AssetManager.font,
    }),
  ])

  handleLoadingError = (error): void => {
    ErrorManager.captureError(error)
  }

  handleFinishLoading = (): void => {
    this.setState({ isLoadingComplete: true })
  }

  handleNotification = (notification): void => console.log(
    `Received notification`,
    notification,
  )

  onNavigationStateChange = (currentState): void => {
    const currentScreen = App.getActiveRouteName(currentState)
    const prevScreen = this.routeNameRef

    if (prevScreen !== currentScreen) {
      AnalyticsManager.logScreenView(currentScreen)
    }

    this.routeNameRef = currentScreen
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
              ref={this.navigationRef}
              onNavigationStateChange={this.onNavigationStateChange}
            />
          </View>
        </PersistGate>
      </Provider>
    )
  }
}

export default App
