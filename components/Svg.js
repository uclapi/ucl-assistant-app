import PropTypes from "prop-types"
import React from "react"
import { WebView } from "react-native-webview"

const Svg = ({
  uri, style, scrollEnabled, bounces, pointerEvents,
}) => {
  // arbitrarily large width & height that caters to the largest floorplans
  const openingHtml = `<html>
    <head>
      <style>
        html, body {
          width: 2000px;
          height: 2000px;
          margin:0;
          padding:25px;
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
  <body>`
  const closingHtml = `</body></html>`
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
  )
}

const propTypes = {
  bounces: PropTypes.bool,
  pointerEvents: PropTypes.string,
  scrollEnabled: PropTypes.bool,
  style: PropTypes.oneOfType([PropTypes.shape(), PropTypes.number]),
  uri: PropTypes.string,
}
const defaultProps = {
  bounces: false,
  pointerEvents: `none`,
  scrollEnabled: false,
  style: {},
  uri: ``,
}

Svg.propTypes = propTypes
Svg.defaultProps = defaultProps

export default Svg
