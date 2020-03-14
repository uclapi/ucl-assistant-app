import * as Device from 'expo-device'
import * as Network from 'expo-network'

const isRealDevice = (): boolean => Device.isRealDevice

const isConnectedToInternet = async (): Promise<boolean> => {
  const isAirplaneMode = await Network.isAirplaneModeEnabledAsync()
  if (isAirplaneMode) {
    return false
  }
  const {
    isInternetReachable,
  } = await Network.getNetworkStateAsync()

  return (isInternetReachable)
}

export default {
  isConnectedToInternet,
  isRealDevice,
}
