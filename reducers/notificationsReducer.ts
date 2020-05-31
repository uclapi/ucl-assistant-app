import { actions } from "../constants/notificationsConstants"

export interface NotificationsState {
  registered: boolean,
  stateChangeError: string,
  stateChanging: boolean,
}

export const initialState: NotificationsState = {
  registered: false,
  stateChangeError: ``,
  stateChanging: false,
}

export default (state = initialState, action = null): NotificationsState => {
  const { type, registered, error } = action
  switch (type) {
    case actions.STATE_CHANGING: {
      return {
        ...state,
        stateChangeError: ``,
        stateChanging: true,
      }
    }

    case actions.STATE_CHANGED: {
      return {
        ...state,
        registered,
        stateChanging: false,
      }
    }

    case actions.STATE_CHANGE_ERROR: {
      return {
        ...state,
        stateChangeError: error,
        stateChanging: false,
      }
    }

    default: {
      return state
    }
  }
}
