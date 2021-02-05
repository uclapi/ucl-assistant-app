import { useQuery } from 'react-query'
import ApiManager from '../lib/ApiManager'
import { JWT, Person } from '../types/uclapi'

const usePeople = (token: JWT, query: string) => useQuery<Person[], Error>(
  [`people`, token, query],
  () => ApiManager.people.search(token, query),
  { enabled: (typeof query === `string` && query.length > 0) },
)

export default usePeople
