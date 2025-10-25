import React, { useState } from 'react';
import Card from '../components/Card';

const FinancingInsurance = () => {
  const [applications, setApplications] = useState([]);
  const [newApplication, setNewApplication] = useState({ type: 'loan', amount: '', reason: '' });

  const handleApply = (e) => {
    e.preventDefault();
    if (newApplication.amount) {
      setApplications([...applications, { ...newApplication, id: applications.length + 1, status: 'Pending' }]);
      alert('Application submitted!');
      setNewApplication({ type: 'loan', amount: '', reason: '' });
    }
  };

  return (
    <div>
      <h2>Financing & Insurance</h2>
      <Card title="Apply for Services" content="Apply for microloans or insurance based on your farm performance. Eligibility: Verified farmers with good records.">
        <form onSubmit={handleApply}>
          <select value={newApplication.type} onChange={(e) => setNewApplication({ ...newApplication, type: e.target.value })} className="form-control mb-2">
            <option value="loan">Microloan</option>
            <option value="insurance">Crop Insurance</option>
          </select>
          <input type="number" placeholder="Amount Requested" value={newApplication.amount} onChange={(e) => setNewApplication({ ...newApplication, amount: e.target.value })} className="form-control mb-2" required />
          <textarea placeholder="Reason/Description" value={newApplication.reason} onChange={(e) => setNewApplication({ ...newApplication, reason: e.target.value })} className="form-control mb-2" />
          <button type="submit" className="btn btn-primary">Submit Application</button>
        </form>
      </Card>
      {applications.map(app => (
        <Card key={app.id} title={`${app.type} Application`} content={`Amount: $${app.amount}, Reason: ${app.reason}, Status: ${app.status}`} />
      ))}
    </div>
  );
};

export default FinancingInsurance;
