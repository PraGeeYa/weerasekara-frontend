import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Local Storage එකෙන් ලොග් වෙලාද ඉන්නේ කියලා බලනවා
  const token = localStorage.getItem('token');
  const userEmail = localStorage.getItem('email');
  const userRole = localStorage.getItem('userRole');

  // Log Out කිරීමේ function එක
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('userRole');
    navigate('/login');
    window.location.reload(); 
  };

  const userName = userEmail ? userEmail.split('@')[0] : 'User';

  return (
    <nav className="bg-white p-3 shadow-md border-b-4 border-orange-600 sticky top-0 z-50 relative">
      
      {/* --- Background Watermark 'W' --- */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none select-none z-0 opacity-40 overflow-hidden">
        <span className="text-[140px] font-black text-slate-100 tracking-tighter transform -translate-y-2">
          W
        </span>
      </div>

      {/* Main Content Container (min-h-[44px] දැම්මේ Logo එක මැදට ගත්තම height එක හැදෙන්න) */}
      <div className="container mx-auto flex justify-between items-center relative z-10 min-h-[44px]">
        
        {/* Mobile View: වම් පැත්තේ හිස් ඉඩක් (Admin Layout Button එකට ඉඩ දෙන්න) */}
        <div className="w-10 md:hidden"></div>

        {/* Brand Logo - Mobile වලදී මැදට (Centered) එන්න හදලා තියෙන්නේ */}
        <Link to="/" className="absolute left-1/2 transform -translate-x-1/2 md:static md:transform-none flex items-center group z-10">
          <img 
            src="/logo.jpeg" 
            alt="Weerasekara Concrete Work" 
            className="h-10 md:h-16 object-contain rounded-xl md:rounded-2xl shadow-sm border border-slate-100 group-hover:shadow-md group-hover:scale-105 transition-all duration-300 bg-white" 
          />
        </Link>
        
        {/* --- Desktop View (Right Side: Links & Auth Buttons) --- */}
        <div className="hidden md:flex items-center space-x-6">
          
          <div className="space-x-6 font-extrabold text-slate-800">
            <Link to="/" className="hover:text-orange-600 transition">Home</Link>
            <Link className="hover:text-orange-600 transition" to="/contact">Contact Us</Link>
            {userRole === 'admin' && (
              <>
                <Link to="/admin" className="hover:text-orange-600 transition">Dashboard</Link>
                <Link to="/admin/products" className="hover:text-orange-600 transition">Products</Link>
                <Link to="/admin/orders" className="hover:text-orange-600 transition">Orders</Link>
              </>
            )}
          </div>

          <div className="h-8 w-px bg-slate-200"></div>

          <div className="flex items-center space-x-4">
            {token ? (
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-end">
                  <span className="text-sm text-slate-500 font-bold">
                    Hi, <span className="text-slate-900 capitalize">{userName}</span>
                  </span>
                  {userRole === 'admin' && (
                    <span className="bg-slate-900 text-orange-400 text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider shadow-sm">
                      Admin Panel
                    </span>
                  )}
                </div>
                <button 
                  onClick={handleLogout}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 rounded-xl font-bold transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="text-slate-800 hover:text-orange-600 font-extrabold transition px-2 py-2">Login</Link>
                <Link to="/signup" className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-extrabold hover:bg-slate-800 hover:shadow-lg transition transform hover:-translate-y-0.5">Sign Up</Link>
              </>
            )}
          </div>
        </div>

        {/* --- Mobile View (Hamburger Button) --- */}
        <button 
          className="md:hidden text-slate-900 text-3xl font-black focus:outline-none z-20"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>

      </div>

      {/* --- Mobile Dropdown Menu --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl shadow-xl border-b-4 border-orange-600 z-50 flex flex-col p-5 space-y-4 animate-fade-in">
          
          {/* Mobile Links */}
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="font-extrabold text-slate-800 hover:text-orange-600 text-lg">Home</Link>
          {userRole === 'admin' && (
            <>
              <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="font-extrabold text-slate-800 hover:text-orange-600 text-lg">Dashboard</Link>
              <Link to="/admin/products" onClick={() => setIsMobileMenuOpen(false)} className="font-extrabold text-slate-800 hover:text-orange-600 text-lg">Products</Link>
              <Link to="/admin/orders" onClick={() => setIsMobileMenuOpen(false)} className="font-extrabold text-slate-800 hover:text-orange-600 text-lg">Orders</Link>
            </>
          )}

          <hr className="border-slate-200" />

          {/* Mobile Auth Buttons */}
          {token ? (
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-600 font-bold">
                  Hi, <span className="text-slate-900 capitalize">{userName}</span>
                </span>
                {userRole === 'admin' && (
                  <span className="bg-slate-900 text-orange-400 text-xs px-2 py-1 rounded-full font-black uppercase tracking-wider">
                    Admin
                  </span>
                )}
              </div>
              <button 
                onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }}
                className="w-full text-center bg-orange-600 hover:bg-orange-700 text-white px-5 py-3 rounded-xl font-bold transition shadow-md"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-3">
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-center text-slate-800 hover:bg-slate-50 font-extrabold transition px-2 py-3 border border-slate-200 rounded-xl">Login</Link>
              <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="text-center bg-slate-900 text-white px-6 py-3 rounded-xl font-extrabold hover:bg-slate-800 shadow-md">Sign Up</Link>
            </div>
          )}
        </div>
      )}

    </nav>
  );
};

export default Navbar;