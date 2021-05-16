export const calculateGenderGap = (data, ageGroup = 'tot18+') => {
  const dataToUse = data.filter(d => d.key[1] === ageGroup)
  const dataOnMen = dataToUse.filter(d => d.key[0] === '1')
  const dataOnWomen = dataToUse.filter(d => d.key[0] === '2')

  let genderGap = 0
  const calculation = dataOnMen.reduce((acc, d1) => {
    const party = d1.key[2]
    const d2 = dataOnWomen.find(d => d.key[2] === party)
    const supportAmongMen = +d1.values[0]
    const supportAmongWomen = +d2.values[0]
    const errorMarginMen = +d1.values[1]
    const errorMarginWomen = +d2.values[1]
    const difference = supportAmongMen - supportAmongWomen
    const differenceIsSignificant = Math.abs(difference) - errorMarginMen - errorMarginWomen >= 0.1
    if (differenceIsSignificant) genderGap += Math.abs(difference)

    acc[party] = {
      supportAmongMen,
      errorMarginMen,
      supportAmongWomen,
      errorMarginWomen,
      difference,
      differenceIsSignificant
    }

    return acc
  }, {})

  return {
    genderGap: Math.round(genderGap * 10) / 10,
    calculation
  }
}
