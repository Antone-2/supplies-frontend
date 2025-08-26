import React, { ReactNode } from 'react';
import { ThemeProvider as BaseThemeProvider } from '../context/ThemeContext';

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return <BaseThemeProvider>{children}</BaseThemeProvider>;
};

export default ThemeProvider;