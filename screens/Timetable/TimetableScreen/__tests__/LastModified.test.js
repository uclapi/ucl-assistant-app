/**
 * @jest-environment jsdom
 */
import "react-native"

import MockDate from 'mockdate'
import React from 'react'
import { cleanup, render } from "react-native-testing-library"

import { LocalisationManager } from '../../../../lib'
import LastModified from
  "../components/LastModified"

describe(`LastUpdated`, () => {
  MockDate.set(`2019-11-18T08:47:21.000Z`)

  afterEach(() => {
    cleanup()
  })

  it(`renders the LastModified component`, () => {
    const mockProps = {
      lastModified: LocalisationManager.getMoment().subtract(11, `hours`),
    }
    const wrapper = render(<LastModified {...mockProps} />)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  it(`does not render if date is missing`, () => {
    const mockProps = {
      lastModified: undefined,
    }
    const wrapper = render(<LastModified {...mockProps} />)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  it(`shows error when studyspace info is stale`, async () => {
    const mockProps = {
      lastModified: LocalisationManager
        .getMoment()
        .subtract(25, `hours`),
    }
    const wrapper = render(<LastModified {...mockProps} isLoading={false} />)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })

  it(`does not show error when data is more recent than date`, async () => {
    const mockDate = `2019-09-08`
    const mockProps = {
      date: mockDate,
      lastModified: LocalisationManager
        .parseToMoment(mockDate)
        .add(24, `hours`),
    }
    const wrapper = render(<LastModified {...mockProps} isLoading={false} />)
    expect(wrapper.toJSON()).toMatchSnapshot()
  })
})
