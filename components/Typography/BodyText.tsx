import React from 'react'
import {
  StyleProp,
  Text,
  TextStyle,
  StyleSheet,
  View,
} from 'react-native'
import { TextProps } from 'react-native-svg'
import Style from "../../styles/Typography"

const styles = StyleSheet.create({
  container: {
    flexDirection: `row`,
    flexWrap: `wrap`,
  },
})

interface Props extends TextProps {
  style?: StyleProp<TextStyle>,
  children: React.ReactNode,
  splitByWord?: boolean,
}

const BodyText: React.FunctionComponent<Props> = ({
  children,
  style,
  splitByWord = false,
  ...props
}) => (splitByWord ? (
  <View style={styles.container}>
    {
      React.Children.toArray(children)
        .map((el) => ((typeof el === `string`) ? (
          <>
            {el.split(` `).map((word, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <BodyText key={`word-${word}-${index}`} {...props}>
                {word}
                &nbsp;
              </BodyText>
            ))}
          </>
        ) : el))
    }
  </View>
) : (
  <Text style={[Style.bodyText, style]} {...props}>{children}</Text>
))

export default BodyText
