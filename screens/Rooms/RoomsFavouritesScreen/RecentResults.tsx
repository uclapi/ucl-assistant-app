import { StackNavigationProp } from '@react-navigation/stack'
import React, { useCallback } from "react"
import { StyleSheet, View } from "react-native"
import { connect, ConnectedProps } from "react-redux"
import Button from "../../../components/Button"
import SearchResult from "../../../components/SearchResult"
import { CentredText, SubtitleText } from "../../../components/Typography"
import type { AppStateType } from '../../../configureStore'
import { clearRecents } from "../../../redux/actions/roomsActions"
import type { Room } from '../../../types/uclapi'
import type { RoomsNavigatorParamList } from "../RoomsNavigator"

const styles = StyleSheet.create({
  container: {
    paddingBottom: 40,
  },
})

interface Props extends PropsFromRedux {
  navigation: StackNavigationProp<RoomsNavigatorParamList>,
}

const RecentResults: React.FC<Props> = ({
  recents = [],
  clearRecentRooms,
  navigation,
}) => {
  const navigateToRoomDetail = useCallback(
    (room: Room) => () => navigation.navigate(`RoomsDetail`, { room }),
    [navigation],
  )

  if (recents.length === 0) {
    return null
  }
  return (
    <View style={styles.container}>
      <SubtitleText>Recently Searched</SubtitleText>
      {recents.map((res) => (
        <SearchResult
          key={`${res.siteid}---${res.roomid}`}
          topText={res.roomname}
          bottomText={res.classification_name}
          type="location"
          onPress={navigateToRoomDetail(res)}
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
