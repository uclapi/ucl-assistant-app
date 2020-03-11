// @flow
import { Feather } from "@expo/vector-icons"
import PropTypes from "prop-types"
import React, { Component } from "react"
import { momentObj } from "react-moment-proptypes"
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  View,
} from "react-native"
import { connect } from "react-redux"

import {
  fetchDetails,
  fetchSeatInfos,
} from "../../actions/studyspacesActions"
import Button from "../../components/Button"
import { Page } from "../../components/Containers"
import { BodyText, SubtitleText } from "../../components/Typography"
import Colors from "../../constants/Colors"
import { AssetManager } from "../../lib"
import {
  favouriteStudySpacesSelector,
} from '../../selectors/studyspacesSelectors'
import Styles from "../../styles/Containers"
import FavouriteStudySpaces from "./components/FavouriteStudySpaces"

const styles = StyleSheet.create({
  emptyImage: {
    height: 200,
    marginTop: 5,
  },
  favourites: {
    paddingBottom: 20,
  },
  padder: {
    height: 125,
  },
  suggestion: {
    marginBottom: 20,
    marginTop: 20,
  },
})

class StudySpaceFavouritesScreen extends Component {
  static mapStateToProps = (state) => {
    const {
      user: {
        token,
      },
      studyspaces: {
        lastModified,
      },
    } = state
    return {
      favouriteSpaces: favouriteStudySpacesSelector(state),
      lastModified,
      token,
    }
  }

  static mapDispatchToProps = (dispatch) => ({
    fetchInfo: (ids, token) => dispatch(fetchSeatInfos(token, ids)),
    fetchStudyspaceDetails: (token) => dispatch(fetchDetails(token)),
  })

  static propTypes = {
    favouriteSpaces: PropTypes.arrayOf(PropTypes.shape()),
    fetchInfo: PropTypes.func,
    fetchStudyspaceDetails: PropTypes.func,
    lastModified: PropTypes.oneOfType([momentObj, PropTypes.string]),
    navigation: PropTypes.shape().isRequired,
    studyspaces: PropTypes.arrayOf(PropTypes.shape()),
    token: PropTypes.string,
  }

  static defaultProps = {
    favouriteSpaces: [],
    fetchInfo: () => { },
    fetchStudyspaceDetails: () => { },
    lastModified: null,
    studyspaces: [],
    token: ``,
  }

  constructor(props) {
    super(props)
    this.state = {
      loadedSeatInfo: false,
    }
  }

  componentDidMount() {
    const { loadedSeatInfo } = this.state
    const { token, fetchStudyspaceDetails } = this.props
    if (!loadedSeatInfo && token) {
      this.fetchSeatInfo()
    }
    fetchStudyspaceDetails(token)
  }

  fetchSeatInfo = () => {
    this.setState({ loadedSeatInfo: true }, () => {
      const { studyspaces, fetchInfo, token } = this.props
      const ids = studyspaces.map((space) => space.id)
      setTimeout(() => fetchInfo(ids, token), 500)
    })
  }

  viewStudySpacesList = () => {
    const { navigation } = this.props
    navigation.navigate(`StudySpacesList`)
  }

  renderFavouriteStudySpaces = () => {
    const { navigation, favouriteSpaces, lastModified } = this.props
    return (
      <FavouriteStudySpaces
        lastModified={lastModified}
        favouriteSpaces={favouriteSpaces}
        navigation={navigation}
        style={styles.favourites}
      />
    )
  }

  renderSuggestion = () => (
    <View style={styles.suggestion}>
      <BodyText>
        Mark a study space as one of your favourites and&nbsp;
        it will appear here for easy reference
      </BodyText>
      <Image
        source={AssetManager.undraw.studying}
        resizeMethod="scale"
        style={[Styles.image, styles.emptyImage]}
        resizeMode="contain"
      />
    </View>
  )

  static navigationOptions = {
    headerShown: false,
    tabBarIcon: ({ focused }) => (
      <Feather
        name="book"
        size={28}
        color={focused ? Colors.pageBackground : Colors.textColor}
      />
    ),
    title: `Study Spaces`,
  }

  render() {
    const { loadedSeatInfo } = this.state
    const {
      studyspaces,
      favouriteSpaces,
      lastModified,
    } = this.props
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
      >
        <SubtitleText>Your Favourites</SubtitleText>
        {
          (favouriteSpaces.length > 0)
            ? this.renderFavouriteStudySpaces()
            : this.renderSuggestion()
        }
        {
          (lastModified === null || typeof lastModified !== `object`)
            ? <ActivityIndicator size="large" />
            : <Button onPress={this.viewStudySpacesList}>View All</Button>
        }
        <View style={styles.padder} />
      </Page>
    )
  }
}

export default connect(
  StudySpaceFavouritesScreen.mapStateToProps,
  StudySpaceFavouritesScreen.mapDispatchToProps,
)(StudySpaceFavouritesScreen)
