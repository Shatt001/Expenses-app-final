import getExpensesTotal from '../../components/expensesTotal'
import expenses from '../fixtures/expenses'

test('should return 0 if no expenses', () => {
  expect(getExpensesTotal()).toBe(0)
})

test('should correctly add up a single expense', () => {
  expect(getExpensesTotal(expenses)).toBe(198195)
})

test('should correctly add up a single expense', () => {
  expect(getExpensesTotal([expenses[0]])).toBe(3000)
})