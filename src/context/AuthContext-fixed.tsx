import React, { createContext, useContext, useReducer, useEffect } from 'react';
import apiClient from '../config/apiClient';

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
    phone?: string;
    address?: {
        street: string;
        city: string;
        phone: string;
    };
}

interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
}

type AuthAction =
    | { type: 'LOGIN_START' }
    | { type: 'LOGIN_SUCCESS'; payload: { user: User; token: string } }
    | { type: 'LOGIN_FAILURE' }
    | { type: 'LOGOUT' }
    | { type: 'UPDATE_USER'; payload: User }
    | { type: 'SET_LOADING'; payload: boolean };

const AuthContext = createContext<{
    user: User | null;
    token: string | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (userData: any) => Promise<void>;
    logout: () => void;
    updateUser: (userData: any) => Promise<void>;
    checkAuth: () => Promise<void>;
} | undefined>(undefined);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'LOGIN_START':
            return { ...state, isLoading: true };
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: true,
                isLoading: false,
            };
        case 'LOGIN_FAILURE':
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
            };
        case 'LOGOUT':
            return {
                ...state,
                user: null,
                token: null,
                isAuthenticated: false,
                isLoading: false,
            };
        case 'UPDATE_USER':
            return { ...state, user: action.payload };
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        default:
            return state;
    }
};

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        token: localStorage.getItem('token'),
        isLoading: false,
        isAuthenticated: false,
    });

    useEffect(() => {
        if (state.token) {
            checkAuth();
        }
    }, []);

    const login = async (email: string, password: string) => {
        dispatch({ type: 'LOGIN_START' });
        try {
            const response = await apiClient.post('/auth/login', { email, password });
            const { user, token } = response.data;

            localStorage.setItem('token', token);
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
        } catch (error) {
            dispatch({ type: 'LOGIN_FAILURE' });
            throw error;
        }
    };

    const register = async (userData: any) => {
        dispatch({ type: 'LOGIN_START' });
        try {
            const response = await apiClient.post('/auth/register', userData);
            const { user, token } = response.data;

            localStorage.setItem('token', token);
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            dispatch({ type: 'LOGIN_SUCCESS', payload: { user, token } });
        } catch (error) {
            dispatch({ type: 'LOGIN_FAILURE' });
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        delete apiClient.defaults.headers.common['Authorization'];
        dispatch({ type: 'LOGOUT' });
    };

    const updateUser = async (userData: any) => {
        try {
            const response = await apiClient.put('/auth/profile', userData);
            dispatch({ type: 'UPDATE_USER', payload: response.data });
        } catch (error) {
            throw error;
        }
    };

    const checkAuth = async () => {
        try {
            const response = await apiClient.get('/auth/me');
            dispatch({ type: 'LOGIN_SUCCESS', payload: { user: response.data.user, token: state.token! } });
        } catch (error) {
            dispatch({ type: 'LOGIN_FAILURE' });
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                token: state.token,
                isLoading: state.isLoading,
                isAuthenticated: state.isAuthenticated,
                login,
                register,
                logout,
                updateUser,
                checkAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export { AuthProvider };
