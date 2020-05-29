/* eslint-disable */

module.exports = (api) => {
  api.cache(true)

  const plugins = [
    "dynamic-import-node"
  ]

  return {
    plugins,
    presets: [
      `babel-preset-expo`,
    ],
  }
}
