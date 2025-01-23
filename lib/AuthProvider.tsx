"use client";

import React, { useContext, useState, ReactNode, createContext, useEffect } from "react";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: { username: string } | null;
  isLoading: boolean;
  login: (userData: { username: string; token: string }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<null | { username: string }>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const userData = JSON.parse(localStorage.getItem('userData') || '{}');
      setUser(userData);

      document.cookie = `authToken=${token}; path=/`;
    }
    setIsLoading(false);
  }, []);

  const login = async (userData: { username: string; token: string }) => {
    setUser({ username: userData.username });
    localStorage.setItem('authToken', userData.token);
    localStorage.setItem('userData', JSON.stringify({ username: userData.username }));

    document.cookie = `authToken=${userData.token}; path=/`;
    
    setTimeout(() => {
      router.push('/');
      router.refresh();
    }, 100);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
    router.push('/auth');
    router.refresh(); 
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

