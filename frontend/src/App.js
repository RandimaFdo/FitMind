import { jsx as _jsx } from "react/jsx-runtime";
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { AuthProvider } from './hooks/useAuth';
import { FitnessProvider } from './context/FitnessContext';
export default function App() {
    return (_jsx(AuthProvider, { children: _jsx(FitnessProvider, { children: _jsx(RouterProvider, { router: router }) }) }));
}
