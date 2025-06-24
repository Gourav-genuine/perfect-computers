import React, { useState } from 'react';

const ProductModal = ({ product, onClose, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  
  if (!product) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    alert(`Added ${quantity} x ${product.name} to cart!`);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const calculateTotal = () => {
    return (parseInt(product.price.replace(/,/g, '')) * quantity).toLocaleString('en-IN');
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-header">
          {product.discount && (
            <div className="modal-discount-badge">-{product.discount} OFF</div>
          )}
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        <img 
          src={product.image} 
          alt={product.name} 
          className="modal-image"
        />
        <div className="modal-body">
          <h2 className="modal-title">{product.name}</h2>
          <div className="modal-price-container">
            <div className="modal-price">₹{product.price}</div>
            {product.originalPrice && (
              <div className="modal-original-price">₹{product.originalPrice}</div>
            )}
            {product.discount && (
              <div className="modal-savings">You save ₹{(parseInt(product.originalPrice.replace(/,/g, '')) - parseInt(product.price.replace(/,/g, ''))).toLocaleString('en-IN')}</div>
            )}
          </div>
          <p className="modal-description">{product.description}</p>
          
          {product.specifications && (
            <div className="modal-specs">
              <h3>Specifications</h3>
              <ul>
                {product.specifications.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="quantity-selector">
            <label htmlFor="quantity">Quantity:</label>
            <div className="quantity-controls">
              <button 
                className="quantity-btn" 
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span className="quantity-display">{quantity}</span>
              <button 
                className="quantity-btn" 
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= 10}
              >
                +
              </button>
            </div>
          </div>
          
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            Add to Cart - ₹{calculateTotal()}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal; 