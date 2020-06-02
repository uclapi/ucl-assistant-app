import { Platform, StyleSheet, ViewStyle } from "react-native"

const Shadow = (elevation: number): ViewStyle => {
  const styles = StyleSheet.create({
    shadowStyle: Platform.OS === `android`
      ? {
        elevation,
      } : {
        shadowColor: `#000`,
        shadowOffset: {
          height: Math.round(0.6 * elevation),
          width: 0,
        },
        shadowOpacity: 0.0015 * elevation + 0.18,
        shadowRadius: 0.54 * elevation,
      },
  })
  return styles.shadowStyle
}

export default Shadow
