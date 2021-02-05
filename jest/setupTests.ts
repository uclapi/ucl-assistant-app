import '@testing-library/jest-native/extend-expect'
// import '@testing-library/react-native/cleanup-after-each'
import 'react-native-gesture-handler/jestSetup'
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock'

jest.mock(`@react-native-async-storage/async-storage`, () => mockAsyncStorage)

// Silence the warning: Animated: `useNativeDriver` is not supported because
// the native animated module is missing
// https://github.com/facebook/react-native/issues/11094#issuecomment-263240420
jest.mock(`react-native/Libraries/Animated/src/NativeAnimatedHelper`)

jest.mock(`redux-persist`, () => {
  const real = jest.requireActual(`redux-persist`)
  return {
    ...real,
    persistReducer: jest
      .fn()
      .mockImplementation((_, reducers) => reducers),
  }
})
