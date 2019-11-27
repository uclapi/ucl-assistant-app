import * as WebBrowser from "expo-web-browser"

const openLink = (url) => WebBrowser.openBrowserAsync(url)

export default {
  openLink,
}
