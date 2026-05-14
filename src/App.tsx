import { useAuth } from './hooks/use-auth'
import { LandingPage } from './pages/LandingPage'
import { DashboardPage } from './pages/DashboardPage'
import ResearchLabLayout from './pages/ResearchLab/Layout'
import Overview from './pages/ResearchLab/Overview'
import PromptStressLab from './pages/ResearchLab/PromptStressLab'
import { Navbar } from './components/layout/Navbar'
import { Toaster } from 'react-hot-toast'
import { Loader2 } from 'lucide-react'
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'

function AppContent() {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {!location.pathname.startsWith('/research') && <Navbar />}
      <main>
        <Routes>
          <Route path="/" element={isAuthenticated ? <DashboardPage /> : <LandingPage />} />
          
          {/* Research Lab Routes */}
          <Route 
            path="/research" 
            element={isAuthenticated ? <ResearchLabLayout /> : <Navigate to="/" />}
          >
            <Route index element={<Overview />} />
            <Route path="benchmarks" element={<PromptStressLab />} />
            {/* Stubs for other routes */}
            <Route path="evaluation" element={<div className="text-muted-foreground p-8">Evaluation Center - Coming Soon</div>} />
            <Route path="identities" element={<div className="text-muted-foreground p-8">Identity Hub - Coming Soon</div>} />
            <Route path="comparison" element={<div className="text-muted-foreground p-8">Comparison Lab - Coming Soon</div>} />
            <Route path="analytics" element={<div className="text-muted-foreground p-8">Training Insights - Coming Soon</div>} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
      <Toaster position="bottom-right" />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App