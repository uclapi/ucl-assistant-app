import axios from 'axios'
import { TIMETABLE_URL } from '../../constants/API'
import { JWT } from '../../types/uclapi'
import ErrorManager from '../ErrorManager'
import LocalisationManager from '../LocalisationManager'

const timetableApi = axios.create({
  baseURL: TIMETABLE_URL,
})

class TimetableController {
  static setLastModified = (timetable, lastModified) => Object.keys(timetable).reduce(
    (acc, day) => ({
      ...acc,
      [day]: {
        ...timetable[day],
        lastModified: LocalisationManager.parseToMoment(lastModified),
      },
    }),
    {},
  )

  static getPersonalTimetable = async (
    token: JWT,
    date = LocalisationManager.getMoment(),
  ) => {
    const datePart = date
      ? `?date=${date.clone().startOf(`isoWeek`).format(`YYYY-MM-DD`)}`
      : ``
    const headers = {
      authorization: `Bearer ${token}`,
    }
    ErrorManager.addDetail({ headers })
    try {
      const results = await timetableApi.get(datePart, { headers })
      if (!results.data.content.ok || results.data.error !== ``) {
        throw new Error(
          results.data.error
          || `There was a problem fetching your personal timetable`,
        )
      }
      const { data: { content: { timetable } } } = results
      return TimetableController.setLastModified(timetable, results.headers[`last-modified`])
    } catch (error) {
      ErrorManager.addDetail({ response: error.response })
      throw error
    }
  }

  static getPersonalWeekTimetable = async (
    token: JWT,
    date = LocalisationManager.getMoment().startOf(`isoWeek`),
  ) => {
    const queryParam = `?date=${date.clone().startOf(`isoWeek`).format(`YYYY-MM-DD`)}`
    const headers = {
      authorization: `Bearer ${token}`,
    }
    ErrorManager.addDetail({ headers })
    try {
      const results = await timetableApi.get(`/week/${queryParam}`, {
        headers,
      })
      if (results.data.error !== ``) {
        throw new Error(
          results.data.error
          || `An error occurred when fetching your personal weekly timetable`,
        )
      }
      const { data: { content: { timetable } } } = results
      return TimetableController.setLastModified(timetable, results.headers[`last-modified`])
    } catch (error) {
      ErrorManager.addDetail({ response: error.response })
      throw error
    }
  }
}

export default TimetableController
