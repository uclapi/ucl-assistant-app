import { text, withKnobs } from "@storybook/addon-knobs"
import { storiesOf } from "@storybook/react-native"
import React from "react"

import CenterView from "../CenterView"
import { ErrorText } from "."

storiesOf(`Text`, module)
  .addDecorator((getStory) => (<CenterView>{getStory()}</CenterView>))
  .addDecorator(withKnobs)
  .add(`error text`, () => (
    <ErrorText>{text(`content`, `This is an error message`)}</ErrorText>
  ))
