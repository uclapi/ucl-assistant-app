import React from 'react'
import { Text, TextStyle } from 'react-native'

import Style from "../../styles/Typography"

interface Props {
  style: TextStyle,
  children: React.ReactElement,
}

const SearchResultTopText: React.FunctionComponent<Props> = ({
  children, style,
}) => (
    <Text style={[Style.searchResultTopText, style]}>{children}</Text>
)

export default SearchResultTopText
