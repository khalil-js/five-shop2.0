import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaCreditCard, FaPaypal, FaApple } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { cart, total, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields
    ['firstName', 'lastName', 'email', 'address', 'city', 'country', 'zipCode'].forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = 'This field is required';
      }
    });

    // Email validation
    if (formData.email .test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Credit card validation if credit card is selected
    if (paymentMethod === 'credit') {
      if (!formData.cardNumber.replace(/\s/g, '').match(/^\d{16}$/)) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number';
      }
      if (!formData.expiryDate.match(/^(0[1-9]|1[0-2])\/\d{2}$/)) {
        newErrors.expiryDate = 'Please enter a valid expiry date (MM/YY)';
      }
      if (!formData.cvv.match(/^\d{3,4}$/)) {
        newErrors.cvv = 'Please enter a valid CVV';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
   
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Here you would typically send the order to your backend
    // For now, we'll just show a success message and clear the cart
    try {
      // Simulate order processing
      setTimeout(() => {
        alert('Order placed successfully!');
        clearCart();
        navigate('/');
      }, 1000);
    } catch (error) {
      alert('There was an error processing your order. Please try again.');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 to-amber-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-sky-900 mb-4">Your cart is empty</h2>
          <p className="text-sky-600 mb-8">Add some items to your cart before checking out.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors duration-200"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-amber-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-sky-900">Checkout</h1>
          <p className="mt-2 text-sky-600">Complete your purchase</p>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Shipping & Payment */}
          <div className="space-y-8">
            {/* Shipping Information */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-sky-900 mb-4">Shipping Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-sky-700 mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.firstName ? 'border-red-500' : 'border-sky-200'
                    } focus:outline-none focus:ring-2 focus:ring-sky-500`}
                    required
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-sky-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.lastName ? 'border-red-500' : 'border-sky-200'
                    } focus:outline-none focus:ring-2 focus:ring-sky-500`}
                    required
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-sky-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.email ? 'border-red-500' : 'border-sky-200'
                    } focus:outline-none focus:ring-2 focus:ring-sky-500`}
                    required
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-sky-700 mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.address ? 'border-red-500' : 'border-sky-200'
                    } focus:outline-none focus:ring-2 focus:ring-sky-500`}
                    required
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-500">{errors.address}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-sky-700 mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.city ? 'border-red-500' : 'border-sky-200'
                    } focus:outline-none focus:ring-2 focus:ring-sky-500`}
                    required
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-sky-700 mb-1">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.country ? 'border-red-500' : 'border-sky-200'
                    } focus:outline-none focus:ring-2 focus:ring-sky-500`}
                    required
                  />
                  {errors.country && (
                    <p className="mt-1 text-sm text-red-500">{errors.country}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-sky-700 mb-1">ZIP Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 rounded-lg border ${
                      errors.zipCode ? 'border-red-500' : 'border-sky-200'
                    } focus:outline-none focus:ring-2 focus:ring-sky-500`}
                    required
                  />
                  {errors.zipCode && (
                    <p className="mt-1 text-sm text-red-500">{errors.zipCode}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-sky-900 mb-4">Payment Method</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                    id="credit"
                    name="payment"
                    value="credit"
                    checked={paymentMethod === "credit"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-sky-600 focus:ring-sky-500"
                  />
                  <label htmlFor="credit" className="flex items-center gap-2 cursor-pointer">
                    <FaCreditCard className="text-sky-600" />
                    <span>Credit Card</span>
                  </label>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                    id="paypal"
                    name="payment"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-sky-600 focus:ring-sky-500"
                  />
                  <label htmlFor="paypal" className="flex items-center gap-2 cursor-pointer">
                    <FaPaypal className="text-sky-600" />
                    <span>PayPal</span>
                  </label>
                </div>
                <div className="flex items-center gap-4">
                  <input
                    type="radio"
                    id="apple"
                    name="payment"
                    value="apple"
                    checked={paymentMethod === "apple"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-sky-600 focus:ring-sky-500"
                  />
                  <label htmlFor="apple" className="flex items-center gap-2 cursor-pointer">
                    <FaApple className="text-sky-600" />
                    <span>Apple Pay</span>
                  </label>
                </div>
              </div>

              {paymentMethod === "credit" && (
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-sky-700 mb-1">Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      placeholder="1234 5678 9012 3456"
                      className={`w-full px-4 py-2 rounded-lg border ${
                        errors.cardNumber ? 'border-red-500' : 'border-sky-200'
                      } focus:outline-none focus:ring-2 focus:ring-sky-500`}
                      required
                    />
                    {errors.cardNumber && (
                      <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-sky-700 mb-1">Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.expiryDate ? 'border-red-500' : 'border-sky-200'
                        } focus:outline-none focus:ring-2 focus:ring-sky-500`}
                        required
                      />
                      {errors.expiryDate && (
                        <p className="mt-1 text-sm text-red-500">{errors.expiryDate}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-sky-700 mb-1">CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.cvv ? 'border-red-500' : 'border-sky-200'
                        } focus:outline-none focus:ring-2 focus:ring-sky-500`}
                        required
                      />
                      {errors.cvv && (
                        <p className="mt-1 text-sm text-red-500">{errors.cvv}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-sky-900 mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = "https://placehold.co/400x500/1a1a1a/ffffff?text=Product+Image";
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-sky-900">{item.name}</h3>
                    <p className="text-sm text-sky-600">
                      {item.color} | {item.size}
                    </p>
                    <p className="text-sm text-sky-600">Quantity: {item.quantity}</p>
                  </div>
                  <p className="font-medium text-sky-900">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}

              <div className="border-t border-sky-100 pt-4 space-y-2">
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
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <FaLock />
                <span>Place Order</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage; 