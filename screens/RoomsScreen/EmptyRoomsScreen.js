import PropTypes from "prop-types"
import React from 'react'
import {
  ActivityIndicator,
  Picker,
  StyleSheet,
  View,
} from 'react-native'
import { connect } from "react-redux"

import { Page } from "../../components/Containers"
import SearchResult from "../../components/SearchResult"
import { BodyText, CentredText } from "../../components/Typography"
import ApiManager from "../../lib/ApiManager"

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  subtitle: {
    marginBottom: 10,
  },
})

export class EmptyRoomsScreen extends React.Component {
  static navigationOptions = {
    title: `Empty Rooms`,
  }

  static mapStateToProps = (state) => ({
    token: state.user.token,
  })

  static propTypes = {
    navigation: PropTypes.shape().isRequired,
    token: PropTypes.string,
  }

  static defaultProps = {
    token: ``,
  }

  constructor() {
    super()
    this.state = {
      emptyRooms: [],
      error: null,
      loadingEmptyRooms: true,
      selectedSite: null,
      sites: [],
    }
  }

  componentDidMount() {
    this.fetchEmptyRooms()
  }

  fetchEmptyRooms = async () => {
    const { token } = this.props
    try {
      const emptyRooms = await ApiManager.rooms.getEmptyRooms(token)
      const sites = Array.from(new Set(emptyRooms.map(({ siteid }) => siteid)))
        .map((siteid) => ({
          siteid,
          sitename: emptyRooms.find((r) => r.siteid === siteid).sitename,
        }))
      this.setState({
        emptyRooms,
        loadingEmptyRooms: false,
        sites,
      })
    } catch (error) {
      this.setState({ error: error.message })
    }
  }

  navigateToRoomDetail = (room) => () => {
    const { navigation } = this.props
    navigation.navigate(`RoomDetail`, { room })
  }

  onSelectSite = (value) => {
    this.setState({ selectedSite: value })
  }

  renderEmptyRoom = (room = null) => {
    if (room === null) {
      return null
    }

    const key = `${room.roomid}-${room.roomname}-`
      + `${room.siteid}-${room.classification_name}`

    return (
      <SearchResult
        key={key}
        topText={room.roomname}
        bottomText={room.classification_name}
        type="location"
        buttonText="View"
        onPress={this.navigateToRoomDetail(room)}
      />
    )
  }

  renderResults = () => {
    const { emptyRooms, selectedSite } = this.state
    const matchingRooms = emptyRooms.filter(({ siteid }) => {
      if (selectedSite === null) {
        return true
      }
      return siteid === selectedSite
    })

    if (matchingRooms.length === 0) {
      return (
        <CentredText testID="empty-rooms-message">
          No empty rooms found :(
        </CentredText>
      )
    }
    return matchingRooms.map(this.renderEmptyRoom)
  }

  render() {
    const {
      error,
      sites,
      selectedSite,
      loadingEmptyRooms,
    } = this.state

    if (error) {
      return <BodyText>{`Could not fetch empty rooms: ${error}`}</BodyText>
    }
    if (loadingEmptyRooms) {
      return (
        <Page>
          <View style={styles.container}>
            <ActivityIndicator size="large" />
          </View>
        </Page>
      )
    }
    return (
      <Page>
        <View style={styles.container}>
          <BodyText>
            Filter by:
          </BodyText>
          <Picker
            selectedValue={selectedSite}
            onValueChange={this.onSelectSite}
            testID="building-picker"
          >
            <Picker.Item label="All Buildings" value={null} />
            {
              sites.map(({ sitename, siteid }) => (
                <Picker.Item key={siteid} label={sitename} value={siteid} />
              ))
            }
          </Picker>
          <BodyText style={styles.subtitle}>
            Rooms vacant for the next hour:
          </BodyText>
          {this.renderResults()}
        </View>
      </Page>
    )
  }
}

export default connect(
  EmptyRoomsScreen.mapStateToProps,
  () => ({}),
)(EmptyRoomsScreen)
