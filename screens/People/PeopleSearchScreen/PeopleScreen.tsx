import type { StackNavigationProp } from "@react-navigation/stack"
import React, { Component } from "react"
import { Image, StyleSheet } from 'react-native'
import { connect, ConnectedProps } from "react-redux"
import { Page } from "../../../components/Containers"
import { TitleText } from "../../../components/Typography"
import { AppStateType } from "../../../configureStore"
import { AssetManager } from "../../../lib"
import Styles from "../../../styles/Containers"
import type { PeopleNavigatorParamList } from "../PeopleNavigator"
import RecentResults from "./RecentResults"
import SearchControl from "./SearchControl"

const styles = StyleSheet.create({
  emptyImage: {
    height: 200,
    marginTop: 25,
  },
})

interface Props extends PropsFromRedux {
  navigation: StackNavigationProp<PeopleNavigatorParamList>,
}

export class PeopleScreen extends Component<Props> {
  static navigationOptions = {
    headerShown: false,
  }

  render(): React.ReactElement {
    const {
      navigation,
      recents = [],
      isSearching,
      searchResults,
    } = this.props
    return (
      <Page>
        <TitleText>People</TitleText>
        <SearchControl navigation={navigation} />
        <RecentResults navigation={navigation} />
        {
          (
            recents.length === 0
            && searchResults.length === 0
            && !isSearching
          ) ? (
              <Image
                source={AssetManager.undraw.peopleSearch}
                resizeMethod="scale"
                style={[Styles.image, styles.emptyImage]}
                resizeMode="contain"
              />
            ) : null
        }
      </Page>
    )
  }
}

const connector = connect(
  (state: AppStateType) => ({
    isSearching: state.people.isSearching,
    recents: state.people.recents,
    searchResults: state.people.searchResults,
  }),
  () => ({}),
)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(PeopleScreen)
