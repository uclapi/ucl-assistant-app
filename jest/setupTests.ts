// https://github.com/testing-library/jest-native/issues/25
// import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock'
import '@testing-library/jest-native/extend-expect'
import '@testing-library/react-native/cleanup-after-each'
import 'react-native-gesture-handler/jestSetup'

// jest.mock(`@react-native-community/async-storage`, () => mockAsyncStorage)

// Silence the warning: Animated: `useNativeDriver` is not supported because
// the native animated module is missing
// https://github.com/facebook/react-native/issues/11094#issuecomment-263240420
jest.mock(`react-native/Libraries/Animated/src/NativeAnimatedHelper`)
