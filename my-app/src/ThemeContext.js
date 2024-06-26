// src/ThemeContext.js
import { createContext, useState } from 'react';
import { themes } from './themes';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);
  
  const changeTheme = (theme) => {
    setSelectedTheme(theme);
  };
  
  return (
    <ThemeContext.Provider value={{ selectedTheme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
