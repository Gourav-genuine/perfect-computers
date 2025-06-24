import React from 'react';
import CartItem from './CartItem';

const Cart = ({ items, onClose, onUpdateQuantity, onRemoveItem, onCheckout, total }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatPrice = (price) => {
    return price.toLocaleString('en-IN');
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="cart-modal">
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className="cart-content">
          {items.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty</p>
              <button className="continue-shopping" onClick={onClose}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {items.map(item => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={onUpdateQuantity}
                    onRemove={onRemoveItem}
                  />
                ))}
              </div>
              
              <div className="cart-summary">
                <div className="cart-total">
                  <h3>Total: ₹{formatPrice(total)}</h3>
                </div>
                
                <div className="cart-actions">
                  <button className="continue-shopping" onClick={onClose}>
                    Continue Shopping
                  </button>
                  <button className="checkout-button" onClick={onCheckout}>
                    Proceed to Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart; 