import * as Device from 'expo-device'
import * as Network from 'expo-network'
import { Platform } from 'react-native'

const isRealDevice = (): boolean => Device.isDevice

const isConnectedToInternet = async (): Promise<boolean> => {
  switch (Platform.OS) {
    case `android`: {
      const isAirplaneMode = await Network.isAirplaneModeEnabledAsync()
      if (isAirplaneMode) {
        return false
      }
      break
    }

    case `ios`: {
      break
    }

    default:
      return false
  }

  const { isInternetReachable } = await Network.getNetworkStateAsync()
  return isInternetReachable
}

export default {
  isConnectedToInternet,
  isRealDevice,
}
