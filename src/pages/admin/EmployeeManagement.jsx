import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Add & Edit Employee State
  const [empForm, setEmpForm] = useState({ name: '', position: 'Laborer', phone: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Custom Delete Modal State
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [empToDelete, setEmpToDelete] = useState(null);

  // Expanded Row State (Paysheet එක බලන්න)
  const [expandedEmpId, setExpandedEmpId] = useState(null);

  const fetchEmployees = async () => {
    try {
      const response = await api.get('/employees');
      setEmployees(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setErrorMessage("Failed to load employees. (දත්ත ලබාගැනීම අසාර්ථකයි!)");
      setTimeout(() => setErrorMessage(''), 3000);
      setLoading(false);
    }
  };

  useEffect(() => { fetchEmployees(); }, []);

  const handleEmpSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put(`/employees/${editId}`, empForm);
        setSuccessMessage('Employee updated successfully! (සේවක දත්ත යාවත්කාලීන කරන ලදී!) ✅');
      } else {
        await api.post('/employees', empForm);
        setSuccessMessage('New employee added successfully! (නව සේවකයෙකු ඇතුළත් කරන ලදී!) ✅');
      }
      setTimeout(() => setSuccessMessage(''), 3000);
      fetchEmployees();
      resetForm();
    } catch (error) {
      setErrorMessage("Failed to save employee. (දෝෂයකි!)");
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const handleEdit = (emp, e) => {
    e.stopPropagation(); // නම ඔබද්දී paysheet එක open වෙන එක නවත්තන්න
    setIsEditing(true);
    setEditId(emp._id);
    setEmpForm({ name: emp.name, position: emp.position, phone: emp.phone });
  };

  const initiateDelete = (id, e) => {
    e.stopPropagation();
    setEmpToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/employees/${empToDelete}`);
      setSuccessMessage('Employee removed successfully! (සේවකයා ඉවත් කරන ලදී!)');
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
      setErrorMessage("Failed to delete. (ඉවත් කිරීම අසාර්ථකයි!)");
    } finally {
      setShowDeleteModal(false);
      setEmpToDelete(null);
      setTimeout(() => setSuccessMessage(''), 3000);
      setTimeout(() => setErrorMessage(''), 3000);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setEmpToDelete(null);
  };

  const resetForm = () => {
    setEmpForm({ name: '', position: 'Laborer', phone: '' });
    setIsEditing(false);
    setEditId(null);
  };

  // Paysheet එක Open/Close කිරීම
  const togglePaysheet = (id) => {
    setExpandedEmpId(expandedEmpId === id ? null : id);
  };

  // දින හැඩගැන්වීම සඳහා function එක
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  // මුළු ආයතනයේම පඩි වියදම ගණනය කිරීම
  const totalCompanySalaryExpense = employees.reduce((sum, emp) => sum + (emp.totalPaid || 0), 0);

  // CSS Classes
  const glassCard = "bg-white/60 backdrop-blur-xl border border-white/50 shadow-xl shadow-slate-200/40 rounded-2xl p-6 lg:p-8";
  const glassInput = "w-full p-3.5 bg-white/50 border border-slate-200/60 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all font-medium text-slate-800 placeholder-slate-400";

  return (
    <div className="p-6 md:p-8 relative">
      
      {/* --- Success Message Toast --- */}
      {successMessage && (
        <div className="fixed top-6 right-6 z-50 max-w-sm rounded-2xl border border-emerald-200 bg-white/95 backdrop-blur-xl shadow-2xl shadow-emerald-200/30 p-4 animate-[fadeIn_0.25s_ease-out]">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-xl">✓</div>
            <div>
              <p className="text-sm font-black text-slate-900">Success</p>
              <p className="text-sm font-semibold text-slate-600">{successMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* --- Error Message Toast --- */}
      {errorMessage && (
        <div className="fixed top-6 right-6 z-50 max-w-sm rounded-2xl border border-red-200 bg-white/95 backdrop-blur-xl shadow-2xl shadow-red-200/30 p-4 animate-[fadeIn_0.25s_ease-out]">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-red-100 text-red-600 text-xl">⚠️</div>
            <div>
              <p className="text-sm font-black text-slate-900">Error</p>
              <p className="text-sm font-semibold text-slate-600">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* --- Custom Delete Confirmation Modal --- */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm transition-opacity animate-[fadeIn_0.2s_ease-out]">
          <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-md w-full mx-4 transform transition-all">
            <div className="flex flex-col items-center text-center">
              <div className="h-16 w-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center text-3xl mb-4 shadow-inner">🗑️</div>
              <h3 className="text-xl font-black text-slate-800 mb-2">Delete Employee?</h3>
              <p className="text-slate-500 font-medium mb-6">
                Are you sure you want to delete this employee? This action cannot be undone.<br/>
                <span className="text-sm">(මෙම සේවකයා ඉවත් කිරීමට ඔබට විශ්වාසද?)</span>
              </p>
              <div className="flex gap-3 w-full">
                <button onClick={cancelDelete} className="flex-1 bg-slate-100 text-slate-700 font-bold py-3 px-4 rounded-xl hover:bg-slate-200 transition-colors">Cancel (අවලංගු)</button>
                <button onClick={confirmDelete} className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-3 px-4 rounded-xl hover:shadow-lg hover:shadow-red-500/30 transition-all transform hover:-translate-y-0.5">Yes, Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">
            Employee <span className="text-orange-600">Directory</span> 👷‍♂️
          </h2>
          <p className="text-slate-500 font-bold">Manage staff details & view payment history (Paysheets).</p>
        </div>
        
        {/* Total Company Budget Widget */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 rounded-2xl shadow-lg shadow-orange-200 text-white min-w-[200px]">
          <p className="text-orange-100 text-xs font-black uppercase tracking-wider mb-1">Total Paid (මුළු වියදම)</p>
          <h3 className="text-2xl font-black">Rs. {totalCompanySalaryExpense.toLocaleString()}</h3>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Add/Edit Employee Form */}
        <div className={`${glassCard} h-fit sticky top-24`}>
          <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center">
            <span className="bg-orange-100 text-orange-600 p-2 rounded-lg mr-3">📝</span>
            {isEditing ? 'Edit Employee (වෙනස් කරන්න)' : 'Add New Employee'}
          </h3>
          
          <form onSubmit={handleEmpSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-extrabold text-slate-700 mb-1.5 uppercase tracking-wide">Full Name (නම)</label>
              <input type="text" value={empForm.name} onChange={(e) => setEmpForm({...empForm, name: e.target.value})} required className={glassInput} placeholder="e.g. Nimal Perera" />
            </div>
            
            <div>
              <label className="block text-sm font-extrabold text-slate-700 mb-1.5 uppercase tracking-wide">Position (තනතුර)</label>
              <select value={empForm.position} onChange={(e) => setEmpForm({...empForm, position: e.target.value})} className={glassInput}>
                <option value="Laborer">Laborer (කම්කරු)</option>
                <option value="Machine Operator">Machine Operator (යන්ත්‍ර ක්‍රියාකරු)</option>
                <option value="Driver">Driver (රියදුරු)</option>
                <option value="Manager">Manager (කළමනාකරු)</option>
                {/* අලුතින් එකතු කළ Accountant තනතුර */}
                <option value="Accountant">Accountant (ගණකාධිකාරී)</option> 
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-extrabold text-slate-700 mb-1.5 uppercase tracking-wide">Phone (දුරකථන)</label>
              <input type="text" value={empForm.phone} onChange={(e) => setEmpForm({...empForm, phone: e.target.value})} required className={glassInput} placeholder="07X XXX XXXX" />
            </div>
            
            <div className="flex gap-3 pt-4">
              <button type="submit" className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-black py-3.5 px-4 rounded-xl hover:shadow-lg hover:shadow-orange-500/30 transition-all transform hover:-translate-y-0.5">
                {isEditing ? 'UPDATE RECORD' : 'SAVE EMPLOYEE'}
              </button>
              {isEditing && (
                <button type="button" onClick={resetForm} className="bg-slate-200/70 text-slate-700 font-black py-3.5 px-6 rounded-xl hover:bg-slate-300 transition-all">
                  CANCEL
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Employee Table */}
        <div className={`xl:col-span-2 ${glassCard} overflow-hidden flex flex-col`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <span className="bg-slate-100 text-slate-700 p-2 rounded-lg mr-3">👥</span>
              <h3 className="text-xl font-black text-slate-800">Staff List & Paysheets</h3>
            </div>
            <p className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">Click on a row to view Paysheet</p>
          </div>
          
          <div className="overflow-x-auto custom-scrollbar flex-1 pb-4">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <p className="text-slate-500 font-bold animate-pulse">Loading data... (දත්ත ලබාගනිමින්...)</p>
              </div>
            ) : employees.length === 0 ? (
              <div className="text-center py-16 bg-white/40 rounded-2xl border border-dashed border-slate-300">
                <span className="text-4xl mb-3 block opacity-50">📭</span>
                <p className="text-slate-500 font-bold">No employees found.</p>
              </div>
            ) : (
              <table className="min-w-full text-left text-sm whitespace-nowrap">
                <thead className="uppercase tracking-widest text-xs font-black text-slate-500 bg-slate-100/50 rounded-xl">
                  <tr>
                    <th className="px-5 py-4 rounded-tl-xl rounded-bl-xl w-10"></th>
                    <th className="px-5 py-4">Employee Details</th>
                    <th className="px-5 py-4 text-right">Total Paid (Rs)</th>
                    <th className="px-5 py-4 text-center rounded-tr-xl rounded-br-xl">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/80">
                  {employees.map((emp) => (
                    <React.Fragment key={emp._id}>
                      {/* Main Employee Row */}
                      <tr 
                        onClick={() => togglePaysheet(emp._id)} 
                        className={`hover:bg-orange-50/50 transition-colors group cursor-pointer ${expandedEmpId === emp._id ? 'bg-orange-50/50' : ''}`}
                      >
                        <td className="px-5 py-4 text-slate-400 font-bold">
                          {expandedEmpId === emp._id ? '▼' : '▶'}
                        </td>
                        <td className="px-5 py-4">
                          <p className="font-black text-slate-800 text-base">{emp.name}</p>
                          <div className="flex items-center mt-1 space-x-2">
                            <span className="bg-slate-200/70 text-slate-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">{emp.position}</span>
                            <span className="text-xs text-slate-500 font-semibold">{emp.phone}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <p className="font-black text-orange-600 text-lg">{(emp.totalPaid || 0).toLocaleString()}</p>
                        </td>
                        <td className="px-5 py-4 text-center">
                          <div className="flex justify-center gap-2">
                            <button onClick={(e) => handleEdit(emp, e)} className="bg-slate-100 text-slate-700 hover:bg-slate-800 hover:text-white font-bold px-4 py-2 rounded-lg transition-all shadow-sm">
                              Edit
                            </button>
                            <button onClick={(e) => initiateDelete(emp._id, e)} className="bg-red-50 text-red-600 hover:bg-red-500 hover:text-white font-bold px-4 py-2 rounded-lg transition-all shadow-sm">
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>

                      {/* --- Expandable Paysheet Dropdown Row --- */}
                      {expandedEmpId === emp._id && (
                        <tr className="bg-slate-50/80 shadow-inner">
                          <td colSpan="4" className="p-0 border-b-2 border-orange-200">
                            <div className="p-6 md:p-8 animate-[fadeIn_0.3s_ease-in-out]">
                              <div className="flex items-center justify-between mb-4 border-b border-slate-200 pb-3">
                                <h4 className="text-lg font-black text-slate-800 flex items-center gap-2">
                                  <span>🧾</span> Paysheet History: <span className="text-orange-600">{emp.name}</span>
                                </h4>
                                <span className="text-xs font-bold bg-white px-3 py-1 rounded-full shadow-sm text-slate-500">
                                  Total Earned: Rs. {(emp.totalPaid || 0).toLocaleString()}
                                </span>
                              </div>
                              
                              {/* Paysheet History Table */}
                              {emp.paymentHistory && emp.paymentHistory.length > 0 ? (
                                <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                                  <table className="min-w-full text-left text-sm">
                                    <thead className="bg-slate-100 text-slate-600 font-black text-xs uppercase tracking-wider">
                                      <tr>
                                        <th className="px-4 py-3">Date</th>
                                        <th className="px-4 py-3">Description / Reason</th>
                                        <th className="px-4 py-3 text-right">Amount (Rs)</th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                      {emp.paymentHistory.map((payment, index) => (
                                        <tr key={index} className="hover:bg-slate-50 transition-colors">
                                          <td className="px-4 py-3 font-semibold text-slate-600">{formatDate(payment.date)}</td>
                                          <td className="px-4 py-3 text-slate-700">{payment.reason || payment.description || "Daily Wage"}</td>
                                          <td className="px-4 py-3 text-right font-black text-emerald-600">+{payment.amount.toLocaleString()}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              ) : (
                                <div className="text-center py-6 bg-white/60 rounded-xl border border-dashed border-slate-300">
                                  <p className="text-slate-500 font-bold text-sm">No payment history found for this employee yet.</p>
                                  <p className="text-slate-400 text-xs mt-1">(මෙම සේවකයාට අදාළ ගෙවීම් වාර්තා තවම නොමැත)</p>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default EmployeeManagement;