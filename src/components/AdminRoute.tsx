import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, isLoading } = useAuth();
    if (isLoading) return <p>Loading...</p>;
    if (!user || user.role !== 'admin') return <Navigate to="/" replace />;
    return <>{children}</>;
};

export default AdminRoute;
