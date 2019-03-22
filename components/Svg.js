import React from "react";
import PropTypes from "prop-types";
import { WebView } from "react-native";

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

const Svg = ({ uri, style }) => (
  <WebView
    source={{
      html: `${openingHtml}
        <img src="${uri}" />
      ${closingHtml}`,
    }}
    style={style}
    scalesPageToFit
    scrollEnabled={false}
    bounces={false}
    dataDetectorTypes="none"
    pointerEvents="none"
  />
);

const propTypes = {
  uri: PropTypes.string,
  style: PropTypes.oneOfType([PropTypes.shape(), PropTypes.number]),
};
const defaultProps = {
  uri: "",
  style: {},
};

Svg.propTypes = propTypes;
Svg.defaultProps = defaultProps;

export default Svg;
