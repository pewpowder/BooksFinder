import { screen, render } from '@testing-library/react';
import ErrorFallback from './ErrorFallback';

describe('ErrorFallback', () => {
  test('should render ErrorFallback with error object', () => {
    const error: Error = {
      message: 'ErrorFallback test',
      name: 'ErrorFallback',
    };

    render(<ErrorFallback error={error} />);

    const errorMessage = new RegExp(error.message, 'i');
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: error.name })
    ).toBeInTheDocument();
  });

  test('should render ErrorFallback without error object', () => {
    render(<ErrorFallback error={null} />);

    expect(
      screen.getByRole('heading', { name: 'unknown' })
    ).toBeInTheDocument();
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });
});
