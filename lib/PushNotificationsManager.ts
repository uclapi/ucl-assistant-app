import axios from "axios"
import Constants from "expo-constants"
import * as Notifications from "expo-notifications"
import * as Permissions from "expo-permissions"

import { ASSISTANT_API_URL } from "../constants/API"
import AnalyticsManager from "./AnalyticsManager"
import ErrorManager from "./ErrorManager"

const registerForPushNotifications = async (token: string): Promise<string> => {
  if (!Constants.isDevice) {
    ErrorManager.addDetail({
      message: `Remote notifications do not work in simulators, `
        + `only on physical devices`,
    })
    return ``
  }

  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS,
  )

  let finalStatus = existingStatus

  // only ask if permissions have not already been determined, because
  // iOS won't necessarily prompt the user a second time.
  if (existingStatus !== `granted`) {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    finalStatus = status
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== `granted`) {
    ErrorManager.addDetail({
      message: `User did not grant push notifications permissions`,
    })
    return ``
  }

  // Get the token that uniquely identifies this device
  const { data: pushToken } = await Notifications.getExpoPushTokenAsync()

  try {
    const resp = await axios.post(
      `${ASSISTANT_API_URL}/notifications/register`,
      { token: pushToken },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    )
    if (resp.data.content === `success` && resp.data.error === ``) {
      ErrorManager.addDetail({
        message: `Successfully registered for push notifications`,
      })
      AnalyticsManager.logEvent(
        AnalyticsManager.events.PUSH_NOTIFICATIONS_REGISTER,
        { token: pushToken },
      )
      AnalyticsManager.setUserProperties({ expoPushToken: pushToken })
    } else {
      throw new Error(
        `Failed to register for notifications: ${JSON.stringify(resp.data)}`,
      )
    }
  } catch (error) {
    ErrorManager.captureError(error, {
      pushToken,
      token,
      url: `${ASSISTANT_API_URL}/notifications/register`,
    })
    throw error
  }
  return pushToken
}

const hasPushNotificationPermissions = async (): Promise<boolean> => {
  let result
  try {
    result = await Permissions.getAsync(Permissions.NOTIFICATIONS)
  } catch (error) {
    ErrorManager.captureError(error)
    throw new Error(`Failed to check if push notifications permissions granted`)
  }
  return result.status === `granted`
}

export default {
  hasPushNotificationPermissions,
  registerForPushNotifications,
}
