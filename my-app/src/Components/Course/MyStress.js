import React, { useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import { Link } from 'react-router-dom';

function MyStress({ sensorData }) {
  const [prediction, setPrediction] = useState(null);

  useEffect(() => {
    const makePrediction = async () => {
      if (sensorData && sensorData.humidity && sensorData.temperature && sensorData.steps) {
        const userData = [parseFloat(sensorData.humidity), parseFloat(sensorData.temperature), parseFloat(sensorData.steps)];
        const model = await tf.loadLayersModel('/stress_model/model.json');
        
        const inputTensor = tf.tensor2d([userData]);
        const predictionTensor = model.predict(inputTensor);
        
        const predictedClassIndex = predictionTensor.argMax(-1).dataSync()[0];
        setPrediction(predictedClassIndex);
      }
    };

    makePrediction();
  }, [sensorData]);
  // console.log(predictions);
  return prediction === 2 ? (
    <Link to="/game2"><p className='font-normal text-base'>feeling stressed?</p></Link>
  ) : null;
}

export default MyStress;
