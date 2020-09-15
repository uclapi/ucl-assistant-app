import * as Device from 'expo-device'
import * as Network from 'expo-network'
import { Platform } from 'react-native'

const isWeb = Platform.OS === `web`
const isAndroid = Platform.OS === `android`
const isiOS = Platform.OS === `ios`

const isRealDevice = Device.isDevice

const isConnectedToInternet = async (): Promise<boolean> => {
  if (isAndroid) {
    const isAirplaneMode = await Network.isAirplaneModeEnabledAsync()
    if (isAirplaneMode) {
      return false
    }
  } else {
    return false
  }

  const { isInternetReachable } = await Network.getNetworkStateAsync()
  return isInternetReachable
}

export default {
  isAndroid,
  isConnectedToInternet,
  isRealDevice,
  isWeb,
  isiOS,
}
