import React from 'react';
import img from '../../assets/img/jpg/main-banner-img.jpg';
import mobileImg from '../../assets/img/jpg/main-banner-img.mobile.jpg';
import { Banner } from '../../ui-elements/banner/banner';

export const HomePage = () => {
  return (
    <Banner
      imgSrc={img}
      mainHeading="Welcome to Language Power"
      mobileImg={mobileImg}
    />
  );
};
