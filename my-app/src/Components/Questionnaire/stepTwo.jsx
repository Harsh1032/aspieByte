import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import MyComponent from './MyComponent';  // Adjust the import path as needed.
import ThemeContext from '../../ThemeContext';

const DetailedQuestionnaire = () => {
  
  const {selectedTheme} = useContext(ThemeContext);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState({
    1: { sum: 0, count: 0 },
    2: 0,
    3: 0,
    4: { sum: 0, count: 0 },
    5: 0,
    6: 0
  });
  const [finalScores, setFinalScores] = useState(null);

  const location = useLocation();
  const { topSymptomTypes, userID } = location.state || {};  // Destructure userID from location.state
  const [currentSymptomType, setCurrentSymptomType] = useState(0);

  useEffect(() => {
    if (topSymptomTypes.length > 0) {
      const firstSymptomType = topSymptomTypes[0];
      setCurrentSymptomType(firstSymptomType);
      fetchQuestions(firstSymptomType);
    }
  }, [topSymptomTypes]);

  const fetchQuestions = async (symptomType) => {
    const endpoints = {
      1: 'http://localhost:8000/inattention',
      2: 'http://localhost:8000/depression',
      3: 'http://localhost:8000/anger',
      4: 'http://localhost:8000/irritability',
      5: 'http://localhost:8000/mania',
      6: 'http://localhost:8000/anxiety'
    };

    try {
      const response = await fetch(endpoints[symptomType]);
      const data = await response.json();
      setCurrentQuestions(data);
      setCurrentQuestionIndex(0);
    } catch (error) {
      console.error('Failed to fetch questions:', error);
    }
  };

  const handleOptionChange = (event) => {
    const value = parseInt(event.target.value);
    const updatedScores = { ...scores };

    if (currentSymptomType === 1 || currentSymptomType === 4) {
      updatedScores[currentSymptomType].sum += value;
      updatedScores[currentSymptomType].count += 1;
    } else {
      updatedScores[currentSymptomType] = updatedScores[currentSymptomType] + value;
    }

    setScores(updatedScores);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      const nextSymptomTypeIndex = topSymptomTypes.indexOf(currentSymptomType) + 1;
      if (nextSymptomTypeIndex < topSymptomTypes.length) {
        setCurrentSymptomType(topSymptomTypes[nextSymptomTypeIndex]);
        fetchQuestions(topSymptomTypes[nextSymptomTypeIndex]);
      } else {
        setFinalScores(calculateFinalScores(scores));
      }
    }
  };

  const calculateFinalScores = (scores) => {
    let finalScoresCalculation = {};
    for (const symptomType in scores) {
      const type = parseInt(symptomType);
      if (type === 1 || type === 4) {
        finalScoresCalculation[type] = scores[type].count > 0 ? parseFloat((scores[type].sum / scores[type].count).toFixed(2)) : 0;
      } else {
        finalScoresCalculation[type] = scores[type];
      }
    }
    return finalScoresCalculation;
  };

  return (
    <div className='w-full h-screen pt-[110px]' style = {{background: selectedTheme.colors.tertiary}}>
      {finalScores ? (
        <MyComponent finalScores={finalScores} userID={userID} />
      ) : currentQuestions.length > 0 && (
        <div  className='h-[400px] w-[600px] flex flex-col m-auto rounded-lg py-2 pl-9' style={{background: selectedTheme.colors.primary}}>
          <p className='font-bold text-2xl'>{currentQuestions[currentQuestionIndex].question}</p>
          <form className='flex flex-col mt-5'>
            {[0, 1, 2, 3, 4].map((option, index) => (
              <label key={index} className="mb-2">
                <input
                  type="radio"
                  name="response"
                  value={option}
                  onChange={handleOptionChange}
                  className="mr-2"
                /> {option}
              </label>
            ))}
          </form>
          <button className='h-[50px] w-[150px] rounded-xl ml-[180px] text-xl font-semibold p-2 hover:shadow-2xl hover:animate-bounce mt-2' style = {{background: selectedTheme.colors.seventh, color: selectedTheme.colors.ninth}} onClick={handleNextQuestion}>Next</button>
        </div>
      )}
    </div>
  );
};

export default DetailedQuestionnaire;
