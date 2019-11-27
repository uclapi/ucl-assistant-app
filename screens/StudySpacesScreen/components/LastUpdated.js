import PropTypes from "prop-types"
import React from 'react'
import { momentObj } from "react-moment-proptypes"
import { StyleSheet } from 'react-native'

import { BodyText, ErrorText } from "../../../components/Typography"
import { LocalisationManager } from '../../../lib'

const styles = StyleSheet.create({
  error: {
    marginBottom: 10,
  },
})

class LastUpdated extends React.Component {
  static propTypes = {
    lastModified: PropTypes.oneOfType([momentObj, PropTypes.string]),
  }

  static defaultProps = {
    lastModified: null,
  }

  renderLoading = () => <BodyText>Loading...</BodyText>

  renderError = () => (
    <ErrorText containerStyle={styles.error}>
      Our studyspace data is stale. Sorry about that.
      We&apos;re working on getting this fixed as quickly as possible.
    </ErrorText>
  )

  render() {
    const { lastModified } = this.props
    if (lastModified === null || typeof lastModified !== `object`) {
      return this.renderLoading()
    }

    const isStale = lastModified.isBefore(
      LocalisationManager.getMoment().subtract(5, `minutes`),
    )

    return (
      <>
        {
          isStale ? this.renderError() : null
        }
        <BodyText>
          {`Last updated ${lastModified.calendar().toLowerCase()}`}
        </BodyText>
      </>
    )
  }
}

export default LastUpdated
