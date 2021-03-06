import type { Room } from "../../types/uclapi"
import {
  RoomsActionTypes, ROOMS_ADD_RECENT,
  ROOMS_CLEAR_RECENTS,
  ROOMS_TOGGLE_FAVOURITE,
} from "../constants/roomsConstants"

export const addRecent = (room: Room): RoomsActionTypes => ({
  room,
  type: ROOMS_ADD_RECENT,
})

export const clearRecents = (): RoomsActionTypes => ({
  type: ROOMS_CLEAR_RECENTS,
})

export const toggleFavourite = (room: Room): RoomsActionTypes => ({
  room,
  type: ROOMS_TOGGLE_FAVOURITE,
})
