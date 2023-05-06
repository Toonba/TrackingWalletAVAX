import { line } from 'd3'

export function Marks({ data, xScale, yScale, circleRadius }) {

  return (
    <>
      <g className="marks">
        {/* Line qui connect les points */}
        <path
          fill="none"
          stroke="white"
          strokeWidth="4"
          strokeLinejoin="round"
          strokeLinecap='round'
          
          d={line()
            .x((d) => xScale(d.date))
            .y((d) => yScale(d.balance))(data)}
        />
        {data.map((d) => (
          <circle key={d.date} cx={xScale(d.date)} cy={yScale(d.balance)} r={circleRadius} fill='transparent' />
        ))}
      </g>
    </>
  )
}
