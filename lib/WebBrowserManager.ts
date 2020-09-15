import * as WebBrowser from "expo-web-browser"

const openLink = (
  url: string,
): Promise<WebBrowser.WebBrowserResult> => WebBrowser.openBrowserAsync(url)

const { maybeCompleteAuthSession } = WebBrowser

export default {
  maybeCompleteAuthSession,
  openLink,
}
