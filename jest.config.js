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
  projects: [
    { "preset": "jest-expo/ios" },
    { "preset": "jest-expo/android" }
  ],
  testPathIgnorePatterns: [
    `<rootDir>/node_modules/`,
  ],
  transformIgnorePatterns: [
    `node_modules/(?!(jest-)?react-native(-screens)?|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|@?react-navigation((/.*)|(-.*))?|jest-expo/.*|@unimodules/.*|unimodules-permissions-interface|sentry-expo|react-native-action-button|redux-persist.*|@sentry/react-native|expo-secure-store)`,
  ],
}
