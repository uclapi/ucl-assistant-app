import React from "react";
import PropTypes from "prop-types";
import { WebView } from "react-native";

const Svg = ({ uri, style, scrollEnabled, bounces, pointerEvents }) => {
  const openingHtml = `<html>
    <head>
      <style>
        html, body {
          margin:0;
          padding:0;
          overflow:hidden;
          background-color: transparent;
        }
        img {
          position:inline-block;
          top:0;
          left:0;
          height:100%;
          width:100%;
        }
      </style>
    </head>
  <body>`;
  const closingHtml = "</body></html>";
  return (
    <WebView
      source={{
        html: `${openingHtml}
          <img src="${uri}" />
        ${closingHtml}`,
      }}
      style={style}
      scalesPageToFit
      scrollEnabled={scrollEnabled}
      bounces={bounces}
      dataDetectorTypes="none"
      pointerEvents={pointerEvents}
    />
  );
};

const propTypes = {
  uri: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.shape(), PropTypes.number]),
  scrollEnabled: PropTypes.bool,
  bounces: PropTypes.bool,
  pointerEvents: PropTypes.string,
};
const defaultProps = {
  uri: "",
  style: {},
  scrollEnabled: false,
  bounces: false,
  pointerEvents: "none",
};

Svg.propTypes = propTypes;
Svg.defaultProps = defaultProps;

export default Svg;
