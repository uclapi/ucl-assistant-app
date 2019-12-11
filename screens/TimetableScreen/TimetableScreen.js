import { Feather } from "@expo/vector-icons"
import moment from "moment"
import PropTypes from "prop-types"
import React, { Component } from "react"
import {
 Platform, ScrollView, StyleSheet, View 
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
import { Page, PageNoScroll } from "../../components/Containers"
import { BodyText, ErrorText, TitleText } from "../../components/Typography"
import Colors from "../../constants/Colors"
import { TIMETABLE_CACHE_TIME_HOURS } from "../../constants/timetableConstants"
import {
  ErrorManager,
  LocalisationManager,
  PushNotificationsManager,
} from '../../lib'
import DateControls from "./DateControls"
import TimetableComponent from "./TimetableComponent"

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  page: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 40,
  },
})

class TimetableScreen extends Component {
  static mapStateToProps = (state) => ({
    error: state.timetable.error,
    isFetchingTimetable: state.timetable.isFetching,
    timetable: state.timetable.timetable,
    timetableLastModified: state.timetable.lastModified,
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
    timetable: PropTypes.shape(),
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
      date: LocalisationManager.getMoment().startOf(`day`),
    }
  }

  async componentDidMount() {
    const { date } = this.state
    const {
      user: {
        token,
        declinePushNotifications,
        expoPushToken,
      },
      fetchTimetable,
      setExpoPushToken,
    } = this.props
    if (this.loginCheck(this.props) && token !== ``) {
      fetchTimetable(token, date)
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
      if (!didGrant) {
        const { navigation } = this.props
        navigation.navigate(`Notifications`)
      }
    }
  }

  fetchTimetablePeriod = async (date, forceUpdate = false) => {
    const day = date.clone().startOf(`day`)

    const { timetable, fetchTimetable, user: { token } } = this.props

    await Promise.all([
      day.clone().subtract(1, `days`),
      day,
      day.clone().add(1, `days`),
    ].map((eachDate) => {
      const dateString = eachDate.format(`YYYY-MM-DD`)

      if (forceUpdate
        || !timetable[dateString]
        || !timetable[dateString].lastModified
      ) {
        return fetchTimetable(token, eachDate)
      }
      const diff = moment.duration(
        LocalisationManager.getMoment().diff(
          timetable[dateString].lastModified,
        ),
      )
      if (diff.asHours() > TIMETABLE_CACHE_TIME_HOURS) {
        return fetchTimetable(token, eachDate)
      }
      return Promise.resolve()
    }))
  }

  onDateChanged = async (newDate, forceUpdate = false) => {
    const newDay = newDate.clone().startOf(`day`)
    await this.setState({
      date: newDay,
    })

    await this.fetchTimetablePeriod(newDay, forceUpdate)
  }

  loginCheck = (props) => {
    const { user, navigation } = props
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
    const { date } = this.state
    this.onDateChanged(date, true)
  }

  navigateToSignIn = () => {
    const { navigation: { navigate } } = this.props
    navigate(`Splash`)
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

  renderDay = ([dateISO, { lastModified, timetable: dayTimetable }]) => {
    const items = dayTimetable.sort(
      (a, b) => LocalisationManager.parseToDate(`${dateISO}T${a.start_time}:00`)
        - LocalisationManager.parseToDate(`${dateISO}T${b.start_time}:00`),
    )
    const pastItems = items.filter(
      (item) => LocalisationManager.parseToDate(
        `${dateISO}T${item.end_time}`,
      ) - LocalisationManager.now() < 0,
    )
    const futureItems = items.filter(
      (item) => LocalisationManager.parseToDate(
        `${dateISO}T${item.end_time}`,
      ) - LocalisationManager.now() > 0,
    )

    return (
      <View key={dateISO}>
        <ScrollView>
          <BodyText>{JSON.stringify(dayTimetable)}</BodyText>
        </ScrollView>
      </View>
    )
  }

  render() {
    const {
      user,
      timetable,
      isFetchingTimetable,
      navigation,
    } = this.props
    const { scopeNumber } = user
    const { date, error } = this.state
    const dateString = date.format(`ddd, Do MMMM`)

    if (scopeNumber < 0) {
      return (
        <PageNoScroll style={styles.container}>
          <View>
            <BodyText>You are not signed in.</BodyText>
            <Button onPress={this.navigateToSignIn}>Sign In</Button>
          </View>
        </PageNoScroll>
      )
    }

    /*
      {error && error !== `` ? (
          <View>
            <ErrorText>{error}</ErrorText>
          </View>
        ) : null}
    */

    return (
      <PageNoScroll
        refreshing={isFetchingTimetable}
        onRefresh={this.onRefresh}
        refreshEnabled
        mainTabPage
        style={styles.page}
      >

        <View style={styles.container}>
          <TitleText>{dateString}</TitleText>
        </View>
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
          horizontal
          style={{ flex: 1 }}
          height={300}
          showsPagination={false}
        >
          {
            Object.entries(timetable).map(this.renderDay)
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
