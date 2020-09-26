import React, { useRef, useCallback } from 'react'
import { View, ViewStyle } from 'react-native'
import {
  WebViewLeaflet,
  WebviewLeafletMessage,
  WebViewLeafletProps,
  WebViewLeafletEvents,
} from '@uclapi/react-native-webview-leaflet'

interface Props extends WebViewLeafletProps {
  style?: ViewStyle,
}

const Map: React.FC<Props> = ({
  zoom = 7,
  style,
}) => {
  const onMessageReceived = useCallback((message: WebviewLeafletMessage) => {
    switch (message.event) {
      default:
        console.log(`Map received: `, message)
    }
  }, [])

  const map = useRef(null)

  return (
    <View style={style}>
      <WebViewLeaflet
        ref={map}
        mapLayers={[
          {
            baseLayer: true,
            baseLayerIsChecked: true,
            baseLayerName: `OpenStreetMap`,
            url: `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,
          },
        ]}
        onMessageReceived={onMessageReceived}
        zoom={zoom}
      />
    </View>
  )
}

export default Map
