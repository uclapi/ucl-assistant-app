import { Platform } from "react-native"

const Shadow = (elevation) => (
  Platform.OS === `android`
    ? {
      elevation,
    } : {
      shadowColor: `#000`,
      shadowOffset: {
        height: Math.round(0.6 * elevation),
      },
      shadowOpacity: 0.0015 * elevation + 0.18,
      shadowRadius: 0.54 * elevation,
    }
)

export default Shadow
