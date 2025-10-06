import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import AdminLayout from './AdminLayout';
import Dashboard from '../../pages/admin/Dashboard';
import ProductsManager from '../../pages/admin/ProductsManager';
import OrdersManager from '../../pages/admin/OrdersManager';
import UsersManager from '../../pages/admin/UsersManager';

const AdminRoutes: React.FC = () => {
    // const { user, isAuthenticated } = useAuth();

    // Check if user is admin (temporarily disabled for preview)
    // if (!isAuthenticated || user?.role !== 'admin') {
    //     return <Navigate to="/auth" replace />;
    // }

    return (
        <Routes>
            <Route path="/" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="products" element={<ProductsManager />} />
                <Route path="orders" element={<OrdersManager />} />
                <Route path="users" element={<UsersManager />} />
            </Route>
        </Routes>
    );
};

export default AdminRoutes;