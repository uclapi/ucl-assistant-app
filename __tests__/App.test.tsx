import "react-native"

import React from "react"
import { render } from "react-native-testing-library"

import App from "../App"

// https://github.com/facebook/react-native/issues/11094#issuecomment-263240420
jest.mock(`react-native/Libraries/Animated/src/NativeAnimatedHelper`)

it(`renders the loading screen`, async () => {
  const tree = render(<App />).toJSON()
  expect(tree).toMatchSnapshot()
})

it(`renders the root without loading screen`, async () => {
  const tree = render(<App skipLoadingScreen />).toJSON()
  expect(tree).toMatchSnapshot()
})
