import { Feather } from "@expo/vector-icons"
import ViewPager from '@react-native-community/viewpager'
import PropTypes from "prop-types"
import React, { Component } from "react"
import {
  AppState,
  Platform,
  StyleSheet,
} from "react-native"
import { connect } from "react-redux"

import {
  fetchTimetable as fetchTimetableAction,
} from "../../../actions/timetableActions"
import {
  setExpoPushToken as setExpoPushTokenAction,
  signOut as signOutAction,
} from "../../../actions/userActions"
import { PageNoScroll } from "../../../components/Containers"
import { ErrorMessage } from '../../../components/Message'
import Colors from "../../../constants/Colors"
import {
  TIMETABLE_CACHE_TIME_HOURS,
} from "../../../constants/timetableConstants"
import {
  DeviceManager,
  ErrorManager,
  LocalisationManager,
  PushNotificationsManager,
} from '../../../lib'
import {
  weeklyTimetableArraySelector,
} from "../../../selectors/timetableSelectors"
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

class TimetableScreen extends Component {
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

  static mapStateToProps = (state) => ({
    error: state.timetable.error,
    isFetchingTimetable: state.timetable.isFetching,
    timetable: weeklyTimetableArraySelector(state),
    user: state.user,
  })

  static mapDispatchToProps = (dispatch) => ({
    fetchTimetable: (token, date) => dispatch(
      fetchTimetableAction(token, date),
    ),
    setExpoPushToken: (pushToken) => dispatch(
      setExpoPushTokenAction(pushToken),
    ),
    signOut: () => dispatch(signOutAction()),
  })

  static propTypes = {
    error: PropTypes.string,
    fetchTimetable: PropTypes.func,
    isFetchingTimetable: PropTypes.bool,
    navigation: PropTypes.shape().isRequired,
    setExpoPushToken: PropTypes.func,
    timetable: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape())),
    user: PropTypes.shape(),
  }

  static defaultProps = {
    error: ``,
    fetchTimetable: () => { },
    isFetchingTimetable: false,
    setExpoPushToken: () => { },
    timetable: {},
    user: {},
  }

  constructor(props) {
    super(props)
    this.state = {
      appState: `active`,
      currentIndex: 1,
      date: today,
    }

    this.viewpager = null

    const { date } = this.state
    const { timetable } = props

    const todayIndex = timetable.findIndex(
      (week) => (
        week !== null
        && (
          LocalisationManager.parseToMoment(week[0].dateISO).isoWeek()
          === date.isoWeek()
        )
      ),
    )
    if (todayIndex !== -1) {
      this.state.currentIndex = todayIndex
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
    const { user, signOut } = this.props
    if (Object.keys(user).length > 0 && user.scopeNumber < 0) {
      signOut()
      return false
    }
    return true
  }

  onRefresh = () => {
    const { fetchTimetable, user: { token } } = this.props
    const { date } = this.state
    return fetchTimetable(token, date)
  }

  onSwipe = ({ nativeEvent: { position: index } }) => {
    const { fetchTimetable, user: { token }, timetable } = this.props

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

    const newDate = LocalisationManager.parseToMoment(
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

  onDateChanged = async (newDate) => {
    const { timetable } = this.props
    const desiredIndex = timetable.findIndex(
      (week) => (
        week !== null && (
          LocalisationManager.parseToMoment(week[0].dateISO).isoWeek()
          === newDate.isoWeek()
        )
      ),
    )
    if (desiredIndex !== -1) {
      this.viewpager.setPage(desiredIndex)
    } else {
      const { fetchTimetable, user: { token } } = this.props
      await fetchTimetable(token, newDate.clone().startOf(`isoweek`))

      this.onDateChanged(newDate)
    }
  }

  onIndexChanged = (change) => {
    const { currentIndex } = this.state
    if (this.viewpager) {
      this.viewpager.setPage(currentIndex + change)
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

    return (
      <WeekView
        key={weekTimetable[0].dateISO}
        navigation={navigation}
        timetable={weekTimetable}
        onRefresh={this.onRefresh}
        isLoading={isFetchingTimetable}
        onDateChanged={this.onDateChanged}
        onIndexChanged={this.onIndexChanged}
      />
    )
  }

  render() {
    const {
      timetable,
      isFetchingTimetable,
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
        refreshing={isFetchingTimetable}
        onRefresh={this.onRefresh}
        refreshEnabled
        mainTabPage
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
          ref={(ref) => { this.viewpager = ref }}
          key={timetable.length} // re-render only if array length changes
          orientation="horizontal"
          style={styles.swiper}
          showsPageIndicator={false}
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

export default connect(
  TimetableScreen.mapStateToProps,
  TimetableScreen.mapDispatchToProps,
)(TimetableScreen)
