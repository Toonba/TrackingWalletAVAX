import { configureStore } from '@reduxjs/toolkit'
import Web3 from 'web3'

const initialState = {
  inputValue: null
}

export const setInputValue = (value) => ({
  type: 'setInputValue',
  payload: value
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'setInputValue':
      return { ...state, inputValue: action.payload }
    default:
      return state
  }
}

const store = configureStore({ reducer: reducer })

export default store