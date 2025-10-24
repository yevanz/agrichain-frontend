import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import { getFarmData } from '../services/apiService';

const FarmerDashboard = () => {
  const [farmData, setFarmData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFarmData();
      setFarmData(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Farmer Portal</h2>
      <Card title="Farm Management" content="Register farms, manage crops/livestock, record expenses, track growth, and view analytics." />
      {farmData.map((item, index) => (
        <Card key={index} title={item.crop} content={`Yield: ${item.yield}, Expenses: ${item.expenses}`} />
      ))}
    </div>
  );
};

export default FarmerDashboard;
