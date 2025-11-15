// src/utils/cn.ts
// Utility for merging Tailwind classes

import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with proper precedence
 * Handles conditional classes and removes conflicts
 * 
 * @example
 * cn('p-4 bg-red-500', condition && 'bg-blue-500')
 * // Returns: 'p-4 bg-blue-500' (blue wins)
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
