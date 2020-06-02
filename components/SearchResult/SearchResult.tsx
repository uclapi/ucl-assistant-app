/* eslint react-native/no-inline-styles: 0 */
import React from "react"
import {
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"

import Colors from "../../constants/Colors"
import Styles from "../../styles/Containers"
import { CircularIcon, Horizontal } from "../Containers"
import { SearchResultBottomText, SearchResultTopText } from "../Typography"
import Indicator from "./Indicator"

const getIcon = (type) => {
  switch (type) {
    case `location`:
      return `map-pin`
    case `person`:
      return `user`
    default:
      return `search`
  }
}

interface Props {
  style?: ViewStyle,
  bottomText?: string,
  indicator?: boolean,
  indicatorColor?: string,
  indicatorLoading?: boolean,
  onPress?: () => void,
  topText?: string,
  type?: `location` | `person` | ``,
}

const SearchResult: React.FC<Props> = ({
  style,
  type = ``,
  topText = ``,
  bottomText = ``,
  onPress = () => { },
  indicator = false,
  indicatorColor = Colors.textInputBackground,
  indicatorLoading = false,
}) => (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Horizontal style={StyleSheet.flatten([Styles.resultCard, style])}>
        <CircularIcon name={getIcon(type)} size={24} />
        {indicator && (
          <Indicator color={indicatorColor} loading={indicatorLoading} />
        )}
        <View style={{ flex: 1 }}>
          <SearchResultTopText>{topText}</SearchResultTopText>
          <SearchResultBottomText>{bottomText}</SearchResultBottomText>
        </View>
      </Horizontal>
    </TouchableOpacity>
)

export default SearchResult
