import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';  // Replace with your backend URL

export const getFarmData = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/farms`);
    return response.data;
  } catch (error) {
    console.error('Error fetching farm data:', error);
    return [];
  }
};

// Add more functions like postContract, getMarketplaceListings, etc.
