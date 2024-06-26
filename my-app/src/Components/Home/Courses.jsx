import React, { useContext, useState, useEffect } from 'react';
import ThemeContext from '../../ThemeContext';
import { Link } from 'react-router-dom';

const Courses = ({ userID }) => {
    const { selectedTheme } = useContext(ThemeContext);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            if (!userID) return;
            
            const response = await fetch(`http://localhost:8000/getEnrolledCourses/${userID}`);
            if (response.ok) {
                const data = await response.json();
                setCourses(data);
            } else {
                console.error('Failed to fetch courses');
            }
        };

        fetchEnrolledCourses();
    }, [userID]);

    return (
        <>
            <h1 className='font-semibold text-6xl ml-20 pl-10' style={{color: selectedTheme.colors.secondary}}>My Courses</h1>
            <div className='flex flex-col justify-center items-center py-5 overflow-y-hidden'>
                {courses.map((course, index) => (
                    <Link key={index} to={`/subjectDetails/${course.courseID}`}>
                        <div className='w-[600px] h-[200px] flex py-3 '>
                            <div className='w-[60%] h-full rounded-l-md px-2 py-1' style={{background: selectedTheme.colors.quartary}}>
                                <h1 className='font-semibold text-xl w-[250px] text-[#1F1F1F] pl-2'>aspieByte</h1>
                                <hr className="border border-[#000000] w-[250px] my-1"></hr>
                                <p className='font-bold text-xl my-2 w-[250px] pl-2 text-[#2F2F2F]'>{course.courseName}</p>
                                <h4 className='font-medium text-lg text-[#464646] w-[250px] pl-2'>Progress: {course.progressBar}%</h4>
                            </div>
                            <img className='w-[40%] h-full rounded-r-md' src={course.coverPath}  style = {{background: selectedTheme.colors.primary}} alt="Course"/>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
};

export default Courses;
