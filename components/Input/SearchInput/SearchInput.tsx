import React from 'react'
import { StyleSheet } from 'react-native'

import { SmallButton } from "../../Button"
import { Horizontal } from "../../Containers"
import TextInput from "../TextInput"

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    marginRight: 10,
  },
})

interface Props {
  query: string,
  clear: () => void,
  onChangeQuery: () => void,
  placeholder?: string,
}

const SearchInput: React.FunctionComponent<Props> = ({
  query = ``,
  clear = () => { },
  onChangeQuery = () => { },
  placeholder = `Search`,
}) => (
    <Horizontal>
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeQuery}
        value={query}
        clearButtonMode="always"
        style={styles.textInput}
      />
      {query.length > 0 ? (
        <SmallButton onPress={clear}>Clear</SmallButton>
      ) : null}
    </Horizontal>
)

export default SearchInput
