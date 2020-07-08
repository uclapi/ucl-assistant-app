// https://github.com/testing-library/jest-native/issues/25
import '@testing-library/jest-native/extend-expect'

import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock'

jest.mock(`@react-native-community/async-storage`, () => mockAsyncStorage)

// https://github.com/facebook/react-native/issues/11094#issuecomment-263240420
jest.mock(`react-native/Libraries/Animated/src/NativeAnimatedHelper`)
