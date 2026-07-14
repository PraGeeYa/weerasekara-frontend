import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../services/api'; // API Path එක නිවැරදි කර ඇත

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      const response = await api.post('/auth/login', formData);
      
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userRole', response.data.user.role);
      localStorage.setItem('email', response.data.user.email); 

      if (response.data.user.role === 'admin') {
        navigate('/admin'); 
      } else {
        navigate('/');
      }
      
      window.location.reload(); 

    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    // Mobile වලදී ලස්සන Gradient එකක් එක්ක තියෙන්නේ
    <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-slate-100 to-orange-50 relative overflow-hidden">
      
      {/* --- Background Watermark 'W' (මුළු තිරයටම යටින්) --- */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none select-none z-0 opacity-[0.03]">
        <span className="text-[300px] md:text-[400px] font-black text-slate-900 tracking-tighter">
          W
        </span>
      </div>

      {/* --- Left Side: Branding & Image (Desktop වලට විතරක් පේනවා) --- */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-slate-900 overflow-hidden shadow-2xl z-10">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888087819-3286f0821bd2?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center opacity-30 mix-blend-overlay transform hover:scale-105 transition-transform duration-1000"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-orange-900/60"></div>
        
        <div className="relative z-10 flex flex-col justify-center items-start p-16 w-full h-full">
          <div className="bg-white p-3 rounded-2xl mb-8 shadow-lg inline-block">
            <img src="/logo.jpeg" alt="Logo" className="h-16 object-contain rounded-xl" />
          </div>
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-6 leading-tight tracking-tight drop-shadow-md">
            WEERASEKARA <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              CONCRETE WORKS
            </span>
          </h1>
          <p className="text-slate-300 text-lg font-medium max-w-md leading-relaxed border-l-4 border-orange-500 pl-4">
            Official staff portal and management system. Secure access to your workspace.
          </p>
        </div>
      </div>

      {/* --- Right Side: Login Form (Mobile & Desktop දෙකටම) --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 md:p-12 relative z-10">
        
        {/* Glassmorphism Form Card */}
        <div className="w-full max-w-md bg-white/80 lg:bg-white/70 backdrop-blur-2xl p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/60">
          
          {/* --- Mobile View Branding (Phone එකෙන් එන අයට විතරක් පේන්න) --- */}
          <div className="lg:hidden flex flex-col items-center text-center mb-8">
            <div className="bg-white p-2 rounded-2xl mb-4 shadow-md inline-block border border-slate-100">
              <img src="/logo.jpeg" alt="Logo" className="h-14 object-contain rounded-xl" />
            </div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight leading-none">
              WEERASEKARA
            </h1>
            <h2 className="text-[11px] font-black text-orange-600 tracking-[0.2em] uppercase mt-1">
              Concrete Works
            </h2>
          </div>

          {/* Desktop Title */}
          <div className="text-center mb-8 hidden lg:block">
            <h2 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Welcome Back! 👋</h2>
            <p className="text-slate-500 font-bold text-sm uppercase tracking-wider">Please login to your account</p>
          </div>

          {/* Mobile Text */}
          <div className="text-center mb-6 lg:hidden">
            <p className="text-slate-500 font-extrabold text-xs uppercase tracking-widest bg-slate-100/50 py-2 rounded-lg">
              Secure Staff Login
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-100 text-red-600 p-4 rounded-xl text-sm font-bold mb-6 text-center shadow-sm animate-fade-in flex items-center justify-center gap-2">
              <span>⚠️</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-black text-slate-700 mb-1.5 uppercase tracking-wide">Email Address</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
                className="w-full p-4 bg-white/60 border border-slate-200/60 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all font-bold text-slate-800 placeholder-slate-400" 
                placeholder="prageeth@example.com"
              />
            </div>
            
            <div>
              <label className="block text-xs font-black text-slate-700 mb-1.5 uppercase tracking-wide">Password</label>
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleChange} 
                required 
                className="w-full p-4 bg-white/60 border border-slate-200/60 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white outline-none transition-all font-bold text-slate-800 placeholder-slate-400" 
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black text-lg py-4 px-4 rounded-xl shadow-md hover:shadow-lg hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1 mt-6">
              SECURE LOGIN
            </button>
          </form>
          
          <div className="mt-8 text-center">
            <Link to="/" className="text-slate-500 hover:text-orange-600 font-bold text-sm transition-colors flex items-center justify-center gap-1">
              <span>←</span> Return to Home
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Login;