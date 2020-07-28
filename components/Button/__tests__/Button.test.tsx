import { cleanup, fireEvent, render } from "@testing-library/react-native"
import React from 'react'
import "react-native"
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
    expect(wrapper).toMatchSnapshot()
  })

  it(`renders with text element as child`, () => {
    const wrapper = render(
      <Button>
        <ButtonText>Press Me</ButtonText>
      </Button>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it(`renders the loading state`, () => {
    const wrapper = render(
      <Button loading>
        This is a loading button
      </Button>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it(`handles onPress events`, () => {
    const onPress = jest.fn()
    const wrapper = render(
      <Button
        onPress={onPress}
      >
        Active Button
      </Button>,
    )

    const { getByText } = wrapper
    const activeButton = getByText(/Active Button/i)
    fireEvent.press(activeButton)

    expect(onPress).toHaveBeenCalledTimes(1)
    expect(onPress.mock.calls).toMatchSnapshot()
  })

  it(`renders the disabled state`, () => {
    const onPress = jest.fn()
    const wrapper = render(
      <Button
        disabled
        onPress={onPress}
      >
        This is a disabled button
      </Button>,
    )
    expect(wrapper).toMatchSnapshot()

    const { getByText } = wrapper
    const disabledButton = getByText(/disabled button/i)
    fireEvent.press(disabledButton)

    expect(onPress).toMatchSnapshot()
    expect(onPress).toHaveBeenCalledTimes(0)
  })
})
