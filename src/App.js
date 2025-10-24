import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FarmerDashboard from './pages/FarmerDashboard';
import BuyerDashboard from './pages/BuyerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Marketplace from './pages/Marketplace';
import ContractsOrders from './pages/ContractsOrders';
import FinancingInsurance from './pages/FinancingInsurance';
import AdvisoryAlerts from './pages/AdvisoryAlerts';
import Login from './pages/Login';  // Assuming a login page
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Marketplace />} />
          <Route path="/login" element={<Login />} />
          {user?.role === 'farmer' && (
            <>
              <Route path="/farmer" element={<FarmerDashboard />} />
              <Route path="/contracts" element={<ContractsOrders />} />
              <Route path="/financing" element={<FinancingInsurance />} />
              <Route path="/advisory" element={<AdvisoryAlerts />} />
            </>
          )}
          {user?.role === 'buyer' && (
            <>
              <Route path="/buyer" element={<BuyerDashboard />} />
              <Route path="/contracts" element={<ContractsOrders />} />
            </>
          )}
          {user?.role === 'admin' && (
            <Route path="/admin" element={<AdminDashboard />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
