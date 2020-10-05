const {
  exec,
} = require(`child_process`)

const executeCommandWithOutput = (command) => new Promise((resolve, reject) => {
  exec(command, (error, stdout) => {
    if (error) {
      return reject(error)
    }
    // ignore stderr because log lines go there
    return resolve(stdout)
  })
})

const getPublishHistory = async () => {
  const output = await executeCommandWithOutput(`expo publish:history --raw`)
  return JSON.parse(output.replace(/^\[[0-9]{2}:[0-9]{2}:[0-9]{2}\]/, ``).trim())
}

const getLastPublishVersion = async () => {
  const publishHistory = await getPublishHistory()
  const {
    channel,
    publishedTime,
  } = publishHistory.queryResult[0]

  // assume channel always conforms to environment-version format
  const [environment, version] = channel.split(`-`)

  return {
    channel,
    environment,
    publishedTime,
    version,
  }
}

module.exports = {
  getLastPublishVersion,
  getPublishHistory,
}
