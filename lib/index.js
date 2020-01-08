import AnalyticsManager from './AnalyticsManager'
import ApiManager from './ApiManager'
import AssetManager from './AssetManager'
import debounce from './debounce'
import DeviceManager from './DeviceManager'
import ErrorManager from './ErrorManager'
import LocalisationManager from './LocalisationManager'
import MailManager from './MailManager'
import MapsManager from './MapsManager'
import PushNotificationsManager from './PushNotificationsManager'
import Shadow from './Shadow'
import WebBrowserManager from './WebBrowserManager'

const Random = {
  array: (arr) => arr[Math.floor(Math.random() * arr.length)],
}

export {
  AnalyticsManager,
  ApiManager,
  AssetManager,
  DeviceManager,
  ErrorManager,
  LocalisationManager,
  MailManager,
  MapsManager,
  PushNotificationsManager,
  Random,
  Shadow,
  WebBrowserManager,
  debounce,
}
