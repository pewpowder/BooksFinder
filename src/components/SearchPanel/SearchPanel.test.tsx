import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SearchPanel from './SearchPanel';

describe('SearchPanel Component', () => {
  let handleOnSearch: jest.Mock;
  let setQuery: jest.Mock;

  beforeAll(() => {
    handleOnSearch = jest.fn();
    setQuery = jest.fn();
  });

  test('should render component with correct query prop', () => {
    const query = 'Clean code';

    render(
      <SearchPanel
        handleOnSearch={handleOnSearch}
        query={query}
        setQuery={setQuery}
      />
    );

    expect(screen.getByRole('searchbox')).toHaveValue(query);
  });

  test('should call setQuery function certain number of times', async () => {
    render(
      <SearchPanel
        handleOnSearch={handleOnSearch}
        query={''}
        setQuery={setQuery}
      />
    );

    const query = 'Hello';
    userEvent.type(screen.getByRole('searchbox'), query);

    await waitFor(() => expect(setQuery).toBeCalledTimes(query.length));
  });

  test('should call the handleOnSearch function on the button click or on pressing the Enter key', async () => {
    const query = 'Clean code';
    render(
      <SearchPanel
        handleOnSearch={handleOnSearch}
        query={query}
        setQuery={setQuery}
      />
    );

    userEvent.type(screen.getByRole('searchbox'), '{Enter}');
    await waitFor(() => expect(handleOnSearch).toBeCalledTimes(1));

    userEvent.click(screen.getByRole('button'));
    await waitFor(() => expect(handleOnSearch).toBeCalledTimes(2));

    userEvent.keyboard('{Shift}{f}{o}{o}');
    await waitFor(() => expect(handleOnSearch).toBeCalledTimes(2));
  });

  test('should not call the handleOnSearch function with an invalid input value', async () => {
    render(
      <SearchPanel
        handleOnSearch={handleOnSearch}
        query={' '}
        setQuery={setQuery}
      />
    );

    await userEvent.click(screen.getByRole('button'));
    expect(handleOnSearch).not.toBeCalled()
  });
});
