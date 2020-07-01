import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import '@testing-library/jest-dom';

import { ErrorDisplay } from '../error-display';

import { props } from './data';

const buttonHandler = jest.fn();

describe('ErrorDisplay', () => {
  it('renders button if link is not presented', () => {
    render(<ErrorDisplay {...props} buttonHandler={buttonHandler} />);
    expect(screen.getByText(props.heading)).toBeInTheDocument();
    expect(screen.getByText(props.subHeading)).toBeInTheDocument();
    expect(screen.getByText(props.subHeading)).toBeInTheDocument();
    fireEvent.click(screen.getByText(props.buttonText));
    expect(buttonHandler).toHaveBeenCalledTimes(1);
  });

  it('should not fail without clickhandler', () => {
    render(<ErrorDisplay {...props} />);
    fireEvent.click(screen.getByText(props.buttonText));
    expect(screen.getByText(props.heading)).toBeInTheDocument();
    expect(screen.getByText(props.subHeading)).toBeInTheDocument();
    expect(screen.getByText(props.subHeading)).toBeInTheDocument();
  });

  it('should not render button if link is presented', () => {
    const link = 'link';
    render(
      <BrowserRouter>
        <ErrorDisplay {...props} link={link} />
      </BrowserRouter>
    );
    expect(screen.getByText(props.buttonText)).toHaveAttribute(
      'href',
      `/${link}`
    );
    expect(screen.queryByRole('button')).toBeNull();
    expect(screen.queryByLabelText('reload')).toBeNull();
  });
});
