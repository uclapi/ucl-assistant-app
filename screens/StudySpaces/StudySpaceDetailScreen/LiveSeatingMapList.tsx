import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { CompositeNavigationProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import React from "react"
import { StyleSheet, View } from "react-native"

import type { StudySpacesNavigatorParamList } from ".."
import { LightButton } from '../../../components/Button'
import {
  BodyText, SearchResultTopText,
  SubtitleText,
} from "../../../components/Typography"
import Colors from "../../../constants/Colors"
import Shadow from "../../../lib/Shadow"
import type {
  MainTabNavigatorParamList,
  RootStackParamList,
} from '../../../navigation'

const styles = StyleSheet.create({
  areaInfo: {
    alignContent: `flex-start`,
    flexDirection: `column`,
    justifyContent: `flex-start`,
    marginBottom: 20,
  },
  cardHeader: {
    backgroundColor: Colors.cardHeader,
    borderRadius: 10,
    color: Colors.cardBackground,
    marginBottom: 5,
    padding: 20,
    ...Shadow(2),
  },
  cardList: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 10,
    marginTop: 5,
    padding: 20,
    ...Shadow(2),
  },
  seatingMapButton: {
    alignSelf: `auto`,
    marginTop: 5,
  },
})

const studySpaceNames = [`Student Centre `]
// remove the name of the studyspace from the name
// of the map if it is present because it's just redundant
// e.g. Student Centre Level 1 => Level 1
const fixNames = ({ name, ...otherProps }) => ({
  ...otherProps,
  name: name.replace(new RegExp(`(${studySpaceNames.join(`|`)})`), ``),
})

interface Props {
  maps: Array<unknown>,
  surveyId: string,
  navigation: CompositeNavigationProp<
    StackNavigationProp<StudySpacesNavigatorParamList>,
    CompositeNavigationProp<
      BottomTabNavigationProp<MainTabNavigatorParamList>,
      StackNavigationProp<RootStackParamList>
    >
  >,
}

class LiveSeatingMapList extends React.Component<Props> {
  openLiveMap = ({ name, surveyId, mapId }) => () => {
    const { navigation } = this.props
    navigation.navigate(`LiveSeatingMap`, { mapId, name, surveyId })
  }

  renderMapInfo = ({
    id, name, total, occupied,
  }): React.ReactElement => {
    const { surveyId } = this.props
    return (
      <View key={id} style={styles.areaInfo}>
        <SearchResultTopText>
          {name}
        </SearchResultTopText>
        <BodyText>
          {`${(total - occupied)} seats free (total: ${total})`}
        </BodyText>
        <LightButton
          onPress={this.openLiveMap({ mapId: id, name, surveyId })}
          style={styles.seatingMapButton}
        >
          View Live Seating Map
        </LightButton>
      </View>
    )
  }

  render(): React.ReactElement {
    const { maps } = this.props
    const hasMaps = maps && Array.isArray(maps)
    if (!hasMaps) {
      return null
    }

    const mapsList = maps.map(fixNames).map(this.renderMapInfo)

    return (
      <View>
        <SubtitleText style={styles.cardHeader}>Areas</SubtitleText>
        <View style={styles.cardList}>{mapsList}</View>
      </View>
    )
  }
}

export default LiveSeatingMapList
