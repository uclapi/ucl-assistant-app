import { StackNavigationProp } from "@react-navigation/stack"
import React, { useCallback } from "react"
import { View } from "react-native"
import { connect, ConnectedProps } from "react-redux"
import {
  clearRecentResults as clearRecentsResultsAction,
  PeopleDispatch,
} from "../../../actions/peopleActions"
import Button from "../../../components/Button"
import SearchResult from "../../../components/SearchResult"
import { CentredText, SubtitleText } from "../../../components/Typography"
import type { AppStateType } from '../../../configureStore'
import type { Person } from "../../../types/uclapi"
import type { PeopleNavigatorParamList } from '../PeopleNavigator'

interface RecentResultProp {
  recent: Person,
  navigation: StackNavigationProp<PeopleNavigatorParamList>,
}

const RecentResult: React.FC<RecentResultProp> = ({ recent, navigation }) => {
  const viewPerson = useCallback(
    (person: Person) => (): void => navigation.navigate(`PeopleDetail`, person),
    [navigation],
  )

  return recent ? (
    <SearchResult
      key={recent.email}
      topText={recent.name}
      bottomText={recent.department}
      type="person"
      onPress={viewPerson(recent)}
    />
  ) : null
}

interface RecentResultsProps extends PropsFromRedux {
  navigation: StackNavigationProp<PeopleNavigatorParamList>,
}

const RecentResults: React.FC<RecentResultsProps> = ({
  recents = [],
  clearRecentResults,
  navigation,
}) => {
  if (recents.length === 0) {
    return null
  }
  return (
    <View>
      <SubtitleText>Recently Searched</SubtitleText>
      {recents.map((recent) => <RecentResult recent={recent} navigation={navigation} />)}
      {recents.length > 0 ? (
        <Button onPress={clearRecentResults}>Clear</Button>
      ) : (
        <CentredText>Recent results will appear here.</CentredText>
      )}
    </View>
  )
}

const connector = connect(
  (state: AppStateType) => ({
    recents: state.people.recents,
  }),
  (dispatch: PeopleDispatch) => ({
    clearRecentResults: () => dispatch(clearRecentsResultsAction()),
  }),
)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(RecentResults)
