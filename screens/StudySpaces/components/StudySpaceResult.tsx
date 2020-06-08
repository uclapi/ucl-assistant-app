import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import { CompositeNavigationProp } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack"
import React from "react"
import { GestureResponderEvent } from "react-native"
import { connect, ConnectedProps } from "react-redux"
import { generate } from "shortid"

import SearchResult from "../../../components/SearchResult"
import type { AppStateType } from "../../../configureStore"
import Colors from "../../../constants/Colors"
import type {
  MainTabNavigatorParamList,
} from "../../../navigation/MainTabNavigator"
import type { RootStackParamList } from "../../../navigation/RootNavigation"
import type { StudySpacesNavigatorParamList } from "../StudySpacesNavigator"

interface Props {
  name?: string,
  onPress: (e?: GestureResponderEvent) => void,
  occupied?: number,
  total?: number,
  fetchingSeatInfo?: boolean,
}

const StudySpaceResult: React.FC<Props> = ({
  name = `Study Space Name`,
  onPress,
  occupied = 0,
  total = 0,
  fetchingSeatInfo = false,
}) => {
  const occupation = occupied / total
  let capacityString = `Unable to get data`
  let indicatorColor = Colors.textInputBackground
  if (total > 0) {
    switch (true) {
      case occupation > 0.9:
        capacityString = `Very busy`
        indicatorColor = Colors.indicatorRed
        break
      case occupation > 0.65:
        capacityString = `Quite busy`
        indicatorColor = Colors.indicatorOrange
        break
      case occupation > 0.5:
        capacityString = `A little busy`
        indicatorColor = Colors.indicatorYellow
        break
      case occupation > 0.2:
        capacityString = `Rather quiet`
        indicatorColor = Colors.indicatorLime
        break
      default:
        capacityString = `Very quiet`
        indicatorColor = Colors.indicatorGreen
    }
  }
  return (
    <SearchResult
      key={generate()}
      topText={name}
      bottomText={`${capacityString} (${total - occupied} seats free)`}
      type="location"
      indicator
      indicatorLoading={fetchingSeatInfo}
      indicatorColor={indicatorColor}
      onPress={onPress}
    />
  )
}

interface ConnectedStudySpaceProps extends PropsFromRedux {
  id: string,
  navigation: CompositeNavigationProp<
    StackNavigationProp<StudySpacesNavigatorParamList>,
    CompositeNavigationProp<
      BottomTabNavigationProp<MainTabNavigatorParamList>,
      StackNavigationProp<RootStackParamList>
    >
  >,
}

const ConnectedStudySpaceResult: React.FC<ConnectedStudySpaceProps> = ({
  id,
  studyspaces,
  navigation,
}) => {
  const space = studyspaces.filter((x) => x.id === id)[0]

  // There may be non-studyspace results e.g. 1 Saint Martin Le Grand
  // occupancy information is not available for these locations
  if (!space || space.capacity === 0) {
    return null
  }

  return (
    <StudySpaceResult
      {...space}
      onPress={() => navigation.navigate(`Main`, {
        params: {
          params: {
            id: space.id,
            name: space.name,
            occupied: space.occupied,
            total: space.total,
          },
          screen: `StudySpacesDetail`,
        },
        screen: `StudySpaces`,
      })}
    />
  )
}


const connector = connect(
  (state: AppStateType) => ({
    studyspaces: state.studyspaces.studyspaces,
  }),
)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(ConnectedStudySpaceResult)
