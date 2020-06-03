import { Feather } from "@expo/vector-icons"
import { StackNavigationProp } from '@react-navigation/stack'
import React from 'react'
import {
  Image, StyleSheet, View, ViewStyle,
} from 'react-native'
import { connect, ConnectedProps } from "react-redux"

import Button from "../../../components/Button"
import { Page } from "../../../components/Containers"
import SearchResult from "../../../components/SearchResult"
import { BodyText, SubtitleText } from "../../../components/Typography"
import type { AppStateType } from "../../../configureStore"
import Colors from "../../../constants/Colors"
import { AssetManager } from '../../../lib'
import { getRoomUniqueId } from '../../../reducers/roomsReducer'
import Styles from "../../../styles/Containers"
import type { RoomsNavigatorParamList } from "../RoomsNavigator"
import SearchButton from '../RoomsSearchScreen/SearchButton'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyImage: {
    height: 200,
    marginTop: 25,
  },
  emptyRoomsButton: {
    marginBottom: 25,
    marginTop: 25,
  },
  subtitle: {
    marginBottom: 20,
  },
})

interface Props extends PropsFromRedux {
  navigation: StackNavigationProp<RoomsNavigatorParamList>,
}

class RoomsFavouritesScreen extends React.Component<Props> {
  static navigationOptions = {
    headerShown: false,
    tabBarIcon: ({ focused }) => (
      <Feather
        name="map-pin"
        size={28}
        color={focused ? Colors.pageBackground : Colors.textColor}
      />
    ),
  }

  navigateToEmptyRoomsScreen = () => {
    const { navigation: { navigate } } = this.props
    navigate(`EmptyRooms`)
  }

  navigateToRoomDetail = (room) => () => {
    const { navigation: { navigate } } = this.props
    navigate(`RoomsDetail`, { room })
  }

  renderSuggestion = () => (
    <>
      <BodyText>
        Mark a room as one of your favourite rooms and
        it will appear here for easy reference
      </BodyText>
      <Image
        source={AssetManager.undraw.scrumBoard}
        resizeMethod="scale"
        style={[Styles.image, styles.emptyImage]}
        resizeMode="contain"
      />
    </>
  )

  renderFavouriteRooms = () => {
    const { favouriteRooms } = this.props
    return (
      <>
        {favouriteRooms.map((room) => (
          <SearchResult
            key={getRoomUniqueId(room)}
            topText={room.roomname}
            bottomText={room.classification_name}
            type="location"
            onPress={this.navigateToRoomDetail(room)}
          />
        ))}
      </>
    )
  }

  render() {
    const { navigation, favouriteRooms } = this.props
    return (
      <View style={styles.container}>
        <Page>
          <SubtitleText style={styles.subtitle}>Your Favourites</SubtitleText>
          {
            (favouriteRooms.length > 0)
              ? this.renderFavouriteRooms()
              : this.renderSuggestion()
          }
          <Button
            style={styles.emptyRoomsButton}
            onPress={this.navigateToEmptyRoomsScreen}
          >
            Find Empty Room
          </Button>
        </Page>
        <SearchButton
          navigation={navigation}
          style={{ flex: 1, zIndex: 2 } as ViewStyle}
        />
      </View>
    )
  }
}

const connector = connect(
  (state: AppStateType) => ({
    favouriteRooms: state.rooms.favourites,
  }),
  () => ({}),
)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(RoomsFavouritesScreen)
