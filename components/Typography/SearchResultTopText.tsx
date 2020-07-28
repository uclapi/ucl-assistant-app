import React from 'react'
import {
  StyleProp, Text, TextProps, TextStyle,
} from 'react-native'
import Style from "../../styles/Typography"

interface Props extends TextProps {
  style?: StyleProp<TextStyle>,
  children: React.ReactNode | string,
}

const SearchResultTopText: React.FunctionComponent<Props> = ({
  children, style, ...props
}) => (
    <Text style={[Style.searchResultTopText, style]} {...props}>{children}</Text>
)

export default SearchResultTopText
