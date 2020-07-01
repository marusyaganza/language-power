import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ShowMore } from '../show-more';

const testArr = ['yak', 'yack', 'yacked', 'yacking', 'yacks', 'yakked'];
const full = testArr.join(', ');
const reduced = testArr.slice(0, 3).join(', ');

describe('ShowMore', () => {
  it('does not show more then initial number of words', () => {
    render(<ShowMore title="word forms" items={testArr} initialNumber={3} />);
    expect(screen.getByTestId('content')).toHaveTextContent(reduced);

    fireEvent.click(screen.getByText(/show more/i));
    expect(screen.getByTestId('content')).toHaveTextContent(full);
    expect(screen.getByText(/show less/)).toBeInTheDocument();
    expect(screen.queryByText(/show more/)).toBeNull();

    fireEvent.click(screen.getByText(/show less/i));
    expect(screen.getByTestId('content')).toHaveTextContent(reduced);
    expect(screen.getByText(/show more/)).toBeInTheDocument();
    expect(screen.queryByText(/show less/)).toBeNull();
  });
  it('should not render show more button when has not enough words', () => {
    render(<ShowMore title="word forms" items={testArr} />);
    expect(screen.getByTestId('content')).toHaveTextContent(full);
    expect(screen.queryByText(/show more/)).toBeNull();
    expect(screen.queryByText(/show more/)).toBeNull();
  });
});
