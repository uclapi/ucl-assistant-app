import 'webdriverio'

describe(`App`, () => {
  it(`should display login screen on start`, async () => {
    (await $(`~login-button`)).waitForDisplayed({ timeout: 10000 })
    browser.saveScreenshot(`./screenshot.png`)
  })
})
