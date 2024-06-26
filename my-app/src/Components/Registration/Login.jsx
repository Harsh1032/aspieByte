import React, {useState, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Home from '../assets/Home.png';
import ThemeContext from '../../ThemeContext';

const Login = () => {

  const navigate = useNavigate();

  const [data, setData] = useState({
    email:'',
    password:''
  })

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        const userData = await response.json();
        console.log('User logged in successfully:', userData);
        // Redirect to /home and pass userID within the state
        navigate('/home', { state: { userID: userData.user.id } });
      } else {
        console.error('Failed to log in:', response.statusText);
        // Show error message to the user
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
      // Show error message to the user
    }
  }

  
  const { selectedTheme } = useContext(ThemeContext);

  return (
      <>
      <div className='flex font-Inter relative' style = {{background: selectedTheme.colors.primary}}>
          <div className='w-[35%] h-screen ' style = {{color: selectedTheme.colors.secondary}}>
              <div className='flex flex-col w-full h-[45%] item-strech'>
                <Link to = "/"><h1 className='text-6xl font-bold  text-center py-6 mt-10'>aspieByte</h1></Link>
                <p className='text-xl font-bold px-10 max-w-[80%] mt-5'> Empowering Minds, Embracing Uniqueness: Your Journey, Your Pace, Our Adaptive Learning Space</p>
              </div>
          </div>    
          <div className='w-[65%] h-screen rounded-l-3xl' style = {{background: selectedTheme.colors.tertiary}}>
              <div className='h-full flex flex-col justify-center  w-[90%] ml-12'>
                  <form className='my-5 mx-10 p-5 ' style = {{color: selectedTheme.colors.secondary}} onSubmit={loginUser}>
                      <h2 className='text-4xl font-bold py-4'>Welcome back</h2>
                      <input className ='rounded-lg my-4 p-2 w-full bg-transparent border-[#CCCCCC]/[0.8] border ' type="email" value = {data.email} onChange={(e)=> setData({...data, email: e.target.value})}   placeholder = 'Email'/>
                      <input className ='rounded-lg my-4 p-2 w-full bg-transparent border-[#CCCCCC]/[0.8] border ' type="password" value = {data.password} onChange={(e)=> setData({...data, password: e.target.value})}   placeholder = 'Password'/>
                      <button className='rounded-md mt-4 w-full text-2xl h-[50px] dark:bg-[#377D81] bg-[#92C7CF] text-[#FFFFFF] hover:bg-[#377D81]' type = 'submit'>Login</button>
                      <div className='flex justify-between'>
                          <Link to = '/signUp'><p className='px-1 hover:text-[#377D81] hover:underline'>Don't have an account?</p></Link>
                          <Link><p className='hover:text-[#377D81] hover:underline'>Forgot password?</p></Link>
                      </div>
                  </form>
              </div>
          </div>
      </div>
      <div className='w-full'>
          <img className = " w-[225px] h-[275px] absolute bottom-10 left-80" src={Home} alt="Home"/>
      </div>
      </>
    )
}

export default Login
