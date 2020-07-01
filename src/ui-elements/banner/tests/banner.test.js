import React from 'react';
import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { Banner } from '../banner';
import { props } from './data';

describe('Banner', () => {
  it('renders on desktop with appropriate image', () => {
    global.window.matchMedia = () => ({ matches: true });
    render(<Banner {...props} />);
    expect(screen.getByText(props.mainHeading)).toBeInTheDocument();
    expect(screen.getByText(props.subHeading)).toBeInTheDocument();
    expect(screen.getByTestId('banner')).toHaveAttribute(
      'style',
      `background-image: url(${props.imgSrc}); height: 470px;`
    );
  });
  it('renders on mobile with appropriate image', () => {
    global.window.matchMedia = () => ({ matches: false });
    const height = 300;
    render(<Banner {...props} imgHeight={height} />);
    expect(screen.getByText(props.mainHeading)).toBeInTheDocument();
    expect(screen.getByText(props.subHeading)).toBeInTheDocument();
    expect(screen.getByTestId('banner')).toHaveAttribute(
      'style',
      `background-image: url(${props.mobileImg}); height: ${height}px;`
    );
  });
});
