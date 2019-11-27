/**
 * @jest-environment jsdom
 */
import "react-native"

import Enzyme, { shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import MockDate from 'mockdate'
import React from 'react'

import { LocalisationManager } from '../../../../lib'
import LastUpdated from
  "../../../../screens/StudySpacesScreen/components/LastUpdated"

Enzyme.configure({ adapter: new Adapter() })

describe(`LastUpdated`, () => {
  MockDate.set(new Date(`2019-11-18T08:47:21`))

  it(`renders the LastUpdated component`, () => {
    const mockProps = {
      lastModified: LocalisationManager.getMoment().subtract(10, `minutes`),
    }
    const wrapper = shallow(<LastUpdated {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  it(`renders the LastUpdated component loading`, () => {
    const mockProps = {
      lastModified: `${LocalisationManager.parseToDate()}`,
    }
    const wrapper = shallow(<LastUpdated {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  it(`shows error when studyspace info is stale`, async () => {
    const mockProps = {
      lastModified: LocalisationManager
        .getMoment()
        .subtract(10, `hours`),
    }
    const wrapper = shallow(<LastUpdated {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })
})
