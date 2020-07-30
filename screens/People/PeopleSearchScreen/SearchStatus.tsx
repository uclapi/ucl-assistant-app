import React from 'react'
import { Image, StyleSheet } from 'react-native'
import { CentredText } from "../../../components/Typography"
import { AssetManager } from "../../../lib"
import Styles from "../../../styles/Containers"
import { Person } from '../../../types/uclapi'

interface Props {
  query: string,
  searchResults: Person[],
}

const styles = StyleSheet.create({
  emptyImage: {
    height: 200,
    marginTop: 25,
  },
})

const SearchStatus: React.FC<Props> = ({ query = ``, searchResults = [] }) => {
  if (query.length === 0) {
    return (
      <>
        <CentredText>Start typing to get search results </CentredText>
        <Image
          source={AssetManager.undraw.peopleSearch}
          resizeMethod="scale"
          style={[Styles.image, styles.emptyImage]}
          resizeMode="contain"
        />
      </>
    )
  }
  if (query.length < 4 && searchResults.length === 0) {
    return <CentredText>Please enter a few more characters </CentredText>
  }
  if (query.length > 0 && searchResults.length === 0) {
    return <CentredText>No results found.</CentredText>
  }
  return null
}

export default SearchStatus
