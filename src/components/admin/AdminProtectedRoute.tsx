import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '@/context/AdminAuthContext';
import { Loader2 } from 'lucide-react';

interface AdminProtectedRouteProps {
    children: ReactNode;
    requiredPermission?: string;
}

const AdminProtectedRoute = ({ children, requiredPermission }: AdminProtectedRouteProps) => {
    const { admin, isAuthenticated, isLoading, hasPermission } = useAdminAuth();
    const location = useLocation();

    // Show loading spinner while checking authentication
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
                    <p className="text-muted-foreground">Verifying admin access...</p>
                </div>
            </div>
        );
    }

    // Redirect to admin login if not authenticated
    if (!isAuthenticated || !admin) {
        return (
            <Navigate 
                to="/admin/login" 
                state={{ from: location.pathname }} 
                replace 
            />
        );
    }

    // Check specific permission if required
    if (requiredPermission && !hasPermission(requiredPermission)) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h1>
                    <p className="text-muted-foreground">
                        You don't have permission to access this section.
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                        Required permission: <code className="bg-gray-200 px-1 rounded">{requiredPermission}</code>
                    </p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
};

export default AdminProtectedRoute;