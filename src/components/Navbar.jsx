// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaShoppingBag, FaHeart, FaSearch, FaBars, FaTimes, FaUser } from "react-icons/fa";
import { useSearch } from "../context/SearchContext";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/img/Adobe Express - file.png";

const Navbar = ({ onCartClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { searchQuery, updateSearch } = useSearch();
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const currentPath = window.location.pathname;
      if (currentPath === '/men' || currentPath === '/women') {
        updateSearch(searchQuery);
      } else {
        navigate('/men');
        updateSearch(searchQuery);
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-sky-100 via-amber-50 to-sky-100 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Mobile Actions */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img src={logo} alt="Five.Shop Logo" className="h-10 w-auto" />
            </Link>
            {/* Mobile Actions */}
            <div className="flex items-center ml-4 md:hidden">
              <button 
                title="Favorites"
                className="text-sky-700 hover:text-sky-600 transition-colors duration-200 p-2"
              >
                <FaHeart className="h-5 w-5" />
              </button>
              <button 
                title="Cart" 
                onClick={onCartClick}
                className="text-sky-700 hover:text-sky-600 transition-colors duration-200 p-2"
              >
                <FaShoppingBag className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link 
              to="/men" 
              className="text-sky-800 hover:text-sky-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-sky-50"
            >
              Men
            </Link>
            <Link 
              to="/women" 
              className="text-sky-800 hover:text-sky-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-sky-50"
            >
              Women
            </Link>
            <Link
              to="/admin/login"
              className="text-amber-600 hover:text-amber-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 hover:bg-amber-50"
            >
              Admin
            </Link>
          </div>

          {/* Search Input - Desktop */}
          <div className="hidden md:block flex-1 max-w-lg mx-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => updateSearch(e.target.value)}
                className="w-full py-2 pl-10 pr-4 rounded-full bg-white/80 text-sky-900 placeholder-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-colors duration-200"
              />
              <button 
                type="submit"
                className="absolute left-3 top-3 text-sky-400 hover:text-sky-600 transition-colors duration-200"
              >
                <FaSearch />
              </button>
            </form>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              title="Favorites"
              className="text-sky-700 hover:text-sky-600 transition-colors duration-200"
            >
              <FaHeart className="h-6 w-6" />
            </button>
            <button 
              title="Cart" 
              onClick={onCartClick}
              className="text-sky-700 hover:text-sky-600 transition-colors duration-200"
            >
              <FaShoppingBag className="h-6 w-6" />
            </button>
            {currentUser ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 text-sky-700 hover:text-sky-600 transition-colors duration-200"
                >
                  <FaUser className="h-6 w-6" />
                  <span>{currentUser.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-sky-700 hover:text-sky-600 transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-sky-700 hover:text-sky-600 transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors duration-200"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-sky-700 hover:text-sky-600 hover:bg-sky-50"
          >
            {isMenuOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Search Input - Mobile */}
            <form onSubmit={handleSearch} className="px-2 mb-4">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => updateSearch(e.target.value)}
                  className="w-full py-2 pl-10 pr-4 rounded-full bg-white/80 text-sky-900 placeholder-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white"
                />
                <button 
                  type="submit"
                  className="absolute left-3 top-3 text-sky-400 hover:text-sky-600"
                >
                  <FaSearch />
                </button>
              </div>
            </form>

            <Link 
              to="/men" 
              className="block px-3 py-2 rounded-md text-base font-medium text-sky-800 hover:text-sky-600 hover:bg-sky-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Men
            </Link>
            <Link 
              to="/women" 
              className="block px-3 py-2 rounded-md text-base font-medium text-sky-800 hover:text-sky-600 hover:bg-sky-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Women
            </Link>
            <Link
              to="/admin/login"
              className="block px-3 py-2 rounded-md text-base font-medium text-amber-600 hover:text-amber-700 hover:bg-amber-50"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin
            </Link>
            {currentUser ? (
              <>
                <Link 
                  to="/profile" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-sky-800 hover:text-sky-600 hover:bg-sky-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Profile
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-sky-800 hover:text-sky-600 hover:bg-sky-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-sky-800 hover:text-sky-600 hover:bg-sky-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="block px-3 py-2 rounded-md text-base font-medium text-sky-800 hover:text-sky-600 hover:bg-sky-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
