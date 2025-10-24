import React from 'react';
import Card from '../components/Card';

const AdminDashboard = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <Card title="User Management" content="Manage users, verify farmers, monitor transactions, and generate reports." />
      {/* Add admin-specific features */}
    </div>
  );
};

export default AdminDashboard;
