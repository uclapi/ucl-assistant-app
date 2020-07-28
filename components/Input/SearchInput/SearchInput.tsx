import React from 'react'
import { StyleSheet, TextInput, TextInputProps } from 'react-native'
import { SmallButton } from "../../Button"
import { Horizontal } from "../../Containers"

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    marginRight: 10,
  },
})

interface Props extends TextInputProps {
  query: string,
  clear: () => void,
  onChangeQuery: (s: string) => void,
  placeholder?: string,
}

const SearchInput: React.FunctionComponent<Props> = ({
  query = ``,
  clear = () => { },
  onChangeQuery = () => { },
  placeholder = `Search`,
  ...otherProps
}) => (
    <Horizontal>
      <TextInput
        placeholder={placeholder}
        onChangeText={onChangeQuery}
        value={query}
        clearButtonMode="always"
        style={styles.textInput}
        {...otherProps}
      />
      {query.length > 0 ? (
      <SmallButton onPress={clear}>Clear</SmallButton>
      ) : null}
    </Horizontal>
)

export default SearchInput
