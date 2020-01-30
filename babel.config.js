/* eslint-disable */

const plugins = []

if (process.env.NODE_ENV !== `production`) {
  plugins.push(`babel-plugin-typescript-to-proptypes`)
}

module.exports = (api) => {
  api.cache(true)
  return {
    plugins,
    presets: [`babel-preset-expo`],
  }
}
