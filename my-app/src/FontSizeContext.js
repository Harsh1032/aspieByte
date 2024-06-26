// FontSizeContext.js
import React, { createContext, useContext, useState } from 'react';

const FontSizeContext = createContext();

export const useFontSize = () => useContext(FontSizeContext);

export const FontSizeProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(16);

  return (
    <FontSizeContext.Provider value={{ fontSize, setFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};
