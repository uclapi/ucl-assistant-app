import { Feather } from "@expo/vector-icons"
import React, { Component } from "react"
import { Image, StyleSheet } from 'react-native'
import { connect } from "react-redux"

import { Page } from "../../components/Containers"
import { TitleText } from "../../components/Typography"
import Colors from "../../constants/Colors"
import { AssetManager } from "../../lib"
import Styles from "../../styles/Containers"
import RecentResults from "./RecentResults"
import SearchControl from "./SearchControl"

const styles = StyleSheet.create({
  emptyImage: {
    height: 200,
    marginTop: 25,
  },
})

interface Props {
  isSearching: boolean,
  navigation: any,
  recents: Array<any>,
  searchResults: Array<any>,
}

export class PeopleScreen extends Component<Props> {
  static navigationOptions = {
    headerShown: false,
    tabBarIcon: ({ focused }) => (
      <Feather
        name="users"
        size={28}
        color={focused ? Colors.pageBackground : Colors.textColor}
      />
    ),
  }

  static mapStateToProps = (state) => ({
    isSearching: state.people.isSearching,
    recents: state.people.recents,
    searchResults: state.people.searchResults,
  })

  render() {
    const {
      navigation,
      recents,
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

export default connect(
  PeopleScreen.mapStateToProps,
  () => ({}),
)(PeopleScreen)
