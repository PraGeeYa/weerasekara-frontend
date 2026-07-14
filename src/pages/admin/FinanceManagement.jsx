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

  // CSS Classes
  const glassCard = "bg-white/70 backdrop-blur-xl border border-white/50 shadow-xl shadow-slate-200/40 rounded-3xl p-6 md:p-8 relative z-10 transition-all";
  const glassInput = "w-full p-4 bg-white/60 border border-slate-200/60 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all font-bold text-slate-800 placeholder-slate-400 shadow-sm";

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-orange-50/30 overflow-hidden font-sans">
      
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50"></div>
      </div>

      {/* --- Toast Notification --- */}
      {toastMessage && (
        <div className={`fixed top-6 right-6 z-50 max-w-sm w-full rounded-2xl border ${toastType === 'success' ? 'border-emerald-200 bg-white/95 shadow-emerald-200/40' : 'border-red-200 bg-white/95 shadow-red-200/40'} backdrop-blur-xl shadow-2xl p-4 animate-[fadeIn_0.25s_ease-out]`}>
          <div className="flex items-start gap-3">
            <div className={`flex h-11 w-11 items-center justify-center rounded-full text-xl ${toastType === 'success' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}>
              {toastType === 'success' ? '✓' : '⚠️'}
            </div>
            <div>
              <p className="text-sm font-black text-slate-900">{toastType === 'success' ? 'Success' : 'Error'}</p>
              <p className="text-sm font-semibold text-slate-600">{toastMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 p-4 md:p-8 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight mb-2">
              Finance <span className="text-orange-600">&</span> Cashier 💵
            </h2>
            <p className="text-slate-500 font-bold text-lg">Manage daily sales, wages, and bank deposits cleanly.</p>
          </div>
        </div>

        {/* Account Balances Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
          
          {/* Cashier Balance */}
          <div className="bg-gradient-to-br from-emerald-500 to-green-700 p-6 md:p-8 rounded-3xl shadow-xl shadow-green-600/20 border border-white/20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-20 text-7xl transform group-hover:scale-110 transition-transform duration-500">💵</div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <p className="text-green-100 font-extrabold tracking-widest text-sm uppercase bg-black/10 px-3 py-1 rounded-full w-fit">Cash Drawer (ලාච්චුව)</p>
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight">Rs. {cashierBalance.toLocaleString()}</h3>
            </div>
          </div>

          {/* Boss Account Balance */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-950 p-6 md:p-8 rounded-3xl shadow-xl shadow-slate-900/20 border border-white/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-20 text-7xl transform group-hover:scale-110 transition-transform duration-500">🏦</div>
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <p className="text-slate-300 font-extrabold tracking-widest text-sm uppercase bg-white/10 px-3 py-1 rounded-full w-fit">Boss Master Account</p>
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-white tracking-tight">Rs. {bossAccount.toLocaleString()}</h3>
            </div>
          </div>
        </div>

        {/* Transaction Panel */}
        <div className={glassCard}>
          <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
            <span className="bg-orange-100 text-orange-600 p-3 rounded-xl shadow-sm">✍️</span>
            Record a Transaction (නව ගනුදෙනුව)
          </h3>
          
          {/* Tab Buttons */}
          <div className="flex flex-wrap gap-3 mb-8 bg-slate-100/50 p-2 rounded-2xl border border-slate-200/50 shadow-inner w-full md:w-fit">
            <button 
              onClick={() => setTransaction({...transaction, type: 'income', category: 'Daily Sales', targetAccount: ''})} 
              className={`flex-1 md:flex-none px-6 py-3 font-bold rounded-xl transition-all ${transaction.type === 'income' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 transform scale-[1.02]' : 'text-slate-600 hover:bg-white hover:shadow-sm'}`}
            >
              ➕ Income
            </button>
            <button 
              onClick={() => setTransaction({...transaction, type: 'expense', category: 'Employee Payment', targetAccount: ''})} 
              className={`flex-1 md:flex-none px-6 py-3 font-bold rounded-xl transition-all ${transaction.type === 'expense' ? 'bg-red-500 text-white shadow-lg shadow-red-500/30 transform scale-[1.02]' : 'text-slate-600 hover:bg-white hover:shadow-sm'}`}
            >
              ➖ Expense
            </button>
            <button 
              onClick={() => setTransaction({...transaction, type: 'bank_transfer', category: 'Bank Deposit', employeeId: ''})} 
              className={`flex-1 md:flex-none px-6 py-3 font-bold rounded-xl transition-all ${transaction.type === 'bank_transfer' ? 'bg-slate-800 text-white shadow-lg shadow-slate-800/30 transform scale-[1.02]' : 'text-slate-600 hover:bg-white hover:shadow-sm'}`}
            >
              🏦 Bank Deposit
            </button>
          </div>

          <form onSubmit={handleTransactionSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            
            {/* Category Dropdown */}
            {transaction.type !== 'bank_transfer' && (
              <div>
                <label className="block text-xs font-extrabold text-slate-500 mb-2 uppercase tracking-widest">Category (වර්ගය)</label>
                <select name="category" value={transaction.category} onChange={handleTransactionChange} className={glassInput}>
                  {transaction.type === 'income' ? (
                    <>
                      <option value="Daily Sales">Daily Concrete Sales (දවසේ විකුණුම්)</option>
                      <option value="Hire">Vehicle Hire (හයර්)</option>
                      <option value="Other Income">Other Income (වෙනත්)</option>
                    </>
                  ) : (
                    <>
                      <option value="Employee Payment">Employee (දවසේ පඩිය)</option>
                      <option value="Fuel">Fuel (තෙල් ගැසීම්)</option>
                      <option value="Repairs">Vehicle Repair (රෙපෙයාර්)</option>
                      <option value="Materials">Raw Materials (අමුද්‍රව්‍ය)</option>
                      <option value="Other Expense">Other Expense (වෙනත්)</option>
                    </>
                  )}
                </select>
              </div>
            )}

            {/* Employee Selection (Only for Wages) */}
            {transaction.category === 'Employee Payment' && (
              <div className="animate-fade-in">
                <label className="block text-xs font-extrabold text-red-500 mb-2 uppercase tracking-widest">Select Employee (සේවකයා)</label>
                <select name="employeeId" value={transaction.employeeId} onChange={handleTransactionChange} required className={`${glassInput} border-red-200 focus:ring-red-500`}>
                  <option value="">-- තෝරන්න --</option>
                  {employees.map(emp => <option key={emp._id} value={emp._id}>{emp.name}</option>)}
                </select>
              </div>
            )}

            {/* Amount */}
            <div>
              <label className="block text-xs font-extrabold text-slate-500 mb-2 uppercase tracking-widest">Amount (මුදල Rs.)</label>
              <input type="number" name="amount" value={transaction.amount} onChange={handleTransactionChange} required min="1" className={`${glassInput} text-xl text-slate-900 font-black`} placeholder="Rs. 0.00" />
            </div>

            {/* Description */}
            <div className={transaction.category === 'Employee Payment' || transaction.type === 'bank_transfer' ? "md:col-span-1" : "md:col-span-2"}>
              <label className="block text-xs font-extrabold text-slate-500 mb-2 uppercase tracking-widest">Description (විස්තරය)</label>
              <input type="text" name="description" value={transaction.description} onChange={handleTransactionChange} required className={glassInput} placeholder="කෙටි විස්තරයක් ඇතුලත් කරන්න..." />
            </div>

            {/* Bank Transfer Custom UI */}
            {transaction.type === 'bank_transfer' && (
              <div className="md:col-span-2 bg-slate-50/80 border border-slate-200 p-6 rounded-2xl backdrop-blur-sm mt-2">
                <label className="block text-sm font-black text-slate-800 mb-4 uppercase tracking-widest flex items-center gap-2">
                  <span className="text-xl">🏦</span> Select Boss's Bank Account
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bossAccounts.map((acc) => (
                    <div 
                      key={acc.id} 
                      onClick={() => setTransaction({...transaction, targetAccount: acc.id})}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${transaction.targetAccount === acc.id ? 'border-orange-500 bg-orange-50/50 shadow-md transform scale-[1.02]' : 'border-slate-200 bg-white hover:border-orange-300'}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-black text-slate-800">{acc.name}</span>
                        {transaction.targetAccount === acc.id && <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-md">Selected</span>}
                      </div>
                      <p className="text-slate-500 font-bold text-sm">Account: <span className="text-slate-700 tracking-wider">{acc.accNo}</span></p>
                      <p className="text-slate-400 text-xs font-semibold mt-1">{acc.bank}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="md:col-span-2 pt-6 border-t border-slate-200/50">
              <button type="submit" className={`w-full text-white font-black py-4 px-4 rounded-2xl shadow-lg transition-all transform hover:-translate-y-1 text-lg tracking-wide ${
                transaction.type === 'income' ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:shadow-emerald-500/30' : 
                transaction.type === 'expense' ? 'bg-gradient-to-r from-red-500 to-red-600 hover:shadow-red-500/30' : 
                'bg-gradient-to-r from-slate-800 to-slate-900 hover:shadow-slate-900/40'
              }`}>
                {transaction.type === 'income' ? '✅ ADD INCOME TO CASHIER' : 
                 transaction.type === 'expense' ? '❌ DEDUCT EXPENSE FROM CASHIER' : '🏦 CONFIRM BANK DEPOSIT'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FinanceManagement;