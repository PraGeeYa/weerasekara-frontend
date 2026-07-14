import { useState, useEffect } from 'react';
import api from '../../services/api';

const SystemLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await api.get('/logs');
        setLogs(response.data);
      } catch (error) {
        console.error("Error fetching logs");
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', { 
        year: 'numeric', month: 'short', day: 'numeric', 
        hour: '2-digit', minute: '2-digit', second: '2-digit' 
    });
  };

  const getActionBadge = (method) => {
    switch(method) {
      case 'POST': return <span className="bg-green-100 text-green-800 font-bold px-2 py-1 rounded text-xs">CREATED (➕)</span>;
      case 'PUT': return <span className="bg-blue-100 text-blue-800 font-bold px-2 py-1 rounded text-xs">UPDATED (✏️)</span>;
      case 'DELETE': return <span className="bg-red-100 text-red-800 font-bold px-2 py-1 rounded text-xs">DELETED (🗑️)</span>;
      default: return <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">{method}</span>;
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-2">System Activity Logs 🕵️‍♂️</h2>
      <p className="text-gray-500 font-medium mb-6">Track all admin actions, IP addresses, and data changes.</p>

      <div className="bg-gray-900 p-6 rounded-2xl shadow-xl overflow-x-auto border border-gray-700">
        
        {loading ? (
          <p className="text-green-400 font-mono">Loading system logs...</p>
        ) : logs.length === 0 ? (
          <p className="text-green-400 font-mono">No recent activity detected.</p>
        ) : (
          <table className="min-w-full text-left text-sm whitespace-nowrap font-mono text-green-400">
            <thead className="uppercase tracking-wider border-b border-gray-700 text-gray-400 bg-gray-800">
              <tr>
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">User & IP</th>
                <th className="px-4 py-3">Action</th>
                <th className="px-4 py-3">Target URL</th>
                <th className="px-4 py-3">Data Changed</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log._id} className="border-b border-gray-800 hover:bg-gray-800 transition">
                  <td className="px-4 py-3 text-gray-300">{formatDate(log.createdAt)}</td>
                  <td className="px-4 py-3">
                    <p className="font-bold text-white">{log.user}</p>
                    <p className="text-xs text-gray-500">IP: {log.ipAddress}</p>
                  </td>
                  <td className="px-4 py-3">{getActionBadge(log.method)}</td>
                  <td className="px-4 py-3 text-blue-300">{log.url}</td>
                  <td className="px-4 py-3 max-w-[300px] truncate text-gray-400" title={log.dataChanged}>
                    {log.dataChanged !== '{}' ? log.dataChanged : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SystemLogs;