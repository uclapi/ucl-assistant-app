import type { StackNavigationProp } from "@react-navigation/stack"
import React, { useCallback, useState } from "react"
import { ActivityIndicator } from 'react-native'
import { connect, ConnectedProps } from "react-redux"
import { Page } from "../../../components/Containers"
import { SearchInput } from "../../../components/Input"
import SearchResult from "../../../components/SearchResult"
import { CentredText, TitleText } from "../../../components/Typography"
import { AppStateType } from "../../../configureStore"
import { useDebounce, usePeople } from "../../../hooks"
import {
  PeopleDispatch,
  searchClear as searchClearAction,
} from "../../../redux/actions/peopleActions"
import type { PeopleNavigatorParamList } from "../PeopleNavigator"
import RecentResults from "./RecentResults"
import SearchStatus from "./SearchStatus"

interface Props extends PropsFromRedux {
  navigation: StackNavigationProp<PeopleNavigatorParamList>,
}

const DEBOUNCE_DELAY = 100

export const PeopleScreen: React.FC<Props> = ({
  token,
  navigation,
  recents = [],
  clearRecentResults,
}) => {
  const [query, setQuery] = useState(``)
  const debouncedQuery = useDebounce(query, DEBOUNCE_DELAY)
  const {
    status: fetchStatus,
    data: searchResults = [],
    error,
  } = usePeople(token, debouncedQuery as string)

  const viewPerson = useCallback(
    (email) => () => navigation.navigate(`PeopleDetail`, { email }),
    [navigation],
  )
  const clear = useCallback(() => {
    setQuery(``)
    clearRecentResults()
  }, [clearRecentResults])
  const onQueryChange = useCallback((q) => setQuery(q), [])

  return (
    <Page>
      <TitleText>People</TitleText>
      <SearchInput
        placeholder="Search for a name or email..."
        onChangeQuery={onQueryChange}
        query={query}
        clear={clear}
      />
      {
        fetchStatus === `error` ? (
          <CentredText>
            {`Error! ${error} `}
            {` `}
          </CentredText>
        ) : fetchStatus === `loading` ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            {
              recents.length === 0 ? (
                <SearchStatus query={query} searchResults={searchResults} />
              ) : null
            }
            <RecentResults
              viewPerson={viewPerson}
              recents={recents}
              clearRecentResults={clearRecentResults}
            />
          </>
        )
      }

      {searchResults.map(({ name, email, department }) => (
        <SearchResult
          key={`${email}-${name}`}
          topText={name}
          bottomText={department}
          type="person"
          onPress={viewPerson(email)}
        />
      ))}
    </Page>
  )
}

const connector = connect(
  (state: AppStateType) => ({
    recents: state.people.recents,
    token: state.user.token,
  }),
  (dispatch: PeopleDispatch) => ({
    clearRecentResults: () => dispatch(searchClearAction()),
  }),
)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(PeopleScreen)
