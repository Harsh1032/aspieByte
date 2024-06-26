// src/ThemeSelector.js
import React, { useContext } from 'react';
import ThemeContext from './ThemeContext';
import { themes } from './themes';

const ThemeSelector = () => {
  const { selectedTheme, changeTheme } = useContext(ThemeContext);

  const handleThemeChange = (selectedTheme) => {
    changeTheme(selectedTheme);
  };
  
  return (
    <div className='py-2 px-3'>
      <select className = "w-[110px] h-[30px] p-1 rounded-md outline-none float-right hover:shadow-lg text-md"  onChange={(e) => handleThemeChange(themes.find(theme => theme.name === e.target.value))} value={selectedTheme.name}>
      {themes.map((theme, index) => (
        <option key={index} value={theme.name}>
          {theme.name}
        </option>
      ))}
      </select>
    </div>
  );
};

export default ThemeSelector;
