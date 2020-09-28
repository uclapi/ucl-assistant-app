import React, { useRef, useCallback } from 'react'
import { View, ViewStyle } from 'react-native'
import {
  WebViewLeaflet,
  WebviewLeafletMessage,
  WebViewLeafletProps,
  AnimationType,
} from '@uclapi/react-native-webview-leaflet'
import { generate } from 'shortid'

// eslint-disable-next-line quotes
interface Props extends Omit<WebViewLeafletProps, "onMessageReceived" | "mapMarkers"> {
  style?: ViewStyle,
  mapMarkers?: {
    position: {
      lat: number,
      lng: number,
    },
    animation?: {
      delay: number,
      duration: number,
      iterationCount: number,
      type: AnimationType,
    },
  }[],
}

const defaultPosition = {
  lat: 51.52411,
  lng: -0.13282,
}

const defaultMarker = {
  animation: {
    delay: 0,
    duration: 0.5,
    iterationCount: 1,
    type: AnimationType.BOUNCE,
  },
  icon: `📌`,
  id: generate(),
  size: [24, 24],
}

const Map: React.FC<Props> = ({
  zoom = 16,
  style,
  mapCenterPosition = defaultPosition,
  mapMarkers,
}) => {
  const onMessageReceived = useCallback((message: WebviewLeafletMessage) => console.log(`Map received: `, message), [])

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
        mapCenterPosition={mapCenterPosition}
        onMessageReceived={onMessageReceived}
        zoom={zoom}
        mapMarkers={mapMarkers.map((marker) => ({
          ...defaultMarker,
          ...marker,
          animation: {
            ...defaultMarker.animation,
            ...marker?.animation,
          },
        }))}
      />
    </View>
  )
}

export default Map
