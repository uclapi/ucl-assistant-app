import { Feather } from "@expo/vector-icons"
import PropTypes from "prop-types"
import React from "react"
import {
  Text, View, ViewPropTypes,
} from "react-native"

import Colors from "../../constants/Colors"
import Style from "../../styles/Typography"
import { Horizontal } from "../Containers"

const propTypes = {
  children: PropTypes.node,
  style: Text.propTypes.style,
}
const defaultProps = {
  children: ``,
  style: {},
}

export const TitleText = ({ children, style }) => (
  <Text style={[Style.titleText, style]}>{children}</Text>
)
TitleText.propTypes = propTypes
TitleText.defaultProps = defaultProps

export const SubtitleText = ({ children, style }) => (
  <Text style={[Style.subtitleText, style]}>{children}</Text>
)
SubtitleText.propTypes = propTypes
SubtitleText.defaultProps = defaultProps

export const BodyText = ({ children, style }) => (
  <Text style={[Style.bodyText, style]}>{children}</Text>
)
BodyText.propTypes = propTypes
BodyText.defaultProps = defaultProps

export const CentredText = ({ children, style }) => (
  <Text style={[Style.centredText, style]}>{children}</Text>
)
CentredText.propTypes = propTypes
CentredText.defaultProps = defaultProps

export const ButtonText = ({ children, style }) => (
  <Text style={[Style.buttonText, style]}>{children}</Text>
)
ButtonText.propTypes = propTypes
ButtonText.defaultProps = defaultProps

export const SmallButtonText = ({ children, style }) => (
  <Text style={[Style.smallButtonText, style]}>{children}</Text>
)
SmallButtonText.propTypes = propTypes
SmallButtonText.defaultProps = defaultProps

export const CardTitleText = ({ children, style }) => (
  <View>
    <Text style={[Style.cardTitle, style]}>{children}</Text>
    <View style={[Style.cardTitleRect, style]} />
  </View>
)
CardTitleText.propTypes = propTypes
CardTitleText.defaultProps = defaultProps

export const ErrorText = ({ children, style, containerStyle }) => (
  <Horizontal style={[Style.infoTextContainer, containerStyle]}>
    <Feather size={18} color={Colors.errorColor} name="alert-circle" />
    <Text style={[Style.errorText, style]}>{children}</Text>
  </Horizontal>
)
ErrorText.propTypes = { ...propTypes, containerStyle: ViewPropTypes.style }
ErrorText.defaultProps = { ...defaultProps, containerStyle: {} }

export const WarningText = ({ children, icon, style }) => (
  <Horizontal style={Style.infoTextContainer}>
    <Feather size={18} color={Colors.warningColor} name={icon} />
    <Text style={[Style.warningText, style]}>{children}</Text>
  </Horizontal>
)
WarningText.propTypes = { ...propTypes, icon: PropTypes.string }
WarningText.defaultProps = { ...defaultProps, icon: `info` }

export const InfoText = ({
  children, icon, style, containerStyle,
}) => (
    <Horizontal style={[Style.infoTextContainer, containerStyle]}>
      <Feather size={18} color={Colors.infoColor} name={icon} />
      <Text style={[Style.infoText, style]}>{children}</Text>
    </Horizontal>
)
InfoText.propTypes = { ...propTypes, containerStyle: ViewPropTypes.style, icon: PropTypes.string }
InfoText.defaultProps = { ...defaultProps, containerStyle: {}, icon: `info` }

export const SearchResultTopText = ({ children, style }) => (
  <Text style={[Style.searchResultTopText, style]}>{children}</Text>
)
SearchResultTopText.propTypes = propTypes
SearchResultTopText.defaultProps = defaultProps

export const SearchResultBottomText = ({ children, style }) => (
  <Text style={[Style.searchResultBottomText, style]}>{children}</Text>
)
SearchResultBottomText.propTypes = propTypes
SearchResultBottomText.defaultProps = defaultProps

export default {}
