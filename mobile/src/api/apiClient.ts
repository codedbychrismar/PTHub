// src/api/client.ts
// Axios API client setup with interceptors for Expo

import { clearStorage, getStoredToken } from '@/utils/storage';
import axios, {
  AxiosError,
  AxiosInstance,
  InternalAxiosRequestConfig,
} from 'axios';
import Constants from 'expo-constants';

// Get API base URL from app.json extra config or fallback
const API_BASE_URL =
  Constants.expoConfig?.extra?.apiBaseUrl || 'https://api.ibulakan.com/v1';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor - Add auth token to requests
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const token = await getStoredToken();

      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Log request in development
      if (__DEV__) {
        console.log('📤 API Request:', {
          method: config.method?.toUpperCase(),
          url: config.url,
          data: config.data,
        });
      }

      return config;
    } catch (error) {
      console.error('Error in request interceptor:', error);
      return config;
    }
  },
  (error: AxiosError) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
apiClient.interceptors.response.use(
  (response) => {
    // Log response in development
    if (__DEV__) {
      console.log('📥 API Response:', {
        url: response.config.url,
        status: response.status,
        data: response.data,
      });
    }
    return response;
  },
  async (error: AxiosError) => {
    // Log error in development
    if (__DEV__) {
      console.error('❌ API Error:', {
        url: error.config?.url,
        status: error.response?.status,
        message: error.message,
        data: error.response?.data,
      });
    }

    // Handle 401 Unauthorized - Token expired or invalid
    if (error.response?.status === 401) {
      // Clear stored credentials
      await clearStorage();

      return Promise.reject({
        message: 'Your session has expired. Please login again.',
        code: 'SESSION_EXPIRED',
      });
    }

    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      return Promise.reject({
        message: 'You do not have permission to perform this action.',
        code: 'FORBIDDEN',
      });
    }

    // Handle 404 Not Found
    if (error.response?.status === 404) {
      return Promise.reject({
        message: 'The requested resource was not found.',
        code: 'NOT_FOUND',
      });
    }

    // Handle 500 Internal Server Error
    if (error.response?.status === 500) {
      return Promise.reject({
        message: 'Something went wrong on our end. Please try again later.',
        code: 'SERVER_ERROR',
      });
    }

    // Handle network errors
    if (!error.response) {
      return Promise.reject({
        message: 'Network error. Please check your internet connection.',
        code: 'NETWORK_ERROR',
      });
    }

    // Return error response data or generic error
    return Promise.reject(
      error.response?.data || {
        message: 'An unexpected error occurred.',
        code: 'UNKNOWN_ERROR',
      }
    );
  }
);

export default apiClient;

// Helper type for API error responses
export interface ApiError {
  message: string;
  code: string;
  details?: unknown;
}

// Helper type for paginated responses
export interface PaginatedResponse<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNext: boolean;
  hasPrevious: boolean;
}
