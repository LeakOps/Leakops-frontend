'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { api, ApiUser, getToken, setToken, removeToken } from './api';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: ApiUser | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  signup: (data: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
  setAuthToken: (token: string) => Promise<void>;
  refreshUser: () => Promise<void>;
  updateProfilePicture: (file: File) => Promise<string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  const fetchProfile = useCallback(async () => {
    try {
      const res = await api.getProfile();
      if (res && res.user) {
        setUser(res.user);
      }
    } catch (err) {
      console.error('Failed to load user profile:', err);
      removeToken();
      setTokenState(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const existingToken = getToken();
    if (existingToken) {
      setTokenState(existingToken);
      fetchProfile();
    } else {
      setIsLoading(false);
    }
  }, [fetchProfile]);

  const login = async (credentials: { email: string; password: string }) => {
    setIsLoading(true);
    try {
      const res = await api.login(credentials);
      setTokenState(res.token);
      // Fetch full profile to get profile_picture_url, created_at, provider
      await fetchProfile();
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: { name: string; email: string; password: string }) => {
    setIsLoading(true);
    try {
      const res = await api.signup(data);
      setTokenState(res.token);
      await fetchProfile();
    } finally {
      setIsLoading(false);
    }
  };

  const setAuthToken = async (newToken: string) => {
    setIsLoading(true);
    setToken(newToken);
    setTokenState(newToken);
    try {
      await fetchProfile();
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    removeToken();
    setTokenState(null);
    setUser(null);
    router.push('/login');
  };

  const refreshUser = async () => {
    if (!getToken()) return;
    await fetchProfile();
  };

  const updateProfilePicture = async (file: File): Promise<string> => {
    const res = await api.uploadProfilePicture(file);
    if (res.profile_picture_url) {
      setUser((prev) => (prev ? { ...prev, profile_picture_url: res.profile_picture_url } : null));
    }
    return res.profile_picture_url;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated: !!token && !!user,
        login,
        signup,
        logout,
        setAuthToken,
        refreshUser,
        updateProfilePicture,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
