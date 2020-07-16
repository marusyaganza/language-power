import React from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';

import '@testing-library/jest-dom';
import PopUp from '../index';
import { AppProvider } from '../../../app-context/appContext';

describe('PopUp', () => {
  afterEach(cleanup);
  it('should close after "Escape" press', () => {
    const onClose = jest.fn();
    render(
      <AppProvider>
        <div data-testid="outer">
          <PopUp open onClose={onClose}>
            <a href="/">Some link</a>
            <input type="text" data-testId="input" />
          </PopUp>
        </div>
      </AppProvider>
    );
    expect(screen.getByTestId('input')).toHaveFocus();
    expect(screen.getByLabelText('backdrop')).toBeInTheDocument();
    fireEvent.keyUp(screen.getByRole('dialog'), {
      key: 'Escape',
      code: 'Escape'
    });
    expect(onClose).toHaveBeenCalledTimes(1);
    fireEvent.keyUp(screen.getByRole('dialog'), {
      key: 'Enter',
      code: 'Enter'
    });
    expect(onClose).toHaveBeenCalledTimes(1);
    fireEvent.focusIn(screen.getByTestId('outer'));
    expect(screen.getByTestId('close')).toHaveFocus();
  });
  it('should not manage focus when closed', () => {
    const onClose = jest.fn();
    render(
      <AppProvider>
        <div data-testid="outer">
          <PopUp onClose={onClose}>
            <input type="text" data-testId="input" />
          </PopUp>
        </div>
      </AppProvider>
    );
    expect(screen.queryByRole('dialog')).toBeNull();
  });
  it('should have initial focus on link', () => {
    const onClose = jest.fn();
    render(
      <AppProvider>
        <div data-testid="outer">
          <PopUp open onClose={onClose}>
            <a href="/">Some link</a>
            <detail>
              <summary>Examples</summary>
              <p>Some text</p>
            </detail>
          </PopUp>
        </div>
      </AppProvider>
    );
    expect(screen.getByText('Some link')).not.toHaveFocus();
  });
});
