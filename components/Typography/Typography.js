/* eslint react/require-default-props: 0 */
/* eslint react/no-unused-prop-types: 0 */
import React from "react";
import PropTypes from "prop-types";
import { Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Horizontal } from "../Containers";
import Style from "../../styles/Typography";
import Colors from "../../constants/Colors";

const propTypes = {
  children: PropTypes.node,
  style: PropTypes.oneOfType([PropTypes.shape(), PropTypes.number]),
};
const defaultProps = {
  children: "",
  style: {},
};

export const TitleText = ({ children, style }) => (
  <Text style={[Style.titleText, style]}>{children}</Text>
);
TitleText.propTypes = propTypes;
TitleText.defaultProps = defaultProps;

export const SubtitleText = ({ children, style }) => (
  <Text style={[Style.subtitleText, style]}>{children}</Text>
);
SubtitleText.propTypes = propTypes;
SubtitleText.defaultProps = defaultProps;

export const BodyText = ({ children, style }) => (
  <Text style={[Style.bodyText, style]}>{children}</Text>
);
BodyText.propTypes = propTypes;
BodyText.defaultProps = defaultProps;

export const CentredText = ({ children, style }) => (
  <Text style={[Style.centredText, style]}>{children}</Text>
);
CentredText.propTypes = propTypes;
CentredText.defaultProps = defaultProps;

export const ButtonText = ({ children, style }) => (
  <Text style={[Style.buttonText, style]}>{children}</Text>
);
ButtonText.propTypes = propTypes;
ButtonText.defaultProps = defaultProps;

export const SmallButtonText = ({ children }) => (
  <Text style={Style.smallButtonText}>{children}</Text>
);
SmallButtonText.propTypes = propTypes;
SmallButtonText.defaultTextProps = defaultProps;

export const CardTitleText = ({ children, style }) => (
  <View>
    <Text style={[Style.cardTitle, style]}>{children}</Text>
    <View style={[Style.cardTitleRect, style]} />
  </View>
);
CardTitleText.propTypes = propTypes;
CardTitleText.defaultProps = defaultProps;

export const ErrorText = ({ children }) => (
  <Horizontal style={Style.infoTextContainer}>
    <Feather size={18} color={Colors.errorColor} name="alert-circle" />
    <Text style={Style.errorText}>{children}</Text>
  </Horizontal>
);
ErrorText.propTypes = propTypes;
ErrorText.defaultProps = defaultProps;

export const WarningText = ({ children, icon }) => (
  <Horizontal style={Style.infoTextContainer}>
    <Feather size={18} color={Colors.warningColor} name={icon} />
    <Text style={Style.warningText}>{children}</Text>
  </Horizontal>
);
WarningText.propTypes = { ...propTypes, icon: PropTypes.string };
WarningText.defaultProps = { ...defaultProps, icon: "info" };

export const InfoText = ({ children, icon }) => (
  <Horizontal style={Style.infoTextContainer}>
    <Feather size={18} color={Colors.infoColor} name={icon} />
    <Text style={Style.infoText}>{children}</Text>
  </Horizontal>
);
InfoText.propTypes = { ...propTypes, icon: PropTypes.string };
InfoText.defaultProps = { ...defaultProps, icon: "info" };

export const SearchResultTopText = ({ children }) => (
  <Text style={Style.searchResultTopText}>{children}</Text>
);
SearchResultTopText.propTypes = propTypes;
SearchResultTopText.defaultTextProps = defaultProps;

export const SearchResultBottomText = ({ children }) => (
  <Text style={Style.searchResultBottomText}>{children}</Text>
);
SearchResultBottomText.propTypes = propTypes;
SearchResultBottomText.defaultTextProps = defaultProps;

export default {};
