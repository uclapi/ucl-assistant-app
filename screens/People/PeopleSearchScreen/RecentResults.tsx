import { StackNavigationProp } from "@react-navigation/stack"
import React from "react"
import { View } from "react-native"
import { connect, ConnectedProps } from "react-redux"
import { generate } from "shortid"

import {
  clearRecentResults as clearRecentsResultsAction,
  PeopleDispatch,
} from "../../../actions/peopleActions"
import Button from "../../../components/Button"
import SearchResult from "../../../components/SearchResult"
import { CentredText, SubtitleText } from "../../../components/Typography"
import type { AppStateType } from '../../../configureStore'
import { Person } from "../../../types/uclapi"
import type { PeopleNavigatorParamList } from '../PeopleNavigator'

interface Props extends PropsFromRedux {
  navigation: StackNavigationProp<PeopleNavigatorParamList>,
}

export class RecentResults extends React.Component<Props> {
  viewPerson = (person: Person) => (): void => {
    const { navigation } = this.props
    navigation.navigate(`PeopleDetail`, person)
  }

  renderRecent = (recent = null): React.ReactNode => {
    if (recent === null) {
      return null
    }
    return (
      <SearchResult
        key={generate()}
        topText={recent.name}
        bottomText={recent.department}
        type="person"
        onPress={this.viewPerson(recent)}
      />
    )
  }

  render(): React.ReactElement {
    const { recents, clearRecentResults } = this.props
    if (recents.length === 0) {
      return null
    }
    return (
      <View>
        <SubtitleText>Recently Searched</SubtitleText>
        {recents.map(this.renderRecent)}
        {recents.length > 0 ? (
          <Button onPress={clearRecentResults}>Clear</Button>
        ) : (
            <CentredText>Recent results will appear here.</CentredText>
        )}
      </View>
    )
  }
}

const connector = connect(
  (state: AppStateType): any => ({
    recents: state.people.recents,
  }),
  (dispatch: PeopleDispatch) => ({
    clearRecentResults: (): any => dispatch(clearRecentsResultsAction()),
  }),
)

type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(RecentResults)
