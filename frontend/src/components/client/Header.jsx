import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

function Header({ cartCount = 0 }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <header className="client-header">
        <div className="header-top">
          <div className="header-container">
            <Link to="/" className="logo">
              <span className="logo-text">Mi-Shop</span>
            </Link>
            
            <form className="search-form" onSubmit={handleSearch}>
              <input
                type="text"
                className="search-input-header"
                placeholder="Rechercher produits et marques"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="search-button" aria-label="Rechercher">
                🔍
              </button>
            </form>

            <div className="header-actions">
              <button className="header-icon-btn" aria-label="Compte">
                👤
              </button>
              <button className="header-icon-btn" aria-label="Favoris">
                ❤️
              </button>
              <button 
                className="header-icon-btn cart-btn" 
                onClick={() => navigate('/cart')}
                aria-label="Panier"
              >
                🛒
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </button>
            </div>
          </div>
        </div>

        <nav className="main-nav">
          <div className="nav-container">
            <Link to="/products?category=all" className="nav-item">Nouveautés</Link>
            <Link to="/products?category=robes" className="nav-item">Robes</Link>
            <Link to="/products?category=t-shirt" className="nav-item">T-Shirts</Link>
            <Link to="/products?category=sac" className="nav-item">Sacs</Link>
            <Link to="/products" className="nav-item">Accessoires</Link>
            <Link to="/blog" className="nav-item">Blog</Link>
            <Link to="/admin" className="nav-item admin-nav">Admin</Link>
          </div>
        </nav>

        <div className="promo-banner">
          <span>LIVRAISON STANDARD OFFERTE* !</span>
        </div>
      </header>
    </>
  );
}

export default Header;

