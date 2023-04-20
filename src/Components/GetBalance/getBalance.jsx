import React, { useEffect, useState, useMemo } from 'react'
import { useSelector } from 'react-redux'
import Web3 from 'web3'
import { getBalance } from '../../Service/web3'

function GetBalance() {
  const inputValue = useSelector((state) => state.inputValue)

  const [myData, setMyData] = useState({ address: inputValue, balance: 0, date: null })

  useEffect(() => {
    const fetchData = async () => {
      const result = await getBalance(inputValue)
      setMyData(result)
    }

    fetchData()
  }, [inputValue])

  return <div className="result">{myData.address === null ? <p>Gib adddy if you want to track your wallet</p> : myData.balance < 10 ? <h2>You are FUCKING Poor</h2> : <p>{`Le solde actuelle de l'adresse : ${myData.address} et de ${myData.balance} AVAX`}</p>}</div>
}

export default GetBalance
