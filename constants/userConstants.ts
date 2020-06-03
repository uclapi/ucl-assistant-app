import type { User } from "../reducers/userReducer/userReducer"

export const IS_SIGNING_IN = `IS_SIGNING_IN`
export const SIGN_IN_SUCCESS = `SIGN_IN_SUCCESS`
export const SIGN_IN_FAILURE = `SIGN_IN_FAILURE`
export const SIGN_IN_CANCEL = `SIGN_IN_CANCEL`
export const SIGN_OUT_USER = `SIGN_OUT_USER`
export const DECLINE_PUSH_NOTIFICATIONS = `DECLINE_PUSH_NOTIFICATIONS`
export const SET_EXPO_PUSH_TOKEN = `SET_EXPO_PUSH_TOKEN`
export const SET_SHOULD_TRACK_ANALYTICS = `SET_SHOULD_TRACK_ANALYTICS`

interface IsSigningInAction {
  type: typeof IS_SIGNING_IN,
}

export interface SignInSuccessAction {
  type: typeof SIGN_IN_SUCCESS,
  user: User,
}

interface SignInFailureAction {
  type: typeof SIGN_IN_FAILURE,
  error: Error,
}

interface SignInCancelAction {
  type: typeof SIGN_IN_CANCEL,
}

interface SignOutUserAction {
  type: typeof SIGN_OUT_USER,
}

interface DeclinePushNotificationsAction {
  type: typeof DECLINE_PUSH_NOTIFICATIONS,
}

interface SetExpoPushTokenAction {
  type: typeof SET_EXPO_PUSH_TOKEN,
  pushToken: string,
}

interface SetShouldTrackAnalyticsAction {
  type: typeof SET_SHOULD_TRACK_ANALYTICS,
  shouldTrack: boolean,
}

export type UserActionTypes = (
  IsSigningInAction |
  SignInSuccessAction |
  SignInFailureAction |
  SignInCancelAction |
  SignOutUserAction |
  DeclinePushNotificationsAction |
  SetExpoPushTokenAction |
  SetShouldTrackAnalyticsAction
)
