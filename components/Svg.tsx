import React from "react"
import { ViewStyle } from "react-native"
import { WebView, WebViewProps } from "react-native-webview"

type PointerEvents = `box-none` | `none` | `box-only` | `auto`

interface Props extends WebViewProps {
  bounces?: boolean,
  pointerEvents?: PointerEvents,
  scrollEnabled?: boolean,
  style?: ViewStyle,
  uri: string,
}

const Svg: React.FC<Props> = ({
  uri,
  style = {},
  scrollEnabled = false,
  bounces = false,
  pointerEvents = `none`,
  ...props
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
      {...props}
    />
  )
}

export default Svg
