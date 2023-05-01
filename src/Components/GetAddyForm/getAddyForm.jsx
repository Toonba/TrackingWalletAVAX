import '../../Styles/getAddyForm.css'
import { useDispatch } from 'react-redux'
import { setInputValue } from '../../Store/store'
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getBalance } from '../../Service/web3'

/**
 *
 * @returns {React.Component} form once submited give the current balance of address given as input
 */

function GetAddyForm() {
  const dispatch = useDispatch()
  const [address, setAddress] = useState('')
  const inputValue = useSelector((state) => state.inputValue)

  const [myData, setMyData] = useState({ address: inputValue, balance: 0, date: null })

  const handleInputChange = (event) => {
    setAddress(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(setInputValue(address))
  }
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await getBalance(inputValue)
      setMyData(result)
    }

    fetchData()
  }, [inputValue])

  return (
    <section className="getAddyForm">
      <h2>Did you manage to grow your <span className='avax'>AVAX</span> bag Anon ? </h2>
      <p>Drop your addy bellow to figure it out </p>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="addy">What's your addy</label>
        <input type="text" id="addy" name="addy" onChange={handleInputChange} value={address} placeholder="Anon I NEED an addy to work"/>
        <button>Show me</button>
      </form>
      {myData.address === null ? null : <p>{`Your current balance is ${myData.balance} AVAX`}</p>}
    </section>
  )
}

export default GetAddyForm
