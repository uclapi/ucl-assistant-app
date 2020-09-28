import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Moment } from 'moment'
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
    flex: 1,
    flexDirection: `column`,
    marginBottom: 20,
  },
  weekText: {
    marginBottom: 10,
  },
})

const Header: React.FC<Props> = ({
  date,
  onDateChanged,
  onIndexChanged,
}) => {
  const firstDate = date.clone().startOf(`isoWeek`).format(`Do MMM`)
  const secondDate = date.clone().endOf(`isoWeek`).format(`Do MMM`)
  const weekText = `${firstDate} - ${secondDate}`

  return (
    <View style={styles.header}>
      <View style={styles.weekText}>
        <BodyText>{weekText}</BodyText>
      </View>
      <DateControls
        date={date}
        onDateChanged={onDateChanged}
        onIndexChanged={onIndexChanged}
      />
    </View>
  )
}

export default Header
