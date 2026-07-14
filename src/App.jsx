import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/shop/Home';
import ContactUs from './pages/shop/Contact'; // <-- අලුතින් හදපු Contact Page එක Import කළා
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

// Admin Components
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import EmployeeManagement from './pages/admin/EmployeeManagement';
import OrderManagement from './pages/admin/OrderManagement';
import FinanceManagement from './pages/admin/FinanceManagement';
import ProductManagement from './pages/admin/ProductManagement';
import TransactionHistory from './pages/admin/TransactionHistory';
import SystemLogs from './pages/admin/SystemLogs';

// (Customers පිටුව අපි ඊළඟට හදමු, දැනට ඒක blank page එකක් විදිහට තියමු)
const CustomerManagement = () => (
  <div className="p-6">
    <h2 className="text-2xl font-bold text-slate-800">Customer List 🧑‍🤝‍🧑 (Coming Soon...)</h2>
  </div>
);

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
        <Navbar />

        {/* Main Content */}
        <main className="flex-grow">
          <Routes>
            {/* Public Routes (සාමාන්‍ය අයට පේන පිටු) */}
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<ContactUs />} /> {/* <-- අලුත් Contact Route එක */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Admin Routes (Admin පැනල් එකේ පිටු) */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} /> {/* default to /admin */}
              <Route path="products" element={<ProductManagement />} />
              <Route path="orders" element={<OrderManagement />} />
              <Route path="finance" element={<FinanceManagement />} />
              <Route path="ledger" element={<TransactionHistory />} />
              <Route path="logs" element={<SystemLogs />} />
              <Route path="employees" element={<EmployeeManagement />} />
              <Route path="customers" element={<CustomerManagement />} />
            </Route>
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;