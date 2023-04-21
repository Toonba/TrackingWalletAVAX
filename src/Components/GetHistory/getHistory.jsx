import React, { useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setDataValue } from '../../Store/store'
import Web3 from 'web3'
import { getBalance, getBlockNumberForDates, getDatesBetween } from '../../Service/web3'
import { LineChart, Line, CartesianGrid, YAxis, XAxis, ResponsiveContainer } from 'recharts'
import TrackingWalletChart from '../Chart/trackingWalletChart'
import SelectRange from '../SelectRange/selectRange'

function GetHistory() {
  const inputValue = useSelector((state) => state.inputValue)
  const data = useSelector((state) => state.data)
  const dispatch = useDispatch()
  const today = new Date()

  // const handleSubmit = (event) => {
  //   event.preventDefault()
  //   dispatch(setInputValue(address))
  // }

  // const dateToTrack = [sevenDay, thirtyDay, hundredDay]
  const [myData, setMyData] = useState([{ address: inputValue, balance: 0, date: null }])
  const [selectedOption, setSelectedOption] = useState(7)
  const [yAxisDomain, setYAxisDomain] = useState([0, 100])

  const targetDay = new Date()
  targetDay.setDate(today.getDate() - selectedOption)
  const dateToTrack = getDatesBetween(targetDay, today)

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value)
  }

  useEffect(() => {
    const maxBalance = Math.max(...myData.map((item) => item.balance))
    setYAxisDomain([0, maxBalance + 10])
  }, [myData])

  useEffect(() => {
    const fetchData = async () => {
      const promises = dateToTrack.map(async (date) => {
        const blockNumber = await getBlockNumberForDates(date)
        const result = await getBalance(inputValue, blockNumber)
        return { balance: result.balance, date: result.date }
      })
      const balances = await Promise.all(promises)
      dispatch(setDataValue(balances))
    }
    fetchData()
  }, [inputValue, targetDay])

  return (
    <div className="previousBalance">
      <SelectRange />
      {/* <div className="whichRange">
        <label htmlFor="chooseRange">Which range do you want to check ?</label>
        <select name="range" id="chooseRange" value={selectedOption} onChange={handleSelectChange}>
          <option value="7">7 days</option>
          <option value="30">30 days</option>
          <option value="360">360 days</option>
        </select>
      </div> */}
      <TrackingWalletChart data={myData} yDomain={yAxisDomain} />
      <div className="chart">
        <LineChart width={800} height={300} data={myData}>
          <CartesianGrid horizontal={false} vertical={false} />
          <XAxis dataKey="date" tick={{ fill: '#FFFFFF' }} tickLine={true} axisLine={true} tickMargin={0} padding={{ left: -15, right: 0 }} />

          <YAxis domain={yAxisDomain} />
          <Line type="monotone" dataKey="balance" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </div>
      {/* {myData.map((element, index) => (
        <p key={`${element}-${index}`}>{`Il était de ${element.balance} AVAX le ${element.date}`}</p>
      ))} */}
    </div>
  )
}

export default GetHistory
