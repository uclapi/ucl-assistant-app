import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { CompositeNavigationProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from "react"
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  View,
} from "react-native"
import { connect, ConnectedProps } from "react-redux"

import type { StudySpacesNavigatorParamList } from ".."
import {
  fetchDetails,
  fetchSeatInfos,
  StudySpacesDispatch,
} from "../../../actions/studyspacesActions"
import Button from "../../../components/Button"
import { Page } from "../../../components/Containers"
import { BodyText, SubtitleText } from "../../../components/Typography"
import { AppStateType } from "../../../configureStore"
import { AssetManager } from "../../../lib"
import type {
  MainTabNavigatorParamList,
  RootStackParamList,
} from '../../../navigation'
import {
  favouriteStudySpacesSelector,
} from '../../../selectors/studyspacesSelectors'
import Styles from "../../../styles/Containers"
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

interface Props extends PropsFromRedux {
  navigation: CompositeNavigationProp<
    StackNavigationProp<StudySpacesNavigatorParamList>,
    CompositeNavigationProp<
      BottomTabNavigationProp<MainTabNavigatorParamList>,
      StackNavigationProp<RootStackParamList>
    >
  >,
}

interface State {
  loadedSeatInfo: boolean,
}

class StudySpaceFavouritesScreen extends React.Component<Props, State> {
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
      const { fetchInfo, token } = this.props
      setTimeout(() => fetchInfo(token), 500)
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

  render() {
    const { loadedSeatInfo } = this.state
    const {
      favouriteSpaces,
      lastModified,
    } = this.props
    return (
      <Page
        refreshEnabled
        onRefresh={this.fetchSeatInfo}
        refreshing={!loadedSeatInfo}
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

const connector = connect(
  (state: AppStateType) => {
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
  },
  (dispatch: StudySpacesDispatch) => ({
    fetchInfo: (token) => dispatch(fetchSeatInfos(token)),
    fetchStudyspaceDetails: (token) => dispatch(fetchDetails(token)),
  }),
)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(StudySpaceFavouritesScreen)
