import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Men from './components/Men';
import Women from './components/Women';
import ProductPage from './components/ProductPage';
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';
import { AuthProvider } from './context/AuthContext';
import CartSideBar from './components/CartSideBar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import CheckoutPage from './components/CheckoutPage';
import AdminLayout from './components/admin/AdminLayout';
import Analytics from './components/admin/Analytics';
import ProductManagement from './components/admin/ProductManagement';
import OrderManagement from './components/admin/OrderManagement';
import CustomerManagement from './components/admin/CustomerManagement';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import Profile from './components/auth/Profile';
import AdminLogin from './components/admin/AdminLogin';
import ProtectedRoute from './components/admin/ProtectedRoute';

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <AuthProvider>
      <CartProvider>
        <SearchProvider>
          <div className="min-h-screen bg-gradient-to-b from-sky-50 via-amber-50 to-sky-50 relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>
            
            {/* Content */}
            <div className="relative">
              <Navbar onCartClick={() => setIsCartOpen(true)} />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/men" element={<Men />} />
                  <Route path="/women" element={<Women />} />
                  <Route path="/product/:id" element={<ProductPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<SignUp />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin" element={
                    <ProtectedRoute>
                      <AdminLayout />
                    </ProtectedRoute>
                  }>
                    <Route index element={<Navigate to="/admin/dashboard" replace />} />
                    <Route path="dashboard" element={<Analytics />} />
                    <Route path="products" element={<ProductManagement />} />
                    <Route path="orders" element={<OrderManagement />} />
                    <Route path="customers" element={<CustomerManagement />} />
                    
                  </Route>
                </Routes>
              </main>
              <CartSideBar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
              <Footer />
              <BackToTop />
            </div>
          </div>
        </SearchProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
