// src/components/TollCalculator.js
import React, { useState } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Polyline } from 'react-leaflet';

const TollCalculator = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [polyline, setPolyline] = useState(null);
  const [tollData, setTollData] = useState(null);

  const calculateToll = async () => {
    try {
      const response = await axios.get(
        `https://dev.tollguru.com/v1/calc/here/${origin}/${destination}?vehicleType=2AxlesTaxi&departure_time=1609507347&key=PLdHjgfb9Gfqd9hpML8DrJ272Hrm8Lp6`
      );

      const routeCoordinates = response.data.trip.route.coordinates;
      setPolyline(routeCoordinates);
      setTollData(response.data);
    } catch (error) {
      console.error('Error fetching toll data:', error);
    }
  };

  return (
    <div>
      <h1>Toll Calculator</h1>
      <label>
        Origin:
        <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} />
      </label>
      <br />
      <label>
        Destination:
        <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} />
      </label>
      <br />
      <button onClick={calculateToll}>Calculate Toll</button>

      {polyline && tollData && (
        <div>
          <h2>Route</h2>
          <p>Total Toll Cost: {tollData.summary.totalCost.amount} {tollData.summary.totalCost.currency}</p>
          <MapContainer center={polyline[0]} zoom={10} style={{ height: '400px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Polyline positions={polyline} color="blue" />
          </MapContainer>
        </div>
      )}
    </div>
  );
};

export default TollCalculator;
