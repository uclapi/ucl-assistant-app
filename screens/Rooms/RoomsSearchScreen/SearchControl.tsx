import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"
import { connect, ConnectedProps } from "react-redux"

import { addRecent } from "../../../actions/roomsActions"
import { SearchInput } from "../../../components/Input"
import SearchResult from "../../../components/SearchResult"
import { CentredText } from "../../../components/Typography"
import type { AppStateType } from '../../../configureStore'
import ApiManager from "../../../lib/ApiManager"
import type { RoomsNavigatorParamList } from "../RoomsNavigator"

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
})

const MIN_QUERY_LENGTH = 4
const SEARCH_DELAY = 500

interface Props extends PropsFromRedux {
  navigation: StackNavigationProp<RoomsNavigatorParamList>,
  // eslint-disable-next-line quotes
  route: RouteProp<RoomsNavigatorParamList, 'RoomsSearch'>,
}

interface State {
  error: Error,
  isSearching: boolean,
  query: string,
  searchResults: Array<unknown>,
}

class SearchControl extends React.Component<Props, State> {
  private subscriptions

  private searchTimer

  constructor(props) {
    super(props)
    this.state = {
      error: null,
      isSearching: false,
      query: ``,
      searchResults: [],
    }
  }

  componentDidMount() {
    const { navigation, route } = this.props
    this.subscriptions = [
      navigation.addListener(`focus`, this.componentDidFocus),
    ]
    this.componentDidFocus({ state: route })
  }

  componentWillUnmount() {
    this.subscriptions.forEach((sub) => {
      if (sub && typeof sub.remove === `function`) {
        sub.remove()
      }
    })
  }

  componentDidFocus = (route) => {
    const { query } = this.state
    const queryExists = this.queryExists(route)
    if (queryExists && query !== route.params.query) {
      this.setState({ query: route.params.query })
      this.searchRooms(route.params.query, true)
    }
  }

  queryExists = (route) => route
    && route.params
    && route.params.query
    && route.params.query.length > 0

  onChangeText = (query: string) => {
    if (query.length >= MIN_QUERY_LENGTH) {
      clearTimeout(this.searchTimer)
      this.searchTimer = setTimeout(
        () => this.searchRooms(query),
        SEARCH_DELAY,
      )
    }
    this.setState({ query })
  }

  searchRooms = async (query: string, autoNavigate = false) => {
    const { token } = this.props
    try {
      this.setState({ isSearching: true })
      const results = await ApiManager.rooms.search(token, query)
      if (autoNavigate && results.length === 1) {
        this.navigateToRoomDetail(results[0])()
      }
      this.setState({ isSearching: false, searchResults: results })
    } catch (error) {
      this.setState({ error: error.message, isSearching: false })
    }
  }

  navigateToRoomDetail = (room) => () => {
    const { navigation, addRecentRoom } = this.props
    addRecentRoom(room)
    navigation.navigate(`RoomsDetail`, { room })
  }

  clear = () => this.setState({ query: ``, searchResults: [] })

  renderSearchResult = (searchResult) => (
    <SearchResult
      key={searchResult.roomid}
      topText={searchResult.roomname}
      bottomText={searchResult.classification_name}
      type="location"
      onPress={this.navigateToRoomDetail(searchResult)}
    />
  )

  renderStatusText = () => {
    const { query, searchResults } = this.state
    if (query.length === 0) {
      return <CentredText>Start typing to get search results</CentredText>
    }
    if (query.length < MIN_QUERY_LENGTH && searchResults.length === 0) {
      return <CentredText>Please enter a few more characters</CentredText>
    }
    if (query.length > 0 && searchResults.length === 0) {
      return <CentredText>No results found.</CentredText>
    }
    return null
  }

  render() {
    const {
      query, error, isSearching, searchResults,
    } = this.state
    return (
      <View style={styles.container}>
        <SearchInput
          placeholder="Search for a room or building name..."
          onChangeQuery={this.onChangeText}
          query={query}
          clear={this.clear}
        />
        {error ? (
          <CentredText>
            {`Error! ${error} `}
          </CentredText>
        ) : null}
        {isSearching ? <ActivityIndicator /> : null}
        {this.renderStatusText()}
        {searchResults.map(this.renderSearchResult)}
      </View>
    )
  }
}

const connector = connect(
  (state: AppStateType) => ({
    token: state.user.token,
  }),
  (dispatch) => ({
    addRecentRoom: (room) => dispatch(addRecent(room)),
  }),
)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(SearchControl)
