/**
 * @jest-environment jsdom
 */
import "react-native"

import MockDate from 'mockdate'
import React from 'react'
import { cleanup, render } from "react-native-testing-library"

import { LocalisationManager } from '../../../../lib'
import LastUpdated from "../LastUpdated"

describe(`LastUpdated`, () => {
  MockDate.set(`2019-11-18T08:47:21.000Z`)

  beforeEach(() => {
    jest.useRealTimers()
  })

  afterEach(() => {
    cleanup()
  })

  it(`renders the LastUpdated component`, () => {
    const mockProps = {
      lastModified: LocalisationManager.getMoment().subtract(4, `minutes`),
    }
    const wrapper = render(<LastUpdated {...mockProps} />)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  it(`renders the LastUpdated component loading`, () => {
    const mockProps = {
      lastModified: `${LocalisationManager.getMoment()}`,
    }
    const wrapper = render(<LastUpdated {...mockProps} />)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  it(`shows error when studyspace info is stale`, async () => {
    const mockProps = {
      lastModified: LocalisationManager
        .getMoment()
        .subtract(6, `minutes`),
    }
    const wrapper = render(<LastUpdated {...mockProps} />)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })
})
