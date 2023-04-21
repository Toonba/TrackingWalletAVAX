import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Line, ResponsiveContainer } from 'recharts'
import { CustomToolTip } from './tooltip'
import { useSelector } from 'react-redux'

function TrackingWalletChart() {
  const data = useSelector((state) => state.data)
  console.log(data)
  
  return (
    <div className="chart">
      {/* <ResponsiveContainer width="100%" height="100%"> */}
      <LineChart width={800} height={500} data={data}>
        <CartesianGrid horizontal={false} vertical={false} />
        <XAxis dataKey="date" tick={{ fill: '#FFFFFF' }} tickLine={true} axisLine={true} tickMargin={0} padding={{ left: -15, right: 0 }} />
        {/* <Tooltip content={<CustomToolTip />} /> */}
        {/* <YAxis domain={yAxisDomain} /> */}
        <Line type="monotone" dataKey="balance" stroke="#8884d8" strokeWidth={2} />
      </LineChart>
      {/* </ResponsiveContainer> */}
    </div>
  )
}

export default TrackingWalletChart
