import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Local Storage එකෙන් දත්ත ලබා ගැනීම
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

  // --- Auto Logout for Inactivity (විනාඩි 15) ---
  useEffect(() => {
    if (!token) return;

    let timeoutId;
    const INACTIVITY_TIME = 15 * 60 * 1000;

    const autoLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('userRole');
      alert("ඔබ බොහෝ වේලාවක් කිසිදු ක්‍රියාකාරකමක් නොකළ බැවින් ආරක්ෂාව සඳහා ඉබේම Log Out විය. 🔒");
      navigate('/login');
      window.location.reload(); 
    };

    const resetTimer = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(autoLogout, INACTIVITY_TIME);
    };

    const events = ['mousemove', 'keydown', 'mousedown', 'scroll', 'touchstart'];

    resetTimer();
    events.forEach(event => window.addEventListener(event, resetTimer));

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [token, navigate]);

  const userName = userEmail ? userEmail.split('@')[0] : 'User';

  return (
    // Wrapper එක: Floating look එකක් දෙන්න දෙපැත්තෙන් padding (px-4 md:px-10) සහ top margin (pt-4) දමා ඇත
    <div className="fixed top-0 left-0 w-full z-50 px-4 md:px-10 pt-4 pointer-events-none">
      
      <nav className="max-w-7xl mx-auto bg-slate-950/70 backdrop-blur-xl border border-white/10 rounded-full px-6 py-2.5 md:py-3 shadow-[0_15px_35px_rgba(0,0,0,0.6)] flex justify-between items-center pointer-events-auto">
        
        {/* --- Brand Logo (වම් පැත්තේ) --- */}
        <div className="flex items-center justify-start">
          <Link to="/" className="flex items-center group relative">
            {/* Logo Glow Effect */}
            <div className="absolute inset-0 bg-orange-500/10 blur-md rounded-full group-hover:bg-orange-500/30 transition-all duration-500"></div>
            <img 
              src="/logo.jpeg" 
              alt="Weerasekara Concrete Work" 
              className="h-10 md:h-12 object-contain rounded-full border border-white/10 group-hover:scale-105 transition-all duration-300 relative z-10" 
            />
          </Link>
        </div>
        
        {/* --- Navigation Links (මැද කොටස - Desktop View) --- */}
        <div className="hidden md:flex items-center space-x-8 font-black text-slate-300 text-xs uppercase tracking-widest">
          <Link to="/" className="relative group hover:text-white transition-colors">
            Home
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full shadow-[0_0_8px_#ea580c]"></span>
          </Link>
          <Link to="/contact" className="relative group hover:text-white transition-colors">
            Contact Us
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full shadow-[0_0_8px_#ea580c]"></span>
          </Link>
          {userRole === 'admin' && (
            <>
              <Link to="/admin" className="relative group hover:text-orange-400 transition-colors text-orange-500">
                Dashboard
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full shadow-[0_0_8px_#ea580c]"></span>
              </Link>
              <Link to="/admin/products" className="relative group hover:text-orange-400 transition-colors text-orange-500">
                Products
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full shadow-[0_0_8px_#ea580c]"></span>
              </Link>
              <Link to="/admin/orders" className="relative group hover:text-orange-400 transition-colors text-orange-500">
                Orders
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full shadow-[0_0_8px_#ea580c]"></span>
              </Link>
            </>
          )}
        </div>

        {/* --- Right Actions (දකුණු පැත්තේ - Desktop View) --- */}
        <div className="hidden md:flex items-center space-x-4">
          {token ? (
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <span className="text-xs text-slate-400 font-bold">
                  Hi, <span className="text-white capitalize">{userName}</span>
                </span>
                {userRole === 'admin' && (
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest mt-0.5">
                    Admin
                  </span>
                )}
              </div>
              {/* Pill-shaped Logout Button */}
              <button 
                onClick={handleLogout}
                className="bg-white hover:bg-orange-500 hover:text-white text-slate-950 px-5 py-2 rounded-full font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-0.5"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-slate-300 hover:text-white font-black text-xs uppercase tracking-widest transition-colors px-2 py-2">
                Login
              </Link>
              {/* Pill-shaped Action Button - reference image එකේ වගේමයි */}
              <Link 
                to="/signup" 
                className="bg-white hover:bg-orange-500 hover:text-white text-slate-950 px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-orange-500/30 transform hover:-translate-y-0.5"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* --- Mobile View (Hamburger Button) --- */}
        <div className="flex justify-end md:hidden">
          <button 
            className="text-white text-2.5xl font-black focus:outline-none z-20 transition-transform active:scale-90"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

      </nav>

      {/* --- Mobile Dropdown Menu ( Floating Style ) --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-3 max-w-7xl mx-auto bg-slate-950/95 backdrop-blur-2xl shadow-[0_20px_40px_rgba(0,0,0,0.8)] border border-white/10 rounded-3xl p-5 flex flex-col space-y-4 pointer-events-auto">
          
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="font-black text-slate-300 hover:text-orange-500 uppercase tracking-widest text-sm px-2 py-1 rounded-lg hover:bg-white/5 transition-colors">Home</Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="font-black text-slate-300 hover:text-orange-500 uppercase tracking-widest text-sm px-2 py-1 rounded-lg hover:bg-white/5 transition-colors">Contact Us</Link>
          
          {userRole === 'admin' && (
            <>
              <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="font-black text-orange-500 hover:text-orange-400 uppercase tracking-widest text-sm px-2 py-1 rounded-lg hover:bg-white/5 transition-colors">Dashboard</Link>
              <Link to="/admin/products" onClick={() => setIsMobileMenuOpen(false)} className="font-black text-orange-500 hover:text-orange-400 uppercase tracking-widest text-sm px-2 py-1 rounded-lg hover:bg-white/5 transition-colors">Products</Link>
              <Link to="/admin/orders" onClick={() => setIsMobileMenuOpen(false)} className="font-black text-orange-500 hover:text-orange-400 uppercase tracking-widest text-sm px-2 py-1 rounded-lg hover:bg-white/5 transition-colors">Orders</Link>
            </>
          )}

          <hr className="border-white/10" />

          {token ? (
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between bg-slate-900 p-3 rounded-2xl border border-white/5">
                <span className="text-slate-400 font-bold text-sm">
                  Hi, <span className="text-white capitalize">{userName}</span>
                </span>
                {userRole === 'admin' && (
                  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] px-2.5 py-0.5 rounded-full font-black uppercase tracking-widest">
                    Admin
                  </span>
                )}
              </div>
              <button 
                onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }}
                className="w-full text-center bg-white text-slate-950 py-3.5 rounded-full font-black uppercase tracking-widest text-xs shadow-lg"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-3">
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-center text-slate-300 hover:text-white bg-slate-900 border border-white/10 font-black uppercase tracking-widest text-xs py-3 rounded-full">Login</Link>
              <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="text-center bg-white text-slate-950 py-3.5 rounded-full font-black uppercase tracking-widest text-xs shadow-lg">Sign Up</Link>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

export default Navbar;