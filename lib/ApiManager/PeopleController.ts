import axios from 'axios'
import { PEOPLE_URL } from '../../constants/API'
import type { JWT, Person } from '../../types/uclapi'
import ErrorManager from '../ErrorManager'

const peopleApi = axios.create({
  baseURL: PEOPLE_URL,
})

class PeopleController {
  static search = async (token: JWT, query: string): Promise<Person[]> => {
    if (query && query.length <= 3) {
      return null
    }
    try {
      const { data } = await peopleApi.get(
        `/?query=${encodeURIComponent(query)}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        },
      )
      return data.content.people
    } catch (error) {
      ErrorManager.captureError(error)
      throw error
    }
  }

  static fetchPerson = async (token: JWT, email: string): Promise<Person> => {
    try {
      const results = await PeopleController.search(token, email)
      if (results.length > 0) {
        return results[0]
      }
      throw new Error(`No such person found`)
    } catch (error) {
      ErrorManager.captureError(error)
      throw error
    }
  }
}

export default PeopleController
