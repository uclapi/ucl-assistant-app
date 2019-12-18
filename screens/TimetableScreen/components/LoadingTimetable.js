import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'

import { PageNoScroll } from '../../../components/Containers'
import { BodyText } from '../../../components/Typography'

const styles = StyleSheet.create({
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

const LoadingTimetable = () => (
  <PageNoScroll style={styles.pageContainer}>
    <View style={styles.messageContainer}>
      <BodyText style={styles.loadingText}>Loading timetable...</BodyText>
      <ActivityIndicator size="large" />
    </View>
  </PageNoScroll>
)

export default LoadingTimetable
