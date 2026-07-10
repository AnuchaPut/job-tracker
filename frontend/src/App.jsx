import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import ApplicationForm from './pages/ApplicationForm'

// Week 5 note: this is where you'll add a <ProtectedRoute> wrapper
// once auth exists, and a /login + /register route.
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/new" element={<ApplicationForm />} />
        <Route path="/edit/:id" element={<ApplicationForm />} />
      </Routes>
    </BrowserRouter>
  )
}
