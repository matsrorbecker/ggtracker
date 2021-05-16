export const getYearAndMonth = latestPoll => {
  const latestPollMonth = latestPoll[0].key[3]
  const [year, monthNumber] = latestPollMonth.split('M')
  const month = monthNumber === '05' ? 'maj' : 'november'

  return {
    year,
    month
  }
}
