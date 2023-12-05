import { fireEvent, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithReduxAndRouter from 'tests/helpers/renderWithReduxAndRouter';
import { testBooks } from 'tests/mock/mockBooks';
import {
  mockRejectedFetch,
  mockResolvedOnceFetch,
  mockResolvedWithErrorFetch,
} from 'tests/mock/mockFetch';
import { responseError } from 'tests/mock/mockErrors';

describe('App', () => {
  let mockedFetch: jest.Mock;
  const { items, totalItems } = testBooks;
  const responseErrorMessage = new RegExp(`${responseError.message}`, 'i');
  const dataWithoutBooks: typeof testBooks = {
    items: [],
    totalItems,
  };

  beforeEach(() => {
    mockedFetch = mockResolvedOnceFetch(testBooks, dataWithoutBooks);
  });

  test('should render the home page', () => {
    renderWithReduxAndRouter({
      routes: ['/'],
    });

    expect(screen.getByRole('link', { name: /jutsu/i })).toBeInTheDocument();
    expect(screen.getByRole('searchbox')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  test('should request new books and render them', async () => {
    renderWithReduxAndRouter({
      routes: ['/'],
    });

    await userEvent.type(screen.getByRole('searchbox'), 'Query');
    userEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(await screen.findAllByRole('article')).toHaveLength(items.length);
    expect(
      await screen.findByText(new RegExp(`${totalItems} books found`, 'i'))
    ).toBeInTheDocument();
  });

  test('should navigate to the home page and clear the store after clicking on the logo', async () => {
    renderWithReduxAndRouter({
      routes: ['/'],
    });

    await userEvent.type(screen.getByRole('searchbox'), 'Query');
    userEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(await screen.findAllByRole('article')).toHaveLength(items.length);

    await userEvent.click(screen.getByRole('link', { name: /jutsu/i }));
    expect(screen.queryByRole('article')).toBeNull();
  });

  test('should render the page based on the search params', async () => {
    renderWithReduxAndRouter({
      routes: ['/books?query=Clean%20code&startIndex=0&booksCount=12'],
    });

    const booksFoundMessage = new RegExp(`${totalItems} books found`, 'i');
    expect(await screen.findAllByRole('article')).toHaveLength(items.length);
    expect(await screen.findByText(booksFoundMessage)).toBeInTheDocument();
  });

  test('should render the error element if the response is rejected', async () => {
    mockedFetch.mockRestore();
    mockRejectedFetch(responseError);

    renderWithReduxAndRouter({
      routes: ['/'],
    });

    await userEvent.type(screen.getByRole('searchbox'), 'Query');
    userEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(await screen.findByText(responseErrorMessage)).toBeInTheDocument();
  });

  test('should call handleScroll function when user scrolling page to the end', async () => {
    renderWithReduxAndRouter({
      routes: ['/'],
    });

    await userEvent.type(screen.getByRole('searchbox'), 'Query');
    userEvent.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => expect(mockedFetch).toBeCalledTimes(1));

    fireEvent.scroll(window, { target: { scrollY: 0 } });

    await waitFor(() => expect(mockedFetch).toBeCalledTimes(2));
  });

  test('should render the error if a request completed with the status fulfilled and still contains an error', async () => {
    mockedFetch.mockRestore();
    mockResolvedWithErrorFetch(responseError);

    renderWithReduxAndRouter({
      routes: ['/'],
    });

    await userEvent.type(screen.getByRole('searchbox'), 'Query');
    userEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(await screen.findByText(responseErrorMessage)).toBeInTheDocument();
  });

  test('should not send a request when a user scrolling page to the end if the api responds with totalItems = 0 before that', async () => {
    const data = {
      ...testBooks,
      totalItems: 0,
    };

    mockedFetch.mockRestore();
    const newMockedFetch = mockResolvedOnceFetch(data, dataWithoutBooks);

    renderWithReduxAndRouter({
      routes: ['/'],
    });

    await userEvent.type(screen.getByRole('searchbox'), 'Query');
    userEvent.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => expect(newMockedFetch).toBeCalledTimes(1));

    fireEvent.scroll(window, { target: { scrollY: 0 } });

    await waitFor(() => expect(newMockedFetch).toBeCalledTimes(1));
  });
});
