import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const AdminLayout = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Professional icons for sidebar
  const menuItems = [
    { path: '/admin', name: 'Dashboard', icon: '📊' },
    { path: '/admin/finance', name: 'Finance', icon: '💵' },
    { path: '/admin/employees', name: 'Employees', icon: '👷‍♂️' },
    { path: '/admin/ledger', name: 'Ledger', icon: '🧾' },
    { path: '/admin/logs', name: 'Logs', icon: '🕵️‍♂️' },
    { path: '/admin/orders', name: 'Orders', icon: '📦' },
    { path: '/admin/products', name: 'Products', icon: '🧱' },
  ];

  return (
    // pt-[85px] දාලා තියෙන්නේ Global Navbar එකට ඉඩ තියන්න. මුළු පේජ් එකම h-screen කරලා lock කරා.
    <div className="flex h-screen bg-slate-950 text-white font-sans overflow-hidden relative pt-[85px]">
      
      {/* --- Ambient Background Glows & Grid Patterns --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: 'linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* --- Mobile Menu Toggle Button (Floating Action Button Style) --- */}
      <button 
        className="md:hidden fixed bottom-6 right-6 z-[60] bg-orange-600/90 backdrop-blur-xl border border-white/20 text-white w-14 h-14 flex items-center justify-center rounded-full shadow-[0_10px_25px_rgba(234,88,12,0.5)] transition-transform active:scale-90"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <span className="text-2xl font-black">{isMobileMenuOpen ? '✕' : '☰'}</span>
      </button>

      {/* --- Refined Sidebar: Height is 100% of the remaining space --- */}
      <aside className={`
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} 
        fixed md:relative z-40 w-64 h-full
        bg-slate-900/60 backdrop-blur-2xl border-r border-white/5 
        shadow-[20px_0_50px_rgba(0,0,0,0.5)] md:shadow-none
        transition-transform duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] md:translate-x-0
        flex flex-col
      `}>
        
        {/* Sidebar Header */}
        <div className="p-6 md:p-8 border-b border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <h2 className="text-xl font-black text-white tracking-tight flex items-center gap-4 relative z-10">
            <div className="bg-slate-950 p-2.5 rounded-xl border border-white/10 shadow-inner">
              <span className="text-lg">⚙️</span>
            </div>
            <div className="leading-tight">
              Admin <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 drop-shadow-sm text-sm uppercase tracking-widest">Panel</span>
            </div>
          </h2>
        </div>
        
        {/* Navigation Links (Scrollable if needed) */}
        <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
          {menuItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center px-4 py-3.5 rounded-xl font-black uppercase tracking-widest text-[11px] transition-all duration-300 relative overflow-hidden group ${
                location.pathname === item.path 
                  ? 'bg-gradient-to-r from-orange-500/10 to-transparent border-l-4 border-orange-500 text-orange-400 shadow-[inset_0_0_20px_rgba(234,88,12,0.05)]' 
                  : 'text-slate-400 hover:text-white hover:bg-white/5 border-l-4 border-transparent'
              }`}
            >
              <span className="absolute top-0 -left-[100%] w-1/2 h-full bg-white/5 skew-x-12 group-hover:left-[200%] transition-all duration-700 ease-in-out"></span>
              
              <span className={`text-lg mr-4 transition duration-300 ${location.pathname === item.path ? 'drop-shadow-[0_0_8px_rgba(234,88,12,0.8)]' : 'opacity-70 group-hover:opacity-100'}`}>
                {item.icon}
              </span> 
              <span className="relative z-10">{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-5 border-t border-white/5 bg-slate-950/30">
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest text-center">
            Weerasekara v2.0 <br/> Secure Dashboard
          </p>
        </div>
      </aside>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* --- Main Content dictating page scroll (Right side only) --- */}
      <main className="flex-1 w-full relative z-10 h-full overflow-y-auto scroll-smooth">
        <div className="p-4 md:p-6 lg:p-8 min-h-full pb-24">
          <Outlet /> 
        </div>
      </main>

    </div>
  );
};

export default AdminLayout;