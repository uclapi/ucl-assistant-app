import { ThunkDispatch, ThunkAction } from "redux-thunk"
import { PEOPLE_URL } from "../constants/API"
import {
  PEOPLE_CLEAR_RECENTS,
  PEOPLE_FETCH_FAILURE,
  PEOPLE_FETCH_SUCCESS,
  PEOPLE_IS_FETCHING,
  PEOPLE_IS_SEARCHING,
  PEOPLE_SEARCH_CLEAR,
  PEOPLE_SEARCH_FAILURE,
  PEOPLE_SEARCH_SUCCESS,
  PeopleActionTypes
} from "../constants/peopleConstants"

type PeopleThunkAction = ThunkAction<Promise<{}>, {}, {}, PeopleActionTypes>
type PeopleDispatch = ThunkDispatch<{}, {}, PeopleActionTypes>

export const setIsSearching = (): PeopleActionTypes => ({
  type: PEOPLE_IS_SEARCHING,
})

export const searchFailure = (error: string): PeopleActionTypes => ({
  error,
  type: PEOPLE_SEARCH_FAILURE,
})

export const searchSuccess = (results: any): PeopleActionTypes => ({
  results,
  type: PEOPLE_SEARCH_SUCCESS,
})

export const searchClear = (): PeopleActionTypes => ({
  type: PEOPLE_SEARCH_CLEAR,
})

export const search = (token = null, query: string): PeopleThunkAction => async (dispatch: PeopleDispatch) => {
  if (query && query.length <= 3) {
    return {}
  }
  dispatch(setIsSearching())
  try {
    const res = await fetch(
      `${PEOPLE_URL}?query=${encodeURIComponent(query)}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    )
    const json = await res.json()
    if (!res.ok) {
      throw new Error(json.error || `There was a problem`)
    }
    return dispatch(searchSuccess(json.content.people))
  } catch (error) {
    return dispatch(
      searchFailure(error.message),
    )
  }
}

export const setIsFetching = (): PeopleActionTypes => ({
  type: PEOPLE_IS_FETCHING,
})

export const fetchFailure = (error: string): PeopleActionTypes => ({
  error,
  type: PEOPLE_FETCH_FAILURE,
})

export const fetchSuccess = (person: any): PeopleActionTypes => ({
  person,
  type: PEOPLE_FETCH_SUCCESS,
})

export const fetchPerson = (token = null, email: string): PeopleThunkAction => async (dispatch: PeopleDispatch) => {
  dispatch(setIsFetching())
  try {
    const res = await fetch(
      `${PEOPLE_URL}?query=${encodeURIComponent(email)}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    )
    const json = await res.json()
    if (!res.ok) {
      throw new Error(json.error || `There was a problem!`)
    }
    return dispatch(fetchSuccess(json.content.people[0]))
  } catch (error) {
    return dispatch(
      fetchFailure(error.message),
    )
  }
}

export const clearRecentResults = (): PeopleActionTypes => ({
  type: PEOPLE_CLEAR_RECENTS,
})
