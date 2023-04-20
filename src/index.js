import React from 'react'
import ReactDOM from 'react-dom/client'
import './Styles/index.css'
import { Provider } from 'react-redux'
import store from './Store/store'
import GetAddyForm from './Components/GetAddyForm/getAddyForm'
import GetBalance from './Components/GetBalance/getBalance'
import GetHistory from './Components/GetHistory/getHistory'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <GetAddyForm />
      <GetBalance />
      <GetHistory />
    </React.StrictMode>
  </Provider>
)
