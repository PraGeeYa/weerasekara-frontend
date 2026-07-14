import { useEffect, useState } from 'react';
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

  // --- Auto Logout for Inactivity (විනාඩි 15 ක් නිශ්ශබ්දව සිටියහොත්) ---
  useEffect(() => {
    // ලොග් වෙලා නැත්නම් මේක Run වෙන්න ඕනේ නැහැ
    if (!token) return;

    let timeoutId;
    const INACTIVITY_TIME = 15 * 60 * 1000; // විනාඩි 15 (මිලි තත්පර වලින්)

    // ඉබේම Logout කරන function එක
    const autoLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      localStorage.removeItem('userRole');
      alert("ඔබ බොහෝ වේලාවක් කිසිදු ක්‍රියාකාරකමක් නොකළ බැවින් ආරක්ෂාව සඳහා ඉබේම Log Out විය. (Logged out due to inactivity) 🔒");
      navigate('/login');
      window.location.reload(); 
    };

    // මොකක් හරි කරපු ගමන් ටයිමර් එක මුල ඉඳන් පටන් ගන්නවා
    const resetTimer = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(autoLogout, INACTIVITY_TIME);
    };

    // User ගේ ක්‍රියාකාරකම් අඳුරගන්නා Events
    const events = ['mousemove', 'keydown', 'mousedown', 'scroll', 'touchstart'];

    // මුලින්ම ටයිමර් එක පටන් ගන්න
    resetTimer();

    // Events වලට listener එකතු කිරීම
    events.forEach(event => window.addEventListener(event, resetTimer));

    // Component එක අයින් වෙද්දී (Cleanup)
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      events.forEach(event => window.removeEventListener(event, resetTimer));
    };
  }, [token, navigate]);

  const userName = userEmail ? userEmail.split('@')[0] : 'User';

  return (
    <nav className="bg-white p-3 shadow-md border-b-4 border-orange-600 sticky top-0 z-50 relative">
      
      {/* --- Background Watermark 'W' --- */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none select-none z-0 opacity-40 overflow-hidden">
        <span className="text-[140px] font-black text-slate-100 tracking-tighter transform -translate-y-2">
          W
        </span>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto relative z-10 min-h-[50px] grid grid-cols-3 md:flex md:justify-between items-center">
        
        {/* --- Mobile View: Left Space (Admin Button Placeholder) --- */}
        <div className="flex justify-start md:hidden">
          <div className="w-10"></div> 
        </div>

        {/* --- Brand Logo (Centered on Mobile, Left on Desktop) --- */}
        <div className="flex justify-center md:justify-start">
          <Link to="/" className="flex items-center group z-10">
            <img 
              src="/logo.jpeg" 
              alt="Weerasekara Concrete Work" 
              className="h-12 md:h-16 object-contain rounded-xl md:rounded-2xl shadow-sm border border-slate-100 group-hover:shadow-md group-hover:scale-105 transition-all duration-300 bg-white" 
            />
          </Link>
        </div>
        
        {/* --- Desktop View (Right Side: Links & Auth Buttons) --- */}
        <div className="hidden md:flex items-center space-x-6 justify-end w-full">
          
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

        {/* --- Mobile View (Hamburger Button) - Right aligned --- */}
        <div className="flex justify-end md:hidden">
          <button 
            className="text-slate-900 text-3xl font-black focus:outline-none z-20 transition-transform active:scale-90"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

      </div>

      {/* --- Mobile Dropdown Menu --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl shadow-xl border-b-4 border-orange-600 z-50 flex flex-col p-5 space-y-4 animate-[fadeIn_0.2s_ease-out]">
          
          {/* Mobile Links */}
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="font-extrabold text-slate-800 hover:text-orange-600 text-lg px-2 py-1 rounded-lg hover:bg-orange-50 transition-colors">Home</Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="font-extrabold text-slate-800 hover:text-orange-600 text-lg px-2 py-1 rounded-lg hover:bg-orange-50 transition-colors">Contact Us</Link>
          
          {userRole === 'admin' && (
            <>
              <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)} className="font-extrabold text-slate-800 hover:text-orange-600 text-lg px-2 py-1 rounded-lg hover:bg-orange-50 transition-colors">Dashboard</Link>
              <Link to="/admin/products" onClick={() => setIsMobileMenuOpen(false)} className="font-extrabold text-slate-800 hover:text-orange-600 text-lg px-2 py-1 rounded-lg hover:bg-orange-50 transition-colors">Products</Link>
              <Link to="/admin/orders" onClick={() => setIsMobileMenuOpen(false)} className="font-extrabold text-slate-800 hover:text-orange-600 text-lg px-2 py-1 rounded-lg hover:bg-orange-50 transition-colors">Orders</Link>
            </>
          )}

          <hr className="border-slate-200" />

          {/* Mobile Auth Buttons */}
          {token ? (
            <div className="flex flex-col space-y-4">
              <div className="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm">
                <span className="text-slate-600 font-bold">
                  Hi, <span className="text-slate-900 capitalize">{userName}</span>
                </span>
                {userRole === 'admin' && (
                  <span className="bg-slate-900 text-orange-400 text-xs px-3 py-1 rounded-full font-black uppercase tracking-wider">
                    Admin
                  </span>
                )}
              </div>
              <button 
                onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }}
                className="w-full text-center bg-orange-600 hover:bg-orange-700 text-white px-5 py-3.5 rounded-xl font-bold transition shadow-md"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-3">
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-center text-slate-800 hover:bg-slate-50 font-extrabold transition px-2 py-3.5 border border-slate-200 rounded-xl shadow-sm">Login</Link>
              <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)} className="text-center bg-slate-900 text-white px-6 py-3.5 rounded-xl font-extrabold hover:bg-slate-800 shadow-md">Sign Up</Link>
            </div>
          )}
        </div>
      )}

    </nav>
  );
};

export default Navbar;