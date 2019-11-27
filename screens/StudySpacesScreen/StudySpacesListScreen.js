// @flow
import memoize from "memoize-one"
import PropTypes from "prop-types"
import React from 'react'
import { momentObj } from "react-moment-proptypes"
import { FlatList, StyleSheet } from 'react-native'
import { connect } from "react-redux"
import { generate } from "shortid"

import {
  fetchSeatInfos,
  setSearchQuery,
  setSortType,
} from "../../actions/studyspacesActions"
import { Page } from "../../components/Containers"
import {
  ErrorText,
} from "../../components/Typography"
import { WORKSPACES_SORT_TYPES } from '../../constants/studyspacesConstants'
import {
  matchingStudySpacesSelector,
} from '../../selectors/studyspacesSelectors'
import LastUpdated from './components/LastUpdated'
import StudySpaceFilters from './components/StudySpaceFilters'
import StudySpaceSearchResult from "./components/StudySpaceResult"

const styles = StyleSheet.create({
  flatList: {
    paddingVertical: 20,
  },
  page: {
    paddingTop: 0,
  },
})

class StudySpacesListScreen extends React.Component {
  static mapStateToProps = (state) => {
    const {
      studyspaces: {
        lastModified,
        searchQuery = ``,
        sortType,
      },
      user: {
        token,
      },
    } = state
    return {
      lastModified,
      searchQuery,
      sortType,
      studyspaces: matchingStudySpacesSelector(state),
      token,
    }
  }

  static mapDispatchToProps = (dispatch) => ({
    clearQuery: () => dispatch(setSearchQuery(``)),
    fetchInfo: (ids, token) => dispatch(fetchSeatInfos(token, ids)),
    setQuery: (query: String) => dispatch(setSearchQuery(query)),
    setSort: (sortType: String) => dispatch(setSortType(sortType)),
  })


  static findErrorneousSpaces = (spaces) => spaces.filter(
    (space) => typeof space.fetchSeatInfoError === `string`
      && space.fetchSeatInfoError !== ``,
  )

  memoizeErrorneousSpaces = memoize(StudySpacesListScreen.findErrorneousSpaces)

  static propTypes = {
    fetchInfo: PropTypes.func,
    lastModified: PropTypes.oneOfType([momentObj, PropTypes.string]),
    navigation: PropTypes.shape().isRequired,
    searchQuery: PropTypes.string,
    setQuery: PropTypes.func,
    setSort: PropTypes.func,
    sortType: PropTypes.string,
    studyspaces: PropTypes.arrayOf(PropTypes.shape()),
    token: PropTypes.string,
  }

  static defaultProps = {
    fetchInfo: () => { },
    lastModified: null,
    searchQuery: ``,
    setQuery: () => { },
    setSort: () => { },
    sortType: WORKSPACES_SORT_TYPES.NAME,
    studyspaces: [],
    token: ``,
  }

  constructor(props) {
    super(props)
    this.state = {
      loadedSeatInfo: false,
    }
  }

  async componentDidMount() {
    const { loadedSeatInfo } = this.state
    const { token } = this.props
    if (!loadedSeatInfo && token) {
      this.fetchSeatInfo()
    }
  }

  fetchSeatInfo = () => {
    this.setState({ loadedSeatInfo: true }, () => {
      const { studyspaces, fetchInfo, token } = this.props
      const ids = studyspaces.map((space) => space.id)
      setTimeout(() => fetchInfo(ids, token), 500)
    })
  }

  keyExtractor = (item) => `${item.id}`

  renderItem = ({ item }) => {
    const { navigation } = this.props
    return (
      <StudySpaceSearchResult navigation={navigation} id={item.id} />
    )
  }

  static navigationOptions = {
    title: `All Study Spaces`,
  }

  render() {
    const { loadedSeatInfo } = this.state
    const {
      studyspaces,
      setQuery,
      searchQuery,
      sortType,
      setSort,
      lastModified,
    } = this.props
    const errorneousSpaces = this.memoizeErrorneousSpaces(studyspaces)
    const isLoading = !loadedSeatInfo
      || studyspaces.reduce(
        (res, space) => res || space.isFetchingSeatInfo,
        false,
      )
    return (
      <Page
        mainTabPage
        refreshEnabled
        onRefresh={this.fetchSeatInfo}
        refreshing={isLoading}
        keyboardAvoidingViewStyle={styles.page}
        contentContainerStyle={styles.page}
      >
        {errorneousSpaces.length < 5 ? (
          errorneousSpaces.map((space) => (
            <ErrorText key={generate()}>
              Error fetching
              {` `}
              {space.name}
              {` `}
              {space.fetchSeatInfoError}
            </ErrorText>
          ))
        ) : (
            <ErrorText>
              Looks like there was an error trying to fetch live seating info.
            </ErrorText>
        )}

        <StudySpaceFilters
          query={searchQuery}
          onChangeQuery={setQuery}
          sortType={sortType}
          updateSortType={setSort}
        />

        <LastUpdated lastModified={lastModified} />

        <FlatList
          data={studyspaces}
          contentContainerStyle={styles.flatList}
          keyExtractor={this.keyExtractor}
          initialNumToRender={30}
          renderItem={this.renderItem}
        />
      </Page>
    )
  }
}

export default connect(
  StudySpacesListScreen.mapStateToProps,
  StudySpacesListScreen.mapDispatchToProps,
)(StudySpacesListScreen)
