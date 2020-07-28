import '@testing-library/jest-native/extend-expect'
import '@testing-library/react-native/cleanup-after-each'
import 'react-native-gesture-handler/jestSetup'

// Silence the warning: Animated: `useNativeDriver` is not supported because
// the native animated module is missing
// https://github.com/facebook/react-native/issues/11094#issuecomment-263240420
jest.mock(`react-native/Libraries/Animated/src/NativeAnimatedHelper`)
