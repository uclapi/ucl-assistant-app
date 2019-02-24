import React, { Component } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { TextInput } from "../../components/Input";
import { CentredText } from "../../components/Typography";
import SearchResult from "../../components/SearchResult";
import ApiManager from "../../lib/ApiManager";

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
  },
  textInput: {
    flex: 1,
  },
});

class SearchControl extends Component {
  static SEARCH_DELAY = 500;
  static propTypes = {
    token: PropTypes.string,
    navigation: PropTypes.shape().isRequired,
    query: PropTypes.string,
  };
  static defaultProps = {
    token: "",
    query: "",
  };
  static mapStateToProps = state => ({
    token: state.user.token,
  });
  static mapDispatchToProps = () => ({});
  constructor(props) {
    super(props);
    this.state = {
      query: "",
      error: null,
      isSearching: false,
      searchResults: [],
    };
    const queryExists =
      props.navigation.state &&
      props.navigation.state.params &&
      props.navigation.state.params.query &&
      props.navigation.state.params.query.length > 0;
    if (queryExists) {
      this.state.query = props.navigation.state.params.query;
    }
  }
  componentDidMount() {
    const { query } = this.state;
    if (query.length > 0) {
      this.searchRooms(query);
    }
  }
  onChangeText = (query: String) => {
    if (query.length > 3) {
      clearTimeout(this.searchTimer);
      this.searchTimer = setTimeout(
        () => this.searchRooms(query),
        SearchControl.SEARCH_DELAY,
      );
    }
    this.setState({ query });
  };
  searchRooms = async (query: String) => {
    const { token } = this.props;
    try {
      this.setState({ isSearching: true });
      const results = await ApiManager.rooms.search(token, query);
      this.setState({ searchResults: results, isSearching: false });
    } catch (error) {
      this.setState({ error: error.message, isSearching: false });
    }
  };
  navigateToRoomDetail = room => () =>
    this.props.navigation.navigate("RoomDetailScreen", { room });
  renderSearchResult = searchResult => (
    <SearchResult
      key={searchResult.roomid}
      topText={searchResult.roomname}
      bottomText={searchResult.classification_name}
      type="location"
      buttonText="View"
      onPress={this.navigateToRoomDetail(searchResult)}
    />
  );
  render() {
    const { query, error, isSearching, searchResults } = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Search for a room or building name..."
          onChangeText={this.onChangeText}
          value={query}
          clearButtonMode="always"
          style={styles.textInput}
        />
        {error ? <CentredText>Error! {error} </CentredText> : null}
        {isSearching ? <ActivityIndicator /> : null}
        {query.length === 0 ? (
          <CentredText>Start typing to get search results</CentredText>
        ) : null}
        {query.length > 0 && searchResults.length === 0 ? (
          <CentredText>No results found.</CentredText>
        ) : null}
        {searchResults.map(this.renderSearchResult)}
      </View>
    );
  }
}

export default connect(
  SearchControl.mapStateToProps,
  SearchControl.mapDispatchToProps,
)(SearchControl);
