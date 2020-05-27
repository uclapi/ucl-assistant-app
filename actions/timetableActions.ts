import { Moment } from "moment"
import { ThunkAction, ThunkDispatch } from "redux-thunk"

import {
  CLEAR_TIMETABLE,
  TIMETABLE_FETCH_FAILURE,
  TIMETABLE_FETCH_SUCCESS,
  TIMETABLE_IS_FETCHING,
  TimetableActionTypes,
} from "../constants/timetableConstants"
import { ApiManager, DeviceManager, ErrorManager } from "../lib"


type TimetableThunkAction = ThunkAction<Promise<unknown>, unknown, unknown, TimetableActionTypes>
type TimetableDispatch = ThunkDispatch<unknown, unknown, TimetableActionTypes>

export const fetchTimetableSuccess = (
  timetableFrag: Record<string, any>,
): TimetableActionTypes => ({
  timetableFrag,
  type: TIMETABLE_FETCH_SUCCESS,
})

export const fetchTimetableFailure = (error): TimetableActionTypes => ({
  error,
  type: TIMETABLE_FETCH_FAILURE,
})

export const setIsFetchingTimetable = (): TimetableActionTypes => ({
  type: TIMETABLE_IS_FETCHING,
})

export const fetchTimetable = (
  token: string = null,
  date: Moment = null,
): TimetableThunkAction => async (
  dispatch: TimetableDispatch,
): Promise<TimetableActionTypes> => {
  await dispatch(setIsFetchingTimetable())
  try {
    const timetable = await ApiManager.timetable.getPersonalWeekTimetable(
      token,
      date,
    )
    return dispatch(fetchTimetableSuccess(timetable))
  } catch (error) {
    ErrorManager.captureError(error)
    try {
      const isConnectedToInternet = await DeviceManager.isConnectedToInternet()
      if (!isConnectedToInternet) {
        return dispatch(
          fetchTimetableFailure(`Check your internet connection 😢`),
        )
      }
    } catch (deviceManagerError) {
      ErrorManager.captureError(deviceManagerError)
    }

    return dispatch(
      fetchTimetableFailure(error.message),
    )
  }
}

export const clearTimetable = (): TimetableActionTypes => ({
  type: CLEAR_TIMETABLE,
})
