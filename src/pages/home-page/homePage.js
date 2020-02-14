import React from 'react';
import img from '../../assets/img/jpg/main-banner-img.jpg';

export const HomePage = () => {
  return (
    <main>
      <h2>Welcome to Language Power</h2>
      <img src={img} alt="Words have power." />
    </main>
  );
};
