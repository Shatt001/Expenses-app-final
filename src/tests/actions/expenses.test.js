import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { startAddExpense, addExpense, editExpense, removeExpense } from '../../actions/expenses'
import expenses from '../fixtures/expenses'
import database from '../../firebase/firebase'

const createMockStore = configureMockStore([thunk])


beforeEach((done) => {
  let expensesData = {}
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt }
  })
  console.log('before call firebase')
  database.ref('expenses').set(expensesData).then(() => {
    console.log('after call firebase')
    done()
  }).catch((err) => {
    console.log(err)
    done()
  })
})

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' })
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  })
})

test('should setup remove expense action object with default', () => {
  const action = removeExpense()
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: undefined
  })
})

test('should setup edit expense action object', () => {
  const action = editExpense('123abc', { note: '123abc' })
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    editExpense: { note: '123abc' }
  })
})

test('should setup add expense action object', () => {
  const expenseData = {
    description: 'a',
    note: 'b',
    amount: '1',
    createdAt: 1000
  }
  const action = addExpense(expenses[2])
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expenses: expenses[2]
  })
})


test('should add expense to database ans store', () => {
  const store = createMockStore({})
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: '',
    createdAt: 1000
  }
  store.dispatch(startAddExpense(expenseData)).then(() => {
    expect(1).toBe(2)
  })
})

test('should add expense with defaults to database ans store', () => {

})
// test('should setup add expense action object with default', () => {
//   const expenseData = {
//     description: '',
//     note: '',
//     amount: 0,
//     createdAt: 0
//   }
//   const action = addExpense()
//   expect(action).toEqual({
//     type: 'ADD_EXPENSE',
//     expenses: {
//       ...expenseData,
//       id: expect.any(String)
//     }
//   })
// })