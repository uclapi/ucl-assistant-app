import type { User } from '../../../types/uclapi'
import {
  DECLINE_PUSH_NOTIFICATIONS,
  IS_SIGNING_IN,
  SET_EXPO_PUSH_TOKEN,
  SET_SHOULD_TRACK_ANALYTICS,
  SIGN_IN_CANCEL,
  SIGN_IN_FAILURE,
  SIGN_IN_SUCCESS,
  SIGN_OUT_USER,
} from "../../constants/userConstants"
import signIn, {
  initialState as signInState,
  SignInState,
} from "./signInReducer"

interface Settings {
  shouldTrackAnalytics: boolean,
}

export interface UserState extends User {
  declinePushNotifications: boolean,
  expoPushToken: string,
  settings: Settings,
  signIn: SignInState,
}

export const initialState: UserState = {
  apiToken: ``,
  cn: ``,
  declinePushNotifications: false,
  department: ``,
  email: ``,
  expoPushToken: ``,
  fullName: ``,
  givenName: ``,
  scopeNumber: -1,
  settings: {
    shouldTrackAnalytics: true,
  },
  signIn: signInState,
  token: ``,
  upi: ``,
}

/**
 * Combines user state together into a single state object.
 * @param {The current Redux state} state
 * @param {The dispatched action} action
 * @param {When true, reset user values to the initial values.} clearUser
 */
const combineState = (state, action, clearUser = false) => ({
  ...(clearUser ? initialState : state),
  signIn: signIn(state.signIn, action),
})

export default (state = initialState, action = null): UserState => {
  const { type, user }: { type, user: User, } = action
  switch (type) {
    case IS_SIGNING_IN: {
      return {
        ...combineState(state, action, true),
      }
    }
    case SIGN_IN_SUCCESS: {
      return {
        ...combineState(state, action),
        ...user,
      }
    }
    case SIGN_IN_CANCEL:
    case SIGN_IN_FAILURE: {
      return combineState(state, action)
    }

    case SIGN_OUT_USER: {
      return initialState
    }

    case DECLINE_PUSH_NOTIFICATIONS: {
      return { ...state, declinePushNotifications: true }
    }

    case SET_EXPO_PUSH_TOKEN: {
      const { pushToken } = action
      return { ...state, expoPushToken: pushToken }
    }

    case SET_SHOULD_TRACK_ANALYTICS: {
      const { shouldTrack } = action
      return {
        ...state,
        settings: {
          ...state.settings,
          shouldTrackAnalytics: shouldTrack,
        },
      }
    }

    default: {
      return state
    }
  }
}
