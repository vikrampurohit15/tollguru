import React, { useState } from 'react';
import axios from 'axios';

const TollCalculator = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [tollData, setTollData] = useState(null);

  const calculateToll = async () => {
    try {
      const response = await axios.get(
        `https://dev.tollguru.com/v1/calc/here/${origin}/${destination}?vehicleType=2AxlesAuto&departure_time=2023-03-01T12%3A00%3A00&key=PLdHjgfb9Gfqd9hpML8DrJ272Hrm8Lp6`
      );

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

      {tollData && (
        <div>
          <h2>Toll Details</h2>
          <pre>{JSON.stringify(tollData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default TollCalculator;
