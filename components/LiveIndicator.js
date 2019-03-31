import React from "react";
import PropTypes from "prop-types";
import { ViewPropTypes } from "react-native";
import { LinearGradient } from "expo";
import { BodyText } from "./Typography";
import Colors from "../constants/Colors";
import Style from "../styles/Containers";

const LiveIndicator = ({ children, style }) => (
  <LinearGradient
    colors={[Colors.errorColor, Colors.indicatorOrange]}
    start={[0, 1]}
    end={[1, 0]}
    style={[Style.liveIndicator, style]}
  >
    <BodyText style={{ color: Colors.pageBackground }}>{children}</BodyText>
  </LinearGradient>
);

LiveIndicator.propTypes = {
  children: PropTypes.string,
  style: ViewPropTypes.style,
};

LiveIndicator.defaultProps = {
  children: "LIVE",
  style: {},
};

export default LiveIndicator;
