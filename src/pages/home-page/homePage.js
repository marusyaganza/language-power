import React from 'react';
import img from '../../assets/img/jpg/main-banner-img.jpg';
import { Banner } from '../../components/banner/banner';

export const HomePage = () => {
  return <Banner imgSrc={img} mainHeading="Welcome to Language Power" />;
};
