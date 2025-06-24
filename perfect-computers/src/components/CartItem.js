import React from 'react';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const handleQuantityChange = (change) => {
    const newQuantity = item.quantity + change;
    onUpdateQuantity(item.id, newQuantity);
  };

  const calculateItemTotal = () => {
    return (parseInt(item.price.replace(/,/g, '')) * item.quantity).toLocaleString('en-IN');
  };

  return (
    <div className="cart-item">
      <img src={item.image} alt={item.name} className="cart-item-image" />
      
      <div className="cart-item-details">
        <h4 className="cart-item-name">{item.name}</h4>
        <p className="cart-item-price">₹{item.price}</p>
        <span className="cart-item-category">{item.category}</span>
      </div>
      
      <div className="cart-item-controls">
        <div className="quantity-controls">
          <button 
            className="quantity-btn small" 
            onClick={() => handleQuantityChange(-1)}
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span className="quantity-display">{item.quantity}</span>
          <button 
            className="quantity-btn small" 
            onClick={() => handleQuantityChange(1)}
            disabled={item.quantity >= 10}
          >
            +
          </button>
        </div>
        
        <div className="cart-item-total">
          ₹{calculateItemTotal()}
        </div>
        
        <button 
          className="remove-item-btn"
          onClick={() => onRemove(item.id)}
          title="Remove item"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default CartItem; 