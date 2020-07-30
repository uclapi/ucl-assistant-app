import { Moment } from "moment"

export const WORKSPACES_IS_FETCHING_SEATINFOS = `WORKSPACES_IS_FETCHING_SEATINFOS`
export const WORKSPACES_FETCH_SEATINFOS_SUCCESS = `WORKSPACES_FETCH_SEATINFOS_SUCCESS`
export const WORKSPACES_FETCH_SEATINFOS_FAILURE = `WORKSPACES_FETCH_SEATINFOS_FAILURE`
export const WORKSPACES_IS_FETCHING_HISTORIC_DATA = `WORKSPACES_IS_FETCHING_HISTORIC_DATA`
export const WORKSPACES_FETCH_HISTORIC_DATA_SUCCESS = `WORKSPACES_FETCH_HISTORIC_DATA_SUCCESS `
export const WORKSPACES_FETCH_HISTORIC_DATA_FAILURE = `WORKSPACES_FETCH_HISTORIC_DATA_FAILURE `
export const WORKSPACES_TOGGLE_FAVOURITE = `WORKSPACES_TOGGLE_FAVOURITE`
export const WORKSPACES_SET_SEARCH_QUERY = `WORKSPACES_SET_SEARCH_QUERY`
export const WORKSPACES_SET_SORT_TYPE = `WORKSPACES_SET_SORT_TYPE`
export const WORKSPACES_SORT_TYPES = {
  NAME: `name`,
  VACANCIES: `vacancies`,
} as const
export type WORKSPACES_SORT_TYPES_TYPE = typeof WORKSPACES_SORT_TYPES[
  keyof typeof WORKSPACES_SORT_TYPES
]

export const WORKSPACES_IS_FETCHING_DETAILS = `WORKSPACES_IS_FETCHING_DETAILS`
export const WORKSPACES_FETCH_DETAILS_SUCCESS = `WORKSPACES_FETCH_DETAILS_SUCCESS`
export const WORKSPACES_FETCH_DETAILS_FAILURE = `WORKSPACES_FETCH_DETAILS_FAILURE`

interface SetIsFetchingSeatInfosAction {
  type: typeof WORKSPACES_IS_FETCHING_SEATINFOS,
}

interface FetchSeatInfosSuccessAction {
  type: typeof WORKSPACES_FETCH_SEATINFOS_SUCCESS,
  lastModified: Moment,
  data: Record<string, any>,
}

interface FetchSeatInfosFailureAction {
  type: typeof WORKSPACES_FETCH_SEATINFOS_FAILURE,
  error: Error,
}

interface SetIsFetchingAveragesAction {
  type: typeof WORKSPACES_IS_FETCHING_HISTORIC_DATA,
  id: number,
}

interface SetFetchAveragesSuccessAction {
  type: typeof WORKSPACES_FETCH_HISTORIC_DATA_SUCCESS,
  dailyAverages: Record<string, any>,
  id: number,
}

interface SetFetchAveragesFailureAction {
  type: typeof WORKSPACES_FETCH_HISTORIC_DATA_FAILURE,
  id: number,
  error: Error,
}

interface ToggleFavouriteAction {
  type: typeof WORKSPACES_TOGGLE_FAVOURITE,
  id: number,
}

interface SetSearchQueryAction {
  type: typeof WORKSPACES_SET_SEARCH_QUERY,
  query: string,
}

interface SetSortTypeAction {
  type: typeof WORKSPACES_SET_SORT_TYPE,
  sortType: WORKSPACES_SORT_TYPES_TYPE,
}

interface SetIsFetchingDetailsAction {
  type: typeof WORKSPACES_IS_FETCHING_DETAILS,
}

interface FetchDetailsSuccessAction {
  type: typeof WORKSPACES_FETCH_DETAILS_SUCCESS,
  studySpaces: Record<string, unknown>,
}

interface FetchDetailsFailure {
  type: typeof WORKSPACES_FETCH_DETAILS_FAILURE,
  error: Error,
}

export type StudySpacesActionTypes = (
  SetIsFetchingSeatInfosAction |
  FetchSeatInfosSuccessAction |
  FetchSeatInfosFailureAction |
  SetIsFetchingAveragesAction |
  SetFetchAveragesSuccessAction |
  SetFetchAveragesFailureAction |
  ToggleFavouriteAction |
  SetSearchQueryAction |
  SetSortTypeAction |
  SetIsFetchingDetailsAction |
  FetchDetailsSuccessAction |
  FetchDetailsFailure
)
