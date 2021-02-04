import filtersReducer from '../../reducers/filters'
import moment from 'moment'

test('should generate filter reduser newState with default state arg', () => {
  const state = filtersReducer(undefined, { type: '' })
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  })
})

test('should generate filter reduser newState with text provided', () => {
  const state = filtersReducer(undefined, { type: 'SET_FILTER', text: '123abc' })
  expect(state).toEqual({
    text: '123abc',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  })
})

test('should generate filter reduser newState with sortby amount provided', () => {
  const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT', sortBy: 'amount' })
  expect(state).toEqual({
    text: '',
    sortBy: 'amount',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  })
})

test('should generate filter reduser newState with sortby date provided', () => {
  const state = filtersReducer(undefined, { type: 'SORT_BY_DATE', sortBy: 'date' })
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month')
  })
})

test('should generate filter reduser newState with start date provided', () => {
  const state = filtersReducer(undefined, { type: 'SET_START_DATE', startDate: moment(0) })
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment(0),
    endDate: moment().endOf('month')
  })
})

test('should generate filter reduser newState with end date provided', () => {
  const state = filtersReducer(undefined, { type: 'SET_END_DATE', endDate: moment(0) })
  expect(state).toEqual({
    text: '',
    sortBy: 'date',
    startDate: moment().startOf('month'),
    endDate: moment(0)
  })
})

// // Filters state reducer function, returns new state 
// export default (state = filterReducerDefaultState, action) => {
//   switch (action.type) {
//     case 'SET_START_DATE':
//       return ({
//         ...state,
//         startDate: action.startDate
//       })
//     case 'SET_END_DATE':
//       return ({
//         ...state,
//         endDate: action.endDate
//       })
//   }
// }