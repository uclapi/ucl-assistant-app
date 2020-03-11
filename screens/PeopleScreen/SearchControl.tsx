import React from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"
import { connect } from "react-redux"
import { generate } from "shortid"

import {
  search as searchAction,
  searchClear as searchClearAction,
} from "../../actions/peopleActions"
import { SmallButton } from "../../components/Button"
import { Horizontal } from "../../components/Containers"
import { TextInput } from "../../components/Input"
import SearchResult from "../../components/SearchResult"
import { CentredText } from "../../components/Typography"

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    marginRight: 10,
  },
})

const MIN_QUERY_LENGTH = 4

interface Props {
  clearRecentResults: () => {},
  error: any,
  isSearching: boolean,
  navigation: any,
  search: () => {},
  searchResults: any,
  token: string,
}

export class SearchControl extends React.Component<Props> {
  static mapStateToProps = (state): any => ({
    error: state.people.searchError,
    isSearching: state.people.isSearching,
    searchResults: state.people.searchResults,
    token: state.user.token,
  })

  static mapDispatchToProps = (dispatch): any => ({
    clearRecentResults: (): any => dispatch(searchClearAction()),
    search: (token, query): any => dispatch(searchAction(token, query)),
  })

  searchTimer = null

  public static defaultProps = {
    clearRecentResults: (): void => { },
    error: ``,
    isSearching: false,
    search: (): void => { },
    searchResults: [],
    token: ``,
  }

  constructor(props) {
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

  renderStatusText = () => {
    const { query } = this.state
    const { searchResults } = this.props
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

  viewPerson = (person) => (): void => {
    const { navigation } = this.props
    navigation.navigate(`PersonDetail`, person)
  }

  static SEARCH_DELAY = 500

  renderResult = (res = null) => {
    if (res === null) {
      return null
    }
    return (
      <SearchResult
        key={generate()}
        topText={res.name}
        bottomText={res.department}
        type="person"
        buttonText="View"
        onPress={this.viewPerson(res)}
      />
    )
  }

  render() {
    const { query } = this.state
    const {
      error,
      isSearching,
      searchResults,
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

export default connect(
  SearchControl.mapStateToProps,
  SearchControl.mapDispatchToProps,
)(SearchControl)
