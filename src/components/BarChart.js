import { useEffect } from 'react'
import { select, selectAll, mouse } from 'd3-selection'
import { scaleBand, scaleLinear } from 'd3-scale'
import { axisBottom, axisLeft } from 'd3-axis'
import { transition } from 'd3-transition'
import { max, merge } from 'd3-array'

const WIDTH = 600
const HEIGHT = 450
const MARGIN = {
  TOP: 10,
  RIGHT: 10,
  BOTTOM: 60,
  LEFT: 50
}

const BarChart = ({ data }) => {
  useEffect(() => {
    selectAll('#bars > svg > *').remove()
    const svg = select('#bars > svg')
    const x = scaleBand()
      .domain(data.map(d => d.party))
      .range([MARGIN.LEFT, WIDTH - MARGIN.RIGHT])
      .padding(0.2)
    const y = scaleLinear()
      .domain([0, max(data.map(d => [d.supportAmongMen, d.supportAmongWomen]).flat())]).nice()
      .range([HEIGHT - MARGIN.BOTTOM, MARGIN.TOP])
    const xAxis = axisBottom()
      .scale(x)
    const yAxis = axisLeft()
      .scale(y)
      .tickSize(-(WIDTH - MARGIN.LEFT - MARGIN.RIGHT))
    svg.append('g')
      .attr('transform', `translate(0, ${HEIGHT - MARGIN.BOTTOM})`)
      .call(xAxis)
      .selectAll('text')
      .attr('y', 12)
      .style('font-size', '1.5em')
    svg.append('g')
      .attr('transform', `translate(${MARGIN.LEFT}, 0)`)
      .call(yAxis)
      .call(g => g.select('.domain').remove())
      .selectAll('line')
      .attr('opacity', 0.2)
    svg.append('g')
      .selectAll('.men')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'men')
      .attr('fill', '#1f77b4')
      .attr('x', d => x(d.party))
      .attr('y', d => y(d.supportAmongMen))
      .attr('height', d => y(0) - y(d.supportAmongMen))
      .attr('width', x.bandwidth() / 2)

    svg.append('g')
      .selectAll('.women')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'women')
      .attr('fill', '#d62728')
      .attr('x', d => x(d.party) + x.bandwidth() / 2)
      .attr('y', d => y(d.supportAmongWomen))
      .attr('height', d => y(0) - y(d.supportAmongWomen))
      .attr('width', x.bandwidth() / 2)

    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 15)
      .attr('x', -(HEIGHT - MARGIN.TOP - MARGIN.BOTTOM) / 2)
      .attr('text-anchor', 'middle')
      .text('Procent')
  }, [data])

  return (
    <div id='bars'>
      <svg width={WIDTH} height={HEIGHT} />
    </div>
  )
}

export default BarChart
