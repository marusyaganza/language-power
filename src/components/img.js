import React from 'react';
import src from '../assets/sample.jpg';

const Img = ({width, height, alt}) => {
    return (
        <img alt={alt} src={src} width={width} height={height}/>
    )
};


export {Img};