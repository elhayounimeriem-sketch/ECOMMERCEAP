import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiFetch } from '../../api';
import { useCart } from './CartContext';
import { getProductImage } from '../../utils/productImages';
import './ProductDetail.css';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await apiFetch(`/product/${id}`);
      // L'API retourne {success: true, data: {...}} ou directement un objet
      const productData = response?.data || response;
      setProduct(productData);
      setError(null);
    } catch (err) {
      setError('Produit introuvable');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product && product.inStock) {
      addToCart(product, quantity);
      alert(`${quantity} ${product.name} ajouté(s) au panier!`);
    }
  };


  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Chargement du produit...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="error-container">
        <p>{error || 'Produit introuvable'}</p>
        <button onClick={() => navigate('/products')}>Retour aux produits</button>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Retour
      </button>
      
      <div className="product-detail-content">
        <div className="product-detail-image-wrapper">
          <img 
            src={getProductImage(product)} 
            alt={product.name}
            className="product-detail-image"
            onError={(e) => {
              // En cas d'erreur de chargement, utiliser un placeholder
              e.target.src = `https://via.placeholder.com/800x1000/667eea/ffffff?text=${encodeURIComponent(product.name)}`;
            }}
          />
          {!product.inStock && (
            <div className="out-of-stock-badge">Épuisé</div>
          )}
          {product.inStock && (
            <div className="new-badge-large">Nouveau</div>
          )}
        </div>

        <div className="product-detail-info">
          <div className="product-category-badge">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </div>
          
          <h1 className="product-detail-name">{product.name}</h1>
          
          <div className="product-detail-price">
            {product.price}€
          </div>

          <div className={`product-detail-stock ${product.inStock ? 'in-stock' : 'out-stock'}`}>
            {product.inStock ? '✓ Disponible en stock' : '✗ Épuisé'}
          </div>

          <p className="product-detail-description">{product.description}</p>

          {product.inStock && (
            <div className="product-detail-actions">
              <div className="quantity-selector">
                <label>Quantité:</label>
                <div className="quantity-controls">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    −
                  </button>
                  <span>{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)}>+</button>
                </div>
              </div>

              <button 
                className="add-to-cart-button"
                onClick={handleAddToCart}
              >
                🛒 Ajouter au panier
              </button>
            </div>
          )}

          <div className="product-features">
            <div className="feature">
              <span className="feature-icon">🚚</span>
              <span>Livraison gratuite</span>
            </div>
            <div className="feature">
              <span className="feature-icon">↩️</span>
              <span>Retour facile</span>
            </div>
            <div className="feature">
              <span className="feature-icon">🔒</span>
              <span>Paiement sécurisé</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;

