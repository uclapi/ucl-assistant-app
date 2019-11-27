import PropTypes from "prop-types"
import React from "react"
import { momentObj } from "react-moment-proptypes"
import {
  FlatList, StyleSheet,
  View, ViewPropTypes,
} from "react-native"

import LastUpdated from './LastUpdated'
import StudySpaceResult from "./StudySpaceResult"

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  flatList: {
    paddingTop: 10,
  },
})

class FavouriteStudySpaces extends React.Component {
  static propTypes = {
    favouriteSpaces: PropTypes.arrayOf(PropTypes.shape()),
    lastModified: PropTypes.oneOfType([momentObj, PropTypes.string]),
    navigation: PropTypes.shape(),
    style: ViewPropTypes.style,
  }

  static defaultProps = {
    favouriteSpaces: [],
    lastModified: null,
    navigation: { navigate: () => { } },
    style: {},
  }

  keyExtractor = (item) => `${item.id}`

  renderItem = ({ item }) => {
    const { navigation } = this.props
    return <StudySpaceResult navigation={navigation} id={item.id} />
  }

  render() {
    const {
      favouriteSpaces,
      style,
      lastModified,
    } = this.props
    return (
      <View style={[styles.container, style]}>
        <LastUpdated lastModified={lastModified} />
        <FlatList
          contentContainerStyle={styles.flatList}
          data={favouriteSpaces}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}

export default FavouriteStudySpaces
