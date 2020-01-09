import { Feather } from "@expo/vector-icons"
import PropTypes from "prop-types"
import React, { Component } from "react"
import {
  Platform,
  StyleSheet,
  View,
} from "react-native"
import Swiper from 'react-native-swiper'
import { NavigationActions, StackActions } from "react-navigation"
import { connect } from "react-redux"

import {
  fetchTimetable as fetchTimetableAction,
} from "../../actions/timetableActions"
import {
  setExpoPushToken as setExpoPushTokenAction,
} from "../../actions/userActions"
import Button from "../../components/Button"
import { PageNoScroll } from "../../components/Containers"
import { BodyText, ErrorText } from "../../components/Typography"
import Colors from "../../constants/Colors"
import { TIMETABLE_CACHE_TIME_HOURS } from "../../constants/timetableConstants"
import {
  ErrorManager,
  LocalisationManager,
  PushNotificationsManager,
} from '../../lib'
import {
  weeklyTimetableArraySelector,
} from "../../selectors/timetableSelectors"
import LoadingTimetable from "./components/LoadingTimetable"
import WeekView from "./components/WeekView"

const styles = StyleSheet.create({
  messageContainer: {
    alignItems: `center`,
    flex: 1,
    justifyContent: `center`,
  },
  page: {
    paddingLeft: 0,
    paddingRight: 0,
  },
  pageContainer: {
    padding: 20,
  },
  swiper: { flex: 1 },
})

class TimetableScreen extends Component {
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
  })

  static propTypes = {
    fetchTimetable: PropTypes.func,
    isFetchingTimetable: PropTypes.bool,
    navigation: PropTypes.shape().isRequired,
    setExpoPushToken: PropTypes.func,
    timetable: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape())),
    user: PropTypes.shape(),
  }

  static defaultProps = {
    fetchTimetable: () => { },
    isFetchingTimetable: false,
    setExpoPushToken: () => { },
    timetable: {},
    user: {},
  }

  constructor(props) {
    super(props)
    this.state = {
      currentIndex: 1,
      date: LocalisationManager.getMoment().startOf(`isoweek`),
    }

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

    this.swiper = null
  }

  async componentDidMount() {
    const {
      user: {
        token,
        declinePushNotifications,
        expoPushToken,
      },
      fetchTimetable,
      setExpoPushToken,
    } = this.props

    this.loginCheck()

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
      if (!didGrant) {
        const { navigation } = this.props
        navigation.navigate(`Notifications`)
      }
    }

    const { date } = this.state
    await fetchTimetable(token, date)
  }

  loginCheck = () => {
    const { user, navigation } = this.props
    if (Object.keys(user).length > 0 && user.scopeNumber < 0) {
      const resetAction = StackActions.reset({
        actions: [NavigationActions.navigate({ routeName: `Splash` })],
        index: 0,
      })
      navigation.dispatch(resetAction)
      return false
    }
    return true
  }

  onRefresh = () => {
    const { fetchTimetable, user: { token } } = this.props
    const { date } = this.state
    return fetchTimetable(token, date)
  }

  navigateToSignIn = () => {
    const { navigation: { navigate } } = this.props
    navigate(`Splash`)
  }

  onSwipe = (index) => {
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

    // temporary, for debugging an error here on Sentry
    try {
      console.log(timetable[index][0].dateISO)
    } catch (error) {
      ErrorManager.captureError(error, timetable)
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
      const { currentIndex } = this.state
      this.swiper.scrollBy(desiredIndex - currentIndex)
    } else {
      const { fetchTimetable, user: { token } } = this.props
      await fetchTimetable(token, newDate.startOf(`isoweek`))

      this.onDateChanged(newDate)
    }
  }

  onIndexChanged = (change) => {
    if (this.swiper) {
      this.swiper.scrollBy(change)
    }
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
      user,
      timetable,
      isFetchingTimetable,
    } = this.props
    const { scopeNumber } = user
    const {
      currentIndex,
      error,
    } = this.state

    if (scopeNumber < 0) {
      return (
        <PageNoScroll style={styles.pageContainer}>
          <View style={styles.messageContainer}>
            <BodyText>You are not signed in.</BodyText>
            <Button onPress={this.navigateToSignIn}>Sign In</Button>
          </View>
        </PageNoScroll>
      )
    }

    if (timetable.length <= 2) { // to account for padding nulls
      return (
        <LoadingTimetable />
      )
    }

    if (error && error !== ``) {
      return (
        <PageNoScroll style={styles.pageContainer}>
          <View style={styles.messageContainer}>
            <ErrorText>{error}</ErrorText>
          </View>
        </PageNoScroll>
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
        {/* <SubtitleText>Find A Timetable</SubtitleText>
        <TextInput placeholder="Search for a course or module..." /> */}
        <Swiper
          ref={(ref) => { this.swiper = ref }}
          key={timetable.length} // re-render only if array length changes
          horizontal
          style={styles.swiper}
          height={300}
          showsPagination={false}
          index={currentIndex}
          loop={false}
          onIndexChanged={this.onSwipe}
        >
          {
            timetable.map(this.renderWeek)
          }
        </Swiper>
      </PageNoScroll>
    )
  }
}

export default connect(
  TimetableScreen.mapStateToProps,
  TimetableScreen.mapDispatchToProps,
)(TimetableScreen)
