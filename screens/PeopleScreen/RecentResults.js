// @flow
import PropTypes from "prop-types"
import React, { Component } from "react"
import { View } from "react-native"
import { connect } from "react-redux"
import { generate } from "shortid"

import { clearRecents as clearRecentsAction } from "../../actions/peopleActions"
import Button from "../../components/Button"
import SearchResult from "../../components/SearchResult"
import { CentredText, SubtitleText } from "../../components/Typography"

export class RecentResults extends Component {
  static mapDispatchToProps = (dispatch) => ({
    clearRecents: () => dispatch(clearRecentsAction()),
  })

  static mapStateToProps = (state) => ({
    recents: state.people.recents,
  })

  static propTypes = {
    clearRecents: PropTypes.func,
    navigation: PropTypes.shape().isRequired,
    recents: PropTypes.arrayOf(PropTypes.shape()),
  }

  static defaultProps = {
    clearRecents: () => { },
    recents: [],
  }

  viewPerson = (person) => () => {
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
        buttonText="View"
        onPress={this.viewPerson(recent)}
      />
    )
  }

  render() {
    const { recents, clearRecents } = this.props
    if (recents.length === 0) {
      return null
    }
    return (
      <View>
        <SubtitleText>Recently Searched</SubtitleText>
        {recents.map(this.renderRecent)}
        {recents.length > 0 ? (
          <Button onPress={clearRecents}>Clear</Button>
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
