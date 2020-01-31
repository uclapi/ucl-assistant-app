/* eslint-disable */

module.exports = (api) => {
  api.cache(false)

  const plugins = [
    `@babel/plugin-transform-flow-strip-types`
  ]

  if (process.env.NODE_ENV !== `production`) {
    plugins.push(`babel-plugin-typescript-to-proptypes`)
  }

  return {
    plugins,
    presets: [
      `babel-preset-expo`,
      "@babel/preset-flow"
    ],
  }
}
