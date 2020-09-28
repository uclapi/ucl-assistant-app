import { Moment } from 'moment'
import React, { ReactElement } from 'react'
import {
  ActivityIndicator, StyleSheet, View,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { BodyText } from '../../../../components/Typography'
import Header from './Header'

interface Props {
  date: Moment,
  onDateChanged: (date: Moment) => Promise<void>,
  onIndexChanged: (index: number) => void,
}

const styles = StyleSheet.create({
  loadingText: {
    marginBottom: 20,
  },
  messageContainer: {
    alignItems: `center`,
    marginTop: 80,
  },
  pageContainer: {
    flex: 1,
    padding: 20,
  },
})

const LoadingTimetable: React.FC<Props> = ({
  date,
  onDateChanged,
  onIndexChanged,
}): ReactElement => (
  <ScrollView style={styles.pageContainer}>
    <Header
      date={date}
      onDateChanged={onDateChanged}
      onIndexChanged={onIndexChanged}
    />
    <View style={styles.messageContainer}>
      <BodyText style={styles.loadingText}>Loading timetable...</BodyText>
      <ActivityIndicator size="large" />
    </View>
  </ScrollView>
)

export default LoadingTimetable
