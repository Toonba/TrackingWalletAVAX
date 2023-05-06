export function AxisBottom({ xScale, innerHeight, innerWidth, AxisLabelOffset, labelTitle, tickFormat }) {
  return (
    <>
      {/* Line de base de l'axe */}
      <line y1={0} y2={innerHeight} stroke="white" />
      {xScale.ticks(5).map((tickValue) => (
        <g key={tickValue} transform={`translate(${xScale(tickValue)},${innerHeight})`}>
          {/* Line des ticks de l'axe */}
          <line y2={10} stroke="white" />
          <text className='xAxeTexte' style={{ textAnchor: 'middle', fill: 'white' }} dy=".71em" y={15}>
            {tickFormat(tickValue)}
          </text>
        </g>
      ))}
      <text className="axis-label" x={innerWidth / 2} y={innerHeight + AxisLabelOffset} textAnchor="middle" style={{ fill: 'white' }}>
        {labelTitle}
      </text>
    </>
  )
}
