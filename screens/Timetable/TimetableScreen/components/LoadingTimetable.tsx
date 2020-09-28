import { Moment } from 'moment'
import React, { ReactElement } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { PageNoScroll } from '../../../../components/Containers'
import { BodyText } from '../../../../components/Typography'
import DateControls from './DateControls'

interface Props {
  date: Moment,
  onDateChanged: (date: Moment) => Promise<void>,
  onIndexChanged: (index: number) => void,
}

const styles = StyleSheet.create({
  header: {
    alignItems: `center`,
    marginBottom: 20,
  },
  loadingText: {
    marginBottom: 20,
  },
  messageContainer: {
    alignItems: `center`,
    flex: 1,
    justifyContent: `center`,
  },
  pageContainer: {
    padding: 20,
  },
})

const LoadingTimetable: React.FC<Props> = ({
  date,
  onDateChanged,
  onIndexChanged,
}): ReactElement => (
  <PageNoScroll style={styles.pageContainer}>
    <View style={styles.header}>
      <DateControls
        date={date}
        onDateChanged={onDateChanged}
        onIndexChanged={onIndexChanged}
      />
    </View>
    <View style={styles.messageContainer}>
      <BodyText style={styles.loadingText}>Loading timetable...</BodyText>
      <ActivityIndicator size="large" />
    </View>
  </PageNoScroll>
)

export default LoadingTimetable
