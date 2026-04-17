// src/components/Chat/ChatWindow.tsx
import React, { useEffect, useRef } from 'react';
import { ChatMessage, Product } from '../../types';
import ProductCard from '../ProductCard/ProductCard';
import { OrderSummaryCard, OrderPlacedCard } from '../OrderSummary/OrderSummary';
import { QuestionCard } from '../QuestionCard/QuestionCard';
import { useDragScroll } from '../../hooks/useDragScroll';

interface Props {
  messages: ChatMessage[];
  isLoading: boolean;
  onProductClick: (product: Product) => void;
  onConfirmOrder: (orderData: any) => void;
  onCancelOrder: () => void;
  onQuestionAnswer: (answer: string) => void;
}

const TypingIndicator: React.FC = () => (
  <div className="message-row">
    <div className="message-avatar">🤖</div>
    <div className="message-bubble bot">
      <div className="typing-indicator">
        <div className="typing-dot" />
        <div className="typing-dot" />
        <div className="typing-dot" />
      </div>
    </div>
  </div>
);

const ProductCarousel: React.FC<{ products: Product[]; onProductClick: (p: Product) => void }> = ({
  products, onProductClick,
}) => {
  const ref = useDragScroll();
  return (
    <div className="product-carousel" ref={ref}>
      {products.map(p => (
        <ProductCard key={p.id} product={p} onClick={onProductClick} />
      ))}
    </div>
  );
};

const ChatWindow: React.FC<Props> = ({
  messages, isLoading, onProductClick, onConfirmOrder, onCancelOrder, onQuestionAnswer,
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="chat-window">
      {messages.map((msg, idx) => {
        const isUser = msg.role === 'user';
        const isLast = idx === messages.length - 1;

        return (
          <div key={msg.id} className={`message-row ${isUser ? 'user' : ''} animate-fade-in`}>
            {!isUser && <div className="message-avatar">🤖</div>}

            <div style={{ maxWidth: '82%', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {/* Text content */}
              {msg.content && (
                <div className={`message-bubble ${isUser ? 'user' : 'bot'}`}>
                  {msg.content}
                </div>
              )}

              {/* Product carousel */}
              {msg.type === 'products' && msg.products && msg.products.length > 0 && (
                <ProductCarousel products={msg.products} onProductClick={onProductClick} />
              )}

              {/* Order summary card */}
              {msg.type === 'orderSummary' && msg.orderData && (
                <OrderSummaryCard
                  orderData={msg.orderData}
                  onConfirm={() => onConfirmOrder(msg.orderData)}
                  onCancel={onCancelOrder}
                  isLast={isLast}
                />
              )}

              {/* Order placed success card */}
              {msg.type === 'orderPlaced' && msg.orderData && (
                <OrderPlacedCard orderData={msg.orderData} />
              )}

              {/* Question card */}
              {msg.type === 'question' && (
                <QuestionCard
                  question={msg.content}
                  options={['Electronics', 'Sports', 'Beauty', 'Bags']}
                  onSelect={onQuestionAnswer}
                />
              )}
            </div>

            {isUser && <div className="message-avatar" style={{ background: '#FFF3EE' }}>👤</div>}
          </div>
        );
      })}

      {isLoading && <TypingIndicator />}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatWindow;
