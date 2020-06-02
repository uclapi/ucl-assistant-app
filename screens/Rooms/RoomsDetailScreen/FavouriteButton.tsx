import React from "react"
import { connect, ConnectedProps } from "react-redux"

import {
  toggleFavourite as toggleFavouriteAction,
} from "../../../actions/roomsActions"
import { FloatingButton } from "../../../components/Button"
import { AppStateType } from "../../../configureStore"
import { getRoomUniqueId, Room } from '../../../reducers/roomsReducer'

interface Props {
  room: Room,
}

class FavouriteButton extends React.Component<Props & PropsFromRedux> {
  toggleFavourite = () => {
    const { toggleFavourite, room } = this.props
    toggleFavourite(room)
  }

  isFavourite = () => {
    const { room, favourites } = this.props
    return favourites.some(
      (fav) => getRoomUniqueId(fav) === getRoomUniqueId(room),
    )
  }

  render() {
    return (
      <FloatingButton
        active={this.isFavourite()}
        onPress={this.toggleFavourite}
        icon="heart-outlined"
        activeIcon="heart"
      />
    )
  }
}

const connector = connect(
  (state: AppStateType) => ({
    favourites: state.rooms.favourites,
  }),
  (dispatch) => ({
    toggleFavourite: (room) => dispatch(toggleFavouriteAction(room)),
  }),
)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(FavouriteButton)
