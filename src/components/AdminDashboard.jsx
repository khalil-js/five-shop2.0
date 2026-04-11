import React from 'react';
import { FaBox, FaShoppingCart, FaUsers, FaChartLine, FaCog } from 'react-icons/fa';

const AdminDashboard = () => {


  const recentOrders = [
    { id: '#ORD001', customer: 'John Doe', product: 'Men\'s T-Shirt', amount: '$45.99', status: 'Delivered' },
    { id: '#ORD002', customer: 'Jane Smith', product: 'Women\'s Dress', amount: '$89.99', status: 'Processing' },
    { id: '#ORD003', customer: 'Mike Johnson', product: 'Men\'s Jeans', amount: '$59.99', status: 'Shipped' },
  ];

  const getStatusClass = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-700';
      case 'Processing': return 'bg-amber-100 text-amber-700';
      default: return 'bg-sky-100 text-sky-700';
    }
  };

  return (
    <div className="min-h-screen bg-sky-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <button className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700">Add Product</button>
            <button className="p-2 text-sky-600 hover:bg-sky-100 rounded-lg"><FaCog /></button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-sky-50 rounded">{stat.icon}</div>
                <span className="text-sm text-green-600">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-sky-900">{stat.value}</h3>
              <p className="text-sky-600">{stat.title}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm">
            <h2 className="text-xl font-bold text-sky-900 mb-4">Recent Orders</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b">
                    <th className="pb-3 text-sky-600">Order ID</th>
                    <th className="pb-3 text-sky-600">Customer</th>
                    <th className="pb-3 text-sky-600">Product</th>
                    <th className="pb-3 text-sky-600">Amount</th>
                    <th className="pb-3 text-sky-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map(order => (
                    <tr key={order.id} className="border-b">
                      <td className="py-3">{order.id}</td>
                      <td className="py-3">{order.customer}</td>
                      <td className="py-3">{order.product}</td>
                      <td className="py-3">{order.amount}</td>
                      <td className="py-3">
                        <span className={`px-3 py-1 text-sm rounded-full ${getStatusClass(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
            <h2 className="text-xl font-bold text-sky-900 mb-4">Quick Actions</h2>
            <button className="w-full py-3 bg-sky-600 text-white rounded-lg hover:bg-sky-700">Add Product</button>
            <button className="w-full py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700">View Orders</button>
            <button className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700">Manage Users</button>
            <button className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700">Analytics</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
