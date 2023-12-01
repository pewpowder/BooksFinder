import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type PreloadedRootState } from 'store';
import renderWithReduxAndRouter from 'tests/helpers/renderWithReduxAndRouter';
import { testBooks } from 'tests/mock/mockBooks';
import { responseError, defaultError } from 'tests/mock/mockErrors';
import {
  mockRejectedFetch,
  mockResolvedFetch,
  mockResolvedWithErrorFetch,
} from 'tests/mock/mockFetch';
import NotFoundImg from 'assets/img/not-found.png';
import * as useBookDetails from 'features/bookDetails/useBookDetails';

describe.only('BookDetails', () => {
  const testBook = testBooks.items[1];
  let mockedFetch: jest.Mock;

  beforeEach(() => {
    mockedFetch = mockResolvedFetch(testBook);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('should render BookDetails component with the book details', async () => {
    renderWithReduxAndRouter({
      routes: [`/books/${testBook.id}`],
    });

    const {
      volumeInfo: { title, imageLinks, description },
    } = testBook;
    expect(
      await screen.findByRole('heading', { name: /book description/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('heading', { name: title })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('img', { name: /book cover/i })
    ).toHaveAttribute('src', imageLinks?.thumbnail);
    expect(
      await screen.findByRole('button', { name: /< back/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('link', { name: /read a sample/i })
    ).toBeInTheDocument();
    expect(await screen.findAllByRole('listitem')).toHaveLength(7);
    expect(await screen.findByText(description ?? '')).toBeInTheDocument();
  });

  test('should return null if the status is idle', () => {
    jest.spyOn(useBookDetails, 'default').mockReturnValue(null);

    renderWithReduxAndRouter({
      routes: [`/books/:${testBook.id}`],
    });

    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: /book description/i })
    ).not.toBeInTheDocument();
  });

  test('should return the Spinner if the status is pending', () => {
    jest.spyOn(useBookDetails, 'default').mockReturnValue(null);

    const preloadedState: PreloadedRootState = {
      bookDetails: {
        book: null,
        error: null,
        status: 'pending',
      },
    };

    renderWithReduxAndRouter({
      preloadedState,
      routes: [`/books/${testBook.id}`],
    });

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('should render plugs instead of data and preview link button should be disabled', async () => {
    const testBookWithoutData: typeof testBook = {
      ...testBook,
      volumeInfo: {
        title: testBook.volumeInfo.title,
      },
    };

    mockResolvedFetch(testBookWithoutData);

    renderWithReduxAndRouter({
      routes: [`/books/${testBook.id}`],
    });

    expect(await screen.findByText(/no description/i)).toBeInTheDocument();
    expect(
      await screen.findByRole('link', { name: /read a sample/i })
    ).toHaveClass('disabled');
    expect(
      await screen.findByRole('img', { name: /book cover/i })
    ).toHaveAttribute('src', NotFoundImg);
    expect(await screen.findAllByText('unknown')).toHaveLength(7);
    expect(
      await screen.findByRole('button', { name: /< back/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('heading', { name: /book description/i })
    ).toBeInTheDocument();
    expect(
      await screen.findByRole('heading', { name: testBook.volumeInfo.title })
    ).toBeInTheDocument();
  });

  test('should take the user back on clicking the back button', async () => {
    const preloadedState: PreloadedRootState = {
      books: {
        books: testBooks.items,
        error: null,
        status: 'succeeded',
        totalBooks: testBooks.totalItems,
      },
      bookDetails: {
        book: testBook,
        error: null,
        status: 'succeeded',
      },
    };

    renderWithReduxAndRouter({
      preloadedState,
      routes: [`/books/${testBook.id}`, '/books'],
    });

    // If we remove await before userEvent the line of code won't be covered (BookDescription.tsx)
    await userEvent.click(
      await screen.findByRole('button', { name: /< back/i })
    );

    expect(screen.getByText(testBook.volumeInfo.title)).toBeInTheDocument();
  });

  test('should render ErrorFallback with a message if the response was resolved with the status rejected', async () => {
    mockResolvedWithErrorFetch(responseError);

    renderWithReduxAndRouter({
      routes: [`/books/:${testBook.id}`],
    });

    const errorMessage = new RegExp(responseError.message, 'i');
    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(await screen.findByText(errorMessage)).toBeInTheDocument();
  });

  test('should render the error element if the response is rejected', async () => {
    mockedFetch.mockRestore();
    mockRejectedFetch(defaultError);

    renderWithReduxAndRouter({
      routes: ['/'],
    });

    await userEvent.type(screen.getByRole('searchbox'), 'Query');
    userEvent.click(screen.getByRole('button', { name: /search/i }));

    expect(
      await screen.findByText(new RegExp(`${defaultError.message}`, 'i'))
    ).toBeInTheDocument();
  });
});
