import { Feather } from "@expo/vector-icons"
import moment from "moment"
import PropTypes from "prop-types"
import React from "react"
import { StyleSheet } from "react-native"

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
  const startMoment = moment(startTime, `YYYY-MM-DD HH:mm`)
  const endMoment = moment(endTime, `YYYY-MM-DD HH:mm`)
  const start = startMoment.format(`HH:mma`)
  const end = endMoment.format(`HH:mma`)
  const happeningNow = moment().isSameOrAfter(startMoment) && moment().isSameOrBefore(endMoment)
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
  endTime: moment().toISOString(),
  lecturer: `Unknown Lecturer`,
  location: `TBC`,
  moduleCode: `ABCD123D`,
  moduleName: ``,
  pastEvent: false,
  startTime: moment().toISOString(),
}

export default TimetableCard
