import React from 'react'
import { StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
  spacer: {
    flex: 1,
  },
})

const Spacer: React.FC = () => <View style={styles.spacer} />

export default Spacer
