import PropTypes from "prop-types"
import React, { Component } from "react"
import { StyleSheet, View } from "react-native"
import MapView from "react-native-maps"
import { connect } from "react-redux"
import { generate } from "shortid"

import Button from "../../components/Button"
import { Horizontal, Page } from "../../components/Containers"
import {
  BodyText,
  ErrorText,
  SearchResultTopText,
  SubtitleText,
  TitleText,
} from "../../components/Typography"
import Colors from "../../constants/Colors"
import {
  ApiManager,
  ErrorManager,
  LocalisationManager,
  MapsManager,
  Shadow,
} from "../../lib"
import MapStyle from "../../styles/Map"
import FavouriteButton from "./FavouriteButton"

const closedRoomDescriptions = [`Room Closed`, `UCL Closed`]

const styles = StyleSheet.create({
  address: {
    marginVertical: 20,
  },
  booking: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 10,
    marginVertical: 5,
    padding: 20,
    ...Shadow(2),
  },
  bookingList: {
    marginTop: 20,
  },
  cardHeader: {
    backgroundColor: Colors.cardHeader,
    borderRadius: 10,
    color: Colors.cardBackground,
    marginBottom: 5,
    padding: 20,
    ...Shadow(2),
  },
  cardList: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 10,
    marginTop: 5,
    padding: 20,
    ...Shadow(2),
  },
  container: {
    flex: 1,
  },
  coordinatesError: {
    marginBottom: 10,
  },
  details: {
    justifyContent: `space-between`,
    marginTop: 20,
  },
  padder: {
    height: 20,
  },
})

const initialRegion = {
  latitude: 51.5246586,
  latitudeDelta: 0.0012,
  longitude: -0.1339784,
  longitudeDelta: 0.0071,
}

class RoomDetailScreen extends Component {
  static navigationOptions = {
    title: `Room Detail`,
  }

  static mapStateToProps = (state) => ({
    token: state.user.token,
  })

  static propTypes = {
    navigation: PropTypes.shape().isRequired,
    route: PropTypes.shape().isRequired,
    token: PropTypes.string,
  }

  static defaultProps = {
    token: ``,
  }

  constructor() {
    super()
    this.state = {
      equipment: [],
      fetchBookingsError: null,
      fetchEquipmentError: null,
      roombookings: [],
    }
  }

  componentDidMount() {
    const { token, route } = this.props
    const { room } = route.params
    const { roomid, siteid } = room
    this.fetchEquipment(token, roomid, siteid)
    this.fetchRoomBookings(token, roomid, siteid)
  }

  fetchEquipment = async (token, roomid, siteid) => {
    try {
      const equipment = await ApiManager.rooms.getEquipment(token, {
        roomid,
        siteid,
      })
      this.setState({ equipment })
    } catch (error) {
      this.setState({ fetchEquipmentError: error.message })
      ErrorManager.captureError(error)
    }
  }

  fetchRoomBookings = async (token, roomid, siteid) => {
    try {
      const roombookings = await ApiManager.rooms.getBookings(token, {
        roomid,
        siteid,
      })
      this.setState({ roombookings })
    } catch (error) {
      this.setState({ fetchBookingsError: error.message })
      ErrorManager.captureError(error)
    }
  }

  renderEquipment = ({ description, units }) => {
    if (description === `Wheelchair accessible`) {
      return (
        <BodyText key={generate()}>
          This room is accessible via wheelchair
        </BodyText>
      )
    }
    return (
      <BodyText key={generate()}>
        {`${units} x ${description}`}
      </BodyText>
    )
  }

  renderBooking = ({
    start_time: start,
    end_time: end,
    description,
    contact,
  }) => (
      <View style={styles.booking} key={generate()}>
        <SearchResultTopText>
          {`${LocalisationManager.parseToMoment(start).format(`HH:mm`)}hrs - ${LocalisationManager.parseToMoment(end).format(`HH:mm`)}hrs`}
        </SearchResultTopText>
        {(contact && !closedRoomDescriptions.includes(description)) && (<BodyText>{`booked by ${contact}`}</BodyText>)}
        {closedRoomDescriptions.includes(description) ? (
          <ErrorText>Room is closed!</ErrorText>
        ) : (
            <BodyText>{description}</BodyText>
        )}
      </View>
  )

  render() {
    const {
      equipment,
      fetchEquipmentError,
      fetchBookingsError,
      roombookings,
    } = this.state
    const {
      navigation: {
        state: {
          params: { room },
        },
      },
    } = this.props
    const {
      roomname: name,
      classification_name: classification,
      capacity,
      location,
    } = room
    const { address } = location
    const addressString = address.filter((str) => str.length > 0).join(`\n`)

    let { latitude, longitude } = initialRegion
    let invalidCoordinates = false

    if (
      location.coordinates
      && location.coordinates.lat
      && location.coordinates.lng
    ) {
      const { lat, lng } = location.coordinates
      latitude = Number.parseFloat(lat, 10)
      longitude = Number.parseFloat(lng, 10)
    } else {
      invalidCoordinates = true
    }

    const navigateToLocation = () => (invalidCoordinates
      ? MapsManager.navigateToAddress(addressString)
      : MapsManager.navigateToCoords({ lat: latitude, lng: longitude }))

    return (
      <View style={styles.container}>
        <Page>
          <TitleText>{name}</TitleText>
          <Horizontal style={styles.details}>
            <BodyText>{classification}</BodyText>
            <BodyText>{`Capacity: ${capacity}`}</BodyText>
          </Horizontal>
          <View style={styles.address}>
            <BodyText>{addressString}</BodyText>
          </View>
          {invalidCoordinates ? (
            <View style={styles.coordinatesError}>
              <ErrorText>
                Error: We couldn&apos;t fetch coordinates for this venue,&nbsp;
                so the location displayed on the map may be incorrect.
              </ErrorText>
            </View>
          ) : null}
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
          <View style={styles.navigate}>
            <Button onPress={navigateToLocation}>Directions</Button>
          </View>
          {fetchEquipmentError ? (
            <ErrorText>Error: We couldn&apos;t fetch equipment data for this venue.</ErrorText>
          ) : null}
          {equipment.length > 0 ? (
            <View>
              <SubtitleText style={styles.cardHeader}>In This Room</SubtitleText>
              <View style={styles.cardList}>
                {equipment.map(this.renderEquipment)}
              </View>
            </View>
          ) : null}
          {fetchBookingsError ? (
            <ErrorText>Error: We couldn&apos;t fetch room booking data for this venue.</ErrorText>
          ) : null}
          {roombookings.length > 0 ? (
            <View style={styles.bookingList}>
              <SubtitleText style={styles.cardHeader}>
                Bookings Today
              </SubtitleText>
              {roombookings.map(this.renderBooking)}
            </View>
          ) : null}
          <View style={styles.padder} />
        </Page>
        <FavouriteButton room={room} />
      </View>
    )
  }
}

export default connect(
  RoomDetailScreen.mapStateToProps,
  () => ({}),
)(RoomDetailScreen)
