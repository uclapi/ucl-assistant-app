import AppLoading from "expo-app-loading"
import { Asset } from "expo-asset"
import * as Font from "expo-font"
import * as Notifications from 'expo-notifications'
import PropTypes from "prop-types"
import React from "react"
import { Platform, StatusBar, View } from "react-native"
// import { enableScreens } from 'react-native-screens'
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/lib/integration/react"
import configureStore from "./configureStore"
import Colors from './constants/Colors'
import {
  AnalyticsManager, AssetManager, ErrorManager, Warnings,
} from "./lib"
import RootNavigation from "./navigation/RootNavigation"
import { NotificationChannels } from "./redux/constants/notificationsConstants"
import Styles from "./styles/Containers"
import { QueryClient, QueryClientProvider } from "react-query"

const { persistor, store } = configureStore
const queryClient = new QueryClient()

ErrorManager.initialise()
// crashes LiveSeatingMapScreen, probably because of the large
// SVG base64 string
// unfortunately, this reduces navigation performance
// enableScreens()

Warnings.ignore()

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

  static getActiveRouteName(navigationState): string {
    if (!navigationState) {
      return ``
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
        Notifications.setNotificationChannelAsync(channel.id, channel.options)
      })
    }
    this.notificationSubscription = Notifications.addNotificationReceivedListener(
      this.handleNotification,
    )
    AnalyticsManager.initialise()

    if (this.navigationRef !== null && this.navigationRef) {
      const state = this.navigationRef.getRootState()
      this.routeNameRef = App.getActiveRouteName(state)
    }
  }

  componentWillUnmount(): void {
    Notifications.removeNotificationSubscription(this.notificationSubscription)
  }

  loadResourcesAsync = async (): Promise<any> => Promise.all([
    Asset.loadAsync(Object.values(AssetManager.undraw) as string[]),
    Font.loadAsync({
      ...AssetManager.font,
    }),
  ])

  handleLoadingError = (error: Error): void => {
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

  render(): React.ReactElement {
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
      store: {
        store: stateStore, persistor: statePersistor,
      },
    } = this.state
    return (
      <Provider store={stateStore}>
        <PersistGate persistor={statePersistor}>
          <QueryClientProvider client={queryClient}>
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
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    )
  }
}

export default App
