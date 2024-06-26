import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ThemeContext from '../../ThemeContext';

const GuardianSignUp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { selectedTheme } = useContext(ThemeContext);
    
    const [data, setData] = useState({
        guardianFirstName: '',
        guardianLastName: '',
        typeOfKinship: '',
        gemail: '',
        password: ''
    });
    const userEmail = location.state?.email; // Email passed from SignUp
    
    const signUpParent = async (e) => {
        e.preventDefault();
        try {
            // You do not send userEmail here; it's used in the backend to correlate the user.
            const response = await fetch('http://localhost:8000/guardianSignUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...data, userEmail }) // Pass userEmail to the backend
            });
            if (response.ok) {
              console.log('Successful Registeration');
              const { userID } = await response.json();  
              navigate('/questionnaire1', { state: { userID } });  
            } else {
                console.error('Failed to register guardian:', response.statusText);
            }
        } catch (error) {
            console.error('Error registering guardian:', error);
        }
    };

      return (
          <>
          <div className='h-screen w-full font-Inter relative' style = {{background: selectedTheme.colors.tertiary}}>   
                  <div className='items-center h-full flex flex-col justify-center'>
                      <form className='max-w-[535px] w-full mx-auto' style = {{color: selectedTheme.colors.secondary}} onSubmit={signUpParent}>
                          <h2 className='text-4xl font-bold py-4'>Parental/Guardian Sign Up Portal</h2>
                          <div className='flex w-full justify-between'>                      
                            <input className ='rounded-lg my-4 p-2 w-[47%] bg-transparent border-[#CCCCCC]/[0.8] border ' type="text" value = {data.guardianFirstName} onChange={(e)=> setData({...data, guardianFirstName: e.target.value})}   placeholder = 'Guardian First Name'/>
                            <input className ='rounded-lg my-4 p-2 w-[47%] bg-transparent border-[#CCCCCC]/[0.8] border ' type="text" value = {data.guardianLastName} onChange={(e)=> setData({...data, guardianLastName: e.target.value})}   placeholder = 'Guardian Last Name'/>
                          </div>
                          <input className ='rounded-lg my-4 p-2 w-full bg-transparent border-[#CCCCCC]/[0.8] border ' type="text" value = {data.typeOfKinship} onChange={(e)=> setData({...data, typeOfKinship: e.target.value})}   placeholder = 'Type of Kinship'/>
                          <input className ='rounded-lg my-4 p-2 w-full bg-transparent border-[#CCCCCC]/[0.8] border ' type="email" value = {data.gemail} onChange={(e)=> setData({...data, gemail: e.target.value})}   placeholder = 'Guardian Email'/>
                          <input className ='rounded-lg my-4 p-2 w-full bg-transparent border-[#CCCCCC]/[0.8] border ' type="password" value = {data.password} onChange={(e)=> setData({...data, password: e.target.value})}   placeholder = 'Password'/>
                          <button className='rounded-md mt-4 w-full text-2xl h-[50px] dark:bg-[#92C7CF] bg-[#92C7CF] text-[#FFFFFF] hover:bg-[#377D81] dark:hover:bg-[#377D81]' type = 'submit'>Sign Up</button>
                          <div className='flex justify-between'>
                              <Link to = '/login'><p className='px-1 hover:text-[#377D81] hover:underline'>Student Login</p></Link>
                              <Link><p className='hover:text-[#377D81] hover:underline'>Forgot password?</p></Link>
                          </div>
                      </form>
                  </div>
          </div>
          </>
        )
    }

export default GuardianSignUp