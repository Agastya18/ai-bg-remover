import { useState } from 'react'
import Home from './pages/Home'
import Result from './pages/Result'
import BuyCredit from './pages/BuyCredit'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
function App() {


  return (
   <div>
  <Navbar/>
   <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/result" element={<Result />} />
      <Route path="/buy" element={<BuyCredit />} />

   </Routes>
   </div>
  )
}

export default App
