import { configureStore } from '@reduxjs/toolkit'

const initialState = {
  inputValue: null,
  data: [],
  selectRangeValue: 7
}

export const setInputValue = (value) => ({
  type: 'setInputValue',
  payload: value
})

export const setDataValue = (value) => ({
  type: 'setDataValue',
  payload: value
})

export const setSelectRangeValue = (value) => ({
  type: 'setSelectRangeValue',
  payload: value
})

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'setInputValue':
      return { ...state, inputValue: action.payload }
    case 'setDataValue':
      return {
        ...state,
        data: action.payload
      }
    case 'setSelectRangeValue':
      return { ...state, selectRangeValue: action.payload }
    default:
      return state
  }
}

const store = configureStore({ reducer: reducer })

export default store
