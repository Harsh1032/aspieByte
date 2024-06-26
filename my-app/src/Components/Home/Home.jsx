import React, {useContext} from 'react';
import { useLocation } from 'react-router-dom';  // Import useLocation
import Dashboard from './Dashboard';
import Progress from './Progress';
import Courses from './Courses';
import Footer from './Footer';
import Schedule from './Schedule';
import UpcomingEvent from './UpcomingEvent';
import ThemeContext from '../../ThemeContext';

const Home = ({courseData}) => {
  const { selectedTheme } = useContext(ThemeContext);
  const location = useLocation();
  
  // Access userID from the location state
  const { userID } = location.state || {};
  console.log('Received userID:', userID);
  return (
    <div className='h-screen w-full'>
      <div className='w-full h-[64px]' style = {{background: selectedTheme.colors.fifth}}><Dashboard/></div>
      <div className='flex w-full overflow-y-scroll no-scrollbar'>
        <div className='w-[70%]' style = {{background: selectedTheme.colors.sixth}}>
          <div className='w-full] h-[355px] '>
            <Progress/>
          </div>
          <div className='w-full h-[550px] overflow-y-hidden'>
            <Courses courseData = {courseData} userID={userID}/>
          </div>
        </div>
        <div className='w-[30%] h-[905px] overflow-y-scroll no-scrollbar py-4' style = {{background: selectedTheme.colors.primary}}>
          <Schedule/>
          <UpcomingEvent/>
        </div>
      </div>
      <div className='w-full h-[64px] ' style = {{background: selectedTheme.colors.fifth}}><Footer/></div>
    </div>
  )
}

export default Home