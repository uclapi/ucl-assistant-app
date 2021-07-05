import {
  CLEAR_TIMETABLE,
  TIMETABLE_FETCH_FAILURE,
  TIMETABLE_FETCH_SUCCESS,
  TIMETABLE_IS_FETCHING,
} from "../constants/timetableConstants"

export interface WeeklyTimetable {
  [prop: string]: {
    lastModified: Date,
    timetable: unknown[],
  },
}

interface TimetableState {
  error: string,
  isFetching: boolean,
  weeklyTimetable: WeeklyTimetable,
}

export const initialState: TimetableState = {
  error: ``,
  isFetching: false,
  weeklyTimetable: {},
}

export default (state: TimetableState = initialState, action = null): TimetableState => {
  const {
    type, timetableFrag, error,
  } = action

  switch (type) {
    case TIMETABLE_IS_FETCHING: {
      return {
        ...state,
        error: ``,
        isFetching: true,
      }
    }

    case TIMETABLE_FETCH_FAILURE: {
      return {
        ...state,
        error,
        isFetching: false,
      }
    }

    case TIMETABLE_FETCH_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        weeklyTimetable: {
          ...(state.weeklyTimetable as WeeklyTimetable),
          ...timetableFrag,
        },
      }
    }

    case CLEAR_TIMETABLE: {
      return initialState
    }

    default: {
      return state
    }
  }
}
