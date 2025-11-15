// src/types/user.types.ts
// User and Authentication related types

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  birthday: string;
  age: number;
  gender: string;
  civilStatus: string;
  category: string;
  address: string;
  barangay: string;
  city: string;
  province: string;
  postalCode: string;
  profileImage?: string;
  isBulakanResident: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  token: string;
  user: User;
}

export interface RegisterRequest {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  birthday: string;
  age: number;
  gender: string;
  civilStatus: string;
  category: string;
  address: string;
  barangay: string;
  city: string;
  province: string;
  postalCode: string;
  password: string;
  isBulakanResident: boolean;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
  userId: string;
}

export interface OTPVerifyRequest {
  userId: string;
  otp: string;
}

export interface OTPVerifyResponse {
  success: boolean;
  message: string;
}

export interface ResetPasswordRequest {
  email: string;
  newPassword: string;
  otp: string;
}

export interface EditProfileRequest {
  firstName?: string;
  lastName?: string;
  phone?: string;
  birthday?: string;
  gender?: string;
  civilStatus?: string;
  address?: string;
  barangay?: string;
  profileImage?: string;
}

export interface EditProfileResponse {
  success: boolean;
  message: string;
  user: User;
}

// Local storage user type
export interface UserLocal {
  id: string;
  email: string;
  token: string;
  isLoggedIn: boolean;
}

// Dropdown options type (used in registration)
export interface DropdownOption {
  id: string;
  label: string;
  value: string;
}
