import React, { useContext, useEffect, useState } from 'react';
import Dashboard from '../Home/Dashboard';
import ThemeContext from '../../ThemeContext';
import AI from '../assets/AI.png'; 
import Footer from '../Home/Footer';
import { Link } from 'react-router-dom';

const Subject = ({courseData, hours}) => {
    const {selectedTheme} = useContext(ThemeContext);
    
    const [curriculum, setCurriculum] = useState();
    
  useEffect(() => {
    fetch('http://localhost:8000/courseCurriculum')
        .then(response => {
            if (!response.ok) {
             throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            setCurriculum(data);
        })
        .catch(error => {
            console.error('Error fetching curriculam:', error);
        });
    }, []);

  return (
    <div>
        <div className= 'w-full h-[64px]' style = {{background: selectedTheme.colors.fifth}}>
            <Dashboard/>
        </div>
        <div className='w-full h-[350px] flex'>
            <img className='w-[630px] h-[350px] pl-5 pt-4 rounded-lg' src ={AI} />
            <div className='w-[640px] h-full flex flex-col'>
                <div className='float-right flex  ml-auto pt-4'>
                    <p className='font-normal text-base ' style = {{color: selectedTheme.colors.secondary}}>feeling stressed?</p>
                </div>
                <div className='flex flex-col pl-3 pt-7 w-[400px]'>
                    <p className='font-bold text-4xl mb-5'> {courseData[0]?.courseName}</p>
                    <Link to='/subjectDetails'><button className='bg-[#DE4C4C] w-[150px] h-[40px] font-semibold text-xl' style = {{color: selectedTheme.colors.tertiary}}>Enroll</button></Link>
                </div>
            </div>
        </div>
        <p className='font-medium text-lg text-[#464646] mt-1 pl-5'>duration: {hours[1]} hours</p>
        <div className='flex w-full justify-center h-[720px] overflow-y-hidden mt-5 mb-10'>
            <div className='w-[48%] p-3 rounded-lg mr-4' style={{background: selectedTheme.colors.fifth, color: selectedTheme.colors.secondary}}>
                <h3 className='font-semibold text-lg'>About the course</h3>
                <p className='mt-2 text-xl'>              
                    {courseData[0]?.courseDesc}
                </p>
            </div>
            <div className='w-[48%] p-3 rounded-lg' style={{background: selectedTheme.colors.primary}}>
            <h3 className='font-semibold text-lg' >Curriculam</h3>
                {curriculum?.map(data => (
                    <ul>
                        <li className='mt-2 text-2xl'>{data?.moduleName}</li>
                    </ul>
                ))}
            </div>

        </div>
        <div className='w-full h-[64px] ' style = {{background: selectedTheme.colors.fifth}}><Footer/></div>
    </div>
  )
}

export default Subject