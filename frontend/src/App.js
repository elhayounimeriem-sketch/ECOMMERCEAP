import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './components/create/create-forms.css';
import Admin from './components/admin/Admin';
import ClientLayout from './components/client/ClientLayout';
import Home from './components/client/Home';
import ProductsPage from './components/client/ProductsPage';
import ProductDetail from './components/client/ProductDetail';
import Cart from './components/client/Cart';
import BlogPage from './components/client/BlogPage';
import { CartProvider } from './components/client/CartContext';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          {/* Client Routes */}
          <Route path="/" element={<ClientLayout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="product/:id" element={<ProductDetail />} />
            <Route path="cart" element={<Cart />} />
            <Route path="blog" element={<BlogPage />} />
          </Route>
          
          {/* Admin Route */}
          <Route path="/admin" element={<Admin />} />
          
          {/* Redirect unknown routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
