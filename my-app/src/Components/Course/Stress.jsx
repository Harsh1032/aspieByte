//Watch data trasfer
import React, { useEffect, useState } from 'react';
import MyStress from './MyStress';

function Stress() {
  const [sensorData, setSensorData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://192.168.120.48/data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setSensorData(data);
      } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 50000); // Fetch every 5 seconds
    return () => clearInterval(interval);
  }, []);

  // Pass sensorData to MyStress for prediction
  return sensorData ? <MyStress sensorData={sensorData} /> : null;
}

export default Stress;
