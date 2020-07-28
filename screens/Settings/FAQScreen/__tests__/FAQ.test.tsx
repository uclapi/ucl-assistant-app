import { fireEvent, render } from '@testing-library/react-native'
import React from 'react'
import { waitForEventLoop } from '../../../../jest/test-utils'
import FAQ from '../FAQ'

describe(`FAQ`, () => {
  const props = {
    answer: `Still a bit stiff`,
    question: `How's the hand?`,
  }

  const setup = () => render(<FAQ {...props} />)

  beforeAll(() => {
    jest.useFakeTimers()
  })

  it(`renders with Q and A`, () => {
    const wrapper = setup()
    expect(wrapper).toMatchSnapshot()
  })

  it(`expands and compresses`, async () => {
    const wrapper = setup()
    const { getByText, queryByText } = wrapper
    const qn = getByText(props.question)

    fireEvent.press(qn)
    expect(wrapper).toMatchSnapshot()

    fireEvent.press(qn)
    await waitForEventLoop()

    expect(queryByText(props.answer)).toBeFalsy()
    expect(wrapper).toMatchSnapshot()
  })
})
