import React, { useCallback } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Page } from '../../../components/Containers'
import { BodyText, SubtitleText, Link } from '../../../components/Typography'
import Button from "../../../components/Button"
import { AssetManager, WebBrowserManager } from '../../../lib'

const styles = StyleSheet.create({
  bookingButton: {
    marginTop: 20,
  },
  container: {},
  explanation: {
    marginBottom: 10,
    marginTop: 10,
  },
  image: {
    alignSelf: `center`,
    height: 200,
    marginTop: 5,
    width: 200,
  },
})

const StudySpacesNoticeScreen: React.FC = () => {
  const openBookingPage = useCallback(
    () => WebBrowserManager.openLink(`https://library-calendars.ucl.ac.uk/r/`),
    [],
  )

  return (
    <Page>
      <View style={styles.container}>
        <SubtitleText>StudySpaces</SubtitleText>
        <Image
          source={AssetManager.undraw.socialDistancing}
          resizeMethod="scale"
          resizeMode="contain"
          style={styles.image}
        />
        <BodyText style={styles.explanation}>
          Study spaces in libraries and in the various academic buildings are not
          available for walk-in use during the ongoing pandemic.
          They must be booked in advance.
        </BodyText>
        <BodyText splitByWord>
          You can find out more about the current policy around using the study spaces on the
          <Link splitByWord href="https://www.ucl.ac.uk/library/libraries-and-study-spaces/bookable-study-spaces-help">
            Library website
          </Link>
          .
        </BodyText>
        <Button onPress={openBookingPage} style={styles.bookingButton}>
          Book a StudySpace
        </Button>
      </View>
    </Page>
  )
}

export default StudySpacesNoticeScreen
