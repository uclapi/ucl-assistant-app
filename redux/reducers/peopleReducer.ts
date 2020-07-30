import type { Person } from "../../types/uclapi"
import {
  PEOPLE_CLEAR_RECENTS,
  PEOPLE_IS_SEARCHING,
  PEOPLE_SEARCH_CLEAR,
  PEOPLE_SEARCH_FAILURE,
  PEOPLE_SEARCH_SUCCESS,
} from "../constants/peopleConstants"

export interface PeopleState {
  fetchError: string,
  isFetching: boolean,
  isSearching: boolean,
  person: Person,
  recents: Person[],
  searchError: string,
  searchResults: Person[],
}

export const initialState: PeopleState = {
  fetchError: ``,
  isFetching: false,
  isSearching: false,
  person: {
    department: ``,
    email: ``,
    name: ``,
    status: ``,
  },
  recents: [],
  searchError: ``,
  searchResults: [],
}

export default (state = initialState, action = null): PeopleState => {
  const {
    type, results, error,
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

    case PEOPLE_CLEAR_RECENTS: {
      return { ...state, recents: [] }
    }

    default:
      return state
  }
}
