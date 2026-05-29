import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthResponse, LoginData, RegisterData } from '../types';
import api from '../api/axios';

interface AuthContextType {
    user: User | null;
    login: (data: LoginData) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        if (token && savedUser) {
            setUser(JSON.parse(savedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (data: LoginData) => {
        const response = await api.post<AuthResponse>('/api/auth/login', data);
        const { token, name, email, role } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({ name, email, role }));
        setUser({ name, email, role });
    };

    const register = async (data: RegisterData) => {
        const response = await api.post<AuthResponse>('/api/auth/register', data);
        const { token, name, email, role } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify({ name, email, role }));
        setUser({ name, email, role });
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
}
