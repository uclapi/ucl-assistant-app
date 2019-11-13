// @flow
import { Moment } from "moment"

import { TIMETABLE_URL } from "../constants/API"
import {
  CLEAR_TIMETABLE,
  TIMETABLE_FETCH_FAILURE,
  TIMETABLE_FETCH_SUCCESS,
  TIMETABLE_IS_FETCHING,
} from "../constants/timetableConstants"
import { LocalisationManager } from "../lib"

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
  const datePart = date ? `?date=${date.format(`YYYY-MM-DD`)}` : ``
  const url = `${TIMETABLE_URL}${datePart}`
  try {
    const res = await fetch(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    const json = await res.json()
    if (!res.ok) {
      throw new Error(json.error || `There was a problem`)
    }
    const now = LocalisationManager.getMoment()
    Object.keys(json.content.timetable).forEach((day) => {
      const timetable = json.content.timetable[day]
      json.content.timetable[day] = {
        lastUpdated: now,
        timetable,
      }
    })
    return dispatch(fetchTimetableSuccess(json.content.timetable))
  } catch (error) {
    return dispatch(
      fetchTimetableFailure(typeof error === `string` ? error : error.message),
    )
  }
}

export const clearTimetable = () => ({
  type: CLEAR_TIMETABLE,
})
