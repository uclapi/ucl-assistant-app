import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { CompositeNavigationProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { Moment } from 'moment'
import React from "react"
import {
  FlatList,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native"

import type { StudySpacesNavigatorParamList } from "../.."
import type {
  MainTabNavigatorParamList,
  RootStackParamList,
} from '../../../../navigation'
import LastUpdated from '../../components/LastUpdated'
import StudySpaceResult from "../../components/StudySpaceResult"

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  flatList: {
    paddingTop: 10,
  },
})

interface Props {
  favouriteSpaces: Array<unknown>,
  lastModified: Moment,
  navigation: CompositeNavigationProp<
    StackNavigationProp<StudySpacesNavigatorParamList>,
    CompositeNavigationProp<
      BottomTabNavigationProp<MainTabNavigatorParamList>,
      StackNavigationProp<RootStackParamList>
    >
  >,
  style: ViewStyle,
}

class FavouriteStudySpaces extends React.Component<Props> {
  keyExtractor = (item): string => `${item.id}`

  renderItem = ({ item }): React.ReactElement => {
    const { navigation } = this.props
    return <StudySpaceResult navigation={navigation} id={item.id} />
  }

  render(): React.ReactElement {
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
