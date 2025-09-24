import React from 'react';
import { AuthProvider as AuthContextProvider, useAuth } from '../context/AuthContext';

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <AuthContextProvider>
            {children}
        </AuthContextProvider>
    );
};

export default AuthProvider;
