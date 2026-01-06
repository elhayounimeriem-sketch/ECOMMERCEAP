import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../../api';
import { getProductImage } from '../../utils/productImages';
import './ProductsPage.css';

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

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
      setProducts([]); // Réinitialiser à un tableau vide en cas d'erreur
      setError('Erreur lors du chargement des produits');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', 'robes', 'sac', 't-shirt'];
  
  // S'assurer que products est toujours un tableau
  const safeProducts = Array.isArray(products) ? products : [];
  const filteredProducts = safeProducts.filter(product => {
    if (!product) return false;
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = (product.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (product.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });


  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Chargement des produits...</p>
      </div>
    );
  }

  return (
    <div className="products-page-container">
      <div className="products-header">
        <h1>Tous nos Produits</h1>
        <p>Découvrez notre collection complète</p>
      </div>

      <div className="products-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

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
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button onClick={fetchProducts}>Réessayer</button>
        </div>
      )}

      {filteredProducts.length === 0 ? (
        <div className="empty-products">
          <p>Aucun produit trouvé</p>
        </div>
      ) : (
        <>
          <div className="products-count">
            {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
          </div>
          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product._id} className="product-card">
                <div className="product-image-wrapper">
                  <img 
                    src={getProductImage(product)} 
                    alt={product.name}
                    className="product-image"
                    loading="lazy"
                    onError={(e) => {
                      // En cas d'erreur de chargement, utiliser un placeholder
                      e.target.src = `https://via.placeholder.com/800x1000/667eea/ffffff?text=${encodeURIComponent(product.name)}`;
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
        </>
      )}
    </div>
  );
}

export default ProductsPage;

