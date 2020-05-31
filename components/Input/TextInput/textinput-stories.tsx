import { text, withKnobs } from "@storybook/addon-knobs"
import { storiesOf } from "@storybook/react-native"
import React from "react"

import CenterView from "../../CenterView"
import TextInput from "."

storiesOf(`Text Input`, module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .addDecorator(withKnobs)
  .add(`with text`, () => (
    <TextInput
      value={text(`value`, `hello world`)}
      placeholder="Enter some text..."
    />
  ))
