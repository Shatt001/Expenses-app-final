import expensesReducer from '../../reducers/expenses'

const state = [{
  id: '1',
  description: 'Gum',
  note: '',
  amount: 195,
  createdAt: 0
}, {
  id: '3',
  description: 'Rent',
  note: '',
  amount: 195000,
  createdAt: 0
}]

test('should generate newState object of expense for store add', () => {
  const action = {
    type: 'ADD_EXPENSE',
    expenses: {
      id: '2',
      description: 'Tea',
      note: '',
      amount: 250,
      createdAt: 0
    }
  }
  expect(expensesReducer(state, action)).toEqual([...state, action.expenses])
})

test('should generate newState object of expense for store add with default', () => {
  const action = {
    type: 'ADD_EXPENSE',
    expenses: {
      id: '2',
      description: 'Tea',
      note: '',
      amount: 250,
      createdAt: 0
    }
  }
  expect(expensesReducer(undefined, action)).toEqual([action.expenses])
})

test('should generate newState object of expense for store remove', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '3'
  }
  expect(expensesReducer(state, action)).toEqual([state[0]])
})

test('should generate newState object of expense for store edit id exists', () => {
  const action = {
    type: 'EDIT_EXPENSE',
    id: '3',
    editExpense: {
      description: 'Potatos',
      note: '',
      amount: 500,
      createdAt: 0
    }
  }
  expect(expensesReducer(state, action)).toEqual([state[0], {...state[1], ...action.editExpense}])
})

test('should generate newState object of expense without any action type provided', () => {
  const action = {
    type: '',
    id: '3',
    editExpense: {
      description: 'Potatos',
      note: '',
      amount: 500,
      createdAt: 0
    }
  }
  expect(expensesReducer(state, action)).toEqual(state)
})