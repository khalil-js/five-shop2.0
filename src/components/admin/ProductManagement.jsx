import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';

const ProductManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Classic White T-Shirt',
      category: 'Men',
      price: 29.99,
      stock: 100,
      image: '/products/tshirt.jpg'
    },
    {
      id: 2,
      name: 'Blue Jeans',
      category: 'Men',
      price: 59.99,
      stock: 50,
      image: '/products/jeans.jpg'
    },
    {
      id: 3,
      name: 'Summer Dress',
      category: 'Women',
      price: 49.99,
      stock: 75,
      image: '/products/dress.jpg'
    }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Men',
    price: '',
    stock: '',
    image: ''
  });

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(p => p.id !== productId));
    }
  };

  const handleAddProduct = () => {
    setIsModalOpen(true);
    setFormData({
      name: '',
      category: 'Men',
      price: '',
      stock: '',
      image: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now(),
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock)
    };
    setProducts([...products, newProduct]);
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-sky-900">Product Management</h2>
        <button 
          onClick={handleAddProduct}
          className="flex items-center gap-2 bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition"
        >
          <FaPlus />
          Add Product
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search by name or category..."
          value={searchTerm}
          onChange={handleSearch}
          className="w-full pl-10 pr-4 py-2 border border-sky-200 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <FaSearch className="absolute left-3 top-3 text-sky-400" />
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition flex flex-col gap-3 border border-sky-100">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded-md"
            />
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-sky-900">{product.name}</h3>
              <p className="text-sm text-sky-600">Category: {product.category}</p>
              <p className="text-sm text-amber-700">Price: ${product.price.toFixed(2)}</p>
              <p className="text-sm text-sky-600">Stock: {product.stock}</p>
            </div>
            <div className="flex justify-end gap-3 mt-auto">
              <button className="text-sky-600 hover:text-sky-700 transition">
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="text-sky-600 hover:text-red-600 transition"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg border border-sky-100">
            <h3 className="text-xl font-semibold text-sky-900 mb-4">Add New Product</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-sky-700">Product Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-sky-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-sky-700">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="mt-1 block w-full rounded-md border-sky-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                  required
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-sky-700">Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  className="mt-1 block w-full rounded-md border-sky-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-sky-700">Stock</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                  className="mt-1 block w-full rounded-md border-sky-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-sky-700">Image URL</label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="mt-1 block w-full rounded-md border-sky-200 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                  required
                />
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-sky-100 text-sky-700 rounded-lg hover:bg-sky-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
