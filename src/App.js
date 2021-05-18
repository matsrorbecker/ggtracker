import { useState, useEffect } from 'react'
import LineChart from './components/LineChart'
import BarChart from './components/BarChart'
import {
  calculateGenderGap,
  formatDecimalNumber,
  getYearAndMonth,
  getLineChartData,
  getBarChartData
} from './fun'

const App = () => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        let response = await fetch(`${process.env.REACT_APP_API_URL}/latest`)
        const latestPoll = (await response.json()).data
        response = await fetch(`${process.env.REACT_APP_API_URL}/previous`)
        const previousPolls = (await response.json()).data
        setData({
          latestPoll,
          previousPolls
        })
      } catch (err) {
        console.error('Något gick snett:', err)
        setError(err)
      }
    }

    fetchData()
  }, [])

  if (error) {
    return (
      <div className='error'>
        <div className='heading'>
          Något gick snett när sidan skulle laddas... :(
        </div>
        <div className='body'>
          Men kom gärna tillbaka om en liten stund.
        </div>
      </div>
    )
  }

  if (!data) return null

  const { latestPoll, previousPolls } = data
  const { genderGap } = calculateGenderGap(latestPoll)
  const { year, month } = getYearAndMonth(latestPoll)
  const lineChartData = getLineChartData(previousPolls)
  const barChartData = getBarChartData(latestPoll)

  return (
    <div>
      <div className='heading'>
        Könsgapet* i svenskarnas partisympatier:
        <span className='result'>
          {formatDecimalNumber(genderGap)}
        </span>
        procentenheter
      </div>
      <div className='explanation'>
        *) De summerade skillnaderna mellan stödet för olika partier bland kvinnor respektive män, enligt <a href='https://www.scb.se/hitta-statistik/statistik-efter-amne/demokrati/partisympatier/partisympatiundersokningen-psu/'>SCB:s partisympatiundersökning</a> i {`${month} ${year}`}.
        Endast skillnader som är statistiskt signifikanta vid en konfidensgrad på 95% inkluderas i beräkningen.
      </div>
      <div className='charts'>
        <div>
          <h1>Könsgapets utveckling 2006–{year}</h1>
          <LineChart data={lineChartData} />
        </div>
        <div>
          <h1>Partisympatierna i {`${month} ${year}`}</h1>
          <BarChart data={barChartData} />
        </div>
      </div>
    </div>
  )
}

export default App
