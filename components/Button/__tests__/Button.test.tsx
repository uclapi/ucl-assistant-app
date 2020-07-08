import "react-native"

import React from 'react'
import { cleanup, fireEvent, render } from "react-native-testing-library"

import Button from ".."
import { ButtonText } from '../../Typography'

describe(`Button`, () => {
  beforeEach(() => {
    jest.useRealTimers()
    jest.clearAllMocks()
  })
  afterEach(() => {
    cleanup()
  })
  it(`renders with raw text as child`, () => {
    const wrapper = render(
      <Button>
        Press Me
      </Button>,
    )
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  it(`renders with text element as child`, () => {
    const wrapper = render(
      <Button>
        <ButtonText>Press Me</ButtonText>
      </Button>,
    )
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  it(`renders the loading state`, () => {
    const wrapper = render(
      <Button loading>
        This is a loading button
      </Button>,
    )
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  it(`handles onPress events`, () => {
    const testID = `active-button`
    const onPress = jest.fn()
    const wrapper = render(
      <Button
        testID={testID}
        onPress={onPress}
      >
        Active Button
      </Button>,
    )

    const { getByTestId } = wrapper
    const activeButton = getByTestId(testID)
    fireEvent.press(activeButton)

    expect(onPress).toHaveBeenCalledTimes(1)
    expect(onPress.mock.calls).toMatchSnapshot()
  })

  it(`renders the disabled state`, () => {
    const testID = `disabled-button`
    const onPress = jest.fn()
    const wrapper = render(
      <Button
        disabled
        testID={testID}
        onPress={onPress}
      >
        This is a disabled button
      </Button>,
    )
    expect(wrapper.toJSON()).toMatchSnapshot()

    // const { getByTestId } = wrapper
    // const disabledButton = getByTestId(testID)
    // fireEvent.press(disabledButton)

    // expect(onPress).toMatchSnapshot()
    // expect(onPress).toHaveBeenCalledTimes(0)
  })
})
