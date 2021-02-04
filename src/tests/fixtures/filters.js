import moment from 'moment'

const defFilters = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
}

const realFilters = {
  text: 'bill',
  sortBy: 'amount',
  startDate: moment(0),
  endDate: moment(0).add(3, 'days')
}

export { defFilters, realFilters }