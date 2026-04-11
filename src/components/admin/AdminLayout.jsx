import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  FaChartLine,
  FaShoppingBag,
  FaUsers,
  FaBars,
  FaTimes,
  FaBox,
  FaClipboardList
} from 'react-icons/fa';
import { GrUserAdmin } from "react-icons/gr";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: FaChartLine },
    { name: 'Products', path: '/admin/products', icon: FaBox },
    { name: 'Orders', path: '/admin/orders', icon: FaClipboardList },
    { name: 'Customers', path: '/admin/customers', icon: FaUsers },
    
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div 
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
          isSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <div className="min-h-screen">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between h-16 px-4">
            <div className="flex items-center gap-2">
              <GrUserAdmin />
              <h1 className="text-lg font-semibold text-gray-900">Admin</h1>
            </div>
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-900 lg:hidden"
            >
              <FaBars />
            </button>
          </div>
        </header>

        <main className="p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

        <div
          className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 transform ${
            isSidebarOpen ? 'translate-y-0' : 'translate-y-full'
          } transition-transform duration-300 ease-in-out lg:translate-y-0`}
        >
          <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 lg:hidden">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 rounded-md text-gray-500 hover:text-gray-900"
            >
              <FaTimes />
            </button>
          </div>
          <nav className="px-4 py-4">
            <ul className="flex space-x-4 lg:space-x-8 justify-center">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`flex flex-col items-center px-4 py-2 rounded-md transition-colors duration-200 ${
                      isActive(item.path)
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="mb-1" />
                    <span className="text-xs">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
