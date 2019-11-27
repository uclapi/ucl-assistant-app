import { createSelector } from 'reselect'

import { WORKSPACES_SORT_TYPES } from '../constants/studyspacesConstants'

const studySpacesSelector = (state) => state.studyspaces.studyspaces
const studySpacesSearchQuerySelector = (state) => state.studyspaces.searchQuery
const studySpacesSortTypeSelector = (state) => state.studyspaces.sortType

const studySpacesFavouriteIdsSelector = (state) => state.studyspaces.favourites

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
        return matchingStudySpaces.slice().sort(
          (s1, s2) => s1.name.localeCompare(s2.name),
        )
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
