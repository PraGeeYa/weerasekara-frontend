import { useState, useEffect } from 'react';
import api from '../../services/api';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // ෆිල්ටර් එක තියාගන්න State එක (all, income, expense, bank_transfer)
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await api.get('/finance/transactions');
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // --- එකතු කිරීම් (Totals) ගණනය කිරීම ---
  const totalIncome = transactions.filter(tx => tx.type === 'income').reduce((sum, tx) => sum + tx.amount, 0);
  const totalExpense = transactions.filter(tx => tx.type === 'expense').reduce((sum, tx) => sum + tx.amount, 0);
  const totalBankDeposit = transactions.filter(tx => tx.type === 'bank_transfer').reduce((sum, tx) => sum + tx.amount, 0);

  // --- තෝරාගත් Tab එකට අනුව Data ෆිල්ටර් කිරීම ---
  const filteredTransactions = transactions.filter(tx => {
    if (activeTab === 'all') return true;
    return tx.type === activeTab;
  });

  return (
    <div className="p-6">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Ledger & History 🧾</h2>
      <p className="text-gray-500 font-medium mb-6">Track all your business cash flows clearly.</p>

      {/* Summary Cards (සාරාංශය) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-green-50 border border-green-200 p-6 rounded-2xl shadow-sm">
          <p className="text-green-700 font-bold text-sm mb-1 uppercase tracking-wide">Total Income (මුළු ආදායම්)</p>
          <h3 className="text-3xl font-black text-green-600">Rs. {totalIncome.toLocaleString()}</h3>
        </div>
        <div className="bg-red-50 border border-red-200 p-6 rounded-2xl shadow-sm">
          <p className="text-red-700 font-bold text-sm mb-1 uppercase tracking-wide">Total Expenses (මුළු වියදම්)</p>
          <h3 className="text-3xl font-black text-red-600">Rs. {totalExpense.toLocaleString()}</h3>
        </div>
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-2xl shadow-sm">
          <p className="text-blue-700 font-bold text-sm mb-1 uppercase tracking-wide">Total Bank Deposits (බැංකු තැන්පතු)</p>
          <h3 className="text-3xl font-black text-blue-600">Rs. {totalBankDeposit.toLocaleString()}</h3>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
        
        {/* Filter Tabs (වෙන් කරලා බලන බොත්තම්) */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-100 pb-4">
          <button 
            onClick={() => setActiveTab('all')} 
            className={`px-5 py-2 font-bold rounded-xl transition ${activeTab === 'all' ? 'bg-gray-800 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            All Records (සියල්ල)
          </button>
          <button 
            onClick={() => setActiveTab('income')} 
            className={`px-5 py-2 font-bold rounded-xl transition ${activeTab === 'income' ? 'bg-green-600 text-white shadow-md' : 'bg-green-50 text-green-700 hover:bg-green-100'}`}
          >
            Incomes ➕
          </button>
          <button 
            onClick={() => setActiveTab('expense')} 
            className={`px-5 py-2 font-bold rounded-xl transition ${activeTab === 'expense' ? 'bg-red-600 text-white shadow-md' : 'bg-red-50 text-red-700 hover:bg-red-100'}`}
          >
            Expenses ➖
          </button>
          <button 
            onClick={() => setActiveTab('bank_transfer')} 
            className={`px-5 py-2 font-bold rounded-xl transition ${activeTab === 'bank_transfer' ? 'bg-blue-600 text-white shadow-md' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}
          >
            Bank Deposits 🏦
          </button>
        </div>
        
        {/* Table එක */}
        <div className="overflow-x-auto">
          {loading ? (
            <p className="text-gray-500 font-medium py-4">Loading records...</p>
          ) : filteredTransactions.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <p className="text-gray-500 font-medium">No records found for this category. (මෙම කාණ්ඩයේ වාර්තා කිසිවක් නැත.)</p>
            </div>
          ) : (
            <table className="min-w-full text-left text-sm whitespace-nowrap">
              <thead className="uppercase tracking-wider border-b-2 border-gray-200 bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-3">Date & Time</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3 text-right">Amount (Rs)</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx) => (
                  <tr key={tx._id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    
                    <td className="px-4 py-4 text-gray-600">
                      {formatDate(tx.createdAt)}
                    </td>
                    
                    <td className="px-4 py-4 font-bold text-gray-800 flex items-center gap-2">
                      {tx.type === 'income' && <span className="w-2 h-2 rounded-full bg-green-500 block"></span>}
                      {tx.type === 'expense' && <span className="w-2 h-2 rounded-full bg-red-500 block"></span>}
                      {tx.type === 'bank_transfer' && <span className="w-2 h-2 rounded-full bg-blue-500 block"></span>}
                      {tx.category}
                    </td>
                    
                    <td className="px-4 py-4 text-gray-600 max-w-[300px] truncate" title={tx.description}>
                      {tx.description}
                      {tx.employeeId && (
                        <span className="block text-xs font-bold text-blue-500 mt-1">
                          Ref: {tx.employeeId.name}
                        </span>
                      )}
                    </td>
                    
                    <td className={`px-4 py-4 text-right font-black text-lg ${
                      tx.type === 'income' ? 'text-green-600' : 
                      tx.type === 'expense' ? 'text-red-600' : 'text-blue-600'
                    }`}>
                      {tx.type === 'expense' ? '-' : tx.type === 'income' ? '+' : ''}
                      {tx.amount.toLocaleString()}
                    </td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
};

export default TransactionHistory;