/* eslint-disable */

module.exports = (api) => {
  api.cache(true)

  const plugins = []

  const presets = [
    `babel-preset-expo`,
  ]

  return {
    plugins,
    presets,
    env: {
      test: {
        presets,
        plugins: [
          ...plugins,
          "dynamic-import-node"
        ]
      }
    }
  }
}
