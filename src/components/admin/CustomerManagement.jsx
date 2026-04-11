import React, { useState, useEffect } from 'react';
import { FaSearch, FaEdit, FaTrash, FaUser, FaPhone, FaEnvelope } from 'react-icons/fa';

const CustomerManagement = () => {
  const [customers, setCustomers] = useState(() => {
    const stored = localStorage.getItem('admin_customers');
    return stored ? JSON.parse(stored) : [];
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    localStorage.setItem('admin_customers', JSON.stringify(customers));
  }, [customers]);

  const filteredCustomers = customers.filter((customer) =>
    `${customer.name} ${customer.email} ${customer.phone}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const openModal = (customer = null) => {
    setSelectedCustomer(customer);
    setFormData(
      customer || { name: '', email: '', phone: '', address: '' }
    );
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedCustomer) {
      setCustomers((prev) =>
        prev.map((c) =>
          c.id === selectedCustomer.id ? { ...c, ...formData } : c
        )
      );
    } else {
      const newCustomer = {
        id: Date.now(),
        ...formData,
        orders: 0,
        totalSpent: 0
      };
      setCustomers((prev) => [...prev, newCustomer]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (confirm('Delete this customer?')) {
      setCustomers((prev) => prev.filter((c) => c.id !== id));
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Customers</h1>
        <button
          onClick={() => openModal()}
          className="bg-sky-600 text-white px-4 py-2 rounded hover:bg-sky-700"
        >
          + Add Customer
        </button>
      </div>

      <div className="relative mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search customers..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((c) => (
          <div key={c.id} className="bg-white p-4 rounded-xl shadow hover:shadow-lg">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 flex items-center justify-center rounded-full bg-sky-100">
                <FaUser className="text-sky-600 text-xl" />
              </div>
              <div>
                <h3 className="font-semibold text-lg text-gray-800">{c.name}</h3>
                <p className="text-sm text-gray-500">{c.address}</p>
              </div>
            </div>
            <div className="mt-3 space-y-1 text-sm text-gray-700">
              <p className="flex items-center gap-2"><FaPhone className="text-sky-400" /> {c.phone}</p>
              <p className="flex items-center gap-2"><FaEnvelope className="text-sky-400" /> {c.email}</p>
              <p>Orders: <strong>{c.orders}</strong></p>
              <p>Total Spent: <strong className="text-sky-700">${c.totalSpent.toFixed(2)}</strong></p>
            </div>
            <div className="flex gap-3 mt-3">
              <button onClick={() => openModal(c)} className="text-sky-600 hover:text-sky-800">
                <FaEdit />
              </button>
              <button onClick={() => handleDelete(c.id)} className="text-red-600 hover:text-red-800">
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {selectedCustomer ? 'Edit Customer' : 'Add Customer'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {['name', 'email', 'phone', 'address'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium capitalize text-gray-700">{field}</label>
                  <input
                    type={field === 'email' ? 'email' : 'text'}
                    value={formData[field]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field]: e.target.value })
                    }
                    className="mt-1 w-full rounded border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                    required
                  />
                </div>
              ))}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
                >
                  {selectedCustomer ? 'Save' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerManagement;
