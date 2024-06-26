import React from 'react'

const UpcomingEvent = () => {
  return (
    <div className='w-full h-[555px] mt-10'>
        <h1 className='font-bold text-4xl ml-6 mt-3 text-[#1F1F1F]'>Up coming Events</h1>
        <div className='flex flex-col my-2 justify-center items-center w-full h-[500px]'>
            <p className='text-[#1F1F1F] fonr-medium  text-3xl'> You have no </p>
            <p className='text-[#1F1F1F] fonr-medium  text-3xl'> upcoming events</p>
        </div>
    </div>
  )
}

export default UpcomingEvent