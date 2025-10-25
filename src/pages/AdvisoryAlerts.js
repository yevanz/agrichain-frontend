import React, { useState } from 'react';
import Card from '../components/Card';

const AdvisoryAlerts = () => {
  const [alerts, setAlerts] = useState([
    { id: 1, type: 'Weather', message: 'Heavy rain expected in Nairobi tomorrow.', acknowledged: false },
    { id: 2, type: 'Pest', message: 'Tomato blight outbreak in Nakuru region.', acknowledged: false }
  ]);
  const [tips] = useState(['Use organic fertilizers for better yields.', 'Monitor soil moisture regularly.']);
  const [newRequest, setNewRequest] = useState('');

  const acknowledgeAlert = (id) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, acknowledged: true } : a));
  };

  const handleRequest = (e) => {
    e.preventDefault();
    if (newRequest) {
      alert(`Advice request submitted: ${newRequest}`);
      setNewRequest('');
    }
  };

  return (
    <div>
      <h2>Advisory & Alerts</h2>
      <Card title="Request Expert Advice" content="Ask for personalized farming tips.">
        <form onSubmit={handleRequest}>
          <textarea placeholder="Describe your query" value={newRequest} onChange={(e) => setNewRequest(e.target.value)} className="form-control mb-2" required />
          <button type="submit" className="btn btn-primary">Submit Request</button>
        </form>
      </Card>
      <h3>Alerts</h3>
      {alerts.map(alert => (
        <Card key={alert.id} title={`${alert.type} Alert`} content={alert.message}>
          {!alert.acknowledged && <button className="btn btn-danger" onClick={() => acknowledgeAlert(alert.id)}>Acknowledge</button>}
          {alert.acknowledged && <span className="text-success">Acknowledged</span>}
        </Card>
      ))}
      <h3>Farming Tips</h3>
      {tips.map((tip, index) => <Card key={index} title={`Tip ${index + 1}`} content={tip} />)}
    </div>
  );
};

export default AdvisoryAlerts;
