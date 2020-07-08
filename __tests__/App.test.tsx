import "react-native"

import React from "react"
import { render } from "react-native-testing-library"

import App from "../App"

jest.mock(`react-redux`, () => ({
  Provider: ({ children }) => children,
  connect: () => (component) => component,
}))

jest.mock(`redux-persist/lib/integration/react`, () => ({
  PersistGate: ({ children }) => children,
}))

jest.mock(`../configureStore`, () => ({
  persistor: jest.fn(),
  store: jest.fn(),
}))

describe(`App`, () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it(`renders the loading screen`, async () => {
    const tree = render(<App />).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it(`renders the root without loading screen`, async () => {
    const tree = render(<App skipLoadingScreen />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
