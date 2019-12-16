import _ from "lodash"
import { createSelector } from 'reselect'

const timetableSelector = (state) => state.timetable.weeklyTimetable

export const weeklyTimetableArraySelector = createSelector(
  [timetableSelector],
  (timetable) => _.chunk(
    Object.entries(timetable)
      .sort((t1, t2) => (new Date(t1[0]) - new Date(t2[0]))),
    5,
  ),
)

export default {}
