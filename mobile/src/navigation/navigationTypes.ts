// src/navigation/types.ts
// Navigation types for type-safe routing

import type { NavigatorScreenParams } from '@react-navigation/native';

// Auth Stack - All authentication related screens
export type AuthStackParamList = {
  Login: undefined;
};

// Main Tab Navigator
export type MainTabParamList = {
  Home: undefined;
  PTHub: undefined;
  Fuel: undefined;
};

// Root Navigator - Top level navigation
export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  Main: NavigatorScreenParams<MainTabParamList>;
};

// Helper type for navigation prop
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
