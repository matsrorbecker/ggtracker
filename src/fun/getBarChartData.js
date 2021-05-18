export const getBarChartData = (latestPoll, ageGroup = 'tot18+') => {
  const dataToUse = latestPoll.filter(d => d.key[1] === ageGroup)
  const dataOnMen = dataToUse.filter(d => d.key[0] === '1')
  const dataOnWomen = dataToUse.filter(d => d.key[0] === '2')
  return dataOnMen.map(d1 => {
    const party = d1.key[2]
    const d2 = dataOnWomen.find(d => d.key[2] === party)
    const supportAmongMen = +d1.values[0]
    const supportAmongWomen = +d2.values[0]
    return {
      party: party === 'övr' ? 'Övr' : party.toUpperCase(),
      supportAmongMen,
      supportAmongWomen
    }
  })
}
