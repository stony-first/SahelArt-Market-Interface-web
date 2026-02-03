export enum Category {
  TEXTILE = 'Textile',
  BIJOUX = 'Bijoux',
  DECORATION = 'Décoration',
  ALIMENTATION = 'Alimentation',
  ART = 'Art',
}

export interface Artisan {
  id: string;
  name: string;
  location: string;
  bio: string;
  photoUrl: string;
  specialty: string;
  rating: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  artisanId: string;
  artisanName: string; // Denormalized for easier display
  description: string;
  materials: string[];
  images: string[];
  rating: number;
  reviewsCount: number;
  isNew?: boolean;
  isPopular?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
  favorites: string[]; // Product IDs
}

export interface Order {
  id: string;
  date: string;
  total: number;
  status: 'En cours' | 'Livré' | 'Annulé';
  items: CartItem[];
}

export type ViewState = 
  | 'HOME' 
  | 'CATALOG' 
  | 'PRODUCT_DETAIL' 
  | 'CART' 
  | 'CHECKOUT' 
  | 'PROFILE' 
  | 'ARTISAN_DASHBOARD'
  | 'ARTISAN_PROFILE';
