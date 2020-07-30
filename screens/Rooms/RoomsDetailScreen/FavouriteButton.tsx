import React, { useCallback, useMemo } from "react"
import { connect, ConnectedProps } from "react-redux"
import { FloatingButton } from "../../../components/Button"
import { AppStateType } from "../../../configureStore"
import { toggleFavourite as toggleFavouriteAction } from "../../../redux/actions/roomsActions"
import { getRoomUniqueId } from '../../../redux/reducers/roomsReducer'
import type { Room } from "../../../types/uclapi"

interface Props extends PropsFromRedux {
  room: Room,
}

const FavouriteButton: React.FC<Props> = ({
  favourites,
  toggleFavourite,
  room,
}) => {
  const onToggleFavourite = useCallback(() => toggleFavourite(room), [toggleFavourite, room])
  const isFavourite = useMemo(() => favourites.some(
    (fav) => getRoomUniqueId(fav) === getRoomUniqueId(room),
  ), [room, favourites])

  return (
    <FloatingButton
      active={isFavourite}
      onPress={onToggleFavourite}
      icon="heart-outlined"
      activeIcon="heart"
    />
  )
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
