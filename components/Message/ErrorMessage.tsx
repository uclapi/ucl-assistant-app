import React from 'react'
import { StyleSheet, View } from 'react-native'

import Colors from '../../constants/Colors'
import Shadow from '../../lib/Shadow'
import { ErrorText } from '../Typography'

const styles = StyleSheet.create({
  errorMessage: {
    alignContent: `center`,
    backgroundColor: Colors.white,
    borderColor: Colors.black,
    borderTopWidth: StyleSheet.hairlineWidth,
    padding: 10,
    width: `100%`,
    ...Shadow(5),
  },
})

const ErrorMessage = ({ error }) => (
  <View style={styles.errorMessage}>
    <ErrorText>{error}</ErrorText>
  </View>
)

export default ErrorMessage
