import _ from "lodash"
import { createSelector } from 'reselect'

import { LocalisationManager } from "../lib"

export const timetableSelector = (state) => state.timetable.weeklyTimetable

const padTimetable = (timetable) => {
  if (typeof timetable === `undefined`) {
    return []
  }
  const differences = timetable.map(([{ dateISO }], i) => {
    if (i === 0) {
      return 0
    }
    return (
      LocalisationManager.parseToMoment(dateISO)
        .diff(
          LocalisationManager.parseToMoment(timetable[i - 1][0].dateISO),
          `weeks`,
        )
    )
  })

  return timetable.reduce(
    (arr, v, i) => {
      if (differences[i] > 1) {
        return arr
          .concat([...new Array(differences[i] - 1)].map(() => null))
          .concat([v])
      }
      return arr.concat([v])
    },
    [],
  )
}

export const weeklyTimetableArraySelector = createSelector(
  [timetableSelector],
  (timetable) => [
    null,
    ...padTimetable(
      _.chunk(
        Object.entries(timetable)
          .sort((t1, t2) => (new Date(t1[0]) - new Date(t2[0])))
          .map(
            ([
              dateISO,
              { lastModified, timetable: dayTimetable },
            ]) => ({ dateISO, lastModified, timetable: dayTimetable }),
          ),
        5,
      ),
    ),
    null,
  ],
)

export default {}
