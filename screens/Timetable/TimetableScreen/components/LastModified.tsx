import moment from 'moment'
import React, { useMemo } from 'react'
import { StyleSheet, View } from 'react-native'
import { CentredText, ErrorText, Link } from "../../../../components/Typography"
import { LocalisationManager } from "../../../../lib"

const styles = StyleSheet.create({
  error: {
    marginBottom: 20,
  },
  lastModified: {
    alignItems: `center`,
    width: `100%`,
  },
})

interface Props {
  date?: string,
  isLoading?: boolean,
  lastModified: moment.Moment,
  openFAQ?: () => void,
}

const LastModified:React.FC<Props> = ({
  lastModified,
  openFAQ = (): void => {},
  isLoading = true,
  date = LocalisationManager.getMoment().toISOString(),
}) => {
  const isStale = useMemo(() => (
    !isLoading
    && lastModified
    && lastModified.isBefore(
      LocalisationManager.getMoment().subtract(24, `hour`),
    )
    // not stale if the data is more recent than the date
    && !lastModified.isAfter(
      LocalisationManager.parseToMoment(date).endOf(`isoWeek`),
    )
  ), [isLoading, lastModified, date])

  const lastUpdatedText = useMemo(() => (
    lastModified
    && lastModified.isBefore()
      ? lastModified.fromNow().toLowerCase()
      : `just now`
  ), [lastModified])

  return (
    <View style={styles.lastModified}>
      {isStale ? (
        <ErrorText containerStyle={styles.error}>
          Our timetable data is stale. Sorry about that.
          We&apos;re working on getting this fixed as quickly as possible.
        </ErrorText>
      ) : null}
      <Link onPress={openFAQ}>
        <CentredText>
          {`Last updated ${lastUpdatedText}`}
        </CentredText>
      </Link>
    </View>
  )
}

export default LastModified
