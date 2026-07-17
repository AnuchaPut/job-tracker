import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import ApplicationForm from './pages/ApplicationForm'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import  ProtectedRoute  from './security/ProtectedRoute'
import Navbar from './pages/Navbar'
import MainLayouts from './layouts/MainLayouts'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route element={<MainLayouts />}>

          <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />

          <Route path="/new" element={
              <ProtectedRoute>
                <ApplicationForm />
              </ProtectedRoute>
            } 
          />

          <Route path="/edit/:id" element={
              <ProtectedRoute>
                <ApplicationForm />
              </ProtectedRoute>
            } 
          />
        </Route>
  
      </Routes>
    </BrowserRouter>
  )
}
