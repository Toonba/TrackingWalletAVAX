import React from 'react'
import ReactDOM from 'react-dom/client'
import './Styles/index.css'
import { Provider } from 'react-redux'
import store from './Store/store'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import TrackingWallet from './Pages/TrackingWallet/trackingWallet'
import Home from './Pages/Home/home'
import Header from './Components/Header/header'
import Redacted from './Pages/Redacted/redacted'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/tracking-wallet" element={<TrackingWallet />}></Route>
          <Route path="/redacted" element={<Redacted />}></Route>
        </Routes>
      </Router>
  </Provider>
)
