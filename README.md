# UCL Assistant

[![Powered by UCL API](https://img.shields.io/badge/Powered%20By-UCL%20API-11b57a%20)](https://uclapi.com)
[![Build Status](https://travis-ci.org/uclapi/ucl-assistant-app.svg?branch=master)](https://travis-ci.org/uclapi/ucl-assistant-app)
[![codecov](https://codecov.io/gh/uclapi/ucl-assistant-app/branch/master/graph/badge.svg)](https://codecov.io/gh/uclapi/ucl-assistant-app)



UCL Assistant is a new and beautiful app to manage your student life at UCL!

<a href='https://apps.apple.com/gb/app/ucl-assistant/id1462767418'><img src='https://raw.githubusercontent.com/Volorf/Badges/master/App%20Store/App%20Store%20Badge.svg?sanitize=true' alt='Get it on the App Store' width='200' /></a>
<a href='https://play.google.com/store/apps/details?id=com.uclapi.uclassistant&utm_source=github&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img alt='Get it on Google Play' src='https://raw.githubusercontent.com/Volorf/Badges/master/Google%20Play/Google%20Play%20Badge.svg?sanitize=true' width='200' /></a>

## Contributing

### Building from source

You'll need the Expo XDE client or the Expo command line client. Get them from
[here](https://expo.io/tools). You'll also need Yarn or NPM installed.

Copy `app.example.json` to `app.json` and add your own Google Maps API key and
either modify or delete the Sentry sourcemap hook. Remember to update the APP_JSON env variable in Travis if you modify `app.json`.

The Google Maps API key is optional but without it you won't be able to use Maps
on Android. You'll want to create an API key on the
[Google APIs console](https://console.developers.google.com/apis/) and then give
the key access to the Google Maps Android API.

Install the necessary dependencies with `npm i`

Then you can start the app with `npm run start`

### Which API server?

Source code for the UCL Assistant API Server is available [here](https://github.com/uclapi/ucl-assistant-api/). It is hosted at [ucl-assistant.uclapi.com](https://ucl-assistant.uclapi.com)

### Saving user data

The app uses [redux-persist](https://github.com/rt2zz/redux-persist) to save the
app state to the device storage. In the future, for extra security, the `user`
reducer will be saved using the `Expo.SecureStore` API.

### Deployment


Expo allows us to update the app seamlessly OTA. To publish the latest version of UCL Assistant over-the-air via Expo:

```
$ npm run publish
```

To build a APK/IPA, which will also publish the current version of UCL Assistant

```
$ npm run build
```

To upload the APK/IPA to the Play/App Store.

```
$ npm run upload
```

When uploading to the Play Store, there should be an `android.json` containing the credentials for the service account in the project root folder. This is the credentials JSON file that can be obtained from the [Google Developers Console](https://console.developers.google.com/project/685091039853/apiui/credential) (see `android.example.json`).

When uploading to the App Store, there should be an `ios.json` containing the credentials for the App Store Connect account (see `ios.example.json`).

#### Manual Deployment

To manually publish:

    expo publish --release-channel production-[VERSION CODE]

`[VERSION CODE]` should follow semantic versioning, e.g. 2.0.0.

Similarly, to create a new app binary (when native code is modified, e.g. for an Expo SDK update)

    expo build:android --release-channel production-[VERSION CODE]
    expo build:ios --release-channel production-[VERSION CODE]

### Travis

When updating `APP_JSON` in Travis, [use this format](https://github.com/travis-ci/travis-ci/issues/7715#issuecomment-362536708): `"$(echo -e '` `{JSON_CONTENT}` `')"` or simply wrap it with single quotes
