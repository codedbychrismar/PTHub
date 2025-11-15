// src/store/themeStore.ts
// Theme state management with persistence

import { getTheme, setTheme as saveTheme } from '@/utils/storage';
import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface ThemeState {
  theme: Theme;
  isLoading: boolean;

  // Actions
  setTheme: (theme: Theme) => Promise<void>;
  toggleTheme: () => Promise<void>;
  loadTheme: () => Promise<void>;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: 'dark', // Default theme
  isLoading: true,

  setTheme: async (theme: Theme) => {
    try {
      await saveTheme(theme);
      set({ theme });
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  },

  toggleTheme: async () => {
    const currentTheme = get().theme;
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    await get().setTheme(newTheme);
  },

  loadTheme: async () => {
    try {
      const savedTheme = await getTheme();
      if (savedTheme) {
        set({ theme: savedTheme, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Error loading theme:', error);
      set({ isLoading: false });
    }
  },
}));
