import {
  PEOPLE_CLEAR_RECENTS,
  PEOPLE_FETCH_FAILURE,
  PEOPLE_FETCH_SUCCESS,
  PEOPLE_IS_FETCHING,
  PEOPLE_IS_SEARCHING,
  PEOPLE_MAX_RECENTS,
  PEOPLE_SEARCH_CLEAR,
  PEOPLE_SEARCH_FAILURE,
  PEOPLE_SEARCH_SUCCESS,
} from "../constants/peopleConstants"
import { addToRecents } from "./utils"

export interface Person {
  name?: string,
  status?: string,
  department?: string,
  email?: string,
}

export interface PeopleState {
  fetchError: string,
  isFetching: boolean,
  isSearching: boolean,
  person: Person,
  recents: Array<Person>,
  searchError: string,
  searchResults: Array<Person>,
}

export const initialState: PeopleState = {
  fetchError: ``,
  isFetching: false,
  isSearching: false,
  person: {},
  recents: [],
  searchError: ``,
  searchResults: [],
}

export default (state = initialState, action = null): PeopleState => {
  const {
    type, results, error, person,
  } = action

  switch (type) {
    case `CLEAR`: {
      return { ...initialState }
    }

    case PEOPLE_IS_SEARCHING: {
      return { ...state, isSearching: true, searchError: `` }
    }

    case PEOPLE_SEARCH_FAILURE: {
      return {
        ...state,
        isSearching: false,
        searchError: error,
        searchResults: [],
      }
    }

    case PEOPLE_SEARCH_SUCCESS: {
      return { ...state, isSearching: false, searchResults: results }
    }

    case PEOPLE_SEARCH_CLEAR: {
      return { ...state, searchResults: [] }
    }

    case PEOPLE_IS_FETCHING: {
      return { ...state, fetchError: ``, isFetching: true }
    }

    case PEOPLE_FETCH_FAILURE: {
      return { ...state, fetchError: error, isFetching: false }
    }

    case PEOPLE_FETCH_SUCCESS: {
      const newRecents = addToRecents(
        state.recents,
        person,
        PEOPLE_MAX_RECENTS,
      )
      return {
        ...state, isFetching: false, person, recents: newRecents,
      }
    }

    case PEOPLE_CLEAR_RECENTS: {
      return { ...state, recents: [] }
    }

    default:
      return state
  }
}
