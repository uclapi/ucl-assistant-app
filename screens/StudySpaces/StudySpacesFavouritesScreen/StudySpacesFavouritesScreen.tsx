import React from "react"
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  View,
} from "react-native"
import { connect, ConnectedProps } from "react-redux"

import {
  fetchDetails,
  fetchSeatInfos,
  StudySpacesDispatch,
} from "../../../actions/studyspacesActions"
import Button from "../../../components/Button"
import { PageNoScroll } from "../../../components/Containers"
import { BodyText, SubtitleText } from "../../../components/Typography"
import { AppStateType } from "../../../configureStore"
import { AssetManager } from "../../../lib"
import {
  favouriteStudySpacesSelector,
} from '../../../selectors/studyspacesSelectors'
import Styles from "../../../styles/Containers"
import LastUpdated from '../components/LastUpdated'
import StudySpaceResult from "../components/StudySpaceResult"
import type { StudySpacesNavigationType } from "../StudySpacesNavigator"

const styles = StyleSheet.create({
  emptyImage: {
    height: 200,
    marginTop: 5,
  },
  flatList: {
    paddingTop: 10,
  },
  footer: {
    marginTop: 20,
  },
  header: {
    marginBottom: 20,
  },
  suggestion: {
    marginBottom: 20,
    marginTop: 20,
  },
  title: {
    marginBottom: 10,
  },
})

interface Props extends PropsFromRedux {
  navigation: StudySpacesNavigationType,
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

  keyExtractor = (item): string => `${item.id}`

  renderItem = ({ item }): React.ReactElement => {
    const { navigation } = this.props
    return <StudySpaceResult navigation={navigation} id={item.id} />
  }

  render() {
    const { loadedSeatInfo } = this.state
    const {
      favouriteSpaces,
      lastModified,
    } = this.props
    return (
      <PageNoScroll>
        <FlatList
          contentContainerStyle={styles.flatList}
          onRefresh={this.fetchSeatInfo}
          refreshing={!loadedSeatInfo}
          data={favouriteSpaces}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
          ListHeaderComponent={(
            <>
              <SubtitleText style={styles.title}>Your Favourites</SubtitleText>
              <LastUpdated lastModified={lastModified} />
            </>
          )}
          ListHeaderComponentStyle={styles.header}
          ListFooterComponent={
            (lastModified === null || typeof lastModified !== `object`)
              ? <ActivityIndicator size="large" />
              : <Button onPress={this.viewStudySpacesList}>View All</Button>
          }
          ListFooterComponentStyle={styles.footer}
          ListEmptyComponent={(
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
          )}
        />
      </PageNoScroll>
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
