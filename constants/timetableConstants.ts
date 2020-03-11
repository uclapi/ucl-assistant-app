export const TIMETABLE_IS_FETCHING = `TIMETABLE_IS_FETCHING `
export const TIMETABLE_FETCH_SUCCESS = `TIMETABLE_FETCH_SUCCESS`
export const TIMETABLE_FETCH_FAILURE = `TIMETABLE_FETCH_FAILURE`
export const CLEAR_TIMETABLE = `CLEAR_TIMETABLE`
export const TIMETABLE_CACHE_TIME_HOURS = 6

interface FetchTimetableSuccessAction {
  type: typeof TIMETABLE_FETCH_SUCCESS,
  timetableFrag: Record<string, any>,
}

interface FetchTimetableFailureAction {
  type: typeof TIMETABLE_FETCH_FAILURE,
  error: string,
}

interface SetTimetableIsFetchingAction {
  type: typeof TIMETABLE_IS_FETCHING,
}

interface ClearTimetable {
  type: typeof CLEAR_TIMETABLE,
}

export type TimetableActionTypes = (
  FetchTimetableSuccessAction |
  FetchTimetableFailureAction |
  SetTimetableIsFetchingAction |
  ClearTimetable
)
