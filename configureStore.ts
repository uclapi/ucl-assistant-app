import AsyncStorage from '@react-native-community/async-storage'
import { applyMiddleware, combineReducers, createStore } from "redux"
import { persistReducer, persistStore } from "redux-persist"
import createSecureStore from "redux-persist-expo-securestore"
import thunk from "redux-thunk"

import { SIGN_OUT_USER } from "./constants/userConstants"
import debounce from "./lib/debounce"
import reducer, { initialState } from "./reducers"

const { user, ...otherReducers } = reducer

const secureStorage = createSecureStore()

const middleware = [debounce.middleware(), thunk]

if (process.env.NODE_ENV === `development`) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { logger } = require(`redux-logger`)
  middleware.push(logger)
}

const config = {
  blacklist: [`user`],
  debug: __DEV__,
  key: `root`,
  storage: AsyncStorage,
  timeout: null, // https://github.com/rt2zz/redux-persist/issues/786
}

const userPersistConfig = {
  blacklist: [`signIn`],
  debug: __DEV__,
  key: `user`,
  storage: secureStorage,
  timeout: null,
}

const appReducer = combineReducers({
  user: persistReducer(userPersistConfig, user),
  ...otherReducers,
})

export type AppStateType = ReturnType<typeof appReducer>

const rootReducer = (state, action) => appReducer(
  action.type === SIGN_OUT_USER ? undefined : state, action,
)

const persistRootReducer = persistReducer(config, rootReducer)

const store = createStore(
  persistRootReducer,
  initialState,
  applyMiddleware(...middleware),
)
const persistor = persistStore(store, null, () => {
  store.getState()
})

export default { persistor, store }
