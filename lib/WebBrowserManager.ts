import * as WebBrowser from "expo-web-browser"

const openLink = (
  url: string,
): Promise<WebBrowser.WebBrowserResult> => WebBrowser.openBrowserAsync(url)

const warmUpAsync = () => WebBrowser.warmUpAsync()
const coolDownAsync = () => WebBrowser.coolDownAsync()

export default {
  coolDownAsync,
  openLink,
  warmUpAsync,
}
