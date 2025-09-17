import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import axios from 'axios';

function getApiBase(): string {
  const envUrl = (import.meta.env.VITE_API_URL as string) || ''
  if (envUrl) return envUrl.replace(/\/$/, '')
  const proto = typeof window !== 'undefined' ? window.location.protocol : 'http:'
  return `${proto}//localhost:6969`
}
const API_BASE_URL = getApiBase()

interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'patient' | 'practitioner' | 'admin';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (fullName: string, email: string, password: string, role?: 'patient' | 'practitioner') => Promise<void>;
  logout: () => void;
  loading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        try {
          // Verify token and get user data
          const response = await axios.get(`${API_BASE_URL}/api/v1/auth/me`, {
            headers: { Authorization: `Bearer ${storedToken}` }
          });
          setUser(response.data.user);
          setToken(storedToken);
        } catch {
          // Token is invalid, remove it
          localStorage.removeItem('token');
          setToken(null);
          setUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/v1/auth/signin`, {
        email,
        password
      });
      
      const { token: newToken, user: userData } = response.data;
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(userData);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Login failed');
      }
      throw new Error('Login failed');
    }
  };

  const signup = async (fullName: string, email: string, password: string, role: 'patient' | 'practitioner' = 'patient') => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/v1/auth/signup`, {
        fullName,
        email,
        password,
        role
      });
      
      const { token: newToken, user: userData } = response.data;
      localStorage.setItem('token', newToken);
      setToken(newToken);
      setUser(userData);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.error || 'Signup failed');
      }
      throw new Error('Signup failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    token,
    login,
    signup,
    logout,
    loading,
    isAuthenticated: !!token && !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
