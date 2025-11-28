import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
const AuthContext = createContext(undefined);
export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem('fitmind_token'));
    useEffect(() => {
        const handleStorage = () => setToken(localStorage.getItem('fitmind_token'));
        window.addEventListener('storage', handleStorage);
        return () => window.removeEventListener('storage', handleStorage);
    }, []);
    const isAuthenticated = useMemo(() => {
        if (!token)
            return false;
        try {
            const decoded = jwtDecode(token);
            return decoded.exp * 1000 > Date.now();
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }, [token]);
    const login = (nextToken) => {
        localStorage.setItem('fitmind_token', nextToken);
        setToken(nextToken);
    };
    const logout = () => {
        localStorage.removeItem('fitmind_token');
        setToken(null);
    };
    const value = useMemo(() => ({ token, isAuthenticated, login, logout }), [token, isAuthenticated]);
    return _jsx(AuthContext.Provider, { value: value, children: children });
}
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
