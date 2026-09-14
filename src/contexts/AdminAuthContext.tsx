import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { getAdminToken, setAdminToken, clearAdminToken } from '../api/adminAuth';

interface AdminAuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!getAdminToken());

  const login = (token: string) => {
    setAdminToken(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    clearAdminToken();
    setIsAuthenticated(false);
  };

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout }}>
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
