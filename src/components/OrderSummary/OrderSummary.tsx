// src/components/OrderSummary/OrderSummary.tsx
import React from 'react';
import { OrderData } from '../../types';

interface OrderSummaryCardProps {
  orderData: OrderData;
  onConfirm: () => void;
  onCancel: () => void;
  isLast: boolean;
}

export const OrderSummaryCard: React.FC<OrderSummaryCardProps> = ({
  orderData, onConfirm, onCancel, isLast,
}) => (
  <div className="order-card">
    <div className="order-card-title">📦 Order Summary</div>
    <div className="order-row">
      <span className="order-label">Product</span>
      <span className="order-value">{orderData.product}</span>
    </div>
    <div className="order-row">
      <span className="order-label">Price</span>
      <span className="order-value">{orderData.price}</span>
    </div>
    {orderData.savings && (
      <div className="order-row">
        <span className="order-label">You Save</span>
        <span className="order-value" style={{ color: '#4ADE80' }}>{orderData.savings}</span>
      </div>
    )}
    <div className="order-row">
      <span className="order-label">Delivery</span>
      <span className="order-value">{orderData.delivery}</span>
    </div>
    {isLast && (
      <div className="order-actions">
        <button className="btn-confirm" onClick={onConfirm}>✅ Confirm Order</button>
        <button className="btn-cancel" onClick={onCancel}>Cancel</button>
      </div>
    )}
  </div>
);

interface OrderPlacedCardProps {
  orderData: OrderData;
}

export const OrderPlacedCard: React.FC<OrderPlacedCardProps> = ({ orderData }) => (
  <div className="order-placed-card">
    <div className="order-placed-icon">🎉</div>
    <div className="order-placed-title">Order Placed Successfully!</div>
    <div className="order-row" style={{ justifyContent: 'center', opacity: 0.9 }}>
      {orderData.product}
    </div>
    <div className="order-row" style={{ justifyContent: 'center', fontSize: 18, fontWeight: 800 }}>
      {orderData.price}
    </div>
    <div className="order-row" style={{ justifyContent: 'center', opacity: 0.85, fontSize: 13 }}>
      🚚 Delivery in {orderData.delivery}
    </div>
    {orderData.orderId && (
      <div className="order-id">Order ID: {orderData.orderId}</div>
    )}
  </div>
);
