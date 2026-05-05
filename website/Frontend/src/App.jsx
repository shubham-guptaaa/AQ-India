import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/navbar.jsx';
import Dashboard from './pages/Dashboard.jsx';
import CityDetail from './pages/CityDetail.jsx';
import Map from './components/Map.jsx';
import { fetchPincode, fetchAQI } from './services/api.js';

function App() {
  const [pincode, setPincode] = useState('');
  const [pincodeData, setPincodeData] = useState(null);
  const [aqiData, setAqiData] = useState(null);

  useEffect(() => {
    if (pincode.length === 6) {
      fetchPincode(pincode).then(data => setPincodeData(data)).catch(err => console.error('Pincode fetch error:', err));
      fetchAQI(pincode).then(data => setAqiData(data)).catch(err => console.error('AQI fetch error:', err));
    }
  }, [pincode]);

  const handleSearch = () => {
    // Navigate or update state
  };

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="container mx-auto p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg mb-4">
            <h2 className="text-2xl text-blue-800 mb-4">Search Air Quality</h2>
            <input
              type="number"
              placeholder="Enter 6-digit Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="border p-2 rounded w-full mb-2"
            />
            {pincodeData && (
              <p>Post Office: {pincodeData.PostOffice}, State: {pincodeData.State}</p>
            )}
            <button
              onClick={handleSearch}
              className="bg-green-500 text-white p-2 rounded hover:bg-green-600 w-full"
            >
              Search
            </button>
            {aqiData && (
              <div className="mt-4">
                <h3 className="text-lg">Station Data</h3>
                <table className="w-full border-collapse">
                  <tbody>
                    {Object.entries(aqiData).map(([key, value]) => (
                      <tr key={key} className="border-b">
                        <td className="p-2">{key}</td>
                        <td className="p-2">{value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/city/:pincode" element={<CityDetail />} />
          </Routes>
          <Map />
        </div>
      </div>
    </Router>
  );
}

export default App;