// third party unique id generator
import { v4 as uuidv4 } from 'uuid'
import database from '../firebase/firebase'

// Declared expenses actions. Action is a function which returns an object with action type and modified data. This object via dispatch function is provided to reduser function to modify state
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expenses: expense
})

export const startAddExpense = (expenseData = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData

    const expense = { description, note, amount, createdAt }

    return database.ref('users/' + uid + '/expenses').push(expense).then((ref) => {
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }))
    })
  }
}

export const removeExpense = ({ id } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
})

export const startRemoveExpense = ({ id } = {}) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    return database.ref('users/' + uid + '/expenses/' + id)
      .remove()
      .then(() => {
        dispatch(removeExpense({ id }))
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export const editExpense = (id, editExpense) => ({
  type: 'EDIT_EXPENSE',
  id,
  editExpense
})

export const startEditExpense = (id, expense) => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expense

    return database.ref('users/' + uid + '/expenses/' + id)
      .update({ amount, createdAt, description, note })
      .then(() => {
        dispatch(editExpense(id, expense))
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses: expenses
})

export const startSetExpenses = () => {
  return (dispatch, getState) => {
    const uid = getState().auth.uid
    const expenses = []
    return database.ref('users/' + uid + '/expenses').once('value').then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        expenses.push({ id: childSnapshot.key, ...childSnapshot.val() })
      })

      dispatch(setExpenses(expenses))
    }).catch((err) => {
      console.log(err)
    })
  }
}