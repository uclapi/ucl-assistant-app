/* eslint-disable */

module.exports = (api) => {
  api.cache(true)

  const plugins = []

  return {
    plugins,
    presets: [
      `babel-preset-expo`,
    ],
  }
}
