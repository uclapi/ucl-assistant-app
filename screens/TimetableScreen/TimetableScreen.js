import { Feather } from "@expo/vector-icons"
import _ from "lodash"
import PropTypes from "prop-types"
import React, { Component } from "react"
import {
  ActivityIndicator,
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
import {
  ErrorManager,
  LocalisationManager,
  PushNotificationsManager,
} from '../../lib'
import {
  weeklyTimetableArraySelector,
} from "../../selectors/timetableSelectors"
import WeekView from "./components/WeekView"
import DateControls from "./components/DateControls"

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
  spinner: {
    marginBottom: 20,
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
    timetable: PropTypes.arrayOf(PropTypes.array),
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
      initiallyLoading: true,
    }
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
    const { timetable } = this.props
    const todayIndex = timetable.findIndex(
      (week) => week.find(
        ([dateISO]) => dateISO === date.clone().format(`YYYY-MM-DD`),
      ),
    ) + 1
    this.setState({
      currentIndex: todayIndex,
      initiallyLoading: false,
    })
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

    if (index === 0) {
      const newDate = LocalisationManager.parseToMoment(
        timetable[0][0][0],
        `YYYY-MM-DD`,
      ).subtract(1, `weeks`)
      this.setState({ date: newDate })
      return fetchTimetable(token, newDate)
    }
    if (index === (timetable.length + 1)) {
      const newDate = LocalisationManager.parseToMoment(
        _.last(timetable)[0][0],
        `YYYY-MM-DD`,
      ).add(1, `weeks`)
      this.setState({ date: newDate })
      return fetchTimetable(token, newDate)
    }

    const { currentIndex } = this.state

    if (index === currentIndex) {
      return null
    }

    const newDate = LocalisationManager.parseToMoment(
      timetable[index - 1][0][0],
      `YYYY-MM-DD`,
    )
    return this.setState({
      currentIndex: index,
      date: newDate,
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

  renderWeek = (weekTimetable, index) => {
    if (weekTimetable === null) {
      return (
        <View key={`loading-${index}`}>
          <BodyText>Loading...</BodyText>
        </View>
      )
    }

    const { navigation, isFetchingTimetable } = this.props
    const { currentIndex } = this.state

    return (
      <WeekView
        key={weekTimetable[0][0][0]}
        navigation={navigation}
        timetable={weekTimetable}
        onRefresh={this.onRefresh}
        isLoading={isFetchingTimetable}
        onDateChanged={() => {}}
        onIndexChanged={(change) => this.onSwipe(currentIndex + change)}
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
      initiallyLoading,
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

    if (initiallyLoading) {
      return (
        <PageNoScroll style={styles.pageContainer}>
          <View style={styles.messageContainer}>
            <ActivityIndicator size="large" style={styles.spinner} />
            <BodyText>Loading timetable...</BodyText>
          </View>
        </PageNoScroll>
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
        {/* <DateControls
          date={date}
          onDateChanged={this.onDateChanged}
        /> */}
        {/* <TimetableComponent
          timetable={timetable}
          date={date}
          isLoading={isFetchingTimetable}
          navigation={navigation}
          changeDate={this.onDateChanged}
        /> */}
        {/* <SubtitleText>Find A Timetable</SubtitleText>
        <TextInput placeholder="Search for a course or module..." /> */}
        <Swiper
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
            [
              null,
              ...timetable,
              null,
            ].map(this.renderWeek)
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
