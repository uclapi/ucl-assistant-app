import { StackNavigationProp } from '@react-navigation/stack'
import React from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"
import { connect, ConnectedProps } from "react-redux"
import { generate } from "shortid"

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

interface Props extends PropsFromRedux {
  navigation: StackNavigationProp<PeopleNavigatorParamList>,
}

interface State {
  query: string,
}

export class SearchControl extends React.Component<Props, State> {
  static SEARCH_DELAY = 500

  private searchTimer = null

  constructor(props: Props) {
    super(props)

    this.state = {
      query: ``,
    }
  }

  onQueryChange = (query: string): void => {
    clearTimeout(this.searchTimer)
    this.searchTimer = setTimeout(
      () => this.search(query),
      SearchControl.SEARCH_DELAY,
    )
    this.setState({ query })
  }

  search = (query: string): void => {
    const { search, token } = this.props
    search(token, query)
  }

  clear = (): void => {
    const { clearRecentResults } = this.props
    clearRecentResults()
    this.setState({ query: `` })
  }

  renderStatusText = (): React.ReactNode => {
    const { query } = this.state
    const { searchResults = [] } = this.props
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

  viewPerson = (person: Person) => (): void => {
    const { navigation } = this.props
    navigation.navigate(`PeopleDetail`, person)
  }

  renderResult = (res = null): React.ReactNode => {
    if (res === null) {
      return null
    }
    return (
      <SearchResult
        key={generate()}
        topText={res.name}
        bottomText={res.department}
        type="person"
        onPress={this.viewPerson(res)}
      />
    )
  }

  render(): React.ReactElement {
    const { query } = this.state
    const {
      error = ``,
      isSearching = false,
      searchResults = [],
    } = this.props
    return (
      <View>
        <Horizontal>
          <TextInput
            placeholder="Search for a name or email..."
            onChangeText={this.onQueryChange}
            value={query}
            clearButtonMode="always"
            style={styles.textInput}
          />
          {
            query.length > 0 ? (
              <SmallButton onPress={this.clear}> Clear </SmallButton>
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

        {
          isSearching && <ActivityIndicator />
        }

        {this.renderStatusText()}

        {searchResults.map(this.renderResult)}
      </View>
    )
  }
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
