import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import { LoginForm } from '../login-form';
import { AppProvider } from '../../../app-context/appContext';
import { useFetch } from '../../../utils/hooks/fetch/useFetch';

import {
  reqParams,
  signUpResult,
  signUpReqParams,
  fetchWordReq
} from './login-form.mock';

jest.mock('../../../utils/hooks/fetch/useFetch');
const submitFunc = jest.fn();
const fetchFunc = jest.fn();
const resetData = jest.fn();

describe('form', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should switch login and sign up modes', () => {
    useFetch.mockReturnValue([{ error: 'Dummy error' }, fetchFunc, resetData]);
    render(
      <AppProvider>
        <LoginForm />
      </AppProvider>
    );
    const submitButton = screen.getByText('Submit');
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(submitButton).toBeDisabled();
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: signUpResult.email }
    });
    fireEvent.input(screen.getByLabelText('Password'), {
      target: { value: signUpResult.password }
    });
    expect(submitButton).toBeEnabled();
    fireEvent.click(screen.getByText('sign up'));
    expect(resetData).toBeCalledWith({ error: null });
    expect(submitButton).toBeDisabled();
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
    expect(screen.getByText('Sign up')).toBeInTheDocument();
    fireEvent.click(screen.getByText('login'));
    expect(screen.queryByLabelText('Name')).toBeNull();
  });
  it('should handle login', () => {
    useFetch.mockReturnValue([{ error: 'Dummy error' }, fetchFunc, resetData]);
    render(
      <AppProvider>
        <LoginForm onSubmit={submitFunc} />
      </AppProvider>
    );
    const submitButton = screen.getByText('Submit');
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: signUpResult.email }
    });
    fireEvent.input(screen.getByLabelText('Password'), {
      target: { value: signUpResult.password }
    });
    fireEvent.click(submitButton);
    expect(screen.getByText('Error occured: Dummy error')).toBeInTheDocument();
    expect(fetchFunc).toHaveBeenCalledWith(reqParams);
  });
  it('should show spinner if loading', () => {
    useFetch.mockReturnValue([{ loading: true }, fetchFunc, resetData]);
    render(
      <AppProvider>
        <LoginForm onSubmit={submitFunc} />
      </AppProvider>
    );
    const spinner = screen.getByText('Loading...');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute('role', 'alert');
    expect(screen.getByTestId('spinner-animation')).toBeInTheDocument();
  });
  it('should handle sign up', () => {
    useFetch.mockReturnValue([{}, fetchFunc, resetData]);
    render(
      <AppProvider>
        <LoginForm onSubmit={submitFunc} />
      </AppProvider>
    );
    fireEvent.click(screen.getByText('sign up'));
    const submitButton = screen.getByText('Submit');
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: signUpResult.email }
    });
    fireEvent.input(screen.getByLabelText('Password'), {
      target: { value: signUpResult.password }
    });
    fireEvent.input(screen.getByLabelText('Name'), {
      target: { value: signUpResult.name }
    });
    fireEvent.click(submitButton);
    expect(fetchFunc).toHaveBeenCalledWith(signUpReqParams);
  });
  it('should fetch words after submit', () => {
    useFetch.mockReturnValue([
      { result: { userId: 'userId', token: 'token' } },
      fetchFunc,
      resetData
    ]);
    render(
      <AppProvider>
        <LoginForm onSubmit={submitFunc} />
      </AppProvider>
    );
    expect(submitFunc).toHaveBeenCalledTimes(1);

    expect(fetchFunc).toHaveBeenCalledWith(fetchWordReq);
  });
});
