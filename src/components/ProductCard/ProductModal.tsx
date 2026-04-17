// src/components/ProductCard/ProductModal.tsx
import React from 'react';
import { Product } from '../../types';

interface Props {
  product: Product;
  onClose: () => void;
  onOrder: (product: Product) => void;
}

const ProductModal: React.FC<Props> = ({ product, onClose, onOrder }) => (
  <div className="modal-overlay" onClick={onClose}>
    <div className="modal-sheet" onClick={e => e.stopPropagation()}>
      <img
        src={product.image}
        alt={product.name}
        className="modal-img"
        onError={(e) => { (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x220?text=Product'; }}
      />
      <button className="modal-close" onClick={onClose}>✕</button>
      <div className="modal-body">
        <div className="modal-name">{product.name}</div>
        <div className="modal-price-row">
          <span className="modal-price">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice > product.price && (
            <span className="modal-orig">₹{product.originalPrice.toLocaleString('en-IN')}</span>
          )}
          {product.discount > 0 && (
            <span className="modal-discount">{product.discount}% off</span>
          )}
        </div>
        <div className="product-rating" style={{ marginBottom: 10, fontSize: 13 }}>
          <span className="star">★</span> {product.rating} · {product.reviews.toLocaleString()} reviews
        </div>
        <p className="modal-desc">{product.description}</p>
        <button className="modal-order-btn" onClick={() => onOrder(product)}>
          🛒 Order Now
        </button>
      </div>
    </div>
  </div>
);

export default ProductModal;
