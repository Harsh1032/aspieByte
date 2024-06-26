import React, { useState, useEffect, useContext } from 'react';
import { useNavigate,useLocation } from 'react-router-dom'; // Import useNavigate instead of useHistory
import ThemeContext from '../../ThemeContext';

const Questionnaire = () => {
  
  const {selectedTheme} = useContext(ThemeContext);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [responses, setResponses] = useState({1: [], 2: [], 3: [], 4: [], 5: [], 6: []});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // Extract userID from the location state
  const { userID } = location.state || {};

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await fetch('http://localhost:8000/levelone');
      const data = await response.json();
      setQuestions(data);
      setCurrentQuestion(data[0]);
    };

    fetchQuestions();
  }, []);

  const calculateMeanValues = (responses) => {
    let meanValues = [];

    for (const symptomType in responses) {
      const values = responses[symptomType];
      const sum = values.reduce((a, b) => a + b, 0);
      const mean = values.length > 0 ? sum / values.length : 0;
      meanValues.push({ symptomType: parseInt(symptomType), mean });
    }

    meanValues.sort((a, b) => b.mean - a.mean);
    return meanValues.slice(0, 3);
  };

  const handleOptionChange = (event) => {
    const value = parseInt(event.target.value);
    const updatedResponses = { ...responses };
    updatedResponses[currentQuestion.symptomType].push(value);
    setResponses(updatedResponses);
  };

  const handleNextQuestion = () => {
    const nextIndex = questionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestion(questions[nextIndex]);
      setQuestionIndex(nextIndex);
    } else {
      const topThreeMeans = calculateMeanValues(responses);
      navigate('/stepTwo', {
        state: { topSymptomTypes: topThreeMeans.map(item => item.symptomType) , userID }
      });
    }
  };

  return (
    <div className='w-full h-screen pt-[110px]' style = {{background: selectedTheme.colors.tertiary}}>
      {currentQuestion && (
        <div className='h-[400px] w-[600px] flex flex-col m-auto rounded-lg py-2 pl-9' style={{background: selectedTheme.colors.primary}}>
          <p className='text-lg font-semibold mt-5'>{currentQuestion.lvlOneQuestion}</p>
          <form className='flex flex-col mt-2'>
            {[0, 1, 2, 3, 4].map(option => (
              <label key={option} className="mb-2">
                <input
                  type="radio"
                  name="response"
                  value={option}
                  onChange={handleOptionChange}
                  className="mr-2"
                />
                {option}
              </label>
            ))}
          </form>
          <button className='h-[50px] w-[150px] rounded-xl ml-[180px] text-xl font-semibold p-2 hover:shadow-2xl hover:animate-bounce mt-2' style = {{background: selectedTheme.colors.seventh, color: selectedTheme.colors.ninth}} onClick={handleNextQuestion}>Next</button>
        </div>
      )}
    </div> 
  );
};

export default Questionnaire;
