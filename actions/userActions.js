import { AuthSession } from "expo"

import configureStore from "../configureStore"
import { ASSISTANT_API_URL } from "../constants/API"
import * as constants from "../constants/userConstants"
import AnalyticsManager from '../lib/AnalyticsManager'
import { clearTimetable } from "./timetableActions"

const { persistor } = configureStore

export const isSigningIn = () => ({
  type: constants.IS_SIGNING_IN,
})

export const signInSuccess = (result) => ({
  type: constants.SIGN_IN_SUCCESS,
  user: {
    apiToken: result.params.apiToken,
    cn: result.params.cn,
    department: result.params.department,
    email: result.params.email,
    fullName: result.params.full_name,
    givenName: result.params.given_name,
    scopeNumber: parseInt(result.params.scopeNumber, 10),
    token: result.params.token,
    upi: result.params.upi,
  },
})

export const signInFailure = (error) => ({
  error,
  type: constants.SIGN_IN_FAILURE,
})

export const signInCancel = () => ({
  type: constants.SIGN_IN_CANCEL,
})

export const signIn = () => async (dispatch) => {
  await dispatch(isSigningIn())
  const returnUrl = AuthSession.getRedirectUrl()
  const result = await AuthSession.startAsync({
    authUrl: `${ASSISTANT_API_URL}/connect/uclapi?return=${encodeURIComponent(
      returnUrl,
    )}`,
  })
  if (result.type === `success`) {
    const action = signInSuccess(result)
    AnalyticsManager.setUserId(action.user.upi)
    AnalyticsManager.setUserProperties(action.user)
    return dispatch(action)
  }
  // login cancelled by user.
  return dispatch(signInCancel())
}

export const signOutUser = () => ({
  type: constants.SIGN_OUT_USER,
})

export const signOut = () => async (dispatch) => {
  AnalyticsManager.clearUserProperties()
  await dispatch(clearTimetable())
  await dispatch(signOutUser())
  await persistor.purge()
  return {}
}

export const declinePushNotifications = () => ({
  type: constants.DECLINE_PUSH_NOTIFICATIONS,
})

export const setExpoPushToken = (pushToken) => ({
  pushToken,
  type: constants.SET_EXPO_PUSH_TOKEN,
})
