import { render } from "@testing-library/react-native"
import React from "react"
import "react-native"
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
    const tree = render(<App />)
    expect(tree).toMatchSnapshot()
  })
})
