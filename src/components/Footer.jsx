import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    // තද නිල් පාට පසුබිම සහ උඩින් තැඹිලි පාට ඉරක්
    <footer className="bg-slate-900 text-slate-300 border-t-4 border-orange-600 relative overflow-hidden mt-auto z-50">
      
      {/* Background Watermark (Footer එකටත් W අකුර ලාවට දැම්මා) */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none select-none z-0 opacity-[0.02]">
        <span className="text-[250px] font-black text-white tracking-tighter transform -translate-y-4">
          W
        </span>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          
          {/* 1. Brand & About Section */}
          <div>
            <Link to="/" className="flex items-center mb-5 inline-block">
              {/* Footer එකට ගැලපෙන විදිහට Logo එක සුදු පසුබිමක */}
              <img 
                src="/logo.jpeg" 
                alt="Weerasekara Concrete Work" 
                className="h-14 object-contain rounded-xl bg-white p-1 shadow-md" 
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed mb-4 font-medium">
              Your trusted partner for high-quality concrete manufacturing and reliable services. Building trust and strength for all your construction needs.
            </p>
            <p className="text-sm font-bold text-orange-400 flex items-center">
              <span className="mr-2 text-lg">📍</span> Hettipola, Matale
            </p>
          </div>

          {/* 2. Quick Links Section */}
          <div>
            <h3 className="text-white font-black text-lg mb-5 uppercase tracking-widest flex items-center">
              <span className="text-orange-500 mr-2 text-xl">🔗</span> Quick Links
            </h3>
            <ul className="space-y-3 font-bold text-sm">
              <li>
                <Link to="/" className="hover:text-orange-500 hover:translate-x-2 transition-all inline-block">Shop & Home</Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-orange-500 hover:translate-x-2 transition-all inline-block">Admin Dashboard</Link>
              </li>
              <li>
                <Link to="/admin/products" className="hover:text-orange-500 hover:translate-x-2 transition-all inline-block">Our Products</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-orange-500 hover:translate-x-2 transition-all inline-block">Staff Login</Link>
              </li>
            </ul>
          </div>

          {/* 3. Contact Info Section */}
          <div>
            <h3 className="text-white font-black text-lg mb-5 uppercase tracking-widest flex items-center">
              <span className="text-orange-500 mr-2 text-xl">📞</span> Contact Us
            </h3>
            <div className="space-y-4">
              
              {/* Phone 1 (CEO) */}
              <div className="flex items-start bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 hover:border-orange-500/50 transition-colors group">
                <span className="text-orange-500 mr-3 text-2xl mt-1">📱</span>
                <div className="flex-1">
                  <p className="font-black text-white text-lg tracking-wide group-hover:text-orange-400 transition-colors">071 128 0013</p>
                  <p className="text-xs text-orange-300 font-bold uppercase tracking-wide mt-0.5">W M J K Weerasekara</p>
                  {/* Owner & CEO Tag */}
                  <span className="inline-block mt-1.5 bg-slate-900/80 text-slate-300 text-[10px] px-2 py-0.5 rounded-md font-black uppercase tracking-widest border border-slate-600">
                    Owner & CEO
                  </span>
                </div>
              </div>

              {/* Phone 2 (CEO) */}
              <div className="flex items-start bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 hover:border-orange-500/50 transition-colors group">
                <span className="text-orange-500 mr-3 text-2xl mt-1">📱</span>
                <div className="flex-1">
                  <p className="font-black text-white text-lg tracking-wide group-hover:text-orange-400 transition-colors">076 718 4605</p>
                  <p className="text-xs text-orange-300 font-bold uppercase tracking-wide mt-0.5">W M P K Weerasekara</p>
                  {/* Owner & CEO Tag */}
                  <span className="inline-block mt-1.5 bg-slate-900/80 text-slate-300 text-[10px] px-2 py-0.5 rounded-md font-black uppercase tracking-widest border border-slate-600">
                    Owner & CEO
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center mt-3 pl-2">
                <span className="text-slate-400 mr-3 text-xl">✉️</span>
                <a href="mailto:prageeth.kweerasekara@gmail.com" className="font-bold text-slate-300 text-sm hover:text-orange-400 transition-colors break-all">
                  prageeth.kweerasekara@gmail.com
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* Copyright Bottom Section */}
        <div className="border-t border-slate-700/50 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-slate-500 font-bold mb-3 md:mb-0 text-center md:text-left">
            &copy; {new Date().getFullYear()} Weerasekara Concrete Work. All rights reserved.
          </p>
          <p className="text-xs text-slate-600 font-black uppercase tracking-[0.2em] text-center md:text-right">
            Developed by <span className="text-slate-400">PraGeeYa</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;