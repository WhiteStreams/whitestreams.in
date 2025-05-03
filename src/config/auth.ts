import { createContext, useContext } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: async () => false,
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

// In production, replace with proper authentication
export const login = async (password: string): Promise<boolean> => {
  if (password === process.env.ADMIN_PASSWORD || password === 'admin123') {
    localStorage.setItem('isAdmin', 'true');
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem('isAdmin');
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem('isAdmin') === 'true';
};