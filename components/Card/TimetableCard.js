import { Feather } from "@expo/vector-icons"
import PropTypes from "prop-types"
import React from "react"
import { StyleSheet } from "react-native"

import { LocalisationManager } from "../../lib"
import { Horizontal } from "../Containers"
import LiveIndicator from "../LiveIndicator"
import { BodyText } from "../Typography"
import Card from "."

const styles = StyleSheet.create({
  nowIndicator: {
    marginLeft: 10,
  },
  timeContainer: {
    justifyContent: `flex-start`,
  },
})

const TimetableCard = ({
  moduleName,
  moduleCode,
  startTime,
  endTime,
  location,
  lecturer,
  navigation,
  pastEvent,
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
        navigation.navigate(`TimetableDetail`, {
          code: moduleCode,
          date: startMoment.format(`YYYY-MM-DD`),
          module: moduleName,
          time: startMoment.format(`HH:mm`),
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

TimetableCard.propTypes = {
  endTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  lecturer: PropTypes.string,
  location: PropTypes.string,
  moduleCode: PropTypes.string,
  moduleName: PropTypes.string,
  navigation: PropTypes.shape().isRequired,
  pastEvent: PropTypes.bool,
  startTime: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

TimetableCard.defaultProps = {
  endTime: LocalisationManager.getMoment().toISOString(),
  lecturer: `Unknown Lecturer`,
  location: `TBC`,
  moduleCode: `ABCD123D`,
  moduleName: ``,
  pastEvent: false,
  startTime: LocalisationManager.getMoment().toISOString(),
}

export default TimetableCard
