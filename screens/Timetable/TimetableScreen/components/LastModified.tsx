import moment from 'moment'
import React from 'react'
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
  date: string,
  isLoading: boolean,
  lastModified: string | moment.Moment,
  openFAQ: () => void,
}

class LastModified extends React.Component<Props> {
  static defaultProps = {
    date: LocalisationManager.getMoment(),
    isLoading: true,
    lastModified: null,
    openFAQ: () => null,
  }

  renderError = () => (
    <ErrorText containerStyle={styles.error}>
      Our timetable data is stale. Sorry about that.
      We&apos;re working on getting this fixed as quickly as possible.
    </ErrorText>
  )

  render() {
    const {
      lastModified, openFAQ, isLoading, date,
    } = this.props

    if (lastModified === null || typeof lastModified !== `object`) {
      return null
    }

    const isStale = (
      !isLoading
      && lastModified.isBefore(
        LocalisationManager.getMoment().subtract(24, `hour`),
      )
      // not stale if the data is more recent than the date
      && !lastModified.isAfter(
        LocalisationManager.parseToMoment(date).endOf(`isoWeek`),
      )
    )

    return (
      <View style={styles.lastModified}>
        {isStale ? this.renderError() : null}
        <Link onPress={openFAQ}>
          <CentredText>
            {`Last updated ${
              lastModified.isBefore()
                ? lastModified.fromNow().toLowerCase()
                : `just now`
            }`}
          </CentredText>
        </Link>
      </View>
    )
  }
}

export default LastModified
