import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Dashboard from '../Home/Dashboard';
import Schedule from '../Home/Schedule';
import UpcomingEvent from '../Home/UpcomingEvent';
import Footer from '../Home/Footer';
import ThemeContext from '../../ThemeContext';
import { Link } from 'react-router-dom';
import Stress from './Stress';
import { IoDocumentTextOutline } from "react-icons/io5";

const Content = () => {
    const { contentID } = useParams();
    const navigate = useNavigate();
    const { selectedTheme } = useContext(ThemeContext);
    const [contentDetails, setContentDetails] = useState(null);
    const [transcript, setTranscript] = useState('');

    const fetchContentDetails = (id) => {
        fetch(`http://localhost:8000/getVideoContent/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setContentDetails(data);
                if (data.scriptSource) {
                    fetch(data.scriptSource)
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Failed to fetch transcript');
                            }
                            return response.text();
                        })
                        .then(text => {
                            setTranscript(text);
                        })
                        .catch(error => {
                            console.error('Error fetching transcript:', error);
                        });
                } else {
                    setTranscript('No transcript available.');
                }
            })
            .catch(error => {
                console.error('Error fetching content details:', error);
                setContentDetails(null);
                setTranscript('');
            });
    };

    useEffect(() => {
        fetchContentDetails(contentID);
    }, [contentID]);

    const handlePrevious = () => {
        const previousContentID = parseInt(contentID) - 1;
        navigate(`/content/${previousContentID}`);
    };

    const handleNext = () => {
        const nextContentID = parseInt(contentID) + 1;
        navigate(`/content/${nextContentID}`);
    };
  return (
    <div>
      <div className='w-full h-[64px]' style={{background: selectedTheme.colors.fifth}}>
        <Dashboard/>
      </div>
      <div className='flex w-full'>
        <div className='w-[70%] h-[905px] overflow-y-scroll no-scrollbar' style={{background: selectedTheme.colors.sixth}}>
        <div className='ml-auto flex w-[200px] mt-2'>
        <Stress />  {/* Place the Stress component here */}
          </div>
          {contentDetails ? (
                <>
                <div className='py-2 ml-5 mb-7'>
                    <h1 className='font-normal text-5xl' style={{color: selectedTheme.colors.secondary}}>{contentDetails.videoName}</h1>
                </div>
                    <div className='mt-5 w-full h-[330px] flex justify-center'>
                        {/* Add a key prop to the video element */}
                        <video key={contentDetails.videoFile} controls className="w-[560px] h-[315px]">
                            <source src={contentDetails.videoFile} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                    <div className=" transform -translate-y-1/2 flex w-full justify-center h-[60px] mt-8">
                        <button className=" w-[200px] h-[40px] rounded-xl text-xl mr-4 font-normal" onClick={handlePrevious} style= {{background: selectedTheme.colors.primary, color: selectedTheme.colors.ninth}}>
                            Previous
                        </button>
                        <button className="w-[340px] h-[40px] rounded-xl text-xl font-normal" onClick={handleNext} style= {{background: selectedTheme.colors.eight, color: selectedTheme.colors.ninth}}>
                            Next
                        </button>
                    </div>
                    <div className='flex justify-center w-full mt-5'>
                        <div className='w-[560px] overflow-y-scroll no-scrollbar h-[300px] rounded-lg p-4' style={{background: selectedTheme.colors.fifth, color: selectedTheme.colors.secondary}}>
                        <div className='flex'>
                            <IoDocumentTextOutline size={25}/>
                            <p className='text-xl font-normal ml-2'>Transcript</p>
                        </div>
                        <hr className="border border-[#000000]/[0.5] w-[200px] my-1"></hr>
                        <p>{transcript || 'Loading transcript...'}</p>
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
        <div className='w-[30%] h-[905px] overflow-y-hidden' style={{background: selectedTheme.colors.primary}}>
          <Schedule/>
          <UpcomingEvent/>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default Content;
