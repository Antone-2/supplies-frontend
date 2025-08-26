import React, { ReactNode } from 'react';
import { AuthProvider as BaseAuthProvider } from '../context/AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  return <BaseAuthProvider>{children}</BaseAuthProvider>;
};

export default AuthProvider;