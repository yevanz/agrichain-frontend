import React, { useState } from 'react';
import Card from '../components/Card';

const ContractsOrders = () => {
  const [contracts, setContracts] = useState([
    { id: 1, buyer: 'Buyer A', crop: 'Maize', quantity: 50, status: 'Pending', payment: 2500 }
  ]);
  const [newContract, setNewContract] = useState({ buyer: '', crop: '', quantity: '', payment: '' });

  const handleAddContract = (e) => {
    e.preventDefault();
    if (newContract.buyer && newContract.crop) {
      setContracts([...contracts, { ...newContract, id: contracts.length + 1, status: 'Pending' }]);
      setNewContract({ buyer: '', crop: '', quantity: '', payment: '' });
    }
  };

  const updateStatus = (id, newStatus) => {
    setContracts(contracts.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  return (
    <div>
      <h2>Contracts & Orders</h2>
      <Card title="Create New Contract" content="Request or create a contract for produce.">
        <form onSubmit={handleAddContract}>
          <input type="text" placeholder="Buyer Name" value={newContract.buyer} onChange={(e) => setNewContract({ ...newContract, buyer: e.target.value })} className="form-control mb-2" required />
          <input type="text" placeholder="Crop" value={newContract.crop} onChange={(e) => setNewContract({ ...newContract, crop: e.target.value })} className="form-control mb-2" required />
          <input type="number" placeholder="Quantity" value={newContract.quantity} onChange={(e) => setNewContract({ ...newContract, quantity: e.target.value })} className="form-control mb-2" />
          <input type="number" placeholder="Payment Amount" value={newContract.payment} onChange={(e) => setNewContract({ ...newContract, payment: e.target.value })} className="form-control mb-2" />
          <button type="submit" className="btn btn-primary">Create Contract</button>
        </form>
      </Card>
      {contracts.map(contract => (
        <Card key={contract.id} title={`Contract with ${contract.buyer}`} content={`Crop: ${contract.crop}, Quantity: ${contract.quantity}, Payment: $${contract.payment}, Status: ${contract.status}`}>
          {contract.status === 'Pending' && <button className="btn btn-warning me-2" onClick={() => updateStatus(contract.id, 'Approved')}>Approve</button>}
          {contract.status === 'Approved' && <button className="btn btn-info" onClick={() => updateStatus(contract.id, 'Delivered')}>Mark Delivered</button>}
          <button className="btn btn-secondary">View Payment</button>
        </Card>
      ))}
    </div>
  );
};

export default ContractsOrders;
