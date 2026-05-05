import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const fetchAQI = async (pincode) => {
  const response = await axios.get(pincode === 'all' ? `${API_BASE_URL}/aqi/all` : `${API_BASE_URL}/aqi/${pincode}`);
  return response.data;
};

export const fetchPincode = async (pincode) => {
  const response = await axios.get(`${API_BASE_URL}/pincode/${pincode}`);
  return response.data;
};

export const fetchPredict = async (pincode) => {
  const response = await axios.get(`${API_BASE_URL}/predict/${pincode}`);
  return response.data;
};
export const getCityAQI = async (cityName) => {
  const response = await axios.get(`${API_BASE_URL}/city/${cityName}`);
  return response.data;
};
