import { useState, useEffect } from 'react';
import api from '../../services/api';

const FinanceManagement = () => {
  const [cashierBalance, setCashierBalance] = useState(0);
  const [bossAccount, setBossAccount] = useState(0);
  const [employees, setEmployees] = useState([]);
  
  // UI States (Toasts)
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  // Transaction State
  const [transaction, setTransaction] = useState({
    type: 'income',
    category: 'Daily Sales',
    amount: '',
    description: '',
    employeeId: '',
    targetAccount: ''
  });

  // Bank Accounts Information
  const bossAccounts = [
    { id: 'J_K_Weerasekara', name: 'W M J K Weerasekara', accNo: '78252000', bank: 'BOC, Wilgamuwa' },
    { id: 'P_K_Weerasekara', name: 'W M P K Weerasekara', accNo: '71639510', bank: 'BOC, Wilgamuwa' }
  ];

  const fetchData = async () => {
    try {
      const balanceRes = await api.get('/finance/balances');
      setCashierBalance(balanceRes.data.cashier || 0);
      setBossAccount(balanceRes.data.bossAccount || 0);

      const empRes = await api.get('/employees');
      setEmployees(empRes.data);
    } catch (error) {
      console.error("Error fetching finance data", error);
      showToast("දත්ත ලබාගැනීම අසාර්ථකයි!", "error");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showToast = (msg, type = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(''), 4000);
  };

  const handleTransactionChange = (e) => {
    setTransaction({ ...transaction, [e.target.name]: e.target.value });
  };

  // Main Transaction Submit
  const handleTransactionSubmit = async (e) => {
    e.preventDefault();
    
    if (transaction.type === 'bank_transfer' && !transaction.targetAccount) {
      return showToast("කරුණාකර මුදල් බැර කරන ගිණුම තෝරන්න! (Select Account)", "error");
    }
    if (transaction.category === 'Employee Payment' && !transaction.employeeId) {
      return showToast("කරුණාකර පඩිය ලබාදෙන සේවකයාව තෝරන්න! (Select Employee)", "error");
    }

    try {
      // Bank account එක description එකට එකතු කිරීම
      let finalDescription = transaction.description;
      if (transaction.type === 'bank_transfer') {
        const acc = bossAccounts.find(a => a.id === transaction.targetAccount);
        finalDescription = `Bank Deposit - ${acc.name} (${acc.accNo}) - ${transaction.description}`;
      }

      const payload = { ...transaction, description: finalDescription };
      const response = await api.post('/finance/transactions', payload);
      
      showToast(response.data.message || "ගනුදෙනුව සාර්ථකයි! ✅", "success");
      
      // Form Reset
      setTransaction({ type: 'income', category: 'Daily Sales', amount: '', description: '', employeeId: '', targetAccount: '' });
      fetchData(); 

    } catch (error) {
      showToast(error.response?.data?.message || "ගනුදෙනුව අසාර්ථකයි!", "error");
    }
  };

  // Ultra-Modern Dark Theme CSS Classes
  const glassCard = "bg-slate-900/40 backdrop-blur-2xl border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-[2rem] p-6 md:p-8 relative z-10 transition-all duration-500 hover:border-white/10";
  const glassInput = "w-full p-4 bg-slate-950/50 border border-white/10 rounded-xl outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all font-bold text-white placeholder-slate-600 shadow-inner";

  return (
    <div className="relative w-full h-full font-sans animate-fade-in-up">
      
      {/* --- CUSTOM ANIMATIONS --- */}
      <style>
        {`
          @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          }
        `}
      </style>

      {/* --- Toast Notification (Dark Theme) --- */}
      {toastMessage && (
        <div className={`fixed top-6 right-6 z-[100] max-w-sm w-full rounded-2xl border ${toastType === 'success' ? 'border-emerald-500/30 bg-slate-900/95 shadow-[0_10px_30px_rgba(16,185,129,0.2)]' : 'border-red-500/30 bg-slate-900/95 shadow-[0_10px_30px_rgba(239,68,68,0.2)]'} backdrop-blur-xl p-4 animate-[fade-in-up_0.3s_ease-out]`}>
          <div className="flex items-start gap-4">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl border ${toastType === 'success' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'}`}>
              {toastType === 'success' ? '✓' : '⚠️'}
            </div>
            <div>
              <p className="text-sm font-black text-white tracking-wider uppercase">{toastType === 'success' ? 'Success' : 'Error'}</p>
              <p className="text-sm font-bold text-slate-400 mt-0.5">{toastMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight flex items-center gap-4 drop-shadow-md">
              <div className="bg-slate-900 border border-white/10 p-3 rounded-2xl shadow-inner">
                <span className="text-3xl">💵</span>
              </div>
              <div>
                Finance <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">&</span> Cashier
              </div>
            </h2>
            <p className="text-slate-400 font-bold mt-3 uppercase tracking-widest text-xs">
              Manage daily sales, wages, and bank deposits cleanly.
            </p>
          </div>
        </div>

        {/* Account Balances Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          
          {/* Cashier Balance (Premium Green/Emerald Glow) */}
          <div className="bg-gradient-to-br from-emerald-950/80 to-slate-900 p-6 md:p-8 rounded-[2rem] shadow-[0_15px_30px_rgba(16,185,129,0.1)] border border-emerald-500/20 relative overflow-hidden group hover:border-emerald-500/40 transition-colors duration-500">
            <div className="absolute top-0 right-0 p-6 opacity-10 text-8xl transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700 pointer-events-none filter grayscale">💵</div>
            <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none"></div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <p className="text-emerald-400 font-black tracking-widest text-xs uppercase bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.1)]">
                  Cash Drawer (ලාච්චුව)
                </p>
              </div>
              <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter drop-shadow-lg">
                <span className="text-emerald-500/80 text-3xl md:text-4xl mr-2">Rs.</span>
                {cashierBalance.toLocaleString()}
              </h3>
            </div>
          </div>

          {/* Boss Account Balance (Premium Blue/Slate Glow) */}
          <div className="bg-gradient-to-br from-blue-950/80 to-slate-900 p-6 md:p-8 rounded-[2rem] shadow-[0_15px_30px_rgba(59,130,246,0.1)] border border-blue-500/20 relative overflow-hidden group hover:border-blue-500/40 transition-colors duration-500">
            <div className="absolute top-0 right-0 p-6 opacity-10 text-8xl transform group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-700 pointer-events-none filter grayscale">🏦</div>
            <div className="absolute top-[-50%] right-[-10%] w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <p className="text-blue-400 font-black tracking-widest text-xs uppercase bg-blue-500/10 border border-blue-500/20 px-4 py-1.5 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.1)]">
                  Boss Master Account
                </p>
              </div>
              <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter drop-shadow-lg">
                <span className="text-blue-500/80 text-3xl md:text-4xl mr-2">Rs.</span>
                {bossAccount.toLocaleString()}
              </h3>
            </div>
          </div>
        </div>

        {/* Transaction Panel */}
        <div className={glassCard}>
          <h3 className="text-xl font-black text-white mb-8 flex items-center gap-4 border-b border-white/5 pb-5">
            <span className="bg-slate-800 text-orange-500 p-3 rounded-xl border border-white/10 shadow-inner text-xl">✍️</span>
            Record a Transaction <span className="text-sm text-slate-400 font-bold ml-2">(නව ගනුදෙනුව)</span>
          </h3>
          
          {/* Tab Buttons (Neon Styled) */}
          <div className="flex flex-wrap gap-4 mb-10 bg-slate-950/50 p-2.5 rounded-2xl border border-white/5 shadow-inner w-full md:w-fit">
            <button 
              type="button"
              onClick={() => setTransaction({...transaction, type: 'income', category: 'Daily Sales', targetAccount: ''})} 
              className={`flex-1 md:flex-none px-6 py-3 font-black uppercase tracking-widest text-xs rounded-xl transition-all duration-300 ${transaction.type === 'income' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : 'text-slate-400 border border-transparent hover:bg-slate-900 hover:text-white'}`}
            >
              ➕ Income
            </button>
            <button 
              type="button"
              onClick={() => setTransaction({...transaction, type: 'expense', category: 'Employee Payment', targetAccount: ''})} 
              className={`flex-1 md:flex-none px-6 py-3 font-black uppercase tracking-widest text-xs rounded-xl transition-all duration-300 ${transaction.type === 'expense' ? 'bg-red-500/20 text-red-400 border border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)]' : 'text-slate-400 border border-transparent hover:bg-slate-900 hover:text-white'}`}
            >
              ➖ Expense
            </button>
            <button 
              type="button"
              onClick={() => setTransaction({...transaction, type: 'bank_transfer', category: 'Bank Deposit', employeeId: ''})} 
              className={`flex-1 md:flex-none px-6 py-3 font-black uppercase tracking-widest text-xs rounded-xl transition-all duration-300 ${transaction.type === 'bank_transfer' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.2)]' : 'text-slate-400 border border-transparent hover:bg-slate-900 hover:text-white'}`}
            >
              🏦 Bank Deposit
            </button>
          </div>

          <form onSubmit={handleTransactionSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            
            {/* Category Dropdown */}
            {transaction.type !== 'bank_transfer' && (
              <div>
                <label className="block text-[11px] font-black text-slate-400 mb-2 uppercase tracking-widest">Category <span className="text-slate-500 ml-1">(වර්ගය)</span></label>
                <select name="category" value={transaction.category} onChange={handleTransactionChange} className={glassInput}>
                  {transaction.type === 'income' ? (
                    <>
                      <option className="bg-slate-900 text-white" value="Daily Sales">Daily Concrete Sales (දවසේ විකුණුම්)</option>
                      <option className="bg-slate-900 text-white" value="Hire">Vehicle Hire (හයර්)</option>
                      <option className="bg-slate-900 text-white" value="Other Income">Other Income (වෙනත්)</option>
                    </>
                  ) : (
                    <>
                      <option className="bg-slate-900 text-white" value="Employee Payment">Employee (දවසේ පඩිය)</option>
                      <option className="bg-slate-900 text-white" value="Fuel">Fuel (තෙල් ගැසීම්)</option>
                      <option className="bg-slate-900 text-white" value="Repairs">Vehicle Repair (රෙපෙයාර්)</option>
                      <option className="bg-slate-900 text-white" value="Materials">Raw Materials (අමුද්‍රව්‍ය)</option>
                      <option className="bg-slate-900 text-white" value="Other Expense">Other Expense (වෙනත්)</option>
                    </>
                  )}
                </select>
              </div>
            )}

            {/* Employee Selection (Only for Wages) */}
            {transaction.category === 'Employee Payment' && (
              <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                <label className="block text-[11px] font-black text-red-400 mb-2 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Select Employee <span className="text-red-500/60 ml-1">(සේවකයා)</span>
                </label>
                <select name="employeeId" value={transaction.employeeId} onChange={handleTransactionChange} required className={`${glassInput} border-red-500/30 focus:ring-red-500/50 focus:border-red-500 bg-red-500/5`}>
                  <option className="bg-slate-900 text-white" value="">-- තෝරන්න --</option>
                  {employees.map(emp => <option className="bg-slate-900 text-white" key={emp._id} value={emp._id}>{emp.name}</option>)}
                </select>
              </div>
            )}

            {/* Amount */}
            <div>
              <label className="block text-[11px] font-black text-slate-400 mb-2 uppercase tracking-widest">Amount <span className="text-slate-500 ml-1">(මුදල Rs.)</span></label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-black text-lg">Rs.</span>
                <input type="number" name="amount" value={transaction.amount} onChange={handleTransactionChange} required min="1" className={`${glassInput} pl-12 text-xl text-orange-400 font-black`} placeholder="0.00" />
              </div>
            </div>

            {/* Description */}
            <div className={transaction.category === 'Employee Payment' || transaction.type === 'bank_transfer' ? "md:col-span-1" : "md:col-span-2"}>
              <label className="block text-[11px] font-black text-slate-400 mb-2 uppercase tracking-widest">Description <span className="text-slate-500 ml-1">(විස්තරය)</span></label>
              <input type="text" name="description" value={transaction.description} onChange={handleTransactionChange} required className={glassInput} placeholder="කෙටි විස්තරයක් ඇතුලත් කරන්න..." />
            </div>

            {/* Bank Transfer Custom UI (Dark Mode Adapted) */}
            {transaction.type === 'bank_transfer' && (
              <div className="md:col-span-2 bg-slate-950/50 border border-white/5 p-6 rounded-2xl mt-4 animate-fade-in-up">
                <label className="block text-xs font-black text-slate-300 mb-5 uppercase tracking-widest flex items-center gap-3">
                  <span className="text-2xl">🏦</span> Select Boss's Bank Account
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {bossAccounts.map((acc) => (
                    <div 
                      key={acc.id} 
                      onClick={() => setTransaction({...transaction, targetAccount: acc.id})}
                      className={`p-5 rounded-2xl border cursor-pointer transition-all duration-300 relative overflow-hidden group ${transaction.targetAccount === acc.id ? 'border-orange-500 bg-orange-500/10 shadow-[0_0_20px_rgba(234,88,12,0.15)] transform scale-[1.02]' : 'border-white/10 bg-slate-900 hover:border-orange-500/30 hover:bg-slate-800'}`}
                    >
                      {/* Selection Indicator Background Glow */}
                      {transaction.targetAccount === acc.id && (
                        <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/20 rounded-full blur-xl pointer-events-none"></div>
                      )}

                      <div className="flex items-center justify-between mb-3 relative z-10">
                        <span className="font-black text-white tracking-wide">{acc.name}</span>
                        {transaction.targetAccount === acc.id && <span className="bg-orange-500 text-white text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-widest">Selected</span>}
                      </div>
                      <p className="text-slate-500 font-bold text-xs uppercase tracking-widest relative z-10">Account: <span className="text-slate-300 text-sm ml-1">{acc.accNo}</span></p>
                      <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mt-2 bg-slate-950 inline-block px-2 py-1 rounded-md border border-white/5 relative z-10">{acc.bank}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button (Gradient adapt based on type) */}
            <div className="md:col-span-2 pt-6 mt-2 border-t border-white/5">
              <button type="submit" className={`w-full text-white font-black py-4 px-4 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 text-sm tracking-widest uppercase relative overflow-hidden group/btn ${
                transaction.type === 'income' ? 'bg-emerald-600 hover:bg-emerald-500 shadow-[0_10px_20px_rgba(16,185,129,0.3)]' : 
                transaction.type === 'expense' ? 'bg-red-600 hover:bg-red-500 shadow-[0_10px_20px_rgba(239,68,68,0.3)]' : 
                'bg-blue-600 hover:bg-blue-500 shadow-[0_10px_20px_rgba(59,130,246,0.3)]'
              }`}>
                {/* Button Shine Effect */}
                <span className="absolute top-0 -left-[100%] w-1/2 h-full bg-white/20 skew-x-12 group-hover/btn:left-[200%] transition-all duration-700 ease-in-out"></span>
                <span className="relative z-10">
                  {transaction.type === 'income' ? '✅ ADD INCOME TO CASHIER' : 
                   transaction.type === 'expense' ? '❌ DEDUCT EXPENSE FROM CASHIER' : '🏦 CONFIRM BANK DEPOSIT'}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FinanceManagement;