import AnalyticsManager from './AnalyticsManager'
import ApiManager from './ApiManager'
import AssetManager from './AssetManager'
import ClipboardManager from './ClipboardManager'
import debounce from './debounce'
import DeviceManager from './DeviceManager'
import ErrorManager from './ErrorManager'
import LocalisationManager from './LocalisationManager'
import MailManager from './MailManager'
import MapsManager from './MapsManager'
import PushNotificationsManager from './PushNotificationsManager'
import Shadow from './Shadow'
import Warnings from './Warnings'
import WebBrowserManager from './WebBrowserManager'

const Random = {
  array: (arr: Array<any>): Array<any> => arr[Math.floor(Math.random() * arr.length)],
}

export {
  AnalyticsManager,
  ApiManager,
  AssetManager,
  ClipboardManager,
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
  Warnings,
}
