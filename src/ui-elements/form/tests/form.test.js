import React from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';

import '@testing-library/jest-dom';
import { Form } from '../form';
import { fields, result } from './form.mock';

const submitFunc = jest.fn();

describe('form', () => {
  afterEach(cleanup);

  it('should submit valid form', () => {
    render(<Form onSubmit={submitFunc} fields={fields} />);

    const button = screen.getByText('Submit');

    expect(button).toBeDisabled();

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: result.email.value }
    });
    fireEvent.input(screen.getByLabelText('Password'), {
      target: { value: result.password.value }
    });

    expect(button).toBeEnabled();
    expect(screen.getByText('please enter your email')).toHaveAttribute(
      'aria-hidden',
      'true'
    );

    fireEvent.click(button);

    expect(submitFunc).toHaveBeenCalledWith(result);
  });

  it('should not submit invalid form', () => {
    render(<Form onSubmit={submitFunc} fields={fields} />);

    const button = screen.getByText('Submit');

    expect(button).toBeDisabled();

    fireEvent.blur(screen.getByLabelText('Email'), { target: { value: 'jj' } });
    fireEvent.input(screen.getByLabelText('Password'), {
      target: { value: 'j' }
    });

    expect(button).toBeDisabled();
    // TODO find out whit it's not working
    // expect(screen.getByText('please enter your email')).toHaveAttribute('aria-hidden', 'false');
  });
});
