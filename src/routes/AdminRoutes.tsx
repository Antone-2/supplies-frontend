import { Routes, Route } from 'react-router-dom';
import { AdminAuthProvider } from '@/context/AdminAuthContext';
import AdminProtectedRoute from '@/components/admin/AdminProtectedRoute';
import AdminLayout from '@/layouts/AdminLayout';
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import UsersManager from '@/pages/admin/UsersManager';
import OrdersManager from '@/pages/admin/OrdersManager';

// Example of how to set up the admin routes in your main App component
const AdminRoutes = () => {
    return (
        <AdminAuthProvider>
            <Routes>
                {/* Public admin route - login */}
                <Route path="/admin/login" element={<AdminLogin />} />
                
                {/* Protected admin routes */}
                <Route path="/admin" element={
                    <AdminProtectedRoute>
                        <AdminLayout />
                    </AdminProtectedRoute>
                }>
                    <Route index element={<AdminDashboard />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    
                    <Route 
                        path="users" 
                        element={
                            <AdminProtectedRoute requiredPermission="manage_users">
                                <UsersManager />
                            </AdminProtectedRoute>
                        } 
                    />
                    
                    <Route 
                        path="orders" 
                        element={
                            <AdminProtectedRoute requiredPermission="manage_orders">
                                <OrdersManager />
                            </AdminProtectedRoute>
                        } 
                    />
                    
                    {/* Add more protected routes as needed */}
                </Route>
            </Routes>
        </AdminAuthProvider>
    );
};

export default AdminRoutes;