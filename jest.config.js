/* eslint-disable */

module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{ts,tsx,js,jsx}",
    "!**/coverage/**",
    "!**/node_modules/**",
    "!**/babel.config.js",
    "!**/jest.config.js"
  ],
  preset: `jest-expo`,
  snapshotSerializers: [
    `enzyme-to-json/serializer`,
  ],
  testPathIgnorePatterns: [
    `<rootDir>/node_modules/`,
  ],
  transformIgnorePatterns: [
    `node_modules/(?!(jest-)?react-native|react-native|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|react-navigation|@react-navigation/.*|jest-expo/.*|@unimodules/.*|unimodules-permissions-interface|sentry-expo|native-base|react-native-action-button|redux-persist.*|@sentry/react-native)`,
  ],
}
