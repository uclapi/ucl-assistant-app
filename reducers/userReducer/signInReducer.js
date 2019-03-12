import {
  IS_SIGNING_IN,
  SIGN_IN_SUCCESS,
  SIGN_IN_FAILURE,
  SIGN_IN_CANCEL,
} from "../../constants/userConstants";

export const initialState = {
  isSigningIn: false,
  error: "",
};

export default (state = initialState, action = null) => {
  const { type, error } = action;
  switch (type) {
    case IS_SIGNING_IN: {
      return { ...state, isSigningIn: true, error: "" };
    }
    case SIGN_IN_SUCCESS: {
      return { ...state, isSigningIn: false, error: "" };
    }
    case SIGN_IN_FAILURE: {
      return { ...state, isSigningIn: false, error };
    }
    case SIGN_IN_CANCEL: {
      return { ...state, isSigningIn: false, error: "" };
    }
    default: {
      return state;
    }
  }
};
