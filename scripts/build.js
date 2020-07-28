const {
  spawn,
} = require(`child_process`)

const inquirer = require(`inquirer`)
const Expo = require(`./expo`)

const run = async () => {
  console.log(`This will build the current version of UCL Assistant`)

  const {
    channel: lastChannel,
    version: lastVersion,
    publishedTime: lastPublishedTime,
  } = await Expo.getLastPublishVersion()

  console.log(`Last published to release channel ${lastChannel} at ${lastPublishedTime}`)

  const questions = [{
    choices: [`android`, `ios`],
    message: `Build for which platform?`,
    name: `platform`,
    type: `list`,
  }, {
    choices: [`development`, `staging`, `production`],
    default: `production`,
    message: `Build for which environment?`,
    name: `environment`,
    type: `list`,
  }, {
    default: lastVersion,
    message: `What version is this build?`,
    name: `version`,
    type: `input`,
  }, {
    default: true,
    message: `Publish JS code (no need if you've already done this before)`,
    name: `shouldPublish`,
    type: `confirm`,
  }]

  const {
    platform,
    environment,
    version,
    shouldPublish,
  } = await inquirer.prompt(questions)

  const options = []
  if (platform === `android`) {
    const {
      androidType,
    } = await inquirer.prompt([{
      choices: [`apk`, `app-bundle`],
      default: `app-bundle`,
      message: `Build an APK or AAB?`,
      name: `androidType`,
      type: `list`,
    }])
    options.push(`-t ${androidType}`)
  }
  if (!shouldPublish) {
    options.push(`--no-publish`)
  }

  const expoCommand = `node node_modules/.bin/expo build:${platform} ${
    options.join(` `)
  } --release-channel=${environment}-${version}`

  const confirmationQuestion = [{

    default: false,

    message: `The following command will now be run: ${expoCommand}`,
    // eslint-disable-next-line no-secrets/no-secrets
    name: `publishCommandCorrect`,
    type: `confirm`,
  }]

  const {
    publishCommandCorrect,
  } = await inquirer.prompt(confirmationQuestion)

  if (!publishCommandCorrect) {
    return console.error(`Wrong command => stopped`)
  }

  const [command, ...args] = expoCommand.split(` `)
  return spawn(command, args, {
    stdio: `inherit`,
  })
}

run()
