import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import BankingDashboard from './pages/BankingDashboard'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
  <Route path="/" element={<BankingDashboard />} />
</Routes>
    </>
  )
}

export default App
