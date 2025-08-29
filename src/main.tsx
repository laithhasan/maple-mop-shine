import { createRoot } from 'react-dom/client'
import { lazy, Suspense } from 'react'
import './index.css'

// Lazy load the main App component
const App = lazy(() => import('./App.tsx'))

// Simple loading component
const Loading = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
)

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<Loading />}>
    <App />
  </Suspense>
);
