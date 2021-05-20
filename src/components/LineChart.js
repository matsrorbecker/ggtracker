import { useEffect } from 'react'
import { select, selectAll, mouse } from 'd3-selection'
import { scalePoint, scaleLinear } from 'd3-scale'
import { axisBottom, axisLeft } from 'd3-axis'
import { transition } from 'd3-transition'
import { max, merge } from 'd3-array'
import { line as d3line } from 'd3-shape'

const WIDTH = 600
const HEIGHT = 450
const MARGIN = {
  TOP: 10,
  RIGHT: 10,
  BOTTOM: 60,
  LEFT: 50
}

const LineChart = ({ data }) => {
  useEffect(() => {
    selectAll('#lines > svg > *').remove()
    const svg = select('#lines > svg')
    const x = scalePoint()
      .domain(data.map(d => d.poll))
      .range([MARGIN.LEFT, WIDTH - MARGIN.RIGHT])
    const y = scaleLinear()
      .domain([0, max(data.map(d => d.genderGap))]).nice()
      .range([HEIGHT - MARGIN.BOTTOM, MARGIN.TOP])
    const xAxis = axisBottom()
      .scale(x)
    const yAxis = axisLeft()
      .scale(y)
      .tickSize(-(WIDTH - MARGIN.LEFT - MARGIN.RIGHT))
    const line = d3line()
      .x(d => x(d.poll))
      .y(d => y(d.genderGap))
    svg.append('g')
      .attr('transform', `translate(0, ${HEIGHT - MARGIN.BOTTOM})`)
      .call(xAxis)
      .selectAll('text')
      .attr('y', -3)
      .attr('x', -10)
      .style('text-anchor', 'end')
      .attr('transform', 'rotate(-90)')
    svg.append('g')
      .attr('transform', `translate(${MARGIN.LEFT}, 0)`)
      .call(yAxis)
      .call(g => g.select('.domain').remove())
      .selectAll('line')
      .attr('opacity', 0.2)
    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#9467bd')
      .attr('stroke-width', 2)
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('d', line)
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 15)
      .attr('x', -(HEIGHT - MARGIN.TOP - MARGIN.BOTTOM) / 2)
      .attr('text-anchor', 'middle')
      .text('Procentenheter')
  }, [data])

  return (
    <div id='lines'>
      <svg width={WIDTH} height={HEIGHT} />
    </div>
  )
}

export default LineChart
