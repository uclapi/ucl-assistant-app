
import memoize from "memoize-one"
import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { connect, ConnectedProps } from "react-redux"
import { generate } from "shortid"

import {
  fetchSeatInfos,
  setSearchQuery,
  setSortType,
  StudySpacesDispatch,
} from "../../../actions/studyspacesActions"
import { Page } from "../../../components/Containers"
import {
  ErrorText,
} from "../../../components/Typography"
import { AppStateType } from '../../../configureStore'
import { WORKSPACES_SORT_TYPES } from '../../../constants/studyspacesConstants'
import {
  matchingStudySpacesSelector,
} from '../../../selectors/studyspacesSelectors'
import LastUpdated from '../components/LastUpdated'
import StudySpaceSearchResult from "../components/StudySpaceResult"
import { StudySpacesNavigationType } from '../StudySpacesNavigator'
import StudySpaceFilters from './components/StudySpaceFilters'

const styles = StyleSheet.create({
  flatList: {
    paddingVertical: 20,
  },
  page: {
    paddingTop: 0,
  },
})

interface Props extends PropsFromRedux {
  navigation: StudySpacesNavigationType,
}

interface State {
  loadedSeatInfo: boolean,
}

class StudySpacesListScreen extends React.Component<Props, State> {
  static findErrorneousSpaces = (spaces) => spaces.filter(
    (space) => typeof space.fetchSeatInfoError === `string`
      && space.fetchSeatInfoError !== ``,
  )

  memoizeErrorneousSpaces = memoize(StudySpacesListScreen.findErrorneousSpaces)

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
      const { fetchInfo, token } = this.props
      setTimeout(() => fetchInfo(token), 500)
    })
  }

  keyExtractor = (item) => `${item.id}`

  renderItem = ({ item }) => {
    const { navigation } = this.props
    return (
      <StudySpaceSearchResult navigation={navigation} id={item.id} />
    )
  }

  render() {
    const { loadedSeatInfo } = this.state
    const {
      studyspaces,
      setQuery,
      searchQuery,
      sortType = WORKSPACES_SORT_TYPES.NAME,
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

const connector = connect(
  (state: AppStateType) => {
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
  },
  (dispatch: StudySpacesDispatch) => ({
    clearQuery: () => dispatch(setSearchQuery(``)),
    fetchInfo: (token) => dispatch(fetchSeatInfos(token)),
    setQuery: (query) => dispatch(setSearchQuery(query)),
    setSort: (sortType) => dispatch(setSortType(sortType)),
  }),
)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(StudySpacesListScreen)
