import { Moment } from "moment"
import React, { ReactElement, ReactNode } from 'react'
import {
  FlatList, Platform, StyleSheet, View,
} from 'react-native'
import Button from "../../../../components/Button"
import TimetableCard from "../../../../components/Card/TimetableCard"
import {
  HeaderText,
  TitleText,
} from "../../../../components/Typography"
import { LocalisationManager } from "../../../../lib"
import type { TimetableNavigationType } from "../../TimetableNavigator"
import FreeWeek from "./FreeWeek"
import Header from "./Header"
import LastModified from "./LastModified"

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,
    padding: 20,
  },
  dayContainer: {
    alignItems: `flex-start`,
    flexDirection: `row`,
    ...(Platform.OS === `android` ? { flex: 1 } : {}),
    justifyContent: `flex-start`,
  },
  dayLeft: {
    alignItems: `flex-end`,
    paddingRight: 10,
    width: 85,
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
  jumpToToday: {
    marginTop: 20,
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

  renderJumpToToday = (): ReactNode => {
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

  renderTimetableCard = (date: Moment) => (item): ReactNode => {
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
        moduleCode={moduleId || `Unknown`}
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
      date,
      onDateChanged,
      onIndexChanged,
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
          ListHeaderComponent={(
            <Header
              date={date}
              onDateChanged={onDateChanged}
              onIndexChanged={onIndexChanged}
            />
          )}
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
        ListHeaderComponent={(
          <Header
            date={date}
            onDateChanged={onDateChanged}
            onIndexChanged={onIndexChanged}
          />
        )}
        ListFooterComponent={this.renderFooter()}
      />
    )
  }
}

export default WeekView
