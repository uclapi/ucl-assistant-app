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
  splitByWord?: boolean,
}

const Link: React.FC<Props> = ({
  href,
  children,
  containerStyle = {},
  onPress,
  style = {},
  splitByWord = false,
  ...props
}) => {
  const openLink = useCallback((): void => {
    if (href) {
      WebBrowserManager.openLink(href)
    }
  }, [href])

  return splitByWord ? (
    <>
      {
        React.Children.toArray(children)
          .join(` `)
          .split(` `)
          .map((word, index, arr) => (
            <Link
              // eslint-disable-next-line react/no-array-index-key
              key={`word-${word}-${index}`}
              {...{
                ...props,
                children,
                containerStyle,
                href,
                onPress,
                style,
              }}
            >
              {word}
              {index === (arr.length - 1) ? `` : ` `}
            </Link>
          ))
      }
    </>
  ) : (
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
