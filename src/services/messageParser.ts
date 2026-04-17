// src/services/messageParser.ts
// Parses bot responses for special tags

import { getProductsByIds } from '../constants/products';
import { ChatMessage, OrderData, Product } from '../types';

/** Parse [PRODUCTS: id1, id2, id3] tag */
export const parseProducts = (text: string): Product[] | null => {
  const match = text.match(/\[PRODUCTS:\s*([^\]]+)\]/);
  if (!match) return null;
  const ids = match[1].split(',').map(id => id.trim());
  return getProductsByIds(ids);
};

/** Parse [CONFIRM_ORDER|key=value|...] tag */
export const parseConfirmOrder = (text: string): OrderData | null => {
  const match = text.match(/\[CONFIRM_ORDER\|([^\]]+)\]/);
  if (!match) return null;
  const pairs = match[1].split('|');
  const data: any = {};
  pairs.forEach(pair => {
    const [k, v] = pair.split('=');
    if (k && v) data[k.trim()] = v.trim();
  });
  return data as OrderData;
};

/** Parse [ORDER_PLACED|key=value|...] tag */
export const parseOrderPlaced = (text: string): OrderData | null => {
  const match = text.match(/\[ORDER_PLACED\|([^\]]+)\]/);
  if (!match) return null;
  const pairs = match[1].split('|');
  const data: any = {};
  pairs.forEach(pair => {
    const [k, v] = pair.split('=');
    if (k && v) data[k.trim()] = v.trim();
  });
  return data as OrderData;
};

/** Remove all special tags from text */
export const cleanMessage = (text: string): string => {
  return text
    .replace(/\[PRODUCTS:[^\]]+\]/g, '')
    .replace(/\[CONFIRM_ORDER[^\]]+\]/g, '')
    .replace(/\[ORDER_PLACED[^\]]+\]/g, '')
    .replace(/\*\*/g, '')
    .trim();
};

/** Determine the message type based on parsed content */
export const parseMessageType = (text: string): {
  type: ChatMessage['type'];
  products?: Product[];
  orderData?: OrderData;
  cleanText: string;
} => {
  const products = parseProducts(text);
  const confirmOrder = parseConfirmOrder(text);
  const orderPlaced = parseOrderPlaced(text);

  if (orderPlaced) {
    return { type: 'orderPlaced', orderData: orderPlaced, cleanText: cleanMessage(text) };
  }
  if (confirmOrder) {
    return { type: 'orderSummary', orderData: confirmOrder, cleanText: cleanMessage(text) };
  }
  if (products && products.length > 0) {
    return { type: 'products', products, cleanText: cleanMessage(text) };
  }
  return { type: 'text', cleanText: cleanMessage(text) };
};
