import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from './CartContext';
import { getProductImage } from '../../utils/productImages';
import './Cart.css';

function Cart() {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice, getTotalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Votre panier est vide</h2>
          <p>Découvrez nos produits et ajoutez-les à votre panier</p>
          <Link to="/products" className="shop-button">
            Continuer les achats
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h1>Mon Panier</h1>
        <button onClick={clearCart} className="clear-cart-button">
          Vider le panier
        </button>
      </div>

      <div className="cart-content">
        <div className="cart-items">
          {cart.map(item => (
            <div key={item._id} className="cart-item">
              <div className="cart-item-image">
                <img 
                  src={getProductImage(item)} 
                  alt={item.name}
                  className="cart-item-img"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/200x200/667eea/ffffff?text=${encodeURIComponent(item.name)}`;
                  }}
                />
              </div>
              
              <div className="cart-item-info">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-description">{item.description}</p>
                <div className="cart-item-price">{item.price}€</div>
              </div>

              <div className="cart-item-controls">
                <div className="quantity-controls">
                  <button 
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="quantity-btn"
                  >
                    −
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>
                
                <div className="cart-item-total">
                  {(item.price * item.quantity).toFixed(2)}€
                </div>

                <button 
                  onClick={() => removeFromCart(item._id)}
                  className="remove-button"
                  aria-label="Supprimer"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <div className="summary-card">
            <h2>Résumé de la commande</h2>
            
            <div className="summary-row">
              <span>Articles ({getTotalItems()})</span>
              <span>{getTotalPrice().toFixed(2)}€</span>
            </div>
            
            <div className="summary-row">
              <span>Livraison</span>
              <span className="free">Gratuite</span>
            </div>
            
            <div className="summary-divider"></div>
            
            <div className="summary-row total">
              <span>Total</span>
              <span>{getTotalPrice().toFixed(2)}€</span>
            </div>

            <button className="checkout-button">
              Passer la commande
            </button>

            <Link to="/products" className="continue-shopping">
              ← Continuer les achats
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;

