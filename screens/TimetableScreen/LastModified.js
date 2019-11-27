import PropTypes from "prop-types"
import React from 'react'
import { momentObj } from "react-moment-proptypes"
import { StyleSheet, View } from 'react-native'

import { CentredText, ErrorText, Link } from "../../components/Typography"
import { LocalisationManager } from "../../lib"

const styles = StyleSheet.create({
  error: {
    marginBottom: 20,
  },
  lastModified: {
    marginTop: 20,
  },
})

class LastModified extends React.Component {
  static propTypes = {
    lastModified: PropTypes.oneOfType([momentObj, PropTypes.string]),
    openFAQ: PropTypes.func,
  }

  static defaultProps = {
    lastModified: null,
    openFAQ: () => { },
  }

  renderError = () => (
    <ErrorText containerStyle={styles.error}>
      Our timetable data is stale. Sorry about that.
      We&apos;re working on getting this fixed as quickly as possible.
    </ErrorText>
  )

  render() {
    const { lastModified, openFAQ } = this.props

    if (lastModified === null || typeof lastModified !== `object`) {
      return null
    }

    const isStale = lastModified.isBefore(
      LocalisationManager.getMoment().subtract(12, `hour`),
    )

    return (
      <View style={styles.lastModified}>
        {isStale ? this.renderError() : null}
        <Link onPress={openFAQ}>
          <CentredText>
            {`Last updated ${
              LocalisationManager.parseToMoment(
                lastModified,
              ).calendar().toLowerCase()
            }`}
          </CentredText>
        </Link>
      </View>
    )
  }
}

export default LastModified
