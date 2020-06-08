import { createSelector } from 'reselect'

import { AppStateType } from '../configureStore'
import { WORKSPACES_SORT_TYPES } from '../constants/studyspacesConstants'
import ErrorManager from '../lib/ErrorManager'
import type { StudySpace } from '../types/uclapi'

const studySpacesSelector = (
  state: AppStateType,
) => state.studyspaces.studyspaces
const studySpacesSearchQuerySelector = (
  state: AppStateType,
) => state.studyspaces.searchQuery
const studySpacesSortTypeSelector = (
  state: AppStateType,
) => state.studyspaces.sortType

const studySpacesFavouriteIdsSelector = (
  state: AppStateType,
) => state.studyspaces.favourites

export const studySpaceSelectorFactory = (
  // eslint-disable-next-line quotes
  studySpaceId: StudySpace['id'],
) => createSelector(
  studySpacesSelector,
  (studyspaces) => studyspaces.find((s) => s.id === studySpaceId),
)

export const matchingStudySpacesSelector = createSelector(
  studySpacesSelector,
  studySpacesSearchQuerySelector,
  studySpacesSortTypeSelector,
  (studyspaces, searchQuery = ``, sortType) => {
    const matchingStudySpaces = studyspaces.filter((studyspace) => {
      if (searchQuery.length === 0) {
        return true
      }
      return studyspace.name.toLowerCase().includes(searchQuery.toLowerCase())
    })
    switch (sortType) {
      case WORKSPACES_SORT_TYPES.VACANCIES: {
        return matchingStudySpaces.slice().sort(
          (s1, s2) => ((s1.occupied / s1.total) - (s2.occupied / s2.total)),
        )
      }

      default:
      case WORKSPACES_SORT_TYPES.NAME: {
        try {
          return matchingStudySpaces.slice().sort(
            (s1, s2) => s1.name.localeCompare(s2.name),
          )
        } catch (error) {
          ErrorManager.captureError(
            error,
            { matchingStudySpaces, searchQuery, studyspaces },
          )
          return matchingStudySpaces
        }
      }
    }
  },
)

export const favouriteStudySpacesSelector = createSelector(
  studySpacesSelector,
  studySpacesFavouriteIdsSelector,
  (studyspaces, favourites) => studyspaces.filter(
    (space) => favourites.includes(space.id),
  ),
)

export default {}
