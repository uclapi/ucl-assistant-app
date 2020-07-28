import React, { useCallback } from "react"
import {
  StyleProp, StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewProps,
  ViewStyle,
} from "react-native"
import Colors from "../../constants/Colors"
import WebBrowserManager from "../../lib/WebBrowserManager"
import Style from "../../styles/Typography"

const styles = StyleSheet.create({
  linkText: {
    color: Colors.linkBlue,
  },
})

interface Props extends ViewProps {
  children: React.ReactNode | string,
  containerStyle?: StyleProp<ViewStyle>,
  href?: string,
  onPress?: () => void,
  style?: StyleProp<TextStyle>,
}

const Link: React.FC<Props> = ({
  href,
  children,
  containerStyle = {},
  onPress,
  style = {},
  ...props
}) => {
  const openLink = useCallback((): void => {
    if (href) {
      WebBrowserManager.openLink(href)
    }
  }, [href])

  return (
    <TouchableOpacity
      onPress={onPress || openLink}
      style={containerStyle}
    >
      <Text style={[Style.bodyText, styles.linkText, style]} {...props}>
        {children}
      </Text>
    </TouchableOpacity>

  )
}

export default Link
