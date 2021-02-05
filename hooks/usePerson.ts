import { useQuery } from 'react-query'
import ApiManager from '../lib/ApiManager'
import { JWT, Person } from '../types/uclapi'

const usePerson = (token: JWT, email: string) => useQuery<Person, Error>(
  [`person`, token, email],
  () => ApiManager.people.fetchPerson(token, email),
  { enabled: (typeof email === `string` && email.length > 0) },
)

export default usePerson
