import React, {useContext} from 'react';
import ThemeContext from '../../ThemeContext';

const Footer = () => {

    const {selectedTheme} = useContext(ThemeContext);

    return (
        <div className='w-full h-full flex items-center px-10 '>
            <h1 className='text-lg font-bold ' style = {{color: selectedTheme.colors.secondary}}>aspieByte</h1>
            <div className='w-[600px] h-full flex items-center justify-between ml-auto' style = {{color: selectedTheme.colors.secondary}}>
                <div className=' w-[400px] flex justify-between text-lg font-medium'>
                    <p>Terms and Conditions</p>
                    <p>Privacy Policy</p>
                </div>
                <div className='mr-5'>    
                     <p className='text-lg font-medium'>About us</p>
                </div>
            </div>
        </div>
      )
    }

export default Footer