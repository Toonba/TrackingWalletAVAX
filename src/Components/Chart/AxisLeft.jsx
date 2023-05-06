export function AxisLeft({ yScale, innerWidth, innerHeight, AxisLabelOffset, labelTitle }) {
  return (
    <>
    {/* Line de base de l'axe */}
      <line x1={0} x2={innerWidth} y1={innerHeight} y2={innerHeight} stroke="white" />
      {yScale.ticks().map((tickValue) => (
        <g key={tickValue} transform={`translate(-10, ${yScale(tickValue)})`}>
          {/* Line des ticks de l'axe */}
          <line x2={10} stroke="white" />
          <text style={{ textAnchor: 'end', fill:'white' }} x={-3} dy=".32em">
            {tickValue}
          </text>
        </g>
      ))}
      <text className="axis-label" style={{ textAnchor: 'middle', fill: 'white' }} transform={`translate(${-AxisLabelOffset}, ${innerHeight / 2}) rotate(-90)`} >
        {labelTitle}{' '}
      </text>
    </>
  )
}
