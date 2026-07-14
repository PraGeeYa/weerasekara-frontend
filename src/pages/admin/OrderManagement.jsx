import { useState, useEffect } from 'react';
import api from '../../services/api';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all orders from the backend
    const fetchOrders = async () => {
      try {
        const response = await api.get('/orders');
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto mt-8 max-w-6xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Customer Orders 📦</h2>

      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 overflow-x-auto">
        {loading ? (
          <p className="text-gray-500 font-medium">Loading orders...</p>
        ) : orders.length === 0 ? (
          <p className="text-gray-500 font-medium text-center py-10">No orders received yet.</p>
        ) : (
          <table className="min-w-full text-left text-sm whitespace-nowrap">
            <thead className="uppercase tracking-wider border-b-2 border-gray-200 bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Customer</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Item Info</th>
                <th className="px-4 py-3">Total Amount</th>
                <th className="px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900">{order.customerName}</td>
                  <td className="px-4 py-3 text-gray-600">{order.phoneNumber}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {order.items.map((item, index) => (
                      <div key={index}>
                        {item.productId?.name} <span className="font-bold text-blue-600">(x{item.quantity})</span>
                      </div>
                    ))}
                  </td>
                  <td className="px-4 py-3 font-bold text-green-600">Rs. {order.totalAmount}</td>
                  <td className="px-4 py-3">
                    <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded">
                      {order.orderStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;