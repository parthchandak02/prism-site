import React from 'react';
import './Title.css';

const Title = ({ lightMode }) => {
  return (
    <div className={`title ${lightMode ? 'title--light' : 'title--dark'}`}>
      <h1 className="title__heading">
        Parth Chandak
      </h1>
    </div>
  );
};

export default Title; 