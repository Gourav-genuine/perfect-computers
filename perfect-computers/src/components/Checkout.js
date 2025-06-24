import React, { useState } from 'react';

const Checkout = ({ items, total, onClose, onOrderComplete }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('upi');

  const upiId = '7999094448@ybl';

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleUPIPayment = () => {
    const gst = total * 0.18;
    const grandTotal = total + gst;
    const amount = grandTotal.toFixed(2);
    
    // Create UPI payment URL
    const upiUrl = `upi://pay?pa=${upiId}&pn=Perfect%20Computers&am=${amount}&cu=INR&tn=Payment%20for%20Perfect%20Computers%20Order`;
    
    // Try to open UPI app
    window.location.href = upiUrl;
    
    // Start processing state
    setIsProcessing(true);
    
    // Simulate payment confirmation after 3 seconds
    setTimeout(() => {
      const confirmed = window.confirm(
        `Payment of ₹${formatPrice(grandTotal)} initiated via UPI.\n\nHave you completed the payment in your UPI app?\n\nClick OK if payment is successful, Cancel to retry.`
      );
      
      if (confirmed) {
        alert('Payment successful! Thank you for your purchase.');
        onOrderComplete(formData);
        onClose();
      } else {
        setIsProcessing(false);
      }
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (paymentMethod === 'upi') {
      handleUPIPayment();
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const formatPrice = (price) => {
    return price.toLocaleString('en-IN');
  };

  const calculateItemTotal = (item) => {
    return (parseInt(item.price.replace(/,/g, '')) * item.quantity).toLocaleString('en-IN');
  };

  const gst = total * 0.18;
  const grandTotal = total + gst;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="checkout-modal">
        <div className="checkout-header">
          <h2>Checkout</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className="checkout-content">
          <div className="checkout-form-section">
            <form onSubmit={handleSubmit} className="checkout-form">
              <div className="form-section">
                <h3>Shipping Information</h3>
                <div className="form-row">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-row">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    // required
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleInputChange}
                    // required
                  />
                </div>
                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  // required
                />
                <div className="form-row">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    // required
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleInputChange}
                    // required
                  />
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="PIN Code"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    // required
                  />
                </div>
              </div>

              <div className="form-section">
                <h3>Payment Method</h3>
                <div className="payment-methods">
                  <div className="payment-method-option">
                    <input
                      type="radio"
                      id="upi"
                      name="paymentMethod"
                      value="upi"
                      checked={paymentMethod === 'upi'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <label htmlFor="upi" className="payment-method-label">
                      <div className="payment-method-content">
                        <span className="upi-icon">📱</span>
                        <div className="payment-method-text">
                          <strong>UPI Payment</strong>
                          <p>Pay securely using any UPI app</p>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {paymentMethod === 'upi' && (
                  <div className="upi-details">
                    <div className="upi-info">
                      <h4>Payment Details</h4>
                      <div className="upi-id-display">
                        <span className="upi-label">UPI ID:</span>
                        <span className="upi-id">{upiId}</span>
                        <button 
                          type="button" 
                          className="copy-upi-btn"
                          onClick={() => {
                            navigator.clipboard.writeText(upiId);
                            alert('UPI ID copied to clipboard!');
                          }}
                        >
                          📋
                        </button>
                      </div>
                      <div className="payment-amount">
                        <span className="amount-label">Amount to Pay:</span>
                        <span className="amount-value">₹{formatPrice(grandTotal)}</span>
                      </div>
                    </div>
                    
                    <div className="upi-instructions">
                      <h5>How to pay:</h5>
                      <ol>
                        <li>Click "Pay Now" to open your UPI app</li>
                        <li>Verify the payment details</li>
                        <li>Complete the payment in your UPI app</li>
                        <li>Return here to confirm your order</li>
                      </ol>
                    </div>
                  </div>
                )}
              </div>

              <button 
                type="submit" 
                className="place-order-btn"
                disabled={isProcessing}
              >
                {isProcessing ? 'Opening UPI App...' : `Pay Now - ₹${formatPrice(grandTotal)}`}
              </button>
            </form>
          </div>

          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="summary-items">
              {items.map(item => (
                <div key={item.id} className="summary-item">
                  <span className="item-name">{item.name}</span>
                  <span className="item-quantity">x{item.quantity}</span>
                  <span className="item-price">₹{calculateItemTotal(item)}</span>
                </div>
              ))}
            </div>
            <div className="summary-total">
              <div className="total-line">
                <span>Subtotal:</span>
                <span>₹{formatPrice(total)}</span>
              </div>
              <div className="total-line">
                <span>Shipping:</span>
                <span>FREE</span>
              </div>
              <div className="total-line">
                <span>GST (18%):</span>
                <span>₹{formatPrice(gst)}</span>
              </div>
              <div className="total-line grand-total">
                <span>Total:</span>
                <span>₹{formatPrice(grandTotal)}</span>
              </div>
            </div>
            
            <div className="payment-security">
              <div className="security-badges">
                <span className="security-badge">🔒 Secure Payment</span>
                <span className="security-badge">✅ UPI Protected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 