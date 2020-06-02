import PropTypes from "prop-types"
import React from "react"
import { StyleSheet, View } from "react-native"
import MapView from "react-native-maps"

import Button from "../../../components/Button"
import { Page } from "../../../components/Containers"
import {
  BodyText,
  ErrorText,
  Link,
  SubtitleText,
  TitleText,
} from "../../../components/Typography"
import { LocalisationManager, MailManager, MapsManager } from "../../../lib"
import MapStyle from "../../../styles/Map"

const styles = StyleSheet.create({
  contactPerson: {
    marginBottom: 20,
    marginTop: 20,
  },
  emailButton: {
    marginTop: 10,
  },
})

class TimetableDetailView extends React.Component {
  static propTypes = {
    contact: PropTypes.string,
    date: PropTypes.string,
    end_time: PropTypes.string,
    initialRegion: PropTypes.shape({
      latitude: PropTypes.number,
      latitudeDelta: PropTypes.number,
      longitude: PropTypes.number,
      longitudeDelta: PropTypes.number,
    }),
    location: PropTypes.shape({
      address: PropTypes.arrayOf(PropTypes.string),
      coordinates: PropTypes.shape({
        lat: PropTypes.string,
        lng: PropTypes.string,
      }),
      name: PropTypes.string,
      type: PropTypes.string,
    }),
    module: PropTypes.shape({
      department_name: PropTypes.string,
      email: PropTypes.string,
      lecturer: PropTypes.shape({
        department_id: PropTypes.string,
        department_name: PropTypes.string,
        email: PropTypes.string,
        name: PropTypes.string,
      }),
      name: PropTypes.string,
    }),
    navigation: PropTypes.shape().isRequired,
    session_group: PropTypes.string,
    session_type_str: PropTypes.string,
    start_time: PropTypes.string,
  }

  static defaultProps = {
    contact: ``,
    date: `2019-01-01`,
    end_time: ``,
    initialRegion: {
      latitude: 51.5246586,
      latitudeDelta: 0.0012,
      longitude: -0.1339784,
      longitudeDelta: 0.0071,
    },
    location: {
      address: [],
      coordinates: {
        lat: `51.5246586`,
        lng: `-0.1339784`,
      },
      name: ``,
      type: `DB`,
    },
    module: {
      department_name: ``,
      email: ``,
      lecturer: {
        department_id: ``,
        department_name: ``,
        email: ``,
        name: ``,
      },
      name: ``,
    },
    session_group: ``,
    session_type_str: ``,
    start_time: ``,
  }

  navigateToLocation = ({ lat, lng, address }) => () => {
    if (lat && lng) {
      MapsManager.navigateToCoords({ lat, lng })
    } else {
      MapsManager.navigateToAddress(address.join())
    }
  }

  sendEmail = (email) => () => MailManager.composeAsync({
    recipients: [email],
  })

  openRoomSearch = (roomName) => () => {
    const { navigation } = this.props
    navigation.navigate(`Main`, {
      params: {
        params: { query: roomName },
        screen: `RoomsSearch`,
      },
    })
  }

  renderContactPerson = ({
    contactTypeStr,
    contactPerson,
    departmentName,
    email,
  }) => {
    const validContactPerson = contactPerson && contactPerson.length > 0
    const validDepartment = departmentName && departmentName.length > 0
    const validEmail = email && email.length > 0
    if (!validContactPerson && !validEmail) {
      return null
    }
    return (
      <View style={styles.contactPerson}>
        <SubtitleText>{contactTypeStr}</SubtitleText>
        {validContactPerson ? (
          <BodyText>
            {`${contactPerson} - ${validDepartment ? departmentName : null}`}
          </BodyText>
        ) : null}
        {validEmail ? (
          <Button onPress={this.sendEmail(email)} style={styles.emailButton}>
            Send Email
          </Button>
        ) : null}
      </View>
    )
  }

  render() {
    let contactTypeStr = ``
    const {
      date,
      location,
      initialRegion,
      contact: contactPerson,
      module: { name: moduleName, department_name: departmentName, email },
      session_type_str: sessionTypeStr,
      session_group: sessionGroup,
      start_time: startTime,
      end_time: endTime,
    } = this.props
    const sessionType = sessionTypeStr.toLowerCase()
    switch (true) {
      case sessionType === `lecture`:
      case sessionType === `seminar`: {
        contactTypeStr = `Lecturer`
        break
      }
      case sessionType === `practical`:
      case sessionType === `problem based learning`: {
        contactTypeStr = `Instructor`
        break
      }
      default: {
        contactTypeStr = `Contact`
      }
    }

    const { lat, lng } = location.coordinates
    const latitude = parseFloat(lat, 10) || initialRegion.latitude
    const longitude = parseFloat(lng, 10) || initialRegion.longitude
    const { address, type: locationType, name: locationName } = location

    return (
      <Page>
        <TitleText>{moduleName}</TitleText>
        <BodyText>{LocalisationManager.parseToMoment(date).format(`dddd, Do MMMM YYYY`)}</BodyText>
        <BodyText>
          {`${startTime} - ${endTime}`}
        </BodyText>
        {locationType === `CB` ? (
          <Link onPress={this.openRoomSearch(locationName)}>
            {locationName}
          </Link>
        ) : (
            <BodyText>{locationName}</BodyText>
        )}
        <BodyText>
          {`Type: ${sessionTypeStr}`}
        </BodyText>
        {sessionGroup && sessionGroup.length > 0 ? (
          <BodyText>
            {`Group ${sessionGroup}`}
          </BodyText>
        ) : null}
        {(!lat || !lng) && (
          <ErrorText>
            Error: We couldn&apos;t fetch coordinates for this venue,
            &nbsp;so the map may be incorrect.
          </ErrorText>
        )}
        <MapView
          style={MapStyle.wideMap}
          initialRegion={initialRegion}
          region={{
            latitude,
            latitudeDelta: initialRegion.latitudeDelta,
            longitude,
            longitudeDelta: initialRegion.longitudeDelta,
          }}
        >
          <MapView.Marker coordinate={{ latitude, longitude }} />
        </MapView>
        <Button onPress={this.navigateToLocation({ address, lat, lng })}>
          Directions
        </Button>

        {this.renderContactPerson({
          contactPerson, contactTypeStr, departmentName, email,
        })}
      </Page>
    )
  }
}

export default TimetableDetailView
