/**
 * @jest-environment jsdom
 */

import { cleanup, render } from "@testing-library/react-native"
import React from 'react'
import { TimetableDetailScreen } from '../TimetableDetailScreen'

jest.mock(`../TimetableDetailView`, () => (props) => JSON.stringify(props))

describe(`TimetableDetailScreen`, () => {
  let wrapper

  const mockProps = {
    navigation: {
      navigate: jest.fn(),
    },
    route: {
      params: {
        code: `ABC123`,
        date: `2020-01-01`,
        time: `00:00`,
      },
    },
    timetable: {
      "2020-01-01": {
        timetable: [
          {
            contact: `Anne Oldman`,
            end_time: `00:01`,
            location: {
              address: [
                `221C Banana Bread Street`,
              ],
              name: `Waffle House`,
            },
            module: {
              department_name: `Criminology`,
              lecturer: {
                department_id: `CRIM`,
                name: `Jack Cloth`,
              },
              module_id: `ABC123`,
            },
            start_time: `00:00`,
          },
        ],
      },
    },
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })
  afterEach(() => {
    cleanup()
  })

  it(`renders the TimetableDetailScreen`, async () => {
    wrapper = render(<TimetableDetailScreen {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })
})
