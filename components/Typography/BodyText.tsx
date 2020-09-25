import React from 'react'
import {
  StyleProp,
  Text,
  TextStyle,
  StyleSheet,
  View,
} from 'react-native'
import { TextProps } from 'react-native-svg'
import { generate } from "shortid"
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
            {el.split(` `).map((word) => (
              <BodyText key={`word-${word}-${generate()}`} {...props}>
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
