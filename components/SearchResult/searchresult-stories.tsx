import { text, withKnobs } from "@storybook/addon-knobs"
import { storiesOf } from "@storybook/react-native"
import React from "react"

import CenterView from "../CenterView"
import SearchResult from "."

storiesOf(`Search Result`, module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .addDecorator(withKnobs)
  .add(`location`, () => (
    <SearchResult
      topText={text(`top text`, `UCL Main Library`)}
      bottomText={text(`bottom text`, `Rather busy`)}
      type="location"
    />
  ))
