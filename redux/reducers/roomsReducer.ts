import type { Room } from "../../types/uclapi"
import {
  ROOMS_ADD_RECENT,
  ROOMS_CLEAR_RECENTS,
  ROOMS_MAX_RECENTS,
  ROOMS_TOGGLE_FAVOURITE,
} from "../constants/roomsConstants"
import { addToRecents } from "./utils"

export interface RoomsState {
  favourites: Array<Room>,
  recents: Array<Room>,
}

export const initialState: RoomsState = {
  favourites: [],
  recents: [],
}

export const getRoomUniqueId = (room: Room): string => {
  const { roomid, siteid } = room
  if (!roomid || !siteid) {
    return null
  }
  return `${roomid}|${siteid}`
}

export default (state = initialState, action = null): RoomsState => {
  const { type } = action
  switch (type) {
    case ROOMS_ADD_RECENT: {
      const { room } = action
      const newRecents = addToRecents(state.recents, room, ROOMS_MAX_RECENTS)
      return { ...state, recents: newRecents }
    }

    case ROOMS_CLEAR_RECENTS: {
      return { ...state, recents: [] }
    }

    case ROOMS_TOGGLE_FAVOURITE: {
      const { room } = action
      if (room) {
        if (!Array.isArray(state.favourites)) {
          return {
            ...state,
            favourites: [room],
          }
        }
        return {
          ...state,
          favourites: state.favourites.map(
            getRoomUniqueId,
          ).includes(getRoomUniqueId(room))
            ? state.favourites.filter(
              (fav) => getRoomUniqueId(fav) !== getRoomUniqueId(room),
            )
            : [...state.favourites, room],
        }
      }
      return state
    }

    default:
      return state
  }
}
