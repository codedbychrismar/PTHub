// src/utils/storage.ts
// Secure storage utilities using Expo SecureStore

import * as SecureStore from 'expo-secure-store';

// Storage keys
const STORAGE_KEYS = {
  USER: 'user',
  TOKEN: 'token',
  IS_LOGGED_IN: 'isLoggedIn',
  IS_ONBOARDED: 'isOnboarded',
} as const;

// Generic storage functions
export const setItem = async (key: string, value: string): Promise<void> => {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch (error) {
    console.error(`Error setting item ${key}:`, error);
    throw error;
  }
};

export const getItem = async (key: string): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error(`Error getting item ${key}:`, error);
    return null;
  }
};

export const removeItem = async (key: string): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error(`Error removing item ${key}:`, error);
    throw error;
  }
};

export const clearStorage = async (): Promise<void> => {
  try {
    await Promise.all([
      removeItem(STORAGE_KEYS.USER),
      removeItem(STORAGE_KEYS.TOKEN),
      removeItem(STORAGE_KEYS.IS_LOGGED_IN),
      // Keep onboarding state
    ]);
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
};

// User
export const setUser = async (user: object): Promise<void> => {
  try {
    await setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  } catch (error) {
    console.error('Error setting user:', error);
    throw error;
  }
};

export const getUser = async (): Promise<object | null> => {
  try {
    const user = await getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
};

export const removeUser = async (): Promise<void> => {
  await removeItem(STORAGE_KEYS.USER);
};

// Token
export const setToken = async (token: string): Promise<void> => {
  await setItem(STORAGE_KEYS.TOKEN, token);
};

export const getStoredToken = async (): Promise<string | null> => {
  return await getItem(STORAGE_KEYS.TOKEN);
};

export const removeToken = async (): Promise<void> => {
  await removeItem(STORAGE_KEYS.TOKEN);
};

// Login state
export const setIsLoggedIn = async (isLoggedIn: boolean): Promise<void> => {
  await setItem(STORAGE_KEYS.IS_LOGGED_IN, isLoggedIn.toString());
};

export const getIsLoggedIn = async (): Promise<boolean> => {
  const isLoggedIn = await getItem(STORAGE_KEYS.IS_LOGGED_IN);
  return isLoggedIn === 'true';
};

// Onboarding state
export const setIsOnboarded = async (isOnboarded: boolean): Promise<void> => {
  await setItem(STORAGE_KEYS.IS_ONBOARDED, isOnboarded.toString());
};

export const getIsOnboarded = async (): Promise<boolean> => {
  const isOnboarded = await getItem(STORAGE_KEYS.IS_ONBOARDED);
  return isOnboarded === 'true';
};

// Logout function - clears all user-related data
export const logout = async (): Promise<void> => {
  try {
    await removeUser();
    await removeToken();
    await setIsLoggedIn(false);
    // Keep onboarding state
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};
