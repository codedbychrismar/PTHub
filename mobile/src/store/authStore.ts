// src/store/authStore.ts
// Authentication state management using Zustand

import apiClient, { ApiError } from '@/api/apiClient';
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  User,
} from '@/types/user.types';
import {
  getIsLoggedIn,
  getStoredToken,
  getUser,
  logout as logoutStorage,
  setIsLoggedIn,
  setToken,
  setUser,
} from '@/utils/storage';
import { create } from 'zustand';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: string | null;

  // Actions
  login: (credentials: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<string>;
  logout: () => Promise<void>;
  loadUserFromStorage: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isLoggedIn: false,
  isLoading: false,
  error: null,

  login: async (credentials: LoginRequest) => {
    set({ isLoading: true, error: null });

    try {
      const response = await apiClient.post<LoginResponse>(
        '/auth/login',
        credentials
      );
      const { token, user } = response.data;

      // Save to storage
      setToken(token);
      setUser(user);
      setIsLoggedIn(true);

      // Update state
      set({
        token,
        user,
        isLoggedIn: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      const apiError = error as ApiError;
      set({
        isLoading: false,
        error: apiError.message || 'Login failed',
      });
      throw error;
    }
  },

  register: async (data: RegisterRequest) => {
    set({ isLoading: true, error: null });

    try {
      const response = await apiClient.post<RegisterResponse>(
        '/auth/register',
        data
      );
      const { userId } = response.data;

      set({
        isLoading: false,
        error: null,
      });

      return userId;
    } catch (error) {
      const apiError = error as ApiError;
      set({
        isLoading: false,
        error: apiError.message || 'Registration failed',
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true });

    try {
      // Call logout API endpoint (optional)
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('Logout API error:', error);
    } finally {
      // Clear storage
      await logoutStorage();

      // Clear state
      set({
        user: null,
        token: null,
        isLoggedIn: false,
        isLoading: false,
        error: null,
      });
    }
  },

  loadUserFromStorage: async () => {
    try {
      const token = await getStoredToken();
      const user = await getUser();
      const isLoggedIn = await getIsLoggedIn();

      if (token && user && isLoggedIn) {
        set({
          token,
          user: user as User,
          isLoggedIn,
        });
      }
    } catch (error) {
      console.error('Error loading user from storage:', error);
    }
  },

  clearError: () => {
    set({ error: null });
  },
}));
