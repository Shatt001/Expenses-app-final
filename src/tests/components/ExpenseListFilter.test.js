import React from 'react'
import { shallow } from 'enzyme'
import { ExpenseListFilter } from '../../components/ExpenseListFilter'
import { defFilters, realFilters } from '../fixtures/filters'

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper

beforeEach(() => {
  setTextFilter = jest.fn()
  sortByDate = jest.fn()
  sortByAmount = jest.fn()
  setStartDate = jest.fn()
  setEndDate = jest.fn()
  wrapper = shallow(
    <ExpenseListFilter
      filters={defFilters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  )
})

test('should render ExpenseListFilter component with default params', () => {
  expect(wrapper).toMatchSnapshot()
})

test('should render ExpenseListFilter component with real params', () => {
  wrapper.setProps({
    filters: realFilters
  })
  expect(wrapper).toMatchSnapshot()
})

test('should handle text change', () => {
  const value = 'rent'
  wrapper.find('input').simulate('change', { target: { value } })
  expect(setTextFilter).toHaveBeenLastCalledWith(value)
})

test('should sort by date', () => {
  const value = 'date'
  wrapper.setProps({
    filters: realFilters
  })
  wrapper.find('select').simulate('change', { target: { value } })
  expect(sortByDate).toHaveBeenLastCalledWith()
})

test('should sort by amount', () => {
  const value = 'amount'
  wrapper.find('select').simulate('change', { target: { value } })
  expect(sortByAmount).toHaveBeenLastCalledWith()
})

test('should handle date changes', () => {
  wrapper.find('DateRangePicker').prop('onDatesChange')({ startDate: realFilters.setStartDate, endDate: realFilters.setEndDate })
  expect(setStartDate).toHaveBeenLastCalledWith(realFilters.setStartDate)
  expect(setEndDate).toHaveBeenLastCalledWith(realFilters.setEndDate)
})

test('should handle date focus changes', () => {
  const value = 'endDate'
  wrapper.find('DateRangePicker').prop('onFocusChange')(value)
  expect(wrapper.state('calendarFocused')).toBe(value)
})