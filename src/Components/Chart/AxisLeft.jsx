export function AxisLeft({ yScale, innerWidth, innerHeight, AxisLabelOffset, labelTitle }) {
  return (
    <>
      <line x1={0} x2={innerWidth} y1={innerHeight} y2={innerHeight} stroke="black" />
      {yScale.ticks(5).map((tickValue) => (
        <g key={tickValue} transform={`translate(-10, ${yScale(tickValue)})`}>
          <line x2={10} stroke="black" />
          <text style={{ textAnchor: 'end' }} x={-3} dy=".32em">
            {tickValue}
          </text>
        </g>
      ))}
      <text className="axis-label" textAnchor="middle" transform={`translate(${-AxisLabelOffset}, ${innerHeight / 2}) rotate(-90)`}>
        {labelTitle}{' '}
      </text>
    </>
  )
}
