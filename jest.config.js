const expoJestPreset = require(`jest-expo/jest-preset`)

module.exports = {
  ...expoJestPreset,
  collectCoverage: true,
  collectCoverageFrom: [
    `**/*.{ts,tsx,js,jsx}`,
    `!**/coverage/**`,
    `!**/node_modules/**`,
    `!**/babel.config.js`,
    `!**/jest.config.js`,
  ],
  setupFiles: [
    ...expoJestPreset.setupFiles,
  ],
  setupFilesAfterEnv: [
    `@testing-library/jest-native/extend-expect`,
    `<rootDir>/jest/setupTests.ts`,
  ],
  testPathIgnorePatterns: [
    `<rootDir>/node_modules/`,
  ],
  transformIgnorePatterns: [
    // eslint-disable-next-line max-len
    `node_modules/(?!(jest-)?react-native(-screens)?|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|@?react-navigation((/.*)|(-.*))?|jest-expo/.*|@unimodules/.*|unimodules(-permissions-interface)?|sentry-expo|react-native-action-button|redux-persist.*|@sentry/.*|expo-secure-store/)`,
  ],
}
