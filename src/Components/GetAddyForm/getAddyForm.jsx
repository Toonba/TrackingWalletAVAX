import '../../Styles/getAddyForm.css'
import { useDispatch } from 'react-redux'
import { setInputValue } from '../../Store/store'
import React, { useState } from 'react'

/**
 *
 * @returns {React.Component} form once submited give the current balance of address given as input
 */

function GetAddyForm() {
  const dispatch = useDispatch()
  const [address, setAddress] = useState('')

  const handleInputChange = (event) => {
    setAddress(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    dispatch(setInputValue(address))
  }

  return (
    <section className="getAddyForm">
      <h1>Check how poor you are</h1>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="addy">What's your addy</label>
        <input type="text" id="addy" name="addy" onChange={handleInputChange} value={address} />
        <button>Show me</button>
      </form>
    </section>
  )
}

export default GetAddyForm
