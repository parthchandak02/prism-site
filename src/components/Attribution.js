import React from 'react';
import './Attribution.css';

const Attribution = ({ lightMode }) => {
  return (
    <div className={`attribution ${lightMode ? 'attribution--light' : 'attribution--dark'}`}>
      taken from: https://codesandbox.io/p/sandbox/j3ycvl
    </div>
  );
};

export default Attribution; 