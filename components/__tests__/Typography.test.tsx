import { render } from '@testing-library/react-native'
import React from "react"
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
    const tree = render(
      <TitleText>Hello World! This is a TitleText component.</TitleText>,
    )
    expect(tree).toMatchSnapshot()
  })

  it(`renders a SubtitleText component`, async () => {
    const tree = render(
      <SubtitleText>Hello World! This is a SubtitleText component.</SubtitleText>,
    )
    expect(tree).toMatchSnapshot()
  })

  it(`renders a BodyText component`, async () => {
    const tree = render(
      <BodyText>Hello World! This is a BodyText component.</BodyText>,
    )
    expect(tree).toMatchSnapshot()
  })
})
