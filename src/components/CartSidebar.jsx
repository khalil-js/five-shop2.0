// src/components/CartSideBar.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTimes, FaShoppingBag } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const CartSideBar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, total } = useCart();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <>
      {/* Semi-transparent overlay */}
      <div 
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Cart Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white/95 backdrop-blur-md shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-sky-100 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-sky-900 flex items-center gap-2">
              <FaShoppingBag />
              Your Cart
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-sky-50 rounded-full transition-colors duration-200"
            >
              <FaTimes className="text-sky-600" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sky-600">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 bg-sky-50 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.src = "https://placehold.co/400x500/1a1a1a/ffffff?text=Product+Image";
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-sky-900">{item.name}</h3>
                      <p className="text-sm text-sky-600">
                        {item.color || 'Default'} | {item.size || 'M'}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="w-6 h-6 flex items-center justify-center rounded-full border border-sky-200 hover:border-sky-300"
                          >
                            -
                          </button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center rounded-full border border-sky-200 hover:border-sky-300"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-sky-600 hover:text-sky-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sky-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-sky-100">
            <div className="space-y-4">
              <div className="flex justify-between text-sky-600">
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sky-600">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-lg font-semibold text-sky-900 pt-2 border-t border-sky-100">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button
                onClick={handleCheckout}
                disabled={cart.length === 0}
                className={`w-full py-3 rounded-lg text-white font-medium transition-colors duration-200 ${
                  cart.length === 0
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-sky-600 hover:bg-sky-700'
                }`}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSideBar;
