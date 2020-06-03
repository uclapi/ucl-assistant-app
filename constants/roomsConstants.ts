import type { Room } from "../reducers/roomsReducer"

export const ROOMS_ADD_RECENT = `ROOMS_ADD_RECENT`
export const ROOMS_CLEAR_RECENTS = `ROOMS_CLEAR_RECENTS`
export const ROOMS_MAX_RECENTS = 10
export const ROOMS_TOGGLE_FAVOURITE = `ROOMS_TOGGLE_FAVOURITE`

interface AddRecentAction {
  type: typeof ROOMS_ADD_RECENT,
  room: Room,
}

interface ClearRecentsAction {
  type: typeof ROOMS_CLEAR_RECENTS,
}

interface ToggleFavouriteAction {
  type: typeof ROOMS_TOGGLE_FAVOURITE,
  room: Room,
}

export type RoomsActionTypes = (
  AddRecentAction |
  ClearRecentsAction |
  ToggleFavouriteAction
)
