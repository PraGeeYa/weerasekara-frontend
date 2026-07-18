import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  // --- Parallax Scroll Effect සඳහා Scroll Position එක ලබා ගැනීම ---
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-slate-950 min-h-screen text-white font-sans selection:bg-orange-500 selection:text-white relative overflow-hidden">
      
      {/* --- CUSTOM ANIMATIONS --- */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            white-space: nowrap;
            animation: marquee 25s linear infinite;
          }
          @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(40px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fade-in-up 1s ease-out forwards;
          }
          .animation-delay-300 {
            animation-delay: 0.3s;
          }
          .animation-delay-500 {
            animation-delay: 0.5s;
          }
        `}
      </style>

      {/* --- SCROLLING BACKGROUND ELEMENTS (Parallax) --- */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div 
          className="absolute top-1/4 left-[10%] w-[400px] h-[400px] bg-orange-600/10 rounded-full blur-[120px]"
          style={{ transform: `translateY(${scrollY * -0.2}px)` }}
        ></div>
        <div 
          className="absolute top-[60%] right-[5%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px]"
          style={{ transform: `translateY(${scrollY * -0.4}px)` }}
        ></div>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen w-full overflow-hidden flex flex-col justify-center pt-32 pb-24">
        
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-slate-950">
          <img 
            src="/gif block.gif" 
            alt="Weerasekara Concrete Blocks Manufacturing" 
            className="w-full h-[120%] object-cover opacity-60"
            style={{ transform: `translateY(${scrollY * 0.3}px)` }} 
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/40 via-slate-950/80 to-slate-950"></div>
          <div className="absolute top-1/2 left-1/2 w-[40rem] h-[30rem] bg-orange-600/20 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
        </div>

        {/* --- MOVING BACKGROUND TEXT (Marquee) --- */}
        <div className="absolute bottom-10 left-0 w-full overflow-hidden z-0 opacity-[0.05] select-none pointer-events-none">
          <div className="animate-marquee text-[5rem] md:text-[10rem] font-black uppercase text-white w-max flex gap-12">
            <span>Weerasekara Concrete Work</span>
            <span>•</span>
            <span>Weerasekara Concrete Work</span>
            <span>•</span>
            <span>Weerasekara Concrete Work</span>
            <span>•</span>
          </div>
        </div>

        {/* Hero Main Content */}
        <main className="relative z-20 px-6 md:px-12 flex-1 flex flex-col justify-center mt-4 animate-fade-in-up">
          <h1 className="text-5xl md:text-[7.5rem] font-black uppercase leading-[0.85] tracking-tighter text-slate-100 max-w-5xl drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]">
            BUILD THE <br />
            <span className="text-orange-500 drop-shadow-[0_5px_5px_rgba(234,88,12,0.4)]">
              FUTURE OF
            </span> <br />
            STRENGTH <span className="text-orange-500 animate-pulse inline-block">.</span>
          </h1>
          <p className="mt-8 max-w-xl text-lg text-slate-300 font-bold leading-relaxed border-l-4 border-orange-500 pl-5 bg-gradient-to-r from-slate-900/80 to-transparent p-3 rounded-r-xl shadow-lg backdrop-blur-sm">
            Premium manufacturing of industrial-grade concrete blocks, pillars, and structural components. Engineered for ultimate durability since 2015.
          </p>
        </main>

        {/* Hero Bottom Bar */}
        <footer className="relative z-20 px-6 md:px-12 pb-6 mt-16 flex flex-col md:flex-row justify-between items-end gap-8 md:gap-0 animate-fade-in-up animation-delay-300 opacity-0">
          
          <div className="flex flex-wrap gap-4">
            <div className="bg-slate-900/90 backdrop-blur-md border-t border-l border-white/10 shadow-[4px_4px_15px_rgba(0,0,0,0.6)] px-6 py-3 rounded-full text-sm font-black text-slate-200 uppercase tracking-widest flex items-center gap-3 cursor-default">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_10px_#ea580c] animate-pulse"></span>
              High-Grade Quality
            </div>
            <div className="bg-slate-900/90 backdrop-blur-md border-t border-l border-white/10 shadow-[4px_4px_15px_rgba(0,0,0,0.6)] px-6 py-3 rounded-full text-sm font-black text-slate-200 uppercase tracking-widest cursor-default">
              IS0 Standard Materials
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-2xl border-t border-l border-white/10 p-7 rounded-[2rem] w-full md:w-[380px] shadow-[0_20px_40px_rgba(0,0,0,0.8)] transform hover:-translate-y-2 transition-all duration-300 group">
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-3">
                <div className="bg-slate-950 p-2 rounded-xl shadow-inner border border-white/5">
                  <span className="text-2xl">🏗️</span>
                </div>
                <span className="font-black text-slate-200 text-sm uppercase tracking-widest">Ready Mix</span>
              </div>
              <div className="bg-emerald-500/10 text-emerald-400 text-xs font-black px-3 py-1.5 rounded-lg border border-emerald-500/20 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                ↑ In Stock
              </div>
            </div>
            <Link to="/products" className="relative overflow-hidden flex items-center justify-between w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white px-6 py-4 rounded-2xl font-black text-lg uppercase tracking-wider shadow-[0_10px_20px_rgba(234,88,12,0.4)] hover:shadow-[0_15px_30px_rgba(234,88,12,0.6)] transition-all">
              <span className="relative z-10">Order Now</span>
              <span className="text-2xl relative z-10 group-hover:translate-x-2 transition-transform">↗</span>
              <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-white/20 skew-x-12 group-hover:left-[200%] transition-all duration-700 ease-in-out"></div>
            </Link>
          </div>
        </footer>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="relative z-20 -mt-10 px-6 md:px-12 animate-fade-in-up animation-delay-500 opacity-0">
        <div className="max-w-7xl mx-auto bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-white/10">
            <div className="text-center px-4">
              <h3 className="text-4xl md:text-5xl font-black text-orange-500 drop-shadow-md mb-2">10+</h3>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Years Experience</p>
            </div>
            <div className="text-center px-4">
              <h3 className="text-4xl md:text-5xl font-black text-white drop-shadow-md mb-2">5K+</h3>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Projects Delivered</p>
            </div>
            <div className="text-center px-4">
              <h3 className="text-4xl md:text-5xl font-black text-orange-500 drop-shadow-md mb-2">100%</h3>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Quality Assured</p>
            </div>
            <div className="text-center px-4">
              <h3 className="text-4xl md:text-5xl font-black text-white drop-shadow-md mb-2">24/7</h3>
              <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Customer Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US SECTION --- */}
      <section className="py-24 px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">
              Why Choose <span className="text-orange-500">Weerasekara?</span>
            </h2>
            <p className="text-slate-400 font-bold max-w-2xl mx-auto text-lg">
              We don't just make concrete blocks; we build the foundation of your dreams with unmatched quality and strength.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-slate-900/50 backdrop-blur-md border border-white/5 p-8 rounded-3xl hover:bg-slate-800/80 hover:border-orange-500/30 transition-all duration-300 group">
              <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner group-hover:scale-110 transition-transform">💪</div>
              <h3 className="text-xl font-black text-white mb-3 uppercase tracking-wide">Extreme Durability</h3>
              <p className="text-slate-400 font-medium leading-relaxed">Manufactured using industry-leading machinery and premium raw materials to withstand extreme conditions.</p>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-md border border-white/5 p-8 rounded-3xl hover:bg-slate-800/80 hover:border-orange-500/30 transition-all duration-300 group">
              <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner group-hover:scale-110 transition-transform">🚚</div>
              <h3 className="text-xl font-black text-white mb-3 uppercase tracking-wide">Fast Logistics</h3>
              <p className="text-slate-400 font-medium leading-relaxed">Our dedicated transport fleet ensures your orders reach the site safely and exactly on time.</p>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-md border border-white/5 p-8 rounded-3xl hover:bg-slate-800/80 hover:border-orange-500/30 transition-all duration-300 group">
              <div className="w-16 h-16 bg-slate-950 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner group-hover:scale-110 transition-transform">🛡️</div>
              <h3 className="text-xl font-black text-white mb-3 uppercase tracking-wide">Trusted Quality</h3>
              <p className="text-slate-400 font-medium leading-relaxed">Every block is tested for compressive strength, ensuring 100% compliance with ISO construction standards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* --- PRODUCTS SECTION --- */}
      <section className="py-24 px-6 md:px-12 bg-slate-950/80 backdrop-blur-sm relative border-t border-white/5 z-10">
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4 drop-shadow-lg">
                Our <span className="text-orange-500">Products</span>
              </h2>
              <p className="text-slate-400 font-bold max-w-md text-lg">
                Explore our heavy-duty concrete manufacturing lineup. Built to last generations.
              </p>
            </div>
            <Link to="/products" className="mt-6 md:mt-0 bg-slate-900 border border-slate-700 text-orange-500 font-black uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-orange-500 hover:text-white hover:border-orange-500 shadow-[0_0_15px_rgba(234,88,12,0.2)] hover:shadow-[0_0_25px_rgba(234,88,12,0.5)] transition-all flex items-center gap-3 group">
              View Catalog <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {/* Product Grid - Local Images Added Here */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Product Card 1: Block.jpeg */}
            <div className="group relative h-[420px] rounded-3xl overflow-hidden cursor-pointer shadow-[0_15px_30px_rgba(0,0,0,0.5)] border border-white/10 bg-slate-900">
              <img src="/Block.jpeg" alt="Block Gal" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <p className="text-orange-500 font-black text-xs uppercase tracking-widest mb-2 shadow-sm">Top Seller</p>
                <h3 className="text-3xl font-black uppercase tracking-tight mb-3 drop-shadow-md">Block Gal</h3>
                <p className="text-slate-300 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">Standard & custom sized solid concrete blocks for heavy construction.</p>
              </div>
            </div>

            {/* Product Card 2: stone.jpeg */}
            <div className="group relative h-[420px] rounded-3xl overflow-hidden cursor-pointer shadow-[0_15px_30px_rgba(0,0,0,0.5)] border border-white/10 bg-slate-900">
              <img src="/stone.jpeg" alt="Concrete Rings and Aggregates" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <p className="text-orange-500 font-black text-xs uppercase tracking-widest mb-2 shadow-sm">Infrastructure</p>
                <h3 className="text-3xl font-black uppercase tracking-tight mb-3 drop-shadow-md">Concrete Rings</h3>
                <p className="text-slate-300 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">Durable concrete cylinders for wells, drainage, and industrial plumbing.</p>
              </div>
            </div>

            {/* Product Card 3: stone 2.jpeg */}
            <div className="group relative h-[420px] rounded-3xl overflow-hidden cursor-pointer shadow-[0_15px_30px_rgba(0,0,0,0.5)] border border-white/10 bg-slate-900">
              <img src="/stone 2.jpeg" alt="Fence Posts and Pillars" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                <p className="text-orange-500 font-black text-xs uppercase tracking-widest mb-2 shadow-sm">Boundaries</p>
                <h3 className="text-3xl font-black uppercase tracking-tight mb-3 drop-shadow-md">Fence Posts</h3>
                <p className="text-slate-300 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">Reinforced concrete pillars for boundary walls and security fencing.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- BOTTOM CALL TO ACTION (CTA) --- */}
      <section className="py-20 px-6 md:px-12 relative z-10 border-t border-white/5">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-orange-600 to-orange-500 rounded-[3rem] p-10 md:p-16 text-center shadow-[0_20px_50px_rgba(234,88,12,0.3)] relative overflow-hidden group">
          
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm pointer-events-none"></div>
          <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-white/20 skew-x-12 group-hover:left-[200%] transition-all duration-1000 ease-in-out pointer-events-none"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black uppercase text-white mb-6 tracking-tight">Ready to build something strong?</h2>
            <p className="text-orange-100 font-bold text-lg max-w-2xl mx-auto mb-10">
              Get in touch with our sales team today for quotations, bulk orders, and technical support.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/contact" className="bg-slate-950 text-white hover:bg-slate-900 px-8 py-4 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                Contact Us Now
              </Link>
              <a href="tel:0753641229" className="bg-white/20 hover:bg-white text-white hover:text-orange-600 backdrop-blur-md px-8 py-4 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1 border border-white/30">
                Call 075 364 1229
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;