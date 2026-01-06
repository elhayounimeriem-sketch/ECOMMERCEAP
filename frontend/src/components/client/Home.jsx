import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../../api';
import { getProductImage } from '../../utils/productImages';
import './Home.css';

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await apiFetch('/product');
      // L'API retourne {success: true, data: [...]} ou directement un tableau
      const productsArray = Array.isArray(response) 
        ? response 
        : (Array.isArray(response?.data) ? response.data : []);
      setProducts(productsArray);
      setError(null);
      console.log('Produits chargés:', productsArray.length);
    } catch (err) {
      console.error('Erreur API:', err);
      setProducts([]); // Réinitialiser à un tableau vide en cas d'erreur
      if (err.message?.includes('Failed to fetch') || err.message?.includes('NetworkError')) {
        setError('Impossible de se connecter au serveur. Vérifiez que le backend est démarré sur le port 4000.');
      } else {
        setError('Erreur lors du chargement des produits. ' + (err.message || ''));
      }
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', 'robes', 'sac', 't-shirt'];
  // S'assurer que products est toujours un tableau
  const safeProducts = Array.isArray(products) ? products : [];
  const filteredProducts = selectedCategory === 'all' 
    ? safeProducts 
    : safeProducts.filter(p => p && p.category === selectedCategory);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Chargement des produits...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <h2>Erreur de connexion</h2>
        <p>{error}</p>
        <button onClick={fetchProducts} className="retry-button">Réessayer</button>
        <p className="error-hint">
          Assurez-vous que le backend est démarré : <code>cd backend && npm start</code>
        </p>
      </div>
    );
  }

  return (
    <div className="home-container">
      <section className="hero-section-boohoo">
        <div className="hero-image-wrapper">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=1600&fit=crop"
            alt="Mode"
            className="hero-model-image"
          />
          <div className="hero-text-overlay">
            <span className="hero-label">INDISPENSABLES de l'hiver</span>
          </div>
        </div>
        <div className="hero-promo-content">
          <h1 className="hero-promo-title">LIVRAISON STANDARD OFFERTE</h1>
          <p className="hero-promo-subtitle">Sur toutes vos commandes</p>
          <Link to="/products" className="hero-shop-button">SHOPPER MAINTENANT</Link>
        </div>
      </section>

      <section className="categories-section">
        <h2 className="section-title">Catégories</h2>
        <div className="category-filters">
          {categories.map(cat => (
            <button
              key={cat}
              className={`category-filter ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat === 'all' ? 'Tous' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </section>

      <section className="products-section">
        <h2 className="section-title">
          {selectedCategory === 'all' ? 'Tous les Produits' : `Produits - ${selectedCategory}`}
        </h2>
        {filteredProducts.length === 0 ? (
          <div className="empty-products">
            <p>Aucun produit disponible pour le moment</p>
          </div>
        ) : (
          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product._id} className="product-card">
                <div className="product-image-wrapper">
                  <img 
                    src={getProductImage(product)} 
                    alt={product.name}
                    className="product-image"
                    loading="lazy"
                    onLoad={() => {
                      console.log('Image chargée avec succès:', product.name);
                    }}
                    onError={(e) => {
                      console.error('Erreur de chargement d\'image pour:', product.name);
                      // En cas d'erreur de chargement, utiliser un placeholder simple
                      const fallbackUrl = `https://via.placeholder.com/800x1000/667eea/ffffff?text=${encodeURIComponent(product.name.substring(0, 15))}`;
                      e.target.src = fallbackUrl;
                    }}
                  />
                  <div className="product-overlay">
                    <Link 
                      to={`/product/${product._id}`} 
                      className="quick-view-button"
                    >
                      Voir rapidement
                    </Link>
                  </div>
                  {!product.inStock && <div className="out-of-stock">Épuisé</div>}
                  {product.inStock && <div className="new-badge">Nouveau</div>}
                </div>
                <div className="product-info">
                  <div className="product-category-tag">
                    {product.category === 'robes' ? '👗 Robe' : 
                     product.category === 'sac' ? '👜 Sac' : '👕 T-Shirt'}
                  </div>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  <div className="product-footer">
                    <span className="product-price">{product.price}€</span>
                    <span className={`product-stock ${product.inStock ? 'in-stock' : 'out-stock'}`}>
                      {product.inStock ? '✓ En stock' : '✗ Épuisé'}
                    </span>
                  </div>
                  <Link 
                    to={`/product/${product._id}`} 
                    className="product-button"
                  >
                    <span>Ajouter au panier</span>
                    <span className="button-icon">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;

