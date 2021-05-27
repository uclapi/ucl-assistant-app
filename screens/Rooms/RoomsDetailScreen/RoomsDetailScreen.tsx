import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from "react"
import { StyleSheet, View } from "react-native"
import MapView, { Marker } from "react-native-maps"
import { connect, ConnectedProps } from "react-redux"
import { generate } from "shortid"

import Button from "../../../components/Button"
import { Horizontal, Page } from "../../../components/Containers"
import {
  BodyText,
  ErrorText,
  SearchResultTopText,
  SubtitleText,
  TitleText,
} from "../../../components/Typography"
import type { AppStateType } from '../../../configureStore'
import Colors from "../../../constants/Colors"
import {
  ApiManager,
  ErrorManager,
  LocalisationManager,
  MapsManager,
  Shadow,
} from "../../../lib"
import MapStyle from "../../../styles/Map"
import { Equipment, RoomBooking } from '../../../types/uclapi'
import type { RoomsNavigatorParamList } from "../RoomsNavigator"
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

interface Props extends PropsFromRedux {
  navigation: StackNavigationProp<RoomsNavigatorParamList>,
  // eslint-disable-next-line quotes
  route: RouteProp<RoomsNavigatorParamList, 'RoomsDetail'>,
}

interface State {
  equipment: Array<Equipment>,
  fetchBookingsError: Error,
  fetchEquipmentError: Error,
  roombookings: Array<RoomBooking>,
}

class RoomsDetailScreen extends React.Component<Props, State> {
  static navigationOptions = {
    title: `Room Detail`,
  }

  constructor(props) {
    super(props)
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

  fetchEquipment = async (token: string, roomid: string, siteid: string) => {
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

  renderEquipment = ({ description, units }: Equipment) => {
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
  }: RoomBooking) => (
      <View style={styles.booking} key={generate()}>
        <SearchResultTopText>
          {`${
            LocalisationManager.parseToMoment(start).format(`HH:mm`)
          }hrs - ${
            LocalisationManager.parseToMoment(end).format(`HH:mm`)
          }hrs`}
        </SearchResultTopText>
        {(
          contact
          && !closedRoomDescriptions.includes(description))
          && (<BodyText>{`booked by ${contact}`}</BodyText>)}
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
      route: {
        params: { room },
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
      latitude = Number.parseFloat(lat)
      longitude = Number.parseFloat(lng)
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
            <Marker coordinate={{ latitude, longitude }} />
          </MapView>
          <View>
            <Button onPress={navigateToLocation}>Directions</Button>
          </View>
          {fetchEquipmentError ? (
            <ErrorText>
              Error: We couldn&apos;t fetch equipment data for this venue.
            </ErrorText>
          ) : null}
          {equipment.length > 0 ? (
            <View>
              <SubtitleText style={styles.cardHeader}>
                In This Room
              </SubtitleText>
              <View style={styles.cardList}>
                {equipment.map(this.renderEquipment)}
              </View>
            </View>
          ) : null}
          {fetchBookingsError ? (
            <ErrorText>
              Error: We couldn&apos;t fetch room booking data for this venue.
            </ErrorText>
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

const connector = connect(
  (state: AppStateType) => ({
    token: state.user.token,
  }),
  () => ({}),
)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(RoomsDetailScreen)
