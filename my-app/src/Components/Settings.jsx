import React, { useState, useContext, useEffect } from 'react';
import { CgProfile } from "react-icons/cg";
import Footer from './Home/Footer';
import Dashboard from '../Components/Home/Dashboard';
import { Link } from 'react-router-dom';
import { FaUser } from "react-icons/fa6";
import { IoMdColorPalette } from "react-icons/io";
import { FaUnlockAlt } from "react-icons/fa";
import { MdNotificationsActive } from "react-icons/md";
import ThemeContext from '../ThemeContext';
import { themes } from '../themes';

const Settings = () => {


  const { selectedTheme, changeTheme } = useContext(ThemeContext);

  const [activeSection, setActiveSection] = useState("Appearance"); // Default active section

  const [userData, setUserData] = useState([]);

  const [light, setLight] = useState(themes[0]);
  const [dark, setDark] = useState(themes[1]);
  const [halloween, setHalloween] = useState(themes[2]);
  const [summer, setSummer] = useState(themes[3]);

 
  const handleThemeChange = (theme) => {
    changeTheme(theme);
  };

  return (
    <div className={`h-screen w-full overflow-y-scroll no-scrollbar` }>
      <div className='w-full h-[64px]' style={{ background: selectedTheme.colors.fifth }}>
        <Dashboard />
      </div>
      <div className='flex w-full'>
        <div className='w-[20%] flex flex-col pl-5 h-[510px] overflow-y-hidden py-5' style={{ background: selectedTheme.colors.primary }}>
          <div className={`w-[90%] flex hover:bg-[#E5E1DA] hover:rounded-md py-2 pl-3 ${activeSection === "Account" && "bg-[#E5E1DA] rounded-md p-2 my-3"}`} onClick={() => setActiveSection("Account")}>
            <FaUser size={25} style={{ marginTop: 3 }} />
            <p className='text-2xl ml-3'>Account</p>
          </div>
          <div className={`w-[90%] flex hover:bg-[#E5E1DA] hover:rounded-md p-2 ${activeSection === "Appearance" && "bg-[#E5E1DA] rounded-md p-2 my-3"}`} onClick={() => setActiveSection("Appearance")}>
            <IoMdColorPalette size={30} style={{ marginTop: 3 }} />
            <p className='text-2xl ml-3'>Appearance</p>
          </div>
          <div className={`w-[90%] flex  hover:bg-[#E5E1DA] hover:rounded-md py-2 pl-3 ${activeSection === "Security" && "bg-[#E5E1DA] rounded-md p-2 my-3"}`} onClick={() => setActiveSection("Security")}>
            <FaUnlockAlt size={25} style={{ marginTop: 3 }} />
            <p className='text-2xl ml-3'>Security</p>
          </div>
          <div className={`w-[90%] flex  hover:bg-[#E5E1DA] hover:rounded-md p-2 ${activeSection === "Notifications" && "bg-[#E5E1DA] rounded-md p-2 my-3"}`} onClick={() => setActiveSection("Notifications")}>
            <MdNotificationsActive size={30} style={{ marginTop: 3 }} />
            <p className='text-2xl ml-3'>Notifications</p>
          </div>
        </div>
        <div className='w-[80%] h-[510px] bg-[#ffffff] px-10 py-5'>
       
          {activeSection === "Account" && (
            <div>
              <h1 className='font-medium text-2xl'>Set Your Profile Picture</h1>
              <div className='mt-2 w-[300px] h-[100px]'>
                <div className='w-full h-full flex justify-between items-center'>
                  <CgProfile size={80} />
                  <button className='w-[180px] h-[40px] text-xl font-bold rounded-lg' style={{ background: selectedTheme.colors.eight, color: selectedTheme.colors.ninth }}>Upload Picture</button>
                </div>
              </div>
              <div className='w-full h-[200px]'>
                {userData?.map(data => (
                          <>
                          <div key = {data.id} className='flex flex-col mt-4'>
                            <p className='text-xl font-semibold'>FullName</p>
                            <p className='text-lg font-normal'>{data?.firstName}  {data?.lastName}</p>
                          </div>
                          <div className='flex flex-col mt-4'>
                            <p className='text-xl font-semibold'>Phone Number</p>
                            <p className='text-lg font-normal'>{data?.phoneNumber}</p>
                          </div>
                          <div className='flex flex-col mt-4'>
                            <p className='text-xl font-semibold'>Email</p>
                            <p className='text-lg font-normal'>{data?.email}</p>
                          </div>
                        </>
                ))}
              </div>
              
              <Link to='/'><button className='bg-red-400 hover:bg-red-500 text-white w-[180px] h-[35px] float-right float-bottom rounded-md'>Logout</button></Link>
            </div>
          )}
           {activeSection === "Appearance" && (      
                <>
                 <div className=''>
                   <h1 className='font-medium text-2xl'>Set Your Theme</h1>
                </div>
                <div className='grid grid-cols-4 gap-2 w-full mt-4'>
                  <div className='flex flex-col justify-center w-[140px] h-[140px]'>
                    <div className='grid grid-cols-2 w-[120px] h-[120px] pl-4'>
                      <div className='w-[60px] h-[60px]' style = {{background: light.colors.tertiary}}></div>
                      <div className='w-[60px] h-[60px]' style = {{background: light.colors.primary}}></div>
                      <div className='w-[60px] h-[60px]' style = {{background: light.colors.fifth}}></div>
                      <div className='w-[60px] h-[60px]' style = {{background: light.colors.quartary}}></div>   
                    </div>
                    <input
                      type="radio"
                      className="mt-2"
                      name="theme"
                      value= {selectedTheme.name}
                      checked= {selectedTheme === themes[0]}
                      onChange={() => handleThemeChange(themes.find(theme => theme.name === 'light'))} 
                    />
                  </div>
                  <div className='flex flex-col justify-center w-[140px] h-[140px]'>
                    <div className='grid grid-cols-2 w-[120px] h-[120px] pl-4'>
                      <div className='w-[60px] h-[60px]' style = {{background: dark.colors.seventh}}></div>
                      <div className='w-[60px] h-[60px]' style = {{background: dark.colors.primary}}></div>
                      <div className='w-[60px] h-[60px]' style = {{background: dark.colors.eight}}></div>
                      <div className='w-[60px] h-[60px]' style = {{background: dark.colors.fifth}}></div>   
                    </div>
                    <input
                      type="radio"
                      className="mt-2"
                      name="theme"
                      value= {selectedTheme.name}
                      checked= {selectedTheme === themes[1]}
                      onChange={() => handleThemeChange(themes.find(theme => theme.name === 'dark'))} 
                    />
                  </div>
                  <div className='flex flex-col justify-center w-[140px] h-[140px]'>
                    <div className='grid grid-cols-2 w-[120px] h-[120px] pl-4'>
                      <div className='w-[60px] h-[60px]' style = {{background: halloween.colors.quartary}}></div>
                      <div className='w-[60px] h-[60px]' style = {{background: halloween.colors.primary}}></div>
                      <div className='w-[60px] h-[60px]' style = {{background: halloween.colors.tertiary}}></div>
                      <div className='w-[60px] h-[60px]' style = {{background: halloween.colors.quartary}}></div>   
                    </div>
                    <input
                      type="radio"
                      className="mt-2"
                      name="theme"
                      value= {selectedTheme.name}
                      checked= {selectedTheme === themes[2]}
                      onChange={() => handleThemeChange(themes.find(theme => theme.name === 'halloween'))} 
                    />
                  </div>
                  <div className='flex flex-col justify-center w-[140px] h-[140px]'>
                    <div className='grid grid-cols-2 w-[120px] h-[120px] pl-4'>
                      <div className='w-[60px] h-[60px]' style = {{background: summer.colors.tertiary}}></div>
                      <div className='w-[60px] h-[60px]' style = {{background: summer.colors.primary}}></div>
                      <div className='w-[60px] h-[60px]' style = {{background: summer.colors.quartary}}></div>
                      <div className='w-[60px] h-[60px]' style = {{background: summer.colors.eight}}></div>   
                    </div>
                    <input
                      type="radio"
                      className="mt-2"
                      name="theme"
                      value= {selectedTheme.name}
                      checked= {selectedTheme === themes[3]}
                      onChange={() => handleThemeChange(themes.find(theme => theme.name === 'summer'))} 
                    />
                  </div>
                </div>
                </>
           )}      
            </div>
          </div>
          <div className='w-full h-[64px] ' style = {{background: selectedTheme.colors.fifth}}><Footer/></div>
        </div>
      )
    }

export default Settings