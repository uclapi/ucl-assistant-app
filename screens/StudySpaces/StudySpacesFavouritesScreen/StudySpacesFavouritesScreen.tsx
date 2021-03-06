import React, { useCallback, useEffect, useState } from "react"
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  View,
} from "react-native"
import { connect, ConnectedProps } from "react-redux"
import Button from "../../../components/Button"
import { PageNoScroll } from "../../../components/Containers"
import { BodyText, SubtitleText } from "../../../components/Typography"
import { AppStateType } from "../../../configureStore"
import { AssetManager } from "../../../lib"
import {
  fetchDetails,
  fetchSeatInfos,
  StudySpacesDispatch,
} from "../../../redux/actions/studyspacesActions"
import { favouriteStudySpacesSelector } from '../../../redux/selectors/studyspacesSelectors'
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
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
  footer: {
    marginTop: 20,
  },
  header: {
    marginBottom: 20,
  },
  page: {
    paddingLeft: 0,
    paddingRight: 0,
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

const StudySpaceFavouritesScreen: React.FC<Props> = ({
  token,
  fetchStudyspaceDetails,
  fetchInfo,
  navigation,
  lastModified,
  favouriteSpaces,
}) => {
  const [loadedSeatInfo, setLoadedSeatInfo] = useState(false)

  const fetchSeatInfo = useCallback(() => {
    setLoadedSeatInfo(true)
    setTimeout(() => fetchInfo(token), 500)
  }, [token, fetchInfo])

  const viewStudySpacesList = useCallback(
    () => navigation.navigate(`StudySpacesList`),
    [navigation],
  )

  const keyExtractor = useCallback((item): string => `${item.id}`, [])

  const renderItem = useCallback(({ item }): React.ReactElement => (
    <StudySpaceResult navigation={navigation} id={item.id} />
  ), [navigation])

  useEffect(() => {
    if (!loadedSeatInfo && token) {
      fetchSeatInfo()
    }
    fetchStudyspaceDetails(token)
  }, [fetchSeatInfo, fetchStudyspaceDetails, token, loadedSeatInfo])

  return (
    <PageNoScroll style={styles.page}>
      <FlatList
        contentContainerStyle={styles.flatList}
        onRefresh={fetchSeatInfo}
        refreshing={!loadedSeatInfo}
        data={favouriteSpaces}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
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
            : <Button onPress={viewStudySpacesList}>View All</Button>
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
