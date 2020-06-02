// @flow
import PropTypes from "prop-types"
import React, { Component } from "react"
import { ActivityIndicator, StyleSheet, View } from "react-native"
import { connect } from "react-redux"

import { addRecent } from "../../actions/roomsActions"
import { SearchInput } from "../../components/Input"
import SearchResult from "../../components/SearchResult"
import { CentredText } from "../../components/Typography"
import ApiManager from "../../lib/ApiManager"

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
})

const MIN_QUERY_LENGTH = 4
const SEARCH_DELAY = 500

class SearchControl extends Component {
  static mapStateToProps = (state) => ({
    token: state.user.token,
  })

  static mapDispatchToProps = (dispatch) => ({
    addRecentRoom: (room) => dispatch(addRecent(room)),
  })

  static propTypes = {
    addRecentRoom: PropTypes.func,
    navigation: PropTypes.shape().isRequired,
    token: PropTypes.string,
  }

  static defaultProps = {
    addRecentRoom: () => { },
    token: ``,
  }

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
      if (sub) {
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
    navigation.navigate(`RoomDetail`, { room })
  }

  clear = () => this.setState({ query: ``, searchResults: [] })

  renderSearchResult = (searchResult) => (
    <SearchResult
      key={searchResult.roomid}
      topText={searchResult.roomname}
      bottomText={searchResult.classification_name}
      type="location"
      buttonText="View"
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

export default connect(
  SearchControl.mapStateToProps,
  SearchControl.mapDispatchToProps,
)(SearchControl)
