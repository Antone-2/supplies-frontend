import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

interface AdminUser {
    id: string;
    email: string;
    name: string;
    role: 'admin' | 'super_admin';
    permissions: string[];
    lastLogin: string;
    active: boolean;
}

interface AdminAuthContextType {
    admin: AdminUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    refreshToken: () => Promise<void>;
    hasPermission: (permission: string) => boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const API_URL = import.meta.env.VITE_API_URL;

export function AdminAuthProvider({ children }: { children: ReactNode }) {
    const [admin, setAdmin] = useState<AdminUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [token, setToken] = useState<string | null>(
        localStorage.getItem('adminAuthToken')
    );

    // Auto-login on app start if token exists
    useEffect(() => {
        const initAuth = async () => {
            const storedToken = localStorage.getItem('adminAuthToken');
            if (storedToken) {
                setToken(storedToken);
                try {
                    await getCurrentAdmin(storedToken);
                } catch (error) {
                    console.error('Admin auto-login failed:', error);
                    logout();
                }
            }
            setIsLoading(false);
        };
        initAuth();
    }, []);

    const getCurrentAdmin = async (authToken: string) => {
        const response = await fetch(`${API_URL}/admin/auth/me`, {
            headers: {
                'Authorization': `Bearer ${authToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to get admin info');
        }

        const adminData = await response.json();
        setAdmin(adminData.admin);
        return adminData.admin;
    };

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/admin/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Admin login failed');
            }

            const { admin: adminData, token: authToken } = data;
            
            // Validate that the user has admin role
            if (adminData.role !== 'admin' && adminData.role !== 'super_admin') {
                throw new Error('Access denied. Admin privileges required.');
            }
            
            setAdmin(adminData);
            setToken(authToken);
            localStorage.setItem('adminAuthToken', authToken);

            toast.success('Welcome back, Admin!', {
                description: `Logged in as ${adminData.name}`,
            });

        } catch (error) {
            console.error('Admin login failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem('adminRefreshToken');
        if (!refreshToken) {
            throw new Error('No refresh token available');
        }

        try {
            const response = await fetch(`${API_URL}/admin/auth/refresh`, {
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
            localStorage.setItem('adminAuthToken', data.token);
            
            return data.token;
        } catch (error) {
            logout();
            throw error;
        }
    };

    const logout = () => {
        setAdmin(null);
        setToken(null);
        localStorage.removeItem('adminAuthToken');
        localStorage.removeItem('adminRefreshToken');
        
        toast.info('Logged out', {
            description: 'You have been logged out of the admin panel.',
        });
    };

    const hasPermission = (permission: string): boolean => {
        if (!admin) return false;
        if (admin.role === 'super_admin') return true;
        return admin.permissions.includes(permission);
    };

    const value: AdminAuthContextType = {
        admin,
        isAuthenticated: !!admin && !!token,
        isLoading,
        token,
        login,
        logout,
        refreshToken,
        hasPermission
    };

    return (
        <AdminAuthContext.Provider value={value}>
            {children}
        </AdminAuthContext.Provider>
    );
}

export function useAdminAuth() {
    const context = useContext(AdminAuthContext);
    if (context === undefined) {
        throw new Error('useAdminAuth must be used within an AdminAuthProvider');
    }
    return context;
}