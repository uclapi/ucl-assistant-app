import React from 'react'
import {
  StyleProp, StyleSheet, TextInputProps, ViewStyle,
} from 'react-native'
import { SmallButton } from "../../Button"
import { Horizontal } from "../../Containers"
import TextInput from '../TextInput'

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
  style?: StyleProp<ViewStyle>,
}

const SearchInput: React.FunctionComponent<Props> = ({
  query = ``,
  clear = () => { },
  onChangeQuery = () => { },
  placeholder = `Search`,
  style = {},
  ...otherProps
}) => (
    <Horizontal>
      <TextInput
        {...otherProps}
        placeholder={placeholder}
        onChangeText={onChangeQuery}
        value={query}
        clearButtonMode="always"
        style={[styles.textInput, style]}
      />
      {query.length > 0 ? (
      <SmallButton onPress={clear}>Clear</SmallButton>
      ) : null}
    </Horizontal>
)

export default SearchInput
