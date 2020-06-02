import React from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import { generate } from "shortid"

import {
  clearRecentResults as clearRecentsResultsAction,
} from "../../actions/peopleActions"
import Button from "../../components/Button"
import SearchResult from "../../components/SearchResult"
import { CentredText, SubtitleText } from "../../components/Typography"
import type { AppStateType } from '../../configureStore'

interface Props {
  clearRecentResults: () => void,
  navigation: any,
  recents: any,
}

export class RecentResults extends React.Component<Props> {
  static mapDispatchToProps = (dispatch): any => ({
    clearRecentResults: (): any => dispatch(clearRecentsResultsAction()),
  })

  static mapStateToProps = (state: AppStateType): any => ({
    recents: state.people.recents,
  })

  static defaultProps = {
    clearRecentResults: (): void => { },
    recents: [],
  }

  viewPerson = (person) => (): void => {
    const { navigation } = this.props
    navigation.navigate(`PersonDetail`, person)
  }

  renderRecent = (recent = null) => {
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

export default connect(
  RecentResults.mapStateToProps,
  RecentResults.mapDispatchToProps,
)(RecentResults)
