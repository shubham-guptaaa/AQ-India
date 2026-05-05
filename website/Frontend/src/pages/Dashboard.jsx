import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { fetchAQI, fetchPredict } from '../services/api.js';

const Dashboard = () => {
  const [chartData, setChartData] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [reduction, setReduction] = useState(0);

  useEffect(() => {
    fetchAQI('all').then(data => {
      const monthly = {};
      data.forEach(d => {
        const key = `${d.Year}-${d.Month}`;
        monthly[key] = monthly[key] || { PM2_5: 0, count: 0 };
        monthly[key].PM2_5 += (d.PM2_5 || 0);
        monthly[key].count += 1;
      });
      const labels = Object.keys(monthly);
      const pm25Data = labels.map(k => monthly[k].PM2_5 / monthly[k].count || 0);

      setChartData({
        labels,
        datasets: [{
          label: 'Monthly PM2.5 Avg',
          data: pm25Data,
          borderColor: '#FF9933',
          backgroundColor: 'rgba(255, 153, 51, 0.2)',
          fill: true,
        }],
      });
    }).catch(err => console.error('Fetch error:', err));

    fetchPredict(110001).then(pred => setPrediction(pred)).catch(err => console.error('Prediction error:', err));
  }, []);

  const handleReduction = () => {
    if (prediction) {
      const reducedPM25 = prediction.PM2_5 * (1 - reduction / 100);
      console.log(`Simulated PM2.5 with ${reduction}% reduction: ${reducedPM25}`);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl text-blue-800">Dashboard</h2>
      {chartData && <Line data={chartData} />}
      {prediction && (
        <div className="mt-4">
          <h3>Prediction</h3>
          <p>PM2.5: {prediction.PM2_5}, PM10: {prediction.PM10}</p>
        </div>
      )}
      <div className="mt-4">
        <h3>Policy Simulation</h3>
        <input
          type="range"
          min="0"
          max="50"
          value={reduction}
          onChange={(e) => setReduction(e.target.value)}
          className="w-full"
        />
        <button onClick={handleReduction} className="bg-green-500 text-white p-2 rounded">
          Simulate Reduction
        </button>
      </div>
    </div>
  );
};

export default Dashboard;