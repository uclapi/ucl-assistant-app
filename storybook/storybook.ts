/* eslint-disable global-require */
import { configure /* getStorybookUI */ } from "@storybook/react-native"
import React from "react"

import { loadStories } from "./storyLoader"

// import stories
configure(() => {
  loadStories()
}, module)

// This assumes that storybook is running on the same host as your RN packager,
// to set manually use, e.g. host: 'localhost' option
// const StorybookUIRoot = getStorybookUI({ onDeviceUI: true, port: 7007 })

// react-native hot module loader must take in a Class
// https://github.com/facebook/react-native/issues/10991
// https://github.com/storybooks/storybook/issues/2081
// eslint-disable-next-line react/prefer-stateless-function
class StorybookUIHMRRoot extends React.Component {
  render() {
    return null
    // return <StorybookUIRoot />;
  }
}

export default StorybookUIHMRRoot
