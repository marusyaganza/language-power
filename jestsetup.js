import { v4 as uuid } from 'uuid';

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
