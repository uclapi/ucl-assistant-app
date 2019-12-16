import PropTypes from "prop-types"
import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { momentObj } from "react-moment-proptypes"

import TimetableCard from "../../../components/Card/TimetableCard"
import { BodyText, HeaderText, TitleText } from "../../../components/Typography"
import { LocalisationManager } from "../../../lib"

import DateControls from './DateControls'

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  dayContainer: {
    alignItems: `flex-start`,
    flex: 1,
    flexDirection: `row`,
    justifyContent: `flex-start`,
  },
  dayEmpty: {
    justifyContent: `space-between`,
    alignContent: `center`,
    alignItems: `center`,
    flexDirection: `row`,
  },
  dayLeft: {
    alignItems: `flex-end`,
    paddingRight: 10,
    width: 80,
  },
  dayNumber: {
    marginBottom: 0,
  },
  dayOfWeek: {
    marginBottom: 0,
    marginTop: 0,
  },
  dayRight: {
    flexGrow: 1,
    flexShrink: 1,
    paddingLeft: 10,
  },
  header: {
    marginBottom: 20,
  },
  footer: {
    marginTop: 20,
  }
})

class WeekView extends React.Component {
  static propTypes = {
    date: momentObj,
    onDateChanged: PropTypes.func,
    onIndexChanged: PropTypes.func,
    isLoading: PropTypes.bool,
    navigation: PropTypes.shape().isRequired,
    onRefresh: PropTypes.func,
    timetable: PropTypes.arrayOf(PropTypes.array),
  }

  static defaultProps = {
    isLoading: false,
    onRefresh: () => { },
    timetable: {},
    date: LocalisationManager.getMoment().startOf(`week`),
    onDateChanged: () => { },
    onIndexChanged: () => { },
  }

  keyExtractor = (day) => day.dateISO

  renderTimetableCard = (date) => (item) => {
    const { navigation } = this.props
    const dateISO = date.format(`YYYY-MM-DD`)

    const {
      module: {
        name: moduleName,
        module_id: moduleId,
      },
      location: {
        name: locationName,
      },
      session_type: sessionType,
      start_time: startTime,
      end_time: endTime,
      contact,
    } = item

    const past = LocalisationManager.parseToDate(
      `${dateISO}T${item.end_time}`,
    ) - LocalisationManager.now() < 0
    return (
      <TimetableCard
        moduleName={moduleName}
        moduleCode={moduleId}
        startTime={`${dateISO} ${startTime}`}
        endTime={`${dateISO} ${endTime}`}
        location={locationName || `TBA`}
        lecturer={contact || `Unknown Lecturer`}
        pastEvent={past}
        key={`${dateISO}-${moduleId}-${startTime}-${endTime}-${sessionType}`}
        navigation={navigation}
      />
    )
  }

  renderDay = ({ item: { dateISO, timetable } }) => {
    const dayDate = LocalisationManager
      .parseToMoment(dateISO, `YYYY-MM-DD`)

    if (timetable.length === 0) {
      return (
        <View style={styles.dayEmpty}>
          <TitleText style={styles.dayNumber}>
            {dayDate.format(`D`)}
            &nbsp;
          </TitleText>
          <HeaderText style={styles.dayOfWeek}>
            {dayDate.format(`ddd`).toUpperCase()}
          </HeaderText>
          <BodyText>&nbsp;&nbsp;-&nbsp;&nbsp;</BodyText>
          <BodyText>Nothing scheduled</BodyText>
        </View>
      )
    }

    return (
      <View style={styles.dayContainer}>
        <View style={styles.dayLeft}>
          <TitleText style={styles.dayNumber}>
            {dayDate.format(`D`)}
          </TitleText>
          <HeaderText style={styles.dayOfWeek}>
            {dayDate.format(`ddd`).toUpperCase()}
          </HeaderText>
        </View>
        <View style={styles.dayRight}>
          {timetable.map(this.renderTimetableCard(dayDate))}
        </View>
      </View>
    )
  }

  render() {
    const {
      timetable,
      onRefresh,
      isLoading,
      date,
      onDateChanged,
      onIndexChanged,
    } = this.props
    const weekTimetable = timetable.map(
      ([
        dateISO,
        { lastModified, timetable: dayTimetable },
      ]) => ({ dateISO, lastModified, timetable: dayTimetable }),
    )
    const { lastModified } = weekTimetable[0]

    const firstDate = LocalisationManager.parseToMoment(
      weekTimetable[0].dateISO,
      `YYYY-MM-DD`,
    ).format(`Do MMM`)
    const secondDate = LocalisationManager.parseToMoment(
      weekTimetable[weekTimetable.length - 1].dateISO,
      `YYYY-MM-DD`,
    ).format(`Do MMM`)
    const weekText = `${firstDate} - ${secondDate}`

    return (
      <FlatList
        onRefresh={onRefresh}
        refreshing={isLoading}
        contentContainerStyle={styles.contentContainer}
        keyExtractor={this.keyExtractor}
        data={weekTimetable}
        renderItem={this.renderDay}
        ListHeaderComponent={(
          <View style={styles.header}>
            <BodyText>{weekText}</BodyText>
            <DateControls
              date={date}
              onDateChanged={onDateChanged}
              currentIndex={onIndexChanged}
            />
          </View>
        )}
        ListFooterComponent={(
          <View style={styles.footer}>
            <BodyText>
              Last modified&nbsp;
              {LocalisationManager.parseToMoment(lastModified).fromNow()}
            </BodyText>
          </View>
        )}
      />
    )
  }
}

export default WeekView
