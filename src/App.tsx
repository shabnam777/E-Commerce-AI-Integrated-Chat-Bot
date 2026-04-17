// src/App.tsx
// Root component — wires all parts together
import React, { useEffect } from 'react';
import { useChat } from './hooks/useChat';
import Header from './components/Header/Header';
import DealsBanner from './components/DealsBanner/DealsBanner';
import ChatWindow from './components/Chat/ChatWindow';
import ProductModal from './components/ProductCard/ProductModal';
import { QuickButtons, InputBar } from './components/QuestionCard/QuestionCard';
import { TRANSLATIONS } from './constants/i18n';
import { PRODUCTS } from './constants/products';

const App: React.FC = () => {
  const {
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
  } = useChat();

  // Show greeting on first load
  useEffect(() => {
    initGreeting();
  }, [initGreeting]);

  const handleOrderFromModal = (product: typeof PRODUCTS[0]) => {
    setSelectedProduct(null);
    sendMessage(`I want to order ${product.name} for ₹${product.price.toLocaleString('en-IN')}`);
  };

  const handleQuestionAnswer = (answer: string) => {
    sendMessage(answer);
  };

  return (
    <div className="app-shell">
      <Header language={language} onToggleLanguage={toggleLanguage} />
      <DealsBanner />
      <ChatWindow
        messages={messages}
        isLoading={isLoading}
        onProductClick={setSelectedProduct}
        onConfirmOrder={confirmOrder}
        onCancelOrder={() => sendMessage('Cancel the order')}
        onQuestionAnswer={handleQuestionAnswer}
      />
      <QuickButtons language={language} onAction={sendMessage} />
      <InputBar language={language} isLoading={isLoading} onSend={sendMessage} />

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onOrder={handleOrderFromModal}
        />
      )}
    </div>
  );
};

export default App;
