import { useAuth } from './hooks/use-auth'
import { LandingPage } from './pages/LandingPage'
import { DashboardPage } from './pages/DashboardPage'
import { Navbar } from './components/layout/Navbar'
import { Toaster } from 'react-hot-toast'
import { Loader2 } from 'lucide-react'

function App() {
  const { isAuthenticated, loading } = useAuth()

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-background">
        <Loader2 className="animate-spin text-primary" size={48} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Navbar />
      <main>
        {isAuthenticated ? <DashboardPage /> : <LandingPage />}
      </main>
      <Toaster position="bottom-right" />
    </div>
  )
}

export default App 