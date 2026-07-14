import { useState, useEffect } from 'react';
import api from '../../services/api';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form state for adding a new product
  const [formData, setFormData] = useState({
    name: '',
    category: 'Block Gal',
    size: '',
    price: '',
    inStock: true
  });

  // Fetch products from the backend
  const fetchProducts = async () => {
    try {
      const response = await api.get('/products');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  // Submit new product data to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/products', formData);
      alert("Product added successfully! 🧱");
      fetchProducts(); // Refresh the table
      // Reset form
      setFormData({ name: '', category: 'Block Gal', size: '', price: '', inStock: true });
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };

  return (
    <div className="container mx-auto mt-8 max-w-6xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Product Management 🧱</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Side: Form to Add Product */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-xl font-bold mb-4 text-blue-800">Add New Product</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required 
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} 
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md outline-none focus:border-blue-500">
                <option value="Block Gal">Block Gal</option>
                <option value="Concrete Kanu">Concrete Kanu</option>
                <option value="Walalu">Walalu</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Size (e.g., 4-inch, 10ft)</label>
              <input type="text" name="size" value={formData.size} onChange={handleChange} required 
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price (Rs)</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} required 
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md outline-none focus:border-blue-500" />
            </div>
            <div className="flex items-center mt-2">
              <input type="checkbox" name="inStock" checked={formData.inStock} onChange={handleChange} 
                className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded" />
              <label className="text-sm font-medium text-gray-700">In Stock</label>
            </div>
            <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition mt-4">
              Save Product
            </button>
          </form>
        </div>

        {/* Right Side: Table to Display Products */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow-md border border-gray-100 overflow-x-auto">
          <h3 className="text-xl font-bold mb-4 text-gray-800">Current Inventory</h3>
          {loading ? (
            <p className="text-gray-500">Loading products...</p>
          ) : (
            <table className="min-w-full text-left text-sm whitespace-nowrap">
              <thead className="uppercase tracking-wider border-b-2 border-gray-200 bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Size</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {products.map((item) => (
                  <tr key={item._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{item.name}</td>
                    <td className="px-4 py-3 text-gray-600">
                      <span className="bg-gray-200 text-gray-800 text-xs font-semibold px-2 py-1 rounded">{item.category}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{item.size}</td>
                    <td className="px-4 py-3 font-bold text-blue-600">Rs. {item.price}</td>
                    <td className="px-4 py-3">
                      {item.inStock ? (
                        <span className="text-green-600 font-bold">In Stock</span>
                      ) : (
                        <span className="text-red-500 font-bold">Out of Stock</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProductManagement;