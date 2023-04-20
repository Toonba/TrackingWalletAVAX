import React, { useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import Web3 from 'web3'
import { getBalance, getBlockNumberForDates, getDatesBetween } from '../../Service/web3'

function GetHistory() {
  // 27639779
  const inputValue = useSelector((state) => state.inputValue)
  const today = new Date()
  const sevenDay = new Date()
  const thirtyDay = new Date()
  const hundredDay = new Date()
  sevenDay.setDate(today.getDate() - 7)
  sevenDay.setMilliseconds(today.getMilliseconds() + 10)
  thirtyDay.setDate(today.getDate() - 30)
  thirtyDay.setMilliseconds(today.getMilliseconds() + 10)
  hundredDay.setDate(today.getDate() - 365)
  hundredDay.setMilliseconds(today.getMilliseconds() + 10)

  // const dateToTrack = [sevenDay, thirtyDay, hundredDay]
  const [myData, setMyData] = useState([{ address: inputValue, balance: 0, date: null }])
  const [selectedOption, setSelectedOption] = useState(7)

  const targetDay = new Date()
  targetDay.setDate(today.getDate() - selectedOption)
  const dateToTrack = getDatesBetween(targetDay, today)

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value)
  }

  useEffect(() => {
    const fetchData = async () => {
      const promises = dateToTrack.map(async (date) => {
        const blockNumber = await getBlockNumberForDates(date)
        const result = await getBalance(inputValue, blockNumber)
        return { balance: result.balance, date: result.date }
      })
      const balances = await Promise.all(promises)
      setMyData(balances)
    }
    fetchData()
  }, [inputValue, targetDay])

  return (
    <div className="previousBalance">
      <div className="whichRange">
        <label for="chooseRange">Which range do you want to check ?</label>
        <select name="range" id="chooseRange" value={selectedOption} onChange={handleSelectChange}>
          <option value="7">7 days</option>
          <option value="30">30 days</option>
          <option value="120">120 days</option>
        </select>
      </div>
      {myData.map((element, index) => (
        <p key={`${element}-${index}`}>{`Il était de ${element.balance} AVAX le ${element.date}`}</p>
      ))}
    </div>
  )
}

export default GetHistory
