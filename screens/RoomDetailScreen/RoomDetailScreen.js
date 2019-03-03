import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { MapView } from "expo";
import { generate } from "shortid";
import moment from "moment";
import PropTypes from "prop-types";
import MapsManager from "../../lib/MapsManager";
import Button from "../../components/Button";
import { Page, Horizontal } from "../../components/Containers";
import {
  BodyText,
  TitleText,
  ErrorText,
  SubtitleText,
  SearchResultTopText,
} from "../../components/Typography";
import MapStyle from "../../styles/Map";
import ApiManager from "../../lib/ApiManager";
import Colors from "../../constants/Colors";
import Shadow from "../../lib/Shadow";

const styles = StyleSheet.create({
  address: {
    marginVertical: 20,
  },
  booking: {
    backgroundColor: Colors.cardBackground,
    marginVertical: 5,
    padding: 20,
    ...Shadow(2),
  },
  bookingHeader: {
    backgroundColor: Colors.accentColor,
    color: Colors.cardBackground,
    marginBottom: 5,
    padding: 20,
    ...Shadow(2),
  },
  bookingList: {
    marginTop: 20,
  },
  cardHeader: {
    borderBottomColor: Colors.dividerLine,
    borderBottomWidth: 0.5,
    marginBottom: 5,
    paddingBottom: 5,
  },
  container: {
    flex: 1,
  },
  coordinatesError: {
    marginBottom: 10,
  },
  details: {
    justifyContent: "space-between",
    marginTop: 20,
  },
  equipmentList: {
    backgroundColor: Colors.cardBackground,
    marginTop: 20,
    padding: 20,
    ...Shadow(2),
  },
  padder: {
    height: 20,
  },
});

const initialRegion = {
  latitude: 51.5246586,
  longitude: -0.1339784,
  latitudeDelta: 0.0012,
  longitudeDelta: 0.0071,
};

class RoomDetailScreen extends Component {
  static navigationOptions = {
    title: "Room Detail",
  };
  static propTypes = {
    navigation: PropTypes.shape().isRequired,
    token: PropTypes.string,
  };
  static defaultProps = {
    token: "",
  };
  static mapStateToProps = state => ({
    token: state.user.token,
  });
  constructor() {
    super();
    this.state = {
      roombookings: [],
      equipment: [],
      fetchEquipmentError: null,
      fetchBookingsError: null,
    };
  }
  componentDidMount() {
    const { token, navigation } = this.props;
    const { room } = navigation.state.params;
    const { roomid, siteid } = room;
    this.fetchEquipment(token, roomid, siteid);
    this.fetchRoomBookings(token, roomid, siteid);
  }
  fetchEquipment = async (token, roomid, siteid) => {
    try {
      const equipment = await ApiManager.rooms.getEquipment(token, {
        roomid,
        siteid,
      });
      this.setState({ equipment });
    } catch (error) {
      this.setState({ fetchEquipmentError: error.message });
    }
  };
  fetchRoomBookings = async (token, roomid, siteid) => {
    try {
      const roombookings = await ApiManager.rooms.getBookings(token, {
        roomid,
        siteid,
        date: "20190225",
      });
      this.setState({ roombookings });
    } catch (error) {
      this.setState({ fetchBookingsError: error.message });
    }
  };
  renderEquipment = ({ description, units }) => {
    if (description === "Wheelchair accessible") {
      return (
        <BodyText key={generate()}>
          This room is accessible via wheelchair
        </BodyText>
      );
    }
    return (
      <BodyText key={generate()}>
        {units} x {description}
      </BodyText>
    );
  };
  renderBooking = ({
    start_time: start,
    end_time: end,
    description,
    contact,
  }) => (
    <View style={styles.booking} key={generate()}>
      <SearchResultTopText>
        {moment(start).format("HH:mm")}hrs - {moment(end).format("HH:mm")}hrs
      </SearchResultTopText>
      {contact && <BodyText>booked by {contact}</BodyText>}
      <BodyText>{description}</BodyText>
    </View>
  );
  render() {
    const {
      equipment,
      fetchEquipmentError,
      fetchBookingsError,
      roombookings,
    } = this.state;
    const { room } = this.props.navigation.state.params;
    const {
      roomname: name,
      classification_name: classification,
      total,
      location,
    } = room;
    const { address } = location;
    const addressString = address.filter(str => str.length > 0).join("\n");

    let { latitude, longitude } = initialRegion;
    let invalidCoordinates = false;

    if (
      location.coordinates &&
      location.coordinates.lat &&
      location.coordinates.lng
    ) {
      const { lat, lng } = location.coordinates;
      latitude = Number.parseFloat(lat, 10);
      longitude = Number.parseFloat(lng, 10);
    } else {
      invalidCoordinates = true;
    }

    const navigateToLocation = () =>
      invalidCoordinates
        ? MapsManager.navigateToAddress(addressString)
        : MapsManager.navigateToCoords({ lat: latitude, lng: longitude });

    return (
      <View style={styles.container}>
        <Page>
          <TitleText>{name}</TitleText>
          <Horizontal style={styles.details}>
            <BodyText>{classification}</BodyText>
            <BodyText>Capacity: {total}</BodyText>
          </Horizontal>
          <View style={styles.address}>
            <BodyText>{addressString}</BodyText>
          </View>
          {invalidCoordinates ? (
            <View style={styles.coordinatesError}>
              <ErrorText>
                Error: We couldn{"'"}t fetch coordinates for this venue, so the
                location displayed on the map may be incorrect.
              </ErrorText>
            </View>
          ) : null}
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
          <View style={styles.navigate}>
            <Button onPress={navigateToLocation}>Directions</Button>
          </View>
          {fetchEquipmentError ? (
            <ErrorText>
              Error: We couldn{"'"}t fetch equipment data for this venue.
            </ErrorText>
          ) : null}
          {equipment.length > 0 ? (
            <View style={styles.equipmentList}>
              <SubtitleText style={styles.cardHeader}>
                In This Room
              </SubtitleText>
              {equipment.map(this.renderEquipment)}
            </View>
          ) : null}
          {fetchBookingsError ? (
            <ErrorText>
              Error: We couldn{"'"}t fetch room booking data for this venue.
            </ErrorText>
          ) : null}
          {roombookings.length > 0 ? (
            <View style={styles.bookingList}>
              <SubtitleText style={styles.bookingHeader}>
                Bookings Today
              </SubtitleText>
              {roombookings.map(this.renderBooking)}
            </View>
          ) : null}
          <View style={styles.padder} />
        </Page>
      </View>
    );
  }
}

export default connect(
  RoomDetailScreen.mapStateToProps,
  () => ({}),
)(RoomDetailScreen);
