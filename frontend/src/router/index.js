import { jsx as _jsx } from "react/jsx-runtime";
import { createBrowserRouter } from 'react-router-dom';
import { Dashboard } from '../pages/Dashboard';
import { Planner } from '../pages/Planner';
import { Profile } from '../pages/Profile';
import { Login } from '../pages/Login';
import { Register } from '../pages/Register';
import { ProtectedRoute } from '../components/layout/ProtectedRoute';
import { AppLayout } from '../components/layout/AppLayout';
export const router = createBrowserRouter([
    { path: '/login', element: _jsx(Login, {}) },
    { path: '/register', element: _jsx(Register, {}) },
    {
        element: (_jsx(ProtectedRoute, { children: _jsx(AppLayout, {}) })),
        children: [
            { index: true, element: _jsx(Dashboard, {}) },
            { path: '/planner', element: _jsx(Planner, {}) },
            { path: '/profile', element: _jsx(Profile, {}) },
        ],
    },
]);
