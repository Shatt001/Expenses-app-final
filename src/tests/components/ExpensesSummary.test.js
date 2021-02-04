import React from 'react'
import expenses from '../fixtures/expenses'
import { shallow } from 'enzyme'
import { ExpensesSummary } from '../../components/ExpensesSummary'

let wrapper

beforeEach(() => {
  wrapper = shallow(
    <ExpensesSummary
      expenses={expenses}
    />
  )
})

test('should render ExpensesSummary component with multiple expenses', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should render ExpensesSummary component with single expense', () => {
  wrapper.setProps({
    expenses: [expenses[1]]
  })
  expect(wrapper).toMatchSnapshot()
})
