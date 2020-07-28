import { render as rtlRender, RenderResult } from '@testing-library/react-native'
import React from 'react'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import configureStore from 'redux-mock-store'
import thunk from "redux-thunk"
import debounce from "../lib/debounce"
import { initialState as defaultInitialState } from '../reducers'

const middlewares = [
  debounce.middleware,
  thunk,
]
const mockStore = configureStore(middlewares)

const render = (
  ui: React.ReactElement,
  {
    initialState = defaultInitialState,
    store = mockStore(initialState) as Store,
    ...renderOptions
  } = {},
): RenderResult => {
  const Wrapper = ({ children }) => <Provider store={store}>{children}</Provider>
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

// re-export everything
export * from '@testing-library/react-native'
// override render method
export { render }
