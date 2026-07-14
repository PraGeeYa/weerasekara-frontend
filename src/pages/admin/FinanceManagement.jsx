import { useState, useEffect } from 'react';
import api from '../../services/api';

const FinanceManagement = () => {
  const [cashierBalance, setCashierBalance] = useState(0);
  const [bossAccount, setBossAccount] = useState(0);
  const [employees, setEmployees] = useState([]);
  
  const [transaction, setTransaction] = useState({
    type: 'income',
    category: 'Hire',
    amount: '',
    description: '',
    employeeId: '',
    isDeposited: false
  });

  const fetchData = async () => {
    try {
      const balanceRes = await api.get('/finance/balances');
      setCashierBalance(balanceRes.data.cashier || 0);
      setBossAccount(balanceRes.data.bossAccount || 0);

      const empRes = await api.get('/employees');
      setEmployees(empRes.data);
    } catch (error) {
      console.error("Error fetching finance data", error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const loadFinanceData = async () => {
      if (isMounted) {
        await fetchData();
      }
    };

    loadFinanceData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleTransactionChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setTransaction({ ...transaction, [e.target.name]: value });
  };

  const handleTransactionSubmit = async (e) => {
    e.preventDefault();
    
    if (transaction.type === 'bank_transfer' && !transaction.isDeposited) {
      return alert("කරුණාකර 'Deposited to Boss Account' කියන එක Tick කරන්න!");
    }
    if (transaction.category === 'Employee Payment' && !transaction.employeeId) {
      return alert("කරුණාකර සේවකයාව තෝරන්න!");
    }

    try {
      const response = await api.post('/finance/transactions', transaction);
      alert(response.data.message + " ✅");
      
      // Form එක අලුත් කරලා අලුත් ගණන් ටික ගන්නවා
      setTransaction({ type: 'income', category: 'Hire', amount: '', description: '', employeeId: '', isDeposited: false });
      fetchData(); 

    } catch (error) {
      alert(error.response?.data?.message || "ගනුදෙනුව අසාර්ථකයි!");
    }
  };

  // පොදු වීදුරු (Glassmorphism) පන්ති
  const glassCard = "bg-white/70 backdrop-blur-xl border border-white/50 shadow-xl shadow-slate-200/40 rounded-2xl p-6 lg:p-8 relative z-10";
  const glassInput = "w-full p-3.5 bg-white/50 border border-slate-200/60 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all font-bold text-slate-800 placeholder-slate-400";

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-orange-50 overflow-hidden">
      {/* --- Background Decorative Elements & Watermark --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-orange-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300/20 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        
        {/* මෙන්න මෙතන තමා වෙනස් වුණේ */}
        <div className="absolute inset-0 flex justify-center items-center opacity-[0.03]">
          <span className="text-[350px] font-black text-slate-900 tracking-tighter select-none">
            W
          </span>
        </div>
      </div>

      {/* Main Content (මේකේ z-index එක 10 නිසා අකුර උඩින් content එක එනවා) */}
      <div className="relative z-10 p-6 md:p-8">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">
            Finance & <span className="text-orange-600">Cashier</span> 💵
          </h2>
          <p className="text-slate-500 font-bold">Manage daily cash, expenses, hires, and bank deposits.</p>
        </div>

        {/* Account Balances (Glass + Gradients) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-gradient-to-br from-emerald-400/90 to-green-600/90 backdrop-blur-md p-6 rounded-2xl shadow-lg shadow-green-200 flex justify-between items-center border border-white/20 transform hover:-translate-y-1 transition-all">
            <div>
              <p className="text-green-100 font-extrabold tracking-wider mb-1 text-sm">CASH DRAWER (ලාච්චුවේ මුදල)</p>
              <h3 className="text-4xl font-black text-white">Rs. {cashierBalance.toLocaleString()}</h3>
            </div>
            <div className="text-5xl opacity-40 mix-blend-overlay">💵</div>
          </div>
          <div className="bg-gradient-to-br from-slate-700/90 to-slate-900/90 backdrop-blur-md p-6 rounded-2xl shadow-lg shadow-slate-300 flex justify-between items-center border border-white/20 transform hover:-translate-y-1 transition-all">
            <div>
              <p className="text-slate-300 font-extrabold tracking-wider mb-1 text-sm">BOSS'S BANK ACCOUNT</p>
              <h3 className="text-4xl font-black text-white">Rs. {bossAccount.toLocaleString()}</h3>
            </div>
            <div className="text-5xl opacity-40 mix-blend-overlay">🏦</div>
          </div>
        </div>

        {/* Transaction Panel (Glass Card) */}
        <div className={glassCard}>
          <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center">
            <span className="bg-orange-100 text-orange-600 p-2 rounded-lg mr-3">✍️</span>
            New Transaction (නව ගනුදෙනුව)
          </h3>
          
          {/* Tab Buttons for Transaction Type */}
          <div className="flex flex-wrap gap-4 mb-8 bg-white/40 p-2 rounded-2xl border border-white/60 shadow-inner w-fit">
            <button 
              onClick={() => setTransaction({...transaction, type: 'income', category: 'Hire'})} 
              className={`px-5 py-2.5 font-bold rounded-xl transition-all ${transaction.type === 'income' ? 'bg-emerald-500 text-white shadow-md transform scale-105' : 'text-slate-600 hover:bg-white/60'}`}
            >
              ➕ Add Income
            </button>
            <button 
              onClick={() => setTransaction({...transaction, type: 'expense', category: 'Fuel'})} 
              className={`px-5 py-2.5 font-bold rounded-xl transition-all ${transaction.type === 'expense' ? 'bg-red-500 text-white shadow-md transform scale-105' : 'text-slate-600 hover:bg-white/60'}`}
            >
              ➖ Add Expense
            </button>
            <button 
              onClick={() => setTransaction({...transaction, type: 'bank_transfer', category: 'Bank Deposit'})} 
              className={`px-5 py-2.5 font-bold rounded-xl transition-all ${transaction.type === 'bank_transfer' ? 'bg-slate-800 text-white shadow-md transform scale-105' : 'text-slate-600 hover:bg-white/60'}`}
            >
              🏦 Bank Deposit
            </button>
          </div>

          <form onSubmit={handleTransactionSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {transaction.type !== 'bank_transfer' && (
              <div>
                <label className="block text-sm font-extrabold text-slate-700 mb-1.5 uppercase tracking-wide">Category (වර්ගය)</label>
                <select name="category" value={transaction.category} onChange={handleTransactionChange} className={glassInput}>
                  {transaction.type === 'income' ? (
                    <>
                      <option value="Hire">Vehicle Hire (හයර්)</option>
                      <option value="Sales">Concrete Sales (විකුණුම්)</option>
                      <option value="Other Income">Other (වෙනත්)</option>
                    </>
                  ) : (
                    <>
                      <option value="Fuel">Fuel (තෙල් ගැසීම්)</option>
                      <option value="Repairs">Vehicle Repair (රෙපෙයාර්)</option>
                      <option value="Employee Payment">Employee Payment (සේවක ගෙවීම්)</option>
                      <option value="Materials">Raw Materials (අමුද්‍රව්‍ය)</option>
                      <option value="Other Expense">Other (වෙනත්)</option>
                    </>
                  )}
                </select>
              </div>
            )}

            {transaction.category === 'Employee Payment' && (
              <div className="animate-fade-in">
                <label className="block text-sm font-extrabold text-slate-700 mb-1.5 uppercase tracking-wide text-red-600">Select Employee (සේවකයා)</label>
                <select name="employeeId" value={transaction.employeeId} onChange={handleTransactionChange} required className={`${glassInput} border-red-200 focus:ring-red-500`}>
                  <option value="">-- තෝරන්න --</option>
                  {employees.map(emp => <option key={emp._id} value={emp._id}>{emp.name}</option>)}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-extrabold text-slate-700 mb-1.5 uppercase tracking-wide">Amount (මුදල Rs.)</label>
              <input type="number" name="amount" value={transaction.amount} onChange={handleTransactionChange} required min="1" className={`${glassInput} text-lg text-slate-900 font-black`} placeholder="Rs. 0.00" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-extrabold text-slate-700 mb-1.5 uppercase tracking-wide">Description (විස්තරය)</label>
              <input type="text" name="description" value={transaction.description} onChange={handleTransactionChange} required className={glassInput} placeholder="ගනුදෙනුව ගැන කෙටි විස්තරයක්..." />
            </div>

            {transaction.type === 'bank_transfer' && (
              <div className="md:col-span-2 bg-slate-800/5 border border-slate-800/10 p-5 rounded-xl flex items-center backdrop-blur-sm animate-fade-in mt-2">
                <input type="checkbox" name="isDeposited" checked={transaction.isDeposited} onChange={handleTransactionChange} id="depositCheck" className="w-6 h-6 text-orange-600 rounded cursor-pointer mr-4 border-slate-300 focus:ring-orange-500" />
                <label htmlFor="depositCheck" className="text-slate-800 font-bold cursor-pointer select-none">
                  I confirm that this amount has been successfully transferred to the <span className="text-orange-600 font-black">Boss's Bank Account</span>.
                </label>
              </div>
            )}

            <div className="md:col-span-2 pt-4">
              <button type="submit" className={`w-full text-white font-black py-4 px-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-1 text-lg ${
                transaction.type === 'income' ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 hover:shadow-emerald-500/30' : 
                transaction.type === 'expense' ? 'bg-gradient-to-r from-red-500 to-red-600 hover:shadow-red-500/30' : 
                'bg-gradient-to-r from-slate-800 to-slate-900 hover:shadow-slate-900/30'
              }`}>
                {transaction.type === 'income' ? 'ADD INCOME TO CASHIER' : 
                 transaction.type === 'expense' ? 'DEDUCT EXPENSE FROM CASHIER' : 'CONFIRM BANK DEPOSIT'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FinanceManagement;