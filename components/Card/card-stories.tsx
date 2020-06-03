import { date, text, withKnobs } from "@storybook/addon-knobs"
import { storiesOf } from "@storybook/react-native"
import React from "react"

import CenterView from "../CenterView"
import Card from "."
import TimetableCard from "./TimetableCard"

storiesOf(`Card`, module)
  .addDecorator((getStory) => <CenterView>{getStory()}</CenterView>)
  .addDecorator(withKnobs)
  .add(`with text`, () => (
    <Card title={text(`Title`, `Hello Card`)}>
      {text(`Text`, `This is some card content`)}
    </Card>
  ))
  .add(`timetable specialised`, () => (
    <TimetableCard
      moduleCode={text(`Module Code`, `COMP101P`)}
      startTime={date(`Start Time`, new Date()) as unknown as Date}
      endTime={date(`End Time`, new Date()) as unknown as Date}
      location={text(`Location`, `TBA`)}
      lecturer={text(`Lecturer`, `Unknown Lecturer`)}
    />
  ))
