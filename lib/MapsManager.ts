import * as Linking from 'expo-linking'

const navigateToCoords = ({ lat, lng }): void => {
  const url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`
  Linking.openURL(url)
}

const navigateToAddress = (address: string): void => {
  const url = `https://www.google.com/maps/search/?api=1&query=${address}`
  Linking.openURL(url)
}

export default {
  navigateToAddress,
  navigateToCoords,
}
