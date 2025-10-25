import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { getFarmData } from '../services/apiService';

const FarmerDashboard = () => {
  const [farmData, setFarmData] = useState([]);
  const [newFarm, setNewFarm] = useState({ name: '', location: '', size: '', type: '' });
  const [newCrop, setNewCrop] = useState({ name: '', plantedDate: '', expectedYield: '', status: '' });
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ item: '', amount: '', date: '' });
  const [alerts] = useState(['Water maize crops today.', 'Check for pests on tomatoes.']);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFarmData();
      setFarmData(data);
    };
    fetchData();
  }, []);

  const handleAddFarm = (e) => {
    e.preventDefault();
    if (newFarm.name) {
      setFarmData([...farmData, { ...newFarm, id: farmData.length + 1, crops: [] }]);
      setNewFarm({ name: '', location: '', size: '', type: '' });
    }
  };

  const handleAddCrop = (e) => {
    e.preventDefault();
    if (newCrop.name && farmData.length > 0) {
      const updatedFarms = farmData.map(farm => ({
        ...farm,
        crops: [...farm.crops, { ...newCrop, id: farm.crops.length + 1 }]
      }));
      setFarmData(updatedFarms);
      setNewCrop({ name: '', plantedDate: '', expectedYield: '', status: '' });
    }
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (newExpense.item && newExpense.amount) {
      setExpenses([...expenses, { ...newExpense, id: expenses.length + 1 }]);
      setNewExpense({ item: '', amount: '', date: '' });
    }
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + parseFloat(exp.amount || 0), 0);
  const totalCrops = farmData.reduce((sum, farm) => sum + farm.crops.length, 0);

  return (
    <div>
      <h2>Farmer Portal</h2>
      
      {/* Farm Registration */}
      <Card title="Register New Farm" content="Add details about your farm.">
        <form onSubmit={handleAddFarm}>
          <input type="text" placeholder="Farm Name" value={newFarm.name} onChange={(e) => setNewFarm({ ...newFarm, name: e.target.value })} className="form-control mb-2" required />
          <input type="text" placeholder="Location" value={newFarm.location} onChange={(e) => setNewFarm({ ...newFarm, location: e.target.value })} className="form-control mb-2" />
          <input type="number" placeholder="Size (acres)" value={newFarm.size} onChange={(e) => setNewFarm({ ...newFarm, size: e.target.value })} className="form-control mb-2" />
          <input type="text" placeholder="Type (e.g., Crop, Livestock)" value={newFarm.type} onChange={(e) => setNewFarm({ ...newFarm, type: e.target.value })} className="form-control mb-2" />
          <button type="submit" className="btn btn-primary">Add Farm</button>
        </form>
      </Card>

      {/* Crop/Livestock Management */}
      <Card title="Add Crop/Livestock" content="Track your crops and livestock.">
        <form onSubmit={handleAddCrop}>
          <input type="text" placeholder="Name" value={newCrop.name} onChange={(e) => setNewCrop({ ...newCrop, name: e.target.value })} className="form-control mb-2" required />
          <input type="date" placeholder="Planted Date" value={newCrop.plantedDate} onChange={(e) => setNewCrop({ ...newCrop, plantedDate: e.target.value })} className="form-control mb-2" />
          <input type="number" placeholder="Expected Yield" value={newCrop.expectedYield} onChange={(e) => setNewCrop({ ...newCrop, expectedYield: e.target.value })} className="form-control mb-2" />
          <input type="text" placeholder="Status (e.g., Growing)" value={newCrop.status} onChange={(e) => setNewCrop({ ...newCrop, status: e.target.value })} className="form-control mb-2" />
          <button type="submit" className="btn btn-primary">Add Crop/Livestock</button>
        </form>
      </Card>

      {/* Expense Tracking */}
      <Card title="Record Expenses" content="Log costs for better financial tracking.">
        <form onSubmit={handleAddExpense}>
          <input type="text" placeholder="Item (e.g., Seeds)" value={newExpense.item} onChange={(e) => setNewExpense({ ...newExpense, item: e.target.value })} className="form-control mb-2" required />
          <input type="number" placeholder="Amount" value={newExpense.amount} onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })} className="form-control mb-2" required />
          <input type="date" placeholder="Date" value={newExpense.date} onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })} className="form-control mb-2" />
          <button type="submit" className="btn btn-primary">Add Expense</button>
        </form>
        <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
      </Card>

      {/* Analytics */}
      <Card title="Farm Analytics" content={`Total Farms: ${farmData.length}, Total Crops/Livestock: ${totalCrops}, Total Expenses: $${totalExpenses.toFixed(2)}.`}>
        {/* Add a simple chart or graph here later, e.g., using Chart.js */}
      </Card>

      {/* Alerts */}
      <Card title="Alerts & Reminders" content="Stay on top of your farm tasks.">
        <ul>
          {alerts.map((alert, index) => <li key={index}>{alert}</li>)}
        </ul>
      </Card>

      {/* Existing Farm Data */}
      {farmData.map((farm, index) => (
        <Card key={index} title={farm.name} content={`Location: ${farm.location}, Size: ${farm.size} acres, Type: ${farm.type}`}>
          <h5>Crops/Livestock:</h5>
          {farm.crops?.map(crop => (
            <p key={crop.id}>{crop.name} - Planted: {crop.plantedDate}, Yield: {crop.expectedYield}, Status: {crop.status}</p>
          ))}
        </Card>
      ))}
    </div>
  );
};

export default FarmerDashboard;

