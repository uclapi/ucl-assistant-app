import testlingLibraryPreset from '@testing-library/react-native/jest-preset'
import expoJestPreset from 'jest-expo/jest-preset'

export default {
  ...expoJestPreset,
  ...testlingLibraryPreset,
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
    ...testlingLibraryPreset.setupFiles,
  ],
  setupFilesAfterEnv: [`<rootDir>/jest/setupTests.ts`],
  testPathIgnorePatterns: [
    `<rootDir>/node_modules/`,
  ],
  transformIgnorePatterns: [
    ...expoJestPreset.transformIgnorePatterns,
    ...testlingLibraryPreset.transformIgnorePatterns,
    // eslint-disable-next-line max-len
    `node_modules/(?!(jest-)?react-native(-screens)?|react-clone-referenced-element|@react-native-community|expo(nent)?|@expo(nent)?/.*|@?react-navigation((/.*)|(-.*))?|jest-expo/.*|@unimodules/.*|unimodules(-permissions-interface)?|sentry-expo|react-native-action-button|redux-persist.*|@sentry/.*|expo-secure-store/)`,
  ],
}
