import { useState, useEffect } from 'react';
import api from '../../services/api';

const SystemLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // අලුතින් Error State එකක් දැම්මා

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await api.get('/logs');
        console.log("Backend response data:", response.data); // මේ පේළිය අලුතින් එකතු කරන්න
        // Backend එකෙන් එන්නේ Object එකක් නම් (උදා: {logs: [...]}) ඒකේ ලොග්ස් ටික ගන්න
        // නැත්නම් කෙලින්ම response.data එකම පාවිච්චි කරන්න
        const data = Array.isArray(response.data) ? response.data : (response.data.logs || []);
        setLogs(data);
      } catch (err) {
        console.error("Error fetching logs:", err);
        setError("Failed to load system logs. Please check your connection.");
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
      case 'GET': return <span className="bg-gray-100 text-gray-800 font-bold px-2 py-1 rounded text-xs">READ (👁️)</span>;
      default: return <span className="bg-gray-100 text-gray-800 font-bold px-2 py-1 rounded text-xs">{method}</span>;
    }
  };

  // Object එකක් ආවොත් Crash වෙන්නේ නැති වෙන්න හදපු අලුත් Function එක
  const formatDataChanged = (data) => {
    if (!data) return 'N/A';
    
    let stringifiedData = data;
    if (typeof data === 'object') {
      stringifiedData = JSON.stringify(data);
    }
    
    return stringifiedData === '{}' ? 'N/A' : stringifiedData;
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-2">System Activity Logs 🕵️‍♂️</h2>
      <p className="text-gray-500 font-medium mb-6">Track all admin actions, IP addresses, and data changes</p>

      {/* Error එකක් ආවොත් පෙන්වන්න */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl font-bold mb-6 text-sm flex items-center gap-2 shadow-sm">
          ⚠️ {error}
        </div>
      )}

      <div className="bg-gray-900 p-6 rounded-2xl shadow-xl overflow-x-auto border border-gray-700">
        
        {loading ? (
          <p className="text-green-400 font-mono animate-pulse">Loading system logs...</p>
        ) : logs.length === 0 && !error ? (
          <p className="text-green-400 font-mono">No recent activity detected.</p>
        ) : !error && (
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
              {logs.map((log) => {
                const formattedData = formatDataChanged(log.dataChanged);

                return (
                  <tr key={log._id} className="border-b border-gray-800 hover:bg-gray-800 transition">
                    <td className="px-4 py-3 text-gray-300">{formatDate(log.createdAt)}</td>
                    <td className="px-4 py-3">
                      <p className="font-bold text-white">
                        {/* User එක Object එකක් විදිහට ආවත් Crash නොවෙන්න හැදුවා */}
                        {typeof log.user === 'object' ? (log.user?.email || log.user?.name || 'Unknown') : (log.user || 'Unknown')}
                      </p>
                      <p className="text-xs text-gray-500">IP: {log.ipAddress || 'N/A'}</p>
                    </td>
                    <td className="px-4 py-3">{getActionBadge(log.method)}</td>
                    <td className="px-4 py-3 text-blue-300">{log.url}</td>
                    <td className="px-4 py-3 max-w-[300px] truncate text-gray-400" title={formattedData}>
                      {formattedData}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SystemLogs;