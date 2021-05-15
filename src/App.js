import { useState, useEffect } from 'react'
import { calculateGenderGap, formatDecimalNumber } from './fun'

const App = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL)
        const { data } = await response.json()
        setData(data)
      } catch (err) {
        console.error('Något gick snett:', err)
      }
    }

    fetchData()
  }, [])

  if (!data) return null

  const { genderGap } = calculateGenderGap(data)

  return (
    <div className='App'>
      <div className='heading'>
        Könsgapet* i svenskarnas partisympatier:
        <span className='result'>
          {formatDecimalNumber(genderGap)}
        </span>
        procentenheter
      </div>
      <div className='explanation'>
        *) De summerade skillnaderna mellan stödet för olika partier bland kvinnor respektive män, enligt <a href='https://www.scb.se/hitta-statistik/statistik-efter-amne/demokrati/partisympatier/partisympatiundersokningen-psu/'>SCB:s senaste partisympatiundersökning</a>.
        Endast statistiskt signifikanta skillnader inkluderas i beräkningen.
      </div>
    </div>
  )
}

export default App
