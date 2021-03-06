import type { Person } from "../../types/uclapi"

export const PEOPLE_IS_SEARCHING = `PEOPLE_IS_SEARCHING`
export const PEOPLE_SEARCH_SUCCESS = `PEOPLE_SEARCH_SUCCESS`
export const PEOPLE_SEARCH_FAILURE = `PEOPLE_SEARCH_FAILURE`
export const PEOPLE_SEARCH_CLEAR = `PEOPLE_SEARCH_CLEAR`
export const PEOPLE_ADD_RECENT = `PEOPLE_ADD_RECENT`
export const PEOPLE_CLEAR_RECENTS = `PEOPLE_CLEAR_RECENTS`
export const PEOPLE_MAX_RECENTS = 10

interface IsSearchingAction {
  type: typeof PEOPLE_IS_SEARCHING,
}

interface SearchFailureAction {
  type: typeof PEOPLE_SEARCH_FAILURE,
  error: string,
}

interface SearchSuccessAction {
  type: typeof PEOPLE_SEARCH_SUCCESS,
  results: Person[],
}

interface SearchClearAction {
  type: typeof PEOPLE_SEARCH_CLEAR,
}

interface ClearRecentResultsAction {
  type: typeof PEOPLE_CLEAR_RECENTS,
}

export type PeopleActionTypes = (
  IsSearchingAction
  | SearchFailureAction
  | SearchSuccessAction
  | SearchClearAction
  | ClearRecentResultsAction
)
