import { useState, useEffect } from 'react';
import api from '../../services/api';

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  // Add & Edit Employee State
  const [empForm, setEmpForm] = useState({ name: '', position: 'Laborer', phone: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const fetchEmployees = async () => {
    try {
      const response = await api.get('/employees');
      setEmployees(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching employees:", error);
      setLoading(false);
    }
  };

  useEffect(() => { fetchEmployees(); }, []);

  // Submit Form (For both Adding and Updating)
  const handleEmpSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put(`/employees/${editId}`, empForm);
        alert("Employee updated successfully! (සේවක දත්ත යාවත්කාලීන කරන ලදී!) ✅");
      } else {
        await api.post('/employees', empForm);
        setSuccessMessage('New employee added successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
      fetchEmployees();
      resetForm();
    } catch (error) {
      alert("Failed to save employee. (දෝෂයකි!)");
    }
  };

  // Set Form to Edit Mode
  const handleEdit = (emp) => {
    setIsEditing(true);
    setEditId(emp._id);
    setEmpForm({ name: emp.name, position: emp.position, phone: emp.phone });
  };

  // Delete Employee
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee? (මෙම සේවකයා ඉවත් කිරීමට ඔබට විශ්වාසද?) ⚠️")) {
      try {
        await api.delete(`/employees/${id}`);
        alert("Employee removed successfully! (සේවකයා ඉවත් කරන ලදී!)");
        fetchEmployees();
      } catch (error) {
        console.error("Error deleting employee:", error);
        alert("Failed to delete. (ඉවත් කිරීම අසාර්ථකයි!)");
      }
    }
  };

  // Reset Form
  const resetForm = () => {
    setEmpForm({ name: '', position: 'Laborer', phone: '' });
    setIsEditing(false);
    setEditId(null);
  };

  // පොදු වීදුරු (Glassmorphism) පන්තිය
  const glassCard = "bg-white/60 backdrop-blur-xl border border-white/50 shadow-xl shadow-slate-200/40 rounded-2xl p-6 lg:p-8";
  const glassInput = "w-full p-3.5 bg-white/50 border border-slate-200/60 rounded-xl outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all font-medium text-slate-800 placeholder-slate-400";

  return (
    <div className="p-6 md:p-8">
      {successMessage && (
        <div className="fixed top-6 right-6 z-50 max-w-sm rounded-2xl border border-emerald-200 bg-white/95 backdrop-blur-xl shadow-2xl shadow-emerald-200/30 p-4 animate-[fadeIn_0.25s_ease-out]">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 text-xl">
              ✓
            </div>
            <div>
              <p className="text-sm font-black text-slate-900">Success</p>
              <p className="text-sm font-semibold text-slate-600">{successMessage}</p>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">
          Employee <span className="text-orange-600">Directory</span> 👷‍♂️
        </h2>
        <p className="text-slate-500 font-bold">Manage staff details. Payments are made through the Finance page.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Add/Edit Employee Form (Glass Card) */}
        <div className={`${glassCard} h-fit`}>
          <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center">
            <span className="bg-orange-100 text-orange-600 p-2 rounded-lg mr-3">📝</span>
            {isEditing ? 'Edit Employee (වෙනස් කරන්න)' : 'Add New Employee'}
          </h3>
          
          <form onSubmit={handleEmpSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-extrabold text-slate-700 mb-1.5 uppercase tracking-wide">Full Name (සම්පූර්ණ නම)</label>
              <input type="text" value={empForm.name} onChange={(e) => setEmpForm({...empForm, name: e.target.value})} required className={glassInput} placeholder="e.g. Name" />
            </div>
            
            <div>
              <label className="block text-sm font-extrabold text-slate-700 mb-1.5 uppercase tracking-wide">Position (තනතුර)</label>
              <select value={empForm.position} onChange={(e) => setEmpForm({...empForm, position: e.target.value})} className={glassInput}>
                <option value="Laborer">Laborer (කම්කරු)</option>
                <option value="Machine Operator">Machine Operator (යන්ත්‍ර ක්‍රියාකරු)</option>
                <option value="Driver">Driver (රියදුරු)</option>
                <option value="Manager">Manager (කළමනාකරු)</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-extrabold text-slate-700 mb-1.5 uppercase tracking-wide">Phone (දුරකථන අංකය)</label>
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

        {/* Employee Table (Glass Card) */}
        <div className={`xl:col-span-2 ${glassCard} overflow-hidden flex flex-col`}>
          <div className="flex items-center mb-6">
            <span className="bg-slate-100 text-slate-700 p-2 rounded-lg mr-3">👥</span>
            <h3 className="text-xl font-black text-slate-800">Staff List & Total Earnings</h3>
          </div>
          
          <div className="overflow-x-auto custom-scrollbar flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-40">
                <p className="text-slate-500 font-bold animate-pulse">Loading data... (දත්ත ලබාගනිමින්...)</p>
              </div>
            ) : employees.length === 0 ? (
              <div className="text-center py-16 bg-white/40 rounded-2xl border border-dashed border-slate-300">
                <span className="text-4xl mb-3 block opacity-50">📭</span>
                <p className="text-slate-500 font-bold">No employees found. (සේවකයින් කිසිවෙකු නොමැත.)</p>
              </div>
            ) : (
              <table className="min-w-full text-left text-sm whitespace-nowrap">
                <thead className="uppercase tracking-widest text-xs font-black text-slate-500 bg-slate-100/50 rounded-xl">
                  <tr>
                    <th className="px-5 py-4 rounded-tl-xl rounded-bl-xl">Employee Details</th>
                    <th className="px-5 py-4">Total Paid</th>
                    <th className="px-5 py-4">Last Payment</th>
                    <th className="px-5 py-4 text-center rounded-tr-xl rounded-br-xl">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100/50">
                  {employees.map((emp) => (
                    <tr key={emp._id} className="hover:bg-white/60 transition-colors group">
                      <td className="px-5 py-4">
                        <p className="font-black text-slate-800 text-base">{emp.name}</p>
                        <div className="flex items-center mt-1 space-x-2">
                          <span className="bg-slate-200/70 text-slate-700 text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">{emp.position}</span>
                          <span className="text-xs text-slate-500 font-semibold">{emp.phone}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-black text-orange-600 text-lg">Rs. {(emp.totalPaid || 0).toLocaleString()}</p>
                      </td>
                      <td className="px-5 py-4 max-w-[200px]">
                        {emp.lastPaymentAmount ? (
                          <div className="flex flex-col">
                            <span className="font-black text-slate-700">Rs. {emp.lastPaymentAmount}</span>
                            <span className="text-xs text-slate-500 font-medium truncate mt-0.5" title={emp.lastPaymentReason}>
                              {emp.lastPaymentReason}
                            </span>
                          </div>
                        ) : (
                          <span className="bg-slate-100 text-slate-400 font-bold px-2 py-1 rounded text-xs">No payments</span>
                        )}
                      </td>
                      <td className="px-5 py-4 text-center">
                        <div className="flex justify-center gap-2 opacity-80 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => handleEdit(emp)} 
                            className="bg-slate-100 text-slate-700 hover:bg-slate-800 hover:text-white font-bold px-4 py-2 rounded-lg transition-all shadow-sm"
                          >
                            Edit
                          </button>
                          <button 
                            onClick={() => handleDelete(emp._id)} 
                            className="bg-red-50 text-red-600 hover:bg-red-500 hover:text-white font-bold px-4 py-2 rounded-lg transition-all shadow-sm"
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
    </div>
  );
};

export default EmployeeManagement;