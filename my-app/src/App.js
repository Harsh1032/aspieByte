import React, {useState, useEffect} from 'react';
import SignUp from './Components/Registration/SignUp';
import Home from './Components/Home/Home';
import Login from './Components/Registration/Login';
import Landingpage from './Components/Registration/Landingpage';
import ParentalLogin from './Components/Registration/ParentalLogin';
import GuardianSignUp from './Components/Registration/GuardianSignUp';
import CoursesDetail from './Components/CoursesDetail';
import Settings from './Components/Settings';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Subject from './Components/Course/Subject';
import SubjectDetails from './Components/Course/SubjectDetails';
import Content from './Components/Course/Content';
import Questionnaire1 from './Components/Questionnaire/Questionnaire1';
import Game1 from './Components/Games/Game1';
import Game2 from './Components/Games/Game2';
import Subject2 from './Components/Course/Subject2';
import Questionnaire2 from './Components/Questionnaire/Questionnaire2';
import StepTwo from './Components/Questionnaire/stepTwo';
import MyComponent from './Components/Questionnaire/MyComponent';


const App = () => {  
  // const [darkTheme, setDarkTheme] = useState (false); 
 
  const [fontSize, setFontSize] = useState(16);

  const [courseData, setCourseData] = useState([]);
  const [totalMinutes, setTotalMinutes] = useState([]);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [program, setProgram] = useState([]);
    
  useEffect(() => {
    fetch('http://localhost:8000/program')
        .then(response => {
            if (!response.ok) {
             throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setProgram(data);
        })
        .catch(error => {
            console.error('Error fetching program:', error);
        });
    }, []);

    console.log(program);

  // Example function to divide minutes into hours and minutes
  const divideMinutes = (totalMinutes) => {
    const hrs = totalMinutes.map(totalMinutes => Math.floor(totalMinutes / 60));
    const mins = totalMinutes.map(totalMinutes => totalMinutes % 60 );
    return { hrs, mins };
  
  };

  useEffect(() => {
      // Check if courseData is defined
      if (courseData) {
          // Map over courseData and extract course durations
          const courseDurations = courseData.map(data => data.courseDuration);
  
          // Set the state with the array of course durations
          setTotalMinutes(courseDurations);
      }
  }, [courseData]);


  useEffect(() => {
    const { hrs, mins } = divideMinutes(totalMinutes);
    setHours(hrs);
    setMinutes(mins);
  }, [totalMinutes]);

  useEffect(() => {
  fetch('http://localhost:8000/courses')
      .then(response => {
          if (!response.ok) {
           throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          setCourseData(data);
      })
      .catch(error => {
          console.error('Error fetching MCQ data:', error);
      });
  }, []);

  return (
    <div style={{ fontSize: `${fontSize}px` }}>
    <Routes>
      <Route path = '/signUp' element={<SignUp/>}></Route>
      <Route path = '/login' element={<Login/>}></Route>
      <Route path = '/' element={<Landingpage/>}></Route>
      <Route path = '/parentalLogin' element = {<ParentalLogin/>}></Route>
      <Route path = '/guardianSignUp' element = {<GuardianSignUp/>}></Route>
      <Route path = '/home' element = {<Home courseData = {courseData}/>}></Route>
      <Route path = '/coursesDetail' element = {<CoursesDetail courseData = {courseData} hours={hours}/>}></Route>
      <Route path = '/settings' element = {<Settings fontSize={fontSize} setFontSize={setFontSize}/>}></Route>
      <Route path = '/subject' element = {<Subject courseData = {courseData} hours={hours}/>}></Route>
      <Route path = '/subject2' element = {<Subject2 courseData = {courseData} hours={hours}/>}></Route>
      <Route path = '/subjectDetails/:courseID' element = {<SubjectDetails />}></Route>
      <Route path = '/content/:contentID' element = {<Content/>}></Route>
      <Route path = '/questionnaire1' element = {<Questionnaire1/>}></Route>
      <Route path = '/questionnaire2' element = {<Questionnaire2/>}></Route>
      <Route path = '/stepTwo' element = {<StepTwo/>}></Route>
      <Route path = '/mycomponent' element = {<MyComponent/>}></Route>
      <Route path = '/game1' element = {<Game1/>}></Route>
      <Route path = '/game2' element = {<Game2/>}></Route>
    </Routes>
    </div>
  )
}

export default App;