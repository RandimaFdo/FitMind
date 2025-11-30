import { createBrowserRouter } from 'react-router-dom'
import { Dashboard } from '../pages/Dashboard'
import { Planner } from '../pages/Planner'
import { Profile } from '../pages/Profile'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'
import { FitnessPage } from '../pages/FitnessPage'
import { GymDetails } from '../pages/GymDetails'
import { ErrorPage } from '../pages/ErrorPage'
import { ProtectedRoute } from '../components/layout/ProtectedRoute'
import { AppLayout } from '../components/layout/AppLayout'

export const router = createBrowserRouter([
  { path: '/login', element: <Login />, errorElement: <ErrorPage /> },
  { path: '/register', element: <Register />, errorElement: <ErrorPage /> },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <AppLayout />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'planner', element: <Planner /> },
      { path: 'profile', element: <Profile /> },
      { path: 'fitness', element: <FitnessPage /> },
      { path: 'fitness/gyms/:gymId', element: <GymDetails /> },
    ],
  },
  { path: '*', element: <ErrorPage /> },
])
