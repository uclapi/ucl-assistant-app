import { NavigationContainer } from '@react-navigation/native'
import { render as rtlRender, RenderAPI, act } from '@testing-library/react-native'
import React from 'react'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import configureStore from 'redux-mock-store'
import thunk from "redux-thunk"
import debounce from "../lib/debounce"
import { initialState as defaultInitialState } from '../redux/reducers'

const middlewares = [
  debounce.middleware,
  thunk,
]
const mockStore = configureStore(middlewares)

const render = async (
  ui: React.ReactElement,
  {
    initialState = defaultInitialState,
    store = mockStore(initialState) as Store,
    ...renderOptions
  } = {},
): Promise<RenderAPI> => {
  const Wrapper = ({ children }) => (
    <Provider store={store}>
      <NavigationContainer>
        {children}
      </NavigationContainer>
    </Provider>
  )
  const result = rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
  await act(async () => {})
  return result
}

export const waitForEventLoop = async (): Promise<void> => new Promise((resolve) => {
  const done = () => {
    jest.useFakeTimers()
    resolve()
  }
  jest.useRealTimers()
  setTimeout(done, 0)
})

// re-export everything
export * from '@testing-library/react-native'
// override render method
export { render }
