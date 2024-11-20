import React from 'react';
import Header from '../components/Header';
import ColorChangingSpline from '../components/ColorChangingSpline';
import '../bottleStyle.css';

const BottlePage = () => {
  return (
    <div className="bottle-page">
      <Header />
      <ColorChangingSpline />
    </div>
  );
};

export default BottlePage;
