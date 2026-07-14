import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const AdminLayout = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { path: '/admin', name: 'Dashboard', icon: '📊' },
    { path: '/admin/finance', name: 'Finance', icon: '💵' },
    { path: '/admin/employees', name: 'Employees', icon: '👥' },
    { path: '/admin/ledger', name: 'Ledger', icon: '🧾' },
    { path: '/admin/logs', name: 'Logs', icon: '🕵️‍♂️' },
    { path: '/admin/orders', name: 'Orders', icon: '📦' },
    { path: '/admin/products', name: 'Products', icon: '🧱' },
  ];

  return (
    <div className="flex min-h-[90vh] bg-gradient-to-br from-slate-50 via-slate-100 to-orange-50 relative overflow-hidden">
      
      {/* Background Watermark & Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-300/20 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute inset-0 flex justify-center items-center opacity-[0.05]">
          <span className="text-[300px] font-black text-slate-900 select-none">W</span>
        </div>
      </div>

      {/* Mobile Menu Toggle Button */}
      <button 
        className="md:hidden fixed top-4 left-4 z-50 bg-slate-900 text-white p-2 rounded-lg"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? '✕' : '☰'}
      </button>

      {/* Sidebar */}
      <aside className={`${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative z-40 w-64 h-full bg-white/70 backdrop-blur-xl border-r border-white/50 transition-transform duration-300`}>
        <div className="p-6 mt-10 md:mt-0">
          <h2 className="text-2xl font-black text-slate-900">Admin <span className="text-orange-600">Panel</span></h2>
        </div>
        
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <Link 
              key={item.path}
              to={item.path} 
              onClick={() => setIsMobileMenuOpen(false)} // ලින්ක් එක එබුවම මෙනු එක වැහෙන්න
              className={`flex items-center px-4 py-3 rounded-xl font-bold transition ${
                location.pathname === item.path 
                  ? 'bg-slate-900 text-orange-400' 
                  : 'text-slate-600 hover:bg-white/80'
              }`}
            >
              <span className="mr-3">{item.icon}</span> {item.name}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative z-[5] h-[90vh] w-full pt-16 md:pt-0">
        <Outlet /> 
      </main>

    </div>
  );
};

export default AdminLayout;