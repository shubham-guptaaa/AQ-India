import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { fetchAQI } from '../services/api.js';

const Map = () => {
  useEffect(() => {
    const map = L.map('map').setView([20.5937, 78.9629], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

    fetchAQI('all').then(data => {
      const clusters = {};
      data.forEach(d => {
        const aqi = (d.PM2_5 + d.PM10) / 2 || 0;
        const color = aqi < 50 ? 'green' : aqi < 100 ? 'yellow' : aqi < 200 ? 'orange' : 'red';
        const clusterKey = `${Math.round(d.Latitude)},${Math.round(d.Longitude)}`;
        clusters[clusterKey] = clusters[clusterKey] || { count: 0, color, pincode: d.Pincode, station: d.Station, state: d.State };
        clusters[clusterKey].count += 1;
      });

      Object.entries(clusters).forEach(([key, { count, color, pincode, station, state }]) => {
        const [lat, lon] = key.split(',').map(Number);
        L.circleMarker([lat, lon], {
          radius: count * 2,
          color,
          fillColor: color,
          fillOpacity: 0.7,
        }).bindPopup(`Cluster: ${count} stations<br>Pincode: ${pincode}<br>Station: ${station}<br>State: ${state}`).addTo(map);
      });

      data.forEach(d => {
        L.marker([d.Latitude, d.Longitude]).bindPopup(
          `<b>Pincode:</b> ${d.Pincode}<br><b>Station:</b> ${d.Station}<br><b>State:</b> ${d.State}<br><table><tr><td>PM2.5</td><td>${d.PM2_5 || 0}</td></tr><tr><td>PM10</td><td>${d.PM10 || 0}</td></tr><tr><td>NO2</td><td>${d.NO2 || 0}</td></tr><tr><td>Ozone</td><td>${d.Ozone || 0}</td></tr></table>`
        ).addTo(map);
      });
    }).catch(err => console.error('Map fetch error:', err));

    return () => map.remove();
  }, []);

  return <div id="map" style={{ height: '500px', width: '100%' }} />;
};

export default Map;
