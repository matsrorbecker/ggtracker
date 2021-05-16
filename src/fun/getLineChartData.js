import { calculateGenderGap } from './'

export const getLineChartData = previousPolls => {
  const polls = [...new Set(previousPolls.map(p => p.key[3]))]
  return polls.map(poll => {
    const data = previousPolls.filter(p => p.key[3] === poll)
    const { genderGap } = calculateGenderGap(data)
    return {
      poll,
      genderGap
    }
  })
}
