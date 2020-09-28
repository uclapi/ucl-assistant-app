import { Moment } from "moment"
import React, { ReactElement } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import Button from "../../../../components/Button"
import TimetableCard from "../../../../components/Card/TimetableCard"
import {
  BodyText,
  HeaderText,
  TitleText,
} from "../../../../components/Typography"
import { LocalisationManager } from "../../../../lib"
import type { TimetableNavigationType } from "../../TimetableNavigator"
import DateControls from './DateControls'
import FreeWeek from "./FreeWeek"
import LastModified from "./LastModified"

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
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

interface Props {
  date: Moment,
  isLoading: boolean,
  navigation: TimetableNavigationType,
  onDateChanged: (date: Moment) => Promise<void>,
  onIndexChanged: (index: number) => void,
  onRefresh: () => Promise<unknown>,
  timetable: any,
}

class WeekView extends React.Component<Props> {
  keyExtractor = (day: any): string => day.dateISO

  openFAQ = (): void => {
    const { navigation } = this.props
    navigation.navigate(`Main`, {
      params: {
        screen: `FAQ`,
      },
      screen: `Settings`,
    })
    return null
  }

  jumpToToday = (): void => {
    const { onDateChanged } = this.props
    onDateChanged(LocalisationManager.getMoment())
  }

  renderHeader = (): ReactElement => {
    const {
      date,
      onDateChanged,
      onIndexChanged,
      timetable: weekTimetable = [],
    } = this.props

    const firstDate = LocalisationManager.parseToMoment(
      weekTimetable[0].dateISO,
    ).format(`Do MMM`)
    const secondDate = LocalisationManager.parseToMoment(
      weekTimetable[0].dateISO,
    ).endOf(`isoWeek`).format(`Do MMM`)
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

  renderJumpToToday = (): (ReactElement | void) => {
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

  renderFooter = (): ReactElement => {
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

  renderTimetableCard = (date: Moment) => (item) => {
    const { navigation } = this.props
    const dateISO = date.format(`YYYY-MM-DD`)

    const {
      module: {
        name: moduleName,
        module_id: moduleId,
        lecturer,
      },
      location: {
        name: locationName,
      },
      session_type_str: sessionTypeStr,
      session_type: sessionType,
      start_time: startTime,
      end_time: endTime,
      contact,
    } = item

    const past = LocalisationManager.parseToDate(
      `${dateISO}T${item.end_time}`,
    ).getTime() - LocalisationManager.now().getTime() < 0
    return (
      <TimetableCard
        moduleName={moduleName}
        moduleCode={moduleId}
        startTime={`${dateISO} ${startTime}`}
        endTime={`${dateISO} ${endTime}`}
        location={(/online/gi).test(sessionTypeStr) ? sessionTypeStr : (locationName || `TBA`)}
        lecturer={contact || lecturer?.name || `Unknown Lecturer`}
        pastEvent={past}
        key={`${dateISO}-${moduleId}-${startTime}-${endTime}-${sessionType}`}
        navigation={navigation}
      />
    )
  }

  renderDay = ({ item: { dateISO, timetable = [] } }): ReactElement => {
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

  render(): ReactElement {
    const {
      timetable: weekTimetable = [],
      onRefresh,
      isLoading,
    } = this.props

    const emptyWeek = weekTimetable.every(
      ({ timetable = [] }) => timetable.length === 0,
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

    const isoDayOfWeek = LocalisationManager.getMoment().isoWeekday()
    const initialScrollIndex = isoDayOfWeek >= 5 ? 0 : (isoDayOfWeek - 1)

    return (
      <FlatList
        onRefresh={onRefresh}
        refreshing={isLoading}
        initialScrollIndex={initialScrollIndex}
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
