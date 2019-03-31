import React from "react";
import { StyleSheet, View } from "react-native";
import PropTypes from "prop-types";
import { MapView } from "expo";
import moment from "moment";
import {
  ErrorText,
  TitleText,
  SubtitleText,
  BodyText,
  Link,
} from "../../components/Typography";
import Button from "../../components/Button";
import { Page } from "../../components/Containers";
import MapStyle from "../../styles/Map";
import MapsManager from "../../lib/MapsManager";
import MailManager from "../../lib/MailManager";

const styles = StyleSheet.create({
  contactPerson: {
    marginBottom: 20,
    marginTop: 20,
  },
  emailButton: {
    marginTop: 10,
  },
});

class TimetableDetailView extends React.Component {
  navigateToLocation = ({ lat, lng, address }) => () => {
    if (lat && lng) {
      MapsManager.navigateToCoords({ lat, lng });
    } else {
      MapsManager.navigateToAddress(address.join());
    }
  };

  sendEmail = email => () => {
    MailManager.composeAsync({
      recipients: [email],
    });
  };

  openRoomSearch = roomName => () => {
    const { navigation } = this.props;
    navigation.navigate("Rooms", { query: roomName });
  };

  render() {
    let contactTypeStr = "";
    const {
      date,
      location,
      initialRegion,
      contact: contactPerson,
      module,
      session_type_str: sessionTypeStr,
      session_group: sessionGroup,
      start_time: startTime,
      end_time: endTime,
    } = this.props;
    const sessionType = sessionTypeStr.toLowerCase();
    switch (true) {
      case sessionType === "lecture":
      case sessionType === "seminar": {
        contactTypeStr = "Lecturer";
        break;
      }
      case sessionType === "practical":
      case sessionType === "problem based learning": {
        contactTypeStr = "Instructor";
        break;
      }
      default: {
        contactTypeStr = "Contact";
      }
    }

    const { lat, lng } = location.coordinates;
    const latitude = parseFloat(lat, 10) || initialRegion.latitude;
    const longitude = parseFloat(lng, 10) || initialRegion.longitude;
    const { address, type: locationType, name: locationName } = location;

    const { department_name: departmentName, email } = module.lecturer;

    return (
      <Page>
        <TitleText>{module.name}</TitleText>
        <BodyText>{moment(date).format("dddd, Do MMMM YYYY")}</BodyText>
        <BodyText>
          {startTime} - {endTime}
        </BodyText>
        {locationType === "CB" ? (
          <Link onPress={this.openRoomSearch(locationName)}>
            {locationName}
          </Link>
        ) : (
          <BodyText>{locationName}</BodyText>
        )}
        <BodyText>Type: {sessionTypeStr}</BodyText>
        {sessionGroup && sessionGroup.length > 0 ? (
          <BodyText>Group {sessionGroup}</BodyText>
        ) : null}
        {(!lat || !lng) && (
          <ErrorText>
            Error: We couldn{"'"}t fetch coordinates for this venue, so the map
            may be incorrect.
          </ErrorText>
        )}
        <MapView
          style={MapStyle.wideMap}
          initialRegion={initialRegion}
          region={{
            latitude,
            longitude,
            latitudeDelta: initialRegion.latitudeDelta,
            longitudeDelta: initialRegion.longitudeDelta,
          }}
        >
          <MapView.Marker coordinate={{ latitude, longitude }} />
        </MapView>
        <Button
          onPress={() => {
            if (lat && lng) {
              MapsManager.navigateToCoords({ lat, lng });
            } else {
              MapsManager.navigateToAddress(address.join());
            }
          }}
        >
          Directions
        </Button>

        <View style={styles.contactPerson}>
          <SubtitleText>{contactTypeStr}</SubtitleText>
          {contactPerson && contactPerson.length > 0 ? (
            <BodyText>
              {contactPerson}{" "}
              {departmentName && departmentName.length > 0
                ? `(${departmentName})`
                : null}
            </BodyText>
          ) : null}
          {email && email.length > 0 ? (
            <Button onPress={this.sendEmail(email)} style={styles.emailButton}>
              Send Email
            </Button>
          ) : null}
        </View>

        {__DEV__ && <SubtitleText>Debug Information</SubtitleText>}
        {__DEV__ && <BodyText>{JSON.stringify(this.props, "\n", 2)}</BodyText>}
      </Page>
    );
  }
}

TimetableDetailView.propTypes = {
  initialRegion: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    latitudeDelta: PropTypes.number,
    longitudeDelta: PropTypes.number,
  }),
  date: PropTypes.string,
  start_time: PropTypes.string,
  end_time: PropTypes.string,
  contact: PropTypes.string,
  location: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.arrayOf(PropTypes.string),
    coordinates: PropTypes.shape({
      lat: PropTypes.string,
      lng: PropTypes.string,
    }),
    type: PropTypes.string,
  }),
  module: PropTypes.shape({
    name: PropTypes.string,
    lecturer: PropTypes.shape({
      department_id: PropTypes.string,
      department_name: PropTypes.string,
      email: PropTypes.string,
      name: PropTypes.string,
    }),
  }),
  session_type_str: PropTypes.string,
  session_group: PropTypes.string,
  navigation: PropTypes.shape().isRequired,
};

TimetableDetailView.defaultProps = {
  initialRegion: {
    latitude: 51.5246586,
    longitude: -0.1339784,
    latitudeDelta: 0.0012,
    longitudeDelta: 0.0071,
  },
  date: "2019-01-01",
  start_time: "",
  end_time: "",
  contact: "",
  location: {
    name: "",
    address: [],
    coordinates: {
      lat: "51.5246586",
      lng: "-0.1339784",
    },
    type: "DB",
  },
  module: {
    name: "",
    lecturer: {
      department_id: "",
      department_name: "",
      email: "",
      name: "",
    },
  },
  session_type_str: "",
  session_group: "",
};

export default TimetableDetailView;
