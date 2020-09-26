import { Feather } from "@expo/vector-icons"
import ViewPager from '@react-native-community/viewpager'
import { Moment } from 'moment'
import React from "react"
import {
  AppState,
  Platform,
  StyleSheet,
} from "react-native"
import { connect, ConnectedProps } from "react-redux"
import { PageNoScroll } from "../../../components/Containers"
import { ErrorMessage } from '../../../components/Message'
import { AppStateType } from "../../../configureStore"
import Colors from "../../../constants/Colors"
import {
  DeviceManager,
  ErrorManager,
  LocalisationManager,
  PushNotificationsManager,
} from '../../../lib'
import {
  fetchTimetable as fetchTimetableAction,
  TimetableDispatch,
} from "../../../redux/actions/timetableActions"
import {
  setExpoPushToken as setExpoPushTokenAction,
  signOut as signOutAction,
  UserDispatch,
} from "../../../redux/actions/userActions"
import { TIMETABLE_CACHE_TIME_HOURS } from "../../../redux/constants/timetableConstants"
import { weeklyTimetableArraySelector } from "../../../redux/selectors/timetableSelectors"
import type { User } from "../../../types/uclapi"
import type { TimetableNavigationType } from "../TimetableNavigator"
import LoadingTimetable from "./components/LoadingTimetable"
import WeekView from "./components/WeekView"

const styles = StyleSheet.create({
  page: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  swiper: { flex: 1 },
})

const today = LocalisationManager.getMoment()

interface Props extends PropsFromRedux {
  navigation: TimetableNavigationType,
}

interface State {
  appState: string,
  currentIndex: number,
  date: Moment,
}

class TimetableScreen extends React.Component<Props, State> {
  static navigationOptions = {
    headerShown: false,
    tabBarIcon: ({ focused }) => (
      <Feather
        name="calendar"
        size={28}
        color={focused ? Colors.pageBackground : Colors.textColor}
      />
    ),
  }

  private viewpager = React.createRef<ViewPager>()

  constructor(props: Props) {
    super(props)
    const { timetable } = props

    const todayIndex = timetable.findIndex(
      (week) => (
        week !== null
        && (
          LocalisationManager.parseToMoment(week[0].dateISO).isoWeek()
          === today.isoWeek()
        )
      ),
    )

    this.state = {
      appState: `active`,
      currentIndex: (todayIndex === -1) ? 1 : todayIndex,
      date: today,
    }
  }

  componentDidMount = async () => {
    const {
      user: {
        token,
        declinePushNotifications,
        expoPushToken,
      },
      setExpoPushToken,
    } = this.props

    if (!this.loginCheck()) {
      return null
    }

    if (Platform.OS === `android` && expoPushToken === ``) {
      try {
        const pushToken = (
          await PushNotificationsManager.registerForPushNotifications(token)
        )
        setExpoPushToken(pushToken)
      } catch (error) {
        ErrorManager.captureError(error)
      }
    }

    if (Platform.OS === `ios`
      && !declinePushNotifications
      && expoPushToken === ``
    ) {
      const didGrant = (
        await PushNotificationsManager.hasPushNotificationPermissions()
      )
      if (!didGrant && DeviceManager.isRealDevice()) {
        const { navigation } = this.props
        navigation.navigate(`Notifications`)
      }
    }

    this.onDateChanged(today)

    AppState.addEventListener(`change`, this.handleAppStateChange)

    return null
  }

  componentWillUnmount() {
    AppState.removeEventListener(`change`, this.handleAppStateChange)
  }

  loginCheck = () => {
    const { user = {} as User, signOut } = this.props
    if (Object.keys(user).length > 0 && user.scopeNumber < 0) {
      signOut()
      return false
    }
    return true
  }

  onRefresh = (): Promise<unknown> => {
    const { fetchTimetable, user: { token } } = this.props
    const { date } = this.state
    return fetchTimetable(token, date)
  }

  onSwipe = ({ nativeEvent: { position: index } }) => {
    const { fetchTimetable, user: { token }, timetable = [] } = this.props

    if (timetable[index] === null) {
      // assumes closest valid index can always be found earlier, not later
      const closestValidIndex = timetable.findIndex((w) => w !== null)
      const newDate = LocalisationManager.parseToMoment(
        timetable[closestValidIndex][0].dateISO,
      ).add(index - closestValidIndex, `weeks`)

      this.setState({ date: newDate })
      return fetchTimetable(token, newDate)
    }

    const { currentIndex } = this.state

    if (index === currentIndex) {
      return null
    }

    const newDate = LocalisationManager.parseToMoment( // sets date to Monday
      timetable[index][0].dateISO,
    )

    this.setState({
      currentIndex: index,
      date: newDate,
    })

    const shouldUpdate = LocalisationManager.getMoment()
      .diff(
        LocalisationManager.parseToMoment(
          timetable[index][0].lastModified,
        ),
        `hours`,
      )
      > TIMETABLE_CACHE_TIME_HOURS
    if (shouldUpdate) {
      return fetchTimetable(token, newDate)
    }

    return null
  }

  onDateChanged = async (newDate: Moment) => {
    const { timetable } = this.props
    const desiredIndex = timetable.findIndex(
      (week) => (
        week !== null && (
          LocalisationManager.parseToMoment(week[0].dateISO).isoWeek()
          === newDate.isoWeek()
        )
      ),
    )
    if (desiredIndex !== -1 && this.viewpager) {
      this.viewpager.current.setPage(desiredIndex)
    } else {
      const { fetchTimetable, user: { token } } = this.props
      await fetchTimetable(token, newDate.clone().startOf(`isoWeek`))

      this.onDateChanged(newDate)
    }
  }

  onIndexChanged = (change: number): void => {
    const { currentIndex } = this.state
    if (this.viewpager) {
      this.viewpager.current.setPage(currentIndex + change)
    }
  }

  handleAppStateChange = (nextAppState) => {
    const { appState } = this.state
    if (
      appState.match(/inactive|background/)
      && nextAppState === `active`
    ) {
      this.onIndexChanged(0)
    }
    this.setState({ appState: nextAppState })
  }

  renderWeek = (weekTimetable, index) => {
    if (weekTimetable === null) {
      return (
        <LoadingTimetable key={`loading-${index}`} />
      )
    }

    const { navigation, isFetchingTimetable } = this.props
    const { date } = this.state

    return (
      <WeekView
        key={weekTimetable[0].dateISO}
        navigation={navigation}
        timetable={weekTimetable}
        onRefresh={this.onRefresh}
        isLoading={isFetchingTimetable}
        onDateChanged={this.onDateChanged}
        onIndexChanged={this.onIndexChanged}
        date={date}
      />
    )
  }

  render() {
    const {
      timetable = [],
      error,
    } = this.props
    const {
      currentIndex,
    } = this.state

    if (error === `` && timetable.length <= 2) { // to account for padding nulls
      return (
        <LoadingTimetable />
      )
    }

    return (
      <PageNoScroll
        style={styles.page}
      >
        {
          (error && error !== ``) ? (
            <ErrorMessage
              error={error}
            />
          ) : null
        }
        <ViewPager
          ref={this.viewpager}
          key={timetable.length} // re-render only if array length changes
          orientation="horizontal"
          style={styles.swiper}
          showPageIndicator={false}
          initialPage={currentIndex}
          scrollEnabled
          onPageSelected={this.onSwipe}
        >
          {
            timetable.map(this.renderWeek)
          }
        </ViewPager>
      </PageNoScroll>
    )
  }
}

const connector = connect(
  (state: AppStateType) => ({
    error: state.timetable.error,
    isFetchingTimetable: state.timetable.isFetching,
    timetable: weeklyTimetableArraySelector(state),
    user: state.user,
  }),
  (dispatch) => ({
    fetchTimetable: (token, date) => (dispatch as TimetableDispatch)(
      fetchTimetableAction(token, date),
    ),
    setExpoPushToken: (pushToken) => dispatch(
      setExpoPushTokenAction(pushToken),
    ),
    signOut: () => (dispatch as UserDispatch)(signOutAction()),
  }),
)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(TimetableScreen)
