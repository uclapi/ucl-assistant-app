import { Picker } from '@react-native-community/picker'
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'
import { connect, ConnectedProps } from "react-redux"
import { Page } from "../../../components/Containers"
import SearchResult from "../../../components/SearchResult"
import { BodyText, CentredText } from "../../../components/Typography"
import type { AppStateType } from '../../../configureStore'
import ApiManager from "../../../lib/ApiManager"
import type { Room } from '../../../types/uclapi'
import type { RoomsNavigatorParamList } from "../RoomsNavigator"

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  subtitle: {
    marginBottom: 10,
  },
})

interface Props extends PropsFromRedux {
  navigation: StackNavigationProp<RoomsNavigatorParamList>,
}

interface State {
  emptyRooms: Array<Room>,
  error: Error,
  loadingEmptyRooms: boolean,
  selectedSite: string,
  sites: Array<unknown>,
}

export class EmptyRoomsScreen extends React.Component<
  Props,
  State
  > {
  static navigationOptions = {
    title: `Empty Rooms`,
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      emptyRooms: [],
      error: null,
      loadingEmptyRooms: true,
      selectedSite: null,
      sites: [],
    }
  }

  componentDidMount(): void {
    this.fetchEmptyRooms()
  }

  fetchEmptyRooms = async (): Promise<void> => {
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

  navigateToRoomDetail = (room: Room) => (): void => {
    const { navigation } = this.props
    navigation.navigate(`RoomsDetail`, { room })
  }

  onSelectSite = (value: string): void => {
    this.setState({ selectedSite: value })
  }

  renderEmptyRoom = (room = null): React.ReactNode => {
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
        onPress={this.navigateToRoomDetail(room)}
      />
    )
  }

  renderResults = (): React.ReactNode => {
    const { emptyRooms, selectedSite } = this.state
    const matchingRooms = emptyRooms.filter(({ siteid }) => {
      if (selectedSite === null) {
        return true
      }
      return siteid === selectedSite
    })

    if (matchingRooms.length === 0) {
      return (
        <View>
          <CentredText>
            No empty rooms found 🙁
          </CentredText>
        </View>

      )
    }
    return matchingRooms.map(this.renderEmptyRoom)
  }

  render(): React.ReactElement {
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
            <BodyText>Searching for empty rooms...</BodyText>
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

const connector = connect(
  (state: AppStateType) => ({
    token: state.user.token,
  }),
  () => ({}),
)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(EmptyRoomsScreen)
