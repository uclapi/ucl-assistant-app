import PropTypes from "prop-types"
import React, { Component } from "react"
import { StyleSheet, View } from "react-native"

import { Page } from "../../components/Containers"
import {
  Link,
  TitleText,
} from "../../components/Typography"
import WebBrowserManager from "../../lib/WebBrowserManager"
import FAQ from './FAQ'

const styles = StyleSheet.create({
  padder: {
    height: 20,
  },
})

class FAQScreen extends Component {
  static propTypes = () => ({
    navigation: PropTypes.shape().isRequired,
  })

  openGithub = () => WebBrowserManager.openLink(
    `https://github.com/uclapi/ucl-assistant-app`,
  )

  openSettings = () => {
    const { navigation } = this.props
    navigation.navigate(`Settings`)
  }

  static navigationOptions = {
    title: `FAQs`,
  }

  render() {
    return (
      <Page>
        <TitleText>Frequently Asked Questions</TitleText>
        <FAQ
          question="How does this app work?"
          answer={(
            <>
              This app is powered by the&nbsp;
              <Link href="https://uclapi.com">UCL API</Link>
              &nbsp;– a student-run platform for interacting with
              data not usually made available, or that is difficult
              to access, through other UCL systems.
            </>
          )}
        />
        <FAQ
          question="How do we work out how busy the study spaces are?"
          answer={(
            <>
              Under almost every desk in UCL&apos;s libraries, there is a
              sensor that detects the presence of a person. UCL Assistant
              displays this information in-app. We tally up the number of
              occupied seats in each study space to give you a real time
              overview of which locations are the most busy!
            </>
          )}
        />
        <FAQ
          question="Does this violate students' privacy?"
          answer={(
            <>
              The sensors don&apos;t capture any photos or audio. In fact,
              they don&apos;t tell use anything beyond whether a seat
              is occupied or not.
            </>
          )}
        />

        <FAQ
          question={
            `What about people who get up and leave their`
            + ` belongings on the desk?`
          }
          answer={(
            <>
              Desks remain marked as &quot;occupied&quot; for roughly 30
              minutes after the sensors below stop detecting a person.
              This accounts for temporary absences..
            </>
          )}
        />

        <FAQ
          question="What do the charts show?"
          answer={(
            <>
              The charts display the average number of seats occupied
              throughout the day. This can be useful in working out when
              the space is most quiet, and how likely you are to get a seat
              at any given time.
            </>
          )}
        />

        <FAQ
          question="How are the averages calculated?"
          answer={(
            <>
              These averages are taken over the last thirty days, so they
              should account for peculiarities like exam season or holidays.
            </>
          )}
        />

        <FAQ
          question="What does the red bar mean on the charts?"
          answer={(
            <>
              The red bar indicates the number of seats currently occupied.
              You can compare this against the chart (representing average
              occupancy) to find out whether the space is busier or quieter
              than it normally is.
            </>
          )}
        />

        <FAQ
          question="More questions?"
          answer={(
            <>
              We&apos;d love to hear from you if you have any more questions or
              want to learn more about UCL Assistant. You can reach out to the
              team by using the feedback button on the
                <Link onClick={this.openSettings}>&nbsp;Settings page</Link>
              , or by creating an issue on
                <Link onPress={this.openGithub}>
                &nbsp;our GitHub page
                </Link>
              .
            </>
          )}
        />
        <View style={styles.padder} />
      </Page>
    )
  }
}

export default FAQScreen
