import { useState, useEffect } from 'react';
import api from '../../services/api'; 
import OrderModal from '../../components/OrderModal';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
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

    fetchProducts();
  }, []);

  // වීදුරු (Glassmorphism) පන්ති
  const glassCard = "bg-white/70 backdrop-blur-xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-3xl p-6 md:p-8 transition-all duration-300";

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-orange-50 overflow-hidden font-sans pb-20">
      
      {/* --- Background Watermark 'W' & Blobs (මුළු තිරයටම) --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-400/10 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-slate-400/10 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute inset-0 flex justify-center items-center opacity-[0.04]">
          <span className="text-[400px] md:text-[600px] lg:text-[800px] font-black text-slate-900 tracking-tighter select-none">
            W
          </span>
        </div>
      </div>

      <div className="relative z-10">
        
        {/* --- Hero Section --- */}
        <div className="container mx-auto px-4 pt-10 pb-16 md:pt-16 md:pb-24 max-w-7xl">
          <div className="bg-slate-900 rounded-[2.5rem] p-10 md:p-20 text-center shadow-2xl relative overflow-hidden border-4 border-slate-800">
            {/* Hero Background Image / Pattern */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888087819-3286f0821bd2?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <span className="bg-orange-500/20 text-orange-400 border border-orange-500/30 px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-widest mb-6 backdrop-blur-sm">
                Premium Quality Materials
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight leading-tight drop-shadow-lg">
                WEERASEKARA <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
                  CONCRETE WORK
                </span>
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
                Building the future with strength and durability. We manufacture the highest quality concrete blocks, pillars, and construction materials for all your needs.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="#products" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-full font-black text-lg hover:shadow-lg hover:shadow-orange-500/40 transition-all transform hover:-translate-y-1">
                  Explore Products
                </a>
                <a href="#location" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-full font-black text-lg hover:bg-white/20 transition-all">
                  Visit Us
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* --- Why Choose Us (Features) --- */}
        <div className="container mx-auto px-4 max-w-7xl mb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            <div className={`${glassCard} text-center hover:-translate-y-2`}>
              <div className="bg-orange-100 w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner text-orange-600">🏗️</div>
              <h3 className="text-xl font-black text-slate-900 mb-3">Strong & Durable</h3>
              <p className="text-slate-500 font-medium text-sm">Manufactured using the best raw materials to ensure maximum strength for your buildings.</p>
            </div>
            <div className={`${glassCard} text-center hover:-translate-y-2`}>
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner text-blue-600">🚚</div>
              <h3 className="text-xl font-black text-slate-900 mb-3">Fast Delivery</h3>
              <p className="text-slate-500 font-medium text-sm">We provide reliable and fast transport services right to your construction site.</p>
            </div>
            <div className={`${glassCard} text-center hover:-translate-y-2`}>
              <div className="bg-emerald-100 w-16 h-16 mx-auto rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner text-emerald-600">💰</div>
              <h3 className="text-xl font-black text-slate-900 mb-3">Best Prices</h3>
              <p className="text-slate-500 font-medium text-sm">High-quality concrete products at the most competitive and affordable prices in the market.</p>
            </div>
          </div>
        </div>

        {/* --- Products Section --- */}
        <div id="products" className="container mx-auto px-4 max-w-7xl mb-24 scroll-mt-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Our Products 🧱</h2>
            <div className="h-1.5 w-24 bg-orange-500 rounded-full mx-auto"></div>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-pulse flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-slate-500 font-black tracking-widest uppercase">Loading Products...</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {products.map((product) => (
                <div key={product._id} className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-lg shadow-slate-200/50 border border-white hover:shadow-2xl hover:shadow-orange-100 transition-all duration-300 group transform hover:-translate-y-2 flex flex-col">
                  
                  {/* Product Image Placeholder */}
                  <div className="bg-gradient-to-br from-slate-100 to-slate-200 h-56 rounded-2xl mb-6 flex items-center justify-center text-gray-400 group-hover:from-orange-50 group-hover:to-orange-100 transition-colors border border-slate-100 relative overflow-hidden">
                    <span className="text-6xl group-hover:scale-110 transition-transform duration-500">🧱</span>
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-black text-slate-700 shadow-sm">
                      {product.size}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-black text-slate-900 mb-2 group-hover:text-orange-600 transition-colors">{product.name}</h3>
                    <span className="inline-block bg-slate-100 text-slate-600 text-xs font-black uppercase tracking-wider px-3 py-1 rounded-lg mb-4">
                      {product.category}
                    </span>
                  </div>

                  <div className="flex justify-between items-end mt-4 pt-6 border-t border-slate-100">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Unit Price</p>
                      <span className="text-3xl font-black text-slate-900">
                        <span className="text-base font-bold text-orange-500 mr-1">Rs.</span>
                        {product.price.toLocaleString()}
                      </span>
                    </div>
                    
                    <button 
                      onClick={() => setSelectedProduct(product)} 
                      className="bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-orange-600 font-black transition-all shadow-md hover:shadow-orange-500/30 transform active:scale-95 flex items-center gap-2">
                      ORDER <span>→</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* --- Location & Map Section --- */}
        <div id="location" className="container mx-auto px-4 max-w-7xl mb-10 scroll-mt-24">
          <div className={`${glassCard} overflow-hidden p-0 md:p-0`}>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              
              {/* Address Info */}
              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <div className="inline-block bg-orange-100 text-orange-600 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner">📍</div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight">Visit Our Factory</h2>
                <p className="text-slate-500 font-medium mb-8 text-lg">
                  Come and see the quality of our concrete products for yourself. We are located at:
                </p>
                
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 mb-8">
                  <p className="text-slate-800 font-black text-xl leading-relaxed">
                    765, Kubukoya,<br />
                    Hadungamuwa, Matale,<br />
                    Hettipola 21536
                  </p>
                </div>

                <a 
                  href="https://maps.app.goo.gl/UQjKsNwyYRRg1WnX9" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-blue-600 text-white px-8 py-4 rounded-xl font-black text-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-500/40 w-fit gap-3"
                >
                  <span className="text-2xl">🗺️</span> Open in Google Maps
                </a>
              </div>

              {/* Map Graphic (Visual representation) */}
              <div className="relative h-64 lg:h-auto bg-slate-200">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-60"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/10 to-slate-900/40"></div>
                
                {/* Simulated Map Marker */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center animate-bounce">
                  <div className="bg-orange-600 text-white p-3 rounded-full shadow-xl">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  </div>
                  <div className="w-4 h-2 bg-black/30 rounded-full mt-2 filter blur-[2px]"></div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>

      {/* Modal - වෙනස් කරේ නෑ, තිබ්බ විදිහටම වැඩ කරනවා */}
      {selectedProduct && (
        <OrderModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}

    </div>
  );
};

export default Home;