import React from 'react';

const Analytics = () => {
  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h2>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Total Sales" value="$12,500" />
        <MetricCard title="Total Orders" value="156" />
        <MetricCard title="Customers" value="89" />
        <MetricCard title="Avg Order" value="$80.13" />
      </div>

      
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Orders</h3>
        <div className="space-y-4">
          <OrderCard
            id="001"
            customer="Ahmed Al-Farsi"
            amount="$129.99"
            status="Delivered"
          />
          <OrderCard
            id="002"
            customer="Layla Hassan"
            amount="$89.99"
            status="Shipped"
          />
          <OrderCard
            id="003"
            customer="Mohamed Zahran"
            amount="$199.99"
            status="Pending"
          />
        </div>
      </div>
    </div>
  );
};

const MetricCard = ({ title, value }) => (
  <div className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow">
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
);

const OrderCard = ({ id, customer, amount, status }) => {
  const statusColor = {
    Delivered: 'bg-green-100 text-green-700',
    Shipped: 'bg-blue-100 text-blue-700',
    Pending: 'bg-yellow-100 text-yellow-700'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md transition-shadow flex flex-col sm:flex-row justify-between items-start sm:items-center">
      <div>
        <p className="font-semibold text-gray-800">Order #{id}</p>
        <p className="text-sm text-gray-600">Customer: {customer}</p>
        <p className="text-sm text-gray-600">Amount: {amount}</p>
      </div>
      <span
        className={`mt-2 sm:mt-0 px-3 py-1 rounded-full text-sm font-medium ${statusColor[status]}`}
      >
        {status}
      </span>
    </div>
  );
};

export default Analytics;
