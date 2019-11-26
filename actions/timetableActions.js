// @flow
import { Moment } from "moment"

import {
  CLEAR_TIMETABLE,
  TIMETABLE_FETCH_FAILURE,
  TIMETABLE_FETCH_SUCCESS,
  TIMETABLE_IS_FETCHING,
} from "../constants/timetableConstants"
import { ApiManager, LocalisationManager } from "../lib"

export const fetchTimetableSuccess = (timetableFrag: Object) => ({
  timetableFrag,
  type: TIMETABLE_FETCH_SUCCESS,
})

export const fetchTimetableFailure = (error: String) => ({
  error,
  type: TIMETABLE_FETCH_FAILURE,
})

export const setIsFetchingTimetable = () => ({
  type: TIMETABLE_IS_FETCHING,
})

export const fetchTimetable = (
  token: String = null,
  date: Moment = LocalisationManager.getMoment(),
) => async (dispatch: Function) => {
  await dispatch(setIsFetchingTimetable())
  try {
    const timetable = await ApiManager.timetable.getPersonalTimetable(
      token,
      date,
    )
    return dispatch(fetchTimetableSuccess(timetable))
  } catch (error) {
    return dispatch(
      fetchTimetableFailure(error.message),
    )
  }
}

export const clearTimetable = () => ({
  type: CLEAR_TIMETABLE,
})
