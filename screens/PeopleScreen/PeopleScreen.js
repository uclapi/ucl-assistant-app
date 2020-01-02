import { Feather } from "@expo/vector-icons"
import PropTypes from "prop-types"
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

export class PeopleScreen extends Component {
  static mapStateToProps = (state) => ({
    isSearching: state.people.isSearching,
    recents: state.people.recents,
    searchResults: state.people.searchResults,
  })

  static propTypes = {
    isSearching: PropTypes.bool,
    navigation: PropTypes.shape().isRequired,
    recents: PropTypes.arrayOf(PropTypes.shape()),
    searchResults: PropTypes.arrayOf(PropTypes.shape()),
  }

  static defaultProps = {
    isSearching: false,
    recents: [],
    searchResults: false,
  }

  static navigationOptions = {
    header: null,
    tabBarIcon: ({ focused }) => (
      <Feather
        name="users"
        size={28}
        color={focused ? Colors.pageBackground : Colors.textColor}
      />
    ),
  }

  render() {
    const {
      navigation,
      recents,
      isSearching,
      searchResults,
    } = this.props
    return (
      <Page mainTabPage>
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
