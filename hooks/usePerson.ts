import { useQuery } from 'react-query'
import ApiManager from '../lib/ApiManager'
import { JWT } from '../types/uclapi'

const usePerson = (token: JWT, email: string) => useQuery(
  [`person`, token, email],
  (_, t, e) => ApiManager.people.fetchPerson(t, e),
  { enabled: email && email.length > 0 },
)

export default usePerson
