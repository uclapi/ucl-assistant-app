import moment from "moment"

import {
  WORKSPACES_FETCH_HISTORIC_DATA_FAILURE,
  WORKSPACES_FETCH_HISTORIC_DATA_SUCCESS,
  WORKSPACES_FETCH_SEATINFOS_FAILURE,
  WORKSPACES_FETCH_SEATINFOS_SUCCESS,
  WORKSPACES_IS_FETCHING_HISTORIC_DATA,
  WORKSPACES_IS_FETCHING_SEATINFOS,
  WORKSPACES_SET_SEARCH_QUERY,
  WORKSPACES_SET_SORT_TYPE,
  WORKSPACES_SORT_TYPES,
  WORKSPACES_TOGGLE_FAVOURITE,
} from "../constants/studyspacesConstants"

const sortStudySpaces = (s1, s2) => s1.id - s2.id

export const initialState = {
  favourites: [],
  isFetchingSpaces: false,
  lastStatusUpdate: null,
  searchQuery: ``,
  sortType: WORKSPACES_SORT_TYPES.NAME,
  studyspaces: [],
}

const updateStudyspaces = (studyspaces, id, newSpace) => {
  const idx = studyspaces.findIndex((s) => s.id === id)
  const newStudyspaces = studyspaces.filter((s) => s.id !== id)
  const oldStudySpace = studyspaces[idx]
  if (idx === -1) {
    newStudyspaces.push({ ...newSpace })
    newStudyspaces.sort(sortStudySpaces)
  } else {
    newStudyspaces.splice(idx, 0, {
      ...oldStudySpace,
      ...newSpace,
      maps: newSpace.maps.map((newMap) => {
        const oldMap = oldStudySpace.maps
          ? oldStudySpace.maps.filter((m) => m.id === newMap.id)[0]
          : {}
        return {
          ...oldMap,
          ...newMap,
        }
      }),
    })
  }
  return newStudyspaces
}

export default (state = initialState, action = null) => {
  const {
    type, id, data, error, dailyAverages, query, sortType,
  } = action
  const oldSpace = id ? state.studyspaces.filter((s) => s.id === id)[0] : null

  switch (type) {
    case WORKSPACES_IS_FETCHING_SEATINFOS: {
      return {
        ...state,
        studyspaces: state.studyspaces.map((space) => ({
          ...space,
          fetchSeatInfoError: ``,
          isFetchingSeatInfo: true,
        })),
      }
    }

    case WORKSPACES_FETCH_SEATINFOS_FAILURE: {
      return {
        ...state,
        lastStatusUpdate: moment(),
        studyspaces: state.studyspaces.map((space) => ({
          ...space,
          fetchSeatInfoError: error,
          isFetchingSeatInfo: false,
        })),
      }
    }

    case WORKSPACES_FETCH_SEATINFOS_SUCCESS: {
      const newStudyspaces = data
        .reduce(
          (spaces, space) => updateStudyspaces(spaces, space.id, {
            ...space,
            isFetchingSeatInfo: false,
          }),
          state.studyspaces,
        )
        .filter(({ id: spaceId }) => {
          const spaceIsRemoved = data.filter(
            ({ id: fetchedSpaceId }) => fetchedSpaceId === spaceId
          ).length === 0
          return !spaceIsRemoved
        })
      return {
        ...state,
        lastStatusUpdate: moment(),
        studyspaces: newStudyspaces,
      }
    }

    case WORKSPACES_IS_FETCHING_HISTORIC_DATA: {
      if (oldSpace) {
        const newStudyspaces = updateStudyspaces(state.studyspaces, id, {
          ...oldSpace,
          dailyAveragesError: ``,
          isFetchingAverages: true,
        })
        return {
          ...state,
          studyspaces: newStudyspaces,
        }
      }
      return state
    }

    case WORKSPACES_FETCH_HISTORIC_DATA_FAILURE: {
      if (oldSpace) {
        const newStudyspaces = updateStudyspaces(state.studyspaces, id, {
          ...oldSpace,
          dailyAveragesError: error,
          isFetchingAverages: false,
          lastUpdatedAverages: moment(),
        })
        return {
          ...state,
          lastStatusUpdate: moment(),
          studyspaces: newStudyspaces,
        }
      }
      return state
    }
    case WORKSPACES_FETCH_HISTORIC_DATA_SUCCESS: {
      if (oldSpace) {
        const newStudyspaces = updateStudyspaces(state.studyspaces, id, {
          ...oldSpace,
          dailyAverages,
          isFetchingAverages: false,
          lastUpdatedAverages: moment(),
        })
        return {
          ...state,
          lastStatusUpdate: moment(),
          studyspaces: newStudyspaces,
        }
      }
      return state
    }

    case WORKSPACES_TOGGLE_FAVOURITE: {
      if (id >= 0) {
        return {
          ...state,
          favourites: state.favourites.includes(id)
            ? state.favourites.filter((x) => x !== id)
            : [...state.favourites, id],
        }
      }
      return state
    }

    case WORKSPACES_SET_SEARCH_QUERY: {
      return {
        ...state,
        searchQuery: query,
      }
    }

    case WORKSPACES_SET_SORT_TYPE: {
      return {
        ...state,
        sortType,
      }
    }

    default:
      return state
  }
}
