import React from 'react';

const FontSizeSlider = ({ value, onChange  }) => {
  
  return (
    <div>
      <input
        type="range"
        min="10"
        max="30"
        step="1"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default FontSizeSlider;
