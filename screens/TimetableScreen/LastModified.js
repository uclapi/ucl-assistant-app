import PropTypes from "prop-types"
import React from 'react'
import { momentObj } from "react-moment-proptypes"
import { StyleSheet } from 'react-native'

import { CentredText, ErrorText, Link } from "../../components/Typography"
import { LocalisationManager } from "../../lib"

const styles = StyleSheet.create({
  error: {
    marginBottom: 10,
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
      Our timetable information is stale. Sorry about that.
      We&apos;re working on getting this fixed as quickly as possible.
    </ErrorText>
  )

  render() {
    const { lastModified, openFAQ } = this.props

    if (lastModified === null || typeof lastModified !== `object`) {
      return null
    }

    const isStale = lastModified.isBefore(
      LocalisationManager.getMoment().subtract(30, `minutes`),
    )

    return (
      <>
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
      </>
    )
  }
}

export default LastModified
