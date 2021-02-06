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
    type: `list`,
    name: `platform`,
    message: `Build for which platform?`,
    choices: [`android`, `ios`],
  }, {
    type: `list`,
    name: `environment`,
    message: `Build for which environment?`,
    choices: [`development`, `staging`, `production`],
    default: `production`,
  }, {
    type: `input`,
    name: `version`,
    message: `What version is this build?`,
    default: lastVersion,
  }, {
    type: `confirm`,
    name: `shouldPublish`,
    message: `Publish JS code (no need if you've already done this before)`,
    default: true,
  }]

  const {
    platform,
    environment,
    version,
    shouldPublish,
  } = await inquirer.prompt(questions)

  const options = []
  if (platform === `android`) {
    const { buildType } = await inquirer.prompt([{
      type: `list`,
      name: `buildType`,
      message: `Build what?`,
      choices: [`app-bundle (aab)`, `apk`],
      default: `aab`
    }])
    if (buildType === `aab`) {
      options.push(`-t app-bundle`)
    }
    if (buildType === `apk`) {
      options.push(`-t apk`)
    }
  }
  if (!shouldPublish) {
    options.push(`--no-publish`)
  }

  const expoCommand = `node node_modules/.bin/expo build:${platform} ${options.join(` `)
    } --release-channel=${environment}-${version}`

  const confirmationQuestion = [{
    type: `confirm`,
    name: `publishCommandCorrect`,
    message: `The following command will now be run: ${expoCommand}`,
    default: false,
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
