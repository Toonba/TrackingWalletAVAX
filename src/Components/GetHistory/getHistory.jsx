import React, { useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import Web3 from 'web3'
import { getBalance, getBlockNumberForDates, getDatesBetween } from '../../Service/web3'

function GetHistory() {
  // 27639779
  const inputValue = useSelector((state) => state.inputValue)
  const today = new Date()
  const targetDate = new Date()
  const sevenDay = new Date()
  const thirtyDay = new Date()
  const hundredDay = new Date()
  sevenDay.setDate(today.getDate() - 7)
  sevenDay.setMilliseconds(today.getMilliseconds() + 10)
  thirtyDay.setDate(today.getDate() - 30)
  thirtyDay.setMilliseconds(today.getMilliseconds() + 10)
  hundredDay.setDate(today.getDate() - 100)
  hundredDay.setMilliseconds(today.getMilliseconds() + 10)

  targetDate.setDate(today.getDate() - 7)
  targetDate.setMilliseconds(today.getMilliseconds() + 10)
  const dateToTrack = [sevenDay, thirtyDay, hundredDay]
  const [myData, setMyData] = useState([{ address: inputValue, balance: 0, date: null }])
  const [test, setTest] = useState([])

  const addElement = (newElement) => {
    const newArray = [...test]
    newArray.push(newElement)
    setTest(newArray)
  }

  useEffect(() => {
    const fetchData = async (date) => {
      const blockNumber = await getBlockNumberForDates(date)
      const result = await getBalance(inputValue, blockNumber)
      addElement({ balance: result.balance, date: result.date })
    }
    dateToTrack.forEach((element) => fetchData(element))
  }, [inputValue])

  return (
    <div>
      {test.map((element, index) => (
        <p key={`${element}-${index}`}>{`Il était de ${element.balance} AVAX le ${element.date}`}</p>
      ))}
    </div>
  )
}

export default GetHistory
