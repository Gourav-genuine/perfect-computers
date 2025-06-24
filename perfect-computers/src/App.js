import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import ProductModal from './components/ProductModal';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import { products } from './data/products';
import ApiService from './services/api';

function App() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Log initial page visit
  useEffect(() => {
    const logPageVisit = async () => {
      try {
        await ApiService.logVisitor('Homepage', 'initial_visit');
        console.log('📊 Page visit logged to backend');
      } catch (error) {
        console.log('⚠️ Could not log page visit (backend may be offline)');
      }
    };

    logPageVisit();
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    
    // Log product view
    ApiService.logVisitor('Product Detail', `view_product_${product.name}`);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
    
    if (!isCartOpen) {
      // Log cart open
      ApiService.logVisitor('Shopping Cart', 'open_cart');
    }
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const openCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
    
    // Log checkout initiation
    ApiService.logVisitor('Checkout', 'initiate_checkout');
  };

  const closeCheckout = () => {
    setIsCheckoutOpen(false);
  };

  const addToCart = (product, quantity = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      
      if (existingItem) {
        const updatedItems = prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
        
        // Log add to cart
        ApiService.logVisitor('Add to Cart', `add_${product.name}_qty_${quantity}`);
        return updatedItems;
      } else {
        // Log add to cart
        ApiService.logVisitor('Add to Cart', `add_${product.name}_qty_${quantity}`);
        return [...prevItems, { ...product, quantity }];
      }
    });
  };

  const removeFromCart = (productId) => {
    const item = cartItems.find(item => item.id === productId);
    if (item) {
      ApiService.logVisitor('Remove from Cart', `remove_${item.name}`);
    }
    
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    }
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseInt(item.price.replace(/,/g, ''));
      return total + (price * item.quantity);
    }, 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleOrderComplete = async (orderData) => {
    try {
      // Log order to backend
      const total = getCartTotal();
      const gst = total * 0.18;
      const grandTotal = total + gst;
      
      const response = await ApiService.logOrder(orderData, grandTotal, cartItems);
      
      if (response.success) {
        console.log('📦 Order logged successfully:', response.orderId);
        ApiService.logVisitor('Order Complete', `order_${response.orderId}_total_${grandTotal}`);
      }
    } catch (error) {
      console.error('Error logging order:', error);
    }
    
    clearCart();
  };

  return (
    <div className="App">
      <Header 
        cartItemCount={getCartItemCount()} 
        onCartClick={toggleCart}
      />
      <main className="main-content">
        <div className="hero-section">
          <h1>Perfect Computers</h1>
          <p>Your destination for cutting-edge technology at unbeatable prices!</p>
        </div>
        <ProductGrid products={products} onProductClick={handleProductClick} />
      </main>
      
      {isModalOpen && (
        <ProductModal 
          product={selectedProduct} 
          onClose={closeModal}
          onAddToCart={addToCart}
        />
      )}
      
      {isCartOpen && (
        <Cart
          items={cartItems}
          onClose={closeCart}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          onCheckout={openCheckout}
          total={getCartTotal()}
        />
      )}
      
      {isCheckoutOpen && (
        <Checkout
          items={cartItems}
          total={getCartTotal()}
          onClose={closeCheckout}
          onOrderComplete={handleOrderComplete}
        />
      )}
    </div>
  );
}

export default App;
