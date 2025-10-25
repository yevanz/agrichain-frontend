import React, { useState } from 'react';
import Card from '../components/Card';

const Marketplace = () => {
  const [listings, setListings] = useState([
    { id: 1, crop: 'Maize', price: 50, quantity: 100, farmer: 'John Doe', region: 'Nairobi' },
    { id: 2, crop: 'Tomatoes', price: 30, quantity: 200, farmer: 'Jane Smith', region: 'Nakuru' }
  ]);
  const [filter, setFilter] = useState('');
  const [newListing, setNewListing] = useState({ crop: '', price: '', quantity: '', region: '' });

  const filteredListings = listings.filter(item => item.crop.toLowerCase().includes(filter.toLowerCase()));

  const handleAddListing = (e) => {
    e.preventDefault();
    if (newListing.crop && newListing.price) {
      setListings([...listings, { ...newListing, id: listings.length + 1, farmer: 'Current User' }]);
      setNewListing({ crop: '', price: '', quantity: '', region: '' });
    }
  };

  return (
    <div>
      <h2>Marketplace</h2>
      <input type="text" placeholder="Filter by crop" value={filter} onChange={(e) => setFilter(e.target.value)} className="form-control mb-3" />
      <Card title="Add New Listing" content="List your produce for sale.">
        <form onSubmit={handleAddListing}>
          <input type="text" placeholder="Crop" value={newListing.crop} onChange={(e) => setNewListing({ ...newListing, crop: e.target.value })} className="form-control mb-2" required />
          <input type="number" placeholder="Price per unit" value={newListing.price} onChange={(e) => setNewListing({ ...newListing, price: e.target.value })} className="form-control mb-2" required />
          <input type="number" placeholder="Quantity" value={newListing.quantity} onChange={(e) => setNewListing({ ...newListing, quantity: e.target.value })} className="form-control mb-2" />
          <input type="text" placeholder="Region" value={newListing.region} onChange={(e) => setNewListing({ ...newListing, region: e.target.value })} className="form-control mb-2" />
          <button type="submit" className="btn btn-primary">Add Listing</button>
        </form>
      </Card>
      {filteredListings.map(item => (
        <Card key={item.id} title={`${item.crop} - ${item.farmer}`} content={`Price: $${item.price}, Quantity: ${item.quantity}, Region: ${item.region}`}>
          <button className="btn btn-success">Buy Now</button>
        </Card>
      ))}
    </div>
  );
};

export default Marketplace;
