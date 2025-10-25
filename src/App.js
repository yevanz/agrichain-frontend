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
import Login from './pages/Login';
import Signup from './pages/Signup'; // New import
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();
  const bgUrl = process.env.PUBLIC_URL + '/agriChain.jpg';

  return (
    <div className="App" style={{ backgroundImage: `url(${bgUrl})` }}>
      <div className="app-dark-overlay" />
      <div className="container">
        {!user && (
          <header className="header">
            <div className="logo">
              <img src={process.env.PUBLIC_URL + '/logo192.png'} alt="logo" style={{ height: 36 }} />
              <div className="title">AgriChain</div>
            </div>
          </header>
        )}

        <main className="card">
          <Router>
            {user && <Navbar />}
            <Routes>
              <Route path="/" element={<Marketplace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} /> {/* New route */}
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
          </Router>
        </main>

        <footer className="footer">© AgriChain</footer>
      </div>
    </div>
  );
}

export default App;
