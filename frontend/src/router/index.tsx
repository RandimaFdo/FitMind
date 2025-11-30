import { createBrowserRouter } from 'react-router-dom'
import { Dashboard } from '../pages/Dashboard'
import { Planner } from '../pages/Planner'
import { Profile } from '../pages/Profile'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { ProtectedRoute } from '../components/layout/ProtectedRoute'
import { AppLayout } from '../components/layout/AppLayout'

export const router = createBrowserRouter([
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  {
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: '/planner', element: <Planner /> },
      { path: '/profile', element: <Profile /> },
    ],
  },
])
