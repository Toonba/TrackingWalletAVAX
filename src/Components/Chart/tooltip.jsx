export function CustomToolTip({ active, payload }) {
  if (active) {
    return (
      <div className="toolTip">
        <p>{`${payload[0].value}`} min</p>
      </div>
    )
  }
  return null
}