// src/hooks/useChat.ts
// Main controller: all chat state + business logic

import { useState, useCallback, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ChatMessage, Language, Product } from '../types';
import { callGroq } from '../services/groqService';
import { parseMessageType } from '../services/messageParser';
import { TRANSLATIONS } from '../constants/i18n';
import { PRODUCTS, BEST_DEAL_IDS, getProductsByIds, getProductsByCategory } from '../constants/products';

const API_KEY = process.env.REACT_APP_GROQ_API_KEY || '';

export const useChat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const historyRef = useRef<{ role: 'user' | 'assistant'; content: string }[]>([]);

  const t = TRANSLATIONS[language];

  // Add initial greeting on mount
  const initGreeting = useCallback(() => {
    const greeting: ChatMessage = {
      id: uuidv4(),
      role: 'bot',
      type: 'text',
      content: t.greeting,
      timestamp: new Date(),
    };
    setMessages([greeting]);
  }, [t.greeting]);

  const addMessage = useCallback((msg: ChatMessage) => {
    setMessages(prev => [...prev, msg]);
  }, []);

  /** Send a user message and get bot response */
  const sendMessage = useCallback(async (userText: string) => {
    if (!userText.trim() || isLoading) return;

    // Handle internal actions (prefixed with __)
    if (userText.startsWith('__')) {
      handleInternalAction(userText);
      return;
    }

    // Add user message
    const userMsg: ChatMessage = {
      id: uuidv4(),
      role: 'user',
      type: 'text',
      content: userText,
      timestamp: new Date(),
    };
    addMessage(userMsg);

    // Update history
    historyRef.current = [
      ...historyRef.current.slice(-8),
      { role: 'user', content: userText },
    ];

    setIsLoading(true);

    try {
      const rawResponse = await callGroq(historyRef.current, API_KEY);
      const { type, products, orderData, cleanText } = parseMessageType(rawResponse);

      historyRef.current = [
        ...historyRef.current,
        { role: 'assistant', content: rawResponse },
      ];

      const botMsg: ChatMessage = {
        id: uuidv4(),
        role: 'bot',
        type,
        content: cleanText,
        products,
        orderData,
        timestamp: new Date(),
      };
      addMessage(botMsg);
    } catch (err) {
      const errorMsg: ChatMessage = {
        id: uuidv4(),
        role: 'bot',
        type: 'text',
        content: '⚠️ Something went wrong. Please try again.',
        timestamp: new Date(),
      };
      addMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, addMessage]);

  /** Handle quick action buttons (local, no API call) */
  const handleInternalAction = useCallback((action: string) => {
    if (action === '__TRACK_ORDER__') {
      addMessage({
        id: uuidv4(), role: 'bot', type: 'text',
        content: t.trackOrderMsg, timestamp: new Date(),
      });
    } else if (action === '__RETURN_POLICY__') {
      addMessage({
        id: uuidv4(), role: 'bot', type: 'text',
        content: t.returnPolicyMsg, timestamp: new Date(),
      });
    } else if (action === '__BEST_DEALS__') {
      const deals = getProductsByIds(BEST_DEAL_IDS);
      addMessage({
        id: uuidv4(), role: 'bot', type: 'products',
        content: '🔥 Today\'s Best Deals — Up to 67% off!',
        products: deals, timestamp: new Date(),
      });
    } else if (action === '__RECOMMENDATIONS__') {
      // Show category question
      addMessage({
        id: uuidv4(), role: 'bot', type: 'question',
        content: 'What category are you looking for?',
        timestamp: new Date(),
      });
    }
  }, [t, addMessage]);

  /** Confirm order — triggers ORDER_PLACED */
  const confirmOrder = useCallback(async (orderData: any) => {
    const confirmText = `Yes, confirm my order for ${orderData.product} at ${orderData.price}`;

    historyRef.current = [
      ...historyRef.current.slice(-8),
      { role: 'user', content: confirmText },
    ];

    setIsLoading(true);
    try {
      const rawResponse = await callGroq(historyRef.current, API_KEY);
      const { type, orderData: placedData, cleanText } = parseMessageType(rawResponse);

      addMessage({
        id: uuidv4(), role: 'bot', type,
        content: cleanText, orderData: placedData,
        timestamp: new Date(),
      });
    } catch {
      addMessage({
        id: uuidv4(), role: 'bot', type: 'text',
        content: '⚠️ Order failed. Please try again.',
        timestamp: new Date(),
      });
    } finally {
      setIsLoading(false);
    }
  }, [addMessage]);

  /** Toggle language between EN and HI */
  const toggleLanguage = useCallback(() => {
    setLanguage(prev => prev === 'en' ? 'hi' : 'en');
  }, []);

  return {
    messages,
    isLoading,
    language,
    selectedProduct,
    setSelectedProduct,
    sendMessage,
    confirmOrder,
    toggleLanguage,
    initGreeting,
    t,
  };
};
