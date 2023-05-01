export function AxisBottom({ xScale, innerHeight, innerWidth, AxisLabelOffset, labelTitle, tickFormat }) {
  return (
    <>
    <line y1={0} y2={innerHeight} stroke="black" />
      {xScale.ticks().map((tickValue) => (
      <g key={tickValue} transform={`translate(${xScale(tickValue)},${innerHeight})`}>
        <line y2={10} stroke="black" />
        <text style={{ textAnchor: 'middle' }} dy=".71em" y={15}>
          {tickFormat(tickValue)}
        </text>
      </g>
      ))}
      <text className='axis-label' x={innerWidth /2} y={innerHeight + AxisLabelOffset} textAnchor="middle" >{labelTitle}</text>
    </>
  )
}

