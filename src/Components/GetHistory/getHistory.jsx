import React, { useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { setDataValue } from '../../Store/store'
import { getBalance, getBlockNumberForDates, getDatesBetween } from '../../Service/web3'
import TrackingWalletChart from '../Chart/trackingWalletChart'
import SelectRange from '../SelectRange/selectRange'
import '../../Styles/getHistory.css'

function GetHistory() {
  const inputValue = useSelector((state) => state.inputValue)
  const selectedOption = useSelector((state) => state.selectRangeValue)
  const data = useSelector((state) => state.data)
  const dispatch = useDispatch()
  const today = new Date()

  // const [myData, setMyData] = useState([{ address: inputValue, balance: 0, date: null }])

  const targetDay = new Date()
  targetDay.setDate(today.getDate() - selectedOption)
  const dateToTrack = getDatesBetween(targetDay, today)

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
  }, [inputValue, selectedOption])

  return (
    <section className="previousBalance">
      <SelectRange />
      {inputValue === null ? null : <TrackingWalletChart dataWallet={data} />}
    </section>
  )
}

export default GetHistory
