import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Schedule = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className='w-full h-350px'>
      <h1 className='font-bold text-4xl ml-6 mt-3 text-[#1F1F1F]'>Schedule</h1>
      <div className='flex justify-center items-center w-full h-[300px] mt-10'>
        <Calendar onChange={setDate} value={date} />
      </div>
    </div>
  )
}

export default Schedule