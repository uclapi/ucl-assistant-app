import React from 'react'
import { fireEvent, render } from '../../../../jest/test-utils'
import MailManager from "../../../../lib/MailManager"
import { PersonDetailScreen } from '../PersonDetailScreen'

MailManager.composeAsync = jest.fn()

describe(`PersonDetailScreen`, () => {
  const props = {
    department: `City of Town PD`,
    email: `j.cloth@city.town.uk`,
    error: ``,
    fetchPerson: jest.fn(),
    isFetching: false,
    name: `Jack Cloth`,
    status: `Detective Inspector`,
    token: `supersecure`,
  }
  const setup = () => render(<PersonDetailScreen {...props} />)

  beforeAll(() => {
    jest.useFakeTimers()
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it(`renders fine`, () => {
    const wrapper = setup()
    const { getByText } = wrapper
    expect(props.fetchPerson).toBeCalledTimes(1)
    expect(getByText(new RegExp(props.department, `i`))).toBeTruthy()
    expect(getByText(new RegExp(props.name, `i`))).toBeTruthy()
    expect(getByText(new RegExp(props.status, `i`))).toBeTruthy()
    expect(getByText(new RegExp(props.email, `i`))).toBeTruthy()
    expect(wrapper).toMatchSnapshot()
  })

  it(`sends email`, () => {
    const { getByText } = setup()
    const button = getByText(/send email/i)
    fireEvent.press(button)

    expect(MailManager.composeAsync).toBeCalledTimes(1)
    expect(MailManager.composeAsync).toBeCalledWith({ recipients: [props.email] })
  })
})
