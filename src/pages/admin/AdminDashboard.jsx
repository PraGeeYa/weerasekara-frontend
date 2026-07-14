import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
// AreaChart සහ Area අලුතින් import කරගත්තා
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
  const [dailyChartData, setDailyChartData] = useState([]); // අලුත් දෛනික ප්‍රස්තාරය සඳහා
  const [loading, setLoading] = useState(true);

  // ලෝගෝ එකට ගැලපෙන වර්ණ (Navy Blue, Burnt Orange, Slate, Blue)
  const COLORS = ['#ea580c', '#0f172a', '#3b82f6', '#f97316', '#64748b'];

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

        // 1. Bar Chart Data (කාණ්ඩ අනුව / By Category)
        const catTotals = {};
        txRes.data.forEach(tx => {
          if (!catTotals[tx.category]) {
            catTotals[tx.category] = { name: tx.category, Income: 0, Expense: 0 };
          }
          if (tx.type === 'income') catTotals[tx.category].Income += tx.amount;
          if (tx.type === 'expense') catTotals[tx.category].Expense += tx.amount;
        });
        setBarChartData(Object.values(catTotals));

        // 2. Daily Area Chart Data (දෛනික වාර්තා / Day-by-Day)
        const dailyTotals = {};
        txRes.data.forEach(tx => {
          // දවස වෙන් කරගන්නවා (උදා: "Jul 14")
          const d = new Date(tx.createdAt);
          const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }); 
          
          if (!dailyTotals[dateStr]) {
            dailyTotals[dateStr] = { date: dateStr, Income: 0, Expense: 0, timestamp: d.setHours(0,0,0,0) };
          }
          if (tx.type === 'income') dailyTotals[dateStr].Income += tx.amount;
          if (tx.type === 'expense') dailyTotals[dateStr].Expense += tx.amount;
        });
        
        // දින අනුපිළිවෙලට (පිළිවෙලට) හදාගන්නවා
        const sortedDailyData = Object.values(dailyTotals).sort((a, b) => a.timestamp - b.timestamp);
        setDailyChartData(sortedDailyData);

        // 3. Pie Chart Data (සේවක තනතුරු / Employee Positions)
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

  // වීදුරු (Glassmorphism) ඉෆෙක්ට් එක සඳහා පොදු CSS පන්තිය
  const glassClass = "bg-white/70 backdrop-blur-xl border border-white/50 shadow-xl shadow-slate-200/50 rounded-2xl p-6";

  const stats = [
    { title: "Total Orders (මුළු ඇණවුම්)", value: loading ? "..." : statsData.orders.toString(), icon: "📦", color: "from-slate-700 to-slate-900" },
    { title: "Total Revenue (මුළු ආදායම)", value: loading ? "..." : `Rs. ${statsData.revenue.toLocaleString()}`, icon: "💰", color: "from-orange-500 to-orange-700" },
    { title: "Total Products (නිෂ්පාදන)", value: loading ? "..." : statsData.products.toString(), icon: "🧱", color: "from-blue-600 to-blue-800" },
    { title: "Active Staff (සේවකයින්)", value: loading ? "..." : statsData.employees.toString(), icon: "👥", color: "from-slate-600 to-slate-800" },
  ];

  return (
    <div className="relative p-6 md:p-8 min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-orange-50 overflow-hidden">
      
      {/* Decorative Background Blobs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-orange-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000 pointer-events-none"></div>
      <div className="absolute -bottom-8 left-20 w-96 h-96 bg-slate-400/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000 pointer-events-none"></div>

      <div className="relative z-10">
        
        {/* Main Title Section */}
        <div className="text-center mb-12 mt-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-wider text-slate-900 drop-shadow-sm">
            WEERASEKARA <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-700">CONCRETE WORKS</span>
          </h1>
          <p className="text-slate-500 font-extrabold mt-3 uppercase tracking-[0.3em] text-xs md:text-sm">
            Official Management Dashboard (ප්‍රධාන පාලන පුවරුව)
          </p>
        </div>

        {/* Section Header */}
        <div className="mb-6 flex items-center">
          <span className="bg-orange-100 text-orange-600 p-2.5 rounded-xl mr-4 shadow-sm text-xl">📈</span>
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Business Overview (ව්‍යාපාරික සාරාංශය)</h2>
            <p className="text-slate-500 font-bold text-sm">Real-time insights and metrics (තත්‍ය කාලීන දත්ත).</p>
          </div>
        </div>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, index) => (
            <div key={index} className={`${glassClass} flex items-center hover:bg-white/90 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl hover:shadow-orange-100/50`}>
              <div className={`bg-gradient-to-br ${stat.color} text-white text-3xl p-4 rounded-xl mr-5 shadow-lg flex items-center justify-center w-16 h-16`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">{stat.title}</p>
                <h3 className="text-2xl font-black text-slate-800">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Day-by-Day Area Chart (දෛනික ප්‍රස්තාරය) */}
        <div className={`${glassClass} mb-10`}>
          <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center">
            <span className="text-2xl mr-2">📅</span> Daily Cash Flow (දෛනික මුදල් ගලනය)
          </h3>
          <div className="h-80 w-full">
            {loading ? (
              <div className="h-full flex items-center justify-center text-slate-400 font-bold">Loading Chart...</div>
            ) : dailyChartData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-slate-400 font-bold">No daily data available.</div>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dailyChartData} margin={{ top: 10, right: 30, left: 20, bottom: 5 }}>
                  <defs>
                    <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0f172a" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#0f172a" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ea580c" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#ea580c" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" opacity={0.5} />
                  <XAxis dataKey="date" tick={{fill: '#475569', fontSize: 12, fontWeight: 600}} axisLine={false} tickLine={false} />
                  <YAxis tick={{fill: '#475569', fontSize: 12, fontWeight: 600}} axisLine={false} tickLine={false} tickFormatter={(value) => `Rs.${value}`} />
                  <Tooltip contentStyle={{borderRadius: '16px', border: 'none', backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(8px)', fontWeight: 'bold', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                  <Legend wrapperStyle={{paddingTop: '20px', fontWeight: 'bold'}} />
                  <Area type="monotone" dataKey="Income" stroke="#0f172a" strokeWidth={3} fillOpacity={1} fill="url(#colorIncome)" />
                  <Area type="monotone" dataKey="Expense" stroke="#ea580c" strokeWidth={3} fillOpacity={1} fill="url(#colorExpense)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Bottom Charts (Category & Staff) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          
          {/* Bar Chart: Financial Flow by Category */}
          <div className={`lg:col-span-2 ${glassClass}`}>
            <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center">
              <span className="text-2xl mr-2">📊</span> Cash Flow by Category (කාණ්ඩ අනුව වාර්තාව)
            </h3>
            <div className="h-80 w-full">
              {loading ? (
                <div className="h-full flex items-center justify-center text-slate-400 font-bold">Loading Chart...</div>
              ) : barChartData.length === 0 ? (
                <div className="h-full flex items-center justify-center text-slate-400 font-bold">No transaction data available.</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barChartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#cbd5e1" opacity={0.5} />
                    <XAxis dataKey="name" tick={{fill: '#475569', fontSize: 12, fontWeight: 600}} axisLine={false} tickLine={false} />
                    <YAxis tick={{fill: '#475569', fontSize: 12, fontWeight: 600}} axisLine={false} tickLine={false} tickFormatter={(value) => `Rs.${value}`} />
                    <Tooltip cursor={{fill: '#f1f5f9', opacity: 0.4}} contentStyle={{borderRadius: '16px', border: '1px solid #e2e8f0', backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(8px)', fontWeight: 'bold'}} />
                    <Legend wrapperStyle={{paddingTop: '20px', fontWeight: 'bold'}} />
                    <Bar dataKey="Income" fill="#0f172a" radius={[6, 6, 0, 0]} barSize={35} />
                    <Bar dataKey="Expense" fill="#ea580c" radius={[6, 6, 0, 0]} barSize={35} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Pie Chart: Employee Distribution */}
          <div className={`${glassClass}`}>
            <h3 className="text-lg font-black text-slate-800 mb-6 flex items-center">
              <span className="text-2xl mr-2">👷‍♂️</span> Staff Roles (සේවක ව්‍යාප්තිය)
            </h3>
            <div className="h-80 w-full">
              {loading ? (
                <div className="h-full flex items-center justify-center text-slate-400 font-bold">Loading Chart...</div>
              ) : pieChartData.length === 0 ? (
                <div className="h-full flex items-center justify-center text-slate-400 font-bold">No staff data available.</div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={75}
                      outerRadius={105}
                      paddingAngle={6}
                      dataKey="value"
                      stroke="none"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{borderRadius: '16px', border: '1px solid #e2e8f0', backgroundColor: 'rgba(255, 255, 255, 0.9)', backdropFilter: 'blur(8px)', fontWeight: 'bold'}} />
                    <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{fontWeight: 'bold'}} />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>

        {/* Quick Actions Panel */}
        <h3 className="text-xl font-black text-slate-800 mb-4 mt-8 flex items-center">
          <span className="text-2xl mr-2">⚡</span> Quick Shortcuts (ඉක්මන් පිවිසුම්)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link to="/admin/orders" className={`${glassClass} hover:border-orange-400 hover:bg-white/90 transition group flex items-center`}>
            <div className="bg-slate-100 text-slate-700 p-4 rounded-xl mr-4 group-hover:bg-slate-900 group-hover:text-orange-400 transition shadow-sm">📦</div>
            <div>
              <h4 className="text-lg font-black text-slate-800 group-hover:text-orange-600 transition">Manage Orders</h4>
              <p className="text-slate-500 font-bold text-xs mt-1">ඇණවුම් පාලනය</p>
            </div>
          </Link>
          
          <Link to="/admin/finance" className={`${glassClass} hover:border-orange-400 hover:bg-white/90 transition group flex items-center`}>
            <div className="bg-slate-100 text-slate-700 p-4 rounded-xl mr-4 group-hover:bg-slate-900 group-hover:text-orange-400 transition shadow-sm">💵</div>
            <div>
              <h4 className="text-lg font-black text-slate-800 group-hover:text-orange-600 transition">Finance & Cashier</h4>
              <p className="text-slate-500 font-bold text-xs mt-1">මුදල් පාලනය</p>
            </div>
          </Link>

          <Link to="/admin/employees" className={`${glassClass} hover:border-orange-400 hover:bg-white/90 transition group flex items-center`}>
            <div className="bg-slate-100 text-slate-700 p-4 rounded-xl mr-4 group-hover:bg-slate-900 group-hover:text-orange-400 transition shadow-sm">👷‍♂️</div>
            <div>
              <h4 className="text-lg font-black text-slate-800 group-hover:text-orange-600 transition">Payroll System</h4>
              <p className="text-slate-500 font-bold text-xs mt-1">සේවක ගෙවීම්</p>
            </div>
          </Link>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;