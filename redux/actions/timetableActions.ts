import { Moment } from "moment"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import type { AppStateType } from "../../configureStore"
import { ApiManager, DeviceManager, ErrorManager } from "../../lib"
import {
  CLEAR_TIMETABLE,
  TimetableActionTypes, TIMETABLE_FETCH_FAILURE,
  TIMETABLE_FETCH_SUCCESS,
  TIMETABLE_IS_FETCHING,
} from "../constants/timetableConstants"

export type TimetableThunkAction<T> = ThunkAction<
  Promise<T>,
  AppStateType,
  unknown,
  TimetableActionTypes
>
export type TimetableDispatch = ThunkDispatch<
  AppStateType,
  unknown,
  TimetableActionTypes
>

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
): TimetableThunkAction<void> => async (
  dispatch: TimetableDispatch,
): Promise<void> => {
  await dispatch(setIsFetchingTimetable())
  try {
    const timetable = await ApiManager.timetable.getPersonalWeekTimetable(
      token,
      date,
    )
    dispatch(fetchTimetableSuccess(timetable))
    return
  } catch (error) {
    ErrorManager.captureError(error)
    try {
      const isConnectedToInternet = await DeviceManager.isConnectedToInternet()
      if (!isConnectedToInternet) {
        dispatch(
          fetchTimetableFailure(`Check your internet connection 😢`),
        )
      }
      return
    } catch (deviceManagerError) {
      ErrorManager.captureError(deviceManagerError)
    }

    dispatch(
      fetchTimetableFailure(error.message),
    )
  }
}

export const clearTimetable = (): TimetableActionTypes => ({
  type: CLEAR_TIMETABLE,
})
