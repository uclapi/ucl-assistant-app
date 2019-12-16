import {
  CLEAR_TIMETABLE,
  TIMETABLE_FETCH_FAILURE,
  TIMETABLE_FETCH_SUCCESS,
  TIMETABLE_IS_FETCHING,
} from "../constants/timetableConstants"

export const initialState = {
  error: ``,
  isFetching: false,
  weeklyTimetable: {},
}

export default (state = initialState, action = null) => {
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
          ...state.weeklyTimetable,
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
