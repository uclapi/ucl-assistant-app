import { Moment } from "moment"
import React from 'react'
import { StyleSheet } from 'react-native'

import { BodyText, ErrorText } from "../../../components/Typography"
import { LocalisationManager } from '../../../lib'

const styles = StyleSheet.create({
  error: {
    marginBottom: 10,
  },
})

interface Props {
  lastModified: Moment | string,
}

class LastUpdated extends React.Component<Props> {
  renderLoading = (): React.ReactElement => <BodyText>Loading...</BodyText>

  renderError = (): React.ReactElement => (
    <ErrorText containerStyle={styles.error}>
      Our studyspace data is stale. Sorry about that.
      We&apos;re working on getting this fixed as quickly as possible.
    </ErrorText>
  )

  render(): React.ReactElement {
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
