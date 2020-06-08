import React from "react"
import { StyleSheet, View } from "react-native"
import MapView, { Marker } from "react-native-maps"

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
import type {
  MailManagerComposeAsyncReturnType,
} from "../../../lib/MailManager"
import MapStyle from "../../../styles/Map"
import type { Region, TimetableEvent } from "../../../types/uclapi"
import type { TimetableNavigatorNavigationType } from "../TimetableNavigator"

const styles = StyleSheet.create({
  contactPerson: {
    marginBottom: 20,
    marginTop: 20,
  },
  emailButton: {
    marginTop: 10,
  },
})

interface Props extends TimetableEvent {
  navigation: TimetableNavigatorNavigationType,
  initialRegion: Region,
}


class TimetableDetailView extends React.Component<Props> {
  navigateToLocation = (
    {
      lat,
      lng,
      address,
    }: {
      lat: string,
      lng: string,
      address: Array<string>,
    },
  ) => (): void => {
    if (lat && lng) {
      MapsManager.navigateToCoords({ lat, lng })
    } else {
      MapsManager.navigateToAddress(address.join())
    }
  }

  sendEmail = (
    email: string,
  ) => (): MailManagerComposeAsyncReturnType => MailManager.composeAsync({
    recipients: [email],
  })

  openRoomSearch = (roomName: string) => (): void => {
    const { navigation } = this.props
    navigation.navigate(`Main`, {
      params: {
        initial: false,
        params: { query: roomName },
        screen: `RoomsSearch`,
      },
      screen: `Rooms`,
    })
  }

  renderContactPerson = ({
    contactTypeStr,
    contactPerson,
    departmentName,
    email,
  }: {
    contactTypeStr: string,
    contactPerson: string,
    departmentName: string,
    email: string,
  }): React.ReactNode => {
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

  render(): React.ReactElement {
    let contactTypeStr = ``
    const {
      date = `2019-01-01`,
      location = {
        address: [],
        coordinates: {
          lat: `0`,
          lng: `0`,
        },
        name: ``,
        type: ``,
      },
      initialRegion = {
        latitude: 51.5246586,
        latitudeDelta: 0.0012,
        longitude: -0.1339784,
        longitudeDelta: 0.0071,
      },
      contact: contactPerson = ``,
      module: { name: moduleName, department_name: departmentName, email } = {},
      session_type_str: sessionTypeStr = ``,
      session_group: sessionGroup = ``,
      start_time: startTime = ``,
      end_time: endTime = ``,
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
    const latitude = parseFloat(lat) || initialRegion.latitude
    const longitude = parseFloat(lng) || initialRegion.longitude
    const { address, type: locationType, name: locationName } = location

    return (
      <Page>
        <TitleText>{moduleName}</TitleText>
        <BodyText>
          {LocalisationManager.parseToMoment(date).format(`dddd, Do MMMM YYYY`)}
        </BodyText>
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
          <Marker coordinate={{ latitude, longitude }} />
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
