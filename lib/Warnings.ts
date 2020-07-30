import { YellowBox } from 'react-native'

const ignore = (): void => {
  YellowBox.ignoreWarnings([
    // https://github.com/facebook/react-native/issues/12981
    `Setting a timer`,

    // until Expo updates their Lottie version
    `ReactNative.NativeModules.LottieAnimationView`,
  ])
}

export default {
  ignore,
}
