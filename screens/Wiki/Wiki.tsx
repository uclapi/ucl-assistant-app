import React, { useCallback, useEffect } from 'react'
import { View, StyleSheet } from 'react-native'
import WebBrowserManager from '../../lib/WebBrowserManager'
import Button from '../../components/Button'

const styles = StyleSheet.create({
  container: {
    alignItems: `center`,
    display: `flex`,
    flex: 1,
    justifyContent: `center`,
  },
})

const Wiki: React.FC = () => {
  const openWiki = useCallback(
    () => WebBrowserManager.openLink(
      `https://github.com/uclapi/wiki/blob/master/COVID-19.md`,
    ),
    [],
  )

  useEffect(() => { openWiki() }, [openWiki])

  return (
    <View style={styles.container}>
      <Button onPress={openWiki}>Open Wiki</Button>
    </View>
  )
}

export default Wiki
