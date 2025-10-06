import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
    id: string;
    email: string;
    name: string;
    role: 'user' | 'admin';
    phone?: string;
    address?: {
        street?: string;
        city?: string;
        county?: string;
        country?: string;
    };
}

interface RegisterData {
    name: string;
    email: string;
    password: string;
    phone?: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    register: (userData: RegisterData) => Promise<void>;
    updateProfile: (userData: Partial<User>) => Promise<void>;
    refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = import.meta.env.VITE_API_URL;

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [token, setToken] = useState<string | null>(
        localStorage.getItem('authToken')
    );

    // Auto-login on app start if token exists
    useEffect(() => {
        const initAuth = async () => {
            const storedToken = localStorage.getItem('authToken');
            if (storedToken) {
                setToken(storedToken);
                try {
                    await getCurrentUser(storedToken);
                } catch (error) {
                    console.error('Auto-login failed:', error);
                    logout();
                }
            }
        };
        initAuth();
    }, []);

    const getCurrentUser = async (authToken: string) => {
        const response = await fetch(`${API_URL}/auth/me`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to get user info');
        }

        const userData = await response.json();
        setUser(userData.user);
        return userData.user;
    };

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            const { user: userData, token: authToken } = data;

            setUser(userData);
            setToken(authToken);
            localStorage.setItem('authToken', authToken);

        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (userData: RegisterData) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            const { user: newUser, token: authToken } = data;

            setUser(newUser);
            setToken(authToken);
            localStorage.setItem('authToken', authToken);

        } catch (error) {
            console.error('Registration failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const updateProfile = async (userData: Partial<User>) => {
        if (!token) {
            throw new Error('Not authenticated');
        }

        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/auth/profile`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Profile update failed');
            }

            setUser(data.user);
        } catch (error) {
            console.error('Profile update failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        try {
            const response = await fetch(`${API_URL}/auth/refresh`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ refreshToken })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error('Token refresh failed');
            }

            setToken(data.token);
            localStorage.setItem('authToken', data.token);

            return data.token;
        } catch (error) {
            logout();
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
    };

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user && !!token,
        isLoading,
        token,
        login,
        logout,
        register,
        updateProfile,
        refreshToken
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}