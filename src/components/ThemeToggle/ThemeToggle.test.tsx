import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRedux from 'tests/helpers/renderWithRedux';
import ThemeToggle from './ThemeToggle';

describe('ThemeToggle component', () => {
  test('should render ThemeToggle component', () => {
    renderWithRedux(<ThemeToggle />);

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  test('theme should changes after clicking on the toggler', async () => {
    renderWithRedux(<ThemeToggle />, {
      preloadedState: { theme: { theme: 'light' } },
    });

    expect(screen.getByRole('checkbox')).not.toBeChecked();

    userEvent.click(screen.getByRole('checkbox'))
    await waitFor(() => expect(screen.getByRole('checkbox')).toBeChecked())

    userEvent.click(screen.getByRole('checkbox'))
    await waitFor(() => expect(screen.getByRole('checkbox')).not.toBeChecked())
  });
});
