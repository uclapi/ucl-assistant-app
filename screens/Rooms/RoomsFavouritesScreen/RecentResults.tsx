import { StackNavigationProp } from '@react-navigation/stack'
import React from "react"
import { View } from "react-native"
import { connect, ConnectedProps } from "react-redux"
import { generate } from "shortid"

import { clearRecents } from "../../../actions/roomsActions"
import Button from "../../../components/Button"
import SearchResult from "../../../components/SearchResult"
import { CentredText, SubtitleText } from "../../../components/Typography"
import type { AppStateType } from '../../../configureStore'
import type { Room } from '../../../types/uclapi'
import type { RoomsNavigatorParamList } from "../RoomsNavigator"

interface Props {
  navigation: StackNavigationProp<RoomsNavigatorParamList>,
}

class RecentResults extends React.Component<Props & PropsFromRedux> {
  navigateToRoomDetail = (room: Room) => () => {
    const { navigation } = this.props
    navigation.navigate(`RoomsDetail`, { room })
  }

  render() {
    const { recents, clearRecentRooms } = this.props
    if (recents.length === 0) {
      return null
    }
    return (
      <View>
        <SubtitleText>Recently Searched</SubtitleText>
        {recents.map((res) => (
          <SearchResult
            key={generate()}
            topText={res.roomname}
            bottomText={res.classification_name}
            type="location"
            onPress={this.navigateToRoomDetail(res)}
          />
        ))}
        {recents.length > 0 ? (
          <Button onPress={clearRecentRooms}>Clear</Button>
        ) : (
            <CentredText>Recent results will appear here.</CentredText>
        )}
      </View>
    )
  }
}

const connector = connect(
  (state: AppStateType) => ({
    recents: state.rooms.recents,
  }),
  (dispatch) => ({
    clearRecentRooms: () => dispatch(clearRecents()),
  }),
)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(RecentResults)
