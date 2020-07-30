import { Moment } from "moment"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { WORKSPACES_URL } from "../../constants/API"
import { ApiManager } from "../../lib"
import { StudySpace } from "../../types/uclapi"
import {
  StudySpacesActionTypes,
  WORKSPACES_FETCH_DETAILS_FAILURE,
  WORKSPACES_FETCH_DETAILS_SUCCESS,
  WORKSPACES_FETCH_HISTORIC_DATA_FAILURE,
  WORKSPACES_FETCH_HISTORIC_DATA_SUCCESS,
  WORKSPACES_FETCH_SEATINFOS_FAILURE,
  WORKSPACES_FETCH_SEATINFOS_SUCCESS,
  WORKSPACES_IS_FETCHING_DETAILS,
  WORKSPACES_IS_FETCHING_HISTORIC_DATA,
  WORKSPACES_IS_FETCHING_SEATINFOS,
  WORKSPACES_SET_SEARCH_QUERY,
  WORKSPACES_SET_SORT_TYPE,
  WORKSPACES_SORT_TYPES_TYPE,
  WORKSPACES_TOGGLE_FAVOURITE,
} from "../constants/studyspacesConstants"

export type StudySpacesThunkAction = ThunkAction<
  Promise<unknown>, unknown, unknown, StudySpacesActionTypes
>
export type StudySpacesDispatch = ThunkDispatch<
  unknown, unknown, StudySpacesActionTypes
>

export const setIsFetchingSeatInfos = (): StudySpacesActionTypes => ({
  type: WORKSPACES_IS_FETCHING_SEATINFOS,
})

export const fetchSeatInfosSuccess = (
  data: Record<string, unknown>,
  lastModified: Moment,
): StudySpacesActionTypes => ({
  data,
  lastModified,
  type: WORKSPACES_FETCH_SEATINFOS_SUCCESS,
})

export const fetchSeatInfosFailure = (
  error: Error,
): StudySpacesActionTypes => ({
  error,
  type: WORKSPACES_FETCH_SEATINFOS_FAILURE,
})

export const fetchSeatInfos = (
  token: string,
): StudySpacesThunkAction => async (
  dispatch: StudySpacesDispatch,
): Promise<StudySpacesActionTypes> => {
  await dispatch(setIsFetchingSeatInfos())
  try {
    const {
      data,
      lastModified,
    } = await ApiManager.workspaces.getSummary(token)
    return dispatch(fetchSeatInfosSuccess(data, lastModified))
  } catch (error) {
    return dispatch(
      fetchSeatInfosFailure(error.message),
    )
  }
}

export const setIsFetchingAverages = (id: number): StudySpacesActionTypes => ({
  id,
  type: WORKSPACES_IS_FETCHING_HISTORIC_DATA,
})

export const fetchAveragesSuccess = (
  id: number,
  dailyAverages: Record<string, any>,
): StudySpacesActionTypes => ({
  dailyAverages,
  id,
  type: WORKSPACES_FETCH_HISTORIC_DATA_SUCCESS,
})

export const fetchAveragesFailure = (
  id: number,
  error: Error,
): StudySpacesActionTypes => ({
  error,
  id,
  type: WORKSPACES_FETCH_HISTORIC_DATA_FAILURE,
})

export const fetchAverages = (
  token: string,
  id: number,
): StudySpacesThunkAction => async (
  dispatch: StudySpacesDispatch,
): Promise<StudySpacesActionTypes> => {
  await dispatch(setIsFetchingAverages(id))
  try {
    const res = await fetch(`${WORKSPACES_URL}/historic?id=${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    const json = await res.json()
    if (!res.ok) {
      throw new Error(json.error || `There was a problem`)
    }
    return dispatch(fetchAveragesSuccess(id, json.content))
  } catch (error) {
    return dispatch(
      fetchAveragesFailure(
        id,
        error.message,
      ),
    )
  }
}

export const toggleFavourite = (id: number): StudySpacesActionTypes => ({
  id,
  type: WORKSPACES_TOGGLE_FAVOURITE,
})

export const setSearchQuery = (query: string): StudySpacesActionTypes => ({
  query,
  type: WORKSPACES_SET_SEARCH_QUERY,
})

export const setSortType = (
  sortType: WORKSPACES_SORT_TYPES_TYPE,
): StudySpacesActionTypes => ({
  sortType,
  type: WORKSPACES_SET_SORT_TYPE,
})

export const setIsFetchingDetails = (): StudySpacesActionTypes => ({
  type: WORKSPACES_IS_FETCHING_DETAILS,
})

export const fetchDetailsSuccess = (
  studySpaces: Record<string, StudySpace>,
): StudySpacesActionTypes => ({
  studySpaces,
  type: WORKSPACES_FETCH_DETAILS_SUCCESS,
})

export const fetchDetailsFailure = (error: Error): StudySpacesActionTypes => ({
  error,
  type: WORKSPACES_FETCH_DETAILS_FAILURE,
})

export const fetchDetails = (token: string): StudySpacesThunkAction => async (
  dispatch: StudySpacesDispatch,
): Promise<StudySpacesActionTypes> => {
  try {
    dispatch(setIsFetchingDetails())

    const {
      data: studySpaces,
    } = await ApiManager.workspaces.getWorkspaces(token)
    return dispatch(fetchDetailsSuccess(studySpaces))
  } catch (error) {
    return dispatch(
      fetchDetailsFailure(
        error.message,
      ),
    )
  }
}
