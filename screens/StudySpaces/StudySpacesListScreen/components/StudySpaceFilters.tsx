import PropTypes from "prop-types"
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { LightButton } from '../../../../components/Button'
import { Horizontal } from '../../../../components/Containers'
import { SearchInput } from '../../../../components/Input'
import {
  WORKSPACES_SORT_TYPES,
  WORKSPACES_SORT_TYPES_TYPE,
} from '../../../../redux/constants/studyspacesConstants'

const styles = StyleSheet.create({
  container: {},
  sortToggle: {
    marginRight: 20,
  },
  sortTogglesContainer: {
    justifyContent: `flex-start`,
    marginBottom: 10,
    marginTop: 10,
  },
})

interface Props {
  query: string,
  onChangeQuery: (s: string) => void,
  updateSortType: (s: WORKSPACES_SORT_TYPES_TYPE) => void,
  sortType: WORKSPACES_SORT_TYPES_TYPE,
}

class StudySpaceFilters extends React.Component<Props> {
  static propTypes = {
    onChangeQuery: PropTypes.func.isRequired,
    query: PropTypes.string,
    sortType: PropTypes.string.isRequired,
    updateSortType: PropTypes.func.isRequired,
  }

  static defaultProps = {
    query: ``,
  }

  clearQuery = (): void => {
    const { onChangeQuery } = this.props
    onChangeQuery(``)
  }

  sortByName = (): void => {
    const { updateSortType } = this.props
    updateSortType(WORKSPACES_SORT_TYPES.NAME)
  }

  sortByVacancies = (): void => {
    const { updateSortType } = this.props
    updateSortType(WORKSPACES_SORT_TYPES.VACANCIES)
  }

  render(): React.ReactElement {
    const { query, onChangeQuery, sortType } = this.props
    return (
      <View style={styles.container}>
        <SearchInput
          placeholder="Search"
          onChangeQuery={onChangeQuery}
          query={query}
          clear={this.clearQuery}
        />
        <Horizontal style={styles.sortTogglesContainer}>
          <LightButton
            active={sortType === WORKSPACES_SORT_TYPES.NAME}
            onPress={this.sortByName}
            style={styles.sortToggle}
          >
            Name
          </LightButton>
          <LightButton
            active={sortType === WORKSPACES_SORT_TYPES.VACANCIES}
            onPress={this.sortByVacancies}
            style={styles.sortToggle}
          >
            Vacancies
          </LightButton>
        </Horizontal>
      </View>
    )
  }
}

export default StudySpaceFilters
