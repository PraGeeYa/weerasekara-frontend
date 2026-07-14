import React from 'react';

const ContactUs = () => {
  // වීදුරු (Glassmorphism) පන්ති + අලුත් Animations
  const glassCard = "bg-white/70 backdrop-blur-xl border border-white/60 shadow-lg shadow-slate-200/40 rounded-3xl p-6 md:p-8 transition-all duration-500 ease-out transform hover:-translate-y-3 hover:shadow-2xl hover:shadow-orange-200/60 group";

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-orange-50 overflow-hidden font-sans pb-20 pt-8 md:pt-12">
      
      {/* --- Background Watermark 'W' & Floating Blobs --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-orange-400/10 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
        <div className="absolute inset-0 flex justify-center items-center opacity-[0.03]">
          <span className="text-[400px] md:text-[600px] lg:text-[800px] font-black text-slate-900 tracking-tighter select-none">
            W
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        
        {/* --- Header Section --- */}
        <div className="text-center mb-16 transform transition-all duration-700 hover:scale-[1.02]">
          <span className="bg-orange-500/10 text-orange-600 border border-orange-500/20 px-5 py-2 rounded-full text-sm font-black uppercase tracking-widest mb-6 inline-block shadow-sm">
            Get in touch with us
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight drop-shadow-sm">
            Contact & <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">Our Story</span>
          </h1>
          <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
            We are always here to help you. Reach out to our management, sales, or transport teams directly for a seamless experience.
          </p>
        </div>

        {/* --- Our Story / Heritage Section (Glass Card) --- */}
        <div className={`${glassCard} mb-16 flex flex-col md:flex-row gap-10 items-center bg-white/80`}>
          <div className="w-full md:w-1/3 flex justify-center perspective-1000">
            <div className="bg-white p-4 rounded-3xl shadow-xl border border-slate-100 transform -rotate-2 group-hover:rotate-0 group-hover:scale-105 transition-all duration-500">
              <img src="/logo.jpeg" alt="Weerasekara Concrete Works" className="h-40 md:h-56 object-contain rounded-2xl" />
            </div>
          </div>
          <div className="w-full md:w-2/3">
            <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center gap-3">
              <span className="text-orange-500 text-4xl">🏛️</span> Our Proud Legacy
            </h2>
            
            <p className="text-slate-600 font-medium text-lg leading-relaxed mb-5">
              Established in <strong className="text-orange-600 font-black">2015</strong> by our proud Founder and Owner, <strong className="text-slate-900 font-black">Mr. Jayantha Weerasekara</strong>, <strong className="text-slate-900 font-black">Weerasekara Concrete Work</strong> was built on the vision of providing the highest quality construction materials to Matale and its surrounding areas.
            </p>
            
            <p className="text-slate-600 font-medium text-lg leading-relaxed mb-5">
              Today, this proud legacy is carried forward and modernized by his son and Second Owner, <strong className="text-slate-900 font-black">Mr. Prageeth Weerasekara</strong>. Together, we specialize in manufacturing highly durable concrete blocks, pillars, and custom concrete products tailored for maximum strength and longevity.
            </p>
            
            <p className="text-slate-600 font-medium text-lg leading-relaxed border-l-4 border-orange-500 pl-4 bg-orange-50/50 py-2 rounded-r-lg">
              Our dedicated team, from management to transport, ensures that you receive the best materials right on time at your construction site. Your strong foundation begins with us!
            </p>
          </div>
        </div>

        {/* --- Contact Info Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          
          {/* 1. Owners & CEOs */}
          <div className={glassCard}>
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 text-white w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg shadow-slate-900/30 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">👔</div>
            <h3 className="text-xl font-black text-slate-900 mb-6 border-b border-slate-200 pb-3">Owners & CEOs</h3>
            
            <div className="space-y-6 flex-1">
              {/* CEO 1 */}
              <div className="p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <p className="font-black text-slate-800 text-lg">W M J K Weerasekara</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-slate-500 font-bold tracking-wide">071 128 0013</span>
                  <a href="https://wa.me/94711280013" target="_blank" rel="noreferrer" className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-xs font-black hover:bg-green-500 hover:text-white transition-all shadow-sm hover:shadow-md flex items-center gap-1 transform hover:-translate-y-0.5">
                    <span>💬</span> WhatsApp
                  </a>
                </div>
              </div>
              
              {/* CEO 2 */}
              <div className="p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                <p className="font-black text-slate-800 text-lg">W M P K Weerasekara</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-slate-500 font-bold tracking-wide">076 718 4605</span>
                  <a href="https://wa.me/94767184605" target="_blank" rel="noreferrer" className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-xs font-black hover:bg-green-500 hover:text-white transition-all shadow-sm hover:shadow-md flex items-center gap-1 transform hover:-translate-y-0.5">
                    <span>💬</span> WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Administration & Sales */}
          <div className={glassCard}>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg shadow-orange-500/30 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500">💼</div>
            <h3 className="text-xl font-black text-slate-900 mb-6 border-b border-slate-200 pb-3">Administration & Sales</h3>
            
            <div className="space-y-6 flex-1">
              {/* Accountant */}
              <div className="p-3 rounded-xl hover:bg-orange-50/50 transition-colors border border-transparent hover:border-orange-100">
                <p className="font-black text-slate-800 text-lg">W M R S Weerasekara</p>
                <p className="text-xs text-orange-600 font-black uppercase tracking-widest mb-1.5">Accountant</p>
                <p className="text-slate-500 font-bold tracking-wide">076 310 2038</p>
              </div>

              {/* Business WhatsApp */}
              <div className="p-3 rounded-xl hover:bg-orange-50/50 transition-colors border border-transparent hover:border-orange-100">
                <p className="font-black text-slate-800 text-lg">Business WhatsApp</p>
                <p className="text-xs text-orange-600 font-black uppercase tracking-widest mb-1.5">General Inquiries</p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-slate-500 font-bold tracking-wide">075 364 1229</span>
                  <a href="https://wa.me/94753641229" target="_blank" rel="noreferrer" className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-xs font-black hover:bg-green-500 hover:text-white transition-all shadow-sm hover:shadow-md flex items-center gap-1 transform hover:-translate-y-0.5">
                    <span>💬</span> Chat Now
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 3. Transport & Logistics */}
          <div className={glassCard}>
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 text-white w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-lg shadow-blue-500/30 group-hover:scale-110 group-hover:translate-x-2 transition-transform duration-500">🚚</div>
            <h3 className="text-xl font-black text-slate-900 mb-6 border-b border-slate-200 pb-3">Transport & Logistics</h3>
            
            <div className="space-y-5 flex-1">
              {/* Driver */}
              <div className="p-3 rounded-xl hover:bg-blue-50/50 transition-colors border border-transparent hover:border-blue-100">
                <p className="font-black text-slate-800 text-lg">Nilantha</p>
                <p className="text-xs text-blue-600 font-black uppercase tracking-widest mb-1.5">Head Driver</p>
                <p className="text-slate-500 font-bold tracking-wide">077 764 9535</p>
              </div>
              
              <div className="bg-slate-100/80 p-5 rounded-2xl mt-4 border border-slate-200/60 shadow-inner group-hover:bg-slate-100 transition-colors">
                <p className="text-sm text-slate-600 font-bold leading-relaxed">
                  Contact our transport division for real-time delivery updates, location guidance, and bulk transport inquiries.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* --- Location & Google Map --- */}
        <div className="bg-slate-900 rounded-[2.5rem] p-4 md:p-8 shadow-2xl relative overflow-hidden border-4 border-slate-800 group transform transition-all duration-500 hover:shadow-orange-900/20">
          <div className="flex flex-col lg:flex-row gap-8 items-center relative z-10">
            
            {/* Address Details */}
            <div className="w-full lg:w-1/3 p-4 md:p-8">
              <span className="bg-slate-800 text-orange-500 w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner group-hover:scale-110 transition-transform duration-500">📍</span>
              <h2 className="text-3xl font-black text-white mb-5 tracking-tight">Our Factory Location</h2>
              <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 mb-8 transform group-hover:translate-x-2 transition-transform duration-500">
                <p className="text-slate-300 font-medium text-lg leading-relaxed">
                  765, Kubukoya,<br />
                  Hadungamuwa, Matale,<br />
                  Hettipola 21536
                </p>
              </div>
              <a 
                href="https://maps.app.goo.gl/UQjKsNwyYRRg1WnX9" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-xl font-black hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg hover:shadow-orange-500/40 gap-3 w-full md:w-auto transform hover:-translate-y-1"
              >
                <span className="text-2xl">🗺️</span> Open in Maps App
              </a>
            </div>

            {/* Google Map Embedded Iframe */}
            <div className="w-full lg:w-2/3 h-[350px] md:h-[450px] rounded-3xl overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.5)] border-2 border-slate-700 bg-slate-800 transform transition-transform duration-700 group-hover:scale-[1.01]">
              <iframe 
                src="https://maps.google.com/maps?q=Hettipola,Matale&t=&z=13&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Weerasekara Concrete Works Location"
                className="filter contrast-[1.05] saturate-[1.1]"
              ></iframe>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactUs;