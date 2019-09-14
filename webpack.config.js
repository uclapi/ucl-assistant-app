const createExpoWebpackConfigAsync = require(`@expo/webpack-config`)

// Expo CLI will await this method so you can optionally return a promise.
module.exports = async (env, argv) => {
  const config = await createExpoWebpackConfigAsync(env, argv)
  config.resolve.alias[`react-native`] = `react-native-web`
  config.resolve.alias[`react-native-maps`] = `react-native-web-maps`

  // Maybe you want to turn off compression in dev mode.
  if (config.mode === `development`) {
    config.devServer.compress = false
  }

  // Finally return the new config for the CLI to use.
  return config
}
