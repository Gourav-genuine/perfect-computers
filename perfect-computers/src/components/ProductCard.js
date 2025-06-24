import React from 'react';

const ProductCard = ({ product, onClick }) => {
  return (
    <div className="product-card" onClick={onClick}>
      {product.discount && (
        <div className="discount-badge">-{product.discount} OFF</div>
      )}
      <img 
        src={product.image} 
        alt={product.name} 
        className="product-image"
      />
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <div className="price-container">
          <div className="product-price">₹{product.price}</div>
          {product.originalPrice && (
            <div className="original-price">₹{product.originalPrice}</div>
          )}
        </div>
        <p className="product-description">{product.shortDescription}</p>
        <span className="product-category">{product.category}</span>
      </div>
    </div>
  );
};

export default ProductCard; 