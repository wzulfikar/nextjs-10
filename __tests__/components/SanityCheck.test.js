import React from 'react';

import { render, screen } from '@tests/test-utils';
import userEvent from '@testing-library/user-event';

describe('Test dummy component', () => {
  it('render dummy component', () => {
    const mockClick = jest.fn();

    render(
      <div>
        <p>Hello from test!</p>
        <button role="button" onClick={mockClick}>
          Click me!
        </button>
      </div>
    );

    // screen.debug();

    // Assert content is correct
    expect(screen.getByText(/Hello/)).toBeInTheDocument();

    // Assert button exists
    const btn = screen.getByRole('button');
    expect(btn).toBeInTheDocument();

    // Assert button is clickable
    userEvent.click(btn);
    expect(mockClick).toBeCalledTimes(1);
  });
});
