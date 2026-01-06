import React from 'react'
import { useEffect, useState } from 'react';
import './GetData.css';

const GetData = ({ reloadKey = 0 }) => {
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState(null);

  const [magasins, setMagasins] = useState([]);
  const [magasinsLoading, setMagasinsLoading] = useState(false);
  const [magasinsError, setMagasinsError] = useState(null);

  const [commandes, setCommandes] = useState([]);
  const [commandesLoading, setCommandesLoading] = useState(false);
  const [commandesError, setCommandesError] = useState(null);

  const [blogs, setBlogs] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(false);
  const [blogsError, setBlogsError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:4000/api/user/getallusers');
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const json = await res.json();
        setUsers(json.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [reloadKey]);

  useEffect(() => {
    const fetchProducts = async () => {
      setProductsLoading(true);
      try {
        const res = await fetch('http://localhost:4000/api/product');
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const json = await res.json();
        setProducts(json.data || []);
      } catch (err) {
        setProductsError(err.message);
      } finally {
        setProductsLoading(false);
      }
    };

    fetchProducts();
  }, [reloadKey]);

  useEffect(() => {
    const fetchMagasins = async () => {
      setMagasinsLoading(true);
      try {
        const res = await fetch('http://localhost:4000/api/magasin');
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const json = await res.json();
        setMagasins(json.data || []);
      } catch (err) {
        setMagasinsError(err.message);
      } finally {
        setMagasinsLoading(false);
      }
    };

    fetchMagasins();
  }, [reloadKey]);

  useEffect(() => {
    const fetchCommandes = async () => {
      setCommandesLoading(true);
      try {
        const res = await fetch('http://localhost:4000/api/commande');
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const json = await res.json();
        setCommandes(json.data || []);
      } catch (err) {
        setCommandesError(err.message);
      } finally {
        setCommandesLoading(false);
      }
    };

    fetchCommandes();
  }, [reloadKey]);

  useEffect(() => {
    const fetchBlogs = async () => {
      setBlogsLoading(true);
      try {
        const res = await fetch('http://localhost:4000/api/blog');
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
        const json = await res.json();
        setBlogs(json.data || []);
      } catch (err) {
        setBlogsError(err.message);
      } finally {
        setBlogsLoading(false);
      }
    };

    fetchBlogs();
  }, [reloadKey]);

  return (
    <div className="App">
      <div className="app-header">
        <div className="app-brand">
          <div className="avatar">ME</div>
          <div>
            <div className="brand-title">Meriem El Hayouni</div>
            <div className="brand-sub">Admin dashboard</div>
          </div>
        </div>
        <button className="muted-btn" onClick={() => window.location.reload()}>Refresh</button>
      </div>

      <h2>Liste des Users</h2>
      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: 'red' }}>Erreur: {error}</p>}
      {!loading && !error && (
        <div className="card-grid">
          {users.length === 0 && <div className="empty-state">Aucun utilisateur</div>}
          {users.map((u) => {
            const label = (u.username || u.email || '').trim();
            const initials = label
              .split(' ')
              .map((s) => s[0])
              .slice(0, 2)
              .join('')
              .toUpperCase();
            return (
              <div className="card user-card" key={u._id || u.id}>
                <div className="avatar">{initials || 'U'}</div>
                <div className="card-body">
                  <div className="card-title">{u.username || u.email}</div>
                  <div className="card-sub">{u.email}</div>
                  <div className="card-meta">Role: {u.role || 'etudiant'}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <h2>Liste des Products</h2>
      {productsLoading && <p>Chargement des produits...</p>}
      {productsError && <p style={{ color: 'red' }}>Erreur: {productsError}</p>}
      {!productsLoading && !productsError && (
        <div className="product-grid">
          {products.length === 0 && <div className="empty-state">Aucun produit</div>}
          {products.map((p) => (
            <div className="product-card" key={p._id || p.id}>
              <div className="card-body">
                <div className="product-name">{p.name}</div>
                <div className="product-price">{p.price} MAD</div>
                <div className="product-category">{p.category}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <h2>Liste des Magasins</h2>
      {magasinsLoading && <p>Chargement des magasins...</p>}
      {magasinsError && <p style={{ color: 'red' }}>Erreur: {magasinsError}</p>}
      {!magasinsLoading && !magasinsError && (
        <div className="card-grid">
          {magasins.length === 0 && <div className="empty-state">Aucun magasin</div>}
          {magasins.map((m) => {
            const label = (m.nom || m.name || '').trim();
            const initials = label
              .split(' ')
              .map((s) => s[0])
              .slice(0, 2)
              .join('')
              .toUpperCase();
            return (
              <div className="card magasin-card" key={m._id || m.id}>
                <div className="avatar">{initials || 'M'}</div>
                <div className="card-body">
                  <div className="card-title">{m.nom || m.name}</div>
                  <div className="card-sub">{m.adresse}</div>
                  <div className="card-meta">{m.telephone || m.email}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <h2>Liste des Commandes</h2>
      {commandesLoading && <p>Chargement des commandes...</p>}
      {commandesError && <p style={{ color: 'red' }}>Erreur: {commandesError}</p>}
      {!commandesLoading && !commandesError && (
        <div className="card-grid">
          {commandes.length === 0 && <div className="empty-state">Aucune commande</div>}
          {commandes.map((c) => {
            const label = (c.clientName || c.customerName || c.user || String(c._id || c.id || '')).toString().trim();
            const initials = label
              .split(' ')
              .map((s) => (s || '')[0])
              .slice(0, 2)
              .join('')
              .toUpperCase();
            return (
              <div className="card commande-card" key={c._id || c.id}>
                <div className="avatar">{initials || '#'} </div>
                <div className="card-body">
                  <div className="card-title">Commande #{c._id ? String(c._id).slice(-6) : (c.id || '---')}</div>
                  <div className="card-sub">Status: {c.status || 'N/A'}</div>
                  <div className="card-meta">Total: {c.totalAmount || 0} MAD</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <h2>Liste des Blogs</h2>
      {blogsLoading && <p>Chargement des blogs...</p>}
      {blogsError && <p style={{ color: 'red' }}>Erreur: {blogsError}</p>}
      {!blogsLoading && !blogsError && (
        <div className="card-grid">
          {blogs.length === 0 && <div className="empty-state">Aucun blog</div>}
          {blogs.map((b) => {
            const label = (b.author || b.auteur || '').toString().trim();
            const initials = label
              .split(' ')
              .map((s) => s[0])
              .slice(0, 2)
              .join('')
              .toUpperCase();
            return (
              <div className="card blog-card" key={b._id || b.id}>
                <div className="avatar">{initials || 'B'}</div>
                <div className="card-body">
                  <div className="card-title">{b.title || b.titre}</div>
                  <div className="card-sub">{b.author || b.auteur}</div>
                  <div className="card-meta">{b.createdAt ? new Date(b.createdAt).toLocaleDateString() : ''}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}

export default GetData
