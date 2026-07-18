import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    // Premium Dark Background with animated grain effect and top gradient border
    <footer className="relative bg-slate-950 text-slate-300 overflow-hidden mt-auto z-50 selection:bg-orange-500 selection:text-white">
      
      {/* --- PREMIUM VISUAL EFFECTS --- */}
      <style>
        {`
          @keyframes subtly-move {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-subtly-move {
            animation: subtly-move 20s ease infinite;
          }
          /* Grain texture override */
          .bg-grain {
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/1999/xlink' width='400' height='400' viewBox='0 0 400 400'%3E%3Cdefs%3E%3Cfilter id='a' x='0' y='0' width='400' height='400' filterUnits='userSpaceOnUse' color-interpolation-filters='sRGB'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.15 0'/%3E%3C/filter%3E%3C/defs%3E%3Crect width='400' height='400' fill='%23fff' opacity='0.02'/%3E%3Crect width='400' height='400' filter='url(%23a)' opacity='0.03'/%3E%3C/svg%3E");
          }
        `}
      </style>

      {/* Dynamic Top Border (Gradient) */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-600 animate-subtly-move bg-[length:200%_auto] z-20"></div>

      {/* --- BACKGROUND LAYERS --- */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-slate-950"></div>
        {/* Subtly moving background grain texture */}
        <div className="absolute inset-0 bg-grain animate-subtly-move opacity-30 z-10"></div>
        
        {/* Ambient Glows (Orange and Blue) matching page style */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-orange-600/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none"></div>

        {/* --- Background Watermark "W" --- */}
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none select-none z-0 opacity-[0.03]">
          <span className="text-[300px] font-black text-white tracking-tighter transform -translate-y-8 select-none">
            W
          </span>
        </div>
      </div>

      {/* --- MAIN FOOTER CONTENT --- */}
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          
          {/* 1. Brand & About Section */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center group relative inline-block">
              {/* Circular Logo Wrapper with subtle pulse and glow */}
              <div className="absolute inset-0 bg-white/5 blur-md rounded-full group-hover:bg-orange-500/20 transition-all duration-500"></div>
              <img 
                src="/logo.jpeg" 
                alt="Weerasekara Concrete Work" 
                className="h-16 w-16 object-contain rounded-full bg-white p-1.5 shadow-[0_10px_20px_rgba(0,0,0,0.5)] border border-white/10 group-hover:scale-105 transition-all duration-300 relative z-10" 
              />
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">
              Your trusted partner for high-quality concrete manufacturing and reliable construction services. Building trust and strength since 2015.
            </p>
            <div className="flex items-center gap-2 text-sm font-bold text-orange-400 bg-slate-900/50 p-3 rounded-full border border-white/5 inline-block shadow-inner hover:border-orange-500/20 transition-all">
              <span className="text-lg">📍</span> Hadungamuwa, Matale
            </div>
          </div>

          {/* 2. Quick Links Section */}
          <div className="space-y-6">
            <h3 className="text-white font-black text-xl uppercase tracking-widest flex items-center relative gap-2">
              <span className="text-orange-500 text-2xl">🔗</span> Quick Links
              <span className="absolute bottom-[-10px] left-0 w-12 h-1 bg-orange-600 rounded-full"></span>
            </h3>
            <ul className="space-y-4 font-bold text-sm pt-3">
              {[
                { to: "/", text: "Home & Shop" },
                { to: "/contact", text: "Contact Us" },
                { to: "/admin", text: "Admin Dashboard" },
                { to: "/login", text: "Staff Login" }
              ].map((link, index) => (
                <li key={index} className="group flex items-center gap-2">
                  <span className="w-0 h-0.5 bg-orange-500 opacity-0 group-hover:w-4 group-hover:opacity-100 transition-all duration-300 rounded-full"></span>
                  <Link to={link.to} className="text-slate-300 group-hover:text-white transition-colors">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Contact Info Section with Glass Cards */}
          <div className="space-y-6">
            <h3 className="text-white font-black text-xl uppercase tracking-widest flex items-center relative gap-2">
              <span className="text-orange-500 text-2xl">📞</span> Contact Us
              <span className="absolute bottom-[-10px] left-0 w-12 h-1 bg-orange-600 rounded-full"></span>
            </h3>
            <div className="space-y-5 pt-3">
              
              {/* Premium Contact Card 1 */}
              <div className="flex items-start bg-slate-900/60 backdrop-blur-lg p-4 rounded-2xl border border-white/5 hover:border-orange-500/30 hover:shadow-[0_10px_25px_rgba(234,88,12,0.1)] transition-all duration-300 group overflow-hidden relative">
                {/* Contact card inner glow */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-orange-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-orange-500/10 transition-colors"></div>
                
                <span className="text-orange-500 mr-4 text-2xl mt-1.5 animate-pulse group-hover:scale-110 transition-transform">📱</span>
                <div className="flex-1 relative z-10">
                  <p className="font-black text-white text-lg tracking-wide group-hover:text-orange-400 transition-colors">071 128 0013</p>
                  <p className="text-[11px] text-orange-400 font-black uppercase tracking-widest mt-1">W M J K Weerasekara</p>
                  <span className="inline-block mt-2 bg-slate-950 border border-white/10 text-slate-400 text-[9px] px-2.5 py-1 rounded-md font-black uppercase tracking-widest shadow-inner">
                    Founder / Owner / CEO
                  </span>
                </div>
              </div>

              {/* Premium Contact Card 2 */}
              <div className="flex items-start bg-slate-900/60 backdrop-blur-lg p-4 rounded-2xl border border-white/5 hover:border-orange-500/30 hover:shadow-[0_10px_25px_rgba(234,88,12,0.1)] transition-all duration-300 group overflow-hidden relative">
                <div className="absolute top-0 right-0 w-16 h-16 bg-orange-500/5 rounded-full blur-xl pointer-events-none group-hover:bg-orange-500/10 transition-colors"></div>
                
                <span className="text-orange-500 mr-4 text-2xl mt-1.5 animate-pulse group-hover:scale-110 transition-transform">📱</span>
                <div className="flex-1 relative z-10">
                  <p className="font-black text-white text-lg tracking-wide group-hover:text-orange-400 transition-colors">076 718 4605</p>
                  <p className="text-[11px] text-orange-400 font-black uppercase tracking-widest mt-1">W M P K Weerasekara</p>
                  <span className="inline-block mt-2 bg-slate-950 border border-white/10 text-slate-400 text-[9px] px-2.5 py-1 rounded-md font-black uppercase tracking-widest shadow-inner">
                    Co-Owner / Manager
                  </span>
                </div>
              </div>

              {/* Email (Sleeker look) */}
              <div className="flex items-center mt-4 pl-3 py-2 bg-slate-900/50 rounded-xl border border-white/5 hover:border-white/10 transition-all">
                <span className="text-slate-400 mr-3 text-xl">✉️</span>
                <a href="mailto:prageeth.kweerasekara@gmail.com" className="font-bold text-slate-300 text-sm hover:text-orange-400 transition-colors break-all">
                  prageeth.kweerasekara@gmail.com
                </a>
              </div>

            </div>
          </div>

        </div>

        {/* --- COPYRIGHT BOTTOM SECTION --- */}
        <div className="border-t border-slate-700/40 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-sm text-slate-500 font-bold">
            &copy; {new Date().getFullYear()} <span className="text-slate-400">Weerasekara Concrete Work</span>. All rights reserved. <br className="md:hidden" /> Matale, Sri Lanka.
          </p>
          <div className="text-xs text-slate-600 font-black uppercase tracking-[0.3em] bg-slate-900/60 px-4 py-2 rounded-full border border-white/5">
            Developed by <span className="text-slate-400 group relative">PraGeeYa</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;