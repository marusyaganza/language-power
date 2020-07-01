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

// jest.mock('react', () => {
//   return {
//     ...jest.requireActual('react-dom'),
//     Suspense: element => {
//       return element;
//     }
//   };
// });
