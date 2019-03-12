import { AuthSession } from "expo";
import * as constants from "../constants/userConstants";
import { clearTimetable } from "./timetableActions";
import { ASSISTANT_API_URL } from "../constants/API";
import configureStore from "../configureStore";

const { persistor } = configureStore;

export const isSigningIn = () => ({
  type: constants.IS_SIGNING_IN,
});

export const signInSuccess = result => ({
  type: constants.SIGN_IN_SUCCESS,
  user: {
    token: result.params.token,
    apiToken: result.params.apiToken,
    scopeNumber: parseInt(result.params.scopeNumber, 10),
    email: result.params.email,
    fullName: result.params.full_name,
    givenName: result.params.given_name,
    cn: result.params.cn,
    upi: result.params.upi,
    department: result.params.department,
  },
});

export const signInFailure = error => ({
  type: constants.SIGN_IN_FAILURE,
  error,
});

export const signInCancel = () => ({
  type: constants.SIGN_IN_CANCEL,
});

export const signIn = () => async dispatch => {
  await dispatch(isSigningIn());
  const returnUrl = AuthSession.getRedirectUrl();
  const result = await AuthSession.startAsync({
    authUrl: `${ASSISTANT_API_URL}/connect/uclapi?return=${encodeURIComponent(
      returnUrl,
    )}`,
  });
  if (result.type === "success") {
    return dispatch(signInSuccess(result));
  }
  // login cancelled by user.
  return dispatch(signInCancel());
};

export const signOutUser = () => ({
  type: constants.SIGN_OUT_USER,
});

export const signOut = () => async dispatch => {
  await dispatch(clearTimetable());
  await dispatch(signOutUser());
  await persistor.purge();
  return {};
};
