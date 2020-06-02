import * as WebBrowser from "expo-web-browser"

const openLink = (
  url: string,
): Promise<void> => WebBrowser.openBrowserAsync(url)

export default {
  openLink,
}
