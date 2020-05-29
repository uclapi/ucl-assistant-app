import PropTypes from "prop-types"
import React from 'react'
import { momentObj } from "react-moment-proptypes"
import { FlatList, StyleSheet, View } from 'react-native'

import Button from "../../../../components/Button"
import TimetableCard from "../../../../components/Card/TimetableCard"
import { BodyText, HeaderText, TitleText } from "../../../../components/Typography"
import { LocalisationManager } from "../../../../lib"
import DateControls from './DateControls'
import FreeWeek from "./FreeWeek"
import LastModified from "./LastModified"

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
  footer: {
    marginTop: 20,
  },
  freeDay: {
    lineHeight: 36,
    marginTop: 6,
    textAlignVertical: `center`,
  },
  header: {
    alignItems: `center`,
    marginBottom: 20,
  },
  jumpToToday: {
    marginTop: 20,
  },
  weekText: {
    marginBottom: 10,
  },
})

class WeekView extends React.Component {
  static propTypes = {
    date: momentObj,
    isLoading: PropTypes.bool,
    navigation: PropTypes.shape().isRequired,
    onDateChanged: PropTypes.func,
    onIndexChanged: PropTypes.func,
    onRefresh: PropTypes.func,
    timetable: PropTypes.arrayOf(PropTypes.shape()),
  }

  static defaultProps = {
    date: LocalisationManager.getMoment().startOf(`week`),
    isLoading: false,
    onDateChanged: () => { },
    onIndexChanged: () => { },
    onRefresh: () => { },
    timetable: {},
  }

  keyExtractor = (day) => day.dateISO

  openFAQ = () => {
    const { navigation } = this.props
    navigation.navigate(`FAQ`)
    return null
  }

  jumpToToday = () => {
    const { onDateChanged } = this.props
    onDateChanged(LocalisationManager.getMoment())
  }

  renderHeader = () => {
    const {
      date,
      onDateChanged,
      onIndexChanged,
      timetable: weekTimetable,
    } = this.props

    const firstDate = LocalisationManager.parseToMoment(
      weekTimetable[0].dateISO,
    ).format(`Do MMM`)
    const secondDate = LocalisationManager.parseToMoment(
      weekTimetable[0].dateISO,
    ).endOf(`isoweek`).format(`Do MMM`)
    const weekText = `${firstDate} - ${secondDate}`

    return (
      <View style={styles.header}>
        <BodyText style={styles.weekText}>{weekText}</BodyText>
        <DateControls
          date={date}
          onDateChanged={onDateChanged}
          onIndexChanged={onIndexChanged}
        />
      </View>
    )
  }

  renderJumpToToday = () => {
    const { timetable: weekTimetable } = this.props
    const sameWeek = LocalisationManager.parseToMoment(
      weekTimetable[0].dateISO,
    ).isoWeek() === LocalisationManager.getMoment().isoWeek()
    if (!sameWeek) {
      return (
        <Button onPress={this.jumpToToday} style={styles.jumpToToday}>
          Jump To Today
        </Button>
      )
    }
    return null
  }

  renderFooter = () => {
    const { timetable: weekTimetable, isLoading } = this.props
    const { lastModified } = weekTimetable[0]
    return (
      <View style={styles.footer}>
        <LastModified
          lastModified={LocalisationManager.parseToMoment(lastModified)}
          openFAQ={this.openFAQ}
          isLoading={isLoading}
          date={weekTimetable[0].dateISO}
        />
        {this.renderJumpToToday()}
      </View>
    )
  }

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
      .parseToMoment(dateISO)

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
          {
            timetable.length === 0
              ? <TitleText style={styles.freeDay}>Nothing scheduled</TitleText>
              : timetable.map(this.renderTimetableCard(dayDate))
          }
        </View>
      </View>
    )
  }

  render() {
    const {
      timetable: weekTimetable,
      onRefresh,
      isLoading,
    } = this.props

    const emptyWeek = weekTimetable.every(
      ({ timetable }) => timetable.length === 0,
    )
    if (emptyWeek) {
      return (
        <FlatList
          onRefresh={onRefresh}
          refreshing={isLoading}
          contentContainerStyle={styles.contentContainer}
          keyExtractor={() => weekTimetable[0].dateISO}
          data={Array(1)}
          renderItem={() => <FreeWeek />}
          ListHeaderComponent={this.renderHeader()}
          ListFooterComponent={this.renderFooter()}
        />
      )
    }

    return (
      <FlatList
        onRefresh={onRefresh}
        refreshing={isLoading}
        initialScrollIndex={
          LocalisationManager.getMoment().isoWeekday() - 1
        }
        contentContainerStyle={styles.contentContainer}
        keyExtractor={this.keyExtractor}
        data={weekTimetable}
        renderItem={this.renderDay}
        ListHeaderComponent={this.renderHeader()}
        ListFooterComponent={this.renderFooter()}
      />
    )
  }
}

export default WeekView
