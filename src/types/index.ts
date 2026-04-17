// src/types/index.ts
// All TypeScript interfaces for ShopBot AI

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  category: string;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  description: string;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type MessageRole = 'user' | 'bot';
export type MessageType = 'text' | 'products' | 'question' | 'orderSummary' | 'orderPlaced';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  type: MessageType;
  content: string;
  products?: Product[];
  orderData?: OrderData;
  timestamp: Date;
}

export interface OrderData {
  product: string;
  price: string;
  delivery: string;
  savings?: string;
  orderId?: string;
}

export type Language = 'en' | 'hi';

export interface QuickButton {
  id: string;
  label: string;
  icon: string;
}
