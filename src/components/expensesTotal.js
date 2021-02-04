export default (expenses = []) => {
  let total = 0

  if (expenses.length === 0) {
    return total
  }

  expenses.map((expense) => {
    total += expense.amount
  })

  return total
}