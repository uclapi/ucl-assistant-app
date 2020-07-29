import { StackNavigationProp } from '@react-navigation/stack'
import React, { useCallback, useRef, useState } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"
import { connect, ConnectedProps } from "react-redux"
import {
  PeopleDispatch,
  search as searchAction,
  searchClear as searchClearAction,
} from "../../../actions/peopleActions"
import { SmallButton } from "../../../components/Button"
import { Horizontal } from "../../../components/Containers"
import { TextInput } from "../../../components/Input"
import SearchResult from "../../../components/SearchResult"
import { CentredText } from "../../../components/Typography"
import type { AppStateType } from '../../../configureStore'
import type { Person } from '../../../types/uclapi'
import type { PeopleNavigatorParamList } from '../PeopleNavigator'

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    marginRight: 10,
  },
})

const MIN_QUERY_LENGTH = 4
const SEARCH_DELAY = 500

const SearchStatus = ({ query, searchResults = [] }) => {
  if (query.length === 0) {
    return <CentredText>Start typing to get search results </CentredText>
  }
  if (query.length < MIN_QUERY_LENGTH && searchResults.length === 0) {
    return <CentredText>Please enter a few more characters </CentredText>
  }
  if (query.length > 0 && searchResults.length === 0) {
    return <CentredText>No results found.</CentredText>
  }
  return null
}

interface Props extends PropsFromRedux {
  navigation: StackNavigationProp<PeopleNavigatorParamList>,
}

export const SearchControl: React.FC<Props> = ({
  search,
  token,
  clearRecentResults,
  error = ``,
  isSearching = false,
  searchResults = [],
  navigation,
}) => {
  const searchTimer = useRef<ReturnType<typeof setTimeout>>()
  const [query, setQuery] = useState(``)

  const onSearch = useCallback((q: string) => search(token, q), [search, token])
  const onQueryChange = useCallback((q: string): void => {
    clearTimeout(searchTimer.current)
    searchTimer.current = setTimeout(
      () => onSearch(q),
      SEARCH_DELAY,
    )
    setQuery(q)
  }, [onSearch, searchTimer])
  const clear = useCallback((): void => {
    clearRecentResults()
    setQuery(``)
  }, [clearRecentResults])
  const viewPerson = useCallback(
    (person: Person) => () => navigation.navigate(`PeopleDetail`, person),
    [navigation],
  )

  return (
    <View>
      <Horizontal>
        <TextInput
          placeholder="Search for a name or email..."
          onChangeText={onQueryChange}
          value={query}
          clearButtonMode="always"
          style={styles.textInput}
        />
        {
          query.length > 0 ? (
            <SmallButton onPress={clear}> Clear </SmallButton>
          ) : null
        }
      </Horizontal>
      {
        error.length > 0 && query.length > 2 && (
          <CentredText>
            {`Error! ${error} `}
            {` `}
          </CentredText>
        )
      }

      { isSearching && <ActivityIndicator /> }

      <SearchStatus query={query} searchResults={searchResults} />

      {searchResults.map((result) => (
        <SearchResult
          key={`${result.email}-${result.name}`}
          topText={result.name}
          bottomText={result.department}
          type="person"
          onPress={viewPerson(result)}
        />
      ))}
    </View>
  )
}

const connector = connect(
  (state: AppStateType) => ({
    error: state.people.searchError,
    isSearching: state.people.isSearching,
    searchResults: state.people.searchResults,
    token: state.user.token,
  }),
  (dispatch: PeopleDispatch) => ({
    clearRecentResults: () => dispatch(searchClearAction()),
    search: (
      token: string,
      query: string,
    ) => dispatch(searchAction(token, query)),
  }),
)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(SearchControl)
