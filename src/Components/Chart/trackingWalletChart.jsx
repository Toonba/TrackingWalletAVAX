import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { scaleLinear, scaleTime, max, min, timeFormat, scaleLog } from 'd3'
import { AxisBottom } from './AxisBottom'
import { AxisLeft } from './AxisLeft'
import { Marks } from './Marks'

function TrackingWalletChart({ dataWallet }) {
  // SVG dimensions
  const width = 1260
  const height = 700
  // actual graph dimension
  const margin = { top: 50, right: 50, bottom: 75, left: 75 }
  const innerWidth = width - margin.left - margin.right
  const innerHeight = height - margin.top - margin.bottom
  // data used
  const data = dataWallet[0].map((element) => ({ balance: parseFloat(element.balance), date: (new Date(element.date)) }))

  const xScale = scaleTime()
    .domain([min(data, (d) => d.date), max(data, (d) => d.date)])
    .range([0, innerWidth])
  // const xScale = scaleLinear().domain([0, data.length]).range([0, innerWidth])
  // ("%d-%b-%y")

  const yScaleLineair = scaleLinear()
    .domain([0, max(data, (d) => d.balance)])
    .range([innerHeight, 0])

  const yScaleLog = scaleLog()
    .domain([min(data.map((d) => d.balance)), max(data.map((d) => d.balance))])
    .range([0, innerHeight])
    
  const xlabelTitle = "Dates"
  const xAxisLabelOffset = 50
  const ylabelTitle = "Balance"
  const yAxisLabelOffset = 50
  const xAxisTickFormat = timeFormat("%d-%b-%y")
  
  console.log(xScale.ticks(2))
    

  return (
    // data.map(d=> <div style={{backgroundColor:'black', width: '100px', height:'100px'}}></div>)
    <>
      <svg width={width} height={height} className="svg">
        <g transform={`translate(${margin.left},${margin.top})`}>
          <AxisBottom xScale={xScale} innerHeight={innerHeight} innerWidth={innerWidth} AxisLabelOffset={xAxisLabelOffset} labelTitle={xlabelTitle} tickFormat={xAxisTickFormat} />
          <AxisLeft yScale={yScaleLineair} innerWidth={innerWidth} innerHeight={innerHeight} AxisLabelOffset={yAxisLabelOffset} labelTitle={ylabelTitle}/>
          <Marks data={data} xScale={xScale} yScale={yScaleLineair} innerHeight={innerHeight} circleRadius={2} />
        </g>
      </svg>
    </>
  )
}

export default TrackingWalletChart
