import { useQuery } from 'react-query'
import ApiManager from '../lib/ApiManager'

const usePerson = (token, email) => useQuery(
  [`person`, token, email],
  (_, t, e) => ApiManager.people.fetchPerson(t, e),
  { enabled: email && email.length > 0 },
)

export default usePerson
