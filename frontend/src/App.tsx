import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { AuthProvider } from './hooks/useAuth'
import { FitnessProvider } from './context/FitnessContext'

export default function App() {
  return (
    <AuthProvider>
      <FitnessProvider>
        <RouterProvider router={router} />
      </FitnessProvider>
    </AuthProvider>
  )
}
