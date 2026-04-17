// // src/components/ProductCard/ProductCard.tsx
import React, { useEffect, useRef, useState } from 'react';
import { Product } from '../../types';

interface Props {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<Props> = ({ product, onClick }) => {
  const [imgSrc, setImgSrc] = useState(product.image);
  const [showAlt, setShowAlt] = useState(false);
  const hasErrored = useRef(false);

  useEffect(() => {
    let isMounted = true;

    const img = new Image();
    img.src = product.image;

    const timer = setTimeout(() => {
      if (!img.complete && isMounted) {
        hasErrored.current = true;
        setShowAlt(true);
      }
    }, 1000); // 1 second timeout

    img.onload = () => {
      clearTimeout(timer);
    };

    img.onerror = () => {
      clearTimeout(timer);
      if (!hasErrored.current && isMounted) {
        hasErrored.current = true;
        setShowAlt(true);
      }
    };

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [product.image]);

  return (
    <div className="product-card" onClick={() => onClick(product)}>
      <div className="product-img-wrap">
        
        {showAlt ? (
          <div className="product-img-alt">
            {product.name}
          </div>
        ) : (
          <img
            src={imgSrc}
            alt={product.name}
            className="product-img"
            onError={() => {
              if (!hasErrored.current) {
                hasErrored.current = true;
                setShowAlt(true);
              }
            }}
          />
        )}

        {product.discount > 0 && (
          <span className="discount-badge">{product.discount}% OFF</span>
        )}
      </div>

      <div className="product-info">
        <div className="product-name">{product.name}</div>

        <div>
          <span className="product-price">
            ₹{product.price.toLocaleString('en-IN')}
          </span>

          {product.originalPrice > product.price && (
            <span className="product-original">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        <div className="product-rating">
          <span className="star">★</span> {product.rating} (
          {product.reviews.toLocaleString()})
        </div>
      </div>
    </div>
  );
};

export default ProductCard;