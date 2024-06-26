import { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { useNavigate } from 'react-router-dom';  // Import useNavigate

function MyComponent({ finalScores, userID }) {
  const [prediction, setPrediction] = useState(null);
  const navigate = useNavigate();  // Initialize useNavigate

  useEffect(() => {
    if (finalScores) {
      makePrediction();
    }
  }, [finalScores]); // Effect triggers on finalScores update

  const loadModel = async () => {
    const model = await tf.loadLayersModel('/tfjs_model/model.json');
    return model;
  };

  const makePrediction = async () => {
    const userData = Object.keys(finalScores).sort().map(key => finalScores[key]);
    const model = await loadModel();
  
    const inputTensor = tf.tensor2d([userData]);
    const predictionTensor = model.predict(inputTensor);
    const predictedClassIndex = predictionTensor.argMax(-1).dataSync()[0];
    
    setPrediction(predictedClassIndex);
    savePrediction(predictedClassIndex);
  };

  const savePrediction = async (behaviorType) => {
    try {
      const response = await fetch('http://localhost:8000/saveBehavior', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userID: userID, behaviorType }),
      });

      if (!response.ok) {
        throw new Error('Error in sending prediction to backend');
      }

      await response.json();
      navigate('/home', { state: { userID: userID } }); // Redirect to Dashboard after saving prediction
    } catch (error) {
      console.error('Failed to save prediction:', error);
    }
  };

  // Remove prediction display since we're redirecting instead
  return null;
}

export default MyComponent;
