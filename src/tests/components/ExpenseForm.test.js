import React from 'react'
import { shallow } from 'enzyme'
import moment from 'moment'
import ExpenseForm from '../../components/ExpenseForm'
import expenses from '../fixtures/expenses'

test('should create ExpenseForm component with default', () => {
  const wrapper = shallow(<ExpenseForm />)
  expect(wrapper).toMatchSnapshot()
})

test('should create ExpenseForm component with props', () => {
  const singleExpense = expenses[0]
  const wrapper = shallow(<ExpenseForm
    expense={singleExpense}
    buttonName="Edit" />)
  expect(wrapper).toMatchSnapshot()
})

test('should render error for invalid form submission', () => {
  const wrapper = shallow(<ExpenseForm />)
  expect(wrapper).toMatchSnapshot()
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  })
  expect(wrapper.state('error').length).toBeGreaterThan(0)
  expect(wrapper).toMatchSnapshot()
})

test('should render error for invalid form submission discription only spaces', () => {
  const exp = { ...expenses[0], description: '   '}
  
  const wrapper = shallow(<ExpenseForm expense={exp}/>)
  expect(wrapper).toMatchSnapshot()
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  })
  expect(wrapper.state('error').length).toBeGreaterThan(0)
  expect(wrapper).toMatchSnapshot()
})

test('should set description on input change', () => {
  const value = 'New description'
  const wrapper = shallow(<ExpenseForm />)
  wrapper.find('input').at(0).simulate('change', {
    target: { value }
  })
  expect(wrapper.state('description')).toBe(value)
})

test('should set note on textarea change', () => {
  const value = 'New note'
  const wrapper = shallow(<ExpenseForm />)
  wrapper.find('textarea').simulate('change', {
    target: { value }
  })
  expect(wrapper.state('note')).toBe(value)
})

test('should set valid amount', () => {
  const value = '12.23'
  const wrapper = shallow(<ExpenseForm />)
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  })
  expect(wrapper.state('amount')).toBe(value)
})

test('should not set amount in invalid', () => {
  const value = '12.233'
  const wrapper = shallow(<ExpenseForm />)
  wrapper.find('input').at(1).simulate('change', {
    target: { value }
  })
  expect(wrapper.state('amount')).toBe('')
})

test('should call onSubmit prop for valid form submission', () => {
  const onSubmitSpy = jest.fn()
  const wrapper = shallow(<ExpenseForm expense={expenses[0]} onSubmit={onSubmitSpy} />)
  expect(wrapper).toMatchSnapshot()
  wrapper.find('form').simulate('submit', {
    preventDefault: () => { }
  })
  expect(wrapper.state('error')).toBe('')
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    amount: expenses[0].amount,
    description: expenses[0].description,
    createdAt: expenses[0].createdAt,
    note: expenses[0].note
  })
})

test('should set new date on date change', () => {
  const now = moment()
  const wrapper = shallow(<ExpenseForm />)
  wrapper.find('SingleDatePicker').prop('onDateChange')(now)
  expect(wrapper.state('createdAt')).toEqual(now)
})

test('should set new focus on focus change', () => {
  const focused = true
  const wrapper = shallow(<ExpenseForm />)
  wrapper.find('SingleDatePicker').prop('onFocusChange')({ focused })
  expect(wrapper.state('calendarFocused')).toEqual(focused)
})