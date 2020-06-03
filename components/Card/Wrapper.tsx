import React from 'react'
import {
  GestureResponderEvent,
  Platform,
  TouchableNativeFeedback,
  TouchableOpacity,
} from "react-native"

interface Props {
  children: React.ReactNode,
  onPress: (e: GestureResponderEvent) => void,
}

const Wrapper: React.FC<Props> = ({
  children,
  onPress = () => { },
}) => (
  Platform.OS === `android`
    ? (
        <TouchableNativeFeedback onPress={onPress}>
          {children}
        </TouchableNativeFeedback>
    ) : (
        <TouchableOpacity onPress={onPress}>{children}</TouchableOpacity>
    )
)

export default Wrapper
