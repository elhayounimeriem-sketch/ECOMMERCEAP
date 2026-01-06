import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import { useCart } from './CartContext';
import './ClientLayout.css';

function ClientLayout() {
  const { getTotalItems } = useCart();

  return (
    <div className="client-layout">
      <Header cartCount={getTotalItems()} />
      <main className="client-main">
        <Outlet />
      </main>
    </div>
  );
}

export default ClientLayout;

