import { useState, useEffect } from 'react';
import api from '../../services/api';

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // UI States (Tabs & Messages)
  const [activeTab, setActiveTab] = useState('all');
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success'); // 'success' or 'error'

  // Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedTx, setSelectedTx] = useState(null);
  
  // Form States (විශේෂ හේතුව සහ Edit දත්ත)
  const [actionReason, setActionReason] = useState('');
  const [editForm, setEditForm] = useState({ amount: '', category: '', description: '' });

  const fetchTransactions = async () => {
    try {
      const response = await api.get('/finance/transactions');
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      showToast("Failed to load records. (දත්ත ලබාගැනීම අසාර්ථකයි!)", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTransactions(); }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const showToast = (msg, type = 'success') => {
    setToastMessage(msg);
    setToastType(type);
    setTimeout(() => setToastMessage(''), 3500);
  };

  // --- Edit Actions ---
  const openEditModal = (tx) => {
    setSelectedTx(tx);
    setEditForm({ amount: tx.amount, category: tx.category, description: tx.description });
    setActionReason('');
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!actionReason.trim()) {
      showToast("A reason is required to make changes! (හේතුවක් ඇතුළත් කිරීම අනිවාර්යයි!)", "error");
      return;
    }
    
    try {
      await api.put(`/finance/transactions/${selectedTx._id}`, { ...editForm, reason: actionReason });
      showToast("Record updated successfully! (වාර්තාව යාවත්කාලීන කරන ලදී!)", "success");
      setIsEditModalOpen(false);
      fetchTransactions();
    } catch (error) {
      showToast(error.response?.data?.message || "Failed to update record.", "error");
    }
  };

  // --- Delete Actions ---
  const openDeleteModal = (tx) => {
    setSelectedTx(tx);
    setActionReason('');
    setIsDeleteModalOpen(true);
  };

  const handleDeleteSubmit = async (e) => {
    e.preventDefault();
    if (!actionReason.trim()) {
      showToast("A reason is required to delete! (හේතුවක් ඇතුළත් කිරීම අනිවාර්යයි!)", "error");
      return;
    }

    try {
      // Axios එකේ delete method එකට body data යවන්න 'data' object එකක් පාවිච්චි කරන්න ඕනේ
      await api.delete(`/finance/transactions/${selectedTx._id}`, { data: { reason: actionReason } });
      showToast("Record deleted successfully! (වාර්තාව ඉවත් කරන ලදී!)", "success");
      setIsDeleteModalOpen(false);
      fetchTransactions();
    } catch (error) {
      showToast(error.response?.data?.message || "Failed to delete record.", "error");
    }
  };

  // --- Totals ---
  const totalIncome = transactions.filter(tx => tx.type === 'income').reduce((sum, tx) => sum + tx.amount, 0);
  const totalExpense = transactions.filter(tx => tx.type === 'expense').reduce((sum, tx) => sum + tx.amount, 0);
  const totalBankDeposit = transactions.filter(tx => tx.type === 'bank_transfer').reduce((sum, tx) => sum + tx.amount, 0);

  const filteredTransactions = transactions.filter(tx => {
    if (activeTab === 'all') return true;
    return tx.type === activeTab;
  });

  const glassInput = "w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium text-slate-800";

  return (
    <div className="p-6 relative">
      
      {/* --- Toast Messages --- */}
      {toastMessage && (
        <div className={`fixed top-6 right-6 z-50 max-w-sm rounded-2xl border ${toastType === 'success' ? 'border-emerald-200 bg-white/95 shadow-emerald-200/30' : 'border-red-200 bg-white/95 shadow-red-200/30'} backdrop-blur-xl shadow-2xl p-4 animate-[fadeIn_0.25s_ease-out]`}>
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

      {/* --- Edit Modal --- */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-md w-full mx-4">
            <h3 className="text-xl font-black text-slate-800 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-600 p-2 rounded-lg mr-3">✏️</span> Edit Record
            </h3>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Amount (මුදල)</label>
                <input type="number" value={editForm.amount} onChange={(e) => setEditForm({...editForm, amount: e.target.value})} required className={glassInput} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description (විස්තරය)</label>
                <input type="text" value={editForm.description} onChange={(e) => setEditForm({...editForm, description: e.target.value})} required className={glassInput} />
              </div>
              <div className="bg-red-50 border border-red-200 p-3 rounded-xl mt-4">
                <label className="block text-xs font-black text-red-700 uppercase mb-2">Required: Reason for Edit (වෙනස් කිරීමට හේතුව) ⚠️</label>
                <textarea 
                  value={actionReason} 
                  onChange={(e) => setActionReason(e.target.value)} 
                  required 
                  placeholder="Type the exact reason here..."
                  className="w-full p-2 rounded-lg border-red-300 outline-none focus:ring-2 focus:ring-red-400 text-sm"
                  rows="2"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setIsEditModalOpen(false)} className="flex-1 bg-slate-100 text-slate-700 font-bold py-3 rounded-xl hover:bg-slate-200">Cancel</button>
                <button type="submit" className="flex-1 bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-500/30">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- Delete Modal --- */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-md w-full mx-4">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-3xl mb-4">🗑️</div>
              <h3 className="text-xl font-black text-slate-800 mb-2">Delete Record?</h3>
              <p className="text-slate-500 font-medium mb-4 text-sm">
                To delete this financial record, you MUST provide a valid reason.
              </p>
            </div>
            <form onSubmit={handleDeleteSubmit}>
              <div className="bg-red-50 border border-red-200 p-3 rounded-xl mb-6">
                <label className="block text-xs font-black text-red-700 uppercase mb-2">Required: Reason for Deletion (ඉවත් කිරීමට හේතුව) ⚠️</label>
                <textarea 
                  value={actionReason} 
                  onChange={(e) => setActionReason(e.target.value)} 
                  required 
                  placeholder="e.g., Entered by mistake, Wrong amount..."
                  className="w-full p-2 rounded-lg border-red-300 outline-none focus:ring-2 focus:ring-red-400 text-sm"
                  rows="2"
                />
              </div>
              <div className="flex gap-3">
                <button type="button" onClick={() => setIsDeleteModalOpen(false)} className="flex-1 bg-slate-100 text-slate-700 font-bold py-3 rounded-xl hover:bg-slate-200">Cancel</button>
                <button type="submit" className="flex-1 bg-red-600 text-white font-bold py-3 rounded-xl hover:bg-red-700 shadow-lg shadow-red-500/30">Delete Permanently</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <h2 className="text-3xl font-extrabold text-gray-800 mb-2">Ledger & History 🧾</h2>
      <p className="text-gray-500 font-medium mb-6">Track all your business cash flows clearly.</p>

      {/* Summary Cards */}
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
        
        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-100 pb-4">
          <button onClick={() => setActiveTab('all')} className={`px-5 py-2 font-bold rounded-xl transition ${activeTab === 'all' ? 'bg-gray-800 text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>All Records</button>
          <button onClick={() => setActiveTab('income')} className={`px-5 py-2 font-bold rounded-xl transition ${activeTab === 'income' ? 'bg-green-600 text-white shadow-md' : 'bg-green-50 text-green-700 hover:bg-green-100'}`}>Incomes ➕</button>
          <button onClick={() => setActiveTab('expense')} className={`px-5 py-2 font-bold rounded-xl transition ${activeTab === 'expense' ? 'bg-red-600 text-white shadow-md' : 'bg-red-50 text-red-700 hover:bg-red-100'}`}>Expenses ➖</button>
          <button onClick={() => setActiveTab('bank_transfer')} className={`px-5 py-2 font-bold rounded-xl transition ${activeTab === 'bank_transfer' ? 'bg-blue-600 text-white shadow-md' : 'bg-blue-50 text-blue-700 hover:bg-blue-100'}`}>Bank Deposits 🏦</button>
        </div>
        
        {/* Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <p className="text-gray-500 font-medium py-4">Loading records...</p>
          ) : filteredTransactions.length === 0 ? (
            <div className="text-center py-10 bg-gray-50 rounded-xl border border-dashed border-gray-200">
              <p className="text-gray-500 font-medium">No records found for this category.</p>
            </div>
          ) : (
            <table className="min-w-full text-left text-sm whitespace-nowrap">
              <thead className="uppercase tracking-wider border-b-2 border-gray-200 bg-gray-50 text-gray-600">
                <tr>
                  <th className="px-4 py-3">Date & Time</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3 text-right">Amount (Rs)</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx) => (
                  <tr key={tx._id} className="border-b border-gray-100 hover:bg-gray-50 transition group">
                    <td className="px-4 py-4 text-gray-600">{formatDate(tx.createdAt)}</td>
                    <td className="px-4 py-4 font-bold text-gray-800 flex items-center gap-2">
                      {tx.type === 'income' && <span className="w-2 h-2 rounded-full bg-green-500 block"></span>}
                      {tx.type === 'expense' && <span className="w-2 h-2 rounded-full bg-red-500 block"></span>}
                      {tx.type === 'bank_transfer' && <span className="w-2 h-2 rounded-full bg-blue-500 block"></span>}
                      {tx.category}
                    </td>
                    <td className="px-4 py-4 text-gray-600 max-w-[250px] truncate" title={tx.description}>
                      {tx.description}
                    </td>
                    <td className={`px-4 py-4 text-right font-black text-lg ${tx.type === 'income' ? 'text-green-600' : tx.type === 'expense' ? 'text-red-600' : 'text-blue-600'}`}>
                      {tx.type === 'expense' ? '-' : tx.type === 'income' ? '+' : ''}{tx.amount.toLocaleString()}
                    </td>
                    
                    {/* Actions Column (Edit/Delete Buttons) */}
                    <td className="px-4 py-4 text-center">
                      <div className="flex justify-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button 
                          onClick={() => openEditModal(tx)}
                          className="bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white font-bold px-3 py-1.5 rounded-lg transition-colors text-xs"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => openDeleteModal(tx)}
                          className="bg-red-50 text-red-600 hover:bg-red-600 hover:text-white font-bold px-3 py-1.5 rounded-lg transition-colors text-xs"
                        >
                          Delete
                        </button>
                      </div>
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