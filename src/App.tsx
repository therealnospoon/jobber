import { Routes, Route } from 'react-router-dom'

import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Applications from './pages/Applications'
import ResumeWorkshop from './pages/ResumeWorkshop'
import Statistics from './pages/Statistics'

function App() {
  return (
    <div className="flex h-screen bg-zinc-100 text-zinc-700 overflow-hidden">

      {/* Add a Routes component with two Route components */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-50 via-zinc-100 to-zinc-50 opacity-80"/>
        <div className="absolute inset-0 backdrop-blur-sm"/>
      </div>

      <Sidebar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/resumeworkshop" element={<ResumeWorkshop />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/resumeworkshop" element={<ResumeWorkshop />} />
      </Routes>
    </div>
  )
}

export default App
