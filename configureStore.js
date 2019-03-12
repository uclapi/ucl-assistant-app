import { createStore, applyMiddleware, combineReducers } from "redux";
import { persistStore } from "redux-persist";
import AsyncStorage from "redux-persist/es/storage";
import createSecureStore from "redux-persist-expo-securestore";
import thunk from "redux-thunk";
import persistReducer from "redux-persist/lib/persistReducer";
import debounce from "./lib/debounce";
import reducer, { initialState } from "./reducers";
import { SIGN_OUT_USER } from "./constants/userConstants";

const { user, ...otherReducers } = reducer;

const secureStorage = createSecureStore();

const middleware = [debounce.middleware(), thunk];

if (process.env.NODE_ENV === "development") {
  const { logger } = require("redux-logger");
  middleware.push(logger);
}

const config = {
  key: "root",
  storage: AsyncStorage,
  debug: __DEV__,
  blacklist: ["user"],
  timeout: null, // https://github.com/rt2zz/redux-persist/issues/786
};

const userPersistConfig = {
  key: "user",
  storage: secureStorage,
  debug: __DEV__,
  timeout: null,
  blacklist: ["signIn"],
};

const appReducer = combineReducers({
  user: persistReducer(userPersistConfig, user),
  ...otherReducers,
});

const rootReducer = (state, action) =>
  appReducer(action.type === SIGN_OUT_USER ? undefined : state, action);

const persistRootReducer = persistReducer(config, rootReducer);

const store = createStore(
  persistRootReducer,
  initialState,
  applyMiddleware(...middleware),
);
const persistor = persistStore(store, null, () => {
  store.getState();
});

export default { persistor, store };
