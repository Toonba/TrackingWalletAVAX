import { line } from 'd3'

export function Marks({ data, xScale, yScale, circleRadius }) {
  // Ajouter une variable qui indique si la balance est supérieure ou inférieure à la balance précédente
  const dataWithColor = data.map((d, i) => ({
    ...d,
    color: i > 0 ? (d.balance > data[i - 1].balance ? 'green' : 'red') : 'green',
  }));

  return (
    <>
      <g className='marks'>
        <path
          fill="none"
          stroke={dataWithColor[0].color}
          d={line()
            .x((d) => xScale(d.date))
            .y((d) => yScale(d.balance))(dataWithColor)}
        />
        {dataWithColor.map((d) => (
          <circle key={d.date} cx={xScale(d.date)} cy={yScale(d.balance)} r={circleRadius} fill={d.color} />
        ))}
      </g>
    </>
  )
}
