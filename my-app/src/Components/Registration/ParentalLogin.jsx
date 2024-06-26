import React, {useState, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Home from '../assets/Home.png';
import ThemeContext from '../../ThemeContext';

const ParentalLogin = () => {
 
      const [data, setData] = useState({
        email:'',
        password:''
      })
    
      const loginParent = async (e) => {
        e.preventDefault();
      }

      const { selectedTheme } = useContext(ThemeContext);
    
      return (
          <>
          <div className='flex font-Inter relative' style = {{background: selectedTheme?.colors?.quartary}}>
              <div className='w-[35%] h-screen' style = {{color: selectedTheme.colors.secondary}}>
                  <div className='flex flex-col w-full h-[45%] item-strech'>
                    <Link to = "/"><h1 className='text-6xl font-bold  text-center py-6 mt-10'>aspieByte</h1></Link>
                    <p className='text-xl font-bold px-10 max-w-[80%] mt-5'> Empowering Minds, Embracing Uniqueness: Your Journey, Your Pace, Our Adaptive Learning Space</p>
                  </div>
              </div>    
              <div className='w-[65%] h-screen rounded-l-3xl' style = {{background: selectedTheme.colors.tertiary}}>
                  <div className='h-full flex flex-col justify-center  w-[90%] ml-12'>
                      <form className='my-5 mx-10 p-5' style = {{color: selectedTheme.colors.secondary}} onSubmit={loginParent}>
                          <h2 className='text-4xl font-bold py-4' >Parental/Guardian Login Portal</h2>
                          <input className ='rounded-lg my-4 p-2 w-full bg-transparent border-[#CCCCCC]/[0.8] border ' type="email" value = {data.email} onChange={(e)=> setData({...data, email: e.target.value})}   placeholder = 'Guardian Email'/>
                          <input className ='rounded-lg my-4 p-2 w-full bg-transparent border-[#CCCCCC]/[0.8] border ' type="password" value = {data.password} onChange={(e)=> setData({...data, password: e.target.value})}   placeholder = 'Password'/>
                          <Link to = '/home'><button className='rounded-md mt-4 w-full text-2xl h-[50px] dark:bg-[#377D81] bg-[#92C7CF] text-[#FFFFFF] hover:bg-[#377D81]' type = 'submit'>Login</button></Link>
                          <div className='flex justify-between'>
                              <Link to = '/login'><p className='px-1 hover:text-[#377D81] hover:underline'>Student Login</p></Link>
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
    
export default ParentalLogin