import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Dashboard from '../Home/Dashboard';
import ThemeContext from '../../ThemeContext';
import Schedule from '../Home/Schedule';
import UpcomingEvent from '../Home/UpcomingEvent';
import Footer from '../Home/Footer';
import { Link } from 'react-router-dom';


const SubjectDetails = () => {
    const { courseID } = useParams();
    const { selectedTheme } = useContext(ThemeContext);
    const [courseDetails, setCourseDetails] = useState(null);
    
    const [showOptions, setShowOptions] = useState(false);
    const [showOptions2, setShowOptions2] = useState(false);
    const [showOptions3, setShowOptions3] = useState(false);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8000/courseDetails/${courseID}`);
                if (response.ok) {
                    const data = await response.json();
                    setCourseDetails(data);
                    console.log(data);
                } else {
                    console.error('Failed to fetch course details');
                }
            } catch (error) {
                console.error('Error fetching course details:', error);
            }
        };

        fetchCourseDetails();
    }, [courseID]);

    return (
        <div>
            <div className='w-full h-[64px]' style={{background: selectedTheme.colors.fifth}}>
                <Dashboard/>
            </div>
            <div className='flex w-full'>
                <div className='w-[70%] h-[905px] pb-5 overflow-y-scroll no-scrollbar' style={{background: selectedTheme.colors.sixth}}>
                  <div className='py-2 ml-5 mb-7 '>
                    <h1 className='font-semibold text-4xl' style={{color: selectedTheme.colors.secondary}}>
                      {courseDetails?.courseName || 'Loading...'}
                    </h1>
                    {courseDetails?.program ? (
                      <>
                        <h2 className='font-semibold text-2xl' style={{color: selectedTheme.colors.secondary}}>
                          {courseDetails.program.progName}
                        </h2>
                        
                        {courseDetails.program.modules?.slice(0,1).map((module, index) => (
                          <div className='text-xl'>
                          <button key={index} className={`w-[900px] h-[50px] mt-3 ${showOptions ? 'rounded-t-lg' : 'rounded-lg'} mx-4 flex justify-between p-2 ${showOptions ? 'border-x-2 border-t-2' : 'border-2'}`} style={{ background: selectedTheme.colors.seventh, color: selectedTheme.colors.ninth, borderColor: selectedTheme.colors.primary }} onClick={() => setShowOptions(!showOptions)}>
                            <h3 style={{color: selectedTheme.colors.secondary}}>
                              {module.moduleName}
                            </h3>
                            <span className='text-2xl'>{showOptions ? "-" : "+"}</span>
                            </button>
                            {showOptions && module.contents?.slice(0,7).map((content, cIndex) => (
                              <div key={cIndex} className={`w-[900px] h-[50px] p-3 mx-4 grid overflow-hidden transition-all duration-300 ease-in-out text-sm border-l-2 border-r-2 ${cIndex === 6 ? 'border-b-2 rounded-b-lg' : ''}`} style={{ background: selectedTheme.colors.seventh, color: selectedTheme.colors.ninth, borderColor: selectedTheme.colors.primary }}>
                                <Link to={`/content/${content.contentID}`}>
                                  <div className="overflow-hidden text-xl" style={{color: selectedTheme.colors.secondary}}>{content.contentName}</div>
                                </Link>
                              </div>
                            ))}
                            </div>
                        ))}  
                      
                        {courseDetails.program.modules?.slice(1,2).map((module, index) => (
                          <div className='text-xl'>
                          <button key={index} className={`w-[900px] h-[50px] mt-3 ${showOptions2 ? 'rounded-t-lg border-x-2 border-t-2' : 'rounded-lg border-2'} mx-4 flex justify-between p-2`} style={{ background: selectedTheme.colors.seventh, color: selectedTheme.colors.ninth, borderColor: selectedTheme.colors.primary }} onClick={() => setShowOptions2(!showOptions2)}>
                            <h3 style={{color: selectedTheme.colors.secondary}}>
                              {module.moduleName}
                            </h3>
                            <span className='text-2xl'>{showOptions2 ? "-" : "+"}</span>
                            </button>
                            {showOptions2 && module.contents?.slice(0,6).map((content, cIndex) => (
                              <div key={cIndex} className={`w-[900px] h-[50px] p-3 mx-4 grid overflow-hidden transition-all duration-300 ease-in-out text-sm border-l-2 border-r-2 ${cIndex === 5 ? 'border-b-2 rounded-b-lg' : ''}`} style={{ background: selectedTheme.colors.seventh, color: selectedTheme.colors.ninth, borderColor: selectedTheme.colors.primary }}>
                                <Link to={`/content/${content.contentID}`}>
                                  <div className="overflow-hidden text-xl" style={{color: selectedTheme.colors.secondary}}>{content?.contentName}</div>
                                </Link>
                              </div>
                            ))}
                            </div>
                        ))}  

                          {courseDetails.program.modules?.slice(2,3).map((module, index) => (
                          <div className='text-xl'>
                          <button key={index} className={`w-[900px] h-[50px] mt-3 ${showOptions3 ? 'rounded-t-lg border-x-2 border-t-2' : 'rounded-lg border-2'} mx-4 flex justify-between p-2`} style={{ background: selectedTheme.colors.seventh, color: selectedTheme.colors.ninth, borderColor: selectedTheme.colors.primary }} onClick={() => setShowOptions3(!showOptions3)}>
                            <h3 style={{color: selectedTheme.colors.secondary}}>
                              {module.moduleName}
                            </h3>
                            <span className='text-2xl'>{showOptions3 ? "-" : "+"}</span>
                            </button>
                            {showOptions3 && module.contents?.slice(0, 7).map((content, cIndex) => (
                              <div key={cIndex} className={`w-[900px] h-[50px] p-3 mx-4 grid overflow-hidden transition-all duration-300 ease-in-out text-sm border-l-2 border-r-2 ${cIndex === 6 ? 'border-b-2 rounded-b-lg' : ''}`} style={{ background: selectedTheme.colors.seventh, color: selectedTheme.colors.ninth, borderColor: selectedTheme.colors.primary }}>
                                <Link to={`/content/${content.contentID}`}>
                                  <div className="overflow-hidden text-xl" style={{color: selectedTheme.colors.secondary}}>{content?.contentName}</div>
                                </Link>
                              </div>
                            ))}
                            </div>
                        ))}                          
                      </>
                    ) : (
                      <h2 className='font-semibold text-2xl' style={{color: selectedTheme.colors.secondary}}>
                        Loading program details...
                      </h2>
                    )}
                  </div>
                </div>

                <div className='w-[30%] h-full overflow-y-hidden' style={{background: selectedTheme.colors.primary}}>
                    <Schedule/>
                    <UpcomingEvent/>
                </div>
            </div>
            <div className='w-full h-[64px]' style={{background: selectedTheme.colors.fifth}}>
                <Footer/>
            </div>
        </div>
    );
};

export default SubjectDetails;
