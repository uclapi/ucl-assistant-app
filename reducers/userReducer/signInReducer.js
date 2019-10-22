import {
  IS_SIGNING_IN,
  SIGN_IN_CANCEL,
  SIGN_IN_FAILURE,
  SIGN_IN_SUCCESS,
} from "../../constants/userConstants"

export const initialState = {
  error: ``,
  isSigningIn: false,
}

export default (state = initialState, action = null) => {
  const { type, error } = action
  switch (type) {
    case IS_SIGNING_IN: {
      return { ...state, error: ``, isSigningIn: true }
    }
    case SIGN_IN_SUCCESS: {
      return { ...state, error: ``, isSigningIn: false }
    }
    case SIGN_IN_FAILURE: {
      return { ...state, error, isSigningIn: false }
    }
    case SIGN_IN_CANCEL: {
      return { ...state, error: ``, isSigningIn: false }
    }
    default: {
      return state
    }
  }
}
