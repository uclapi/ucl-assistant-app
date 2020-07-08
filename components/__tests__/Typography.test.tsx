import "react-native"

import React from "react"
import renderer from "react-test-renderer"

import {
  BodyText,
  SubtitleText,
  TitleText,
} from '../Typography'

describe(`Typography`, () => {
  beforeEach(() => {
    jest.useRealTimers()
  })

  it(`renders a TitleText component`, async () => {
    const tree = renderer.create(
      <TitleText>Hello World! This is a TitleText component.</TitleText>,
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it(`renders a SubtitleText component`, async () => {
    const tree = renderer.create(
      <SubtitleText>Hello World! This is a SubtitleText component.</SubtitleText>,
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })

  it(`renders a BodyText component`, async () => {
    const tree = renderer.create(
      <BodyText>Hello World! This is a BodyText component.</BodyText>,
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
