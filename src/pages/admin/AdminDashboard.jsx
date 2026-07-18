import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const AdminDashboard = () => {
  const [statsData, setStatsData] = useState({
    orders: 0,
    revenue: 0,
    products: 0,
    employees: 0,
  });
  
  const [barChartData, setBarChartData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [dailyChartData, setDailyChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Dark Theme එකට ගැලපෙන දීප්තිමත් වර්ණ (Bright/Neon Colors for Dark Mode)
  const COLORS = ['#ea580c', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [ordersRes, financeRes, productsRes, employeesRes, txRes] = await Promise.all([
          api.get('/orders').catch(() => ({ data: [] })),
          api.get('/finance/balances').catch(() => ({ data: { cashier: 0, bossAccount: 0 } })),
          api.get('/products').catch(() => ({ data: [] })),
          api.get('/employees').catch(() => ({ data: [] })),
          api.get('/finance/transactions').catch(() => ({ data: [] }))
        ]);

        const totalRevenue = (financeRes.data.cashier || 0) + (financeRes.data.bossAccount || 0);

        setStatsData({
          orders: ordersRes.data.length || 0,
          revenue: totalRevenue,
          products: productsRes.data.length || 0,
          employees: employeesRes.data.length || 0,
        });

        // 1. Bar Chart Data
        const catTotals = {};
        txRes.data.forEach(tx => {
          if (!catTotals[tx.category]) {
            catTotals[tx.category] = { name: tx.category, Income: 0, Expense: 0 };
          }
          if (tx.type === 'income') catTotals[tx.category].Income += tx.amount;
          if (tx.type === 'expense') catTotals[tx.category].Expense += tx.amount;
        });
        setBarChartData(Object.values(catTotals));

        // 2. Daily Area Chart Data
        const dailyTotals = {};
        txRes.data.forEach(tx => {
          const d = new Date(tx.createdAt);
          const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); 
          
          if (!dailyTotals[dateStr]) {
            dailyTotals[dateStr] = { date: dateStr, Income: 0, Expense: 0, timestamp: d.setHours(0,0,0,0) };
          }
          if (tx.type === 'income') dailyTotals[dateStr].Income += tx.amount;
          if (tx.type === 'expense') dailyTotals[dateStr].Expense += tx.amount;
        });
        
        const sortedDailyData = Object.values(dailyTotals).sort((a, b) => a.timestamp - b.timestamp);
        setDailyChartData(sortedDailyData);

        // 3. Pie Chart Data
        const roleCounts = {};
        employeesRes.data.forEach(emp => {
          const role = emp.position || 'Other';
          roleCounts[role] = (roleCounts[role] || 0) + 1;
        });
        const pieData = Object.keys(roleCounts).map(key => ({
          name: key,
          value: roleCounts[key]
        }));
        setPieChartData(pieData);

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Ultra-Modern Dark Glassmorphism Class
  const glassCard = "bg-slate-900/40 backdrop-blur-2xl border border-white/5 shadow-[0_15px_30px_rgba(0,0,0,0.5)] rounded-[2rem] p-6 md:p-8 transition-all duration-500 ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:shadow-[0_20px_40px_rgba(234,88,12,0.12)] hover:border-orange-500/20";

  const stats = [
    { title: "Total Orders", sub: "මුළු ඇණවුම්", value: loading ? "..." : statsData.orders.toString(), icon: "📦", color: "from-blue-600 to-blue-400", shadow: "shadow-blue-500/30" },
    { title: "Total Revenue", sub: "මුළු ආදායම", value: loading ? "..." : `Rs. ${statsData.revenue.toLocaleString()}`, icon: "💰", color: "from-orange-600 to-orange-400", shadow: "shadow-orange-500/30" },
    { title: "Total Products", sub: "නිෂ්පාදන", value: loading ? "..." : statsData.products.toString(), icon: "🧱", color: "from-emerald-600 to-emerald-400", shadow: "shadow-emerald-500/30" },
    { title: "Active Staff", sub: "සේවකයින්", value: loading ? "..." : statsData.employees.toString(), icon: "👥", color: "from-purple-600 to-purple-400", shadow: "shadow-purple-500/30" },
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 text-white font-sans overflow-hidden p-4 md:p-8 selection:bg-orange-500 selection:text-white">
      
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
          @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
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
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-600/15 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>
      </div>

      {/* --- MOVING BACKGROUND TEXT (Marquee) --- */}
      <div className="fixed bottom-10 left-0 w-full overflow-hidden z-0 opacity-[0.03] select-none pointer-events-none">
        <div className="animate-marquee text-[5rem] md:text-[10rem] font-black uppercase text-white w-max flex gap-12 leading-none">
          <span>Weerasekara Concrete Work</span>
          <span>•</span>
          <span>Weerasekara Concrete Work</span>
          <span>•</span>
          <span>Weerasekara Concrete Work</span>
          <span>•</span>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Main Title Section */}
        <div className="mb-10 mt-4 animate-fade-in-up flex justify-between items-end border-b border-white/10 pb-6">
          <div>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white drop-shadow-md flex items-center gap-4">
              <div className="bg-slate-900 border border-white/10 p-3 rounded-2xl shadow-inner">
                <span className="text-3xl">📊</span>
              </div>
              <div>
                Admin <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">Dashboard</span>
              </div>
            </h1>
            <p className="text-slate-400 font-bold mt-2 uppercase tracking-widest text-xs">
              Official Management Portal (ප්‍රධාන පාලන පුවරුව)
            </p>
          </div>
          <div className="hidden md:block">
            <div className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Sync Active
            </div>
          </div>
        </div>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`${glassCard} flex items-center transform hover:-translate-y-2 group animate-fade-in-up`}
              style={{ animationDelay: `${index * 0.1}s`, opacity: 0 }}
            >
              <div className={`bg-gradient-to-br ${stat.color} text-white text-3xl p-4 rounded-2xl mr-5 shadow-lg ${stat.shadow} flex items-center justify-center w-16 h-16 group-hover:scale-110 transition-transform duration-500`}>
                {stat.icon}
              </div>
              <div>
                <h3 className="text-2xl font-black text-white drop-shadow-md">{stat.value}</h3>
                <p className="text-[11px] text-slate-400 font-black uppercase tracking-widest mt-1">{stat.title}</p>
                <p className="text-[10px] text-orange-500/80 font-bold mt-0.5">{stat.sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Day-by-Day Area Chart (දෛනික ප්‍රස්තාරය) */}
        <div className={`${glassCard} mb-10 animate-fade-in-up`} style={{ animationDelay: '0.4s', opacity: 0 }}>
          <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3 border-b border-white/5 pb-4">
            <span className="text-2xl">📈</span> 
            <div>
              Daily Cash Flow <span className="text-sm text-slate-400 font-bold ml-2">(දෛනික මුදල් ගලනය)</span>
            </div>
          </h3>
          <div className="h-[350px] w-full">
            {loading ? (
              <div className="h-full flex items-center justify-center text-slate-500 font-bold animate-pulse">Loading Chart Data...</div>
            ) : dailyChartData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-500 font-bold">No daily data available.</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ea580c" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#ea580c" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="date" tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} axisLine={false} tickLine={false} dy={10} />
                  <YAxis tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} axisLine={false} tickLine={false} tickFormatter={(value) => `Rs.${value}`} dx={-10} />
                  <Tooltip 
                    contentStyle={{borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(8px)', color: '#fff', fontWeight: 'bold', boxShadow: '0 20px 40px rgba(0,0,0,0.5)'}}
                    itemStyle={{color: '#fff'}} 
                  />
                  <Legend wrapperStyle={{paddingTop: '20px', fontWeight: 'bold', color: '#cbd5e1'}} />
                  <Area type="monotone" dataKey="Income" stroke="#10b981" strokeWidth={4} fillOpacity={1} fill="url(#colorIncome)" />
                  <Area type="monotone" dataKey="Expense" stroke="#ea580c" strokeWidth={4} fillOpacity={1} fill="url(#colorExpense)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Bottom Charts (Category & Staff) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          
          {/* Bar Chart: Financial Flow by Category */}
          <div className={`lg:col-span-2 ${glassCard} animate-fade-in-up`} style={{ animationDelay: '0.5s', opacity: 0 }}>
            <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3 border-b border-white/5 pb-4">
              <span className="text-2xl">📊</span> 
              <div>
                Cash Flow by Category <span className="text-sm text-slate-400 font-bold ml-2">(කාණ්ඩ අනුව වාර්තාව)</span>
              </div>
            </h3>
            <div className="h-[300px] w-full">
              {loading ? (
                <div className="h-full flex items-center justify-center text-slate-500 font-bold animate-pulse">Loading Chart Data...</div>
              ) : barChartData.length === 0 ? (
                <div className="h-full flex items-center justify-center text-slate-500 font-bold">No transaction data available.</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                    <XAxis dataKey="name" tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} axisLine={false} tickLine={false} dy={10} />
                    <YAxis tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 600}} axisLine={false} tickLine={false} tickFormatter={(value) => `Rs.${value}`} dx={-10} />
                    <Tooltip 
                      cursor={{fill: 'rgba(255,255,255,0.05)'}} 
                      contentStyle={{borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(8px)', color: '#fff', fontWeight: 'bold'}} 
                    />
                    <Legend wrapperStyle={{paddingTop: '20px', fontWeight: 'bold'}} />
                    <Bar dataKey="Income" fill="#10b981" radius={[6, 6, 0, 0]} barSize={30} />
                    <Bar dataKey="Expense" fill="#ea580c" radius={[6, 6, 0, 0]} barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Pie Chart: Employee Distribution */}
          <div className={`${glassCard} animate-fade-in-up`} style={{ animationDelay: '0.6s', opacity: 0 }}>
            <h3 className="text-xl font-black text-white mb-6 flex items-center gap-3 border-b border-white/5 pb-4">
              <span className="text-2xl">👷‍♂️</span> 
              <div>
                Staff Roles <span className="text-sm text-slate-400 font-bold ml-2">(සේවක ව්‍යාප්තිය)</span>
              </div>
            </h3>
            <div className="h-[300px] w-full">
              {loading ? (
                <div className="h-full flex items-center justify-center text-slate-500 font-bold animate-pulse">Loading Chart Data...</div>
              ) : pieChartData.length === 0 ? (
                <div className="h-full flex items-center justify-center text-slate-500 font-bold">No staff data available.</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="45%"
                      innerRadius={70}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      stroke="rgba(0,0,0,0.5)"
                      strokeWidth={3}
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(15, 23, 42, 0.9)', color: '#fff', fontWeight: 'bold'}} 
                      itemStyle={{color: '#fff'}}
                    />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{fontWeight: 'bold', fontSize: '12px', color: '#cbd5e1'}} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <h3 className="text-xl font-black text-white mb-6 mt-12 flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: '0.7s', opacity: 0 }}>
          <span className="text-2xl">⚡</span> Quick Shortcuts (ඉක්මන් පිවිසුම්)
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: '0.8s', opacity: 0 }}>
          <Link to="/admin/orders" className={`${glassCard} !p-6 hover:border-orange-500 hover:bg-slate-800/50 transition group flex items-center relative overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="bg-slate-950 border border-white/5 text-white p-4 rounded-2xl mr-5 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-400 transition-all shadow-inner text-2xl relative z-10">📦</div>
            <div className="relative z-10">
              <h4 className="text-lg font-black text-white group-hover:text-orange-400 transition-colors uppercase tracking-wide">Manage Orders</h4>
              <p className="text-slate-400 font-bold text-xs mt-1">ඇණවුම් පාලනය</p>
            </div>
          </Link>
          
          <Link to="/admin/finance" className={`${glassCard} !p-6 hover:border-orange-500 hover:bg-slate-800/50 transition group flex items-center relative overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="bg-slate-950 border border-white/5 text-white p-4 rounded-2xl mr-5 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-400 transition-all shadow-inner text-2xl relative z-10">💵</div>
            <div className="relative z-10">
              <h4 className="text-lg font-black text-white group-hover:text-orange-400 transition-colors uppercase tracking-wide">Finance System</h4>
              <p className="text-slate-400 font-bold text-xs mt-1">මුදල් පාලනය</p>
            </div>
          </Link>

          <Link to="/admin/employees" className={`${glassCard} !p-6 hover:border-orange-500 hover:bg-slate-800/50 transition group flex items-center relative overflow-hidden`}>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="bg-slate-950 border border-white/5 text-white p-4 rounded-2xl mr-5 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-400 transition-all shadow-inner text-2xl relative z-10">👷‍♂️</div>
            <div className="relative z-10">
              <h4 className="text-lg font-black text-white group-hover:text-orange-400 transition-colors uppercase tracking-wide">Payroll & Staff</h4>
              <p className="text-slate-400 font-bold text-xs mt-1">සේවක ගෙවීම්</p>
            </div>
          </Link>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;