import React, {useState, useContext} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import Home from '../assets/Home.png';
import ThemeContext from '../../ThemeContext';



const SignUp = () => {

    const navigate = useNavigate();
    
    const [data, setData] = useState({
        firstName: '',
        lastName: '',
        gender:'',
        age:'',
        phoneNumber: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const registerUser = async (e) =>{
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8000/signUp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                console.log('User registered successfully');
                // Redirect to login page after successful registration
                navigate('/guardianSignUp', { state: { email: data.email } });

            } else {
                console.error('Failed to register user:', response.statusText);
                // Show error message to the user
            }
        } catch (error) {
            console.error('Error registering user:', error.message);
            // Show error message to the user
        }
    };

    const { selectedTheme } = useContext(ThemeContext);

  return (
    <>
    <div className='flex font-Inter relative' style = {{background: selectedTheme?.colors?.quartary}}>
        <div className='w-[35%] h-screen'  style = {{color: selectedTheme.colors.secondary}}>
            <div className='flex flex-col w-full h-[45%] item-strech'>
                <Link to = "/"><h1 className='text-6xl font-bold  text-center py-6 mt-10'>aspieByte</h1></Link>
                <p className='text-xl font-bold px-10 max-w-[80%] mt-5'> Empowering Minds, Embracing Uniqueness: Your Journey, Your Pace, Our Adaptive Learning Space</p>
            </div>
        </div>    
        <div className='w-[65%] h-screen' style = {{background: selectedTheme.colors.tertiary}}>
            <div className='flex flex-col h-full w-[90%] ml-12'>
                <form className='my-5 mx-10 p-5' style = {{color: selectedTheme.colors.secondary}} onSubmit={registerUser}>
                    <h2 className='text-4xl font-bold py-3 '>Create Account</h2>
                    <div className='flex py-2 justify-between'>
                        <input className ='rounded-lg p-2 w-[45%] bg-transparent border-[#CCCCCC]/[0.8] border outline-none ' type="text" value = {data.firstName} onChange={(e)=> setData({...data, firstName: e.target.value})}   placeholder = 'First Name'/>
                        <input className ='rounded-lg p-2 w-[45%] bg-transparent border-[#CCCCCC]/[0.8] border outline-none' type="text" value = {data.lastName} onChange={(e)=> setData({...data, lastName: e.target.value})}   placeholder = 'Last Name'/>
                    </div>
                    <div className='flex py-2 justify-between'>
                        <select className ='rounded-lg p-2 w-[45%] bg-transparent border-[#CCCCCC]/[0.8] border outline-none' type="text" value = {data.gender} onChange={(e)=> setData({...data, gender: e.target.value})}   placeholder = 'Gender'>
                            <option className ='rounded-lg p-2 w-[45%] text-[#303030] dark:text-[#FBF9F1] border-[#CCCCCC]/[0.8] border ' value="">-- Select --</option>
                            <option className ='rounded-lg p-2 w-[45%] text-[#303030] dark:text-[#FBF9F1] border-[#CCCCCC]/[0.8] border' value="male">Male</option>
                            <option className ='rounded-lg p-2 w-[45%] text-[#303030] dark:text-[#FBF9F1] border-[#CCCCCC]/[0.8] border' value="female">Female</option>
                        </select>
                        <input className ='rounded-lg p-2 w-[45%] bg-transparent border-[#CCCCCC]/[0.8] border outline-none' type="text" value = {data.age} onChange={(e)=> setData({...data, age: e.target.value})}   placeholder = 'Age'/>
                    </div>
                    <div className='py-2'>
                        <input className ='rounded-lg p-2 w-full bg-transparent border-[#CCCCCC]/[0.8] border outline-none' type="text" value = {data.phoneNumber} onChange={(e)=> setData({...data, phoneNumber: e.target.value})}   placeholder = 'Phone Number'/>
                    </div>
                    <div className='py-2'>
                        <input className ='rounded-lg p-2 w-full bg-transparent border-[#CCCCCC]/[0.8] border outline-none' type="email" value = {data.email} onChange={(e)=> setData({...data, email: e.target.value})}  placeholder = 'Email'/>
                    </div>
                    <div className='py-2'>
                        <input className ='rounded-lg p-2 w-full bg-transparent border-[#CCCCCC]/[0.8] border outline-none' type="password" value = {data.password} onChange={(e)=> setData({...data, password: e.target.value})}  placeholder = 'Password'/>
                    </div>
                    <div className='py-2'>
                        <input className ='rounded-lg p-2 w-full bg-transparent border-[#CCCCCC]/[0.8] border ' type="password" value = {data.confirmPassword} onChange={(e)=> setData({...data, confirmPassword: e.target.value})}  placeholder = 'Confirm Password'/>    
                    </div>
                    <button className='rounded-md w-full mt-2 h-[50px] text-2xl dark:bg-[#377D81] bg-[#92C7CF] text-[#FFFFFF] hover:bg-[#377D81]' type = 'submit'>Create Account</button>
                    <div className='flex'>
                        <Link to = '/login'><p className='px-1 hover:text-[#377D81] hover:underline'>Already have an account? Login</p></Link>
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

export default SignUp