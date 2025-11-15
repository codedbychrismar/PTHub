// src/types/community.types.ts
// Post, News, Announcement, and Community feature types

export interface Post {
  id: string;
  userId: string;
  userFirstName: string;
  userLastName: string;
  userProfileImage?: string;
  content: string;
  images: string[];
  location?: string;
  type: 'barangay' | 'municipal';
  barangay?: string;
  likesCount: number;
  commentsCount: number;
  isLiked: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  id: string;
  postId: string;
  userId: string;
  userFirstName: string;
  userLastName: string;
  userProfileImage?: string;
  content: string;
  createdAt: string;
}

export interface CreatePostRequest {
  content: string;
  images?: string[];
  location?: string;
  type: 'barangay' | 'municipal';
  barangay?: string;
}

export interface Announcement {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  source: string;
  type: 'barangay' | 'municipal';
  barangay?: string;
  publishedAt: string;
  expiresAt?: string;
}

export interface News {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  sourceUrl: string;
  source: string;
  publishedAt: string;
}

export interface Directory {
  id: string;
  name: string;
  category: string;
  phoneNumbers: string[];
  email?: string;
  address?: string;
  description?: string;
  imageUrl?: string;
  barangay?: string;
}

export interface HealthFacility {
  id: string;
  name: string;
  type: string;
  address: string;
  phoneNumber?: string;
  email?: string;
  services: string[];
  operatingHours?: string;
  imageUrl?: string;
  latitude?: number;
  longitude?: number;
}

export interface School {
  id: string;
  name: string;
  type: string;
  address: string;
  phoneNumber?: string;
  email?: string;
  website?: string;
  imageUrl?: string;
}

export interface TouristSpot {
  id: string;
  name: string;
  description: string;
  location: string;
  category: string;
  contactNumber?: string;
  contactEmail?: string;
  entranceFee?: string;
  operatingHours?: string;
  images: string[];
  latitude?: number;
  longitude?: number;
}

export interface Job {
  id: string;
  title: string;
  company: string;
  description: string;
  requirements: string[];
  location: string;
  salary?: string;
  employmentType: string;
  contactEmail?: string;
  contactPhone?: string;
  postedAt: string;
  expiresAt?: string;
}

export interface Business {
  id: string;
  name: string;
  category: string;
  description: string;
  address: string;
  phoneNumber?: string;
  email?: string;
  website?: string;
  imageUrl?: string;
  operatingHours?: string;
  services: string[];
}

export interface Vehicle {
  id: string;
  type: string;
  routeName: string;
  routeDescription: string;
  fare: string;
  operatingHours: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  category: 'government' | 'bulakan';
  iconUrl?: string;
  websiteUrl: string;
}
