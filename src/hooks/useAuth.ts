// Simple Authentication Hook - No complications!
import { useState } from 'react';

// Simple user type
export interface User {
    id: string;
    email: string;
    name: string;
    role: 'user' | 'admin';
    phone?: string;
    avatar?: string;
}

// Simple auth hook - no context needed for now
export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            // Simple mock login - accepts any email/password for demo
            console.log('Login attempt:', email, password);

            const mockUser: User = {
                id: '1',
                email: email,
                name: 'Demo User',
                role: email.includes('admin') ? 'admin' : 'user'
            };

            setUser(mockUser);
            localStorage.setItem('user', JSON.stringify(mockUser));
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const register = async (userData: any) => {
        // Simple mock register
        await login(userData.email, userData.password);
    };

    // Load user from localStorage on first use
    if (!user) {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }

    return {
        user,
        login,
        logout,
        register,
        isLoading,
        isAuthenticated: !!user,
        // Compatibility aliases
        loading: isLoading,
        signIn: login,
        signOut: logout,
        updateUser: async () => { },
        profile: user,
        isAdmin: user?.role === 'admin'
    };
}

// Simple AuthProvider - just a wrapper for now
export function AuthProvider({ children }: { children: any }) {
    return children;
}