import React from 'react'
import {
  StyleSheet, TextProps, TextStyle, View,
  ViewStyle,
} from 'react-native'
import Colors from '../../constants/Colors'
import Shadow from '../../lib/Shadow'
import { ErrorText } from '../Typography'

interface Styles {
  errorMessage: ViewStyle,
  errorText: TextStyle,
}

const styles = StyleSheet.create<Styles>({
  errorMessage: {
    alignContent: `center`,
    backgroundColor: Colors.white,
    borderColor: Colors.black,
    borderTopWidth: StyleSheet.hairlineWidth,
    padding: 10,
    width: `100%`,
    ...Shadow(5),
  },
  errorText: {
    marginLeft: 10,
  },
})

interface Props extends TextProps {
  error: string,
}

const ErrorMessage: React.FC<Props> = ({ error, ...otherProps }) => (
  <View style={styles.errorMessage}>
    <ErrorText style={styles.errorText} {...otherProps}>{error}</ErrorText>
  </View>
)

export default ErrorMessage
