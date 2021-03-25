export const calculateBalance = (price, payments) => {
  let totalPayed = payments
    .filter((p) => p.status === 'APROBADO')
    .reduce((accumulator, currentValue) => accumulator + currentValue.amount, 0)
  let balance = price - totalPayed

  return balance
}
