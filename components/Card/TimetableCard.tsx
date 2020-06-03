import { Feather } from "@expo/vector-icons"
import React from "react"
import { StyleSheet } from "react-native"

import { LocalisationManager } from "../../lib"
import { Horizontal } from "../Containers"
import LiveIndicator from "../LiveIndicator"
import { BodyText } from "../Typography"
import Card from "./Card"

const styles = StyleSheet.create({
  nowIndicator: {
    marginLeft: 10,
  },
  timeContainer: {
    justifyContent: `flex-start`,
  },
})

interface Props {
  moduleName?: string,
  moduleCode?: string,
  startTime?: string | Date,
  endTime?: string | Date,
  location?: string,
  lecturer?: string,
  pastEvent?: boolean,
  navigation?: any,
}

const TimetableCard: React.FC<Props> = ({
  moduleName = ``,
  moduleCode = `ABCD123D`,
  startTime = LocalisationManager.getMoment().toISOString(),
  endTime = LocalisationManager.getMoment().toISOString(),
  location = `TBC`,
  lecturer = `Unknown Lecturer`,
  navigation,
  pastEvent = false,
}) => {
  const startMoment = LocalisationManager.parseToMoment(
    startTime,
    `YYYY-MM-DD HH:mm`,
  )
  const endMoment = LocalisationManager.parseToMoment(
    endTime,
    `YYYY-MM-DD HH:mm`,
  )
  const start = startMoment.format(`HH:mma`)
  const end = endMoment.format(`HH:mma`)
  const happeningNow = (
    LocalisationManager.getMoment().isSameOrAfter(startMoment)
    && LocalisationManager.getMoment().isSameOrBefore(endMoment)
  )
  return (
    <Card
      old={pastEvent}
      title={moduleCode}
      onPress={() => {
        navigation.navigate(`Main`, {
          params: {
            params: {
              code: moduleCode,
              date: startMoment.format(`YYYY-MM-DD`),
              module: moduleName,
              time: startMoment.format(`HH:mm`),
            },
            screen: `TimetableDetail`,
          },
          screen: `Timetable`,
        })
      }}
    >
      <BodyText>{moduleName}</BodyText>
      <Horizontal style={styles.timeContainer}>
        <BodyText>
          <Feather name="clock" />
          {` ${start} - ${end}`}
        </BodyText>
        {happeningNow ? (
          <LiveIndicator style={styles.nowIndicator}>Now</LiveIndicator>
        ) : null}
      </Horizontal>
      {!pastEvent && (
        <>
          <BodyText>
            <Feather name="map-pin" />
            {` `}
            {location}
          </BodyText>
          <BodyText>
            <Feather name="user" />
            {` `}
            {lecturer === `unknown` ? `Unknown Lecturer` : lecturer}
          </BodyText>
        </>
      )}
    </Card>
  )
}

export default TimetableCard
