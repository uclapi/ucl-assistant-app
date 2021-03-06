import { RouteProp } from '@react-navigation/native'
import React from 'react'
import { QueryClient, QueryClientProvider } from "react-query"
import PersonDetailScreen from '..'
import { PeopleNavigatorParamList } from "../.."
import {
  fireEvent, render, waitForEventLoop,
} from '../../../../jest/test-utils'
import { ApiManager, MailManager } from "../../../../lib"
import type { Person } from '../../../../types/uclapi'

MailManager.composeAsync = jest.fn()
const queryClient = new QueryClient()

describe(`PersonDetailScreen`, () => {
  const mockPerson: Person = {
    department: `City of Town PD`,
    email: `j.cloth@city.town.uk`,
    name: `Jack Cloth`,
    status: `Detective Inspector`,
  }

  const props = {
    route: {
      params: {
        email: mockPerson.email,
      },
    // eslint-disable-next-line quotes
    } as RouteProp<PeopleNavigatorParamList, 'PeopleDetail'>,
    token: `supersecure`,
  }

  ApiManager.people.fetchPerson = jest.fn(() => Promise.resolve(mockPerson))

  const setup = () => render(
    <QueryClientProvider client={queryClient}>
      <PersonDetailScreen {...props} />
    </QueryClientProvider>,
  )

  beforeAll(() => {
    jest.useFakeTimers()
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it(`renders fine`, async () => {
    const wrapper = await setup()
    const { getByText } = wrapper
    expect(ApiManager.people.fetchPerson).toBeCalledTimes(1)
    await waitForEventLoop()
    expect(getByText(new RegExp(mockPerson.department, `i`))).toBeTruthy()
    expect(getByText(new RegExp(mockPerson.name, `i`))).toBeTruthy()
    expect(getByText(new RegExp(mockPerson.status, `i`))).toBeTruthy()
    expect(getByText(new RegExp(mockPerson.email, `i`))).toBeTruthy()
    expect(wrapper).toMatchSnapshot()
  })

  it(`sends email`, async () => {
    const { getByText } = await setup()
    const button = getByText(/send email/i)
    fireEvent.press(button)
    await waitForEventLoop()
    expect(MailManager.composeAsync).toBeCalledTimes(1)
    expect(MailManager.composeAsync).toBeCalledWith({ recipients: [mockPerson.email] })
  })
})
