import { useState } from 'react';
import api from '../services/api';

const OrderModal = ({ product, onClose }) => {
  // Form state to handle customer input
  const [formData, setFormData] = useState({
    customerName: '',
    phoneNumber: '',
    deliveryAddress: '',
    quantity: 100, // Default 100 blocks
    paymentMethod: 'Cash on Delivery'
  });

  // Fixed transport cost for testing
  const transportCost = 2500;

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit order to backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Calculate total amount (Price * Quantity + Transport)
    const totalAmount = (product.price * formData.quantity) + transportCost;

    // Prepare data to match our Order.js Model
    const orderData = {
      customerName: formData.customerName,
      phoneNumber: formData.phoneNumber,
      deliveryAddress: formData.deliveryAddress,
      items: [
        {
          productId: product._id,
          quantity: formData.quantity
        }
      ],
      transportCost: transportCost,
      totalAmount: totalAmount,
      paymentMethod: formData.paymentMethod
    };

    try {
      await api.post('/orders', orderData);
      alert('Order placed successfully! 🎉');
      onClose(); // Close the modal after success
    } catch (error) {
      console.error("Error placing order:", error);
      alert('Failed to place order.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full relative">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold">
          &times;
        </button>

        <h2 className="text-2xl font-bold text-blue-900 mb-2">Place Your Order</h2>
        <p className="text-gray-600 mb-6 font-medium">Item: <span className="text-gray-900">{product.name}</span></p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Your Name</label>
            <input type="text" name="customerName" value={formData.customerName} onChange={handleChange} required 
              className="mt-1 block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required 
              className="mt-1 block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Delivery Address</label>
            <textarea name="deliveryAddress" value={formData.deliveryAddress} onChange={handleChange} required rows="2"
              className="mt-1 block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">Quantity</label>
              <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} min="1" required 
                className="mt-1 block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium text-gray-700">Payment</label>
              <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} 
                className="mt-1 block w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                <option value="Cash on Delivery">Cash</option>
                <option value="Bank Transfer">Bank Transfer</option>
              </select>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mt-4 border border-blue-100">
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>Items Total:</span>
              <span>Rs. {product.price} x {formData.quantity}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mb-2 border-b border-blue-200 pb-2">
              <span>Transport Cost:</span>
              <span>Rs. {transportCost}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-blue-900">
              <span>Total Amount:</span>
              <span>Rs. {(product.price * formData.quantity) + transportCost}</span>
            </div>
          </div>

          <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-blue-700 transition shadow-lg mt-4">
            Confirm Order
          </button>
        </form>
      </div>
    </div>
  );
};

export default OrderModal;