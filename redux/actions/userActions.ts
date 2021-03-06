import * as AuthSession from 'expo-auth-session'
import { Action } from "redux"
import { ThunkAction, ThunkDispatch } from "redux-thunk"
import { Platform } from 'react-native'
import configureStore, { AppStateType } from "../../configureStore"
import { ASSISTANT_API_URL } from "../../constants/API"
import { AnalyticsManager, ErrorManager, LocalisationManager } from "../../lib"
import * as constants from "../constants/userConstants"
import type {
  SignInSuccessAction,
  UserActionTypes,
} from "../constants/userConstants"
import { clearTimetable, fetchTimetable, TimetableDispatch } from "./timetableActions"

const { persistor } = configureStore

export type UserThunkAction = ThunkAction<
  Promise<unknown>,
  AppStateType,
  unknown,
  Action<UserActionTypes>
>

export type UserDispatch = ThunkDispatch<
  AppStateType,
  unknown,
  UserActionTypes
>

export const isSigningIn = (): UserActionTypes => ({
  type: constants.IS_SIGNING_IN,
})

export const signInSuccess = (result): SignInSuccessAction => ({
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

export const signInFailure = (error: Error): UserActionTypes => ({
  error,
  type: constants.SIGN_IN_FAILURE,
})

export const signInCancel = (): UserActionTypes => ({
  type: constants.SIGN_IN_CANCEL,
})

export const signIn = (): UserThunkAction => async (
  dispatch: UserDispatch,
): Promise<void> => {
  dispatch(isSigningIn())
  const returnUrl = `${AuthSession.makeRedirectUri()}${Platform.OS === `ios` ? `/` : ``}redirect`
  const result = await AuthSession.startAsync({
    authUrl: `${ASSISTANT_API_URL}/connect/uclapi?return=${encodeURIComponent(
      returnUrl,
    )}`,
    // specify optional parameter returnUrl to work around bug
    // https://github.com/expo/expo/issues/6679#issuecomment-637032717
    returnUrl,
  })
  if (result.type === `success`) {
    const action = signInSuccess(result)
    dispatch(
      fetchTimetable(
        action.user.token,
        LocalisationManager.getMoment(),
      ),
    )
    AnalyticsManager.setUserId(action.user.upi)
    AnalyticsManager.setUserProperties(action.user)
    ErrorManager.setUser(action.user)
    dispatch(action)
    return null
  }
  // login cancelled by user.
  dispatch(signInCancel())
  return null
}

export const signOutUser = (): UserActionTypes => ({
  type: constants.SIGN_OUT_USER,
})

export const signOut = (): UserThunkAction => async (
  dispatch: (UserDispatch),
): Promise<void> => {
  AnalyticsManager.clearUserProperties()
  await (dispatch as TimetableDispatch)(clearTimetable())
  dispatch(signOutUser())
  persistor.purge()
  return null
}

export const declinePushNotifications = (): UserActionTypes => ({
  type: constants.DECLINE_PUSH_NOTIFICATIONS,
})

export const setExpoPushToken = (pushToken: string): UserActionTypes => ({
  pushToken,
  type: constants.SET_EXPO_PUSH_TOKEN,
})

export const setShouldTrackAnalytics = (
  shouldTrack: boolean,
): UserActionTypes => ({
  shouldTrack,
  type: constants.SET_SHOULD_TRACK_ANALYTICS,
})
