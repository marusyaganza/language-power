import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { render, fireEvent, screen, cleanup } from '@testing-library/react';

import '@testing-library/jest-dom';
import { Header } from '../header';
import { AppProvider } from '../../../app-context/appContext';
import { navlinks } from './header.mock';

const { localStorage } = window;
const setItem = jest.fn();
const getItem = jest.fn();
const removeItem = jest.fn();

describe('Header', () => {
  afterEach(cleanup);

  beforeAll(() => {
    delete window.localStorage;
    window.localStorage = { getItem, setItem, removeItem };
  });

  afterAll(() => {
    window.localStorage = localStorage;
  });
  it('render logo', () => {
    getItem.mockReturnValue(
      '{"userId":"id","token":"tokenString","expiration":"2021-06-30T19:34:16.938Z"}'
    );
    render(
      <BrowserRouter>
        <AppProvider>
          <Header navItems={navlinks} />
        </AppProvider>
      </BrowserRouter>
    );
    expect(screen.getByText('Language power')).toBeInTheDocument();
    expect(screen.queryByLabelText('backdrop')).toBeNull();
    expect(screen.getByText('Logout')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Logout'));
    expect(screen.queryByText('Logout')).toBeNull();
    expect(screen.getByTestId('login-button')).toBeInTheDocument();
    expect(removeItem).toHaveBeenCalledWith('userData');
  });
  it('show login form', () => {
    getItem.mockReturnValue('null');
    render(
      <BrowserRouter>
        <AppProvider>
          <Header navItems={navlinks} />
        </AppProvider>
      </BrowserRouter>
    );
    fireEvent.click(screen.getByTestId('login-button'));
    expect(screen.queryByLabelText('backdrop')).toBeInTheDocument();
    expect(screen.queryByRole('dialog')).toBeVisible();
    expect(screen.getByLabelText('Email')).toHaveFocus();
    fireEvent.click(screen.getByTitle('close window'));
    expect(screen.queryByLabelText('backdrop')).toBeNull();
  });
  it('show sideDrawer after click on menu button', () => {
    getItem.mockReturnValue('null');
    render(
      <BrowserRouter>
        <AppProvider>
          <Header navItems={navlinks} />
        </AppProvider>
      </BrowserRouter>
    );
    fireEvent.click(screen.getByTitle('menu'));
    expect(screen.queryByLabelText('backdrop')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('backdrop'));
    expect(screen.queryByLabelText('backdrop')).toBeNull();
  });
});
