import React from "react"
import { StyleSheet, View, ViewStyle } from "react-native"
import { Page } from "../../../components/Containers"
import {
  BodyText,
  Link,
} from "../../../components/Typography"
import FAQ from './FAQ'

interface Style {
  about: ViewStyle,
  answerContainer: ViewStyle,
  padder: ViewStyle,
}

const styles = StyleSheet.create<Style>({
  about: {
    marginTop: 20,
  },
  answerContainer: {
    flexDirection: `row`,
    flexWrap: `wrap`,
  },
  padder: {
    height: 20,
  },
})

const FAQScreen: React.FC = () => (
    <Page>
      <FAQ
        question="How does this app work?"
        answer={(
          <View style={styles.answerContainer}>
            <BodyText>
              This app is powered by the UCL API – a student-run
              platform for interacting with data not usually made available,
              or that is difficult to access through other UCL systems.
            </BodyText>
            <Link
              href="https://uclapi.com"
              style={styles.about}
            >
              About the UCL API
            </Link>
          </View>
        )}
      />

      <FAQ
        question="What does the 'last modified' date on my timetable mean?"
        answer={(
          <BodyText>
            This timestamp indicates the date and time a change was
            made to your timetable by UCL.
          </BodyText>
        )}
      />

      <FAQ
        question="How do you know how busy the study spaces are?"
        answer={(
          <BodyText>
            Under almost every desk in UCL&apos;s libraries, there is a
            sensor that detects the presence of a person. UCL Assistant
            displays this information in-app. We tally up the number of
            occupied seats in each study space to give you a real time
            overview of which locations are the most busy!
          </BodyText>
        )}
      />

      <FAQ
        question="Does this violate students' privacy?"
        answer={(
          <BodyText>
            The sensors don&apos;t capture any photos or audio. In fact,
            they don&apos;t tell us anything beyond whether a seat
            is occupied or not.
          </BodyText>
        )}
      />

      <FAQ
        question={
          `What about people who get up and leave their`
          + ` belongings on the desk?`
        }
        answer={(
          <BodyText>
            Desks remain marked as &quot;occupied&quot; for roughly 30
            minutes after the sensors below stop detecting a person.
            This accounts for temporary absences..
          </BodyText>
        )}
      />

      <FAQ
        question="What do the charts show?"
        answer={(
          <BodyText>
            The charts display the average number of seats occupied
            throughout the day. This can be useful in working out when
            the space is most quiet, and how likely you are to get a seat
            at any given time.
          </BodyText>
        )}
      />

      <FAQ
        question="How are the averages calculated?"
        answer={(
          <BodyText>
            These averages are taken over the last thirty days, so they
            should account for peculiarities like exam season or holidays.
          </BodyText>
        )}
      />

      <FAQ
        question="What does the red bar mean on the charts?"
        answer={(
          <BodyText>
            The red bar indicates the number of seats currently occupied.
            You can compare this against the chart (representing average
            occupancy) to find out whether the space is busier or quieter
            than it normally is.
          </BodyText>
        )}
      />

      <FAQ
        question="More questions?"
        answer={(
          <View style={styles.answerContainer}>
            <BodyText>
              We&apos;d love to hear from you. Feel free to reach out to us
              if you have any more questions or want to learn more about
              UCL Assistant. You can reach out to the team by using the
              feedback button on the Settings page, or by creating an issue
              on our&nbsp;
            </BodyText>
            <Link href="https://github.com/uclapi/ucl-assistant-app">
              GitHub
            </Link>
            <BodyText>&nbsp;page.</BodyText>
          </View>
        )}
      />
      <View style={styles.padder} />
    </Page>
)

export default FAQScreen
