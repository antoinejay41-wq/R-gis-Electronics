/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { StoreProvider, useStore } from './context/StoreContext';
import { AboutPage } from './pages/AboutPage';
import { AdminPage } from './pages/AdminPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { RepairsPage } from './pages/RepairsPage';
import { ShopPage } from './pages/ShopPage';
import { WishlistPage } from './pages/WishlistPage';

const AppRouter: React.FC = () => {
  const { currentPath } = useStore();

  const renderPage = () => {
    if (currentPath === '/' || currentPath === '') {
      return <HomePage />;
    }
    if (currentPath === '/shop') {
      return <ShopPage initialCategory="all" />;
    }
    if (currentPath === '/smartphones') {
      return <ShopPage initialCategory="smartphones" />;
    }
    if (currentPath === '/laptops') {
      return <ShopPage initialCategory="laptops" />;
    }
    if (currentPath === '/accessories') {
      return <ShopPage initialCategory="accessories" />;
    }
    if (currentPath.startsWith('/product/')) {
      const slug = currentPath.replace('/product/', '').split('/')[0];
      return <ProductDetailPage slug={slug} />;
    }
    if (currentPath === '/repairs') {
      return <RepairsPage />;
    }
    if (currentPath === '/wishlist') {
      return <WishlistPage />;
    }
    if (currentPath === '/checkout') {
      return <CheckoutPage />;
    }
    if (currentPath === '/about') {
      return <AboutPage />;
    }
    if (currentPath === '/contact') {
      return <ContactPage />;
    }
    if (currentPath === '/admin') {
      return <AdminPage />;
    }
    return <HomePage />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F6FA] text-[#111111]">
      <Navbar />
      <main className="flex-1">{renderPage()}</main>
      <Footer />
      <CartDrawer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppRouter />
    </StoreProvider>
  );
}
