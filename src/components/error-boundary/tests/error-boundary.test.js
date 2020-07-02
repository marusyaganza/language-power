import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import '@testing-library/jest-dom';

import ErrorBoundary from '../error-boundary';

import { props } from './data';

const Bomb = () => {
  throw new Error();
};

const { location } = window;

describe('ErrorBoundary', () => {
  beforeAll(() => {
    delete window.location;
    window.location = { reload: jest.fn() };
  });

  afterAll(() => {
    window.location = location;
  });

  it('shows ErrorDisplay', () => {
    jest.spyOn(window.location, 'reload');
    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>
    );
    expect(screen.getByText(props.heading)).toBeInTheDocument();
    expect(screen.getByText(props.subHeading)).toBeInTheDocument();
    expect(screen.getByLabelText(props.headingIcon)).toBeInTheDocument();
    fireEvent.click(screen.getByText(props.buttonText));
    expect(window.location.reload).toHaveBeenCalled();
  });
});
