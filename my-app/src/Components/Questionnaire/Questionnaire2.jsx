import React, { useState, useEffect, useContext } from 'react';
import ThemeContext from '../../ThemeContext';

const Questionnaire2 = ({top3Values}) => {

  
  const {selectedTheme} = useContext(ThemeContext);
  //inattention states
    const [inattentionData, setInattentionData] = useState([]);
    const [currentInattentionQuestionIndex, setCurrentInattentionQuestionIndex] = useState(0);
    const [inattentionSelectedOptions, setInattentionSelectedOptions] = useState([]);
  //depression states
    const [depressionData, setDepressionData] = useState([]);
    const [currentDepressionQuestionIndex, setCurrentDepressionQuestionIndex] = useState(0);
    const [depressionSelectedOptions, setDepressionSelectedOptions] = useState([]);

  //anger states
    const [angerData, setAngerData] = useState([]);
    const [currentAngerQuestionIndex, setCurrentAngerQuestionIndex] = useState(0);
    const [angerSelectedOptions, setAngerSelectedOptions] = useState([]);

  //irritability states
    const [irritabilityData, setIrritabilityData] = useState([]);
    const [currentIrritabilityQuestionIndex, setCurrentIrritabilityQuestionIndex] = useState(0);
    const [irritabilitySelectedOptions, setIrritabilitySelectedOptions] = useState([]);

  //mania states
    const [maniaData, setManiaData] = useState([]);
    const [currentManiaQuestionIndex, setCurrentManiaQuestionIndex] = useState(0);
    const [maniaSelectedOptions, setManiaSelectedOptions] = useState([]);
  //anxiety states
    const [anxietyData, setAnxietyData] = useState([]);
    const [currentAnxietyQuestionIndex, setCurrentAnxietyQuestionIndex] = useState(0);
    const [anxietySelectedOptions, setAnxietySelectedOptions] = useState([]);

    //inattention data 
    useEffect(() => {
        fetch('http://localhost:8000/inattention')
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
          setInattentionData(data);
          setCurrentInattentionQuestionIndex(0);
          // Initialize selectedOptions array with null values for each question
          const initialSelectedOptions = new Array(data.length).fill({ option: null});
          setInattentionSelectedOptions(initialSelectedOptions);
          })
          .catch(error => {
            console.error('Error fetching MCQ data:', error);
          });
      }, []);

      //depression data
      useEffect(() => {
        fetch('http://localhost:8000/depression')
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            setDepressionData(data);
            setCurrentDepressionQuestionIndex(0);
          // Initialize selectedOptions array with null values for each question
          const initialSelectedOptions = new Array(data.length).fill({ option: null});
          setDepressionSelectedOptions(initialSelectedOptions);
          })
          .catch(error => {
            console.error('Error fetching MCQ data:', error);
          });
      }, []);

    //anger data
      useEffect(() => {
        fetch('http://localhost:8000/anger')
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            setAngerData(data);
            setCurrentAngerQuestionIndex(0);
          // Initialize selectedOptions array with null values for each question
          const initialSelectedOptions = new Array(data.length).fill({ option: null});
          setAngerSelectedOptions(initialSelectedOptions);
          })
          .catch(error => {
            console.error('Error fetching MCQ data:', error);
          });
      }, []);

    //irritability data
      useEffect(() => {
        fetch('http://localhost:8000/irritability')
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            setIrritabilityData(data);
            setCurrentIrritabilityQuestionIndex(0);
          // Initialize selectedOptions array with null values for each question
          const initialSelectedOptions = new Array(data.length).fill({ option: null});
          setIrritabilitySelectedOptions(initialSelectedOptions);
          })
          .catch(error => {
            console.error('Error fetching MCQ data:', error);
          });
      }, []);

    //mania data
      useEffect(() => {
        fetch('http://localhost:8000/mania')
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            setManiaData(data);
            setCurrentManiaQuestionIndex(0);
          // Initialize selectedOptions array with null values for each question
          const initialSelectedOptions = new Array(data.length).fill({ option: null});
          setManiaSelectedOptions(initialSelectedOptions);
          })
          .catch(error => {
            console.error('Error fetching MCQ data:', error);
          });
      }, []);

    //anxiety data
    useEffect(() => {
      fetch('http://localhost:8000/anxiety')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setAnxietyData(data);
          setCurrentAnxietyQuestionIndex(0);
        // Initialize selectedOptions array with null values for each question
        const initialSelectedOptions = new Array(data.length).fill({ option: null});
        setAnxietySelectedOptions(initialSelectedOptions);
        })
        .catch(error => {
          console.error('Error fetching MCQ data:', error);
        });
    }, []);     

  return (
    <div className='w-full h-screen pt-[110px]' style = {{background: selectedTheme.colors.tertiary}}>
      {top3Values?.length > 0 && (
        <div className='h-[400px] w-[600px] flex flex-col m-auto rounded-lg py-2 pl-9' style={{background: selectedTheme.colors.primary}}>
                <ul>
        {top3Values.map((value, index) => (
          <li key={index}>{`Symptom Type: ${value.symptomType}, Mean Value: ${value.meanValue}`}</li>
        ))}
      </ul>  
      </div>
      )} 
    </div>
  )
}

export default Questionnaire2