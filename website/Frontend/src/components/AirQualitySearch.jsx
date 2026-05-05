import React, { useState, useEffect } from 'react';
import { fetchCityByPincode, fetchAQICity } from '../services/api.js';

const AirQualitySearch = ({ onCitySelect }) => {
  const [pincode, setPincode] = useState('');
  const [cityData, setCityData] = useState(null);
  const [aqiData, setAqiData] = useState(null);

  useEffect(() => {
    if (pincode.length === 6) {
      fetchCityByPincode(pincode).then(data => setCityData(data));
      fetchAQICity(pincode).then(data => setAqiData(data));
    }
  }, [pincode]);

  const handleSearch = () => {
    onCitySelect(cityData?.city);
  };

  return (
    <div className="p-4">
      <input
        type="number"
        placeholder="Enter Pincode"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
        className="border p-2 rounded"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded ml-2">
        Search
      </button>
      {cityData && <p>City: {cityData.city}</p>}
      {aqiData && <p>PM2.5: {aqiData.pm25} µg/m³</p>}
    </div>
  );
};

export default AirQualitySearch;