import React, {useContext, useState, useEffect} from 'react';
import Schedule from './Home/Schedule';
import UpcomingEvent from './Home/UpcomingEvent';
import { CiSearch } from "react-icons/ci";
import Dashboard from './Home/Dashboard';
import Footer from './Home/Footer';
import AI from './assets/AI.png';
import BigData from './assets/BigData.png';
import { Link } from 'react-router-dom';
import ThemeContext from '../ThemeContext';

const CoursesDetail = ({courseData, hours}) => {

    const {selectedTheme} = useContext(ThemeContext);

  return (
    <div className='h-screen w-full'>
      <div className='w-full h-[64px]' style = {{background: selectedTheme.colors.fifth, color: selectedTheme.colors.secondary}} >
         <Dashboard/>  
      </div>
      <div className='flex w-full'>
        <div className='w-[70%] h-[905px] overflow-y-scroll no-scrollbar' style = {{background: selectedTheme.colors.sixth}}>
            <div className='ml-auto flex w-[200px] mt-2'>
            </div>
            <div className='py-2 ml-5'>
                <h1 className='font-semibold text-6xl' style = {{color: selectedTheme.colors.secondary}}>Courses</h1>
            </div>
            <div className='ml-5 w-[95%] h-[50px] mt-5 rounded-lg border-none hover:shadow-lg drop-shadow-md outline-none flex justify-between px-2' style = {{background: selectedTheme.colors.seventh}}>
                <div className='flex justify-center items-center'>
                    <CiSearch size ={25}/>
                    <input className = "ml-2" type = 'text' placeholder = 'Search...' style = {{background: selectedTheme.colors.seventh}}/>
                </div>
            </div>
            <div className='flex justify-center w-full mt-5 h-[800px]'>
                <Link to='/subject'><div className='w-[400px] h-[250px] flex flex-col py-3 mr-5'>
                    <img className='w-full h-[50%] rounded-t-md' src={AI}/>
                    <div className='w-full h-[50%] rounded-b-md px-2 py-1' style = {{background: selectedTheme.colors.seventh}}>
                        <h1 className='font-semibold text-xl w-[250px] text-[#1F1F1F] pl-2'>{courseData[0]?.courseName}</h1>
                        <h3 className='font-semibold text-xl w-[250px] text-[#1F1F1F] pl-2'>{hours[1]}</h3>
                    </div>
                </div></Link>
                <Link to='/subject2'><div className='w-[400px] h-[250px] flex flex-col py-3'>
                    <img className='w-full h-[50%] rounded-t-md' src={BigData}/>
                    <div className='w-full h-[50%] rounded-b-md px-2 py-1'  style = {{background: selectedTheme.colors.seventh}}>
                        <h1 className='font-semibold text-xl w-[250px] text-[#1F1F1F] pl-2'>{courseData[1]?.courseName}</h1>
                        <h3 className='font-semibold text-xl w-[250px] text-[#1F1F1F] pl-2'>{hours[0]}</h3>
                    </div>
                </div></Link>
            </div>
        </div>
        <div className='w-[30%] h-[905px] overflow-y-hidden'  style = {{background: selectedTheme.colors.primary}}>
          <Schedule/>
          <UpcomingEvent/>
        </div>
      </div>
      <div className='w-full h-[64px] ' style = {{background: selectedTheme.colors.fifth}}><Footer/></div>
    </div>
  )
}

export default CoursesDetail