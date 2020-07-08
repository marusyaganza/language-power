/* eslint-disable import/no-extraneous-dependencies */
import { v4 as uuid } from 'uuid';
import fetchMock from 'jest-fetch-mock';

jest.mock('uuid');
uuid.mockReturnValue('uuid');

jest.mock('react-dom', () => {
  return {
    ...jest.requireActual('react-dom'),
    createPortal: element => {
      return element;
    }
  };
});

Object.defineProperty(global.document, 'querySelector', {
  value: () => ({ setAttribute: jest.fn(), removeAttribute: jest.fn() })
});

const mockStorage = {};
window.localStorage = {
  setItem(key, val) {
    mockStorage[key] = val;
  },
  getItem(key) {
    return mockStorage[key];
  },
  removeItem(key) {
    delete mockStorage[key];
  }
};

global.fetch = fetchMock;

global.process.env.API_URL = 'host';
