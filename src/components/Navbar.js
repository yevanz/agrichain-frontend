import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">AgriChain</Link>
        <div className="navbar-nav">
          <Link className="nav-link" to="/">Marketplace</Link>
          {user?.role === 'farmer' && (
            <>
              <Link className="nav-link" to="/farmer">Farmer Portal</Link>
              <Link className="nav-link" to="/contracts">Contracts & Orders</Link>
              <Link className="nav-link" to="/financing">Financing & Insurance</Link>
              <Link className="nav-link" to="/advisory">Advisory & Alerts</Link>
            </>
          )}
          {user?.role === 'buyer' && (
            <>
              <Link className="nav-link" to="/buyer">Buyer Portal</Link>
              <Link className="nav-link" to="/contracts">Contracts & Orders</Link>
            </>
          )}
          {user?.role === 'admin' && (
            <Link className="nav-link" to="/admin">Admin Dashboard</Link>
          )}
          {user ? (
            <button className="btn btn-outline-danger ms-3" onClick={handleLogout}>Logout</button>
          ) : (
            <Link className="nav-link" to="/login">Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
