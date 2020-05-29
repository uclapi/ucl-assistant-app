/**
 * @jest-environment jsdom
 */
import "react-native"

import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'

import { TimetableDetailScreen } from '../TimetableDetailScreen'

describe(`TimetableDetailScreen`, () => {
  const renderer = new ShallowRenderer()

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

  it(`renders the TimetableDetailScreen`, () => {
    renderer.render(<TimetableDetailScreen {...mockProps} />)
    const result = renderer.getRenderOutput()
    expect(result).toMatchSnapshot()
  })
})
