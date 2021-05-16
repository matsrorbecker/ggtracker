import { useEffect } from 'react'
import { select, selectAll, mouse } from 'd3-selection'
import { scalePoint, scaleLinear } from 'd3-scale'
import { axisBottom, axisLeft } from 'd3-axis'
import { transition } from 'd3-transition'
import { max, merge } from 'd3-array'
import { line } from 'd3-shape'

const LineChart = ({ data }) => {
  useEffect(() => {
    // TODO: Rita diagram
  }, [data])

  return (
    <div id='lines'>
      <svg />
    </div>
  )
}

export default LineChart
