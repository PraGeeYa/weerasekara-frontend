import React from 'react';

const ContactUs = () => {
  // Ultra-Modern Glassmorphism Class
  const glassCard = "bg-slate-900/40 backdrop-blur-2xl border border-white/5 shadow-[0_10px_30px_rgba(0,0,0,0.5)] rounded-3xl p-6 md:p-8 transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] transform hover:-translate-y-3 hover:shadow-[0_20px_40px_rgba(234,88,12,0.12)] hover:border-orange-500/30 group relative overflow-hidden";

  return (
    <div className="relative min-h-screen bg-slate-950 text-white font-sans overflow-hidden pb-24 pt-32 selection:bg-orange-500 selection:text-white">
      
      {/* --- ADVANCED CUSTOM ANIMATIONS --- */}
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
          .animate-marquee {
            display: flex;
            white-space: nowrap;
            animation: marquee 30s linear infinite;
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(50px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fade-in-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.2; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(1.05); }
          }
          .animate-pulse-slow {
            animation: pulse-slow 4s ease-in-out infinite;
          }
          /* Grid Pattern Background */
          .bg-grid-pattern {
            background-size: 40px 40px;
            background-image: linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          }
        `}
      </style>

      {/* --- Background Ambient Glows & Grid --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-grid-pattern pointer-events-none"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* --- MOVING BACKGROUND TEXT (Marquee at the bottom) --- */}
      <div className="absolute bottom-6 left-0 w-full overflow-hidden z-0 opacity-[0.03] select-none pointer-events-none">
        <div className="animate-marquee text-[5rem] md:text-[12rem] font-black uppercase text-white w-max flex gap-12 leading-none">
          <span>Weerasekara Concrete Work</span>
          <span>•</span>
          <span>Weerasekara Concrete Work</span>
          <span>•</span>
          <span>Weerasekara Concrete Work</span>
          <span>•</span>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* --- Header Section --- */}
        <div className="text-center mb-20 transform transition-all duration-700 hover:scale-[1.01] animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-slate-900/80 border border-orange-500/30 px-5 py-2 rounded-full mb-6 shadow-[0_0_20px_rgba(234,88,12,0.15)] backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-ping"></span>
            <span className="text-orange-500 text-xs font-black uppercase tracking-widest">Get in touch with us</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tighter drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]">
            CONTACT & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600 drop-shadow-[0_5px_5px_rgba(234,88,12,0.4)]">OUR STORY</span>
          </h1>
          <p className="text-lg text-slate-400 font-medium max-w-2xl mx-auto leading-relaxed">
            We are always here to help you. Reach out to our management, sales, or transport teams directly for a seamless experience.
          </p>
        </div>

        {/* --- Our Story / Heritage Section (Dark Glass Card) --- */}
        <div className="mb-20 flex flex-col md:flex-row gap-12 items-center bg-slate-900/40 backdrop-blur-2xl border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[2.5rem] p-8 md:p-12 animate-fade-in-up relative overflow-hidden group hover:border-orange-500/20 transition-colors duration-700" style={{ animationDelay: '0.2s', opacity: 0 }}>
          
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-orange-500/10 transition-colors duration-1000"></div>

          <div className="w-full md:w-5/12 flex justify-center perspective-1000 relative z-10">
            <div className="relative bg-slate-950 p-3 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/10 transform -rotate-3 hover:rotate-0 hover:scale-105 transition-all duration-500 animate-float w-full max-w-[380px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-transparent opacity-0 group-hover:opacity-100 rounded-[2rem] transition-opacity duration-500"></div>
              <img src="/owners .jpeg" alt="Founders of Weerasekara Concrete Works" className="h-64 md:h-80 w-full object-cover rounded-[1.5rem] opacity-90 group-hover:opacity-100 transition-opacity filter grayscale-[20%] group-hover:grayscale-0" />
            </div>
          </div>
          
          <div className="w-full md:w-7/12 relative z-10">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6 flex items-center gap-4 drop-shadow-md tracking-tight">
              <span className="bg-slate-800 p-3 rounded-xl border border-white/10 shadow-inner">🏛️</span> 
              Our Proud Legacy
            </h2>
            
            <p className="text-slate-300 font-medium text-lg leading-relaxed mb-6">
              Established in <strong className="text-orange-500 font-black">2015</strong> by our proud Founder and Owner, <strong className="text-white font-black">Mr. Jayantha Weerasekara</strong>, <strong className="text-white font-black">Weerasekara Concrete Work</strong> was built on the vision of providing the highest quality construction materials to Matale and its surrounding areas.
            </p>
            
            {/* පවුලේ පුතාලා දෙන්නා ගැන එකතු කළ කොටස */}
            <p className="text-slate-300 font-medium text-lg leading-relaxed mb-6">
              Today, this proud legacy is successfully carried forward and modernized by his two sons, <strong className="text-white font-black">Mr. W M P K Weerasekara</strong> and <strong className="text-white font-black">Mr. W M P S Weerasekara</strong>. Together as a family, they specialize in manufacturing highly durable concrete blocks, pillars, and custom concrete products tailored for maximum strength and longevity.
            </p>
            
            <div className="border-l-4 border-orange-500 pl-6 py-2 relative">
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-orange-500/10 to-transparent opacity-50"></div>
              <p className="text-slate-200 font-bold text-lg leading-relaxed relative z-10">
                Our dedicated team, from management to transport, ensures that you receive the best materials right on time at your construction site. Your strong foundation begins with us!
              </p>
            </div>
          </div>
        </div>

        {/* --- Contact Info Grid (Staggered Animation) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          
          {/* 1. Owners & CEOs */}
          <div className={`${glassCard} animate-fade-in-up`} style={{ animationDelay: '0.4s', opacity: 0 }}>
            <div className="bg-slate-950 border border-white/10 text-white w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-inner group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500">👔</div>
            <h3 className="text-xl font-black text-white mb-6 pb-4 border-b border-white/10 uppercase tracking-widest">Owners & CEOs</h3>
            
            <div className="space-y-4 relative z-10">
              {/* CEO 1 - Jayantha */}
              <div className="p-4 rounded-2xl bg-slate-950/40 hover:bg-slate-900 transition-all border border-transparent hover:border-white/10 shadow-sm hover:shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-orange-500/40 rounded-full blur-md animate-pulse-slow"></div>
                    <img src="/Image 01 owner.jpeg" alt="W M J K Weerasekara" className="w-14 h-14 rounded-full object-cover border-2 border-slate-700 relative z-10 shadow-lg" />
                  </div>
                  <div>
                    <p className="font-black text-white text-lg leading-tight">W M J K Weerasekara</p>
                    <p className="text-[10px] text-orange-400 font-black tracking-widest uppercase mt-1">Founder / Owner</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/5">
                  <span className="text-slate-400 font-bold tracking-widest text-sm">071 128 0013</span>
                  <a href="https://wa.me/94711280013" target="_blank" rel="noreferrer" className="relative overflow-hidden bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-lg text-xs font-black hover:bg-emerald-500 hover:text-white transition-all shadow-sm hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] flex items-center gap-1 transform hover:-translate-y-0.5 group/btn">
                    <span className="absolute top-0 -left-[100%] w-1/2 h-full bg-white/20 skew-x-12 group-hover/btn:left-[200%] transition-all duration-700 ease-in-out"></span>
                    <span className="relative z-10">💬 WhatsApp</span>
                  </a>
                </div>
              </div>
              
              {/* CEO 2 - Prageeth */}
              <div className="p-4 rounded-2xl bg-slate-950/40 hover:bg-slate-900 transition-all border border-transparent hover:border-white/10 shadow-sm hover:shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-blue-500/40 rounded-full blur-md animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
                    <img src="/PraGeeYa.jpeg" alt="W M P K Weerasekara" className="w-14 h-14 rounded-full object-cover border-2 border-slate-700 relative z-10 shadow-lg" />
                  </div>
                  <div>
                    <p className="font-black text-white text-lg leading-tight">W M P K Weerasekara</p>
                    <p className="text-[10px] text-blue-400 font-black tracking-widest uppercase mt-1">Co-Owner / Manager</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/5">
                  <span className="text-slate-400 font-bold tracking-widest text-sm">076 718 4605</span>
                  <a href="https://wa.me/94767184605" target="_blank" rel="noreferrer" className="relative overflow-hidden bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-lg text-xs font-black hover:bg-emerald-500 hover:text-white transition-all shadow-sm hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] flex items-center gap-1 transform hover:-translate-y-0.5 group/btn">
                    <span className="absolute top-0 -left-[100%] w-1/2 h-full bg-white/20 skew-x-12 group-hover/btn:left-[200%] transition-all duration-700 ease-in-out"></span>
                    <span className="relative z-10">💬 WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Administration & Management */}
          <div className={`${glassCard} animate-fade-in-up`} style={{ animationDelay: '0.6s', opacity: 0 }}>
            <div className="bg-slate-950 border border-orange-500/30 text-white w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-[0_0_20px_rgba(234,88,12,0.2)] group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500">💼</div>
            <h3 className="text-xl font-black text-white mb-6 pb-4 border-b border-white/10 uppercase tracking-widest">Admin & Management</h3>
            
            <div className="space-y-4 relative z-10">
              
              {/* Admin / Management 3 - W M P S Weerasekara (අලුතින් එකතු කළ කොටස) */}
              <div className="p-4 rounded-2xl bg-slate-950/40 hover:bg-slate-900 transition-all border border-transparent hover:border-white/10 shadow-sm hover:shadow-lg">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-orange-500/40 rounded-full blur-md animate-pulse-slow"></div>
                    {/* අලුත් පින්තූරය */}
                    <img src="/238176.jpg" alt="W M P S Weerasekara" className="w-14 h-14 rounded-full object-cover border-2 border-slate-700 relative z-10 shadow-lg" />
                  </div>
                  <div>
                    <p className="font-black text-white text-lg leading-tight">W M P S Weerasekara</p>
                    <p className="text-[10px] text-orange-400 font-black tracking-widest uppercase mt-1">Admin Management</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-2 pt-4 border-t border-white/5">
                  <span className="text-slate-400 font-bold tracking-widest text-sm">076 858 2311</span>
                  <a href="https://wa.me/94768582311" target="_blank" rel="noreferrer" className="relative overflow-hidden bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1.5 rounded-lg text-xs font-black hover:bg-emerald-500 hover:text-white transition-all shadow-sm hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] flex items-center gap-1 transform hover:-translate-y-0.5 group/btn">
                    <span className="absolute top-0 -left-[100%] w-1/2 h-full bg-white/20 skew-x-12 group-hover/btn:left-[200%] transition-all duration-700 ease-in-out"></span>
                    <span className="relative z-10">💬 WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Accountant */}
              <div className="p-4 rounded-2xl bg-slate-950/40 hover:bg-slate-900 transition-all border border-transparent hover:border-white/10">
                <p className="font-black text-white text-lg">W M R S Weerasekara</p>
                <p className="text-[10px] text-orange-400 font-black uppercase tracking-widest mb-3 mt-1">Accountant</p>
                <p className="text-slate-400 font-bold tracking-widest text-sm bg-slate-950 inline-block px-3 py-1.5 rounded-lg border border-white/5">076 310 2038</p>
              </div>

              {/* Business WhatsApp */}
              <div className="p-4 rounded-2xl bg-slate-950/40 hover:bg-slate-900 transition-all border border-transparent hover:border-orange-500/30 relative overflow-hidden group/box">
                <div className="absolute top-[-50%] right-[-50%] w-32 h-32 bg-orange-500/20 rounded-full blur-2xl pointer-events-none group-hover/box:bg-orange-500/30 transition-colors"></div>
                <p className="font-black text-white text-lg relative z-10">Business WhatsApp</p>
                <p className="text-[10px] text-orange-400 font-black uppercase tracking-widest mb-3 mt-1 relative z-10">General Inquiries</p>
                <div className="flex items-center justify-between mt-1 relative z-10">
                  <span className="text-slate-400 font-bold tracking-widest text-sm">075 364 1229</span>
                  <a href="https://wa.me/94753641229" target="_blank" rel="noreferrer" className="relative overflow-hidden bg-orange-500/10 text-orange-400 border border-orange-500/30 px-3 py-1.5 rounded-lg text-xs font-black hover:bg-orange-500 hover:text-white transition-all shadow-[0_0_10px_rgba(234,88,12,0.1)] hover:shadow-[0_0_20px_rgba(234,88,12,0.4)] flex items-center gap-1 transform hover:-translate-y-0.5 group/btn">
                    <span className="absolute top-0 -left-[100%] w-1/2 h-full bg-white/20 skew-x-12 group-hover/btn:left-[200%] transition-all duration-700 ease-in-out"></span>
                    <span className="relative z-10">💬 Chat Now</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Transport & Logistics */}
          <div className={`${glassCard} animate-fade-in-up`} style={{ animationDelay: '0.8s', opacity: 0 }}>
            <div className="bg-slate-950 border border-blue-500/30 text-white w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-[0_0_20px_rgba(59,130,246,0.2)] group-hover:scale-110 group-hover:translate-x-2 transition-transform duration-500">🚚</div>
            <h3 className="text-xl font-black text-white mb-6 pb-4 border-b border-white/10 uppercase tracking-widest">Transport & Logistics</h3>
            
            <div className="space-y-4 relative z-10">
              {/* Driver */}
              <div className="p-5 rounded-2xl bg-slate-950/40 hover:bg-slate-900 transition-all border border-transparent hover:border-white/10">
                <p className="font-black text-white text-lg">Nilantha</p>
                <p className="text-[10px] text-blue-400 font-black uppercase tracking-widest mb-3 mt-1">Head Driver</p>
                <p className="text-slate-400 font-bold tracking-widest text-sm bg-slate-950 inline-block px-3 py-1.5 rounded-lg border border-white/5">077 764 9535</p>
              </div>
              
              <div className="bg-gradient-to-br from-slate-950/80 to-slate-900 p-6 rounded-2xl mt-4 border border-white/5 shadow-inner group-hover:border-blue-500/20 transition-colors">
                <p className="text-sm text-slate-400 font-medium leading-relaxed">
                  Contact our transport division for real-time delivery updates, location guidance, and bulk transport inquiries.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* --- Location & Google Map --- */}
        <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/5 rounded-[3rem] p-4 md:p-8 shadow-[0_30px_60px_rgba(0,0,0,0.6)] relative overflow-hidden group transform transition-all duration-500 hover:border-orange-500/20 animate-fade-in-up" style={{ animationDelay: '1s', opacity: 0 }}>
          
          <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[120px] pointer-events-none group-hover:bg-orange-600/10 transition-colors duration-1000"></div>

          <div className="flex flex-col lg:flex-row gap-10 items-center relative z-10">
            
            {/* Address Details */}
            <div className="w-full lg:w-1/3 p-4 md:p-8">
              <div className="bg-slate-950 border border-white/10 text-orange-500 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-8 shadow-inner group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500">📍</div>
              <h2 className="text-4xl font-black text-white mb-6 tracking-tight uppercase">Our Factory Location</h2>
              <div className="bg-slate-950/60 p-8 rounded-[2rem] border border-white/5 mb-8 transform group-hover:translate-x-2 transition-transform duration-500 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
                <p className="text-slate-300 font-bold text-lg leading-loose tracking-wide">
                  765, Kubukoya,<br />
                  Hadungamuwa, Matale,<br />
                  Hettipola 21536
                </p>
              </div>
              <a 
                href="https://maps.app.goo.gl/UQjKsNwyYRRg1WnX9" 
                target="_blank" 
                rel="noreferrer"
                className="relative overflow-hidden inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-5 rounded-2xl font-black uppercase tracking-widest hover:from-orange-600 hover:to-orange-700 transition-all shadow-[0_15px_30px_rgba(234,88,12,0.3)] hover:shadow-[0_20px_40px_rgba(234,88,12,0.5)] gap-3 w-full md:w-auto transform hover:-translate-y-1 group/map"
              >
                <span className="absolute top-0 -left-[100%] w-1/2 h-full bg-white/20 skew-x-12 group-hover/map:left-[200%] transition-all duration-700 ease-in-out"></span>
                <span className="text-2xl relative z-10">🗺️</span> 
                <span className="relative z-10">Open in Maps App</span>
              </a>
            </div>

            {/* Google Map Embedded Iframe */}
            <div className="w-full lg:w-2/3 h-[400px] md:h-[500px] rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/10 bg-slate-950 transform transition-transform duration-700 group-hover:scale-[1.02]">
              <iframe 
                src="https://maps.google.com/maps?q=Hettipola,Matale&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Weerasekara Concrete Works Location"
                className="filter contrast-[1.1] saturate-[1.2] opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              ></iframe>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactUs;