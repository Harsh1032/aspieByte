import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ThemeSelector from '../../../src/ThemeSelector';
import ThemeContext from '../../ThemeContext';
    const Landingpage = ({darkTheme, setDarkTheme}) => {
    
    const { selectedTheme } = useContext(ThemeContext);

  return (
    <>
        <div className='w-full h-screen' style = {{background: selectedTheme?.colors?.primary}}>
        {/* <div className='w-full'>
            <button type = "button" onClick = {() => setDarkTheme(!darkTheme)} className = " px-2 py-1 float-right mt-3 mr-3 text-xl dark:bg-[#E5E1DA] dark:text-[#303030] bg-[#FFFFFF] text-[#377D81] border rounded-full hover:shadow-lg " >
            {darkTheme? 'Light 💡' : 'Dark 🌙'}
            </button>
        </div>  */}
            <ThemeSelector />
        
            <div className=' w-full h-[90%] flex flex-col justify-center items-center '>
                <h1 className='text-6xl font-bold mb-5' style={{ color: selectedTheme?.colors?.secondary }}>aspieByte</h1>
                <div className='w-[80%] flex jsutfiy-center p-5 mx-8 space-x-8 mt-2'>
                    <div style={{ background: selectedTheme?.colors?.tertiary, color: selectedTheme?.colors?.quartary}} className='w-[48%] rounded-md py-2 border-none outline-none hover:shadow-lg'>
                        <Link to = '/login'><p style={{ background: selectedTheme?.colors?.tertiary, color: selectedTheme?.colors?.secondary }} className=' text-2xl flex justify-center'>Student Login</p></Link>
                    </div>
                    <div style={{ background: selectedTheme?.colors?.tertiary, color: selectedTheme?.colors?.quartary }} className=' w-[48%] rounded-md py-2 border-none outline-none hover:shadow-lg'>
                        <Link to ='/parentalLogin'><p style={{ background: selectedTheme?.colors?.tertiary, color: selectedTheme?.colors?.secondary }} className=' text-2xl flex justify-center'>Parent Login</p></Link>
                    </div>
                </div>
            </div>
        </div>
    </>
   
  )
}

export default Landingpage